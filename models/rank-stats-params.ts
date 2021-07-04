export interface LeaderBoardsParam {
  title: string
  data: LeaderBoardCardChildParams[]
}

export interface LeaderBoardCardChildParams {
  rank: number
  player: string
  rating: string
}
