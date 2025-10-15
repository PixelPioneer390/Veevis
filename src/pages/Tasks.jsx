import React, { useState, useMemo } from "react";
import Board from "./Board";
import Calender from "./Calender";

// --- Icon Components (No Change Required) ---
const Search = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const Filter = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const User = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const Plus = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);
const List = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="11" x2="20" y1="6" y2="6" />
    <line x1="11" x2="20" y1="12" y2="12" />
    <line x1="11" x2="20" y1="18" y2="18" />
    <path d="M4 6h.01" />
    <path d="M4 12h.01" />
    <path d="M4 18h.01" />
  </svg>
);
const LayoutDashboard = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);
const Calendar = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);
const MoreHorizontal = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);
const ChevronLeft = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m15 18-6-6 6-6" />
  </svg>
);
const ChevronRight = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m9 18 6-6-6-6" />
  </svg>
);
const DotsVertical = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

// --- Mock Data (No Change Required) ---
const MOCK_TASKS = Array.from({ length: 150 }, (_, i) => ({
  id: i + 1,
  title: `Task #${i + 1}`,
  status: "New task",
  fields: ["Marketing", "Designing", "Development"][i % 3],
  dueDate: "12-08-2025",
  priority: ["High", "Normal", "Low"][i % 3],
  assigned: ["A", "B"],
}));

