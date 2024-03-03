import React from 'react';
import { OutputCategory, ChannelData } from '../../data/index'
import d from './data/channelsOutput.json'

const data = d as OutputCategory[]

function App() {
  const getChannelJsx = (channelData: ChannelData) => {
    return (
      <div className='flex'>
        <div className='w-2/12'>
          <img className="m-3" src={channelData.pic} alt="" />
        </div>
          <h3 className='mt-2 text-2xl'>{channelData.name}</h3>
      </div>
    )
  }
  return (
    <div className="App pt-12">
      <div className="container mx-auto">
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
