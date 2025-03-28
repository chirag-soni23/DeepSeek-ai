import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'

const Promptbox = ({isLoading,setIsLoading}) => {

    const [prompt,setPrompt] = useState("");


  return (
    <form className={`w-full ${false ? "max-w-3xl" : "max-w-2xl"} bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}>
        <textarea value={prompt} onChange={(e)=>setPrompt(e.target.value)} className='outline-none w-full resize-none overflow-hidden break-words bg-transparent' rows={2} placeholder='Message DeepSeek' required></textarea>

        <div className='flex items-center justify-between text-sm'>
            <div className='flex items-center gap-2'>
                <p className='flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
                    <Image className='h-5' src={assets.deepthink_icon} alt='deepthink_icon'/>
                    DeepThink (R1)
                </p>
                <p className='flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
                    <Image className='h-5' src={assets.search_icon} alt='search_icon'/>
                    Search
                </p>
            </div>

            <div className='flex items-center gap-2'>
            <Image className='w-4 cursor-pointer' src={assets.pin_icon} alt='pin_icon'/> 
            <button className={`rounded-full p-2 cursor-pointer ${prompt ? "bg-primary":"bg-[#71717a]"}`}>
            <Image className='w-3.5 aspect-square' src={prompt ? assets.arrow_icon : assets.arrow_icon_dull} alt='arrow_icon'/>
            </button>
            </div>
        </div>
    </form>
  )
}

export default Promptbox