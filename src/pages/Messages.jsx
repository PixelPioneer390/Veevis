import React, { useState, useEffect } from 'react';
import {
  Search,
  MoreVertical,
  Phone,
  Video,
  User,
  Paperclip,
  Link,
  Send,
  FileText,
  ChevronUp,
  MoreHorizontal,
  MessageSquare,
  Users,
  Code,
  Zap,
  BookUser, 
} from 'lucide-react';

// --- CONSOLIDATED MOCK DATA ---

const CURRENT_USER_NAME = 'John Adam';
const CURRENT_USER_AVATAR = 'https://placehold.co/40x40/4CAF50/ffffff?text=JA'; 

const conversations = [
  // Groups
  { id: 1, type: 'group', name: 'Kleon Team', icon: Users, color: 'text-green-500', indicator: true,
    avatarUrl: 'https://placehold.co/32x32/22C55E/ffffff?text=KT',
    messages: [
      { id: 101, text: "We need to finalize the Q3 report.", time: "8:30 am", user: 'Peter John', isSelf: false },
      { id: 102, text: "I'll upload the latest figures by 10 AM.", time: "8:35 am", user: CURRENT_USER_NAME, isSelf: true },
    ]
  },
  { id: 2, type: 'group', name: 'UI/UX Community', icon: MessageSquare, color: 'text-orange-500',
    avatarUrl: 'https://placehold.co/32x32/F97316/ffffff?text=UI',
    messages: [
      { id: 201, text: "Anyone working on the dark mode spec?", time: "Yesterday", user: 'Benny Kenn', isSelf: false },
    ]
  },
  { id: 3, type: 'group', name: 'Weekly Meet', icon: Zap, color: 'text-blue-500', active: true, // Default active chat
    avatarUrl: 'https://placehold.co/32x32/3B82F6/ffffff?text=WM',
    messages: [
      { id: 301, text: "Meeting recap: The design sprint was a success!", time: "4:00 pm", user: 'Samsudin', isSelf: false },
    ]
  },
  { id: 4, type: 'group', name: 'We Are Designers', icon: User, color: 'text-pink-500',
    avatarUrl: 'https://placehold.co/32x32/EC4899/ffffff?text=DE',
    messages: [
      { id: 401, text: "Looking for feedback on the new logo options.", time: "1 day ago", user: 'Bella Poarch', isSelf: false },
    ]
  },
  { id: 5, type: 'group', name: 'We Are Developers', icon: Code, color: 'text-purple-500',
    avatarUrl: 'https://placehold.co/32x32/9333EA/ffffff?text=DEV',
    messages: [
      { id: 501, text: "The new API endpoint is ready for testing.", time: "2 days ago", user: 'Peter John', isSelf: false },
    ]
  },
  // Recent Chats (Individual Users)
  { id: 6, type: 'user', name: 'Peter John', isNew: true, avatarUrl: 'https://placehold.co/32x32/1E88E5/ffffff?text=PJ',
    messages: [
      { id: 601, text: 'Hello! How are you?', time: '6:00 am', user: 'Peter John', isSelf: false },
      { id: 602, text: 'Can you send me the invoice in pdf?', time: '6:00 am', user: 'Peter John', isSelf: false },
      { id: 603, text: 'Fine! yes sure', time: '6:01 am', user: CURRENT_USER_NAME, isSelf: true },
    ]
  },
  { id: 7, type: 'user', name: 'Benny Kenn', isNew: true, avatarUrl: 'https://placehold.co/32x32/FF9800/ffffff?text=BK',
    messages: [
      { id: 701, text: 'Remember to clear the cache tonight!', time: '11:00 pm', user: 'Benny Kenn', isSelf: false },
      // FIX: Corrected missing closing quote on '11:05 pm'
      { id: 702, text: 'Done, server is clean.', time: '11:05 pm', user: CURRENT_USER_NAME, isSelf: true }, 
    ]
  },
  { id: 8, type: 'user', name: 'Samsudin', isNew: false, avatarUrl: 'https://placehold.co/32x32/F44336/ffffff?text=S',
    messages: [
      { id: 801, text: 'I need that bug fixed ASAP.', time: '7:30 am', user: CURRENT_USER_NAME, isSelf: true },
      { id: 802, text: 'Ok sir. I will fix it as soon as possible', time: '7:35 am', user: 'Samsudin', isSelf: false },
    ]
  },
  { id: 9, type: 'user', name: 'Bella Poarch', isNew: false, avatarUrl: 'https://placehold.co/32x32/9C27B0/ffffff?text=BP',
    messages: [
      { id: 901, text: "Where are the design assets?", time: "1:00 pm", user: CURRENT_USER_NAME, isSelf: true },
      { id: 902, text: "I don't know where that files saved dude.", time: "1:02 pm", user: 'Bella Poarch', isSelf: false },
    ]
  },
];

