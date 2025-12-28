
import React from 'react';

const RaiffeisenLogo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => {
  return (
    <div className={`${className} bg-[#fee600] rounded-[20%] flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm border border-black/5`}>
      <svg viewBox="0 0 100 100" className="w-[75%] h-[75%] text-black" fill="currentColor">
        {/* Stylized Christmas Tree Emblem - Sharp and clean like the bank's logo */}
        <path d="M50,10 L85,80 L65,80 L65,90 L35,90 L35,80 L15,80 Z M50,25 L30,70 H70 Z" fillRule="evenodd" />
        {/* Small version of the crossed gables inside the tree for brand recognition */}
        <path d="M50,45 L54,41 V39 H46 V41 L50,45 Z" />
        <path d="M50,55 L58,47 V44 H54 V46 L50,50 L46,46 V44 H42 V47 L50,55 Z" />
      </svg>
    </div>
  );
};

export default RaiffeisenLogo;
