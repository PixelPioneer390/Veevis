import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

// --- MOCK DATA ---
const PROJECT_DATA = [
  { id: 1, status: "High", date: "12-08-2025", dueDate: "12-08-2025", project: "Mars BPO", result: "Complete", avatarCount: 4 },
  { id: 2, status: "Low", date: "12-08-2025", dueDate: "12-08-2025", project: "Mars BPO", result: "On hold", avatarCount: 4 },
  { id: 3, status: "Normal", date: "12-08-2025", dueDate: "12-08-2025", project: "Mars BPO", result: "Pending", avatarCount: 4 },
  { id: 4, status: "High", date: "12-08-2025", dueDate: "12-08-2025", project: "Mars BPO", result: "In Progress", avatarCount: 4 },
  { id: 5, status: "Low", date: "12-08-2025", dueDate: "12-08-2025", project: "Mars BPO", result: "Complete", avatarCount: 4 },
  { id: 6, status: "Normal", date: "12-08-2025", dueDate: "12-08-2025", project: "Mars BPO", result: "On hold", avatarCount: 4 },
];

// --- SMALL COMPONENTS ---
const AvatarGroup = ({ count }) => {
  const avatars = [
    "https://placehold.co/32x32/1a2b3c/ffffff?text=JS",
    "https://placehold.co/32x32/5a3d5c/ffffff?text=MJ",
    "https://placehold.co/32x32/7a5d7c/ffffff?text=SK",
  ];
  const visible = 2;
  const remaining = count - visible;

  return (
    <div className="flex -space-x-3">
      {avatars.slice(0, visible).map((src, i) => (
        <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-zinc-900" />
      ))}
      {remaining > 0 && (
        <div className="w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center text-xs font-semibold border-2 border-zinc-900">
          +{remaining}
        </div>
      )}
    </div>
  );
};

const ResultPill = ({ result }) => {
  const colors = {
    Complete: "bg-green-700 text-green-200 border border-green-500/30",
    "On hold": "bg-red-700 text-red-200 border border-red-500/30",
    Pending: "bg-orange-700 text-orange-200 border border-orange-500/30",
    "In Progress": "bg-blue-700 text-blue-200 border border-blue-500/30",
  }[result] || "bg-gray-700 text-gray-400";
  return (
    <span className={`px-3 py-1 text-sm font-medium rounded-md ${colors}`}>
      {result}
    </span>
  );
};

// --- UPDATED LEFT DRAWER ---
const CreateProjectDrawer = ({ isOpen, onClose }) => {
  const inputClass =
    "w-full p-2.5 bg-[#1C2230] text-white border border-zinc-700 rounded-md focus:ring-1 focus:ring-[#DE8B2D] focus:border-[#DE8B2D] placeholder-gray-400 text-sm";
  const labelClass = "block text-xs font-medium text-gray-400 mb-1";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer - now slides from right side */}
      <div
        className={`fixed top-0 right-0 h-full w-[260px] sm:w-[300px] bg-[#0E121B] z-50 shadow-2xl rounded-tl-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="h-full flex flex-col justify-between p-5"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[16px] font-semibold text-white flex items-center">
                <Plus className="w-4 h-4 mr-2 text-[#DE8B2D]" />
                Create Project
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Details Section */}
            <h3 className="text-sm font-medium text-gray-300 mb-3">Details</h3>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Projects</label>
                <select className={inputClass}>
                  <option>Select Project</option>
                  <option>Mars BPO</option>
                  <option>Venus Corp</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Assigned To</label>
                <select className={inputClass}>
                  <option>Select Assignee</option>
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Due Added</label>
                <div className="flex space-x-2">
                  <input type="text" placeholder="Start" className={inputClass} />
                  <input type="text" placeholder="End" className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Due Date</label>
                <div className="flex space-x-2">
                  <input type="text" placeholder="Start" className={inputClass} />
                  <input type="text" placeholder="End" className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Priority</label>
                <select className={inputClass}>
                  <option>Select Priority</option>
                  <option>High</option>
                  <option>Normal</option>
                  <option>Low</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Status</label>
                <select className={inputClass}>
                  <option>Select Status</option>
                  <option>Complete</option>
                  <option>On hold</option>
                  <option>Pending</option>
                  <option>In Progress</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Show</label>
                <input type="text" className={inputClass} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-[13px] bg-[#DE8B2D] hover:bg-[#c57826] text-white font-semibold rounded-md"
            >
              Reset
            </button>
            <button className="px-4 py-2 text-[13px] bg-green-600 hover:bg-green-500 text-white font-semibold rounded-md">
              Apply filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};


// --- MAIN PAGE ---
const Projects = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isDrawerOpen]);

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans flex flex-col justify-around">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-1/3 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 pl-10 text-white placeholder-gray-400 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={toggleDrawer}
          className="flex items-center space-x-2 px-4 py-3 bg-[#DE8B2D] hover:bg-orange-700 text-white font-semibold rounded-full shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Create Project</span>
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-xs text-white uppercase border-b border-zinc-800">
                <th className="px-6 py-4 text-left">
                  <h2 className="flex items-center">
                    Active Projects
                    <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-black text-green-400">
                      10
                    </span>
                  </h2>
                </th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Due Date</th>
                <th className="px-6 py-4 text-left">Result</th>
                <th className="px-6 py-4 text-left">Assign</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {PROJECT_DATA.map((item) => (
                <tr key={item.id} className="text-sm text-white border-b border-zinc-900 hover:bg-zinc-900/50 transition-colors">
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <img src="Marss.png" alt="" className="h-8 w-8 rounded-full border border-zinc-700" />
                    <span>{item.project}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-md text-sm ${
                        item.status === "High"
                          ? "bg-red-800/50 text-red-300"
                          : item.status === "Low"
                          ? "bg-blue-800/50 text-blue-300"
                          : "bg-green-800/50 text-green-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{item.date}</td>
                  <td className="px-6 py-4 text-gray-300">{item.dueDate}</td>
                  <td className="px-6 py-4">
                    <ResultPill result={item.result} />
                  </td>
                  <td className="px-6 py-4">
                    <AvatarGroup count={item.avatarCount} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={toggleDrawer}>
                      <MoreHorizontal className="w-4 h-4 text-gray-500 hover:text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-gray-400 pt-6 border-t border-zinc-800">
        <div className="text-sm">
          Showing <span className="text-white">10</span> from{" "}
          <span className="text-white">160</span> data
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-zinc-800 rounded-lg">
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              className={`px-4 py-2 mx-1 text-sm font-semibold rounded-lg ${
                page === 1
                  ? "bg-orange-600 text-white"
                  : "text-gray-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="flex items-center space-x-1 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-zinc-800 rounded-lg">
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <CreateProjectDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
    </div>
  );
};

export default Projects;
