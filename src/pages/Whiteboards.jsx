import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// --- Icons ---
const SearchIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

const PlusIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);

// --- Custom Illustration ---
const CustomIllustration = ({ title, description }) => {
  let imageSrc = "";
  if (title === "Concept Map") {
    imageSrc = "/concept.svg";
  } else if (title === "Data Flow Diagram") {
    imageSrc = "/Data.svg";
  } else if (title === "Eisenhower Matrix") {
    imageSrc = "/eisenhower.svg";
  } else {
    imageSrc = "/images/default.png";
  }

  return (
    <div className="flex flex-col rounded-xl bg-[#121723] border border-gray-700 hover:border-orange-500 transition duration-200 cursor-pointer">
      <div className="flex items-center">
        <div className="p-2 rounded-lg">
          <img
            src={imageSrc}
            alt={title}
            className="w-16 h-16 md:w-40 md:h-40 object-contain rounded-lg"
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-white text-xl font-semibold">{title}</h3>
          <p className="text-gray-400 text-lg mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

// --- Template Card ---
const TemplateCard = ({ title, description }) => (
  <div className="col-span-1">
    <CustomIllustration title={title} description={description} />
  </div>
);

// --- History Card ---
const HistoryCard = ({ title, subTitle }) => (
  <div className="col-span-1 bg-[#121723]">
    <div className="p-6 h-full rounded-xl border border-gray-700">
      <h3 className="text-white text-lg font-semibold">{title}</h3>
      <div className="flex flex-col items-center justify-center text-center h-[calc(100%-28px)] my-4">
        <img src="box.svg" className="w-18 mb-4" alt="" />
        <p className="text-gray-500 text-sm max-w-[200px]">{subTitle}</p>
      </div>
    </div>
  </div>
);

// --- Whiteboard Dashboard ---
const WhiteboardDashboard = () => {
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  const TemplateData = [
    { title: "Concept Map", description: "Visualize ideas clearly" },
    { title: "Data Flow Diagram", description: "Streamline data processes" },
    { title: "Eisenhower Matrix", description: "Prioritize tasks effectively" },
  ];

  const HistoryData = [
    {
      title: "Recent",
      subTitle: "Your recently opened whiteboards will show here.",
    },
    {
      title: "Highlights",
      subTitle: "Your favorite Whiteboards will show here.",
    },
    {
      title: "Created by Me",
      subTitle: "All Whiteboards created by you will show here.",
    },
  ];

  const ColumnHeaders = [
    { name: "Name", width: "w-2/5" },
    { name: "Location", width: "w-1/5" },
    { name: "Date Updates", width: "w-1/6" },
    { name: "Date Created", width: "w-1/6" },
    { name: "Date Viewed", width: "w-1/6" },
    { name: "Creator", width: "w-1/6" },
  ];

  const handleNewWhiteboard = () => navigate("/create-whiteboard");
  const handleCreateWhiteboard = () => navigate("/create-whiteboard");

  return (
    <div className="min-h-screen p-4 md:p-8 font-['Inter',_sans-serif] ">
      {/* Top Header */}
      <header className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-8">
        <div className="w-full bg-[#121723] md:w-96">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Whiteboards..."
              className="w-full py-3 pl-10 pr-4 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>
        </div>

        <button
          onClick={handleNewWhiteboard}
          className="w-full md:w-auto flex items-center justify-center space-x-2 px-5 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition duration-150 shadow-lg shadow-orange-600/30"
        >
          <PlusIcon className="w-5 h-5" />
          <span className="text-sm">New Whiteboard</span>
        </button>
      </header>

      {/* Template Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {TemplateData.map((data) => (
          <TemplateCard key={data.title} {...data} />
        ))}
      </div>

      {/* History Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {HistoryData.map((data) => (
          <HistoryCard key={data.title} {...data} />
        ))}
      </div>

      {/* Tabs */}
      <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center space-y-4 lg:space-y-0 mb-6">
        <div className="flex space-x-4 border-b border-gray-700 pb-2">
          {["All", "My Whiteboards"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-semibold pb-2 transition duration-200 ${
                activeTab === tab
                  ? "text-white border-b-2 border-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
          <div className="relative w-full sm:w-36">
            <select className="appearance-none w-full py-2.5 px-4 text-gray-300 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 pr-8">
              <option>Sort: Sort</option>
              <option>Sort: Name</option>
              <option>Sort: Date</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </div>

          <div className="relative w-full sm:w-48">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2.5 pl-10 pr-4 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="hidden lg:flex w-full items-center text-gray-400 text-xs uppercase font-medium border-b border-gray-700 pb-3 mb-6">
        {ColumnHeaders.map((col, index) => (
          <div
            key={col.name}
            className={`${col.width} ${
              index === ColumnHeaders.length - 1 ? "flex justify-between" : ""
            }`}
          >
            <span>{col.name}</span>
            {index === ColumnHeaders.length - 1 && (
              <PlusIcon className="w-4 h-4 text-green-500 cursor-pointer" />
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center p-10 mt-16 text-center">
        <img src="box.svg" className="mb-5" alt="" />
        <h2 className="text-white text-xl font-bold mb-3">
          LET'S CREATE YOUR FIRST VEEVIES WHITEBOARD!
        </h2>
        <p className="text-gray-400 max-w-lg mb-6">
          Create Whiteboards to map out your project plans, brainstorm feature
          concepts, or help remote co-workers work better together!{" "}
          <a href="#" className="text-orange-500 hover:text-orange-400">
            learn more
          </a>
        </p>

        <button
          onClick={handleCreateWhiteboard}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition duration-150 shadow-xl shadow-orange-600/30"
        >
          <span className="text-sm">Create Whiteboard</span>
        </button>
      </div>
    </div>
  );
};

// --- Create Whiteboard Page ---
const CreateWhiteboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-4">🧩 Create a New Whiteboard</h1>
      <p className="text-gray-400 mb-6">
        This is your new whiteboard creation page.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-orange-600 rounded-lg hover:bg-orange-700 transition"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

// --- App Component ---
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WhiteboardDashboard />} />
      <Route path="/create-whiteboard" element={<CreateWhiteboard />} />
    </Routes>
  );
}
