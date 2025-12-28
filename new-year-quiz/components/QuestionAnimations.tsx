import React from 'react';

const Snowman = () => (
  <div className="relative w-32 h-32 flex flex-col items-center justify-center animate-bounce">
    <div className="w-12 h-12 bg-white rounded-full relative z-20 shadow-lg">
      <div className="absolute top-4 left-3 w-1.5 h-1.5 bg-black rounded-full"></div>
      <div className="absolute top-4 right-3 w-1.5 h-1.5 bg-black rounded-full"></div>
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[12px] border-b-orange-500"></div>
    </div>
    <div className="w-16 h-16 bg-white rounded-full -mt-2 z-10 shadow-lg flex items-center justify-center">
       <div className="w-1.5 h-1.5 bg-black rounded-full mb-2"></div>
       <div className="w-1.5 h-1.5 bg-black rounded-full mt-2"></div>
    </div>
    <div className="w-20 h-20 bg-white rounded-full -mt-3 shadow-lg"></div>
    <div className="absolute top-2 right-4 text-raif-yellow text-2xl animate-spin">❄</div>
  </div>
);

const Champagne = () => (
  <div className="flex items-end justify-center h-32 space-x-2">
    <div className="relative text-raif-yellow text-6xl transform -rotate-12 origin-bottom animate-pulse">
      <i className="fas fa-wine-glass-alt"></i>
      <div className="absolute -top-4 left-2 text-sm text-white animate-float">.。</div>
    </div>
    <div className="relative text-raif-yellow text-6xl transform rotate-12 origin-bottom animate-pulse delay-100">
      <i className="fas fa-wine-glass-alt"></i>
      <div className="absolute -top-6 right-2 text-sm text-white animate-float delay-75">° .</div>
    </div>
  </div>
);

const WavingSanta = () => (
  <div className="relative w-32 h-32 flex items-center justify-center">
    <div className="text-red-600 text-8xl drop-shadow-lg">
      <i className="fas fa-santa-hat"></i>
    </div>
    <div className="absolute -right-4 top-10 text-red-500 text-5xl origin-bottom-left animate-[wave_1s_ease-in-out_infinite]">
      <i className="fas fa-mitten"></i>
    </div>
    <style>{`
      @keyframes wave {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(30deg); }
      }
    `}</style>
  </div>
);

const Fireworks = () => (
  <div className="relative w-40 h-32 flex items-center justify-center overflow-hidden">
    <div className="absolute w-2 h-2 bg-raif-yellow rounded-full animate-[ping_1s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
    <div className="absolute w-2 h-2 bg-white rounded-full top-4 right-10 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
    <div className="absolute w-2 h-2 bg-red-500 rounded-full bottom-4 left-10 animate-[ping_1.2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
    <i className="fas fa-fire text-raif-yellow text-5xl animate-bounce relative z-10"></i>
  </div>
);

const Garlands = () => (
  <div className="w-full flex justify-center space-x-4 py-4">
    {['red', 'yellow', 'green', 'blue'].map((color, i) => (
      <div 
        key={i} 
        className={`w-6 h-6 rounded-full shadow-[0_0_15px_currentColor] animate-pulse`}
        style={{ 
          backgroundColor: color === 'yellow' ? '#FEE600' : color,
          color: color === 'yellow' ? '#FEE600' : color,
          animationDelay: `${i * 0.2}s`
        }}
      ></div>
    ))}
    <div className="absolute top-0 w-full h-1 bg-gray-600 rounded-full"></div>
  </div>
);

const FlyingSanta = () => (
  <div className="w-full h-32 relative overflow-hidden">
    <div className="absolute top-8 text-6xl text-white animate-[fly_3s_linear_infinite] whitespace-nowrap">
      <i className="fas fa-sleigh opacity-80"></i>
      <span className="text-xl ml-2 text-raif-yellow">💨</span>
    </div>
    <style>{`
      @keyframes fly {
        0% { left: -20%; transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { left: 120%; transform: translateY(0px); }
      }
    `}</style>
  </div>
);

const ClockChimes = () => (
  <div className="relative w-32 h-32 flex items-center justify-center">
    <div className="text-white text-8xl animate-[tada_2s_infinite]">
      <i className="far fa-clock"></i>
    </div>
    <div className="absolute top-0 right-0 text-raif-yellow text-4xl animate-bounce">
      <i className="fas fa-bell"></i>
    </div>
  </div>
);

export const QuestionVisual: React.FC<{ questionId: number }> = ({ questionId }) => {
  switch (questionId) {
    case 1: return <Snowman />;
    case 2: return <Champagne />;
    case 3: return <WavingSanta />;
    case 4: return <Fireworks />;
    case 5: return <Garlands />;
    case 6: return <FlyingSanta />;
    case 7: return <ClockChimes />;
    default: return <div className="text-raif-yellow text-6xl"><i className="fas fa-gift animate-bounce"></i></div>;
  }
};
