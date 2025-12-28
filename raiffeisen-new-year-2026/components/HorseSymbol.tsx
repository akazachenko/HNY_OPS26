
import React from 'react';

const HorseSymbol: React.FC = () => {
  return (
    <div className="opacity-80 group hover:opacity-100 transition-opacity">
       <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="raiffeisen-yellow group-hover:scale-110 transition-transform">
        <path d="M4 19V21M8 19V21M12 19V21M16 19V21M3 13C3 13 4.5 10 7 10C9.5 10 11 11.5 13 13C15 14.5 17.5 14.5 19 13C20.5 11.5 21 8 21 8M3 13C3 13 2 11 2 8C2 5 4 3 7 3C10 3 13 4 14.5 6.5C16 9 17 9 17 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 7C10 7 10.5 6 11.5 6C12.5 6 13 7 13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <span className="block text-[10px] text-center font-bold mt-1 tracking-widest raiffeisen-yellow uppercase">Year of the Horse</span>
    </div>
  );
};

export default HorseSymbol;
