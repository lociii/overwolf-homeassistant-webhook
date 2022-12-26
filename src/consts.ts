const interestingFeatures = {
    // World of Warcraft
    // https://overwolf.github.io/api/games/events/world-of-warcraft
    765: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: group_applicants
        "game_info",
        // info updates: addon_xx
        "addons",
    ],
    // Teamfight Tactics
    // https://overwolf.github.io/api/games/events/teamfight-tactics
    5426: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: is_pbe
        "game_info",
        // info updates: active_player, all_players, events, game_data
        "live_client_data",
        // info updates: summoner_name, xp, health, rank, gold, augments
        "me",
        // info updates: pseudo_match_id, battle_state, match_state, round_type, round_outcome, opponent, game_mode, local_player_damage
        // events: round_start, round_end, battle_start, battle_end, match_start, match_end
        "match_info",
        // info updates: player_status
        "roster",
        // info updates: shop_pieces
        "store",
        // info updates: board_pieces
        "board",
        // info updates: bench_pieces
        "bench",
        // info updates: carousel_pieces
        "carousel",
    ],
    // StarCraft II
    // https://overwolf.github.io/api/games/events/starcraft-2
    5855: [
        // info updates: gep_internal
        "gep_internal",
        // events: match_start, match_end
        "match_info",
    ],
    // Final Fantasy XIV
    // https://overwolf.github.io/api/games/events/final-fantasy-xiv
    6350: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: contact_xx
        "match_info",
    ],
    // World of Tanks
    // https://overwolf.github.io/api/games/events/world-of-tanks
    6365: [
        // info updates: gep_internal
        "gep_internal",
        // events: kill, one_shot_kill, damage, assist
        "kill",
        // events: death, hit
        "death",
        // info updates: game_start_timestamp, game_state, map_name
        "game_info",
        // info updates: pseudo_match_id
        // events: match_outcome
        "match_info",
    ],
    // Path of Exile
    // https://overwolf.github.io/api/games/events/path-of-exile
    7212: [
        // info updates: gep_internal
        "gep_internal",
        // events: boss_kill
        "kill",
        // events: death
        "death",
        // info updates: character_name, character_level
        "me",
        // info updates: current_zone, opened_page
        // events: match_outcome
        "match_info",
    ],
    // Dota 2
    // https://overwolf.github.io/api/games/events/dota-2
    7314: [
        // info updates: gep_internal
        "gep_internal",
        // events: new_game, game_over
        "game_state",
        // events: game_state_changed
        "game_state_changed",
        // events: match_state_changed
        "match_state_changed",
        // events: match_detected
        "match_detected",
        "daytime_changed",
        "clock_time_changed",
        "ward_purchase_cooldown_changed",
        // events: match_ended
        "match_ended",
        // events: kill
        "kill",
        // events: assist
        "assist",
        // events: death
        "death",
        // events: cs
        "cs",
        // events: xpm
        "xpm",
        // events: gpm
        "gpm",
        // events: gold
        "gold",
        "hero_leveled_up",
        // events: hero_respawned
        "hero_respawned",
        // events: hero_buyback_info_changed
        "hero_buyback_info_changed",
        // events: hero_boughtback
        "hero_boughtback",
        // events: hero_health_mana_info
        "hero_health_mana_info",
        // events: hero_status_effect_changed
        "hero_status_effect_changed",
        // events: hero_attributes_skilled
        "hero_attributes_skilled",
        // events: hero_ability_skilled
        "hero_ability_skilled",
        // events: hero_ability_used
        "hero_ability_used",
        // events: hero_ability_cooldown_changed
        "hero_ability_cooldown_changed",
        // events: hero_ability_changed
        "hero_ability_changed",
        // events: hero_item_cooldown_changed
        "hero_item_cooldown_changed",
        // events: hero_item_changed
        "hero_item_changed",
        // events: hero_item_used
        "hero_item_used",
        // events: hero_item_consumed
        "hero_item_consumed",
        // events: hero_item_charged
        "hero_item_charged",
        // info updates: pseudo_match_id, game_mode, team_score
        "match_info",
        // info updates: players, bans, draft
        "roster",
        // info updates: party
        "party",
        // info updates: plugin_error
        "error",
        // info updates: hero_pool
        "hero_pool",
        // info updates: team, steam_id, hero
        "me",
        // info updates: game_state, match_state
        "game",
    ],
    // Counter-Strike: Global Offensive
    // https://overwolf.github.io/api/games/events/counter-strike-global-offensive
    7764: [
        // info updates: gep_internal
        "gep_internal",
        "match_info",
        // events: kill
        "kill",
        // events: death
        "death",
        // events: assist
        "assist",
        // events: headshot
        "headshot",
        // events: round_start
        "round_start",
        // events: match_start
        "match_start",
        // events: match_end
        "match_end",
        // events: team_round_win
        "team_round_win",
        // events: bomb_planted
        "bomb_planted",
        // events: bomb_change
        "bomb_change",
        // events: reloading
        "reloading",
        // events: fired
        "fired",
        // events: weapon_change
        "weapon_change",
        // events: weapon_acquired
        "weapon_acquired",
        // info updates: totalKills, totalDeaths, totalMvps, score, team, steamid, map, mode, numOfRound, phase, scene
        "info",
        // info updates: lobby, match
        "roster",
        // events: player_activity_change
        "player_activity_change",
        // events: team_set
        "team_set",
        // info updates: replay_list
        "replay",
        // info updates: ping
        "counters",
        // events: mvp
        "mvp",
        // info updates: scoreboard_xx
        "scoreboard",
        // events: kill_feed
        "kill_feed",
    ],
    // Minecraft
    // https://overwolf.github.io/api/games/events/minecraft
    8032: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: scene, name, player_X, mc_version
        "game_info",
        // info updates: server, general_stats, items_stats, mobs_stats, location, facing
        // events: match_start, match_end, chat
        "match_info",
        // info updates: addon_xxx
        "mods",
        // info updates: ping
        "counters",
    ],
    // Warframe
    // https://overwolf.github.io/api/games/events/warframe
    8954: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: username
        "game_info",
        // info updates: inventory, highlighted
        "match_info",
    ],
    // Hearthstone
    // https://overwolf.github.io/api/games/events/hearthstone
    9898: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: scene_state
        "scene_state",
        // info updates: collection
        "collection",
        // info updates: [deck_id], selected_deck, Adventure Deck, adventure_loot_options
        "decks",
        // info updates: localPlayer, opponent, match_type, battlegrounds_rating, adventure_stats
        // events: match_start, match_end, match_outcome
        "match",
        // info updates: pseudo_match_id
        "match_info",
        // info updates: arena_draft
        "arena",
    ],
    // Heroes of the Storm
    // https://overwolf.github.io/api/games/events/heroes-of-the-storm
    10624: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: pseudo_match_id, teams_level, score, match_state, game_mode, draft_XX, bans_XX
        // events: match_start, match_end, talent_available, gates_opened
        "match_info",
        // info updates: battletag
        "me",
        // info updates: scene
        "game_info",
        // info updates: roster
        "roster",
        // events: death
        "death",
        // events: kill, assist, minion_kill, takedown
        "kill",
    ],
    // World of Warships
    // https://overwolf.github.io/api/games/events/world-of-warships
    10746: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: game_start_timestamp, scene
        "game_info",
        // info updates: realm, id, playerName
        "account_info",
        // info updates: mapName, players, health, name, level, burning, flooding, nation, state
        // events: matchStart, matchEnd, matchOutcome
        "match",
        // info updates: pseudo_match_id
        "match_info",
        // events: kill, damage, ribbon
        "kill",
        // events: death, hit
        "death",
    ],
    // Rocket League
    // https://overwolf.github.io/api/games/events/rocket-league
    10798: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: player0 / player1 … palyerN(N = number of players in the match)
        // events: goal, score, teamGoal, opposingTeamGoal
        "stats",
        // info updates: started, ended, matchType, ranked, maxPlayers, gameMode, gameState, gameType
        // events: matchStart, matchEnd, victory, defeat
        "match",
        // info updates: player0 / player1 … palyerN(N = number of players in the match), team1 / team2, team1_score / team2_score
        // events: rosterChange, playerJoined, playerLeft
        "roster",
        // info updates: steamId, name, goals, score, team, team_score
        "me",
        // info updates: pseudo_match_id, mutator_settings, arena, server_info
        // events: action_points
        "match_info",
        // events: death
        "death",
        // info updates: trade_menu_opened, trade_my_proposition, trade_opponent_proposition, car_look_inventory, trade_my_inventory
        "game_info",
    ],
    // Rainbow Six Siege
    // https://overwolf.github.io/api/games/events/rainbow-six-siege
    10826: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: phase
        "game_info",
        // info updates: number, score
        // events: roundStart, roundEnd, roundOutcome, matchOutcome
        "match",
        // info updates: pseudo_match_id, game_mode, game_mode_log, match_id, map_id, round_outcome_type, general_log, match_start_log, round_start_log, round_end_log, move_log, score_log, kill_log, ko_log, death_log, match_end_log
        // events: match_start, match_end
        "match_info",
        // info updates: roster_XX, team, health, score, kills, deaths, operator, player_id
        "roster",
        // events: kill, headshot
        "kill",
        // events: knockedout, death, killer
        "death",
        // info updates: name, account_id, account_id_log
        "me",
        // events: defuser_planted, defuser_disabled
        "defuser",
    ],
    // Overwatch
    // https://overwolf.github.io/api/games/events/overwatch
    10844: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: game_state, game_mode
        "game_info",
        // info updates: pseudo_match_id, map
        // events: match_start, match_end
        "match_info",
        // info updates: eliminations, objective_kills
        // events: elimination, objective_kill
        "kill",
        // info updates: deaths
        // events: death
        "death",
    ],
    // PlayerUnkown's Battlegrounds
    // https://overwolf.github.io/api/games/events/player-unknowns-battlegrounds
    10906: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: kills, headshots, total_damage_dealt, max_kill_distance
        // events: kill, knockout, headshot, damage_dealt, fire
        "kill",
        // events: revived
        "revived",
        // events: death, knockedout, damageTaken
        "death",
        // events: killer
        "killer",
        // info updates: mode, match_id
        // events: matchStart, matchEnd, matchSummary
        "match",
        // info updates: pseudo_match_id
        "match_info",
        // info updates: me, total
        "rank",
        // info updates: ping
        "counters",
        // info updates: location, safe_zone, blue_zone, red_zone
        // events: time_to_next_circle
        "location",
        // info updates: name, bodyPosition, inVehicle, aiming, view, freeView, movement, inventory_XX, equipped_XX, weaponState, health, stance
        // events: jump
        "me",
        // info updates: nicknames, team_location, team_index
        "team",
        // info updates: phase
        "phase",
        // info updates: map
        "map",
        // info updates: roster_XX
        "roster",
    ],
    // Fortnite
    // https://overwolf.github.io/api/games/events/fortnite
    21216: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: kills
        // events: kill, knockout, hit
        "kill",
        // events: killed
        "killed",
        // events: killer
        "killer",
        // events: revived
        "revived",
        // events: death, knockedout
        "death",
        // info updates: mode
        // events: matchStart, matchEnd
        "match",
        // info updates: pseudo_match_id, sessionID, matchID, userID, ticketID, partyID, skirmish, roster
        // events: generic
        "match_info",
        // info updates: rank, total_teams, total_players
        "rank",
        // info updates: name, health, accuracy, shield, total_shots
        "me",
        // info updates: phase
        "phase",
        // info updates: location
        "location",
        // info updates: nicknames
        "team",
        // info updates: item_X, selected_slot, quickbar_X, selected_material
        "items",
        // info updates: ping
        "counters",
        // info updates: map, creative_map
        "map",
    ],
    // Magic: The Gathering Arena
    // https://overwolf.github.io/api/games/events/magic-the-gathering-arena
    21308: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: scene, sideboard_cards, main_deck_cards, inventory_cards, inventory_stats
        "game_info",
        // info updates: draft_pack, draft_cards, draft_picked_card
        // events: draft_start, draft_end
        "match_info",
    ],
    // Hunt: Showdown
    // https://overwolf.github.io/api/games/events/hunt-showdown
    21328: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: scene
        "game_info",
    ],
    // Splitgate: Arena Warfare
    // https://overwolf.github.io/api/games/events/splitgate-arena-warfare
    21404: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: scene
        "game_info",
        // info updates: mapName, mode, state, timer, score, type
        "match_info",
        // info updates: name, health, team, kills, deaths, assists, doubleKills, tripleKills, quadKills, quintKills, sexKills, killstreak1, killstreak2, killstreak3, killstreak4, killstreak5, killstreak6, headshotKills, meleeKills, portalKills, killsThroughPortal, teabags
        "player",
        // info updates: location
        "location",
        // events: matchOutcome, matchStart, matchEnd
        "match",
        // events: killFeed
        "feed",
        // events: disconnected, reconnected
        "connection",
        // events: kill, victim, headshot, meleeKill, portalKill, killThroughPortal, teabag
        "kill",
        // events: death, killer
        "death",
        // events: portalCreated, portalClosed, portalUsed
        "portal",
        // events: assist
        "assist",
    ],
    // Apex Legends
    // https://overwolf.github.io/api/games/events/apex-legends
    21566: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: name, ultimate_cooldown
        "me",
        // info updates: teammate_X, legendSelect_X
        "team",
        // events: kill, knockdown, assist
        "kill",
        // info updates: totalDamageDealt
        // events: damage
        "damage",
        // events: knocked_out, death
        "death",
        // events: healed_from_ko, respawn
        "revive",
        // info updates: match_state
        // events: match_start, match_end, round_start, round_end
        "match_state",
        // info updates: phase
        "game_info",
        // info updates: pseudo_match_id, game_mode, tabs, map_id, arena_score
        "match_info",
        // info updates: inventory_XX, weapons, inUse
        "inventory",
        // info updates: location
        "location",
        // info updates: match_summary
        "match_summary",
        // info updates: roster_XX
        "roster",
        // info updates: victory
        "rank",
        // events: kill_feed
        "kill_feed",
    ],
    // Dota Underlords
    // https://overwolf.github.io/api/games/events/dota-underlords
    21586: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: mode, round_type, round_state
        // events: match_start, match_end, battle_start, battle_end, round_outcome, match_outcome
        "match_info",
    ],
    // Legends of Runeterra
    // https://overwolf.github.io/api/games/events/legends-of-runeterra
    21620: [
        // info updates: active_deck, card_positions, expeditions, game_result
        "game_client_data",
    ],
    // Call of Duty: Warzone Caldera
    // https://overwolf.github.io/api/games/events/call-of-duty-warzone-caldera
    21626: [
        // info updates: gep_internal
        "gep_internal",
        // events: match_start, match_end
        "match_info",
        // info updates: battlenet_tag
        "game_info",
        // events: kill
        "kill",
        // events: assist
        "assist",
        // events: death
        "death",
    ],
    // Escape From Tarkov
    // https://overwolf.github.io/api/games/events/escape-from-tarkov
    21634: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: map
        // events: match_start, match_end
        "match_info",
        // info updates: phase
        "game_info",
    ],
    // Valorant
    // https://overwolf.github.io/api/games/events/valorant
    21640: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: player_name, player_id, region, agent
        "me",
        // info updates: scene, state
        "game_info",
        // info updates: pseudo_match_id, round_number, score, round_phase, team, match_outcome, round_report, game_mode, roster, scoreboard, kill_feed
        // events: match_start, match_end
        "match_info",
        // info updates: kills, assists, headshots
        // events: kill, assist, headshot
        "kill",
        // info updates: deaths
        // events: death
        "death",
    ],
    // Football Manager 2021
    // https://overwolf.github.io/api/games/events/football-manager-2021
    21666: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: score, notable
        "match_info",
    ],
    // Valheim
    // https://overwolf.github.io/api/games/events/valheim
    21668: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: scene, player_name, death, state, time, inventory
        // events: respawn, location
        "game_info",
        // events: damage, kill
        "kill",
    ],
    // Eternal Return
    // https://overwolf.github.io/api/games/events/eternal-return
    21672: [],
    // New World
    // https://overwolf.github.io/api/games/events/new-world
    21816: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: location, map, player_name, world_name
        "game_info",
    ],
    // Diablo 2 Resurrected
    // https://overwolf.github.io/api/games/events/diablo-2-resurrected
    21848: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: player_level, player_class, player_experience
        "game_info",
        // info updates: act, item_x, character_name, player_stats
        // events: match_start, match_end, player_spawn, player_died, dropped_item
        "match_info",
    ],
    // Halo Infinite
    // https://overwolf.github.io/api/games/events/halo-infinite
    21854: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: scene
        "game_info",
        // info updates: local_player_stats, playlist, game_type, game_mode, match_outcome
        // events: match_start, match_end
        "match_info",
        // events: kill
        "kill",
        // events: assist
        "assist",
        // events: death
        "death",
        // info updates: roster_XX
        "roster",
    ],
    // Football Manager 2022
    // https://overwolf.github.io/api/games/events/football-manager-2022
    21856: [
        // info updates: gep_internal
        "gep_internal",
        // info updates: score, notable
        "match_info",
    ],
    // Call of Duty: Vanguard
    // https://overwolf.github.io/api/games/events/call-of-duty-vanguard
    21876: [
        // info updates: gep_internal
        "gep_internal",
        // events: match_start, match_end, round_outcome
        "match_info",
        // info updates: scene, game_mode
        "game_info",
        // info updates: player_name
        "me",
        // events: kill
        "kill",
        // events: death
        "death",
    ],
    // Axie Infinity Origin
    // https://overwolf.github.io/api/games/events/axie-infinity-origin
    21960: [
        // info updates: ronin_address
        "game_info",
        // info updates: player_x, battle_state, fighter_x, match_outcome, cards_hand, deck_piles, last_card_played
        // events: match_start, match_end
        "match_info",
    ],
}

const windowNames = {
    desktop: "desktop",
}

export { interestingFeatures, windowNames }
