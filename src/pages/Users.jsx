import React, { useState } from 'react';
import { Search, Menu, Plus, Phone, Mail, MessageCircle, Video, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample data to populate the cards
const sampleContacts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: "Lincoln Donin",
    role: "Developer",
    phone: "+12 345 6789 0",
    email: "jamespress@veeives.com",
    // Using a dynamic avatar source for variety
    avatarUrl: `https://i.pravatar.cc/150?img=${10 + i}`,
}));

// Defines the background color used for the cards and input fields for visual consistency
const CARD_BG = '#0C111D';
const APP_BG = 'bg-gray-950';

/**
 * Renders the individual contact card.
 * @param {object} contact - The contact data object.
 */
const ContactCard = ({ contact }) => {
    return (
        <div className={`bg-[#0C111D] p-5 rounded-xl border-1 border-white shadow-xl transition duration-300 hover:shadow-green-500/20 border border-gray-800 `}>
            
            {/* Top Section: Avatar, Name, Role, and Quick Action Icons */}
            <div className="flex items-center space-x-4 mb-3">
                
                {/* Avatar with Status Badge */}
                <div className="relative">
                    <img
                        src={contact.avatarUrl}
                        alt={contact.name}
                        className="w-14 h-14 rounded-full object-cover "
                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/150x150/${CARD_BG.substring(1)}/white?text=LD`; }}
                    />
                    {/* CRUCIAL FIX: Red status badge placed on the avatar, matching the image. */}
                    <div className={`absolute bottom-0 right-0 w-4 h-4 bg-red-600 rounded-full border-2 border-[${CARD_BG}]`}></div>
                </div>

                <div className="flex-1">
                    <h2 className="text-gray-50 text-lg font-semibold leading-tight">{contact.name}</h2>
                    <p className="text-gray-400 text-sm">{contact.role}</p>
                    
                    {/* CRUCIAL ADDITION: Action Icons (Phone is green, others gray/hover green) */}
                    <div className="flex items-center space-x-3 mt-2 ">
                        <Phone size={16} className="text-white cursor-pointer" />
                        <MessageCircle size={16} className="text-white cursor-pointer transition" />
                        
                    </div>
                </div>
            </div>

            {/* Bottom Section: Contact Details List */}
            <div className="space-y-3 pt-4  border-t-1 border-gray-800">
                
                {/* Phone Detail */}
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[#7D9952] text-white rounded-full w-8 h-8 flex items-center justify-center">
                        <Phone size={14} strokeWidth={2.5} fill='white' />
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
const Header = () => {
    return (
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 px-0 space-y-4 sm:space-y-0">
            {/* Search Bar */}
            <div className="w-full max-w-full sm:max-w-md md:max-w-lg relative">
                <input
                    type="text"
                    placeholder="Search here..........."
                    // Uses CARD_BG for consistency with the image's dark input field
                    className={`w-full h-10 bg-[${CARD_BG}] text-gray-300 rounded-lg p-3 pl-12 border border-gray-700 focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all duration-200`}
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
                <button className={`p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[${CARD_BG}] transition duration-200`}>
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
 */
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center space-x-2">
            {/* Previous Button - Matches the subtle, non-filled button style in the image */}
            <button
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition duration-200 ${currentPage === 1
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-gray-400 hover:text-white active:scale-95'
                }`}
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft size={16} />
                <span>Previous</span>
            </button>

            {/* Page Numbers */}
            {pages.map(page => (
                <button
                    key={page}
                    className={`w-9 h-9 rounded-lg text-sm font-extrabold transition duration-200 active:scale-95 ${page === currentPage
                        // Active page: Orange background, white text, subtle shadow
                        ? 'bg-orange-600 text-white shadow-md shadow-orange-600/40'
                        // Inactive page: Dark background (like card/input), gray text
                        : `bg-[${CARD_BG}] text-gray-300 hover:bg-gray-800`
                    }`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            {/* Next Button - Matches the subtle, non-filled button style in the image */}
            <button
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition duration-200 ${currentPage === totalPages
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-gray-400 hover:text-white active:scale-95'
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
    const totalPages = 4; // Based on the image showing pages 1-4

    // Simple function to handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        // The main container sets the dark page background and ensures full height
        <div className={`${APP_BG} min-h-screen text-white p-4 sm:p-6 font-sans`}>
            <div className="max-w-7xl mx-auto">
                
                {/* Top Header */}
                <Header />

                {/* Contact Grid - Highly responsive layout */}
                <main className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sampleContacts.map(contact => (
                        <ContactCard key={contact.id} contact={contact} />
                    ))}
                </main>

                {/* Footer Area with Data Summary and Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-8">
                    {/* Data Summary Text - CRUCIAL ADDITION: Matches "Showing X from Y data" text */}
                    <p className="text-gray-400 text-sm mb-4 sm:mb-0">
                        Showing 12 from 160 data
                    </p>

                    {/* Pagination Controls */}
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
