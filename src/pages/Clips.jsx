import React, { useState } from 'react';

// ==============================================================================
// 1. Custom SVG Icons
//    - Using a subtle gray/white color for the icons as seen in the image.
// ==============================================================================

const SearchIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

// Video Camera Icon for the Empty State Cards
const VideoCameraIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        {/* Simplified inner elements to match the general look */}
        <line x1="7" y1="15" x2="7" y2="15" />
        <line x1="17" y1="15" x2="17" y2="15" />
    </svg>
);

// Monitor Icon for the Modal
const MonitorIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
);

// Microphone Icon for the Modal
const MicrophoneIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
);

// Chevron Down Icon for the Modal
const ChevronDownIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

// Record Icon (Filled Circle) for the Modal
const RecordIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="8" />
    </svg>
);

// ==============================================================================
// 2. ClipModal Component (New Clip Button Click Functionality)
// ==============================================================================

const ClipModal = ({ isVisible, onClose }) => {
    if (!isVisible) return null;

    const handleRecord = () => {
        // --- SIMULATED FUNCTIONALITY ---
        // In a real application, this is where you'd call a browser API
        // like MediaDevices.getDisplayMedia() for screen sharing,
        // and then handle recording, saving, and updating the dashboard state.
        console.log("Starting screen recording...");
        onClose(); // Close the modal after 'starting' the recording
    };

    return (
        // Modal Overlay: Full screen, transparent, closes on click
        <div
            className="fixed inset-0 z-50 bg-transparent"
            onClick={onClose}
        >
            {/* Modal Content Card: Absolutely positioned under the "+ New Clip" button */}
            <div
                className="absolute top-[80px] right-6 md:right-10
                           bg-[#12161b] border border-[#3b3a3a] rounded-xl shadow-2xl p-6 w-[95%] max-w-sm"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <h2 className="text-2xl font-bold mb-4 text-white">New Clip</h2>

                {/* Entire Screen Button (Olive Green) - Matched exact color from image reference */}
                <button className="w-full bg-[#6a985d] text-white py-3 px-4 rounded-lg flex items-center justify-between mb-3 hover:bg-[#78a86d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6a985d]">
                    <div className="flex items-center">
                        <MonitorIcon className="w-5 h-5 mr-3" />
                        <span className="font-semibold text-lg">Entire Screen</span>
                    </div>
                    <ChevronDownIcon className="w-5 h-5 opacity-80" />
                </button>

                {/* No Microphone Button (Orange) - Matched exact color from image reference */}
                <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg flex items-center justify-between mb-6 hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-600">
                    <div className="flex items-center">
                        <MicrophoneIcon className="w-5 h-5 mr-3" />
                        <span className="font-semibold text-lg">No Microphone</span>
                    </div>
                    <ChevronDownIcon className="w-5 h-5 opacity-80" />
                </button>

                {/* Record Clip Button (Red) and Clip Text */}
                <div className="flex justify-between items-center">
                    <button
                        className="bg-[#bd362e] hover:bg-[#a32a22] text-white font-bold py-3 px-4 rounded-lg flex items-center shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#bd362e]"
                        onClick={handleRecord}
                    >
                        <RecordIcon className="w-4 h-4 mr-2" />
                        <span>Record Clip</span>
                        {/* Keyboard shortcut text */}
                        <span className="text-xs text-red-300 ml-3 hidden sm:inline-block">Ctrl+Alt+S</span>
                    </button>

                    {/* Clip Text - Matched font style and position */}
                    <span className="text-xl font-semibold text-white mr-2">Clip</span>
                </div>
            </div>
        </div>
    );
};

// ==============================================================================
// 3. Reusable Components for Dashboard Layout
// ==============================================================================

// Reusable Sidebar Card Component (Matched border color and subtle style)
const SidebarCard = ({ title, description }) => (
    <div className="space-y-3">
        {/* Title for the sidebar section (Recent, Highlights, Created by Me) */}
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {/* The card itself */}
        <div className="p-4 bg-[#1b1c1e] border border-gray-800 rounded-xl h-44 flex flex-col justify-center items-center text-center">
            <VideoCameraIcon className="w-10 h-10 text-gray-600 mb-3" />
            <p className="text-sm text-gray-400 font-light">
                {description}
            </p>
        </div>
    </div>
);

// Main Content Creation Card Component (The big center box)
const CreationCard = () => (
    // Matched styling: dark background, thin dark border, proper padding
    <div className="bg-[#1b1c1e] border border-gray-800 rounded-xl p-8 md:p-12 flex flex-col items-center text-center max-w-4xl mx-auto mt-8 w-full min-h-[400px] justify-center">
        <VideoCameraIcon className="w-16 h-16 text-gray-600 mb-6" />
        <h3 className="text-xl font-semibold text-white mb-3">
            Create your first Clip!
        </h3>
        <p className="text-sm text-gray-400 max-w-lg mb-8">
            Create and share screen recordings to give your teammates context. Save your recordings, attach them to tasks, or share them anywhere. <a href="#" className="text-amber-500 hover:text-amber-400 transition-colors">Learn more</a>
        </p>
        {/* Matched the exact red-orange button from the image */}
        <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-600">
            Create Clip
        </button>
    </div>
);


// ==============================================================================
// 4. Main App Component
// ==============================================================================

const ClipsDashboard = () => {
    // State to control the visibility of the modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        // Deep black background and correct padding
        <div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans">

            {/* Header (Search Bar and New Clip Button) */}
            <header className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

                {/* Search Input - Matched the thin, dark border and input color */}
                <div className="relative w-full max-w-lg md:max-w-sm">
                    <input
                        type="search"
                        placeholder="Search Clips..."
                        // Exact styling from the image: dark background, thin dark border
                        className="w-full bg-[#1b1c1e] border border-gray-700 text-white py-3 pl-10 pr-4 rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-colors placeholder-gray-500"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>

                {/* New Clip Button - Opens the modal */}
                <button
                    className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-6 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-600"
                    onClick={() => setIsModalOpen(true)}
                >
                    New Clip
                </button>
            </header>

            {/* Main Content Grid */}
            <main className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Left Column (Welcome and Creation Card) */}
                <section className="lg:col-span-3">
                    {/* Matched font size, weight, and the distinct yellow-orange color */}
                    <h1 className="text-4xl font-bold text-amber-500 mb-3">
                        Welcome to Clips
                    </h1>
                    <p className="text-lg text-gray-400 mb-10">
                        Easily capture your screen in a few steps. Record and quickly share your videos with others without any hassle.
                    </p>

                    <CreationCard />
                </section>

                {/* Right Column (Sidebar Cards) */}
                <aside className="lg:col-span-1 space-y-6">

                    <SidebarCard
                        title="Recent"
                        description="Your recently opened Clips will show here."
                    />

                    <SidebarCard
                        title="Highlights"
                        description="Your favorite Clips will show here."
                    />

                    <SidebarCard
                        title="Created by Me"
                        description="All Clips created by you will show here."
                    />

                </aside>

            </main>

            {/* The Modal component (opens when isModalOpen is true) */}
            <ClipModal
                isVisible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default ClipsDashboard;