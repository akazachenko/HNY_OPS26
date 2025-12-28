
import React from 'react';
import Snowfall from './components/Snowfall';
import SlingshotGame from './components/SlingshotGame';
import ChristmasFrame from './components/ChristmasFrame';

const App: React.FC = () => {
  return (
    <div className="relative w-screen h-screen bg-[#050a18] overflow-hidden">
      {/* Глубокий зимний фон */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a18] via-[#0f172a] to-[#1e293b]" />
      
      {/* Звездное небо (мерцание) */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.05)_0%,transparent_1px)] bg-[length:50px_50px]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.05)_0%,transparent_1px)] bg-[length:70px_70px]" />
      </div>

      {/* Дальние снежные холмы */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 opacity-30 pointer-events-none">
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-full bg-blue-200/20 rounded-[100%] blur-3xl transform rotate-[-5deg]" />
        <div className="absolute bottom-[-5%] right-[-10%] w-[70%] h-full bg-blue-100/20 rounded-[100%] blur-3xl transform rotate-[3deg]" />
      </div>

      {/* Основные сугробы на переднем плане */}
      <div className="absolute bottom-0 left-0 w-full h-32 z-0 pointer-events-none">
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-white/20 to-transparent" />
        <svg className="absolute bottom-0 w-full h-24 preserve-3d" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120H1440V50C1440 50 1200 10 900 40C600 70 300 0 0 50V120Z" fill="white" fillOpacity="0.05" />
          <path d="M0 120H1440V80C1440 80 1100 40 800 60C500 80 250 40 0 80V120Z" fill="white" fillOpacity="0.1" />
        </svg>
      </div>

      {/* Луна с гало */}
      <div className="absolute top-12 left-12 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute top-16 left-16 w-12 h-12 bg-white/40 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.2)]" />

      {/* Падающий снег */}
      <Snowfall />

      {/* Праздничное обрамление (ветки и гирлянда) */}
      <ChristmasFrame />

      {/* Контент */}
      <main className="relative z-20 w-full h-full flex flex-col items-center justify-between p-4">
        <header className="mt-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-300 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] mb-2 italic">
            2026
          </h1>
          <div className="flex items-center justify-center space-x-2">
             <span className="h-px w-8 bg-blue-400/30"></span>
             <p className="text-blue-100/70 font-bold tracking-[0.3em] uppercase text-xs">
               Happy New Year
             </p>
             <span className="h-px w-8 bg-blue-400/30"></span>
          </div>
        </header>

        <div className="flex-1 w-full max-w-4xl mx-auto flex items-center justify-center">
          <SlingshotGame />
        </div>

        <footer className="mb-8 flex flex-col items-center">
          <div className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-4">
             <p className="text-white/40 text-[10px] uppercase tracking-widest font-medium">
               Для самой крутой команды ✨
             </p>
          </div>
        </footer>
      </main>

      {/* Индикатор "Вьюги" */}
      <div className="fixed bottom-6 right-6 flex items-end space-x-1 opacity-30 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="w-0.5 bg-blue-200" 
            style={{ 
              height: `${Math.random() * 20 + 10}px`,
              animation: `bounce ${1 + Math.random()}s infinite`
            }} 
          />
        ))}
      </div>
    </div>
  );
};

export default App;
