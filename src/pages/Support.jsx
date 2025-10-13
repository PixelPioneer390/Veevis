import React, { useState, useCallback, useMemo } from 'react';

// --- Mock Data ---
const mockTickets = [
    { id: 1, date: '12-08-2025', subject: 'Password Reset', client: 'Adeel Ali', priority: 'High', activity: '20 minutes ago', status: 'Answered' },
    { id: 2, date: '12-08-2025', subject: 'Password Reset', client: 'Adeel Ali', priority: 'Low', activity: '20 minutes ago', status: 'On Hold' },
    { id: 3, date: '12-08-2025', subject: 'Password Reset', client: 'Adeel Ali', priority: 'Normal', activity: '20 minutes ago', status: 'Closed' },
    { id: 4, date: '12-08-2025', subject: 'Password Reset', client: 'Adeel Ali', priority: 'High', activity: '20 minutes ago', status: 'Open' },
    { id: 5, date: '12-08-2025', subject: 'Password Reset', client: 'Adeel Ali', priority: 'High', activity: '20 minutes ago', status: 'Answered' },
    { id: 6, date: '12-08-2025', subject: 'Password Reset', client: 'Adeel Ali', priority: 'Low', activity: '20 minutes ago', status: 'On Hold' },
    { id: 7, date: '12-08-2025', subject: 'Password Reset', client: 'Adeel Ali', priority: 'Normal', activity: '20 minutes ago', status: 'Closed' },
    { id: 8, date: '12-08-2025', subject: 'Password Reset', client: 'Adeel Ali', priority: 'High', activity: '20 minutes ago', status: 'Open' },
    { id: 9, date: '12-08-2025', subject: 'Password Reset', client: 'Adeel Ali', priority: 'High', activity: '20 minutes ago', status: 'Answered' },
    { id: 10, date: '12-08-2025', subject: 'Password Reset', client: 'Adeel Ali', priority: 'Low', activity: '20 minutes ago', status: 'On Hold' },
    // A few more for pagination visibility
    { id: 11, date: '12-08-2025', subject: 'Database Access Issue', client: 'Jane Doe', priority: 'Normal', activity: '3 hours ago', status: 'Closed' },
    { id: 12, date: '12-08-2025', subject: 'Software Install', client: 'John Smith', priority: 'High', activity: '1 day ago', status: 'Open' },
];

const totalTickets = 180;
const ticketsPerPage = 10;
const totalPages = Math.ceil(totalTickets / ticketsPerPage);

// --- Helper Components ---

// Renders the Priority badge with specific colors
const PriorityBadge = ({ priority }) => {
    let colorClasses = '';
    switch (priority) {
        case 'High':
            colorClasses = 'bg-red-700 text-white';
            break;
        case 'Low':
            colorClasses = 'bg-sky-700 text-white';
            break;
        case 'Normal':
        default:
            colorClasses = 'bg-green-700 text-white';
            break;
    }

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}>
            {priority}
        </span>
    );
};

// Renders the Status badge with specific colors
const StatusBadge = ({ status }) => {
    let colorClasses = '';
    switch (status) {
        case 'Answered':
            colorClasses = 'bg-green-700 text-white';
            break;
        case 'On Hold':
            colorClasses = 'bg-red-700 text-white';
            break;
        case 'Closed':
            colorClasses = 'bg-orange-700 text-white';
            break;
        case 'Open':
        default:
            colorClasses = 'bg-sky-700 text-white';
            break;
    }

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}>
            {status}
        </span>
    );
};

// Renders action icons
const ActionIcons = () => (
    <div className="flex space-x-2">
        {/* Eye icon (View) */}
        <button title="View" className="text-green-500 hover:text-green-400 p-1 rounded-full transition duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
        {/* Edit icon (Edit) */}
        <button title="Edit" className="text-sky-500 hover:text-sky-400 p-1 rounded-full transition duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
        </button>
        {/* More icon (Options) */}
        <button title="More" className="text-red-500 hover:text-red-400 p-1 rounded-full transition duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </button>
    </div>
);

// --- Main App Component ---

