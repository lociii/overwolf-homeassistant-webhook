import {windowNames, GameIDs} from "../consts";
import {OWGames, OWGameListener, OWWindow } from '@overwolf/overwolf-api-ts';
import RunningGameInfo = overwolf.games.RunningGameInfo;

class BackgroundController
{
    private static _instance: BackgroundController;
    private _windows: Record<string, OWWindow> = {};
    private _gameListener: OWGameListener;
  
    private constructor()
    {
        this._windows[windowNames.main] = new OWWindow(windowNames.main);
    
        this._gameListener = new OWGameListener(
        {
            onGameStarted: this.toggleWindows.bind(this),
            onGameEnded: this.toggleWindows.bind(this)
        });
    };
  
    public static instance(): BackgroundController
    {
        if (!BackgroundController._instance)
        {
            BackgroundController._instance = new BackgroundController();
        }
    
        return BackgroundController._instance;
    }
  
    public async run()
    {
        this._gameListener.start();
        const currWindowName = await this.isFortniteRunning() ? windowNames.main : null;
        this._windows[windowNames.main].restore();
    }
  
    private toggleWindows(info)
    {
        if (!info || !this.isSupportedGame(info))
        {
            return;
        }
    
        this._windows[windowNames.main].restore();
    }
  
    private async isFortniteRunning(): Promise<boolean>
    {
        const info = await OWGames.getRunningGameInfo();
        return info && info.isRunning && this.isSupportedGame(info);
    }
  
    private isSupportedGame(info: RunningGameInfo)
    {
        console.log(info.id)
        console.dir(GameIDs)
        console.log(GameIDs.includes(info.id))
        if (GameIDs.includes(info.id)) {return true;}
        else return false;
    }
}

BackgroundController.instance().run();
