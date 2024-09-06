
export interface DeeplolStreamerPro {
  status: string
  name: string
  name_en: string
  championship_name: string
  position: string
  team: string
  team_al: string
  nation: string
  twitch: string
  afreecatv: string
  youtube: string
  twitter: string
  kick: string
  chzzk: string
  leaguepedia: string
  account_list: AccountList[]
}

export interface AccountList {
  riot_id: string
  riot_tag: string
  platform_id: string
  last_game_date: number
  live: number
  tier: string
  lp: number
  puu_id: string
  summoner_id: string
}
