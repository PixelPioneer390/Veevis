import { useState } from 'react';
import { 
  Calendar, Check, ThumbsUp,
  MessageCircleMore,
  Link,
  SquarePlus
} from 'lucide-react';

// Helper function to generate placeholder avatars with distinct backgrounds
const avatarUrl = (seed) => 
  `https://placehold.co/32x32/${['4f46e5', '10b981', 'ef4444', 'f97316', '7c3aed', '1e40af'][seed % 6]}/ffffff?text=${'ABCDEFG'[seed % 7]}`;

// --- Task Data ---
const tasks = [
  { id: 1, column: 'New', title: 'UX Adjustments', description: 'It just needs to adapt the UI from what you did before.', tags: ['UI Design', 'High'], metrics: { love: 3 }, avatars: [avatarUrl(1)] },
  { id: 2, column: 'New', title: 'Dashboard Design', description: '', tags: ['UI Design', 'Normal'], metrics: { love: 5, thumbsUp: 1 }, image: '/dashboard.png', avatars: [avatarUrl(4)] },
  { id: 3, column: 'InProgress', title: 'Slack Integration', description: 'Add a field in the portal to let the user connect their Slack account.', tags: ['Development', 'High'], metrics: { love: 8, chat: 3 }, date: 'Tomorrow', avatars: [avatarUrl(2)] },
  { id: 4, column: 'InProgress', title: 'Copywriting of the app', description: 'Composing words to provide people with decision-making clarity when interacting with a product.', tags: ['UX Writing', 'High'], metrics: { love: 8 }, date: 'Nov 30', avatars: [avatarUrl(3)] },
  { id: 5, column: 'InProgress', title: 'Brainstorming', description: '', tags: ['UI Design', 'Low'], metrics: { love: 21 }, avatars: [avatarUrl(6), avatarUrl(7), avatarUrl(8)] },
  { id: 6, column: 'Awaiting Feedback', title: 'Dashboard Design', description: '', tags: ['UI Design', 'Normal'], metrics: { love: 5, chat: 1 }, image: '/dashboard.png', avatars: [avatarUrl(4)] },
  { id: 7, column: 'Awaiting Feedback', title: 'Design System', description: 'Create a consistent look and feel both on web and mobile.', tags: ['UI Design', 'Low'], metrics: { love: 10, chat: 2, thumbsUp: 10 }, avatars: [avatarUrl(2)] },
  { id: 10, column: 'Awaiting Feedback', title: 'Brainstorming', description: '', tags: ['UI Design', 'Low'], metrics: { love: 21, thumbsUp: 2 }, avatars: [avatarUrl(6), avatarUrl(7), avatarUrl(8)] },
  { id: 8, column: 'Completed', title: 'Presentation', description: 'Help businesses to clearly define their annual e-commerce digital strategy by creating a high-level plan.', tags: ['Planning', 'High'], metrics: { love: 11, chat: 3 }, isCompleted: true, avatars: [avatarUrl(5)] },
  { id: 9, column: 'Completed', title: 'Brainstorming', description: '', tags: ['UI Design', 'Low'], metrics: { love: 21, thumbsUp: 2 }, isCompleted: true, avatars: [avatarUrl(6), avatarUrl(7), avatarUrl(8)] },
];

// --- Column Data ---
const columnsData = [
  { id: 'New', title: 'New', color: 'text-orange-400 border-orange-400' },
  { id: 'InProgress', title: 'InProgress', color: 'text-blue-400 border-blue-400' },
  { id: 'Awaiting Feedback', title: 'Awaiting Feedback', color: 'text-red-400 border-red-400' },
  { id: 'Completed', title: 'COMPLETED', color: 'text-green-400 border-green-400' },
];

