export interface NavItemParam {
  name: string
  logo: string
}

export interface MenuListParam {
  title: MenuListTitleParam
  order: number
  key: string
  data: MenuListDataParam[]
}

export interface MenuListTitleParam {
  label1: string
  label2: string
}

export interface MenuListDataParam {
  name?: string
  logo?: string
  title?: string
  subtitle?: string[]
  contentWithLink?: MenuListDataContentWithLinkParam[]
  link?: MenuListDataLinkParam
  content?: string
  child?: MenuListDataChildParam
  authCard?: AuthCardParam
  priceSetCard1?: PriceSetCard1Param
  priceSetCard2?: PriceSetCard2Param
  repCard?: RepCardParam
  statsCard?: StatsCardParam
  statsPlayList?: StatsPlayListParam
  meCard?: MeCardParam
  verifyCard1?: VerifyCard1Param
  verifyCard2?: VerifyCard2Param
  reportCard?: ReportCardParam
}

export interface MenuListDataContentWithLinkParam {
  text: string
  link?: GeneralLinkParam
}

export interface MenuListDataLinkParam {
  name: string
  href: string
}

export interface MenuListDataChildParam {
  servers?: number
  online?: number
  members?: number
}

export interface AuthCardParam {
  data: AuthCardContentsParam[]
  img_src: string
}

export interface PriceSetCard1Param {
  title: string
  content: string
  links: GeneralLinkParam[]
  logo: string
  img_src: string
}

export interface PriceSetCard2Param {
  title: string
  content: string
  logo: string
  data: GeneralDataParam[]
  links: GeneralLinkParam[]
}

export interface RepCardParam {
  title: string
  content?: string
  contentWithLink?: MenuListDataContentWithLinkParam[]
  overview: OverviewParam
  repsData: string[]
  uniqueRepu: string
  ranking: string
  links: GeneralLinkParam[]
}

export interface StatsCardParam {
  links: GeneralLinkParam[]
  contentWithLink?: MenuListDataContentWithLinkParam[]
  img_src: string
}

export interface StatsPlayListParam {
  due1: string
  double: string
  solo: string
  standard: string
}

export interface MeCardParam {
  title: string
  contents: string[]
  child: MeCardChildParam[]
  links: GeneralLinkParam[]
}

export interface MeCardChildParam {
  title: string
  contents: MeCardChildContentParam[]
}

export interface MeCardChildContentParam {
  text?: string
  contentWithLink?: MenuListDataContentWithLinkParam[]
}

export interface VerifyCard1Param {
  links: GeneralLinkParam[]
  contentWithLink?: MenuListDataContentWithLinkParam[]
  content: string
  logo: string
}

export interface VerifyCard2Param {
  title: string
  content: string
  links: GeneralLinkParam[]
  child: VerifyCard2ChildParam[]
}

export interface VerifyCard2ChildParam {
  main: GeneralLinkParam
  sub: GeneralLinkParam
}

export interface ReportCardParam {
  icon: string
  text: string
}

export interface OverviewParam {
  positive: number
  negative: number
}

export interface GeneralDataParam {
  title: string
  content: string
}

export interface GeneralLinkParam {
  title: string
  link: string
}

export interface AuthCardContentsParam {
  title: string
  contents: string[]
}

export type DiscordBotMenuKeysParam =
  | "addme"
  | "auth"
  | "price"
  | "rep"
  | "stats"
  | "me"
  | "verify"
  | "scam"
  | "report"