const contactsList = [
    { id: 6, name: 'Peter John', role: 'Developer', avatarUrl: 'https://placehold.co/32x32/1E88E5/ffffff?text=PJ' },
    { id: 7, name: 'Benny Kenn', role: 'UI/UX Designer', avatarUrl: 'https://placehold.co/32x32/FF9800/ffffff?text=BK' },
    { id: 8, name: 'Samsudin', role: 'Project Analyst', avatarUrl: 'https://placehold.co/32x32/F44336/ffffff?text=S' },
    { id: 9, name: 'Bella Poarch', role: 'Illustrator', avatarUrl: 'https://placehold.co/32x32/9C27B0/ffffff?text=BP' },
    { id: 10, name: 'Alex Johnson', role: 'Product Owner', avatarUrl: 'https://placehold.co/32x32/94A3B8/ffffff?text=AJ',
      messages: [{ id: 1001, text: "Hi, I'm a new contact!", time: "Now", user: 'Alex Johnson', isSelf: false }]
    },
    { id: 11, name: 'Sarah Lee', role: 'Data Scientist', avatarUrl: 'https://placehold.co/32x32/0D9488/ffffff?text=SL',
      messages: [{ id: 1101, text: "Testing new chat connection.", time: "Now", user: 'Sarah Lee', isSelf: false }]
    },
];

// Ensure all contacts are in conversations array if not already present
contactsList.forEach(contact => {
    if (!conversations.find(c => c.id === contact.id)) {
        conversations.push({ ...contact, type: 'user' });
    }
});

// Prepare global lists (used for filtering in LeftPanel)
const groupConversations = conversations.filter(c => c.type === 'group').map(g => ({
  ...g,
  active: g.id === 3, 
  icon: g.icon || Users,
}));

const recentConversations = conversations.filter(c => c.type === 'user').map(r => ({
  ...r,
  message: r.messages[r.messages.length - 1].text, 
}));


// --- GENERAL COMPONENTS ---

const IconWrapper = ({ children, className = '', onClick = () => {} }) => (
  <button onClick={onClick} className={`p-2 rounded-full transition-colors hover:bg-zinc-800 ${className}`}>
    {children}
  </button>
);

// Updated SectionHeader component to handle collapse/expand
const SectionHeader = ({ title, count, children, showCount = true }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {/* Header element to toggle collapse */}
      <div className="flex justify-between items-center py-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-white font-semibold text-sm uppercase tracking-wider">{title}</h3>
        <div className="flex items-center">
          {showCount && <span className="mr-2 text-sm text-zinc-400">{count}</span>}
          {/* Chevron icon rotates based on isOpen state */}
          <ChevronUp className={`w-4 h-4 transition-transform text-green-500 ${isOpen ? 'rotate-0' : 'rotate-180'}`} />
        </div>
      </div>
      
      {/* Collapsible Content Wrapper. max-h-[500px] ensures content is hidden when closed */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {/* Content passed as children is rendered here */}
          {children}
      </div>
    </>
  );
};


// --- LEFT PANEL COMPONENTS ---

