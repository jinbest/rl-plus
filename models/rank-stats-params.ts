export interface LeaderBoardsParam {
  title: string
  data: LeaderBoardCardChildParams[]
}

export interface LeaderBoardCardChildParams {
  rank: number
  player: string
  rating: string
}

export interface RankSearchDataParam {
  title: string
  subTitle: string
  logo: string
  data: RankSearchChildDataParam[]
  lifetimeStats: RankSearchChildLifeTimeStatsParam[]
  history?: RankSearchDataHistoryParam[]
}

export interface RankSearchChildDataParam {
  playlist: RankSearchChildDataPlaylistParam
  rating: RankSearchChildDataRatingParam
  divUp: number
  divDown: number
  matches: number
}

export interface RankSearchChildDataPlaylistParam {
  logo: string
  main: string
  sub: string
}

export interface RankSearchChildDataRatingParam {
  total: number
  sub: string
}

export interface RankSearchChildLifeTimeStatsParam {
  label: string
  total: number
  sub: string
}

export interface RankSearchDataHistoryParam {
  title: string
  child: RankSearchDataHistoryChildParam[]
}

export interface RankSearchDataHistoryChildParam {
  name: string
  total: number
  level: number
}

export type RankSelectKeyParams = "epic" | "steam" | "xbox" | "playstation" | "nintendo"
