import React from 'react';

const AvatarGroup = ({ count }) => {
  const avatars = [
    'https://placehold.co/32x32/7f1d1d/ffffff?text=A',
    'https://placehold.co/32x32/1d4ed8/ffffff?text=B',
    'https://placehold.co/32x32/065f46/ffffff?text=C',
    'https://placehold.co/32x32/854d0e/ffffff?text=D',
    'https://placehold.co/32x32/581c87/ffffff?text=E',
  ];

  return (
    <div className="flex -space-x-2 overflow-hidden">
      {avatars.slice(0, count).map((src, index) => (
        <img
          key={index}
          className="inline-block h-8 w-8 rounded-full ring-2 ring-zinc-900"
          src={src}
          alt={`Avatar ${index + 1}`}
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/32x32/3f3f46/ffffff?text=U'; }}
        />
      ))}
      {count > avatars.length && (
        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-zinc-700 text-xs font-medium text-white ring-2 ring-zinc-900">
          +{count - avatars.length}
        </span>
      )}
    </div>
  );
};

export default AvatarGroup;
