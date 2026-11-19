import { readFile, writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import * as prettier from "prettier"
import * as ts from "typescript"

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value)
}

export class Scraper {
    private _url: string =
        "https://game-events-status.overwolf.com/all_prod.json"

    constructor(private projectRoot: string = resolve(__dirname, "..")) {}

    public async run() {
        const features = await this._fetchGameList()
        await this.updateSources(features)
    }

    private async _fetchGameList(): Promise<Record<number, string[]>> {
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

        const features: Record<number, string[]> = {}
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
                Object.prototype.hasOwnProperty.call(features, gameId)
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
            features[gameId] = [...gameFeatures]
        }
        if (Object.keys(features).length === 0) {
            throw new Error("Game list contains no enabled, published games")
        }
        return features
    }

    private async updateSources(features: Record<number, string[]>) {
        const constsPath = resolve(this.projectRoot, "src/consts.ts")
        const manifestPath = resolve(this.projectRoot, "public/manifest.json")
        const [consts, manifestSource] = await Promise.all([
            readFile(constsPath, "utf8"),
            readFile(manifestPath, "utf8"),
        ])
        const source = ts.createSourceFile(
            constsPath,
            consts,
            ts.ScriptTarget.Latest,
            true
        )
        const declarations: ts.VariableDeclaration[] = []
        for (const statement of source.statements) {
            if (!ts.isVariableStatement(statement)) {
                continue
            }
            for (const declaration of statement.declarationList.declarations) {
                if (
                    declaration.name.getText(source) === "interestingFeatures"
                ) {
                    declarations.push(declaration)
                }
            }
        }
        if (
            declarations.length !== 1 ||
            !declarations[0].initializer ||
            !ts.isObjectLiteralExpression(declarations[0].initializer)
        ) {
            throw new Error(
                "Expected one interestingFeatures object declaration"
            )
        }

        const gameIds = Object.keys(features)
            .map(Number)
            .sort((first, second) => first - second)
        const entries = gameIds.map((gameId) => {
            const names = features[gameId].map(
                (name) => `        ${JSON.stringify(name)},`
            )
            return `    ${gameId}: [\n${names.join("\n")}\n    ],`
        })
        const initializer = declarations[0].initializer
        const updatedConsts = await this.formatSource(
            constsPath,
            consts.slice(0, initializer.getStart(source)) +
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
