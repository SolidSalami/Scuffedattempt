
export interface DeepLolLiveGame {
  gameId: number
  mapId: number
  gameMode: string
  gameType: string
  gameQueueConfigId: number
  participants: Participant[]
  observers: Observers
  platformId: string
  bannedChampions: BannedChampion[]
  gameStartTime: number
  gameLength: number
  status: Status
}

export interface Participant {
  puuid: string
  teamId: number
  spell1Id: number
  spell2Id: number
  championId: number
  profileIconId: number
  riotId: string
  bot: boolean
  summonerId: string
  gameCustomizationObjects: any[]
  perks: Perks
}

export interface Perks {
  perkIds: number[]
  perkStyle: number
  perkSubStyle: number
}

export interface Observers {
  encryptionKey: string
}

export interface BannedChampion {
  championId: number
  teamId: number
  pickTurn: number
}

export interface Status {
  message: string
  status_code: number
}
