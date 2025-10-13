import React, { useState } from 'react';

// Helper component for Lucide-style icons using inline SVG
const Icon = ({ name, className = 'w-5 h-5' }) => {
  const getPath = (iconName) => {
    switch (iconName) {
      case 'arrow-left': return <path d="M19 12H5M12 19l-7-7 7-7" />;
      case 'search': return <path d="M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.35-4.35" />;
      case 'bell': return <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9zm-4.3 14a2 2 0 0 1-3.4 0" />;
      case 'cursor': return <path d="M3 3l7.07 16.27 3.32-10.99 10.99-3.32L3 3z" />;
      case 'square': return <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />;
      case 'text': return <path d="M10 12h4m-2 2V5m0 14V12" />;
      case 'pen': return <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />;
      case 'image': return (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </>
      );
      case 'link': return (
        <>
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </>
      );
      case 'list': return <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />;
      case 'grid': return (
        // FIX: Wrapped multiple rect elements in a fragment to resolve JSX compilation error
        <>
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </>
      );
      case 'hash': return <path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18" />;
      case 'circle': return <circle cx="12" cy="12" r="10" />;
      case 'bold': return <path d="M6 12h9M12 5h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-4V5zM12 12h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-4v-4z" />;
      case 'italic': return <path d="M19 9l-9 12M5 9h14M5 21h14" />;
      case 'at': return (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M16 12v1a4 4 0 0 0 4 4h0a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-4" />
        </>
      );
      default: return null;
    }
  };

  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {getPath(name)}
    </svg>
  );
};

// Helper component for the left toolbar buttons
const ToolbarButton = ({ iconName, active, onClick }) => (
  <div
    onClick={onClick}
    className={`p-2 rounded-xl cursor-pointer transition duration-150 shadow-md ${
      active ? 'bg-gray-800 text-white shadow-inner-custom' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`}
    // Custom inner shadow utility to mimic pressed effect
    style={active ? { boxShadow: 'inset 0 1px 3px 0 rgba(0, 0, 0, 0.6)' } : {}}
  >
    <Icon name={iconName} className="w-5 h-5" />
  </div>
);

// Helper component for the bottom formatting toolbar buttons
const ToolButton = ({ icon, active }) => (
  <button
    className={`p-1.5 rounded-lg transition duration-200 text-gray-300 hover:bg-gray-700 ${active ? 'bg-gray-700' : ''}`}
  >
    <Icon name={icon} className="w-4 h-4" />
  </button>
);

// Helper component for the bottom dropdowns
const ToolDropdown = ({ label }) => (
  <div className="relative">
    <button className="flex items-center text-sm px-2 py-1 rounded-lg transition duration-200 text-gray-300 hover:bg-gray-700">
      {label}
      {/* Re-using arrow-left icon, rotated to act as a dropdown caret */}
      <svg className="w-3 h-3 ml-1 transform rotate-180 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
    </button>
  </div>
);

// Helper component for the bottom zoom controls
const ZoomButton = ({ label }) => (
  <button className="text-gray-300 hover:text-white transition duration-200 text-lg font-light w-6 h-6 rounded-md hover:bg-gray-700 flex items-center justify-center">
    {label}
  </button>
);

