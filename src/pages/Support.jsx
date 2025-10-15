import React, { useState, useCallback, useMemo } from 'react';
import { Plus, X } from 'lucide-react'; // Assuming you have lucide-react installed

// Load Tailwind CSS script for utility classes (required for external viewing)
const TailwindScript = () => (
    <script src="https://cdn.tailwindcss.com"></script>
);

// --- Mock Data (Unchanged) ---
const mockTickets = [
    { id: 1, date: '12-08-2025', subject: 'Password Reset', client: 'Adeel Ali', priority: 'High', activity: '20 minutes ago', status: 'Answered' },
    { id: 2, date: '12-08-2025', subject: 'Password Reset', client: 'Adeel Ali', priority: 'Low', activity: '20 minutes ago', status: 'On Hold' },
    { id: 3, date: '12-08-2025', subject: 'Network Latency', client: 'Faisal Khan', priority: 'Normal', activity: '45 minutes ago', status: 'Closed' },
    { id: 4, date: '12-08-2025', subject: 'Software License', client: 'Sara Malik', priority: 'High', activity: '1 hour ago', status: 'Open' },
    { id: 5, date: '12-08-2025', subject: 'Email Configuration', client: 'Adeel Ali', priority: 'High', activity: '2 hours ago', status: 'Answered' },
    { id: 6, date: '12-08-2025', subject: 'VPN Connection', client: 'Ahmed Raza', priority: 'Low', activity: '3 hours ago', status: 'On Hold' },
    { id: 7, date: '12-08-2025', subject: 'Monitor Flickering', client: 'Zainab Qureshi', priority: 'Normal', activity: '1 day ago', status: 'Closed' },
    { id: 8, date: '12-08-2025', subject: 'Server Maintenance', client: 'Adeel Ali', priority: 'High', activity: '2 days ago', status: 'Open' },
    { id: 9, date: '12-08-2025', subject: 'Cloud Storage Error', client: 'Hassan Iqbal', priority: 'High', activity: '3 days ago', status: 'Answered' },
    { id: 10, date: '12-08-2025', subject: 'New User Onboarding', client: 'Aisha Jamil', priority: 'Low', activity: '4 days ago', status: 'On Hold' },
    { id: 11, date: '12-08-2025', subject: 'Database Access Issue', client: 'Jane Doe', priority: 'Normal', activity: '5 days ago', status: 'Closed' },
    { id: 12, date: '12-08-2025', subject: 'Software Install', client: 'John Smith', priority: 'High', activity: '6 days ago', status: 'Open' },
];

const totalTickets = 180;
const ticketsPerPage = 10;
const totalPages = Math.ceil(totalTickets / ticketsPerPage);

// --- Helper Components (Unchanged) ---

const PriorityBadge = ({ priority }) => {
    let colorClasses = '';
    switch (priority) {
        case 'High': colorClasses = 'bg-red-700 text-white'; break;
        case 'Low': colorClasses = 'bg-sky-700 text-white'; break;
        case 'Normal': default: colorClasses = 'bg-green-700 text-white'; break;
    }
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}>
            {priority}
        </span>
    );
};

const StatusBadge = ({ status }) => {
    let colorClasses = '';
    switch (status) {
        case 'Answered': colorClasses = 'bg-green-700 text-white'; break;
        case 'On Hold': colorClasses = 'bg-red-700 text-white'; break;
        case 'Closed': colorClasses = 'bg-orange-700 text-white'; break;
        case 'Open': default: colorClasses = 'bg-sky-700 text-white'; break;
    }
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}>
            {status}
        </span>
    );
};

const ActionIcons = () => (
    <div className="flex space-x-2">
        <button title="View" className="text-green-500 hover:text-green-400 p-1 rounded-full transition duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
        </button>
        <button title="Edit" className="text-sky-500 hover:text-sky-400 p-1 rounded-full transition duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg>
        </button>
        <button title="More" className="text-red-500 hover:text-red-400 p-1 rounded-full transition duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
        </button>
    </div>
);

// --- Side Panel Component (Refined) ---

