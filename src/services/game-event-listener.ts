import { isGameData } from "./game-data"

const featureAttempts = 10
const featureRetryMilliseconds = 3000
const callbackTimeoutMilliseconds = 10000

interface GameEventDelegate {
    onInfoUpdates(data: unknown): void
    onNewEvents(data: unknown): void
}

export class GameEventListener {
    private controller: AbortController | null = null
    private active = false

    constructor(
        private delegate: GameEventDelegate,
        private features: string[]
    ) {}

    public async start(): Promise<void> {
        this.stop()
        const controller = new AbortController()
        this.controller = controller
        const signal = controller.signal
        try {
            overwolf.games.events.onInfoUpdates2.addListener(this.onInfoUpdates)
            overwolf.games.events.onNewEvents.addListener(this.onNewEvents)
            await this.registerFeatures(signal)
            const result = await this.request<unknown>(signal, (resolve) =>
                overwolf.games.events.getInfo(resolve)
            )
            if (signal.aborted) {
                throw new Error("Game event listener startup cancelled")
            }
            if (
                !isGameData(result) ||
                result.status !== "success" ||
                !isGameData(result.res)
            ) {
                throw new Error(
                    "Initial game info query failed: " + JSON.stringify(result)
                )
            }
            this.active = true
            this.delegate.onInfoUpdates(result.res)
        } catch (error) {
            if (this.controller === controller) {
                this.stop()
            }
            throw error
        }
    }

    public stop(): void {
        this.active = false
        this.controller?.abort()
        this.controller = null
        overwolf.games.events.onInfoUpdates2.removeListener(this.onInfoUpdates)
        overwolf.games.events.onNewEvents.removeListener(this.onNewEvents)
    }

    private onInfoUpdates = (
        event: overwolf.games.events.InfoUpdates2Event
    ): void => {
        if (this.active) {
            this.delegate.onInfoUpdates(event.info)
        }
    }

    private onNewEvents = (
        event: overwolf.games.events.NewGameEvents
    ): void => {
        if (this.active) {
            this.delegate.onNewEvents(event)
        }
    }

    private async registerFeatures(signal: AbortSignal): Promise<void> {
        for (let attempt = 1; attempt <= featureAttempts; attempt++) {
            const result = await this.request<unknown>(signal, (resolve) =>
                overwolf.games.events.setRequiredFeatures(
                    this.features,
                    resolve
                )
            )
            if (isGameData(result) && result.status === "success") {
                if (
                    Array.isArray(result.supportedFeatures) &&
                    result.supportedFeatures.some(
                        (feature: unknown) =>
                            typeof feature === "string" &&
                            this.features.includes(feature)
                    )
                ) {
                    return
                }
                throw new Error("No requested game features are supported")
            }
            if (attempt === featureAttempts) {
                throw new Error(
                    "Game feature registration failed: " +
                        JSON.stringify(result)
                )
            }
            await this.request<void>(signal, (resolve) => {
                const timeout = setTimeout(resolve, featureRetryMilliseconds)
                return () => clearTimeout(timeout)
            })
        }
    }

    private request<Result>(
        signal: AbortSignal,
        invoke: (resolve: (result: Result) => void) => void | (() => void)
    ): Promise<Result> {
        return new Promise((resolve, reject) => {
            if (signal.aborted) {
                reject(new Error("Game event listener startup cancelled"))
                return
            }
            let settled = false
            let cleanupOperation: (() => void) | void
            const cleanup = () => {
                clearTimeout(timeout)
                signal.removeEventListener("abort", onAbort)
                cleanupOperation?.()
            }
            const fail = (error: unknown) => {
                if (!settled) {
                    settled = true
                    cleanup()
                    reject(error)
                }
            }
            const onAbort = () =>
                fail(new Error("Game event listener startup cancelled"))
            const timeout = setTimeout(
                () => fail(new Error("Game event provider callback timed out")),
                callbackTimeoutMilliseconds
            )
            signal.addEventListener("abort", onAbort, { once: true })
            try {
                cleanupOperation = invoke((result) => {
                    if (!settled) {
                        settled = true
                        cleanup()
                        resolve(result)
                    }
                })
                if (settled) {
                    cleanupOperation?.()
                }
            } catch (error) {
                fail(error)
            }
        })
    }
}
