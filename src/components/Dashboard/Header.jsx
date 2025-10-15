import React from 'react';
import { Search, Bell, Grid, Settings, SquarePlus, Timer, MessageCircleMore, NotebookPen } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center lg:w-7xl w-full mx-auto justify-between px-6 py-8">
      <div className="flex items-center">
        <h1 className="text-4xl font-bold text-white mr-8">Hello, Admin</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6C853F]" />
          <input
            type="text"
            placeholder="Search"
            className="w-100 pl-10 pr-4 py-3 bg-[#121723] text-white placeholder-white rounded-xl border-1 border-[#6C853F] focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className='p-4 bg-[#C6A667] rounded-lg hover:bg-zinc-700 text-white'>
            <SquarePlus className='w-6 h-6'/>
        </button>
        <button className='p-4 bg-[#7B08FF] rounded-lg hover:bg-zinc-700 text-white'>
            <Timer className='w-6 h-6'/>
        </button>
        <button className='p-4 bg-[#289EC9] rounded-lg hover:bg-zinc-700 text-white'>
            <MessageCircleMore className='w-6 h-6'/>
        </button>
        <button className='p-4 bg-[#B72F0D] rounded-lg hover:bg-zinc-700 text-white'>
            <NotebookPen className='w-6 h-6'/>
        </button>
        <button className='p-4 bg-[#DE8B2D] rounded-lg hover:bg-zinc-700 text-white'>
            <Settings className='w-6 h-6'/>
        </button>
        <button className='p-4 bg-[#779350] rounded-lg hover:bg-zinc-700 text-white'>
            <Bell className='w-6 h-6'/>
        </button>
      </div>
    </header>
  );
};

export default Header;
