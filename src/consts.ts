const interestingFeatures = {
    // League of Legends and Teamfight Tactics (Same GameID)
    5426: [
        "matchStart",
        "kill",
        "death",
        "respawn",
        "assist",
        "ability",
        "usedAbility",
        "ace",
        "defeat",
        "dominating",
        "double_kill",
        "executed",
        "first_blood",
        "godlike",
        "inhibitor_destroy",
        "inhibitor_respawn",
        "killing_spree",
        "legendary",
        "minions_30_sec",
        "minions_spawn",
        "penta_kill",
        "quadra_kill",
        "rampage",
        "self_slain",
        "shutdown",
        "slain",
        "triple_kill",
        "turret_destroy",
        "unstoppable",
        "victory",
        "welcome_rift",
        "match_clock",
        "port",
        "magic_damage_dealt_player",
        "magic_damage_dealt_to_champions",
        "magic_damage_taken",
        "physical_damage_dealt_player",
        "physical_damage_dealt_to_champions",
        "physical_damage_taken",
        "true_damage_dealt_player",
        "true_damage_dealt_to_champions",
        "true_damage_taken",
        "match_start",
        "battle_end",
        "battle_start",
        "match_end",
        "match_start",
        "round_end",
        "round_start",
    ],
    // StarCraft II
    5855: ["match_end", "match_start"],
    // World of Tanks
    6365: [
        "assist",
        "damage",
        "kill",
        "one_shot_kill",
        "death",
        "hit",
        "match_outcome",
    ],
    // Path of Exile
    7212: ["boss_kill", "death", "match_outcome"],
    // Dota 2
    7314: [
        "game_state_changed",
        "match_ended",
        "kill",
        "assist",
        "death",
        "cs",
        "hero_attributes_skilled",
        "hero_ability_skilled",
        "hero_ability_used",
        "match_state_changed",
        "clock_time_changed",
    ],
    // Counter-Strike: Global Offensive
    7764: [
        "kill",
        "death",
        "assist",
        "headshot",
        "round_start",
        "match_start",
        "match_end",
        "team_round_win",
        "bomb_planted",
        "bomb_change",
        "reloading",
        "fired",
        "weapon_change",
        "weapon_acquired",
        "player_activity_change",
        "team_set",
        "mvp",
        "kill_feed",
    ],
    // Minecraft
    8032: ["chat", "match_end", "match_start"],
    // Hearthstone
    9898: ["match_end", "match_outcome", "match_start"],
    // Heroes of the Storm
    10624: [
        "gates_opened",
        "match_end",
        "match_start",
        "talent_available",
        "assist",
        "kill",
        "minion_kill",
        "takedown",
        "death",
    ],
    // World of Warships
    10746: [
        "matchEnd",
        "matchOutcome",
        "matchStart",
        "damage",
        "kill",
        "ribbon",
        "death",
        "hit",
    ],
    // Rocket League
    10798: [
        "goal",
        "score",
        "teamGoal",
        "opposingTeamGoal",
        "defeat",
        "matchEnd",
        "matchStart",
        "victory",
        "playerJoined",
        "playerLeft",
        "rosterChange",
        "death",
    ],
    // Rainbow Six Siege
    10826: [
        "matchOutcome",
        "roundEnd",
        "roundOutcome",
        "roundStart",
        "headshot",
        "kill",
        "death",
        "killer",
        "knockedout",
        "match_end",
        "match_start",
        "defuser_disabled",
        "defuser_planted",
    ],
    // Overwatch
    10844: [
        "match_end",
        "match_start",
        "elimination",
        "objective_kill",
        "death",
    ],
    // PlayerUnkown's Battlegrounds
    10906: [
        // kill
        "kill",
        "knockout",
        "headshot",
        "damage_dealt",
        "fire",
        // match
        "matchStart",
        "matchEnd",
        "matchSummary",
        // location
        "time_to_next_circle",
        // me
        "jump",
        // revived
        "revived",
        // death
        "death",
        "knockedout",
        "damageTaken",
        // killer
        "killer",
    ],
    // Fortnite
    21216: [
        "hit",
        "kill",
        "knockout",
        "generic",
        "killed",
        "killer",
        "revived",
        "death",
        "knockedout",
        "matchEnd",
        "matchStart",
    ],
    // Magic: The Gathering Arena
    21308: ["draft_end", "draft_start"],
    // Splitgate: Arena Warfare
    21404: [
        "matchEnd",
        "matchOutcome",
        "matchStart",
        "killFeed",
        "disconnected",
        "reconnected",
        "headshot",
        "kill",
        "killThroughPortal",
        "meleeKill",
        "portalKill",
        "victim",
        "death",
        "killer",
        "portalClosed",
        "portalCreated",
        "portalUsed",
    ],
    // Apex Legends
    21566: [
        "match_end",
        "match_start",
        "assist",
        "kill",
        "knockdown",
        "death",
        "knocked_out",
        "healed_from_ko",
        "respawn",
        "kill_feed",
        "damage",
    ],
    // Dota Underlords
    21586: [
        "battle_end",
        "battle_start",
        "match_end",
        "match_outcome",
        "match_start",
        "round_outcome",
    ],
    // Call of Duty: Warzone Caldera
    21626: ["match_end", "match_start", "kill", "death", "assist"],
    // Escape From Tarkov
    21634: ["match_end", "match_start"],
    // Valorant
    21640: ["assist", "headshot", "kill", "death", "match_end", "match_start"],
    // Valheim
    21668: ["location", "respawn", "damage", "kill"],
    // Diablo 2 Resurrected
    21848: ["match_end", "match_start", "player_died", "player_spawn"],
    // Halo Infinite
    21854: ["match_end", "match_start", "kill", "death", "assist"],
    // Call of Duty: Vanguard
    21876: ["match_end", "match_start", "round_outcome", "kill", "death"],
    // Axie Infinity Origin
    21960: ["match_end", "match_start"],
}

const windowNames = {
    desktop: "desktop",
}

export { interestingFeatures, windowNames }
