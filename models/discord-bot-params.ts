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
  subtitle?: string
  link?: MenuListDataLinkParam
  content?: string
  child?: MenuListDataChildParam
  authCard?: AuthCardParam
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

export interface AuthCardContentsParam {
  title: string
  contents: string[]
}
