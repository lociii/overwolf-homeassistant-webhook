class Config {
    private static _instance: Config
    private _webhookUrl: string
    private _throttle: number
    private _errors: { [name: string]: string } = {}

    public static instance(): Config {
        if (!Config._instance) {
            Config._instance = new Config()
        }

        return Config._instance
    }

    constructor() {
        this._webhookUrl = window.localStorage.webhook_url || ""

        const storedThrottle = Number(window.localStorage.throttle)
        if (!this._isValidThrottle(storedThrottle)) {
            this._throttle = 500
        } else {
            this._throttle = storedThrottle
        }
    }

    public getWebhookUrl(): string {
        return this._webhookUrl
    }

    public getThrottle(): number {
        return this._throttle
    }

    public getErrors(): { [name: string]: string } {
        return this._errors
    }

    public isValid(): boolean {
        return (
            this._validateWebhookUrl(this._webhookUrl) &&
            this._isValidThrottle(this._throttle)
        )
    }

    public save(webhookUrl: string, throttle: string): boolean {
        // clean errors
        this._errors = {}

        // validate data
        if (
            !this._validateWebhookUrl(webhookUrl) ||
            !this._validateThrottle(throttle)
        ) {
            return false
        }

        // store new, validated data
        this._webhookUrl = window.localStorage.webhook_url = webhookUrl
        this._throttle = window.localStorage.throttle = Number(throttle)
        return true
    }

    private _validateWebhookUrl(value: string): boolean {
        let value_url: URL

        // check for valid url
        try {
            value_url = new URL(value)
        } catch (_) {
            this._errors["webhook_url"] = "Value is not a valid URL"
            return false
        }

        // check if nabu casa or local hook url
        // this is a limitation of the Overwolf platform which requires defining the url in the manifest.json file.
        // the only way to get around this is to use a local hook url or a nabu casa url.
        if (
            !(
                value_url.protocol == "https:" &&
                value_url.host == "hooks.nabu.casa"
            ) &&
            !(
                value_url.protocol == "http:" &&
                value_url.hostname.endsWith(".local")
            )
        ) {
            this._errors["webhook_url"] =
                "Value must be a https://hooks.nabu.casa or .local URL"
            return false
        }

        // TODO this doesn't work as we're not asynchronous
        // // try to connect the url
        // let self = this
        // fetch(value, {
        //     headers: { "Content-Type": "application/json" },
        //     method: "POST",
        //     body: JSON.stringify([{ test: true }]),
        // }).catch(function (err) {
        //     self._errors["webhook_url"] = [
        //         "Could not connect to URL, please make sure the ",
        //         "HomeAssistant integration is properly set up",
        //     ].join()
        //     return false
        // })

        return true
    }

    private _validateThrottle(value: string): boolean {
        if (!this._isValidThrottle(Number(value))) {
            this._errors["throttle"] =
                "Throttle must be an integer between 1 and 10000 milliseconds."
            return false
        }
        return true
    }

    private _isValidThrottle(value: number): boolean {
        return Number.isInteger(value) && value >= 1 && value <= 10000
    }
}

export { Config }
