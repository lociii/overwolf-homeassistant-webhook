const interestingFeatures = {
    // World of Warcraft
    765: ["gep_internal", "game_info", "location ", "player_info"],
    // Roblox
    4688: ["gep_internal", "game_info", "match_info"],
    // League of Legends
    5426: [
        "gep_internal",
        "summoner_info",
        "gameMode",
        "teams",
        "gold",
        "minions",
        "matchState",
        "level",
        "kill",
        "death",
        "respawn",
        "assist",
        "abilities",
        "counters",
        "match_info",
        "live_client_data",
        "heal",
        "damage",
        "jungle_camps",
        "team_frames",
        "chat",
        "announcer",
        "panel_location",
        "augments",
    ],
    // Final Fantasy XIV
    6350: ["gep_internal", "match_info"],
    // Path of Exile
    7212: ["gep_internal", "kill", "death", "match_info", "me", "game_info"],
    // Dota 2
    7314: [
        "gep_internal",
        "party",
        "roster",
        "match_info",
        "game_state_changed",
        "match_ended",
        "kill",
        "assist",
        "death",
        "cs",
        "hero_attributes_skilled",
        "hero_ability_skilled",
        "hero_ability_used",
        "me",
        "game",
        "match_state_changed",
        "clock_time_changed",
        "game_state",
        "damage",
        "counters",
    ],
    // Minecraft
    8032: ["gep_internal", "game_info", "match_info", "counters", "mods"],
    // Warframe
    8954: ["gep_internal", "game_info", "match_info", "chat"],
    // Rocket League
    10798: [
        "gep_internal",
        "stats",
        "match",
        "roster",
        "me",
        "match_info",
        "death",
        "game_info",
        "training",
    ],
    // Tom Clancy's Rainbow Six: Siege
    10826: [
        "gep_internal",
        "game_info",
        "match",
        "roster",
        "kill",
        "death",
        "match_info",
        "me",
        "defuser",
        "damage",
    ],
    // Overwatch 2
    10844: [
        "gep_internal",
        "match_info",
        "kill",
        "death",
        "assist",
        "game_info",
        "roster",
    ],
    // League of Legends Launcher
    10902: [
        "gep_internal",
        "summoner_info",
        "game_flow",
        "champ_select",
        "lobby_info",
        "end_game",
        "lcu_info",
        "game_info",
    ],
    // PLAYERUNKNOWN'S BATTLEGROUNDS
    10906: [
        "gep_internal",
        "kill",
        "match",
        "rank",
        "death",
        "location",
        "me",
        "team",
        "phase",
        "map",
        "roster",
        "revived",
        "killer",
        "counters",
        "match_info",
        "victimName",
        "kill_feed",
    ],
    // Fortnite Battle Royale
    21216: [
        "gep_internal",
        "items",
        "kill",
        "match_info",
        "rank",
        "me",
        "phase",
        "location",
        "team",
        "killed",
        "killer",
        "revived",
        "death",
        "counters",
        "match",
        "map",
        "game_info",
    ],
    // Magic the Gathering: Arena
    21308: ["gep_internal", "game_info", "match_info"],
    // Splitgate: Arena Warfare
    21404: [
        "gep_internal",
        "game_info",
        "match_info",
        "player",
        "location",
        "match",
        "feed",
        "connection",
        "kill",
        "death",
        "portal",
    ],
    // LOL Arena
    21556: [
        "gep_internal",
        "match",
        "summoner_info",
        "matchState",
        "live_client_data",
        "match_info",
        "augments",
        "damage",
        "heal",
        "teams",
    ],
    // Apex Legends
    21566: [
        "gep_internal",
        "match_state",
        "kill",
        "death",
        "me",
        "team",
        "revive",
        "rank",
        "location",
        "roster",
        "match_summary",
        "kill_feed",
        "damage",
        "inventory",
        "match_info",
        "game_info",
        "player_stats",
        "ring",
    ],
    // Teamfight Tactics
    21570: [
        "gep_internal",
        "match_info",
        "me",
        "roster",
        "store",
        "board",
        "bench",
        "carousel",
        "live_client_data",
        "match_stats",
    ],
    // Legends of Runeterra
    21620: ["gep_internal", "game_client_data", "match_info"],
    // Escape from Tarkov
    21634: ["gep_internal", "match_info", "game_info"],
    // Valorant
    21640: ["gep_internal", "game_info", "me", "kill", "death", "match_info"],
    // Genshin Impact
    21656: ["gep_internal", "game_info", "match_info"],
    // New World
    21816: ["gep_internal", "game_info"],
    // Lost Ark
    21864: ["gep_internal", "game_info", "match_info", "location"],
    // Call of Duty: Vanguard
    21876: ["gep_internal", "match_info", "game_info", "me", "kill", "death"],
    // Baldur's Gate III
    22088: ["gep_internal", "game_info", "match_info", "location"],
    // Minecraft Bedrock
    22176: ["gep_internal", "match_info", "game_info"],
    // Call of Duty: Modern Warfare II
    22328: ["gep_internal", "match_info", "game_info"],
    // Dark and Darker
    22584: ["gep_internal", "match_info"],
    // Sons Of The Forest
    22638: ["gep_internal", "match_info", "location"],
    // Diablo IV
    22700: ["gep_internal", "match_info", "game_info", "location", "me"],
    // Counter-Strike Global Offensive 2
    22730: ["gep_internal", "match_info", "live_data", "chat"],
    // Honkai: Star Rail
    22804: ["gep_internal", "game_info", "match_info"],
    // League of Legends PBE
    22848: [
        "gep_internal",
        "summoner_info",
        "gameMode",
        "teams",
        "gold",
        "minions",
        "matchState",
        "level",
        "kill",
        "death",
        "respawn",
        "assist",
        "abilities",
        "counters",
        "match_info",
        "live_client_data",
        "heal",
        "damage",
        "jungle_camps",
        "team_frames",
        "chat",
        "announcer",
    ],
    // Street Fighter 6
    22894: ["gep_internal", "match_info", "game_info"],
    // ARK: Survival Ascended
    23476: ["gep_internal", "match_info", "location", "game_info"],
    // The Finals
    23478: ["gep_internal", "game_info", "match_info"],
    // Lethal Company
    23522: ["gep_internal", "game_info", "match_info"],
    // Once Human
    23930: ["gep_internal", "game_info", "match_info"],
    // Palworld
    23944: ["gep_internal", "game_info", "match_info", "location"],
    // HELLDIVERS 2
    24000: ["gep_internal", "game_info", "match_info"],
    // Content Warning
    24110: ["gep_internal", "game_info", "match_info"],
    // Wuthering Waves
    24300: ["gep_internal", "game_info", "match_info"],
    // Supervive
    24346: ["gep_internal", "match_info", "game_info"],
    // Deadlock
    24482: ["gep_internal", "game_info", "match_info"],
    // Black Myth: Wukong
    24504: ["gep_internal", "game_info", "match_info"],
    // Warhammer 40000 Space Marine 2
    24548: ["gep_internal", "match_info", "game_info"],
    // Path of Exile 2
    24886: ["gep_internal", "me", "match_info", "death", "kill", "game_info"],
    // Marvel Rivals
    24890: ["gep_internal", "match_info", "game_info"],
    // Monster Hunter Wilds
    25446: ["gep_internal", "game_info", "match_info"],
    // R.E.P.O
    25448: ["gep_internal", "match_info", "game_info"],
    // Schedule I
    25610: ["gep_internal", "game_info", "match_info", "location"],
    // Splitgate 2
    25884: ["gep_internal", "match_info", "game_info"],
    // ELDEN RING NIGHTREIGN
    25918: ["gep_internal", "match_info", "game_info"],
    // PEAK
    26092: ["gep_internal", "game_info", "match_info"],
    // Rematch
    26120: ["gep_internal", "game_info", "match_info"],
    // Battlefield 6
    26462: ["gep_internal", "game_info", "match_info"],
    // 2XKO
    26840: ["gep_internal", "game_info", "match_info"],
    // ARC Raiders
    27168: ["gep_internal", "match_info", "game_info"],
    // Hytale
    27618: ["gep_internal", "match_info", "game_info"],
    // Arknight: Endfield
    27724: ["gep_internal", "match_info", "location", "game_info"],
    // Slay the Spire 2
    27858: ["gep_internal", "player_info", "match_info"],
    // Call of Duty General Instance
    27860: ["gep_internal", "game_info", "match_info"],
    // Windrose
    27886: ["gep_internal", "Location"],
    // Subnautica 2
    27936: ["gep_internal", "game_info", "match_info", "location "],
    // Teamfight Tactics PBE
    28162: [
        "gep_internal",
        "live_client_data",
        "carousel",
        "bench",
        "board",
        "store",
        "roster",
        "me",
        "match_info",
        "augments",
    ],
    // Teamfight Tactics
    28164: [
        "gep_internal",
        "match_info",
        "me",
        "roster",
        "store",
        "board",
        "bench",
        "carousel",
        "match_stats",
        "game_flow",
    ],
    // WoW Forever
    28268: ["gep_internal", "player_info", "game_info"],
    // Roblox - Rivals
    46883: ["gep_internal", "match_info", "game_info"],
    // LOL Arena PBE
    215561: [
        "gep_internal",
        "live_client_data",
        "matchState",
        "summoner_info",
        "match",
        "match_info",
        "augments",
        "damage",
        "heal",
        "teams",
    ],
}

const windowNames = {
    desktop: "desktop",
}

export { interestingFeatures, windowNames }