// --- Avatar (No Change Required) ---
const Avatar = ({ initials, index }) => {
  const colors = ["bg-pink-500", "bg-cyan-500", "bg-indigo-500", "bg-lime-500"];
  return (
    <div
      className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center text-white ring-2 ring-gray-950 ${colors[index % colors.length]}`}
      style={{ marginLeft: index > 0 ? "-0.5rem" : "0" }}
    >
      {initials}
    </div>
  );
};

// --- Tag (No Change Required) ---
const Tag = ({ children, type }) => {
  let base = "px-3 py-1 rounded-sm text-xs font-medium";
  const styles = {
    Marketing: "bg-[#B72F0D] text-white",
    Designing: "bg-[#DE8B2D] text-white",
    Development: "bg-[#289EC9] text-white",
    High: "bg-[#B72F0D] text-white",
    Normal: "bg-[#5AC95A] text-white",
    Low: "bg-[#289EC9] text-white",
  };
  return (
    <span
      className={`${base} ${
        styles[type] || "bg-gray-700/50 text-gray-300"
      }`}
    >
      {children}
    </span>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState("List");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(MOCK_TASKS.length / itemsPerPage);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return MOCK_TASKS.slice(start, start + itemsPerPage);
  }, [currentPage]);

  const pageNumbers = useMemo(() => {
    const pagesToShow = 4;
    let start = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    let end = Math.min(totalPages, start + pagesToShow - 1);
    if (end - start + 1 < pagesToShow)
      start = Math.max(1, end - pagesToShow + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  // --- Header (No Major Change) ---
  const Header = () => (
    <div className="flex justify-end items-center px-4 sm:px-8 py-4 sm:py-6">
      <button className="flex items-center space-x-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg shadow-lg shadow-orange-900/50 text-sm sm:text-base">
        <Plus className="w-4 h-4" />
        <span>Create New Task</span>
      </button>
    </div>
  );

  // --- SearchAndActions (Improved wrap on small screens) ---
  const SearchAndActions = () => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-4 sm:px-8 pb-4 pt-2">
      {/* Tab Controls - Added md:space-x-8 for slight increase on larger screens */}
      <div className="flex space-x-4 sm:space-x-6">
        {["List", "Board", "Calendar"].map((name) => {
          const isActive = activeTab === name;
          const Icon =
            name === "List" ? List : name === "Board" ? LayoutDashboard : Calendar;
          return (
            <button
              key={name}
              onClick={() => setActiveTab(name)}
              className={`flex items-center space-x-2 text-sm font-medium ${
                isActive
                  ? "text-amber-500 border-b-2 border-amber-500 pb-2"
                  : "text-gray-400 hover:text-gray-200 border-b-2 border-transparent pb-2"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{name}</span>
            </button>
          );
        })}
      </div>

      {/* Search and Action Buttons - Ensured grouping and proper wrapping on tiny screens */}
      <div className="flex items-center space-x-2 sm:space-x-3 text-gray-300 w-full sm:w-auto mt-3 sm:mt-0">
        <div className="relative flex-grow max-w-[calc(100%-140px)] sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-900/50 text-gray-300 border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:ring-amber-500 focus:border-amber-500 placeholder-gray-500 text-sm"
          />
        </div>
        <button className="p-2 bg-gray-900/50 border border-gray-700 rounded-lg hover:bg-gray-800 text-amber-500 flex-shrink-0">
          <Filter />
        </button>
        <button className="p-2 bg-gray-900/50 border border-gray-700 rounded-lg hover:bg-gray-800 flex-shrink-0 hidden sm:block"> {/* Hidden on small screens for space */}
          <User />
        </button>
        <button className="p-2 bg-gray-900/50 border border-gray-700 rounded-lg hover:bg-gray-800 flex-shrink-0">
          <DotsVertical />
        </button>
      </div>
    </div>
  );

  // --- TaskList (No Major Change - overflow-x-auto handles responsiveness) ---
  const TaskList = () => (
    // The overflow-x-auto handles responsiveness for the table on small screens by allowing horizontal scrolling.
    <div className="mx-2 sm:mx-8 mt-2 overflow-x-auto border border-l-0 border-r-0 border-gray-800/70 flex-1">
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-sm font-medium text-white whitespace-nowrap"> {/* Added whitespace-nowrap for header */}
            <th className="py-4 px-4 w-1/4 min-w-[150px]"> {/* Added min-width for main column */}
              Active tasks{" "}
              <span className="bg-green-900/50 text-green-300 text-xs px-2 py-0.5 ml-2 rounded-full font-bold">
                10
              </span>
            </th>
            {["Status", "Fields", "Due Date", "Priority", "Assign"].map((h) => (
              <th key={h} className="py-4 px-4 min-w-[100px]"> {/* Added min-width for consistency */}
                {h}
              </th>
            ))}
            <th
  className="py-4 px-4 text-center min-w-[50px]"
  style={{ width: 'max-content' }}
>
  <div className="bg-[#3E692F] w-5 h-5 aspect-square flex items-center justify-center rounded-full mx-auto ">
    <Plus className="text-white w-4 h-4" />
  </div>
</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800 bg-gray-950/50">
          {currentData.map((task) => (
            <tr
              key={task.id}
              className="hover:bg-gray-900 transition-colors text-sm whitespace-nowrap" // Added whitespace-nowrap for rows
            >
              <td className="py-4 px-4 text-white flex items-center space-x-3">
                {/* Note: /Screen.svg needs to exist or this will be a broken image */}
                <img src="/Screen.svg" alt="" className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{task.title}</span> {/* Added truncate to title */}
              </td>
              <td className="py-4 px-4 text-white">{task.status}</td>
              <td className="py-4 px-4">
                <Tag type={task.fields}>{task.fields}</Tag>
              </td>
              <td className="py-4 px-4 text-white">{task.dueDate}</td>
              <td className="py-4 px-4">
                <Tag type={task.priority}>{task.priority}</Tag>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center -space-x-2">
                  {task.assigned.slice(0, 2).map((i, idx) => (
                    <Avatar key={idx} initials={i} index={idx} />
                  ))}
                </div>
              </td>
              <td className="py-4 px-4 text-white text-center">
                <button className="p-1 rounded-full hover:bg-gray-800">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // --- Pagination (Minor adjustment for better spacing on tiny screens) ---
  const Pagination = () => (
    <div className="sticky bottom-0 bg-black border-t border-gray-800 py-4 flex flex-wrap justify-center sm:justify-between items-center gap-3 px-4 sm:px-8">
      {/* Added `text-center w-full sm:w-auto` for better centering on small screens */}
      <span className="text-sm text-gray-400 text-center w-full sm:w-auto order-last sm:order-first">
        Showing {currentData.length} of {MOCK_TASKS.length} tasks
      </span>
      {/* Added `flex-wrap justify-center` for page numbers on small screens */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="flex items-center space-x-1 p-2 rounded-lg text-gray-400 bg-gray-900/50 hover:bg-gray-800 disabled:opacity-50 border border-gray-700 text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className='hidden sm:inline'>Previous</span>
        </button>
        {/* Added flex-wrap for page numbers */}
        <div className="flex space-x-1 sm:space-x-2 flex-wrap justify-center">
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 sm:w-9 h-8 sm:h-9 flex items-center justify-center rounded-lg text-sm font-semibold mb-1 ${
                page === currentPage
                  ? "bg-orange-600 text-white shadow-md shadow-orange-900/50"
                  : "bg-gray-900/50 text-gray-300 hover:bg-gray-800 border border-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center space-x-1 p-2 rounded-lg text-gray-400 bg-gray-900/50 hover:bg-gray-800 disabled:opacity-50 border border-gray-700 text-sm"
        >
          <span className='hidden sm:inline'>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  // --- Main Render (No Change Required) ---
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased flex flex-col">
      <Header />
      <SearchAndActions />

      <div className="flex-1 overflow-y-auto">
        {activeTab === "List" && (
          <>
            <TaskList />
            <Pagination />
          </>
        )}
        {activeTab === "Board" && <Board />}
        {activeTab === "Calendar" && <Calender />}
      </div>
    </div>
  );
};

export default App;