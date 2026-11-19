import { windowNames, interestingFeatures } from "../consts"
import { OWWindow, OWGames, OWGamesEvents } from "@overwolf/overwolf-api-ts"
import { Config } from "../services/config"
import { EventBus } from "../services/eventbus"
import { Publisher } from "../services/publisher"

declare global {
    interface Window {
        _overwolfConfig: Config
        _overwolfEventBus: EventBus
    }
}

// define a nullable type
type Nullable<T> = T | null

class BackgroundController {
    // singleton instance holder
    private static _instance: Nullable<BackgroundController> = null

    // the game event listener that will actually connect to the game
    private _gameEventHelper: Nullable<OWGamesEvents> = null
    private _gameInfoRequestId: number = 0

    // remember which game was the last we started listening to
    private _currentGameId: Nullable<number> = null
    private _currentGameName: string = ""
    private _currentGameShortName: string = ""

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
        window._overwolfConfig = this._config
        window._overwolfEventBus = this._eventBus

        // wait for games to start/stop
        overwolf.games.onGameInfoUpdated.addListener(() => {
            this.refreshRunningGame()
        })
        this._eventBus.addListener((eventName: string) => {
            if (eventName == "configSaved") {
                this.refreshRunningGame()
            }
        })
        // just forward the error to the event bus
        overwolf.games.events.onError.addListener((e) => {
            this._eventBus.trigger("error", "APP: " + JSON.stringify(e))
        })

        // TODO: decide when to restore the desktop window
        this._desktopWindow.restore()
        await this.refreshRunningGame()
    }

    private async refreshRunningGame() {
        const requestId = ++this._gameInfoRequestId
        try {
            const gameInfo = await OWGames.getRunningGameInfo()
            if (requestId == this._gameInfoRequestId) {
                this.updateRunningGame(gameInfo)
            }
        } catch (error) {
            this._eventBus.trigger(
                "log",
                "APP: Could not query running game: " + error
            )
        }
    }

    private updateRunningGame(
        gameInfo: Nullable<overwolf.games.RunningGameInfo>
    ) {
        if (
            !gameInfo ||
            !gameInfo.isRunning ||
            !(gameInfo.classId in interestingFeatures) ||
            !this._config.isValid()
        ) {
            if (this._gameEventHelper != null) {
                this.stopListening(gameInfo)
            }
            return
        }

        if (gameInfo.classId == this._currentGameId) {
            return
        }

        if (this._gameEventHelper != null) {
            this.stopListening(gameInfo)
        }
        this.startListening(
            gameInfo.classId,
            gameInfo.title,
            gameInfo.shortTitle
        )
    }

    private async startListening(
        gameId: number,
        gameName: string,
        gameShortName: string
    ) {
        // check if our config is valid for reporting
        if (this._config.isValid() == false) {
            return
        }

        const gameEventHelper = new OWGamesEvents(
            {
                onInfoUpdates: (data: Object) => {
                    if (this._gameEventHelper == gameEventHelper) {
                        this.publishInfo(data)
                    }
                },
                onNewEvents: (data: Object) => {
                    if (this._gameEventHelper == gameEventHelper) {
                        this.publishEvent(data)
                    }
                },
            },
            interestingFeatures[gameId]
        )
        this._gameEventHelper = gameEventHelper
        this._currentGameId = gameId
        this._currentGameName = gameName
        this._currentGameShortName = gameShortName
        this._publisher.start()
        try {
            await gameEventHelper.start()
            if (this._gameEventHelper != gameEventHelper) {
                gameEventHelper.stop()
                return
            }
            this._eventBus.trigger(
                "log",
                "APP: Game event listener started for title: " + gameName
            )
        } catch (error) {
            if (this._gameEventHelper == gameEventHelper) {
                this.stopListening({ error: String(error) })
                this._eventBus.trigger(
                    "log",
                    "APP: Could not start game event listener: " + error
                )
            } else {
                gameEventHelper.stop()
            }
        }
    }

    private stopListening(e) {
        const gameEventHelper = this._gameEventHelper
        this._gameEventHelper = null
        gameEventHelper.stop()
        this._publisher.stop()
        this._currentGameId = null
        this._currentGameName = ""
        this._currentGameShortName = ""
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
            this._currentGameShortName,
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
            this._currentGameShortName,
            data
        )
    }

    private _tryDecodeStringifiedJSON(data: Object) {
        for (const fieldName of Object.keys(data)) {
            if (typeof data[fieldName] == "string") {
                try {
                    data[fieldName] = JSON.parse(data[fieldName])
                } catch (_) {}
            }
            if (data[fieldName] !== null && typeof data[fieldName] == "object") {
                this._tryDecodeStringifiedJSON(data[fieldName])
            }
        }
    }
}

BackgroundController.instance().run()
