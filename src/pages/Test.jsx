import { Plus, X } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Test = () => {
  return (
    <Link to="/new-test">
      <div className="min-h-screen w-[30%] flex items-center py-25 pr-15 bg-[#121723] relative">
        {/* White Box - aligned to left and vertically centered */}
        <div
          style={{ height: '85vh' }}
          className="absolute  bg-[#1B212E] w-[80%] rounded-r-2xl "
        >
            <div className='flex p-3 justify-between'>
            <div className='flex gap-2 text-white items-center'>
         <div className='w-5 h-5 border-1 border-white text-white flex  justify-content-center items-center' style={{ borderRadius: '50px' }}>
            <Plus />
         </div>
         <h1>Create Project </h1>
         </div>
         <X />
         </div>
        </div>
      </div>
    </Link>
  );
};

export default Test;