const App = () => {
  // Mock state for active tool
  const [activeTool, setActiveTool] = useState('cursor');

  // List of icons for the left toolbar
  const toolbarIcons = [
    { name: 'cursor', icon: 'cursor' },
    { name: 'square', icon: 'square' },
    { name: 'text', icon: 'text' },
    { name: 'pen', icon: 'pen' },
    { name: 'image', icon: 'image' },
    { name: 'link', icon: 'link' },
    { name: 'list', icon: 'list' },
    { name: 'grid', icon: 'grid' },
    { name: 'hash', icon: 'hash' },
  ];

  return (
    // Style block for the dot pattern background to match the image
    <>
      <style>
        {`
          .dot-grid-bg {
            background-color: #0b0b0b; /* Very dark background */
            background-image: radial-gradient(circle, #333 1px, transparent 1px);
            background-size: 20px 20px;
          }
          /* Custom shadow to mimic the pressed state of the active tool */
          .shadow-inner-custom {
            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.6);
          }
        `}
      </style>

      {/* Main Container - Full viewport height/width */}
      <div className="min-h-screen min-w-full bg-gray-950 text-white flex flex-col font-inter">

        {/* 1. Header (Top Navigation Bar) */}
        <header className="fixed top-0 left-0 right-0 h-14 z-20 flex items-center justify-between px-4 py-2 bg-gray-950 border-b border-gray-800 shadow-lg">
          {/* Left Section - Title and Subtitle */}
          <div className="flex items-center space-x-3 ml-2">
            <Icon name="arrow-left" className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition duration-200" />
            <div className="leading-none">
              <div className="text-sm font-bold text-white">Ecommerce IA</div>
              <div className="text-xs text-gray-500">Team Editing: July 23</div>
            </div>
          </div>
          {/* Right Section - Avatars, Icons, Share Button */}
          <div className="flex items-center space-x-4">
            {/* Avatars */}
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-gray-950 bg-yellow-400 flex items-center justify-center text-xs text-gray-900 font-semibold shadow-lg">J</div>
              <div className="w-8 h-8 rounded-full border-2 border-gray-950 bg-green-500 flex items-center justify-center text-xs text-gray-900 font-semibold shadow-lg">A</div>
              <div className="w-8 h-8 rounded-full border-2 border-gray-950 bg-indigo-500 flex items-center justify-center text-xs text-white font-semibold shadow-lg">M</div>
            </div>
            {/* Icons */}
            <div className="flex space-x-3 text-gray-400">
              <Icon name="search" className="w-6 h-6 cursor-pointer hover:text-white" />
              <Icon name="bell" className="w-6 h-6 cursor-pointer hover:text-white" />
            </div>
            {/* Share Button (Orange) */}
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md transition duration-200">
              Share
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 mt-14 flex overflow-hidden">
          {/* 2. Left Sidebar (Toolbar) */}
          <nav className="fixed left-0 top-14 bottom-0 w-16 bg-gray-950 border-r border-gray-800 p-2 flex flex-col items-center space-y-3 z-10 shadow-xl">
            {toolbarIcons.map(({ name, icon }) => (
              <ToolbarButton 
                key={name} 
                iconName={icon} 
                active={activeTool === name} 
                onClick={() => setActiveTool(name)} 
              />
            ))}
          </nav>

          {/* 3. Canvas/Viewport Area (with dot background) */}
          <div className="flex-1 ml-16 relative dot-grid-bg overflow-auto">
            {/* Centering the two white canvases */}
            <div className="flex items-center justify-center min-h-full p-8">
              <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 h-[80vh] w-full max-w-7xl">
                {/* Left Canvas */}
                <div className="flex-1 bg-white rounded-xl shadow-2xl border border-gray-200 min-h-[40vh] md:min-h-full">
                  {/* Mock content area 1 */}
                </div>
                {/* Right Canvas */}
                <div className="flex-1 bg-white rounded-xl shadow-2xl border border-gray-200 min-h-[40vh] md:min-h-full">
                  {/* Mock content area 2 */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Footer Controls */}
        <footer className="fixed bottom-0 left-0 right-0 h-16 z-30 pointer-events-none">
          {/* Centered Main Toolbar */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-auto bg-gray-900 p-2 rounded-xl shadow-2xl flex items-center space-x-1 border border-gray-700">
            {/* Tool Selection */}
            <div className="flex items-center space-x-0.5 border-r border-gray-700 pr-2">
              <ToolButton icon="square" active />
              <ToolButton icon="circle" />
              <ToolButton icon="text" />
            </div>
            {/* Formatting Controls */}
            <div className="flex items-center space-x-1 pl-2">
              <ToolDropdown label="Inter" />
              <ToolDropdown label="14" />
              <div className="h-6 w-px bg-gray-700 mx-1"></div>
              <ToolButton icon="bold" />
              <ToolButton icon="italic" />
              <ToolButton icon="link" />
              <ToolButton icon="at" />
            </div>
          </div>

          {/* Bottom Right Zoom Controls */}
          <div className="absolute bottom-4 right-4 pointer-events-auto bg-gray-900 p-2 rounded-xl shadow-2xl flex items-center space-x-2 border border-gray-700 text-sm">
            <ZoomButton label="-" />
            <div className="px-2 text-gray-300">62%</div>
            <ZoomButton label="+" />
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
