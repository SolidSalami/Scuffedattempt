
/*
 *
GET https://b2c-api-cdn.deeplol.gg/ingame/summoner-cached?summoner_id={encrypted_summoner_id}&platform_id=${PLATFORM_ID}
*/
export interface DeepLolSummonerCachedResponse {
  summoner: Summoner
  realtime: Realtime
}

export interface Summoner {
  summoner_basic_info_dict: SummonerBasicInfoDict
}

export interface SummonerBasicInfoDict {
  puu_id: string
  summoner_id: string
  summoner_name: string
  level: number
  profile_id: number
  pro_streamer_info_dict: ProStreamerInfoDict
  previous_season_tier_list: PreviousSeasonTierList[]
  riot_id_name: string
  riot_id_tag_line: string
}

export interface ProStreamerInfoDict {
  name: string
  url_name: string
  pro_team_al: string
  status: string
  kick: string
  chzzk: string
  twitter: string
  afreecatv: string
  twitch: string
  youtube: string
  leaguepedia: string
  title_url: string
  pro_streamer_info_list: any[]
  friends_info_list: any[]
  friends_kr: string
  friends_en: string
  show: number
}

export interface PreviousSeasonTierList {
  season: number
  tier: string
  division: number
}

export interface Realtime {
  season_tier_info_dict: SeasonTierInfoDict
  challenges_dict: ChallengesDict
}

export interface SeasonTierInfoDict {
  ranked_solo_5x5: RankedSolo5x5
  ranked_flex_sr: RankedFlexSr
}

export interface RankedSolo5x5 {
  tier: string
  division: number
  league_points: number
  wins: number
  losses: number
  ranking: number
  ranking_rate: number
  mini_series_dict: MiniSeriesDict
}

export interface MiniSeriesDict {
  progress: string
  wins: number
  losses: number
}

export interface RankedFlexSr {
  tier: string
  division: number
  league_points: number
  wins: number
  losses: number
  ranking: number
  ranking_rate: number
  mini_series_dict: MiniSeriesDict2
}

export interface MiniSeriesDict2 {
  progress: string
  wins: number
  losses: number
}

export interface ChallengesDict {
  title_id: number
  challenge_list: ChallengeList[]
}

export interface ChallengeList {
  challenge_id: number
  percentile: number
  level: string
  value: number
}
