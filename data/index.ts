import d from "../channels.json"
import { youtube } from '@googleapis/youtube';
import apiKey from "./google-api-key.json"
import * as fs from 'fs';

const data = d as RootJson
if (!apiKey.key) throw Error(
  "Google API key not found. Create google-api-key.json at /data (see data/example-google-api-key.json)")

interface RootJson {
  categories: Category[]
}
interface Category {
  name: string
  description: string
  channels: Channel[]
}

interface Channel {
  handle: string
  recs: string[]
  comment: string
  engLv: "easy" | "normal" | "hard"
}

export interface ChannelData extends Channel {
  pic: string | undefined
  videosCount?: number
  subs?: number | string
  link: string
  name: string
}
export interface OutputCategory extends Category {
  channels: ChannelData[]
}

const yt = youtube({ version: "v3", auth: apiKey.key })

const output: OutputCategory[] = []

for await (const category of data.categories) {
  const categoryIndex = output.push({ channels: [], name: category.name, description: category.description }) - 1

  for await (const c of category.channels) {
    const resultChannels = (await yt.channels.list({
      forHandle: c.handle, part: ["statistics", "snippet"]
    })).data.items
    await sleep(1000) // pause so the yt api doesn't get angry with us
    if (!resultChannels || !resultChannels[0]) {
      console.warn("No channel found with handle " + c.handle)
      break
    }
    const channel = resultChannels[0]
    output[categoryIndex].channels.push({
      ...c,
      link: "https://www.youtube.com/" + c.handle,
      videosCount: parseInt(channel.statistics?.videoCount || ""),
      subs: channel.statistics?.subscriberCount || 0,
      pic: channel.snippet?.thumbnails?.default?.url || "",
      name: channel.snippet?.title || ""
    })
  }
}

const outputData = JSON.stringify(output, null, 2)
fs.writeFileSync("../fe/src/data/channelsOutput.json", outputData)

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
