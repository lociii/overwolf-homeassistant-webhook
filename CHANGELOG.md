# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

## 1.7.0 [2025-06-29]

-   Updated supported games and features
    -   Added support for League of Legends: Arena (22848)
    -   Added support for Marvel Rivals (24890)
    -   Added support for Schedule 1 (25610)
    -   Added support for Splitgate 2 (25884)
    -   Added support for Elden Ring Nightreign (25918)
    -   Added support for Rematch (26120)
    -   Added support for League of Legends: Arena PBE (215561)
    -   Added support for Teamfight Tactics PBE (215701)
    -   Removed support for Valheim (21668)
    -   Removed support for Eternal Return (21672)
    -   League of Legends: Arena (incl. PBE) and Teamfight Tactics (only PBE) are now reported with specific Game IDs again
    -   Game scraper: Change how we decide which games are supported and which are not

## 1.6.0 [2025-04-14]

-   Updated supported games and features
    -   Added support for Street Fighter 6 (22894)
    -   Added support for Monster Hunter Wilds (25446)
    -   Added support for REPO (25448)
    -   Removed support for League of Legends PBE: Arena (22848)
    -   Removed support for Marvel Rivals (24890)
    -   Removed support for Teamfight Tactics PBE (22848)
    -   League of Legends, League of Legends: Arena and Teamfight Tactics are now all reported as Game ID 5426

## 1.5.0 [2025-01-18]

### Changed

-   Updated supported games and features
    -   Added support for League of Legends: Swarm
    -   Added support for Supervive
    -   Added support for Deadlock
    -   Added support for Black Myth Wukong
    -   Added support for Call of Duty: Black Ops 6 and Call of Duty: Warzone 2.0
    -   Added support for Warhammer 40000 Space Marine 2
    -   Added support for Path of Exile 2
    -   Added support for Marvel Rivals
    -   Removed support for [World of Tanks](https://dev.overwolf.com/ow-native/live-game-data-gep/supported-games/deprecated/world-of-tanks)
    -   Removed support for [World of Warships](https://dev.overwolf.com/ow-native/live-game-data-gep/supported-games/deprecated/world-of-warships)
-   Renovate environment

## 1.4.1 [2024-09-06]

### Changed

-   Fix minimum required Overwolf version, thanks [@RHeynsZa](https://github.com/RHeynsZa)

## 1.4.0 [2024-08-21]

### Changed

-   Updated supported games and features
    -   Added support for Dark and Darker
    -   Added support for Hearthstone
    -   Added support for Roblox
    -   Added support for The First Descendant
    -   Added support for Wuthering Waves
    -   Improved support for Stormgate

## 1.3.0 [2024-06-19]

### Changed

-   Updated supported games and features

## 1.2.0 [2024-02-12]

### Changed

-   Limit event log to 100 events
-   Add button to manually clear event log
-   Fix dev environment with GitHub Codespaces

## 1.1.0 [2023-11-20]

### Changed

-   Event will now contain the short title of a game
-   Event key `event` has been renamed to `type`
-   Allow all .local URLs as hook targets
-   Updated feature scraper
-   Updated supported games and features

## 1.0.0 [2023-01-30]

-   Initial release
