import React, { useState, useMemo } from "react";
import Board from "./Board";
import Calender from "./Calender";

// --- Icon Components ---
const Search = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
const Filter = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
);
const User = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const Plus = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);
const List = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="11" x2="20" y1="6" y2="6"/><line x1="11" x2="20" y1="12" y2="12"/><line x1="11" x2="20" y1="18" y2="18"/><path d="M4 6h.01"/><path d="M4 12h.01"/><path d="M4 18h.01"/></svg>
);
const LayoutDashboard = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
);
const Calendar = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);
const MoreHorizontal = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
);
const ChevronLeft = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
);
const ChevronRight = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
);
const DotsVertical = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
);

// --- Mock Data ---
const MOCK_TASKS = [ { id: 1, title: "Watch a short demo video", status: "New task", fields: "Marketing", dueDate: "12-08-2025", priority: "High", assigned: ["A", "B"] }, { id: 2, title: "Watch a short demo video", status: "New task", fields: "Designing", dueDate: "12-08-2025", priority: "Low", assigned: ["C", "D"] }, { id: 3, title: "Watch a short demo video", status: "New task", fields: "Development", dueDate: "12-08-2025", priority: "Normal", assigned: ["E", "F"] }, { id: 4, title: "Watch a short demo video", status: "New task", fields: "Marketing", dueDate: "12-08-2025", priority: "High", assigned: ["G", "H"] }, { id: 5, title: "Watch a short demo video", status: "New task", fields: "Designing", dueDate: "12-08-2025", priority: "Low", assigned: ["I", "J"] }, { id: 6, title: "Watch a short demo video", status: "New task", fields: "Development", dueDate: "12-08-2025", priority: "Normal", assigned: ["K", "L"] }, ];

// --- Avatar ---
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

// --- Tag ---
const Tag = ({ children, type }) => {
  let base = "px-3 py-1 rounded-full text-xs font-medium border";
  const styles = {
    Marketing: "bg-red-900/40 text-red-300 border-red-500/50",
    Designing: "bg-cyan-900/40 text-cyan-300 border-cyan-500/50",
    Development: "bg-teal-900/40 text-teal-300 border-teal-500/50",
    High: "bg-red-900/40 text-red-300",
    Normal: "bg-green-900/40 text-green-300",
    Low: "bg-blue-900/40 text-blue-300",
  };
  return <span className={`${base} ${styles[type] || "bg-gray-700/50 text-gray-300"}`}>{children}</span>;
};

