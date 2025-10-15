import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Add this import

// --- Mock Data ---
const mockLeads = [
  { no: "01", businessType: "software/tech_company", manage: "Yes", using: "no,_but_interested", inboundCalls: "100–500", fullName: "Adeel", email: "adeel.khan@techcorp.io", phoneNumber: "+92 300 1234561" },
  { no: "02", businessType: "retail_e-commerce", manage: "No", using: "yes", inboundCalls: "500–1000", fullName: "Zainab", email: "zainab.ali@shopwise.com", phoneNumber: "+92 333 9876543" },
  { no: "03", businessType: "financial_services", manage: "Yes", using: "yes", inboundCalls: "1000+", fullName: "Fahad", email: "fahad.aziz@finhub.pk", phoneNumber: "+92 312 5550011" },
  { no: "04", businessType: "healthcare_provider", manage: "No", using: "no", inboundCalls: "50–100", fullName: "Ayesha", email: "ayesha.hassan@carenet.net", phoneNumber: "+92 321 7778899" },
  { no: "05", businessType: "manufacturing", manage: "Yes", using: "no,_but_interested", inboundCalls: "100–500", fullName: "Bilal", email: "bilal.ahmed@manufactura.biz", phoneNumber: "+92 301 2223344" },
  { no: "06", businessType: "education_institute", manage: "No", using: "yes", inboundCalls: "500–1000", fullName: "Hira", email: "hira.nawaz@edugate.edu", phoneNumber: "+92 345 6667788" },
  { no: "07", businessType: "software/tech_company", manage: "Yes", using: "no", inboundCalls: "100–500", fullName: "Kamran", email: "kamran.butt@innovate.co", phoneNumber: "+92 308 1112233" },
  { no: "08", businessType: "real_estate", manage: "No", using: "no,_but_interested", inboundCalls: "100–500", fullName: "Sana", email: "sana.shahid@propertylink.org", phoneNumber: "+92 300 4445566" },
  { no: "09", businessType: "logistics_transport", manage: "Yes", using: "yes", inboundCalls: "50–100", fullName: "Umair", email: "umair.malik@logixpress.pk", phoneNumber: "+92 333 0001122" },
  { no: "10", businessType: "hospitality_tourism", manage: "Yes", using: "no", inboundCalls: "1000+", fullName: "Nazia", email: "nazia.arif@tourista.info", phoneNumber: "+92 321 9998877" },
];

// --- Table Columns ---
const columns = [
  { key: "no", header: "No.", width: "min-w-[40px]" },
  { key: "businessType", header: "What type of business...", width: "min-w-[180px]" },
  { key: "manage", header: "Do you manage or have....", width: "min-w-[180px]" },
  { key: "using", header: "Are you currently using....", width: "min-w-[200px]" },
  { key: "inboundCalls", header: "How many inbound calls....", width: "min-w-[180px]" },
  { key: "fullName", header: "Full Name", width: "min-w-[120px]" },
  { key: "email", header: "Email", width: "min-w-[220px]" },
  { key: "phoneNumber", header: "Phone Number", width: "min-w-[180px]" },
];

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;
  const navigate = useNavigate(); // ✅ useNavigate for real routing
  const scrollRef = useRef(null);

  // --- Pagination logic ---
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };
  const getPageNumbers = () => Array.from({ length: totalPages }, (_, i) => i + 1);

  // --- 🧠 Mouse drag to scroll logic ---
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.classList.add("cursor-grabbing");
  };
  const handleMouseLeave = () => {
    isDragging.current = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };
  const handleMouseUp = () => {
    isDragging.current = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.3;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 sm:p-8 font-sans">
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      <div className="max-w-full">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-[#DE8B2D] mb-1">
              Leads for final version leads form
            </h1>
            <p className="text-2xl font-bold text-gray-400">
              From ID: <span className="text-white">641904308958337</span>
            </p>
          </div>

          <div className="flex space-x-3">
            {/* Back Button */}
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 text-sm font-medium rounded-full border border-gray-700 text-white hover:bg-gray-800 transition duration-150 shadow-lg"
            >
              Back to Dashboard
            </button>

            {/* ✅ Working Fetch Button */}
            <button
              onClick={() => navigate("/fetch-leads")}
              className="px-8 py-2 text-sm font-medium rounded-full bg-[#779350] text-white hover:bg-emerald-500 transition duration-150 shadow-lg"
            >
              Fetch New Leads
            </button>
          </div>
        </header>

        {/* --- Scrollable Table --- */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="overflow-x-auto border border-gray-800 rounded-lg hide-scrollbar shadow-xl cursor-grab select-none"
        >
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    className={`${col.width} py-3 px-3 sm:px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap bg-[#121825] border-r border-gray-700/50`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {mockLeads.map((lead, index) => (
                <tr key={index} className="hover:bg-gray-800/50 transition duration-150">
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`${col.width} py-3 px-3 sm:px-4 whitespace-nowrap text-sm font-medium text-white border-r border-gray-800/50`}
                    >
                      {lead[col.key] ? String(lead[col.key]).replace(/_/g, " ") : ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <footer className="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="text-gray-500 mb-4 sm:mb-0">Showing 10 from 160 data</div>
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center h-10 px-4 rounded-lg border border-gray-700 text-gray-400 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 shadow-md"
            >
              &lt; Previous
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`h-10 w-10 rounded-lg text-sm font-medium transition duration-150 shadow-md ${
                  page === currentPage
                    ? "bg-orange-600 text-white hover:bg-orange-700"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center h-10 px-4 rounded-lg border border-gray-700 text-gray-400 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 shadow-md"
            >
              Next &gt;
            </button>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default App;
