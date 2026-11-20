// derived from https://github.com/overwolf/sample-app/blob/master/native/scripts/services/event-bus.js

interface AppEvents {
    log: string
    error: string
    configSaved: Record<string, never>
}

type AppEventArguments = {
    [EventName in keyof AppEvents]: [
        eventName: EventName,
        eventValue: AppEvents[EventName],
    ]
}[keyof AppEvents]

type AppEventListener = (...event: AppEventArguments) => void

class EventBus {
    private _listeners: AppEventListener[]

    constructor() {
        this._listeners = []
    }

    addListener(eventHandler: AppEventListener) {
        this._listeners.push(eventHandler)
    }

    removeListener(eventHandler: AppEventListener) {
        const index = this._listeners.indexOf(eventHandler)

        if (index > -1) {
            this._listeners.splice(index, 1)
        }
    }

    trigger(...event: AppEventArguments) {
        this._listeners.forEach((listener) => listener(...event))
    }
}

export { EventBus }
export type { AppEventArguments, AppEventListener }
