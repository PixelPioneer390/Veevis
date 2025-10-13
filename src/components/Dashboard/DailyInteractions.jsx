import React from 'react';
import { TrendingUp } from 'lucide-react';

const DailyInteractions = () => {
  const chartData = [
    { day: 'MON', value: 30 },
    { day: 'TUE', value: 80 },
    { day: 'WED', value: 55 },
    { day: 'THUR', value: 70 },
    { day: 'FRI', value: 40 },
  ];

  const maxValue = 100;

  return (
    <div className="p-6 bg-zinc-900 rounded-2xl shadow-xl col-span-12 lg:col-span-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Daily Interactions</h2>
        <TrendingUp className="w-5 h-5 text-green-500" />
      </div>

      <div className="relative h-48 flex items-end">
        <div className="flex w-full h-full pt-6">
          {chartData.map((item) => (
            <div key={item.day} className="flex-1 flex flex-col justify-end items-center px-1">
              <div
                className="w-full rounded-t-lg transition-all duration-500 relative"
                style={{ height: `${(item.value / maxValue) * 100}%`, backgroundColor: '#475569' }}
              />
              <span className="text-xs text-gray-400 mt-2">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyInteractions;
