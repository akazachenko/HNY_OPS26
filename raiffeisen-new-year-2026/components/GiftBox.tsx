
import React, { useState } from 'react';

interface GiftBoxProps {
  onClick: () => void;
  size?: 'sm' | 'lg';
}

const GiftBox: React.FC<GiftBoxProps> = ({ onClick, size = 'lg' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const containerClasses = size === 'lg' ? 'w-48 h-48' : 'w-32 h-32';
  const lidTranslate = isHovered ? '-translate-y-6 rotate-2' : 'translate-y-0';

  return (
    <div 
      className={`relative cursor-pointer group flex flex-col items-center justify-end ${containerClasses}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Lid */}
      <div className={`absolute top-0 w-full h-1/4 z-20 transition-all duration-500 transform ${lidTranslate}`}>
         <div className="w-full h-full raiffeisen-bg-yellow rounded-t-sm shadow-xl flex items-center justify-center">
            <div className="w-6 h-full bg-black opacity-20 absolute"></div>
            {/* Bow */}
            <div className="absolute -top-4 w-10 h-6">
                <div className="w-5 h-5 border-4 border-yellow-300 rounded-full absolute -left-1"></div>
                <div className="w-5 h-5 border-4 border-yellow-300 rounded-full absolute -right-1"></div>
            </div>
         </div>
      </div>
      
      {/* Box Base */}
      <div className="relative w-[90%] h-3/4 raiffeisen-bg-yellow rounded-b-sm shadow-2xl overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
             <div className="w-6 h-full bg-black opacity-20 absolute"></div>
             <div className="h-6 w-full bg-black opacity-20 absolute"></div>
             <span className="text-black text-xs font-bold uppercase tracking-tighter z-10 opacity-30">Raiffeisen</span>
        </div>
      </div>
      
      {/* Sparkle effects on hover */}
      {isHovered && (
        <div className="absolute -inset-4 animate-pulse pointer-events-none">
          <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-1/4 right-0 w-3 h-3 bg-yellow-200 rounded-full"></div>
          <div className="absolute top-1/2 -left-2 w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
      )}

      {isHovered && size === 'lg' && (
        <div className="absolute -bottom-12 whitespace-nowrap text-white text-sm font-light italic animate-bounce">
          Нажми, чтобы открыть...
        </div>
      )}
    </div>
  );
};

export default GiftBox;