const GroupList = ({ activeChatId, setActiveChatId, groups }) => (
  <div className="mt-4">
    <h3 className="text-zinc-400 text-xs uppercase font-medium mb-3 ml-4">Group ({groups.length})</h3>
    {groups.map((group) => {
      const isActive = group.id === activeChatId;
      return (
        <div
          key={group.id}
          className={`flex items-center p-3 rounded-xl transition-colors cursor-pointer relative ${
            isActive ? 'bg-white font-semibold shadow-lg' : 'text-zinc-400 hover:bg-zinc-900'
          }`}
          onClick={() => setActiveChatId(group.id)}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-zinc-700 ${group.color}`}>
            <group.icon className="w-4 h-4" />
          </div>
          <span className={`${isActive ? 'text-black' : 'text-white'} text-sm`}>
            {group.name}
          </span>
          {group.indicator && (
            <span className="w-2 h-2 bg-red-500 rounded-full absolute right-4 top-1/2 transform -translate-y-1/2"></span>
          )}
        </div>
      );
    })}
  </div>
);

const RecentChats = ({ activeChatId, setActiveChatId, chats }) => (
  <div className="mt-6">
    <h3 className="text-zinc-400 text-xs uppercase font-medium mb-3 ml-4">Recent Message ({chats.length})</h3>
    {chats.map((chat) => {
      const isActive = chat.id === activeChatId;
      return (
        <div 
          key={chat.id} 
          className={`flex items-start p-3 rounded-xl transition-colors cursor-pointer ${
            isActive ? 'bg-zinc-800' : 'hover:bg-zinc-900'
          }`}
          onClick={() => setActiveChatId(chat.id)}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-zinc-700 flex-shrink-0">
            <img src={chat.avatarUrl} alt={chat.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex justify-between items-center">
              <p className="text-white font-semibold text-sm truncate">{chat.name}</p>
              {chat.isNew && <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-medium ml-2 flex-shrink-0">NEW</span>}
            </div>
            <p className="text-zinc-400 text-sm truncate">{chat.message}</p>
          </div>
        </div>
      );
    })}
  </div>
);


const LeftPanel = ({ activeChatId, setActiveChatId, handleAction }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering logic: Search by group name, user name, or last message text
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  const filteredGroups = groupConversations.filter(group => 
      group.name.toLowerCase().includes(lowerCaseSearchTerm)
  );

  const filteredRecents = recentConversations.filter(chat => 
      chat.name.toLowerCase().includes(lowerCaseSearchTerm) || 
      chat.message.toLowerCase().includes(lowerCaseSearchTerm)
  );
    
  return (
    <div className="p-4 border-r border-zinc-900 h-full overflow-y-auto scrollbar-hidden hidden lg:block lg:w-[280px] bg-black">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-extrabold text-white">Messages</h2>
        <div className="flex space-x-1 text-zinc-400">
          {/* Action icon with handler */}
          <IconWrapper onClick={() => handleAction('More Panel Options', 'Messages Panel', 'options')}><MoreVertical className="w-5 h-5" /></IconWrapper>
        </div>
      </div>
      
      {/* Search Bar is fully functional for Left Panel */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder={`Search chats...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-zinc-900 border-none text-zinc-300 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        />
        <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>
      
      {/* Passing filtered data */}
      <GroupList activeChatId={activeChatId} setActiveChatId={setActiveChatId} groups={filteredGroups} />
      <RecentChats activeChatId={activeChatId} setActiveChatId={setActiveChatId} chats={filteredRecents} />
    </div>
  );
};

// --- CHAT WINDOW COMPONENTS ---

// Updated ChatHeader to accept toggleSearch function and handleAction
const ChatHeader = ({ activeChat, toggleSearch, handleAction }) => {
  const partnerAvatar = activeChat.type === 'user' ? activeChat.avatarUrl : (activeChat.avatarUrl || 'https://placehold.co/40x40/71717A/ffffff?text=C');
  const partnerName = activeChat.name;
  const chatName = activeChat.name;

  return (
    <div className="flex items-center justify-between p-4 bg-black border-b border-zinc-900">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-zinc-700 flex-shrink-0">
          <img src={partnerAvatar} alt={partnerName} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="text-white font-semibold">{partnerName}</h3>
          <p className="text-green-500 text-xs flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            Online
          </p>
        </div>
      </div>
      <div className="flex space-x-2 text-zinc-400">
        {/* These icons now use the enhanced handleAction that shows a notification */}
        <IconWrapper onClick={() => handleAction('Phone Call', chatName, 'call')}><Phone className="w-5 h-5" /></IconWrapper>
        <IconWrapper onClick={() => handleAction('Video Call', chatName, 'call')}><Video className="w-5 h-5" /></IconWrapper>
        {/* Search icon now toggles the in-chat search bar */}
        <IconWrapper onClick={toggleSearch}><Search className="w-5 h-5" /></IconWrapper>
        {/* MoreVertical now explicitly handles the action */}
        <IconWrapper onClick={() => handleAction('More Options (3 Dots)', chatName, 'options')}><MoreVertical className="w-5 h-5" /></IconWrapper>
      </div>
    </div>
  );
};

const ChatWindow = ({ activeChat, handleAction }) => {
    // Existing message and input states
    const [chatMessages, setChatMessages] = useState(activeChat.messages);
    const [inputText, setInputText] = useState('');
    const chatEndRef = React.useRef(null);
    const fileInputRef = React.useRef(null); // Ref for the hidden file input

    // New states for in-chat search
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [inChatSearchTerm, setInChatSearchTerm] = useState('');

    useEffect(() => {
      // When activeChat changes, reset messages and search state
      setChatMessages(activeChat.messages);
      setIsSearchVisible(false);
      setInChatSearchTerm('');
    }, [activeChat]);

    useEffect(() => {
        // Scroll to the end whenever the messages change
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages, isSearchVisible]); 

    // Function to handle sending text message
    const handleSend = () => {
        if (inputText.trim() === '') return;

        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toLowerCase().replace(' ', '');

        const newMessage = {
            id: Date.now(),
            text: inputText.trim(),
            time: timeString,
            isSelf: true, 
            user: CURRENT_USER_NAME,
        };
        
        setChatMessages([...chatMessages, newMessage]);
        setInputText('');
    };

    // New function to handle file selection and add a file message
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            // For demonstration, send a message indicating a file was selected.
            const fileMessage = `[Attachment] Selected file: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
            
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toLowerCase().replace(' ', '');

            const newMessage = {
                id: Date.now(),
                text: fileMessage,
                time: timeString,
                isSelf: true, 
                user: CURRENT_USER_NAME,
            };
            
            setChatMessages(prevMessages => [...prevMessages, newMessage]);
            
            // Clear the input value so the same file can be selected again
            event.target.value = null; 
            
            // Use the global action handler to show a notification toast
            handleAction('File Selected', file.name, 'file');
        }
    };
    
    // Function to toggle the in-chat search bar
    const toggleSearch = () => {
        setIsSearchVisible(prev => {
            // If hiding the search bar, clear the term
            if (prev) {
                setInChatSearchTerm('');
            }
            return !prev;
        });
    };

    // Filter messages based on search term
    const lowerCaseSearchTerm = inChatSearchTerm.toLowerCase();
    const displayedMessages = chatMessages.filter(msg => 
      !inChatSearchTerm || msg.text.toLowerCase().includes(lowerCaseSearchTerm)
    );

    return (
      <div className="flex flex-col h-full bg-black">
        {/* Pass the toggleSearch and handleAction functions to ChatHeader */}
        <ChatHeader activeChat={activeChat} toggleSearch={toggleSearch} handleAction={handleAction} /> 

        {/* New: In-Chat Search Bar (Conditional Rendering) */}
        {isSearchVisible && (
            <div className="p-4 border-b border-zinc-900 bg-zinc-900">
                <div className="relative">
                    <input
                        type="text"
                        placeholder={`Search in ${activeChat.name} messages...`}
                        value={inChatSearchTerm}
                        onChange={(e) => setInChatSearchTerm(e.target.value)}
                        className="w-full bg-zinc-800 border-none text-zinc-300 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                    />
                    <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
            </div>
        )}

        {/* Message Thread - Hiding scrollbar. Use displayedMessages for rendering */}
        <div className="flex-grow p-6 overflow-y-auto space-y-3 scrollbar-hidden">

          {/* Dynamic rendering of filtered messages */}
          {displayedMessages.map((msg, index) => {
            const partnerAvatar = activeChat.type === 'user' ? activeChat.avatarUrl : (activeChat.avatarUrl || 'https://placehold.co/40x40/71717A/ffffff?text=C');
            const avatarUrl = msg.isSelf ? CURRENT_USER_AVATAR : partnerAvatar;

            // Check if the previous message was sent by the same user in the *displayed* messages
            const isGrouped = index > 0 && displayedMessages[index - 1].user === msg.user;
            
            // Determine if message text matches the search term for highlighting (optional but helpful)
            const parts = inChatSearchTerm
                ? msg.text.split(new RegExp(`(${inChatSearchTerm})`, 'gi'))
                : [msg.text];

            if (msg.isSelf) {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className="flex flex-col max-w-xs md:max-w-md items-end">
                    <span className="text-xs text-zinc-500 mb-1 mr-2">{msg.time}</span>
                    <div className="p-3 bg-green-600 text-white rounded-xl shadow-lg rounded-br-none">
                      <p className="text-sm">
                        {parts.map((part, i) =>
                            new RegExp(inChatSearchTerm, 'i').test(part) && inChatSearchTerm
                                ? <mark key={i} className="bg-yellow-300 text-black rounded px-0.5">{part}</mark>
                                : part
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full overflow-hidden ml-3 mt-auto flex-shrink-0">
                    <img src={avatarUrl} alt={msg.user} className="w-full h-full object-cover" />
                  </div>
                </div>
              );
            } else {
              return (
                <div key={msg.id} className={`flex ${isGrouped ? 'mt-0' : 'mt-4'} justify-start`}>
                  {/* Hide avatar for grouped messages */}
                  <div className={`w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0 ${isGrouped ? 'opacity-0' : ''}`}>
                    <img src={avatarUrl} alt={msg.user} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col max-w-xs md:max-w-md items-start">
                    {/* Only show name and time if it's the start of a new group */}
                    {!isGrouped && (
                      <div className="flex items-baseline space-x-2 mb-1">
                          <p className="text-white text-sm font-semibold">{msg.user}</p>
                          <span className="text-xs text-zinc-500">{msg.time}</span>
                      </div>
                    )}

                    <div className={`p-3 bg-zinc-800 text-white rounded-xl shadow-lg ${isGrouped ? '' : 'rounded-tl-none'} ${isGrouped ? 'mt-1' : ''}`}>
                      <p className="text-sm">
                        {parts.map((part, i) =>
                            new RegExp(inChatSearchTerm, 'i').test(part) && inChatSearchTerm
                                ? <mark key={i} className="bg-yellow-300 text-black rounded px-0.5">{part}</mark>
                                : part
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          })}

          {displayedMessages.length === 0 && inChatSearchTerm && (
                <div className="text-center text-zinc-500 mt-10">No messages found matching "{inChatSearchTerm}".</div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-zinc-900">
          <div className="flex items-center bg-zinc-900 rounded-xl p-2">
            
            {/* Hidden file input element */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden" // Keep it hidden
              // Optional: You can specify allowed file types here (e.g., accept=".pdf,image/*")
            />

            {/* Paperclip icon now triggers the hidden file input */}
            <IconWrapper 
                className="p-1 text-zinc-400" 
                onClick={() => fileInputRef.current.click()} // Trigger click on hidden input
            >
                <Paperclip className="w-5 h-5" />
            </IconWrapper>

            {/* Link icon uses handleAction for a notification */}
            <IconWrapper className="p-1 text-zinc-400" onClick={() => handleAction('Send Link', activeChat.name, 'link')}><Link className="w-5 h-5" /></IconWrapper>
            
            <input
              type="text"
              placeholder={`Message ${activeChat.name}...`}
              className="flex-grow bg-transparent text-white placeholder-zinc-500 p-2 focus:outline-none text-sm"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
            />
            <button
              className="p-3 rounded-xl bg-orange-600 hover:bg-orange-700 transition-colors text-white ml-2"
              onClick={handleSend}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

// --- RIGHT PANEL COMPONENTS ---

const UserProfileCard = () => (
  <div className="flex flex-col items-center py-6 border-b border-zinc-900 bg-black">
    <div className="w-16 h-16 rounded-full overflow-hidden bg-zinc-700 mb-3">
      {/* John Adam Avatar (Current User Profile) */}
      <img src={CURRENT_USER_AVATAR} alt={CURRENT_USER_NAME} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-white font-semibold text-lg">{CURRENT_USER_NAME}</h3>
    <p className="text-zinc-400 text-sm">Project Manager</p>
    <p className="text-zinc-400 text-sm">New York, USA</p>
  </div>
);

const FileAttachment = ({ file }) => (
  <div className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-b-0">
    <div className="flex items-center space-x-3">
      <FileText className="w-5 h-5 text-white" />
      <div className="flex flex-col">
        <p className="text-white text-sm">{file.name}</p>
        <p className="text-zinc-500 text-xs">{file.size}</p>
      </div>
    </div>
    <IconWrapper className="text-zinc-400 hover:bg-transparent p-0" onClick={() => { /* Placeholder action, handled by global action if needed */ }}><MoreHorizontal className="w-4 h-4" /></IconWrapper>
  </div>
);

const LinkAttachment = ({ link }) => (
  <div className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-b-0">
    <div className="flex items-center space-x-3">
      <Link className="w-5 h-5 text-white" />
      <div className="flex flex-col">
        <p className="text-white text-sm">{link.title}</p>
        <p className="text-zinc-500 text-xs">{link.url}</p>
      </div>
    </div>
    <IconWrapper className="text-zinc-400 hover:bg-transparent p-0" onClick={() => { /* Placeholder action, handled by global action if needed */ }}><MoreHorizontal className="w-4 h-4" /></IconWrapper>
  </div>
);

const attachments = {
  files: [
    { name: 'Contracts.pdf', size: '2.5 MB' },
    { name: 'Invoice.pdf', size: '150 KB' },
    { name: 'Proposal.pdf', size: '1.2 MB' },
  ],
  links: [
    { url: 'www.konmatrix.com', title: 'Konmatrix' },
    { url: 'www.conecom.com', title: 'Conecom' },
    { url: 'www.statholdings.com', title: 'Stat Holdings' },
  ]
};

// Tab Selector for the Right Panel 
const RightTabSelector = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'attachments', name: 'Attachments', icon: Paperclip },
        { id: 'profile', name: 'Profile', icon: User },
    ];

    return (
        <div className="flex bg-zinc-900 rounded-xl p-1 mb-4 mx-4">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                            ? 'bg-zinc-700 text-white' 
                            : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.name}
                </button>
            ))}
        </div>
    );
};

// Profile Details View
const ProfileDetails = () => (
    <div className="p-4 space-y-4">
        <div className="bg-zinc-900 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-2">Contact Information</h4>
            <p className="text-zinc-400 text-sm mb-1">Email: <span className="text-white font-medium">john.adam@corp.com</span></p>
            <p className="text-zinc-400 text-sm">Phone: <span className="text-white font-medium">+1 (555) 123-4567</span></p>
        </div>
        <div className="bg-zinc-900 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-2">Team & Role</h4>
            <p className="text-zinc-400 text-sm mb-1">Team: <span className="text-white font-medium">Kleon Product</span></p>
            <p className="text-zinc-400 text-sm">Role: <span className="text-white font-medium">Senior Project Manager</span></p>
        </div>
        <div className="bg-zinc-900 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-2">Bio</h4>
            <p className="text-white text-sm leading-relaxed">
                Dedicated manager focused on delivering high-quality user experiences and maintaining agile development cycles.
            </p>
        </div>
    </div>
);


const RightPanel = () => {
  const [activeTab, setActiveTab] = useState('attachments'); 
    
  return (
    // Scrollbar-hidden applied
    <div className="border-l border-zinc-900 h-full overflow-y-auto scrollbar-hidden hidden lg:block lg:w-[280px] bg-black">
      <UserProfileCard />
      
      {/* Tab Selector for Right Panel */}
      <RightTabSelector activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Conditional Content based on Tab */}
      {activeTab === 'attachments' && (
          <div className="p-4 pt-0 space-y-4">
              <div className="bg-zinc-900 rounded-xl p-3">
                  {/* Using SectionHeader with children for collapsible content */}
                  <SectionHeader title="Recent Files" count="71 files">
                      <div className="space-y-2 pt-2">
                          {attachments.files.map((file, index) => <FileAttachment key={index} file={file} />)}
                      </div>
                  </SectionHeader>
              </div>

              <div className="bg-zinc-900 rounded-xl p-3">
                  {/* Using SectionHeader with children for collapsible content */}
                  <SectionHeader title="Images" count="20 images">
                      <div className="grid grid-cols-3 gap-2 mt-2">
                          <img src="https://placehold.co/80x80/18181B/ffffff?text=IMG" className="rounded-lg object-cover" alt="Image 1" />
                          <img src="https://placehold.co/80x80/18181B/ffffff?text=IMG" className="rounded-lg object-cover" alt="Image 2" />
                          <img src="https://placehold.co/80x80/18181B/ffffff?text=IMG" className="rounded-lg object-cover" alt="Image 3" />
                      </div>
                  </SectionHeader>
              </div>

              <div className="bg-zinc-900 rounded-xl p-3">
                  {/* Using SectionHeader with children for collapsible content */}
                  <SectionHeader title="Links" count="20 links">
                      <div className="space-y-2 pt-2">
                          {attachments.links.map((link, index) => <LinkAttachment key={index} link={link} />)}
                      </div>
                  </SectionHeader>
              </div>
          </div>
      )}

      {activeTab === 'profile' && <ProfileDetails />}
    </div>
  );
};

// --- GLOBAL NOTIFICATION COMPONENT ---

const Notification = ({ message, type, isVisible, onClose }) => {
  if (!isVisible) return null;

  // New type 'file' is added and styled differently
  const color = type === 'call' ? 'bg-blue-600' : type === 'options' ? 'bg-purple-600' : type === 'file' ? 'bg-orange-600' : type === 'link' ? 'bg-indigo-600' : 'bg-green-600';
  const icon = type === 'call' ? <Phone className="w-5 h-5 mr-2" /> : type === 'options' ? <MoreVertical className="w-5 h-5 mr-2" /> : type === 'file' ? <Paperclip className="w-5 h-5 mr-2" /> : type === 'link' ? <Link className="w-5 h-5 mr-2" /> : <Zap className="w-5 h-5 mr-2" />;

  return (
    <div 
        className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl flex items-center text-white max-w-sm transition-opacity duration-300 ${color}`} 
        style={{ opacity: isVisible ? 1 : 0 }}
        role="alert"
    >
      {icon}
      <span className="flex-grow text-sm">{message}</span>
      <button onClick={onClose} className="ml-4 text-zinc-300 hover:text-white">
        &times;
      </button>
    </div>
  );
};


// --- MAIN APPLICATION ---

const App = () => {
  const DEFAULT_CHAT_ID = 3; 

  const [activeChatId, setActiveChatId] = useState(DEFAULT_CHAT_ID);
  const [notification, setNotification] = useState({ message: '', type: 'info', visible: false });

  // Centralized function to show notification
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type, visible: true });
    // Auto-hide after 3 seconds
    setTimeout(() => {
        setNotification(prev => ({ ...prev, visible: false }));
    }, 3000);
  };
  
  // Centralized action handler
  const handleAction = (action, name, typeOverride) => {
    let message;
    let type = typeOverride || 'info';
    
    if (typeOverride === 'call') {
      message = `Initiating ${action} with ${name}...`;
    } else if (typeOverride === 'options') {
      message = `Opening chat settings for ${name}.`;
    } else if (typeOverride === 'file') {
        message = `File "${name}" attached successfully!`;
    } else if (typeOverride === 'link') {
        message = `Link option selected. Paste a URL to share.`;
    } else {
      message = `Action "${action}" triggered for ${name}.`;
    }

    showNotification(message, type);
    console.log(`[ACTION] ${action} button clicked for chat: ${name}!`);
  };

  // Find active chat object
  const activeChat = conversations.find(c => c.id === activeChatId) || conversations[0];


  useEffect(() => {
    document.body.style.backgroundColor = '#0D0D0F';
    document.body.style.fontFamily = 'Inter, sans-serif';
  }, []);

  return (
    <>
      {/* Cross-browser CSS to hide the scrollbar while allowing scrolling */}
      <style>{`
        /* Webkit (Chrome, Safari, newer versions of Edge) */
        .scrollbar-hidden::-webkit-scrollbar {
          display: none; 
        }

        /* IE and older Edge */
        .scrollbar-hidden {
          -ms-overflow-style: none;
        }

        /* Firefox */
        .scrollbar-hidden {
          scrollbar-width: none;
        }
      `}</style>

      <div className="h-screen text-white p-4 antialiased">
        <div className="max-w-full h-full mx-auto bg-black rounded-xl shadow-2xl overflow-hidden">
          <div className="grid h-full lg:grid-cols-[280px_1fr_280px]">
            {/* Pass handleAction down to panels that need it */}
            <LeftPanel activeChatId={activeChatId} setActiveChatId={setActiveChatId} handleAction={handleAction} />
            <ChatWindow activeChat={activeChat} handleAction={handleAction} />
            <RightPanel />
          </div>
        </div>
      </div>
      
      {/* Global Notification/Message Box */}
      <Notification 
          message={notification.message}
          type={notification.type}
          isVisible={notification.visible}
          onClose={() => setNotification(prev => ({ ...prev, visible: false }))}
      />
    </>
  );
};

export default App;
