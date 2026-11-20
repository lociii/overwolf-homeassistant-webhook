# overwolf-homeassistant-webhook

Send game events from overwolf to Home Assistant.

Events are sent fire and forget. There will be no validation that they were actually received and processed.
This delivery behavior is intentional: batches are discarded from the local queue when sent, HTTP response statuses are not checked, and failed requests are not retried. Network failures are logged, but the app does not track delivery or processing status.

The throttle controls the interval between batch sends, not the number of concurrent requests. Each interval sends at most 100 events. The queue holds at most 1,000 events; when full, the oldest event is discarded to retain recent state. These limits count events, not payload bytes.

Requests are aborted after 10 seconds. Sends do not wait for previous requests to finish, so slow endpoints can leave multiple requests in flight and batches may arrive out of order. There is no explicit concurrency limit. When game listening stops, all queued events are sent immediately in batches of at most 100, without waiting for responses. Failed or timed-out batches are not requeued.

## Disclaimer

This project is not endorsed by or affiliated with Overwolf or Home Assistant.

## Setup

A [step by step setup guide](https://github.com/lociii/homeassistant-overwolf-status/blob/main/info.md) has been added on the [Home Assistant integration repository](https://github.com/lociii/homeassistant-overwolf-status).

## Helpers

### Scrape game features

Overwolf is an ever expanding and improving ecosystem. From time to time they add support for new games or new info/events in existing games.
Run `npm run scrape` or the VSCode task `Scrape game features` to update `interestingFeatures` in `src/consts.ts` and all game ID lists in `public/manifest.json` directly. Disabled games, unpublished games, and unpublished features are excluded; every included game also requests `gep_internal`.

The scraper automatically formats both updated files with Prettier, resolving the local configuration for each file (including the settings in `package.json`).

Each game section in `src/consts.ts` includes a game-name comment from the update feed. Missing names are looked up in the developer website's GEP metadata, then scraped from Overwolf's supported-games website if still missing. Lookups use exact game IDs, not `displayId` aliases. If a name cannot be resolved, the update aborts before writing either file.

The generated feature map replaces the existing one, including any manual entries. Other source declarations and manifest settings are preserved. Failed requests, malformed responses, and missing source or manifest fields abort the update before either file is written.

Check deprecations on https://dev.overwolf.com/ow-native/live-game-data-gep/supported-games/deprecated/overview/

## How to contribute

To be able to actually run and test a development version, you need to be a developer that is allow-listed by Overwolf. See https://dev.overwolf.com/ow-native/reference/ow-sdk-introduction#get-whitelisted-as-a-developer for details. If you aren't whitelisted, the app just fails to be loaded.

### VSCode setup

- Install Docker Desktop for Windows
- Install VSCode
- Open VSCode
- Install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension
- Open the project in the remote container
- You need to run either `npm install` or the VSCode task `Install dependencies` to install the dependencies

### Build the application

- Run the VSCode task `Build` (`CTRL + Shift + B` or `CMD + Shift + B` by default)

The build runs TypeScript 7 type-checking for the application and utilities before webpack packages the app. Webpack uses esbuild for transpilation, retaining the ES2017 runtime target.

- `npm run typecheck` checks both the application and utilities without writing files.
- `npm run dev` watches and rebuilds the application. Run `npm run typecheck:watch` in a second terminal for application type errors; webpack transpilation does not check types.

The scraper runs through `tsx` and parses source with Babel rather than depending on TypeScript's removed legacy compiler API.

### Test it

Load the application as an unpackaged app in Overwolf:

- Open Overwolf
- Open Settings
- Open the `About` tab
- Click on `Development options`
- Click `Load unpacked extension...`
- Select the `dist` folder.

## Contributors

In order of first contribution date

- [Arco "Tex" Dielhof](https://github.com/Arco-Dielhof)
- [Jens "loci" Nistler](https://github.com/lociii)
- [Ruan Heyns](https://github.com/RHeynsZa)
