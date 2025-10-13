import React from 'react';
import { 
  Ellipsis, 
  Image, 
  Link2, 
  MessageCircle, 
  MonitorPlay, 
  MousePointer2, 
  MoveUpRight, 
  Square, 
  SquareDashed, 
  Type 
} from 'lucide-react';

import DiagramFlow from '../components/Dashboard/Whiteboard/DiagramFlow';

const CreateWhiteboards = () => {
  return (
    <div className="flex" >
      <div className="bg-[#27292C] flex flex-col space-y-2 text-white p-3 min-h-screen">
        <div className="flex flex-col space-y-3 border-b border-white/30 pb-4">
          <MousePointer2 fill="white" />
          <Square fill="white" />
          <Type />
          <MoveUpRight />
          <Image />
          <Link2 style={{ transform: 'rotate(120deg)' }} />
        </div>

        <div className="flex flex-col space-y-3 pt-4">
          <MessageCircle fill="white" />
          <MonitorPlay />
          <SquareDashed />
          <Ellipsis />
        </div>
      </div>

      {/* --- Main Drawing Area --- */}
      <div className="flex-1 p-6 overflow-auto">
        <DiagramFlow /> 
      </div>
    </div>
  );
};

export default CreateWhiteboards;
