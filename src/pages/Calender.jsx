import React from 'react';

// --- Icons (using inline SVG for single-file mandate) ---

const Icon = ({ children, className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {children}
  </svg>
);

const IconList = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </Icon>
);

const IconBoard = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm14 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm14 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </Icon>
);

const IconCalendar = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </Icon>
);

const IconSearch = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </Icon>
);

const IconArrowLeft = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </Icon>
);

const IconArrowRight = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </Icon>
);

const IconChevronDown = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </Icon>
);

const IconMessageSquare = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.793a9.762 9.762 0 002.255-3.263C7.49 8.03 10.744 5 15 5c4.97 0 9 3.582 9 8z" />
  </Icon>
);

const IconFileText = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </Icon>
);


// --- Data Structure ---

const USERS = [
  { id: 'me', name: 'Me', avatar: 'https://placehold.co/32x32/1e40af/ffffff?text=M' },
  { id: 'john', name: 'John', avatar: 'https://placehold.co/32x32/b91c1c/ffffff?text=J' },
];

const DAYS = [
  { id: 'mon', num: 1, name: 'Mon' },
  { id: 'tue', num: 2, name: 'Tue' },
  { id: 'wed', num: 3, name: 'Wed' },
  { id: 'thur', num: 4, name: 'Thurs' },
];

const getTagColor = (tagName) => {
    switch (tagName) {
        case 'Normal': return 'bg-green-500/20 text-green-400';
        case 'Low': return 'bg-blue-500/20 text-blue-400';
        case 'High': return 'bg-red-500/20 text-red-400';
        case 'UI Design': return 'bg-indigo-500/20 text-indigo-400';
        default: return 'bg-gray-500/20 text-gray-400';
    }
}

const TASKS = [
    // ME
    { id: 101, user: 'me', day: 'mon', title: 'Moodboards', tags: ['UI Design', 'Normal'], comments: 2, files: 2, date: 'Nov 23', avatars: 2, hasPreview: true },
    { id: 102, user: 'me', day: 'mon', title: 'Moodboards', tags: ['UI Design', 'High'], comments: 2, files: 2, date: 'Nov 23', avatars: 2, hasPreview: true },
    { id: 103, user: 'me', day: 'tue', title: 'Implement Apps', tags: ['UI Design', 'Low'], comments: 2, files: 2, avatars: 3, hasPreview: false },
    { id: 104, user: 'me', day: 'wed', title: 'Implement Apps', tags: ['UI Design', 'Low'], comments: 2, files: 2, avatars: 3, hasPreview: false },
    { id: 105, user: 'me', day: 'wed', title: 'Moodboards', tags: ['UI Design', 'Low'], comments: 2, files: 2, date: 'Nov 23', avatars: 2, hasPreview: true },
    { id: 106, user: 'me', day: 'thur', title: 'Moodboards', tags: ['UI Design', 'Normal'], comments: 2, files: 2, date: 'Nov 23', avatars: 2, hasPreview: true },
    // JOHN
    { id: 201, user: 'john', day: 'mon', title: 'Moodboards', tags: ['UI Design', 'Normal'], comments: 2, files: 2, date: 'Nov 23', avatars: 2, hasPreview: true },
    { id: 202, user: 'john', day: 'tue', title: 'Implement Apps', tags: ['UI Design', 'Low'], comments: 2, files: 2, avatars: 3, hasPreview: false },
    { id: 203, user: 'john', day: 'thur', title: 'Moodboards', tags: ['UI Design', 'Normal'], comments: 2, files: 2, date: 'Nov 23', avatars: 2, hasPreview: true },
];


// --- Components ---

const NavItem = ({ icon: Icon, label, isActive }) => (
    <button
        className={`flex items-center space-x-2 py-2 px-3 rounded-xl transition-colors ${
            isActive
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:bg-gray-800'
        }`}
    >
        <Icon className="w-5 h-5" />
        <span className="font-medium text-sm hidden sm:inline-block">{label}</span>
    </button>
);

const TaskCard = ({ task }) => (
    <div className="bg-gray-800 p-3 rounded-xl shadow-lg border border-gray-700/50 hover:border-indigo-500 transition-all space-y-3 w-full">
        <h3 className="text-white text-md font-semibold">{task.title}</h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
            {task.tags.map(tag => (
                <span key={tag} className={`text-xs font-medium py-1 px-2 rounded-lg ${getTagColor(tag)}`}>
                    {tag}
                </span>
            ))}
        </div>

        {/* Preview Image Grid */}
        <div className={`grid ${task.hasPreview ? 'grid-cols-2' : 'grid-cols-1'} gap-1`}>
            {/* Using placeholder images to replicate the design */}
            <div className="bg-gray-700 aspect-video rounded-lg overflow-hidden flex items-center justify-center text-xs text-gray-400">
                {task.hasPreview ? <img src={`https://placehold.co/100x60/374151/9ca3af?text=Screen+1`} alt="Preview 1" className="w-full h-full object-cover"/> : <span className="p-2">No Preview</span>}
            </div>
            {task.hasPreview && (
                <div className="bg-gray-700 aspect-video rounded-lg overflow-hidden flex items-center justify-center text-xs text-gray-400">
                    <img src={`https://placehold.co/100x60/374151/9ca3af?text=Screen+2`} alt="Preview 2" className="w-full h-full object-cover"/>
                </div>
            )}
        </div>

        {/* Footer Metadata */}
        <div className="flex justify-between items-center text-gray-400 text-xs">
            {/* Stats */}
            <div className="flex space-x-4">
                <div className="flex items-center space-x-1">
                    <IconMessageSquare className="w-3.5 h-3.5" />
                    <span>{task.comments} comments</span>
                </div>
                <div className="flex items-center space-x-1">
                    <IconFileText className="w-3.5 h-3.5" />
                    <span>{task.files} files</span>
                </div>
            </div>

            {/* Avatars & Date */}
            <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                    {Array.from({ length: Math.min(task.avatars, 3) }).map((_, i) => (
                        <img
                            key={i}
                            className="w-5 h-5 rounded-full border-2 border-gray-800"
                            src={`https://placehold.co/20x20/ef4444/ffffff?text=+${i+1}`} // Different color for distinction
                            alt={`User ${i + 1}`}
                        />
                    ))}
                    {task.avatars > 3 && <div className="w-5 h-5 rounded-full bg-gray-600 border-2 border-gray-800 flex items-center justify-center text-[10px] text-white">+{task.avatars - 3}</div>}
                </div>
                <span className="hidden sm:inline">{task.date}</span>
            </div>
        </div>
    </div>
);


