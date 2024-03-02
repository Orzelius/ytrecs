import d from "../channels.json"
import { youtube } from '@googleapis/youtube';


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
  recs: string[]
  comment: string
  engLv: "easy" | "normal" | "hard"
}

const yt = youtube({ version: "v3", auth: "" })
yt.channels.list({ forHandle: "" })
