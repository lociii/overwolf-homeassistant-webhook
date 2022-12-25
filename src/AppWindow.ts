import { OWWindow } from "@overwolf/overwolf-api-ts"

// derived from https://github.com/overwolf/sample-app/blob/master/ts/src/AppWindow.ts
// published without an explicit license but communicated to be free to use by developers@overwolf.com

type Nullable<T> = T | null

// A base class for the app's foreground windows.
// Sets the modal and drag behaviors, which are shared accross the desktop and in-game windows.
export class AppWindow {
    protected currWindow: OWWindow
    protected mainWindow: OWWindow
    protected maximized: boolean = false

    constructor(windowName) {
        this.mainWindow = new OWWindow("background")
        this.currWindow = new OWWindow(windowName)

        const closeButton: Nullable<HTMLElement> =
            document.getElementById("closeButton")
        const maximizeButton: Nullable<HTMLElement> =
            document.getElementById("maximizeButton")
        const minimizeButton: Nullable<HTMLElement> =
            document.getElementById("minimizeButton")
        const header: Nullable<HTMLElement> = document.getElementById("header")

        // set the element that can be dragged
        this.setDrag(header)

        // click on the close button
        closeButton.addEventListener("click", (e) => {
            this.on_close(e)
            this.currWindow.close()
        })
        // click on the minimize button
        minimizeButton.addEventListener("click", (e) => {
            this.on_minimize(e)
            this.currWindow.minimize()
        })
        // click on the maximize button
        maximizeButton.addEventListener("click", (e) => {
            this.on_maximize(e)

            if (!this.maximized) {
                this.currWindow.maximize()
                maximizeButton.classList.remove("window-control-maximize")
                maximizeButton.classList.add("window-control-restore")
            } else {
                this.currWindow.restore()
                maximizeButton.classList.remove("window-control-restore")
                maximizeButton.classList.add("window-control-maximize")
            }

            this.maximized = !this.maximized
        })
    }

    public async getWindowState() {
        return await this.currWindow.getWindowState()
    }

    private async setDrag(elem: HTMLElement) {
        this.currWindow.dragMove(elem)
    }

    protected async on_close(e: Event) {
        return
    }

    protected async on_minimize(e: Event) {
        return
    }

    protected async on_maximize(e: Event) {
        return
    }
}
