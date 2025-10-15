import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NewDocumentPage from "./NewDocumentPage";

// --- Custom Inline SVG Icons ---
const SearchIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const FileTextIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"
    strokeLinejoin="round" {...props}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <line x1="10" y1="9" x2="8" y2="9"></line>
  </svg>
);

const PlusIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" {...props}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const ChevronDown = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" {...props}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const Tabs = [
  { name: "All", active: true },
  { name: "My Docs", active: false },
  { name: "Shared", active: false },
  { name: "Private", active: false },
  { name: "Workspace", active: false },
  { name: "Assigned", active: false },
  { name: "Meeting Notes", active: false },
];

const SidebarCard = ({ title, children }) => (
  <div className="p-4 rounded-xl shadow-lg border border-gray-700 h-64 flex flex-col">
    <h3 className="text-lg font-semibold text-gray-100 mb-3">{title}</h3>
    <div className="flex flex-col items-center justify-center flex-grow text-center text-gray-500">
      {children}
    </div>
  </div>
);

const PlaceholderContent = ({ text }) => (
  <>
    <FileTextIcon className="text-gray-700 w-10 h-10 mb-2" />
    <p className="text-sm">{text}</p>
  </>
);

// ==============================
// Home Page
// ==============================
function HomePage() {
  const navigate = useNavigate();

  const secondaryCardBg = "bg-[#1b1e25]";
  const orangeButton = "bg-[#ff7a2f] hover:bg-[#fa6a1a]";
  const redButton = "bg-[#ca3e30] hover:bg-[#e05e50]";

  return (
    <div className={`min-h-screen font-inter text-gray-300 p-4 sm:p-8`}>
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        {/* Search Bar */}
        <div className={`flex items-center ${secondaryCardBg} p-3 rounded-xl border border-gray-800 w-full sm:w-80 lg:w-96`}>
          <SearchIcon className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search Document..."
            className={`bg-transparent text-sm placeholder-gray-500 focus:outline-none w-full`}
          />
        </div>

        {/* ✅ New Document Button with Navigation */}
        <button
          onClick={() => navigate("/new-document")}
          className={`flex items-center px-5 py-3 text-sm font-medium rounded-xl text-white shadow-lg transition duration-150 ${orangeButton}`}
        >
          <PlusIcon className="mr-2 w-4 h-4" />
          New Document
        </button>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-6">
        {/* Left Section */}
        <div className={`p-6 rounded-xl shadow-2xl border border-gray-800`}>
          {/* Tabs and Sort */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 border-b border-gray-800/50 pb-3">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
              {Tabs.map((tab) => (
                <button
                  key={tab.name}
                  className={`py-2 px-1 transition duration-150 whitespace-nowrap ${
                    tab.active
                      ? "text-white border-b-2 border-white"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
            <div className="flex items-center text-sm mt-4 md:mt-0">
              <button className="flex items-center text-white hover:text-gray-300 transition duration-150 font-medium">
                Sort <ChevronDown className="ml-1 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Featured AI Notetaker */}
          <div className="flex items-center justify-center min-h-[400px] w-full p-4">
            <div className="text-center max-w-sm p-8 rounded-xl border border-gray-700 ">
              <div className="flex justify-center mb-6">
                <FileTextIcon className="text-gray-500 w-16 h-16 bg-gray-700/30 p-3 rounded-2xl" strokeWidth="1.5" />
              </div>
              <h2 className="text-xl font-bold text-gray-100 mb-2">Get started with AI Notetaker</h2>
              <p className="text-sm text-gray-400 mb-6">
                AI Notetaker can automatically transcribe and summarize your meetings.
              </p>
              <button className={`px-6 py-2 text-sm font-semibold rounded-lg text-white transition duration-150 ${redButton}`}>
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <SidebarCard title="Recent">
            <PlaceholderContent text="Your recently opened docs will show here." />
          </SidebarCard>
          <SidebarCard title="Highlights">
            <PlaceholderContent text="Your Favorite Docs will show here." />
          </SidebarCard>
          <SidebarCard title="Created by Me">
            <PlaceholderContent text="All Docs created by you will show here." />
          </SidebarCard>
        </div>
      </main>
    </div>
  );
}

// ==============================
// ✅ Main App Router (No extra <Router>)
// ==============================
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/new-document" element={<NewDocumentPage />} />
    </Routes>
  );
}
