# overwolf-homeassistant-webhook

Send game events from overwolf to Home Assistant.

Events are sent fire and forget. There will be no validation that they were actually received and processed.
This delivery behavior is intentional: batches are discarded from the local queue when sent, HTTP response statuses are not checked, and failed requests are not retried. Network failures are logged, but the app does not track delivery or processing status.

The throttle controls the interval between batch sends, not the number of concurrent requests. Sends do not wait for previous requests to finish, so slow endpoints can leave multiple requests in flight and batches may arrive out of order. There is no application-level request timeout, concurrency limit, or batch-size limit.

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
