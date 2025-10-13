import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook

// --- Icon Definitions ---
const SearchIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const DownloadIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

const FilterIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const ColumnsIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M12 3v18" />
  </svg>
);

const SettingsIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="4" y1="21" y2="14" />
    <line x1="4" x2="4" y1="10" y2="3" />
    <line x1="12" x2="12" y1="21" y2="12" />
    <line x1="12" x2="12" y1="8" y2="3" />
    <line x1="20" x2="20" y1="21" y2="16" />
    <line x1="20" x2="20" y1="12" y2="3" />
    <line x1="1" x2="7" y1="14" y2="14" />
    <line x1="9" x2="15" y1="8" y2="8" />
    <line x1="17" x2="23" y1="16" y2="16" />
  </svg>
);

// --- Mock Data ---
const MOCK_DATA = Array.from({ length: 160 }, (_, i) => {
  const users = ["Qasim", "Bilal", "Faisal", "Ahmed"];
  const user = users[i % users.length];
  const progressPercent = [100, 100, 60, 100][i % 4];
  return {
    id: i + 1,
    fileName: "software/tech_company",
    value: "100–500",
    createdBy: user,
    dueDate: "12-08-2025",
    progress: progressPercent,
  };
});

// --- Utility Components ---
const UserPill = ({ name }) => {
  const colorMap = {
    Qasim: "bg-red-600",
    Bilal: "bg-blue-600",
    Faisal: "bg-green-600",
    Ahmed: "bg-orange-600",
  };
  return (
    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-md ${colorMap[name] || "bg-gray-600"} text-white`}>
      {name}
    </span>
  );
};

const ActionProgress = ({ progress }) => {
  const complete = progress;
  const statusText = progress === 100 ? "Export Complete" : "Exporting";
  const statusColor = progress === 100 ? "text-green-500" : "text-red-600";
  return (
    <div className="flex flex-col space-y-1">
      <span className={`text-[10px] font-bold uppercase ${statusColor} tracking-wide`}>{statusText}</span>
      <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-gray-800">
        <div className="bg-green-500 transition-all duration-500" style={{ width: `${complete}%` }}></div>
        {progress < 100 && (
          <div className="bg-red-600 transition-all duration-500" style={{ width: `${100 - complete}%` }}></div>
        )}
      </div>
    </div>
  );
};

// --- Top Header ---
const TopHeader = () => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-0 pb-4">
    <div className="flex items-end mb-4 sm:mb-0">
      <h1 className="text-3xl font-bold text-white">Export</h1>
    </div>
    <div className="flex items-center space-x-3 w-full sm:w-auto">
      <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
        <input
          type="search"
          placeholder="Search"
          className="pl-10 pr-4 py-2 w-full bg-[#1c1c1c] border border-gray-700 text-gray-300 rounded-xl focus:ring-1 focus:ring-orange-500 outline-none placeholder-gray-500 transition duration-150 ease-in-out shadow-inner"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>
      {[FilterIcon, ColumnsIcon, SettingsIcon].map((Icon, i) => (
        <button
          key={i}
          className="p-2 rounded-xl bg-[#1c1c1c] text-gray-400 hover:text-white hover:bg-[#333333] transition shadow-md border border-gray-700 hidden sm:block"
          title={i === 0 ? "Filter" : i === 1 ? "Layout" : "Settings"}
        >
          <Icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  </div>
);

// --- Data Table ---
const DataTable = ({ data }) => {
  const headers = ["File name", "Value", "Created By", "Due Date", "Action", "Download"];
  const navigate = useNavigate(); // ✅ initialize navigation

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-900 shadow-xl">
      <table className="min-w-full table-auto text-sm text-gray-400">
        <thead className="text-xs uppercase bg-black/50">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-4 py-3 font-medium text-left text-gray-500 whitespace-nowrap border-b border-gray-900">
                {header}
                {i === 0 && (
                  <span className="ml-2 px-1 py-0.5 text-xs bg-gray-800 text-gray-400 rounded-md">
                    {data.length}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-900 hover:bg-[#1c1c1c] transition">
              <td className="px-4 py-3 text-white font-medium">{item.fileName}</td>
              <td className="px-4 py-3">{item.value}</td>
              <td className="px-4 py-3"><UserPill name={item.createdBy} /></td>
              <td className="px-4 py-3 whitespace-nowrap">{item.dueDate}</td>
              <td className="px-4 py-3 w-48"><ActionProgress progress={item.progress} /></td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => navigate(`/download`)} // ✅ navigate to download page
                  className="text-blue-500 hover:text-blue-400 transition p-1 rounded-full"
                  title="Download"
                >
                  <DownloadIcon className="w-5 h-5 mx-auto" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- Pagination ---
const Pagination = ({ dataPerPage, currentPage, setCurrentPage }) => {
  const totalDisplay = 160;
  const totalPages = Math.ceil(totalDisplay / dataPerPage);
  const visiblePages = Array.from({ length: Math.min(4, totalPages) }, (_, i) => i + 1);

  return (
    <div className="sticky bottom-0 z-10 px-4 py-4 flex flex-col md:flex-row items-center justify-between text-white border-t border-gray-900 bg-[#0b0b0b]">
      <span className="text-sm text-gray-400 mb-4 md:mb-0">
        Showing 10 from {totalDisplay} data
      </span>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm rounded-xl bg-[#1c1c1c] text-gray-300 hover:bg-[#333333] disabled:opacity-50 transition border border-gray-700"
        >
          Previous
        </button>
        <div className="flex space-x-1">
          {visiblePages.map((n) => (
            <button
              key={n}
              onClick={() => setCurrentPage(n)}
              className={`w-10 h-10 rounded-xl text-sm font-bold transition 
              ${n === currentPage
                ? "bg-orange-600 text-white shadow-lg"
                : "bg-[#1c1c1c] text-gray-400 hover:bg-[#333333] border border-gray-700"}`}
            >
              {n}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
          className="px-4 py-2 text-sm rounded-xl bg-[#1c1c1c] text-gray-300 hover:bg-[#333333] border border-gray-700 disabled:opacity-50 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// --- App ---
const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const MOCK_DATA_LENGTH = MOCK_DATA.length;
  const startIndex = (currentPage - 1) * dataPerPage;

  const currentData = useMemo(() => {
    const dataSlice = [];
    for (let i = 0; i < dataPerPage; i++) {
      const dataIndex = (startIndex + i) % MOCK_DATA_LENGTH;
      dataSlice.push(MOCK_DATA[dataIndex]);
    }
    return dataSlice;
  }, [currentPage, startIndex, MOCK_DATA_LENGTH]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0b0b] font-sans">
      <style jsx="true">{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        .font-sans {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
      <div className="flex-grow p-4 md:p-6">
        <TopHeader />
        <DataTable data={currentData} />
      </div>
      <Pagination
        dataPerPage={dataPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default App;
