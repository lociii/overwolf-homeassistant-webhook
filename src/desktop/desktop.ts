import { AppWindow } from "../AppWindow"
import { windowNames } from "../consts"
import { Config } from "../services/config"
import { EventBus } from "../services/eventbus.js"

type Nullable<T> = T | null

class Desktop extends AppWindow {
    private static _instance: Desktop
    private _config: Config
    private _eventLog: Nullable<HTMLElement>
    private _eventBusListenerBound
    private _overwolfEventBus: EventBus

    public static instance() {
        if (!this._instance) {
            this._instance = new Desktop()
        }

        return this._instance
    }

    private constructor() {
        super(windowNames.desktop)
        this._config = Config.instance()
        this._eventBusListenerBound = this._eventBusListener.bind(this)
    }

    protected async on_close(e: Event) {
        // remove eventbus listener when desktop window gets closed
        this._overwolfEventBus.removeListener(this._eventBusListenerBound)
    }

    public async run() {
        // get the event bus instance from the background window
        this._overwolfEventBus =
            overwolf.windows.getMainWindow()._overwolfEventBus
        // add our desktop window listener
        this._overwolfEventBus.addListener(this._eventBusListenerBound)

        // make sure our settings get saved
        this._registerFormHandler()

        // get the event log element
        this._eventLog = document.getElementById("eventlog")
    }

    private _registerFormHandler() {
        // get the webhook html input
        const webhookUrlElement = document.getElementById(
            "webhook_url"
        ) as HTMLInputElement
        const throttleElement = document.getElementById(
            "throttle"
        ) as HTMLInputElement
        const buttonElement = document.getElementById(
            "save"
        ) as HTMLInputElement
        const formErrorElement = document.getElementById(
            "form_error"
        ) as HTMLDivElement
        const formSuccessElement = document.getElementById(
            "form_success"
        ) as HTMLDivElement

        // set the current values
        webhookUrlElement.value = this._config.getWebhookUrl()
        throttleElement.value = this._config.getThrottle().toLocaleString()

        // listen to clicks on the save button
        buttonElement.onclick = (e) => {
            // reset results
            formSuccessElement.classList.remove("show")
            formErrorElement.classList.remove("show")
            Array.from(document.getElementsByClassName("form-error")).forEach(
                function (element, index, array) {
                    element.innerHTML = ""
                }
            )

            // try to save the new configuration
            if (
                !this._config.save(
                    webhookUrlElement.value,
                    throttleElement.value
                )
            ) {
                formErrorElement.classList.add("show")

                // show field errors
                const errors = this._config.getErrors()
                for (let key in errors) {
                    document.getElementById("error_" + key).innerHTML =
                        errors[key]
                }
            } else {
                formSuccessElement.classList.add("show")
            }

            return false
        }
    }

    private _eventBusListener(eventName: string, eventValue: object) {
        // listen to events on the eventbus
        switch (eventName) {
            case "log": {
                if (this._eventLog) {
                    this._eventLog.innerHTML =
                        eventValue + "<br>" + this._eventLog.innerHTML
                }
            }
        }
    }
}

Desktop.instance().run()
