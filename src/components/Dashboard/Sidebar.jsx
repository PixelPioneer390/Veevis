import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Grid,
  Briefcase,
  Calendar,
  TrendingUp,
  FileText,
  Users,
  MessageSquare,
  BookOpen,
  Menu,
  ChevronDown,
  LogOut,
  Video,
  Headset,
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: Grid, path: '/' },
    { name: 'Projects', icon: Briefcase, path: '/projects' },
    { name: 'Tasks', icon: Calendar, path: '/tasks' },
    { name: 'Leads', icon: TrendingUp, path: '/leads' },
    { name: 'Proposals', icon: FileText, path: '/proposals' },
    { name: 'Users', icon: Users, path: '/users' },
    { name: 'Messages', icon: MessageSquare, path: '/messages' },
    { name: 'Clips', icon: Video, path: '/clips' },
    { name: 'Whiteboards', icon: BookOpen, path: '/whiteboards' },
    { name: 'Document', icon: BookOpen, path: '/document' },
    { name: 'Support', icon: Headset, path: '/support' },
    { name: 'Knowledgebase', icon: BookOpen, path: '/knowledgebase' },
  ];

  return (
    <div className="flex flex-col w-80 bg-black border-1 border-gray-800 text-white h-screen overflow-y-auto py-5 px-3 shadow-lg custom-scrollbar">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img
          src="/Veeivs.svg"
          alt="Veelv's Logo"
          className="h-9 w-auto object-contain"
        />
      </div>

      {/* Profile */}
      <div className="mb-8 p-3">
        <img
          className="h-25 w-25 rounded-full mx-auto mb-3"
          src="/Profile.jpg"
          alt="Merry Adam"
        />
        <p className="text-center font-semibold text-2xl mb-2">Merry Adam</p>
        <p className="text-center text-md text-gray-200">Edit Profile</p>
      </div>

      {/* Navigation */}
      <nav className="flex-grow mt-10 w-50 mx-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-xl transition-colors ${
                isActive
                  ? 'bg-[#4E6147] font-bold text-white'
                  : 'text-gray-300 hover:bg-zinc-800'
              }`
            }
          >
            <item.icon className="w-4 h-4 mr-2" />
            {item.name}
          </NavLink>
        ))}

        {/* Example Dropdown (Static for now) */}
        <div className="flex items-center p-3 rounded-xl text-gray-300 hover:bg-zinc-800 transition-colors cursor-pointer">
          <Menu className="w-5 h-5 mr-3" />
          Other
          <ChevronDown className="w-4 h-4 ml-auto" />
        </div>
      </nav>

      {/* Logout Button */}
      <div className="pt-4 border-t border-zinc-800">
        <button className="flex items-center justify-center w-full p-3 text-red-400 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors">
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
