import { ListCheck, TrendingUp, UserRound } from "lucide-react";
import React, { useState } from "react";

// --- SVG Icons ---
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

// --- Dropdown Component ---
const STATUS_STYLES = {
  followUp: {
    Pending: "bg-blue-900/50 text-blue-400",
    "Not Responding": "bg-gray-600/50 text-gray-300",
    Contacted: "bg-purple-900/50 text-purple-400",
  },
  lead: {
    Confirmed: "bg-green-900/50 text-green-400",
    Waste: "bg-red-900/50 text-red-400",
  },
};

const OPTIONS = {
  followUp: ["Pending", "Not Responding", "Contacted"],
  lead: ["Confirmed", "Waste"],
};

const DropdownStatus = ({ type, value, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-medium ${STATUS_STYLES[type][value]} border border-gray-700 hover:border-gray-500`}
      >
        <span
          className={`h-2 w-2 rounded-full ${
            value === "Pending"
              ? "bg-blue-400"
              : value === "Not Responding"
              ? "bg-gray-300"
              : value === "Contacted"
              ? "bg-purple-400"
              : value === "Confirmed"
              ? "bg-green-400"
              : "bg-red-400"
          }`}
        ></span>
        {value}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute mt-1 w-36 bg-[#0d1117] border border-gray-700 rounded-md shadow-lg z-50">
          {OPTIONS[type].map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`block w-full text-left px-3 py-1.5 text-xs hover:bg-gray-800 ${STATUS_STYLES[type][opt]}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Assigned Avatars ---
const AssignedAvatars = ({ avatars }) => (
  <div className="flex items-center -space-x-2">
    {avatars.map((src, index) => (
      <img
        key={index}
        className="inline-block h-8 w-8 rounded-full ring-2 ring-[#161B22]"
        src={src}
        alt={`Avatar ${index + 1}`}
      />
    ))}
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 ring-2 ring-[#161B22]">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </div>
  </div>
);

// --- Mock Data ---
const avatars = [
  "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
];

// --- Main Component ---
export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, fileName: "software/tech_company", value: "100-500", fullName: "Adeel Ali", dueDate: "12-08-2025", followUp: "Pending", lead: "Confirmed" },
    { id: 2, fileName: "software/tech_company", value: "100-500", fullName: "Adeel Ali", dueDate: "12-08-2025", followUp: "Not Responding", lead: "Confirmed" },
    { id: 3, fileName: "software/tech_company", value: "100-500", fullName: "Adeel Ali", dueDate: "12-08-2025", followUp: "Contacted", lead: "Confirmed" },
    { id: 4, fileName: "software/tech_company", value: "100-500", fullName: "Adeel Ali", dueDate: "12-08-2025", followUp: "Pending", lead: "Waste" },
    { id: 5, fileName: "software/tech_company", value: "100-500", fullName: "Adeel Ali", dueDate: "12-08-2025", followUp: "Not Responding", lead: "Confirmed" },
    { id: 6, fileName: "software/tech_company", value: "100-500", fullName: "Adeel Ali", dueDate: "12-08-2025", followUp: "Contacted", lead: "Confirmed" },
    { id: 7, fileName: "software/tech_company", value: "100-500", fullName: "Adeel Ali", dueDate: "12-08-2025", followUp: "Pending", lead: "Waste" },
    { id: 5, fileName: "software/tech_company", value: "100-500", fullName: "Adeel Ali", dueDate: "12-08-2025", followUp: "Not Responding", lead: "Confirmed" },
    { id: 6, fileName: "software/tech_company", value: "100-500", fullName: "Adeel Ali", dueDate: "12-08-2025", followUp: "Contacted", lead: "Confirmed" },
    { id: 7, fileName: "software/tech_company", value: "100-500", fullName: "Adeel Ali", dueDate: "12-08-2025", followUp: "Pending", lead: "Waste" },
    // You can add more task objects here to match the image's 10 rows
  ]);

  const handleStatusChange = (id, type, value) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, [type]: value } : t)));
  };

  return (
    <div className="bg-black min-h-screen text-gray-300 font-sans p-4 sm:p-6 lg:p-8">
      <div className="rounded-xl p-4 sm:p-6 shadow-lg">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button className="p-2 hover:bg-gray-700 rounded-full">
              <ChevronLeftIcon />
            </button>
            <div className="relative w-full max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="bg-[#0D1117] border border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2.5 text-sm font-semibold text-white bg-[#DE8B2D] rounded-lg shadow-md hover:opacity-90 transition-opacity whitespace-nowrap">
              + Create New Task
            </button>
            <div className="flex items-center gap-1">
              <button className="p-2 border border-gray-700 rounded-lg hover:bg-gray-700">
                <TrendingUp />
              </button>
              <button className="p-2 border border-gray-700 bg-[#DE8B2D] rounded-lg hover:bg-gray-700">
                <UserRound />
              </button>
              <button className="p-2 border border-gray-700 rounded-lg hover:bg-gray-700">
                <ListCheck />
              </button>
              <button className="p-2 border border-gray-700 rounded-lg hover:bg-gray-700">
                <FilterIcon />
              </button>
            </div>
          </div>
        </header>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs text-gray-400 uppercase">
              <tr>
                <th className="px-6 py-3">File name</th>
                <th className="px-6 py-3">Value</th>
                <th className="px-6 py-3">Full Name</th>
                <th className="px-6 py-3">Due Date</th>
                <th className="px-6 py-3">Assigned</th>
                <th className="px-6 py-3">Follow up Status</th>
                <th className="px-6 py-3">Lead Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b border-[#121825] hover:bg-gray-800/50">
                  <td className="px-6 py-4 font-medium text-gray-300">{task.fileName}</td>
                  <td className="px-6 py-4">{task.value}</td>
                  <td className="px-6 py-4">{task.fullName}</td>
                  <td className="px-6 py-4">{task.dueDate}</td>
                  <td className="px-6 py-4">
                    <AssignedAvatars avatars={avatars} />
                  </td>
                  <td className="px-6 py-4">
                    <DropdownStatus
                      type="followUp"
                      value={task.followUp}
                      onChange={(val) => handleStatusChange(task.id, "followUp", val)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <DropdownStatus
                      type="lead"
                      value={task.lead}
                      onChange={(val) => handleStatusChange(task.id, "lead", val)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <footer className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-300">10</span> from <span className="font-medium text-gray-300">160</span> data
          </div>
          <nav className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm font-medium border border-gray-700 rounded-md hover:bg-gray-700">Previous</button>
            <button className="px-3 py-1.5 text-sm font-medium text-black bg-yellow-500 rounded-md">1</button>
            <button className="px-3 py-1.5 text-sm font-medium border border-gray-700 rounded-md hover:bg-gray-700">2</button>
            <button className="px-3 py-1.5 text-sm font-medium border border-gray-700 rounded-md hover:bg-gray-700">3</button>
            <button className="px-3 py-1.5 text-sm font-medium border border-gray-700 rounded-md hover:bg-gray-700">Next</button>
          </nav>
        </footer>
      </div>
    </div>
  );
}