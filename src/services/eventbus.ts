// derived from https://github.com/overwolf/sample-app/blob/master/native/scripts/services/event-bus.js

class EventBus {
    private _listeners: Function[]

    constructor() {
        this._listeners = []
    }

    addListener(eventHandler: Function) {
        this._listeners.push(eventHandler)
    }

    removeListener(eventHandler: Function) {
        const index = this._listeners.indexOf(eventHandler)

        if (index > -1) {
            this._listeners.splice(index, 1)
        }
    }

    trigger(eventName: string, eventValue: Object) {
        this._listeners.forEach((listener) => listener(eventName, eventValue))
    }
}

export { EventBus }
