import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 relative z-10 bg-raif-black">
      {/* Decorative Brand Element */}
      <div className="mb-12 relative animate-float">
         <div className="w-24 h-24 border-4 border-raif-yellow transform rotate-45 flex items-center justify-center">
            <i className="fas fa-tree text-raif-yellow text-5xl transform -rotate-45"></i>
         </div>
      </div>
      
      <h1 className="text-4xl md:text-7xl font-extrabold mb-6 tracking-tight text-white">
        С НОВЫМ ГОДОМ, <br/>
        <span className="text-raif-yellow">RAIFFEISEN</span> BANK!
      </h1>
      
      <div className="h-1 w-32 bg-raif-yellow mb-8"></div>

      <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed font-medium">
        Проверим, насколько команда <br/>
        <span className="font-bold text-white bg-raif-black border-b-2 border-raif-yellow pb-1">Securities Settlements</span> <br/>
        готова к встрече 2026 года?
      </p>

      <button
        onClick={onStart}
        className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-black transition-all duration-200 bg-raif-yellow hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-raif-yellow rounded-sm"
      >
        <span className="mr-3 tracking-wide">НАЧАТЬ КВИЗ</span>
        <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
      </button>

      <div className="absolute bottom-8 text-gray-500 text-xs font-semibold tracking-widest uppercase">
        <i className="fas fa-volume-up mr-2 text-raif-yellow"></i> Включи звук для атмосферы
      </div>
    </div>
  );
};

export default WelcomeScreen;