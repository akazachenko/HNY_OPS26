
import React from 'react';

const Tree: React.FC = () => {
  return (
    <div className="relative w-64 h-80 flex items-center justify-center transform hover:scale-105 transition-transform duration-700">
      <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-[0_0_15px_rgba(254,230,0,0.3)]">
        {/* Tree Layers */}
        <path d="M100 20 L40 100 H160 L100 20Z" fill="#222" stroke="#fee600" strokeWidth="2" />
        <path d="M100 70 L20 170 H180 L100 70Z" fill="#1a1a1a" stroke="#fee600" strokeWidth="2" />
        <path d="M100 130 L0 250 H200 L100 130Z" fill="#111" stroke="#fee600" strokeWidth="2" />
        
        {/* Trunk */}
        <rect x="90" y="250" width="20" height="30" fill="#333" />
        
        {/* Yellow Balls/Ornaments */}
        <circle cx="100" cy="50" r="6" fill="#fee600" className="animate-pulse" />
        <circle cx="70" cy="120" r="5" fill="#fee600" />
        <circle cx="130" cy="120" r="5" fill="#fee600" />
        <circle cx="50" cy="200" r="5" fill="#fee600" />
        <circle cx="150" cy="200" r="5" fill="#fee600" />
        <circle cx="100" cy="180" r="5" fill="#fee600" />
        
        {/* Star */}
        <path d="M100 5 L105 18 L118 18 L108 27 L112 40 L100 32 L88 40 L92 27 L82 18 L95 18 Z" fill="#fee600" className="animate-pulse" />
      </svg>
    </div>
  );
};

export default Tree;
