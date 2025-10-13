import { Bold, BookImage, ChevronDown, ChevronLeft, Code, Film, Grid3x3, Link, List, ListIndentDecrease, ListIndentIncrease, Minus, TextAlignCenter, TextAlignEnd, TextAlignStart } from 'lucide-react'
import React from 'react'

const Creates = () => {
  
  return (

    <div className='mt-15 p-5'>
      <div className='flex justify-between items-start  mb-8'>
        <div>
          
          <h1 className='text-2xl flex items-center  font-bold text-[#DE8B2D] mb-4'><ChevronLeft className='w-5 h-5  font-bold text-[#DE8B2D]'/>Proposals</h1>
        </div>
        <div className='flex flex-col gap-4 '>
          <div className='flex justify-end'>
  <button className='bg-[#DE8B2D] text-white py-2 px-12 rounded-full'>Save</button>
</div>

          <div className='flex space-x-4 items-center text-white'>
            <Bold className='w-5 h-5'/>
            <Link className='w-5 h-5'/>
            <List className='w-5 h-5'/>
            <ChevronDown className='w-5 h-5'/>
            <BookImage className='w-5 h-5'/>
            <Film className='w-5 h-5'/>
            <TextAlignStart className='w-5 h-5'/>
            <TextAlignCenter className='w-5 h-5'/>
            <TextAlignEnd className='w-5 h-5'/>
            <ListIndentDecrease className='w-5 h-5'/>
            <ListIndentIncrease className='w-5 h-5'/>
            <Minus className='w-5 h-5'/>
            <Grid3x3 className='w-5 h-5'/>
            <Code className='w-5 h-5'/>

          </div>
        </div>
      </div>
      <div className="w-full h-screen bg-cover bg-top-50"
  style={{ backgroundImage: "url('/Proposals.jpg')" }}>
        
      </div>
    </div>
  )
}

export default Creates