const CreateTicketSidePanel = ({ isOpen, onClose }) => {
    // Colors and styling highly tuned to match the provided image
    const darkBg = 'bg-[#1D222D]';  // Main panel body background - very dark navy
    const headerBg = 'bg-[#272E3D]'; // Header and Footer background - slightly lighter navy
    const inputBg = 'bg-[#272E3D]'; 
    const borderColor = 'border-gray-700';
    
    // Primary Button (Apply Filter - Solid Orange)
    const primaryButtonClass = "flex-1 px-6 py-2 text-sm font-semibold rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition duration-150 shadow-md";
    // Secondary Button (Reset - Bordered/Subtle Dark)
    const secondaryButtonClass = "flex-1 px-6 py-2 text-sm font-semibold rounded-lg border border-gray-600 text-gray-300 hover:text-white hover:border-white transition duration-150";

    const labelClass = "block text-gray-400 text-xs font-medium uppercase mb-1";
    const inputClass =
        `w-full px-3 py-2 rounded-md ${inputBg} text-white border ${borderColor} focus:outline-none focus:ring-1 focus:ring-orange-600 focus:border-orange-600 appearance-none placeholder:text-gray-500`;

    // The image has a blue circle around the Plus icon
    const HeaderIcon = () => (
        <div className="w-6 h-6 rounded-full bg-sky-600 flex items-center justify-center mr-2">
            <Plus className="w-4 h-4 text-white" />
        </div>
    );

    if (!isOpen) return null; // Optimization: Don't render anything when closed

    return (
        // The overlay and panel wrapper. Using 'fixed inset-0' ensures it covers the whole viewport.
        <div 
            className="fixed inset-0 z-40" 
            style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Subtle dark overlay
                transition: 'background-color 0.3s ease-in-out' 
            }}
            onClick={onClose} // Close on clicking overlay
        >
            {/* Side Panel Content Container */}
            <div
                className={`absolute right-0 top-0 h-full w-full sm:w-[400px] xl:w-[450px] ${darkBg} shadow-2xl 
                    transition-transform duration-300 ease-in-out overflow-y-auto
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}`
                }
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the panel
            >
                <div className="flex flex-col h-full">
                    {/* Header: Create Project */}
                    <div className={`flex p-6 ${headerBg} items-center justify-between flex-shrink-0 border-b border-gray-700/50`}>
                        <div className="flex gap-1 text-white items-center">
                            <HeaderIcon />
                            <h1 className="text-base font-semibold">Create Project</h1> {/* Kept 'Project' text as per image */}
                        </div>
                        <X className="w-5 h-5 text-gray-300 cursor-pointer hover:text-white transition" onClick={onClose} />
                    </div>

                    {/* Form Section - Added hide-scrollbar class here */}
                    <div className="p-6 overflow-y-auto flex-grow hide-scrollbar"> 
                        
                        {/* Details Header with Subtle Divider */}
                        <div className='pb-4 border-b border-gray-700/50 mb-6'>
                            <p className='text-sm text-gray-300 font-semibold'>Details</p>
                        </div>
                        
                        <div className='space-y-6'>
                            {/* Projects Dropdown */}
                            <div>
                                <label className={labelClass}>Projects</label>
                                <select className={inputClass}>
                                    <option className='bg-gray-700'>Select Project...</option>
                                    <option className='bg-gray-700'>Project Alpha</option>
                                    <option className='bg-gray-700'>Project Beta</option>
                                </select>
                            </div>

                            {/* Assigned To Dropdown */}
                            <div>
                                <label className={labelClass}>Assigned To</label>
                                <select className={inputClass}>
                                    <option className='bg-gray-700'>Select User...</option>
                                    <option className='bg-gray-700'>John Doe</option>
                                    <option className='bg-gray-700'>Jane Smith</option>
                                </select>
                            </div>

                            {/* Due Added (Date Range) */}
                            <div>
                                <label className={labelClass}>Due Added</label>
                                <div className='flex space-x-4'>
                                    <input type="text" placeholder="Start" className={inputClass} />
                                    <input type="text" placeholder="End" className={inputClass} />
                                </div>
                            </div>

                            {/* Due Date (Date Range) */}
                            <div>
                                <label className={labelClass}>Due Date</label>
                                <div className='flex space-x-4'>
                                    <input type="text" placeholder="Start" className={inputClass} />
                                    <input type="text" placeholder="End" className={inputClass} />
                                </div>
                            </div>

                            {/* Priority Dropdown */}
                            <div>
                                <label className={labelClass}>Priority</label>
                                <select className={inputClass}>
                                    <option className='bg-gray-700'>Select Priority...</option>
                                    <option className='bg-gray-700'>High</option>
                                    <option className='bg-gray-700'>Normal</option>
                                    <option className='bg-gray-700'>Low</option>
                                </select>
                            </div>
                            
                            {/* Status Dropdown */}
                            <div>
                                <label className={labelClass}>Status</label>
                                <select className={inputClass}>
                                    <option className='bg-gray-700'>Select Status...</option>
                                    <option className='bg-gray-700'>Open</option>
                                    <option className='bg-gray-700'>Closed</option>
                                    <option className='bg-gray-700'>Answered</option>
                                    <option className='bg-gray-700'>On Hold</option>
                                </select>
                            </div>

                            {/* Show Input */}
                            <div>
                                <label className={labelClass}>Show</label>
                                <input type="text" placeholder="Enter value" className={inputClass} />
                            </div>
                        </div>

                    </div>

                    {/* Footer Buttons */}
                    <div className={`p-5 flex justify-center space-x-4 flex-shrink-0 ${headerBg} border-t border-gray-700/50`}>
                        <button className={secondaryButtonClass}>
                            Reset
                        </button>
                        <button className={primaryButtonClass}>
                            Apply Filter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main App Component ---

