import React from 'react';
import { OutputCategory, ChannelData } from '../../data/index'
import d from './data/channelsOutput.json'

const data = d as OutputCategory[]

function App() {
  const getChannelJsx = (channel: ChannelData) => {
    let subsNum = parseInt((channel.subs || "").toString())
    const subsRound = subsNum < 1000000 ? 'k' : 'M'
    const subsString = subsRound === 'k' 
      ? Math.round(subsNum / (1000)) + subsRound : Math.round(subsNum / (100000)) / 10 + subsRound
    return (
      <div 
        className='md:flex p-3 mt-5 md:mt-0 md:hover:bg-slate-900 hover:cursor-pointer rounded-lg justify-center'
      >
        <a 
          href={channel.link} 
          target='_blank' 
          rel="noreferrer"
          className="flex flex-col max-w-96 md:w-80 md:pr-2 justify-center pb-4 md:pb-0"
        >
          <div className="flex md:justify-normal justify-center">
            <img className="rounded-md w-24 h-24" src={channel.pic} alt="" />
            <div className="w-full pl-2 flex justify-between flex-col">
              <div>
                <h3 className='text-2xl -mb-2 -mt-1'>{channel.name}</h3>
                <span className='text-gray-300 text-sm md:pb-2'>{subsString} subscribers</span>
              </div>
              <div className='leading-4 align-text-bottom'>{channel.comment}</div>
            </div>
          </div>
        </a>
        <div className="overflow-scroll md:w-2/3 md:flex" style={{WebkitFilter: "grayscale(1)"}}>
          {channel.recs.map(recVideoUrl => 
            <iframe 
              className='md:pr-2 pb-4 md:pb-0 w-full md:min-w-80'
              title="ytplayer"
              id="ytplayer"
              src={"https://www.youtube.com/embed/" + recVideoUrl.split("?v=")[1] +"?autoplay=0&origin=" + window.location.href}
            ></iframe>
          )}
        </div>
      </div>
    )
  }
  return (
    <div className="App pt-12">
      <div className="max-w-8xl mx-auto">
        {data.map(category => 
          <div className="w-full mb-12">
            <h2 className='text-center font-bold text-3xl'>{category.name.toLocaleUpperCase()}</h2>
            <h3 className='text-center font-thin text-xl'>{category.description}</h3>
            {category.channels.map(chnl => getChannelJsx(chnl))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
