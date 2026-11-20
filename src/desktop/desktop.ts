import { AppWindow } from "../AppWindow"
import { windowNames } from "../consts"
import { Config } from "../services/config"
import { EventBus } from "../services/eventbus.js"
import type {
    AppEventArguments,
    AppEventListener,
} from "../services/eventbus.js"

class Desktop extends AppWindow {
    private static _instance: Desktop
    private _config: Config
    private _eventLog: HTMLElement
    private _eventBusListenerBound: AppEventListener
    private _overwolfEventBus: EventBus

    public static instance() {
        if (!this._instance) {
            this._instance = new Desktop()
        }

        return this._instance
    }

    private constructor() {
        super(windowNames.desktop)
        this._config = overwolf.windows.getMainWindow()._overwolfConfig
        this._overwolfEventBus =
            overwolf.windows.getMainWindow()._overwolfEventBus
        this._eventLog = this.getElement("eventlog", HTMLElement)
        this._eventBusListenerBound = this._eventBusListener.bind(this)
    }

    protected async on_close(e: Event) {
        // remove eventbus listener when desktop window gets closed
        this._overwolfEventBus.removeListener(this._eventBusListenerBound)
    }

    public async run() {
        // add our desktop window listener
        this._overwolfEventBus.addListener(this._eventBusListenerBound)

        // make sure our settings get saved
        this._registerFormHandler()

        // register handler to clear event log
        this._registerClearHandler()
    }

    private _registerFormHandler() {
        // get the webhook html input
        const webhookUrlElement = this.getElement(
            "webhook_url",
            HTMLInputElement
        )
        const throttleElement = this.getElement("throttle", HTMLInputElement)
        const saveButtonElement = this.getElement("save", HTMLInputElement)

        const formErrorElement = this.getElement("form_error", HTMLDivElement)
        const formSuccessElement = this.getElement(
            "form_success",
            HTMLDivElement
        )

        // set the current values
        webhookUrlElement.value = this._config.getWebhookUrl()
        throttleElement.value = String(this._config.getThrottle())

        // listen to clicks on the save button
        saveButtonElement.onclick = (e) => {
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
                    let element = document.getElementById("error_" + key)
                    if (element != null) {
                        element.innerHTML = errors[key]
                    }
                }
            } else {
                formSuccessElement.classList.add("show")
                this._overwolfEventBus.trigger("configSaved", {})
            }

            return false
        }
    }

    private _registerClearHandler() {
        const clearButtonElement = this.getElement("clear", HTMLInputElement)

        clearButtonElement.onclick = (e) => {
            this._eventLog.textContent = ""
        }
    }

    private _eventBusListener(...[eventName, eventValue]: AppEventArguments) {
        // listen to events on the eventbus
        switch (eventName) {
            case "log": {
                const entry = document.createElement("div")
                entry.textContent = eventValue
                if (this._eventLog.childElementCount == 0) {
                    this._eventLog.textContent = ""
                }
                this._eventLog.prepend(entry)
                while (this._eventLog.childElementCount > 100) {
                    this._eventLog.lastElementChild?.remove()
                }
            }
        }
    }
}

Desktop.instance().run()
