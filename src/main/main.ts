import {OWGames, OWGamesEvents, OWHotkeys} from "@overwolf/overwolf-api-ts";
import {AppWindow} from "../AppWindow";
import {hotkeys, windowNames, interestingFeatures} from "../consts";
import WindowState = overwolf.windows.WindowStateEx;

class InGame extends AppWindow
{
    private static _instance: InGame;
    private gameEventListener: OWGamesEvents;
    private eventsLog: HTMLElement;
  
    private windowIsOpen = false;
    private gameInFocus = false;
    private LocalStorage;
  
    private constructor()
    {
        super(windowNames.main);
    
        this.LocalStorage = window.localStorage;
    
        let SavedPath = this.LocalStorage.SavedPath;
        console.log("Saved Path: " + SavedPath);

        this.eventsLog = document.getElementById("eventsLog");
    
        this.setToggleHotkeyBehavior();
        this.setToggleHotkeyText();
    }

    public static instance()
    {
        if (!this._instance)
        {
            this._instance = new InGame();
        }
  
        return this._instance;
    }

    public async run()
    {
        let GameStuff = this;
        overwolf.games.onGameInfoUpdated.addListener((e) => {this.onGameInfoUpdated(e)});
        overwolf.windows.onStateChanged.addListener((e) => {this.onWindowStateChanged(e)});
        overwolf.settings.hotkeys.onChanged.addListener((e) => {this.onHotkeyChanged(e)});
        overwolf.games.events.onError.addListener((e) => { console.log("Error:"); console.dir(e);});

        this.gameInFocus = await this.getGameInFocus();
    
        this.windowIsOpen = await this.getWindowIsOpen();
  
        const gameClassID = await this.getCurrentGameClassId();
        const gameFeatures = interestingFeatures;
        if (gameFeatures && gameFeatures.length)
        {
            console.log("if (gameFeatures && gameFeatures.length)");
            this.gameEventListener = new OWGamesEvents(
            {
                onInfoUpdates: this.onInfoUpdate.bind(this),
                onNewEvents: this.onNewEvents.bind(this)
            },
            gameFeatures);
    
            this.gameEventListener.start();
        }

        const URLInput = document.getElementById("URLInput") as HTMLInputElement;
        
        URLInput.value = GameStuff.LocalStorage.SavedPath;
        
        URLInput.onchange = (e) =>
        {
            console.log("URLInput.onchange", URLInput.value);
            GameStuff.LocalStorage.SavedPath = URLInput.value;
        };

        if (gameFeatures && gameFeatures.length)
        {
            this.gameEventListener = new OWGamesEvents
            (
                {
                    onInfoUpdates: this.onInfoUpdate.bind(this),
                    onNewEvents: this.onNewEvents.bind(this)
                },
                gameFeatures
            );

            this.gameEventListener.start();
        }
    }

    private onGameInfoUpdated(e)
    {
        const inFocus = (e && e.gameInfo && e.gameInfo.isRunning && e.gameInfo.isInFocus);
      
        if (this.gameInFocus !== inFocus)
        {
            this.gameInFocus = inFocus;
        }
    }

    private onWindowStateChanged(state)
    {
        if (state && state.window_state_ex && state.window_name === windowNames.main)
        {
            const isOpen = (state.window_state_ex === 'normal' || state.window_state_ex === 'maximized');
            //console.log(`onWindowStateChanged:`, state.window_state_ex, isOpen);
        
            if (this.windowIsOpen !== isOpen)
            {
                this.windowIsOpen = isOpen;
            }
        }
    }

    private onHotkeyChanged(e: overwolf.settings.hotkeys.OnChangedEvent)
    {
        this.setToggleHotkeyText();
    }

    private async getGameInFocus()
    {
        const gameInfo: overwolf.games.GetRunningGameInfoResult = await new Promise(resolve =>
        {
            overwolf.games.getRunningGameInfo(resolve);
        });
      
        const inFocus = Boolean(gameInfo && gameInfo.isRunning && gameInfo.isInFocus);
        return inFocus;
    }

    private async getWindowIsOpen()
    {
        const state: overwolf.windows.GetWindowStateResult = await new Promise(resolve =>
        {
            overwolf.windows.getWindowState(windowNames.main, resolve);
        });
      
        if (state && state.success && state.window_state_ex)
        {
            const isOpen = (state.window_state_ex === 'normal' || state.window_state_ex === 'maximized');
            return isOpen;
        }
      
        return false;
    }

    private onInfoUpdate(info)
    {
        fetch(this.LocalStorage.SavedPath, {method: "POST", body: JSON.stringify(info)});

        if (info.addons != undefined) 
        {
            let addonID = "";
            //console.log("AddOn Sync Received!");
            let addon = Object.entries(info.addons).find(([key, addonInfo]) => (addonInfo as string).includes("{\"name\":\"LociOWAppTestAddOn\""))
            if (addon != null)
            {
                addonID = addon[0];
            }

            let addonMsg = info.addons["var_" + addonID];
            if (addonMsg == null || addonMsg == "")
            {
                return;
            }
        }
    }

    private onNewEvents(info)
    {
        console.log("Info Received!");
        console.dir(info)
        let curGame = this;
        fetch(this.LocalStorage.SavedPath, {headers: {"Content-Type": "application/json"}, method: "POST", body: JSON.stringify(info)})
        .then((response) => response.json())
        .then((data) => {console.log("Reaction Received:"); console.log(data)});

        curGame.eventsLog.innerHTML = curGame.eventsLog.innerHTML + "<br>" + JSON.stringify(info);
    }

    private async setToggleHotkeyText()
    {
        const gameClassId = await this.getCurrentGameClassId();
        const hotkeyText = await OWHotkeys.getHotkeyText(hotkeys.toggle, gameClassId);
        const hotkeyElem = document.getElementById('hotkey');
        hotkeyElem.textContent = hotkeyText;
    }  

    private async setToggleHotkeyBehavior()
    {
        const toggleInGameWindow = async (
        hotkeyResult: overwolf.settings.hotkeys.OnPressedEvent
        ): Promise<void> =>
        {
            const inGameState = await this.getWindowState();

            if (inGameState.window_state === WindowState.NORMAL || inGameState.window_state === WindowState.MAXIMIZED)
            {
                this.currWindow.minimize();
            }
            else if (inGameState.window_state === WindowState.MINIMIZED || inGameState.window_state === WindowState.CLOSED)
            {
                this.currWindow.restore();
            }
        }

        OWHotkeys.onHotkeyDown(hotkeys.toggle, toggleInGameWindow);
    }

    private async getCurrentGameClassId(): Promise<number | null>
    {
        const info = await OWGames.getRunningGameInfo();
        return (info && info.isRunning && info.classId) ? info.classId : null;
    }
}

InGame.instance().run();