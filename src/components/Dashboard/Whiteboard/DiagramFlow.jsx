import React from 'react';

// --- Data Structure (No Change) ---
const diagramData = [
  {
    id: 1,
    title: "Home Page",
    items: [
      { name: "Banner", isConnectorSource: false, isQuickView: false },
      { name: "About Us", isConnectorSource: false, isQuickView: false },
      { name: "Our Product", isConnectorSource: true, isQuickView: false, linkTarget: 2 }, // Link to Shop Page
      { name: "Gallery", isConnectorSource: false, isQuickView: false },
    ],
  },
  {
    id: 2,
    title: "Shop Page",
    items: [
      { name: "Product List", isConnectorSource: true, isQuickView: false, linkTarget: 3 }, // Link to Product
    ],
  },
  {
    id: 3,
    title: "Product",
    items: [
      { name: "Picture", isConnectorSource: false, isQuickView: false },
      { name: "Name", isConnectorSource: false, isQuickView: false },
      { name: "Description", isConnectorSource: false, isQuickView: false },
      { name: "Price", isConnectorSource: false, isQuickView: false },
      { name: "Quick View", isConnectorSource: false, isQuickView: true }, // Blue border
    ],
  },
];

// --- Node Component (Slight change for visibility on dark background) ---
const Node = ({ name, isConnectorSource, isQuickView }) => {
  // Switched base background to a dark grey/black for the node itself to match the image
  const baseClasses = "bg-gray-800 text-white p-3 rounded-lg shadow-md w-full text-sm font-medium transition duration-300 hover:shadow-lg";
  
  // Tailwind classes for the blue-bordered 'Quick View'
  const quickViewClasses = isQuickView 
    ? "ring-2 ring-blue-500 border-blue-500 text-blue-300 font-bold" // Adjusted text color for dark mode
    : "border-gray-700"; // Darker border for the dark theme

  return (
    <div className={`${baseClasses} ${quickViewClasses} relative border-2`}>
      {name}
      {isConnectorSource && (
        <div className="absolute top-1/2 right-[-10px] transform -translate-y-1/2 h-3 w-3 bg-orange-500 rounded-full z-10 shadow-md"></div>
      )}
    </div>
  );
};

const DiagramColumn = ({ id, title, items }) => {
  return (
    <div className="relative flex flex-col items-center flex-1 min-w-[250px] mx-4">
     
      <div className="relative bg-gray-800 text-white p-4 rounded-lg shadow-xl w-full text-center font-bold mb-10 border border-gray-700">
        <div className="absolute -top-3 -left-3 h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-black z-20">
          {id}
        </div>
        {title}
      </div>
      <div className="flex flex-col space-y-8 w-4/5 relative">
        {items.map((item, index) => (
          <div key={index} className="relative w-full">
  {index < items.length - 1 && (
              <div className="absolute top-1/2 left-[-20px] h-[calc(100%+32px)] w-0.5 bg-gray-500 z-0"></div>
            )}
            
            <div className="absolute top-1/2 left-[-20px] transform -translate-y-1/2 -translate-x-1/2 h-2 w-2 bg-green-600 rounded-full z-10 ring-4 ring-gray-900"></div>

            <Node 
                name={item.name} 
                isConnectorSource={item.isConnectorSource} 
                isQuickView={item.isQuickView} 
            />
          </div>
        ))}
        {items.length > 0 && (
            <div className="absolute bottom-[-16px] left-[-20px] transform -translate-x-1/2 h-2 w-2 bg-green-600 rounded-full z-10 ring-4 ring-gray-900"></div>
        )}
      </div>
    </div>
  );
};

const App = () => {
    const svgOverlay = (

      <svg 
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-10" 
          viewBox="0 0 1000 1000" 
          preserveAspectRatio="none"
      >
          {/* Line 1 -> 2: From 'Our Product' (Col 1, 3rd node) to 'Shop Page' header (Col 2)
          Coordinates are adjusted for better curve appearance.
          */}
          <path 
              d="M 280 400 C 380 450, 480 150, 510 100" 
              fill="none" 
              stroke="#F97316" 
              strokeWidth="4" 
          />
          
          {/* Line 2 -> 3: From 'Product List' (Col 2, 1st node) to 'Product' header (Col 3)
          */}
          <path 
              d="M 610 300 C 710 350, 810 150, 840 100" 
              fill="none" 
              stroke="#F97316" 
              strokeWidth="4" 
          />
          
          {/* Orange End Dots (Near Page Headers) */}
          {/* Dot 1 End (Near Shop Page Header) */}
          <circle cx="510" cy="100" r="5" fill="#F97316" />
          
          {/* Dot 2 End (Near Product Header) */}
          <circle cx="840" cy="100" r="5" fill="#F97316" />

      </svg>
    );

    // Style for the dark background with the dot grid pattern
    const darkGridStyle = {
      backgroundColor: '#111827', // A dark gray/black
      backgroundImage: 'radial-gradient(circle, #374151 1px, transparent 1px)',
      backgroundSize: '24px 24px', // Control the dot spacing
    };

  return (
    // Apply the dark background style
    <div className="min-h-screen flex flex-col items-center p-8 font-['Inter']" style={darkGridStyle}>
      {/* Removed the large header as it is not in the original image */}
      
      {/* Main Diagram Container */}
      {/* Adjusted padding/shadow to better match the image's "full view" look */}
      <div className="relative flex justify-center w-full max-w-7xl mx-auto p-10" style={{backgroundColor: 'transparent'}}>
        
        {/* The SVG overlay for the curved lines MUST be placed here */}
        {svgOverlay}

        {/* --- Diagram Columns Wrapper --- */}
        <div className="flex flex-col sm:flex-row justify-between w-full space-y-12 sm:space-y-0 sm:space-x-4">
          
          {/* Column 1: Home Page */}
          <DiagramColumn 
            id={diagramData[0].id} 
            title={diagramData[0].title} 
            items={diagramData[0].items} 
          />
          
          {/* Column 2: Shop Page */}
          <DiagramColumn 
            id={diagramData[1].id} 
            title={diagramData[1].title} 
            items={diagramData[1].items} 
          />
          
          {/* Column 3: Product */}
          <DiagramColumn 
            id={diagramData[2].id} 
            title={diagramData[2].title} 
            items={diagramData[2].items} 
          />
        </div>
      </div>
    </div>
  );
};

export default App;