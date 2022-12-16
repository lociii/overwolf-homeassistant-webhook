const GameIDs =
[
    //765,  // World of Warcraft
     5426,  // League of Legends and Teamfight Tactics (Same GameID)
     5855,  // StarCraft II
   //6350,  // Final Fantasy XIV
     6365,  // World of Tanks
     7212,  // Path of Exile
     7314,  // Dota 2
     7764,  // Counter-Strike: Global Offensive
     8032,  // Minecraft
   //8954,  // Warframe
     9898,  // Hearthstone
    10624,  // Heroes of the Storm
    10746,  // World of Warships
    10798,  // Rocket League
    10826,  // Rainbow Six Siege
    10844,  // Overwatch
    10906,  // PlayerUnkown's Battlegrounds
    21216,  // Fortnite
    21308,  // Magic: The Gathering Arena
  //21328,  // Hunt: Showdown
    21404,  // Splitgate: Arena Warfare
    21566,  // Apexx Legends
    21586,  // Dota Underlords
  //21620,  // Legends of Runeterra
    21626,  // Call of Duty: Warzone Caldera
    21634,  // Escape From Tarkov
    21640,  // Valorant
  //21666,  // Football Manager 2021
    21668,  // Valheim
  //21672,  // Eternal Return
  //21816,  // New World
    21848,  // Diablo 2 Resurrected
    21854,  // Halo Infinite
  //21865,  // Football Manager 2022
    21876,  // Call of Duty: Vanguard
    21960,  // Axie Infinity Origin
];

const interestingFeatures =
{
     "5426": ["matchStart", "kill", "death", "respawn", "assist", "ability", "usedAbility", "ace", "defeat", "dominating", "double_kill", "executed", "first_blood", "godlike", "inhibitor_destroy", "inhibitor_respawn", "killing_spree", "legendary", "minions_30_sec", "minions_spawn", "penta_kill", "quadra_kill", "rampage", "self_slain", "shutdown", "slain", "triple_kill", "turret_destroy", "unstoppable", "victory", "welcome_rift", "match_clock", "port", "magic_damage_dealt_player", "magic_damage_dealt_to_champions", "magic_damage_taken", "physical_damage_dealt_player", "physical_damage_dealt_to_champions", "physical_damage_taken", "true_damage_dealt_player", "true_damage_dealt_to_champions", "true_damage_taken", "match_start", "battle_end", "battle_start", "match_end", "match_start", "round_end", "round_start",],
     "5855": ["match_end", "match_start"],
     "6365": ["assist", "damage", "kill", "one_shot_kill", "death", "hit", "match_outcome",],
     "7212": ["boss_kill", "death", "match_outcome",],
     "7314": ["game_state_changed", "match_ended", "kill", "assist", "death", "cs", "hero_attributes_skilled", "hero_ability_skilled", "hero_ability_used", "match_state_changed", "clock_time_changed",],
     "7764": ["kill", "death", "assist", "headshot", "round_start", "match_start", "match_end", "team_round_win", "bomb_planted", "bomb_change", "reloading", "fired", "weapon_change", "weapon_acquired", "player_activity_change", "team_set", "mvp", "kill_feed",],
     "8032": ["chat", "match_end", "match_start",],
     "9898": ["match_end", "match_outcome", "match_start"],
    "10624": ["gates_opened", "match_end", "match_start", "talent_available", "assist", "kill", "minion_kill", "takedown", "death",],
    "10746": ["matchEnd", "matchOutcome", "matchStart", "damage", "kill", "ribbon", "death", "hit",],
    "10798": ["goal", "score", "teamGoal", "opposingTeamGoal", "defeat", "matchEnd", "matchStart", "victory", "playerJoined", "playerLeft", "rosterChange", "death",],
    "10826": ["matchOutcome", "roundEnd", "roundOutcome", "roundStart", "headshot", "kill", "death", "killer", "knockedout", "match_end", "match_start", "defuser_disabled", "defuser_planted",],
    "10844": ["match_end", "match_start", "elimination", "objective_kill", "death",],
    "10906": ["damage_dealt", "fire", "headshot", "kill", "knockout", "matchEnd", "matchStart", "matchSummary", "damageTaken", "death", "knockedout", "time_to_next_circle", "jump", "revived", "killer",],
    "21216": ["hit", "kill", "knockout", "generic", "killed", "killer", "revived", "death", "knockedout", "matchEnd", "matchStart",],
    "21308": ["draft_end", "draft_start",],
    "21404": ["matchEnd", "matchOutcome", "matchStart", "killFeed", "disconnected", "reconnected", "headshot", "kill", "killThroughPortal", "meleeKill", "portalKill", "victim", "death", "killer", "portalClosed", "portalCreated", "portalUsed",],
    "21566": ["match_end", "match_start", "assist", "kill", "knockdown", "death", "knocked_out", "healed_from_ko", "respawn", "kill_feed", "damage",],
    "21586": ["battle_end", "battle_start", "match_end", "match_outcome", "match_start", "round_outcome",],
    "21626": ["match_end", "match_start", "kill", "death", "assist",],
    "21634": ["match_end", "match_start",],
    "21640": ["assist", "headshot", "kill", "death", "match_end", "match_start",],
    "21668": ["location", "respawn", "damage", "kill",],
    "21848": ["match_end", "match_start", "player_died", "player_spawn",],
    "21854": ["match_end", "match_start", "kill", "death", "assist",],
    "21876": ["match_end", "match_start", "round_outcome", "kill", "death",],
    "21960": ["match_end", "match_start",],
};


// const interestingFeatures =
// [
//     "game_info",
//     "gep_internal",
//     "damage_dealt", "fire", "headshot", "kill", "knockout", "matchEnd", "matchStart", "matchSummary", "damageTaken", "death", "knockedout", "time_to_next_circle", "jump", "revived", "killer",
//     "hit", "generic",
// ];

const windowNames =
{
    main: "main"
};

const hotkeys =
{
    toggle: "showhide"
};

export
{
    GameIDs,
    interestingFeatures,
    windowNames,
    hotkeys
}