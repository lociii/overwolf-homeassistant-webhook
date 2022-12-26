import { windowNames, interestingFeatures } from "../consts"
import { OWWindow, OWGamesEvents } from "@overwolf/overwolf-api-ts"
import { Config } from "../services/config"
import { EventBus } from "../services/eventbus"
import { Publisher } from "../services/publisher"

// declare the eventbus property to be part of our Window definition
declare global {
    interface Window {
        _overwolfEventBus: EventBus
    }
}

// define a nullable type
type Nullable<T> = T | null

class BackgroundController {
    // singleton instance holder
    private static _instance: Nullable<BackgroundController> = null

    // the game event listener that will actually connect to the game
    private _gameEventHelper: Nullable<OWGamesEvents>

    // remember which game was the last we started listening to
    private _currentGameId: Nullable<number> = null
    private _currentGameName: string = ""

    // helper objects
    private _config: Config
    private _desktopWindow: OWWindow
    private _eventBus: EventBus
    private _publisher: Publisher

    private constructor() {
        this._config = Config.instance()
        this._desktopWindow = new OWWindow(windowNames.desktop)
        this._eventBus = new EventBus()
        this._publisher = new Publisher(this._config)
    }

    public static instance(): BackgroundController {
        if (BackgroundController._instance == null) {
            BackgroundController._instance = new BackgroundController()
        }

        return BackgroundController._instance
    }

    public async run() {
        // These objects will be available via calling
        // overwolf.windows.getMainWindow() in other windows
        window._overwolfEventBus = this._eventBus

        // TODO: decide when to restore the desktop window
        this._desktopWindow.restore()

        // wait for games to start/stop
        overwolf.games.onGameInfoUpdated.addListener((e) => {
            this.onGameInfoUpdated(e)
        })
        // just forward the error to the event bus
        overwolf.games.events.onError.addListener((e) => {
            this._eventBus.trigger("error", "APP: " + JSON.stringify(e))
        })
    }

    private onGameInfoUpdated(e) {
        // game info event received
        if (e && e.gameInfo) {
            // no game running
            if (e.gameInfo.isRunning == false) {
                // unload listener if still active
                if (this._gameEventHelper != null) {
                    this.stopListening(e)
                }
                return
            }

            if (
                // game id sent
                e.gameInfo.classId &&
                // not the game we're currently listening to
                e.gameInfo.classId != this._currentGameId &&
                // game is supported
                e.gameInfo.classId in interestingFeatures &&
                // no listener running
                this._gameEventHelper == null
            ) {
                // start listening
                this.startListening(e.gameInfo.classId, e.gameInfo.title)
            }
        }
    }

    private startListening(gameId: number, gameName: string) {
        // check if our config is valid for reporting
        if (this._config.isValid() == false) {
            return
        }

        // subscribe game events
        this._gameEventHelper = new OWGamesEvents(
            {
                onInfoUpdates: this.publishInfo.bind(this),
                onNewEvents: this.publishEvent.bind(this),
            },
            interestingFeatures[gameId]
        )
        this._gameEventHelper.start()
        this._publisher.start()
        this._currentGameId = gameId
        this._currentGameName = gameName
        this._eventBus.trigger(
            "log",
            "APP: Game event listener started for title: " + gameName
        )
    }

    private stopListening(e) {
        this._gameEventHelper.stop()
        this._publisher.stop()
        this._gameEventHelper = null
        this._currentGameId = null
        this._currentGameName = ""
        this._eventBus.trigger(
            "log",
            "APP: Game event listener stopped: " + JSON.stringify(e)
        )
    }

    private publishInfo(data: Object) {
        this._tryDecodeStringifiedJSON(data)
        this._eventBus.trigger("log", "INFO: " + JSON.stringify(data))

        this._publisher.push(
            "info",
            this._currentGameId,
            this._currentGameName,
            data
        )
    }

    private publishEvent(data: Object) {
        this._tryDecodeStringifiedJSON(data)
        this._eventBus.trigger("log", "EVENT: " + JSON.stringify(data))

        this._publisher.push(
            "event",
            this._currentGameId,
            this._currentGameName,
            data
        )
    }

    private _tryDecodeStringifiedJSON(data: Object) {
        // some fields in overwolf responses are stringified json
        // we try to find and decode them
        for (let key in data) {
            if (typeof data[key] == "object") {
                this._tryDecodeStringifiedJSON(data[key])
            } else if (typeof data[key] == "string") {
                // try to parse the string as json
                try {
                    data[key] = JSON.parse(data[key])
                } catch (_) {}
            }
        }
    }
}

BackgroundController.instance().run()