// --- TaskTag Component ---
const TaskTag = ({ children, type }) => {
  let bgColor = 'bg-blue-600', textColor = 'text-white';
  switch (type) {
    case 'UI Design': bgColor = 'bg-[#F0F4FF]'; textColor = 'text-[#306BFF]'; break;
    case 'High': bgColor = 'bg-red-600'; textColor = 'text-white'; break;
    case 'Low': bgColor = 'bg-blue-600/50'; textColor = 'text-white'; break;
    case 'Normal': bgColor = 'bg-green-600'; textColor = 'text-white'; break;
    case 'Planning': bgColor = 'bg-green-600'; textColor = 'text-white'; break;
    case 'Development': bgColor = 'bg-[#F0F4FF]'; textColor = 'text-blue-600'; break;
    case 'UX Writing': bgColor = 'bg-orange-600/50'; textColor = 'text-white'; break;
    default: break;
  }
  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded ${bgColor} ${textColor} whitespace-nowrap`}>
      {children}
    </span>
  );
};

// --- TaskCard Component ---
const TaskCard = ({ task, isRotated, onCardClick }) => {
  const { title, description, tags, metrics, date, isCompleted, image, avatars } = task;

  const AvatarGroup = ({ urls }) => (
    <div className="flex -space-x-2">
      {urls.slice(0, 3).map((url, i) => (
        <img key={i} className="w-7 h-7 rounded-full border-2 border-[#1a1a1a]" src={url} alt="" />
      ))}
      {urls.length > 3 && (
        <div className="w-7 h-7 rounded-full bg-purple-600 text-xs flex items-center justify-center text-white border-2 border-[#1a1a1a] font-bold">
          +{urls.length - 3}
        </div>
      )}
      {metrics.thumbsUp > 1 && (
        <div className="w-7 h-7 rounded-full bg-purple-600 text-xs flex items-center justify-center text-white border-2 border-[#1a1a1a] font-bold">
          +{metrics.thumbsUp}
        </div>
      )}
    </div>
  );

  return (
    <div
      onClick={onCardClick}
      className={`bg-[#0D121D] mb-3 rounded-xl border border-white cursor-pointer transition-all duration-300 hover:border-gray-100 ${
        isRotated ? 'rotate-3 scale-[1.02]' : ''
      }`}
      style={{ transition: 'all 0.3s ease', transformStyle: 'preserve-3d' }}
    >
      <div className='p-4'>
        <h3 className="text-white font-semibold mb-2 text-sm">{title}</h3>
        {image && <img src={image} alt="Task" className="my-3 rounded-lg w-full" />}
        {description && <p className="text-gray-400 text-xs mb-3 leading-relaxed">{description}</p>}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => <TaskTag key={i} type={tag}>{tag}</TaskTag>)}
        </div>
      </div>

      <div className="flex justify-between p-4 items-center text-xs text-gray-400 pt-3 border-t border-white">
        <div className="flex items-center space-x-3">
          {metrics.love && (
            <div className="flex items-center space-x-1">
              <MessageCircleMore className="w-4 h-4" />
              <span>{metrics.love}</span>
            </div>
          )}
          {metrics.chat && (
            <div className="flex items-center space-x-1">
              <Link className="w-4 h-4" /> 
              <span>{metrics.chat}</span>
            </div>
          )}
          {metrics.thumbsUp === 1 && (
            <div className="flex items-center space-x-1">
              <ThumbsUp className="w-4 h-4 text-gray-400" /> 
              <span>{metrics.thumbsUp}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {date && (
            <div className="flex items-center space-x-1 bg-[#242424] px-2 py-1 rounded">
              <Calendar className="w-3 h-3" />
              <span className="text-xs">{date}</span>
            </div>
          )}
          {isCompleted && (
            <div className="flex items-center space-x-1 text-green-400 bg-green-900/30 px-2 py-1 rounded">
              <Check className="w-3 h-3" />
              <span className="text-xs font-semibold">Done</span>
            </div>
          )}
          <AvatarGroup urls={avatars} />
          {(metrics.thumbsUp && metrics.thumbsUp > 1) ? null : 
            (metrics.thumbsUp && metrics.thumbsUp === 1) ? null : (
              <ThumbsUp className='w-5 h-5 fill-blue-600 text-blue-600' />
            )
          }
        </div>
      </div>
    </div>
  );
};

// --- KanbanColumn Component ---
const KanbanColumn = ({ column, rotatedCardId, setRotatedCardId }) => {
  const tasksInColumn = tasks.filter((t) => t.column === column.id);
  const handleCardClick = (taskId) => {
    setRotatedCardId(rotatedCardId === taskId ? null : taskId);
  };

  return (
    <div className="flex flex-col w-full">
      <div className={`flex items-center justify-between mb-4 pb-2 border-b-2 ${column.color}`}>
        <h2 className={`text-xs font-bold uppercase tracking-wide pb-1  ${column.color}`}>
          {column.title}
        </h2>
        <span className="bg-[#2a2a2a] text-white text-xs font-bold px-2.5 py-1 rounded-full border border-gray-700">
          {tasksInColumn.length}
        </span>
      </div>

      <div className="flex-1 space-y-0">
        {tasksInColumn.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            isRotated={rotatedCardId === task.id}
            onCardClick={() => handleCardClick(task.id)}
          />
        ))}
      </div>
    </div>
  );
};

// --- FloatingNewTaskButton Component ---
const FloatingNewTaskButton = () => (
  <div className="flex items-center">
    <button className="flex items-center space-x-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 z-20">
      <SquarePlus className="w-5 h-5" />
      <span className="text-sm">New Task</span>
    </button>
    <img src="/four.svg" alt="" className="w-16 mt-2" />
  </div>
);

// --- Main App Component ---
export default function App() {
  const [rotatedCardId, setRotatedCardId] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-gray-100 p-8 relative">
      <main className="max-w-[1400px] mx-auto flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {columnsData.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              rotatedCardId={rotatedCardId}
              setRotatedCardId={setRotatedCardId}
            />
          ))}
        </div>
      </main>

      {/* ✅ Floating Button (Fixed to right side) */}
      <div className="absolute bottom-8 right-8 z-50">
        <FloatingNewTaskButton />
      </div>
    </div>
  );
}
