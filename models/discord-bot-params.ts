export interface NavItemParam {
  name: string
  logo: string
}

export interface MenuListParam {
  title: string
  order: number
  data: MenuListDataParam[]
}

export interface MenuListDataParam {
  title: string
  link: MenuListDataLinkParam
  content: string
  child: MenuListDataChildParam
}

export interface MenuListDataLinkParam {
  name: string
  href: string
}

export interface MenuListDataChildParam {
  servers: number
  online: number
  members: number
}
