import { load, CheerioAPI } from "cheerio"

class Scraper {
    private _baseUrl: string = "https://overwolf.github.io"
    private _gameListUrl: string = this._baseUrl + "/api/games/events"
    private _data: Object = {}

    public async run() {
        const self = this
        await this._fetchGameList().then(function () {
            self.export()
        })
    }

    private async _fetchGameList() {
        const response: Response = await fetch(this._gameListUrl, {
            method: "GET",
        })
        if (response.status != 200) {
            console.log("Failed to fetch game list")
        }

        const dom = load(await response.text())
        for (const element of dom("ul.menu__list li a:contains('Games IDs')")
            .parent()
            .parent()
            .find("ul.menu__list li a")) {
            const href: string = element.attribs.href
            if (href.indexOf("events/") != -1) {
                await this._fetchGameFeatures(href)
            }
        }
    }

    private async _fetchGameFeatures(url: string) {
        const response: Response = await this._fetchUrl(this._baseUrl + url)
        if (response.status != 200) {
            console.log("Failed to fetch game features on " + url)
        }

        const dom = load(await response.text())

        // get game id
        const gameIdString: string = dom(".game-info-list li")
            .children()
            .remove()
            .end()
            .text()
        // no game id means it's a wip game that we cannot support
        if (gameIdString == "") {
            return
        }
        const gameId: number = parseInt(gameIdString)

        // get game title
        const gameTitle: string = dom("h1.game-info-title span").text()

        // initialize the game
        this._data[gameId] = {
            name: gameTitle,
            url: this._baseUrl + url,
            features: {},
        }

        // get game features list
        for (const element of dom("#available-features").next().find("li a")) {
            const href: string = element.attribs.href
            if (href.charAt(0) != "#") {
                continue
            }
            const feature: string = href.substring(1)

            // initialize feature
            this._data[gameId]["features"][feature] = {
                "info-updates": [],
                events: [],
            }

            // parse feature details
            await this.parseGameFeature(gameId, dom, feature, "info-updates")
            await this.parseGameFeature(gameId, dom, feature, "events")
        }
    }

    private async parseGameFeature(
        gameId: number,
        dom: CheerioAPI,
        feature: string,
        type: string
    ) {
        for (const element of dom("h2#" + feature)
            .nextUntil("h2", "h3[id^=" + type + "]")
            .nextUntil("h3", "table")
            .first()
            .find("tbody tr")) {
            this._data[gameId]["features"][feature][type].push(
                load(element)("td").first().text()
            )
        }
    }

    private async _fetchUrl(url: string) {
        return await fetch(url, {
            method: "GET",
        })
    }

    private async print() {
        console.log(JSON.stringify(this._data, null, 4))
    }

    private async export() {
        let code: string[] = []
        code.push("const interestingFeatures = {")

        for (const [gameId, gameInfo] of Object.entries(this._data)) {
            code.push("    // " + gameInfo["name"])
            code.push("    // " + gameInfo["url"])
            code.push("    " + gameId.toString() + ": [")

            for (const [feature, featureInfo] of Object.entries(
                gameInfo["features"]
            )) {
                if (featureInfo["info-updates"].length > 0) {
                    code.push(
                        "        // info updates: " +
                            featureInfo["info-updates"].join(", ")
                    )
                }
                if (featureInfo["events"].length > 0) {
                    code.push(
                        "        // events: " + featureInfo["events"].join(", ")
                    )
                }
                code.push('        "' + feature + '",')
            }
            code.push("    ],")
        }

        code.push("}")

        console.log(code.join("\n"))
    }
}

new Scraper().run()