const App = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = useCallback((page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    }, []);

    // Helper to generate page numbers
    const pageNumbers = useMemo(() => {
        const pages = [];
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages, startPage + 3);
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    }, [currentPage]);


    return (
        <div className="min-h-screen  p-4 sm:p-8 text-white font-inter">
            <style>
                {`
                /* Setting font-family for better resemblance, though Tailwind defaults to system fonts */
                .font-inter {
                    font-family: 'Inter', sans-serif;
                }
                /* Custom scrollbar for dark theme */
                .table-container::-webkit-scrollbar {
                    height: 8px;
                }
                .table-container::-webkit-scrollbar-thumb {
                    background-color: #3f3f46; /* Gray-700 */
                    border-radius: 4px;
                }
                .table-container::-webkit-scrollbar-track {
                    background-color: #1f2937; /* Gray-800 */
                }
                `}
            </style>

            {/* Header: Search and Create Ticket Button */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
                {/* Search Bar */}
                <div className="w-full sm:w-80 relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full  border border-[#2B2B2B] text-white pl-10 pr-4 py-2 rounded-lg focus:ring-1 focus:ring-orange-600 focus:border-orange-600 transition duration-300 shadow-xl"
                    />
                    {/* Search Icon (SVG) */}
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>

                {/* Create Ticket Button */}
                <button
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-[1.01]"
                    onClick={() => console.log('Create Ticket clicked')}
                >
                    <span className="text-xl">+</span>
                    <span>Create Ticket</span>
                </button>
            </div>

            {/* Table Container (Responsive Scroll) */}
            <div className="table-container  rounded-xl overflow-x-auto shadow-2xl">
                <table className="min-w-full divide-y divide-[#2B2B2B]">
                    {/* Table Head */}
                    <thead>
                        <tr className="text-sm uppercase tracking-wider text-left text-gray-400">
                            {['ID', 'Date', 'Subject', 'Client', 'Priority', 'Activity', 'Status', 'Action'].map(header => (
                                <th key={header} className="px-6 py-3 font-semibold whitespace-nowrap">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody className="divide-y divide-[#2B2B2B]">
                        {mockTickets.slice(0, 10).map((ticket,) => (
                            <tr
                                key={ticket.id}
                                className={`text-sm text-gray-200 transition duration-150 hover:bg-[#202020]`}
                            >
                                <td className="px-6 py-3 font-mono text-xs">{ticket.id}</td>
                                <td className="px-6 py-3 whitespace-nowrap">{ticket.date}</td>
                                <td className="px-6 py-3 whitespace-nowrap">{ticket.subject}</td>
                                <td className="px-6 py-3 whitespace-nowrap font-medium text-white">{ticket.client}</td>
                                <td className="px-6 py-3 whitespace-nowrap">
                                    <PriorityBadge priority={ticket.priority} />
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-gray-400">{ticket.activity}</td>
                                <td className="px-6 py-3 whitespace-nowrap">
                                    <StatusBadge status={ticket.status} />
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap">
                                    <ActionIcons />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer: Summary and Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-400 space-y-4 sm:space-y-0">
                {/* Summary */}
                <div className="order-2 sm:order-1">
                    Showing {ticketsPerPage} from {totalTickets} data
                </div>

                {/* Pagination Controls */}
                <div className="order-1 sm:order-2 flex items-center space-x-2">
                    {/* Previous Button */}
                    <button
                        className="px-3 py-1.5 rounded-lg border border-[#2B2B2B]  hover:bg-[#2B2B2B] disabled:opacity-50 transition duration-200"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &lsaquo; Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex space-x-1">
                        {pageNumbers.map(page => (
                            <button
                                key={page}
                                className={`w-8 h-8 rounded-lg font-semibold transition duration-200 
                                    ${currentPage === page
                                        ? 'bg-orange-600 text-white shadow-md'
                                        : 'bg-[#1A1A1A] hover:bg-[#2B2B2B] border border-[#2B2B2B]'
                                    }`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    {/* Next Button */}
                    <button
                        className="px-3 py-1.5 rounded-lg border border-[#2B2B2B] bg-[#1A1A1A] hover:bg-[#2B2B2B] disabled:opacity-50 transition duration-200"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next &rsaquo;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;
