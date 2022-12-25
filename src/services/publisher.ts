import { Config } from "../services/config"

class Publisher {
    private _events: Object[]
    private _config: Config
    private active: boolean = false
    private timeout: number

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

    public push(event: string, gameId: number, gameName: string, data: Object) {
        this._events.push({
            event: event,
            gameId: gameId,
            gameName: gameName,
            data: data,
        })
    }

    private eventuallySend() {
        if (this._events.length) {
            const events = this._events
            this._events = []

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
