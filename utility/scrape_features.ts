import { readFile, writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import * as prettier from "prettier"
import { parse } from "@babel/parser"

interface GameDefinition {
    name: string
    features: string[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value)
}

export class Scraper {
    private _url: string =
        "https://game-events-status.overwolf.com/all_prod.json"

    constructor(private projectRoot: string = resolve(__dirname, "..")) {}

    public async run() {
        const games = await this._fetchGameList()
        await this.resolveGameNames(games)
        await this.updateSources(games)
    }

    private async _fetchGameList(): Promise<Record<number, GameDefinition>> {
        const response: Response = await fetch(this._url, {
            method: "GET",
        })
        if (!response.ok) {
            throw new Error(
                `Failed to fetch game list: HTTP ${response.status}`
            )
        }

        const games: unknown = await response.json()
        if (!Array.isArray(games)) {
            throw new Error("Game list must be an array")
        }

        const gamesById: Record<number, GameDefinition> = {}
        for (const game of games) {
            if (!isRecord(game)) {
                throw new Error("Invalid game entry")
            }
            if (game.disabled || game.state === 0 || game.state === "0") {
                continue
            }

            const gameId = game.game_id
            if (
                typeof gameId !== "number" ||
                !Number.isSafeInteger(gameId) ||
                gameId <= 0 ||
                !Array.isArray(game.features) ||
                Object.prototype.hasOwnProperty.call(gamesById, gameId)
            ) {
                throw new Error("Invalid or duplicate game ID or feature list")
            }

            const gameFeatures = new Set(["gep_internal"])
            for (const feature of game.features) {
                if (!isRecord(feature)) {
                    throw new Error(`Invalid feature for game ${gameId}`)
                }
                if (!feature.published) {
                    continue
                }
                if (typeof feature.name !== "string" || !feature.name.trim()) {
                    throw new Error(`Invalid feature name for game ${gameId}`)
                }
                gameFeatures.add(feature.name)
            }
            gamesById[gameId] = {
                name: this.normalizeGameName(game.name),
                features: [...gameFeatures],
            }
        }
        if (Object.keys(gamesById).length === 0) {
            throw new Error("Game list contains no enabled, published games")
        }
        return gamesById
    }

    private normalizeGameName(value: unknown): string {
        return typeof value === "string"
            ? value.replace(/\s+/g, " ").trim()
            : ""
    }

    private async resolveGameNames(games: Record<number, GameDefinition>) {
        const missingNames = Object.keys(games).filter(
            (gameId) => !games[gameId].name
        )
        if (missingNames.length === 0) {
            return
        }

        const metadataNames = await this.fetchGameMetadataNames()
        let websiteNames: Map<number, string> | undefined
        for (const gameId of missingNames) {
            let name = metadataNames.get(Number(gameId))
            if (!name) {
                if (!websiteNames) {
                    websiteNames = await this.scrapeGameNames()
                }
                name = websiteNames.get(Number(gameId))
            }
            if (!name) {
                throw new Error(
                    `Could not determine game name for ID ${gameId}`
                )
            }
            games[gameId].name = name
        }
    }

    private findVariableInitializers(content: string, variableName: string) {
        const source = parse(content, {
            sourceType: "unambiguous",
            plugins: ["typescript"],
        })
        return source.program.body.flatMap((statement) => {
            const declaration =
                statement.type === "ExportNamedDeclaration"
                    ? statement.declaration
                    : statement
            if (declaration?.type !== "VariableDeclaration") {
                return []
            }
            return declaration.declarations
                .filter(
                    (variable) =>
                        variable.id.type === "Identifier" &&
                        variable.id.name === variableName
                )
                .map((variable) => variable.init)
        })
    }

    private async fetchGameMetadataNames(): Promise<Map<number, string>> {
        const response = await fetch(
            "https://dev.overwolf.com/data/supported-games.js"
        )
        if (!response.ok) {
            throw new Error(
                `Failed to fetch GEP game metadata: HTTP ${response.status}`
            )
        }
        const [initializer] = this.findVariableInitializers(
            await response.text(),
            "GamesMetaData"
        )
        if (initializer?.type !== "ObjectExpression") {
            throw new Error("GEP game metadata catalogue not found")
        }
        const names = new Map<number, string>()
        for (const property of initializer.properties) {
            if (
                property.type !== "ObjectProperty" ||
                property.computed ||
                property.value.type !== "ObjectExpression" ||
                !(
                    property.key.type === "StringLiteral" ||
                    property.key.type === "NumericLiteral"
                )
            ) {
                continue
            }
            const gameId = Number(property.key.value)
            if (!Number.isSafeInteger(gameId) || gameId <= 0) {
                continue
            }
            for (const field of property.value.properties) {
                if (
                    field.type === "ObjectProperty" &&
                    !field.computed &&
                    ((field.key.type === "Identifier" &&
                        field.key.name === "name") ||
                        (field.key.type === "StringLiteral" &&
                            field.key.value === "name")) &&
                    field.value.type === "StringLiteral"
                ) {
                    const name = this.normalizeGameName(field.value.value)
                    if (name) {
                        names.set(gameId, name)
                    }
                }
            }
        }
        return names
    }

    private async scrapeGameNames(): Promise<Map<number, string>> {
        const response = await fetch(
            "https://www.overwolf.com/supported-games/"
        )
        if (!response.ok) {
            throw new Error(
                `Failed to fetch supported games website: HTTP ${response.status}`
            )
        }
        const html = await response.text()
        const scripts = /<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi
        let script: RegExpExecArray | null
        while ((script = scripts.exec(html)) !== null) {
            if (!script[1].includes("g_supportedGames")) {
                continue
            }
            const [initializer] = this.findVariableInitializers(
                script[1],
                "g_supportedGames"
            )
            if (initializer?.type !== "ArrayExpression") {
                continue
            }
            const catalogue: unknown = JSON.parse(
                script[1].slice(initializer.start, initializer.end)
            )
            if (!Array.isArray(catalogue)) {
                throw new Error("Invalid supported games catalogue")
            }
            const names = new Map<number, string>()
            for (const game of catalogue) {
                if (!isRecord(game)) {
                    continue
                }
                const name = this.normalizeGameName(game.name)
                if (typeof game.id === "number" && name) {
                    names.set(game.id, name)
                }
            }
            return names
        }
        throw new Error(
            "Supported games catalogue not found on Overwolf website"
        )
    }

    private async updateSources(games: Record<number, GameDefinition>) {
        const constsPath = resolve(this.projectRoot, "src/consts.ts")
        const manifestPath = resolve(this.projectRoot, "public/manifest.json")
        const [consts, manifestSource] = await Promise.all([
            readFile(constsPath, "utf8"),
            readFile(manifestPath, "utf8"),
        ])
        const declarations = this.findVariableInitializers(
            consts,
            "interestingFeatures"
        )
        if (
            declarations.length !== 1 ||
            declarations[0]?.type !== "ObjectExpression"
        ) {
            throw new Error(
                "Expected one interestingFeatures object declaration"
            )
        }

        const gameIds = Object.keys(games)
            .map(Number)
            .sort((first, second) => first - second)
        const entries = gameIds.map((gameId) => {
            const names = games[gameId].features.map(
                (name) => `        ${JSON.stringify(name)},`
            )
            return `    // ${games[gameId].name}\n    ${gameId}: [\n${names.join("\n")}\n    ],`
        })
        const initializer = declarations[0]
        const updatedConsts = await this.formatSource(
            constsPath,
            consts.slice(0, initializer.start) +
                `{\n${entries.join("\n")}\n}` +
                consts.slice(initializer.end)
        )

        const manifest = JSON.parse(manifestSource)
        if (
            !Array.isArray(manifest.data?.game_targeting?.game_ids) ||
            !Array.isArray(manifest.data?.game_events) ||
            !Array.isArray(manifest.data?.launch_events)
        ) {
            throw new Error("Manifest is missing game lists")
        }
        const launchEvents = manifest.data.launch_events.filter(
            (event) => event.event === "GameLaunch"
        )
        if (
            launchEvents.length === 0 ||
            launchEvents.some(
                (event) => !Array.isArray(event.event_data?.game_ids)
            )
        ) {
            throw new Error("Manifest is missing GameLaunch game lists")
        }
        manifest.data.game_targeting.game_ids = gameIds
        manifest.data.game_events = gameIds
        for (const event of launchEvents) {
            event.event_data.game_ids = gameIds
        }
        const updatedManifest = await this.formatSource(
            manifestPath,
            JSON.stringify(manifest, null, 4)
        )

        if (updatedConsts !== consts) {
            await writeFile(constsPath, updatedConsts)
        }
        if (updatedManifest !== manifestSource) {
            await writeFile(manifestPath, updatedManifest)
        }
        console.log(
            `Updated game features and manifest lists for ${gameIds.length} games`
        )
    }

    private async formatSource(
        filePath: string,
        content: string
    ): Promise<string> {
        const options = await prettier.resolveConfig(filePath)
        return prettier.format(content, {
            ...options,
            filepath: filePath,
        })
    }
}

if (require.main === module) {
    new Scraper().run().catch((error: unknown) => {
        console.error(error instanceof Error ? error.message : error)
        process.exitCode = 1
    })
}