const App = () => {
  const [activeTab, setActiveTab] = useState("List");
  const [currentPage, setCurrentPage] = useState(1);
  const totalData = 150;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalData / itemsPerPage);

  const pageNumbers = useMemo(() => {
    const pagesToShow = 4;
    let start = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    let end = Math.min(totalPages, start + pagesToShow - 1);
    if (end - start + 1 < pagesToShow) start = Math.max(1, end - pagesToShow + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  // --- Header ---
  const Header = () => (
    <div className="flex justify-end items-center px-8 py-6">
      <button className="flex items-center space-x-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg shadow-lg shadow-orange-900/50">
        <Plus className="w-4 h-4" />
        <span className="text-sm">Create New Task</span>
      </button>
    </div>
  );

  // --- Search & Tabs ---
  const SearchAndActions = () => (
    <div className="flex justify-between items-center px-8 pb-4 pt-2">
      <div className="flex space-x-6">
        {["List", "Board", "Calendar"].map((name) => {
          const isActive = activeTab === name;
          const Icon = name === "List" ? List : name === "Board" ? LayoutDashboard : Calendar;
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

      {/* right actions */}
      <div className="flex items-center space-x-3 text-gray-300">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-900/50 text-gray-300 border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:ring-amber-500 focus:border-amber-500 placeholder-gray-500 text-sm"
          />
        </div>
        <button className="p-2 bg-gray-900/50 border border-gray-700 rounded-lg hover:bg-gray-800 text-amber-500"><Filter /></button>
        <button className="p-2 bg-gray-900/50 border border-gray-700 rounded-lg hover:bg-gray-800"><User /></button>
        <button className="p-2 bg-gray-900/50 border border-gray-700 rounded-lg hover:bg-gray-800"><DotsVertical /></button>
      </div>
    </div>
  );

  // --- Task List ---
  const TaskList = () => (
    <div className="mx-8 mt-2 overflow-x-auto border border-l-0 border-r-0 border-gray-800/70 flex-1">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-4 px-4 text-left text-sm font-medium text-gray-400 w-1/4">
              Active tasks{" "}
              <span className="bg-green-900/50 text-green-300 text-xs px-2 py-0.5 ml-2 rounded-full font-bold">10</span>
            </th>
            {["Status", "Fields", "Due Date", "Priority", "Assign"].map((h) => (
              <th key={h} className="py-4 px-4 text-left text-sm font-medium text-gray-400">
                {h}
              </th>
            ))}
             <th className="px-6 py-4 flex justify-content-center">
                    <div className="bg-[#3E692F] rounded-circle p-1 text-center ms-3 flex items-center justify-center mx-auto" style={{ borderRadius: '50%' }}>
                    <Plus className="fw-bolder text-white w-4 h-4" />
                    </div>
                  </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800 bg-gray-950/50">
          {MOCK_TASKS.map((task) => (
            <tr key={task.id} className="hover:bg-gray-900 transition-colors">
              <td className="py-4 px-4 text-sm text-gray-300 flex items-center space-x-3">
                <img src="/Screen.svg" alt="" />
                <span>{task.title}</span>
              </td>
              <td className="py-4 px-4 text-sm text-gray-400">{task.status}</td>
              <td className="py-4 px-4 text-sm">
                <Tag type={task.fields}>{task.fields}</Tag>
              </td>
              <td className="py-4 px-4 text-sm text-gray-300">{task.dueDate}</td>
              <td className="py-4 px-4 text-sm">
                <Tag type={task.priority}>{task.priority}</Tag>
              </td>
              <td className="py-4 px-4 text-sm">
                <div className="flex items-center -space-x-2">
                  {task.assigned.slice(0, 2).map((i, idx) => (
                    <Avatar key={idx} initials={i} index={idx} />
                  ))}
                </div>
              </td>
              <td className="py-4 px-4 text-gray-500">
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

  // --- Board View ---
  const BoardView = () => (
    <div className="grid grid-cols-3 gap-4 px-8 mt-4">
      {["To Do", "In Progress", "Completed"].map((col, i) => (
        <div key={col} className="bg-gray-900/60 rounded-xl border border-gray-800 p-4">
          <h3 className="text-lg font-semibold mb-4 text-amber-400">{col}</h3>
          <div className="space-y-3">
            {MOCK_TASKS.filter((t) => i === 0 || i === 1 || i === 2).map((task) => (
              <div key={task.id} className="bg-gray-800/70 p-3 rounded-lg border border-gray-700 hover:border-amber-500 transition">
                <p className="text-sm font-medium text-gray-200">{task.title}</p>
                <p className="text-xs text-gray-400 mt-1">{task.fields} • {task.dueDate}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <Tag type={task.priority}>{task.priority}</Tag>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  // --- Calendar View ---
  const CalendarView = () => (
    <div className="flex flex-col items-center justify-center h-80 text-gray-400 border border-gray-800 rounded-xl mx-8 mt-6">
      <Calendar className="w-10 h-10 mb-3 text-amber-500" />
      <p>No calendar events yet.</p>
    </div>
  );

  // --- Pagination ---
  const Pagination = () => (
    <div className="sticky bottom-0 bg-black border-t border-gray-800 py-4 flex justify-between items-center px-8">
      <span className="text-sm text-gray-400">Showing 10 from {totalData} data</span>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="flex items-center space-x-1 p-2 rounded-lg text-gray-400 bg-gray-900/50 hover:bg-gray-800 disabled:opacity-50 border border-gray-700 text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>
        <div className="flex space-x-2">
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold ${
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
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  // --- Main Return ---
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