const App = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isPanelOpen, setIsPanelOpen] = useState(false); // State for Panel

    const handlePageChange = useCallback((page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    }, []);

    const togglePanel = useCallback(() => {
        setIsPanelOpen(prev => !prev);
    }, []);

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
        <>
            <TailwindScript />
            <div className="min-h-screen p-4 sm:p-8 text-white font-[Inter] "> {/* Added background for full page */}
                <style>
                    {`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                    
                    /* Custom scrollbar for table (horizontal scroll) */
                    .table-container::-webkit-scrollbar { height: 8px; }
                    .table-container::-webkit-scrollbar-thumb { background-color: #4a4a4a; border-radius: 4px; }
                    .table-container::-webkit-scrollbar-track { background-color: #2b2b2b; }
                    
                    /* HIDE SCROLLBAR for Side Panel (cross-browser) */
                    .hide-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none; 
                    }
                    .hide-scrollbar::-webkit-scrollbar {
                        display: none; /* Chrome, Safari and Opera */
                    }

                    /* Ensures select options are visible in dark mode, needed for Chrome/Firefox */
                    select option {
                        background-color: #1D222D; /* Dark background for options */
                        color: white;
                    }
                    `}
                </style>

                {/* Main Content Area */}
                <div className=''>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
                    {/* Search Bar */}
                    <div className="w-full sm:w-80 relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full border border-[#2B2B2B] text-white pl-10 pr-4 py-2 rounded-lg focus:ring-1 focus:ring-orange-600 focus:border-orange-600 transition duration-300 shadow-xl"
                        />
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    </div>

                    {/* Create Ticket Button - Now opens the panel */}
                    <button
                        className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-[1.01]"
                        onClick={togglePanel} // Use the new function to open the panel
                    >
                        <span className="text-xl">+</span>
                        <span>Create Ticket</span>
                    </button>
                </div>

                {/* Table Container */}
                <div className="table-container  rounded-xl overflow-x-auto shadow-2xl border border-[#2B2B2B]">
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
                            {mockTickets.slice(0, 10).map((ticket) => (
                                <tr
                                    key={ticket.id}
                                    className={`text-sm text-gray-200 transition duration-150 hover:bg-[#202020]`}
                                >
                                    <td className="px-6 py-3 font-mono text-xs text-gray-400">{ticket.id}</td>
                                    <td className="px-6 py-3 whitespace-nowrap">{ticket.date}</td>
                                    <td className="px-6 py-3 whitespace-nowrap font-medium text-white">{ticket.subject}</td>
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
                    <div className="order-2 sm:order-1">
                        Showing {ticketsPerPage} from {totalTickets} data
                    </div>
                    <div className="order-1 sm:order-2 flex items-center space-x-2">
                        <button
                            className="px-3 py-1.5 rounded-lg border border-[#2B2B2B] hover:bg-[#2B2B2B] disabled:opacity-50 transition duration-200"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            &lsaquo; Previous
                        </button>
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
                        <button
                            className="px-3 py-1.5 rounded-lg border border-[#2B2B2B]  hover:bg-[#2B2B2B] disabled:opacity-50 transition duration-200"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next &rsaquo;
                        </button>
                    </div>
                </div>
                </div>

                {/* Render the refined Side Panel */}
                <CreateTicketSidePanel isOpen={isPanelOpen} onClose={togglePanel} />
            </div>
        </>
    );
};

export default App;