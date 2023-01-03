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

        const storedThrottle = new Number(
            window.localStorage.throttle
        ).valueOf()
        if (isNaN(storedThrottle)) {
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
        return this._webhookUrl != "" && Number.isInteger(this._throttle)
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
        this._throttle = window.localStorage.throttle = new Number(
            throttle
        ).valueOf()
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
        let value_number = new Number(value).valueOf()
        if (isNaN(value_number)) {
            this._errors["throttle"] = "Throttle value is not a number"
            return false
        }
        if (!Number.isInteger(value_number)) {
            this._errors["throttle"] =
                "Throttle value is not an integer. Please don't use decimals."
            return false
        }
        return true
    }
}

export { Config }
