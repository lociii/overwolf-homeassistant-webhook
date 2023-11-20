class Scraper {
    private _url: string =
        "https://game-events-status.overwolf.com/all_prod.json"
    private _data: Object = {}

    public async run() {
        const self = this
        await this._fetchGameList().then(function () {
            self.export_consts()
            self.export_gameids()
        })
    }

    private async _fetchGameList() {
        const response: Response = await fetch(this._url, {
            method: "GET",
        })
        if (response.status != 200) {
            console.log("Failed to fetch game list")
        }

        const json = await response.json()
        json.forEach((game) => {
            // skip disabled or non-published games
            if (game["disabled"] || !game["published"]) {
                return
            }

            // initialize game data
            this._data[game["game_id"]] = {
                features: ["gep_internal"],
            }

            // add features
            game["features"].forEach((feature: object) => {
                // skip non-published
                if (!feature["published"]) {
                    return
                }

                this._data[game["game_id"]]["features"].push(feature["name"])
            })
        })
    }

    private async export_consts() {
        let code: string[] = []
        code.push("const interestingFeatures = {")

        for (const [gameId, gameInfo] of Object.entries(this._data)) {
            code.push("    " + gameId.toString() + ": [")

            gameInfo["features"].forEach((feature: string) => {
                code.push('        "' + feature + '",')
            })
            code.push("    ],")
        }

        code.push("}")

        console.log(code.join("\n"))
    }

    private async export_gameids() {
        console.log(Object.keys(this._data).join(", "))
    }
}

new Scraper().run()
