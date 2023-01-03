import { Config } from "../services/config"

class Publisher {
    private _events: Object[]
    private _config: Config
    private active: boolean = false
    private timeout: NodeJS.Timeout

    constructor(config: Config) {
        this._events = []
        this._config = config
    }

    public start() {
        this.active = true
        this.setTimeout()
    }

    private setTimeout() {
        this.timeout = setTimeout(() => {
            this.eventuallySend()
            if (this.active) {
                this.setTimeout()
            }
        }, this._config.getThrottle())
    }

    public stop() {
        this.active = false

        if (this.timeout) {
            clearTimeout(this.timeout)
        }
        this.timeout = null
    }

    public push(
        dataType: string,
        gameId: number,
        gameName: string,
        gameShortName: string,
        data: Object
    ) {
        this._events.push({
            type: dataType,
            gameId: gameId,
            gameName: gameName,
            gameShortName: gameShortName,
            data: data,
        })
    }

    private eventuallySend() {
        const length: number = this._events.length
        if (length > 0) {
            // remove the elements from the stack
            // this makes sure that we don't accidentially delete
            // elements that we will send in the next run
            const self = this
            const events: Object[] = []
            Array(length)
                .fill(null)
                .map(function () {
                    events.push(self._events.shift())
                })

            fetch(this._config.getWebhookUrl(), {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(events),
            }).catch(function (err) {
                overwolf.windows
                    .getMainWindow()
                    ._overwolfEventBus.trigger(
                        "log",
                        "Error sending events: " + err
                    )
            })
        }
    }
}

export { Publisher }
