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

export type Filter1Params = "overall" | "rating"

export type OverallOptionParam =
  | "wins"
  | "goals"
  | "saves"
  | "shots"
  | "assists"
  | "mvps"
  | "goalShotRatio"

export type RatingOptionParam =
  | "ranked1v1"
  | "ranked2v2"
  | "ranked3v3"
  | "tournament"
  | "casual"
  | "rumble"
  | "hoops"
  | "dropshot"
  | "snowday"

export type Filter2Param = "daily" | "weekly" | "allTime"

export type MenuParam = {
  label: string
  code: OverallOptionParam | RatingOptionParam
}

export type Filter1OptionsParam = {
  title: string
  options: MenuParam[]
}

export interface RankLeaderBoardParam {
  optionType: RatingOptionParam | OverallOptionParam
  title: string
  data: RankLeaderBoardDataParam[]
}

export interface RankLeaderBoardDataParam {
  rank: number
  player: string
  type: RankSelectKeyParams
  logo: string
  rating: number
  played: number
}

export interface RankHomeTrackerDataParam {
  title: string
  img_src: string
  subTitle: string
  rating: number
  analysis: string
  divUp: number
  divDown: number
}