const Calender = () => {

    const [collapsedUsers, setCollapsedUsers] = React.useState({
        me: false, 
        john: false, 
    });

    const toggleCollapse = (userId) => {
        setCollapsedUsers(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }));
    };

    const groupedTasks = USERS.reduce((acc, user) => {
        acc[user.id] = DAYS.reduce((dayAcc, day) => {
            dayAcc[day.id] = TASKS.filter(t => t.user === user.id && t.day === day.id);
            return dayAcc;
        }, {});
        return acc;
    }, {});


    return (
        <div className="min-h-screen font-sans">

         


            {/* --- Main Calendar Board Grid --- */}
            <div className="w-full overflow-x-auto border-t-1 border-gray-800 py-2">
                <div
                    style={{ minWidth: '768px' }} // Ensures minimum width for desktop-like view
                    className="grid grid-cols-[100px_repeat(4,minmax(200px,1fr))] gap-x-2"
                >
                    {/* Grid Header: User Column Title (empty) and Day Columns */}
                    <div className="col-span-1 border-r border-gray-800 pr-2"></div>
                    {DAYS.map(day => (
                        <div key={day.id} className="text-center text-gray-400 text-sm font-medium py-2 border-r last:border-r-0 border-gray-800">
                            <span className="text-white font-bold text-lg mr-1">{day.num}</span> {day.name}
                        </div>
                    ))}

                    {/* --- Content Rows (One row per User) --- */}
                    {USERS.map(user => {
                        const isCollapsed = collapsedUsers[user.id];

                        return (
                            <React.Fragment key={user.id}>
                                {/* User Lane Header Row (Always rendered) */}
                                <div className="contents">
                                    {/* Column 1: Toggable User Info */}
                                    <button 
                                        onClick={() => toggleCollapse(user.id)}
                                        // Made the whole cell a button to be clickable
                                        className="col-span-1 flex items-center justify-start space-x-3 py-4 border-r border-gray-800 pr-2 group hover:bg-gray-800/50 transition-colors cursor-pointer focus:outline-none"
                                    >
                                        {/* Toggle Icon: Right arrow when collapsed, Down arrow when expanded */}
                                        {isCollapsed ? (
                                            // Collapsed state: Shows right arrow (>)
                                            <IconArrowRight className="w-4 h-4 text-gray-400" />
                                        ) : (
                                            // Expanded state: Shows down chevron (v)
                                            <IconChevronDown className="w-4 h-4 text-gray-400" />
                                        )}
                                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border-2 border-gray-600/50" />
                                        <span className="text-white font-semibold">{user.name}</span>
                                    </button>
                                    
                                    {/* Columns 2-5: Day Status/Time */}
                                    {DAYS.map(day => {
                                        const taskCount = groupedTasks[user.id][day.id].length;
                                        return (
                                            <div 
                                                key={`${user.id}-${day.id}-header`} 
                                                className="flex justify-between items-center text-sm font-medium py-4 border-r last:border-r-0 border-gray-800 pr-2 pl-2"
                                            >
                                                {/* If Collapsed, show Activity Count */}
                                                {isCollapsed && (
                                                    <span className="text-white font-semibold">
                                                        {taskCount > 0 ? `${taskCount} activities` : ''}
                                                    </span>
                                                )}
                                                
                                                {/* Time (Always present, right-aligned) */}
                                                <span className="text-gray-500 ml-auto">
                                                    0:15h
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* User Task Row (Conditionally rendered: ONLY when NOT collapsed) */}
                                {!isCollapsed && (
                                    <div className="contents">
                                        <div className="col-span-1 border-r border-gray-800 pr-2"></div> {/* Empty space aligned with user column */}
                                        {DAYS.map(day => (
                                            <div
                                                key={`${user.id}-${day.id}-tasks`}
                                                className="py-4 px-2 space-y-4 border-r last:border-r-0 border-gray-800 min-h-[100px]"
                                            >
                                                {groupedTasks[user.id][day.id].map(task => (
                                                    <TaskCard key={task.id} task={task} />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}

                </div>
            </div>
        </div>
    );
};

export default Calender;
