import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Navigation hook

// --- MOCK DATA ---
const mockData = [
  { id: 1, date: "12-08-2025", proposedTo: "Sare Ali", title: "Adeel Ali", validUntil: "12-08-2025", status: "Complete" },
  { id: 2, date: "12-08-2025", proposedTo: "Sare Ali", title: "Adeel Ali", validUntil: "12-08-2025", status: "On hold" },
  { id: 3, date: "12-08-2025", proposedTo: "Sare Ali", title: "Adeel Ali", validUntil: "12-08-2025", status: "In Progress" },
  { id: 4, date: "12-08-2025", proposedTo: "Sare Ali", title: "Adeel Ali", validUntil: "12-08-2025", status: "Pending" },
  { id: 5, date: "12-08-2025", proposedTo: "Sare Ali", title: "Adeel Ali", validUntil: "12-08-2025", status: "Complete" },
  { id: 6, date: "12-08-2025", proposedTo: "Sare Ali", title: "Adeel Ali", validUntil: "12-08-2025", status: "On hold" },
  { id: 7, date: "12-08-2025", proposedTo: "Sare Ali", title: "Adeel Ali", validUntil: "12-08-2025", status: "In Progress" },
  { id: 8, date: "12-08-2025", proposedTo: "Sare Ali", title: "Adeel Ali", validUntil: "12-08-2025", status: "Complete" },
  { id: 9, date: "12-08-2025", proposedTo: "Sare Ali", title: "Adeel Ali", validUntil: "12-08-2025", status: "On hold" },
  { id: 10, date: "12-08-2025", proposedTo: "Sare Ali", title: "Adeel Ali", validUntil: "12-08-2025", status: "Pending" },
];

const itemsPerPage = 10;
const totalData = 160;
const totalPages = Math.ceil(totalData / itemsPerPage);

// --- STATUS BADGE COMPONENT ---
const StatusBadge = ({ status }) => {
  const base = "px-3 py-1 text-xs font-semibold rounded-full w-24 text-center";
  const colors = {
    Complete: "bg-emerald-800/50 text-emerald-300 border border-emerald-700/50",
    "On hold": "bg-red-800/50 text-red-300 border border-red-700/50",
    "In Progress": "bg-sky-800/50 text-sky-300 border border-sky-700/50",
    Pending: "bg-amber-800/50 text-amber-300 border border-amber-700/50",
  };
  return <span className={`${base} ${colors[status] || "bg-gray-700/50 text-gray-400 border border-gray-600/50"}`}>{status}</span>;
};

// --- MAIN COMPONENT ---
export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // ✅ Filter & paginate data
  const filteredData = useMemo(() => {
    return mockData.filter(
      (item) =>
        item.proposedTo.toLowerCase().includes(search.toLowerCase()) ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.status.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const displayedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return Array.from({ length: itemsPerPage }, (_, i) => {
      const item = filteredData[i % filteredData.length];
      return { ...item, id: start + i + 1 };
    });
  }, [currentPage, filteredData]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const visiblePages = useMemo(() => {
    const maxVisible = 4;
    const pages = [];
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible) start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [currentPage]);

  const TableHeader = ({ title }) => (
    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase whitespace-nowrap">{title}</th>
  );

  const TableRow = ({ proposal }) => (
    <tr className="border-b border-gray-700/50 hover:bg-gray-700/70 transition duration-150 bg-transparent">
      <td className="px-4 py-3 text-sm text-gray-300 font-mono">{proposal.id}</td>
      <td className="px-4 py-3 text-sm text-gray-300">{proposal.date}</td>
      <td className="px-4 py-3 text-sm text-sky-400">{proposal.proposedTo}</td>
      <td className="px-4 py-3 text-sm text-gray-300">{proposal.title}</td>
      <td className="px-4 py-3 text-sm text-gray-300">{proposal.validUntil}</td>
      <td className="px-4 py-3">
        <StatusBadge status={proposal.status} />
      </td>
      <td className="px-4 py-3">
        <div className="flex space-x-3 text-gray-400">
          <button title="View" className="hover:text-emerald-400 transition-colors">
            <Eye size={16} />
          </button>
          <button title="Edit" className="hover:text-blue-400 transition-colors">
            <Pencil size={16} />
          </button>
          <button title="Delete" className="hover:text-red-400 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen font-sans p-4 sm:p-8 lg:p-12 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 text-sm text-gray-200 placeholder-gray-400 transition-colors"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        {/* ✅ Navigate to Create Proposal page */}
        <button
          onClick={() => navigate("/create")}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-full shadow-lg shadow-orange-600/30 transition duration-150 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={18} />
          <span>Create Proposal</span>
        </button>
      </div>

      {/* Table */}
      <div className="shadow-xl rounded-lg overflow-x-auto border border-gray-700/50">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="border-b border-gray-700/50">
            <tr>
              <TableHeader title="ID" />
              <TableHeader title="Date" />
              <TableHeader title="Proposed To" />
              <TableHeader title="Title" />
              <TableHeader title="Valid Until" />
              <TableHeader title="Status" />
              <TableHeader title="Action" />
            </tr>
          </thead>
          <tbody>
            {displayedData.map((proposal) => (
              <TableRow key={proposal.id} proposal={proposal} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center pt-4 text-sm text-gray-400 space-y-4 sm:space-y-0">
        <div>
          Showing <span className="font-semibold text-gray-300">{displayedData.length}</span> of{" "}
          <span className="font-semibold text-gray-300">{totalData}</span> data
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
              currentPage === 1
                ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-700 text-gray-300"
            }`}
          >
            <ChevronLeft size={16} />
            <span className="font-medium">Previous</span>
          </button>

          <div className="flex space-x-1">
            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? "bg-orange-600 text-white shadow-md shadow-orange-600/40"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
              currentPage === totalPages
                ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-700 text-gray-300"
            }`}
          >
            <span className="font-medium">Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
