import React, { useState, useMemo } from 'react';
import { Search, Menu, Plus, Phone, Mail, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample data to populate the cards
const sampleContacts = Array.from({ length: 160 }, (_, i) => ({
    id: i + 1,
    name: `Contact ${i + 1}`,
    role: i % 4 === 0 ? "Developer" : i % 4 === 1 ? "Designer" : i % 4 === 2 ? "Manager" : "Analyst",
    phone: `+1 (555) ${100 + i}-${1000 + i}`,
    email: `contact${i + 1}@example.com`,
    avatarUrl: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
}));

const itemsPerPage = 12;

// Defines the background color used for the cards and input fields for visual consistency
const CARD_BG = '#000000';
const APP_BG = 'bg-black';

/**
 * Renders the individual contact card.
 * @param {object} contact - The contact data object.
 */
const ContactCard = ({ contact }) => {
    return (
        <div className={`p-5 rounded-xl bg-[#0C111D] border-1 border-gray-400 shadow-xl transition duration-300 hover:shadow-green-500/20`}>
            
            {/* Top Section: Avatar, Name, Role, and Quick Action Icons */}
            <div className="flex items-center space-x-4 mb-3">
               
                {/* Avatar with Status Badge */}
                <div className="relative">
                    <img
                        src={contact.avatarUrl}
                        alt={contact.name}
                        className="w-14 h-14 rounded-full object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/150x150/0C111D/white?text=LD`; }}
                    />
                    {/* Status badge */}
                    <div className={`absolute bottom-0 right-0 w-4 h-4 bg-red-600 rounded-full border-2 border-[#0C111D]`}></div>
                </div>

                <div className="flex-1">
                    <h2 className="text-gray-50 text-lg font-semibold leading-tight">{contact.name}</h2>
                    <p className="text-gray-400 text-sm">{contact.role}</p>
                    
                    {/* Action Icons */}
                    <div className="flex items-center space-x-3 mt-2">
                        <Phone size={16} className="text-white cursor-pointer hover:text-green-500 transition-colors" />
                        <MessageCircle size={16} className="text-white cursor-pointer hover:text-green-500 transition-colors" />
                    </div>
                </div>
            </div>
 
            {/* Bottom Section: Contact Details List */}
            <div className="space-y-3 pt-4 border-t-1 border-gray-800">
                
                {/* Phone Detail */}
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[#7D9952] text-white rounded-full w-8 h-8 flex items-center justify-center">
                        <Phone size={14} strokeWidth={2.5} />
                    </div>
                    <span className="text-gray-200 text-sm font-medium">{contact.phone}</span>
                </div>

                {/* Email Detail */}
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[#7D9952] text-white rounded-full w-8 h-8 flex items-center justify-center">
                        <Mail size={14} strokeWidth={2.5} />
                    </div>
                    <span className="text-gray-200 text-sm font-medium truncate">{contact.email}</span>
                </div>
            </div>
        </div>
    );
};

/**
 * Renders the main header bar with search and action buttons.
 */
const Header = ({ searchTerm, onSearchChange }) => {
    return (
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 px-0 space-y-4 sm:space-y-0">
            {/* Search Bar */}
            <div className="w-full max-w-full sm:max-w-md md:max-w-lg relative">
                <input
                    type="text"
                    placeholder="Search here..........."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full h-10 bg-black text-gray-300 rounded-lg p-3 pl-12 border border-gray-700 focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            </div>

            {/* Actions (New Contact & Menu) */}
            <div className="flex items-center space-x-4">
                {/* + New Contact Button - Matches orange primary color in image */}
                <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm rounded-lg shadow-lg shadow-orange-600/30 transition duration-200 active:scale-[0.98]">
                    <Plus size={18} strokeWidth={3} />
                    <span>New Contact</span>
                </button>

                {/* Menu Icon - Matches look on the right side of the image */}
                <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition duration-200">
                    <Menu size={24} />
                </button>
            </div>
        </header>
    );
};

/**
 * Renders the pagination controls and data summary.
 * @param {number} totalPages - Total number of pages.
 * @param {number} currentPage - The currently active page number.
 * @param {function} onPageChange - Handler for page change.
 * @param {number} totalItems - Total number of items.
 * @param {number} showingItems 
 */
const Pagination = ({ totalPages, currentPage, onPageChange, }) => {
    const visiblePages = useMemo(() => {
        const maxVisible = 4;
        const pages = [];
        let start = Math.max(1, currentPage - 1);
        let end = Math.min(totalPages, start + maxVisible - 1);
        
        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }
        
        for (let i = start; i <= end; i++) pages.push(i);
        return pages;
    }, [currentPage, totalPages]);

    return (
        <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <button
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition duration-200 ${
                    currentPage === 1
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800 active:scale-95'
                }`}
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft size={16} />
                <span>Previous</span>
            </button>

            {/* Page Numbers */}
            {visiblePages.map(page => (
                <button
                    key={page}
                    className={`w-9 h-9 rounded-lg text-sm font-extrabold transition duration-200 active:scale-95 ${
                        page === currentPage
                        ? 'bg-orange-600 text-white shadow-md shadow-orange-600/40'
                        : 'bg-black text-gray-300 hover:bg-gray-800'
                    }`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition duration-200 ${
                    currentPage === totalPages
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800 active:scale-95'
                }`}
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <span>Next</span>
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

// Main App Component
const App = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter contacts based on search term
    const filteredContacts = useMemo(() => {
        if (!searchTerm.trim()) return sampleContacts;
        
        const term = searchTerm.toLowerCase();
        return sampleContacts.filter(contact =>
            contact.name.toLowerCase().includes(term) ||
            contact.role.toLowerCase().includes(term) ||
            contact.email.toLowerCase().includes(term) ||
            contact.phone.includes(term)
        );
    }, [searchTerm]);

    // Calculate pagination
    const totalItems = filteredContacts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Get current page data
    const currentContacts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredContacts.slice(startIndex, endIndex);
    }, [currentPage, filteredContacts]);

    // Reset to page 1 when search changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className={`${APP_BG} min-h-screen text-white p-4 sm:p-6 font-sans`}>
            <div className="max-w-7xl mx-auto">
                
                {/* Top Header */}
                <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

                {/* Contact Grid */}
                <main className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentContacts.length > 0 ? (
                        currentContacts.map(contact => (
                            <ContactCard key={contact.id} contact={contact} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-400 text-lg">No contacts found matching your search.</p>
                        </div>
                    )}
                </main>

                {/* Footer Area with Data Summary and Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-8">
                    {/* Data Summary Text */}
                    <p className="text-gray-400 text-sm mb-4 sm:mb-0">
                        Showing {currentContacts.length} from {totalItems} data
                        {searchTerm && (
                            <span className="text-orange-400 ml-1">
                                (filtered from {sampleContacts.length} total)
                            </span>
                        )}
                    </p>

                    {/* Pagination Controls - Only show if there are pages */}
                    {totalPages > 0 && (
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                            totalItems={totalItems}
                            showingItems={currentContacts.length}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;