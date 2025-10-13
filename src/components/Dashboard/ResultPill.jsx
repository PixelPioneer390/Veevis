import React from 'react';

const ResultPill = ({ result }) => {
  let colorClass = '';
  switch (result) {
    case 'Complete':
      colorClass = 'bg-green-800 text-green-300';
      break;
    case 'On hold':
      colorClass = 'bg-red-800 text-red-300';
      break;
    case 'Pending':
      colorClass = 'bg-yellow-800 text-yellow-300';
      break;
    case 'In Progress':
      colorClass = 'bg-blue-800 text-blue-300';
      break;
    default:
      colorClass = 'bg-gray-700 text-gray-300';
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${colorClass}`}>
      {result}
    </span>
  );
};

export default ResultPill;
