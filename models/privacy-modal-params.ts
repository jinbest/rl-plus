export interface ChildTextContent {
  text?: string
  textWithLink?: ContentWithLinkParam[]
  listContent?: ListContentParam
  underlineText?: string
  table?: ChildTableParam[]
}

export interface ChildTableParam {
  category: string
  examples: string
  collected: string
}

export interface ContentWithLinkParam {
  text?: string
  underlineText?: string
  link?: TextLinkParam
}

export interface TextLinkParam {
  text: string
  href: string
}

export interface ListContentParam {
  title?: string
  list: ListContentChildParam[]
}

export interface ListContentChildParam {
  key?: string
  text?: string
  listStyle?: boolean
  textWithLink?: ContentWithLinkParam[]
}
