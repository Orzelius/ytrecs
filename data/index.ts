import d from "../channels.json"
const data = d as RootJson

export interface RootJson {
  categories: Category[]
}

export interface Category {
  name: string
  channels: Channel[]
}

export interface Channel {
  tag: string
  subGanre: string
  rec: string
}




