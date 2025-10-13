import React from 'react';
import { ArrowUp, ArrowDown, ArrowRight, MoreVertical, ChevronDown } from 'lucide-react';
import { PROJECT_DATA } from '../../data/projectData';

// --- AvatarGroup Component ---
const AvatarGroup = ({ count }) => {
  const maxAvatars = 3;
  const remaining = count - maxAvatars;

  const avatars = [
    'smily-boy.jpg',
    'Profile.jpg',
    'https://placehold.co/32x32/4ade80/ffffff?text=U3',
  ];

  return (
    <div className="flex -space-x-2">
      {avatars.slice(0, maxAvatars).map((src, index) => (
        <img
          key={index}
          className="w-8 h-8 rounded-full border-2 border-zinc-900 object-cover"
          src={src}
          alt={`Avatar ${index + 1}`}
          style={{ zIndex: maxAvatars - index }}
        />
      ))}
      {remaining > 0 && (
        <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-semibold border-2 border-zinc-900">
          +{remaining}
        </div>
      )}
    </div>
  );
};


const ResultPill = ({ result }) => {
  let colorClasses = '';
  switch (result) {
    case 'Complete': colorClasses = 'bg-[#587349] text-white'; break;
    case 'On hold': colorClasses = 'bg-[#B72F0D] text-white'; break;
    case 'Pending': colorClasses = 'bg-[#DE8B2D] text-white'; break;
    case 'In Progress': colorClasses = 'bg-[#289EC9] text-blue-200'; break;
    default: colorClasses = 'bg-gray-700 text-gray-400'; break;
  }

  return <span className={`px-3 py-1 text-xs font-semibold rounded-sm ${colorClasses}`}>{result}</span>;
};

// --- ProjectTable Component ---
const ProjectTable = () => {
  return (
    <div className="p-6  rounded-2xl  col-span-12 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white tracking-tight">Project</h2>
        <div className="flex items-center space-x-2 text-gray-400 hover:text-white cursor-pointer transition-colors p-2 rounded-xl">
          <span className="text-sm font-medium">All Types</span>
          <ChevronDown className='w-5 h-5' />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-700">
          <thead>
            <tr className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              <th className="px-4 py-3 text-left w-1/6">STATUS</th>
              <th className="px-4 py-3 text-left w-1/6">DATE</th>
              <th className="px-4 py-3 text-left w-2/6">PROJECT</th>
              <th className="px-4 py-3 text-left w-1/6">ASSIGN</th>
              <th className="px-4 py-3 text-left w-1/6">RESULT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {PROJECT_DATA.map((item, index) => {
              const Icon =
                item.direction === 'up'
                  ? ArrowUp
                  : item.direction === 'down'
                  ? ArrowDown
                  : ArrowRight;

              const statusColor =
                item.status === 'High'
                  ? 'text-orange-500'
                  : item.status === 'Low'
                  ? 'text-blue-500'
                  : 'text-green-500';

              return (
                <tr key={index} className="text-sm text-white hover:bg-zinc-800 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center font-medium">
                      <Icon className={`w-4 h-4 mr-2 ${statusColor}`} />
                      {item.status}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-medium">{item.date}</div>
                    <div className="text-xs text-gray-400">{item.time}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <img
                        className="h-8 w-8 rounded-full border-2 border-zinc-700"
                        src="Marss.png"
                        alt="Project Logo"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://placehold.co/32x32/14532d/ffffff?text=M';
                        }}
                      />
                      <span className="font-medium">{item.project}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <AvatarGroup count={item.avatarCount} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <ResultPill result={item.result} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTable;
