export interface SummaryDataParams {
  name: string
  logo: string
  total: number
  themeCol: string
  type?: string
}

export interface MainDataParams {
  title: string
  statistic: string
  data: MainDataChildParams[]
}

export interface MainDataChildParams {
  feedback: string
  creator: string
  date: string
  score: string
}

export interface ReputationLeaderBoardCardParam {
  rank: number | string
  name: string
  discriminator: string
  reputation: ReputationParam | string
  link?: string
}

export interface ReputationParam {
  total: number
  current: number
}
