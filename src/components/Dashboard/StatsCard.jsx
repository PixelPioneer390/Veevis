import React from 'react';
import { STATS_DATA } from '../../data/statsData';

const StatsCard = ({ title, total, percentage, color, accentColor, image }) => {
  const isDarkCard = color.includes('bg-gray-900');
  const textColor = 'text-white';

  const buttonClass = isDarkCard 
    ? 'bg-white/10 hover:bg-white/20 border border-white'
    : 'bg-transparent border border-white hover:bg-white/20';

  const formattedTotal = String(total).padStart(2, '0');

  return (
    <div
      className={`px-6 py-12 rounded-md text-white border border-[#DE8B2D]  ${color} flex flex-col justify-between transition-transform `}
    >
      {/* Image and Title */}
      <div className="mb-6">
        <div
          className={' rounded-xl inline-block  '}
        >
          <img
            src={image}
            alt={title}
            className="w-8 h-8 object-contain"
          />
        </div>
        <h3 className={`text-2xl font-bold ${textColor}`}>{title}</h3>
      </div>

      {/* Total Projects */}
      <div className="pt-2 pb-2">
        <div className="flex items-center justify-between text-lg font-medium">
          <span className={`${textColor}/80`}>Total Projects</span>
          <span className={`text-xl font-bold ${textColor}`}>{formattedTotal}</span>
        </div>
        <div className="w-full h-px mt-2 mb-2 bg-white/20"></div>
      </div>

      {/* Total Percentage */}
      <div className="pt-2 pb-6">
        <div className="flex items-center justify-between text-lg font-medium">
          <span className={`${textColor}/80`}>Total Percentage</span>
          <span className={`text-xl font-bold ${textColor}`}>{percentage}%</span>
        </div>
        <div className="w-full bg-white rounded-full h-1 mt-2">
          <div
            className={`h-1 rounded-full shadow-md ${accentColor}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="w-full h-px mt-2 mb-2 bg-white/20"></div>
      </div>

      {/* Button */}
      <button
        className={`w-full py-3 text-white font-semibold rounded-xl transition-colors ${buttonClass}`}
      >
        View Details
      </button>
    </div>
  );
};

// --- MAIN COMPONENT (App UI inside StatsCard file) ---
const ProjectStatusDashboard = () => {
  return (
    <div className="p-8  font-sans antialiased">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-w-7xl mx-auto">
        {STATS_DATA.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            total={stat.total}
            percentage={stat.percentage}
            color={stat.color}
            accentColor={stat.accentColor}
            image={stat.image} // 👈 image prop instead of icon
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectStatusDashboard;
