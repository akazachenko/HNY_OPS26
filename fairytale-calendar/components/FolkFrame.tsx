
import React from 'react';

interface FolkFrameProps {
  children: React.ReactNode;
  className?: string;
}

export const FolkFrame: React.FC<FolkFrameProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative p-8 md:p-12 ${className}`}>
      {/* Ornate corner ornaments */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-yellow-500 rounded-tl-xl opacity-60"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-yellow-500 rounded-tr-xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-yellow-500 rounded-bl-xl opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-yellow-500 rounded-br-xl opacity-60"></div>
      
      {/* Inner subtle border */}
      <div className="absolute inset-4 border border-yellow-500/20 pointer-events-none"></div>
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
};
