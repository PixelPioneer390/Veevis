import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

// --- MOCK DATA ---
const PROJECT_DATA = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  status: ["High", "Low", "Normal"][i % 3],
  date: "12-08-2025",
  dueDate: "12-08-2025",
  project: `Mars BPO`,
  result: ["Complete", "On hold", "Pending", "In Progress"][i % 4],
  avatarCount: 4,
}));

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
        <img
          key={i}
          src={src}
          alt=""
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-zinc-900"
        />
      ))}
      {remaining > 0 && (
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-700 text-white flex items-center justify-center text-xs font-semibold border-2 border-zinc-900">
          +{remaining}
        </div>
      )}
    </div>
  );
};

const ResultPill = ({ result }) => {
  const colors = {
    Complete: "bg-[#587349] text-white",
    "On hold": "bg-[#B72F0D] text-white",
    Pending: "bg-[#DE8B2D] text-white",
    "In Progress": "bg-[#289EC9] text-white",
  }[result] || "bg-gray-700 text-gray-400";

  return (
    <span
      className={`px-2 py-1 text-xs sm:text-sm font-medium rounded-md ${colors} whitespace-nowrap`}
    >
      {result}
    </span>
  );
};

// --- RIGHT DRAWER ---
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

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[300px] bg-[#0E121B] z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="h-full flex flex-col justify-between p-4 sm:p-5"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[16px] font-semibold text-white flex items-center whitespace-nowrap">
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

            <h3 className="text-sm font-medium text-gray-300 mb-3">Details</h3>

            <div className="space-y-4">
              {["Projects", "Assigned To", "Priority", "Status", "Show"].map(
                (label) => (
                  <div key={label}>
                    <label className={labelClass}>{label}</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder={`Enter ${label}`}
                    />
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-[13px] bg-[#DE8B2D] hover:bg-[#c57826] text-white font-semibold rounded-md whitespace-nowrap"
            >
              Reset
            </button>
            <button className="flex-1 px-4 py-2 text-[13px] bg-green-600 hover:bg-green-500 text-white font-semibold rounded-md whitespace-nowrap">
              Apply filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// --- MAIN COMPONENT ---
const Projects = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(PROJECT_DATA.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = PROJECT_DATA.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isDrawerOpen]);

  // --- Pagination numbers ---
  const getPageNumbers = () => {
    if (totalPages <= 5) return [...Array(totalPages)].map((_, i) => i + 1);
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);
    const pages = [];
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  // --- Drag-to-scroll logic ---
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1; // scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-1/3 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 pl-10 text-white placeholder-gray-400 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-orange-500 bg-[#1C2230]"
          />
        </div>
        <button
          onClick={toggleDrawer}
          className="flex items-center space-x-2 px-4 py-3 bg-[#DE8B2D] hover:bg-orange-700 text-white font-semibold rounded-full shadow-md w-full sm:w-auto justify-center whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Create Project</span>
        </button>
      </div>

      {/* Table with Drag Scroll */}
      <div className="rounded-xl overflow-hidden">
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="overflow-x-auto custom-scrollbar cursor-grab active:cursor-grabbing select-none"
        >
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-xs text-white uppercase border-b border-zinc-800 whitespace-nowrap">
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left">Project</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left">Status</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left">Date</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left">
                  Due Date
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left">Result</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left">Assign</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 bg-[#587349] rounded-full mx-auto" />
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="text-sm text-white border-b border-zinc-900 hover:bg-zinc-900/50 transition-colors whitespace-nowrap"
                >
                  <td className="px-4 py-3 sm:px-6 sm:py-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src="Marss.png"
                        alt=""
                        className="h-8 w-8 rounded-full border border-zinc-700 flex-shrink-0"
                      />
                      <span className="text-white text-sm">{item.project}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4">
                    <span
                      className={`px-2 py-1 rounded-md text-xs sm:text-sm ${
                        item.status === "High"
                          ? "bg-[#B72F0D]"
                          : item.status === "Low"
                          ? "bg-[#289EC9]"
                          : "bg-[#5AC95A]"
                      } text-white`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-300">
                    {item.date}
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-300">
                    {item.dueDate}
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4">
                    <ResultPill result={item.result} />
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4">
                    <AvatarGroup count={item.avatarCount} />
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 text-center">
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
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-gray-400 pt-6 border-t border-zinc-800 space-y-4 sm:space-y-0">
        <div className="text-sm text-center sm:text-left">
          Showing{" "}
          <span className="text-white">
            {startIndex + 1} -{" "}
            {Math.min(startIndex + itemsPerPage, PROJECT_DATA.length)}
          </span>{" "}
          of <span className="text-white">{PROJECT_DATA.length}</span> entries
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-2">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-zinc-800 rounded-lg disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {pageNumbers.map((page, i) => (
              <React.Fragment key={i}>
                {page === "..." ? (
                  <span className="px-3 py-2 text-sm">...</span>
                ) : (
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 mx-1 text-sm font-semibold rounded-lg ${
                      currentPage === page
                        ? "bg-orange-600 text-white"
                        : "text-gray-400 hover:bg-zinc-800 hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-zinc-800 rounded-lg disabled:opacity-50"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <CreateProjectDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
    </div>
  );
};

export default Projects;
