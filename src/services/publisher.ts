import { Config } from "../services/config"

const maxQueuedEvents = 1000
const maxBatchEvents = 100
const requestTimeoutMilliseconds = 10000

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
        while (this._events.length > 0) {
            this.eventuallySend()
        }
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
        if (this._events.length > maxQueuedEvents) {
            this._events.splice(0, this._events.length - maxQueuedEvents)
        }
    }

    private eventuallySend() {
        if (this._events.length === 0) {
            return
        }

        const events = this._events
        this._events = events.slice(maxBatchEvents)
        events.length = Math.min(events.length, maxBatchEvents)
        void this.sendBatch(events)
    }

    private async sendBatch(events: Object[]) {
        const controller = new AbortController()
        const requestTimeout = setTimeout(
            () => controller.abort(),
            requestTimeoutMilliseconds
        )
        try {
            await fetch(this._config.getWebhookUrl(), {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(events),
                signal: controller.signal,
            })
        } catch (error) {
            overwolf.windows
                .getMainWindow()
                ._overwolfEventBus.trigger(
                    "log",
                    "Error sending events: " + error
                )
        } finally {
            clearTimeout(requestTimeout)
        }
    }
}

export { Publisher }
