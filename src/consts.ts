const GameIDs =
[
      765,  // World of Warcraft
    10906,  // PlayerUnkown's Battlegrounds
    21216,  // Fortnite
];

/*

const interestingFeatures =
[
      [765] = ["game_info", "gep_internal", "addons",],
     [7314] = ["game_state_changed", "match_ended", "kill", "assist", "death", "cs", "hero_attributes_skilled", "hero_ability_skilled", "hero_ability_used", "match_state_changed", "clock_time_changed",],
     [7764] = ["kill", "death", "assist", "headshot", "round_start", "match_start", "match_end", "team_round_win", "bomb_planted", "bomb_change", "reloading", "fired", "weapon_change", "weapon_acquired", "player_activity_change", "team_set", "mvp", "kill_feed",],
    [10906] = ["damage_dealt", "fire", "headshot", "kill", "knockout", "matchEnd", "matchStart", "matchSummary", "damageTaken", "death", "knockedout", "time_to_next_circle", "jump", "revived", "killer",],
    [21216] = ["hit", kill", "knockout", "generic", "killed", "killer", "revived", "death", "knockedout", "matchEnd", "matchStart",],
    [21566] = ["match_end", "match_start", "assist", "kill", "knockdown", "death", "knocked_out", "healed_from_ko", "respawn", "kill_feed", "damage",],
    [21586] = ["battle_end", "battle_start", "match_end", "match_outcome", "match_start", "round_outcome",],
    [21626] = ["match_end", "match_start", "kill", "death", "assist",],
    [21876] = ["match_end", "match_start", "round_outcome", "kill", "death",],
    [21848] = ["match_end", "match_start", "player_died", "player_spawn",],
    [21960] = ["match_end", "match_start",],
*/

const interestingFeatures =
[
    "game_info",
    "gep_internal",
    "damage_dealt", "fire", "headshot", "kill", "knockout", "matchEnd", "matchStart", "matchSummary", "damageTaken", "death", "knockedout", "time_to_next_circle", "jump", "revived", "killer",
    "hit", "generic",
];

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