
import React, { useState } from 'react';
import Snowfall from './components/Snowfall';
import Tree from './components/Tree';
import GiftBox from './components/GiftBox';
import RaiffeisenLogo from './components/RaiffeisenLogo';
import MusicPlayer from './components/MusicPlayer';
import { Page, Wish } from './types';

const FUNNY_WISHES: Wish[] = [
  { id: 1, text: "Пусть дебет всегда танцует танго с кредитом, а не устраивает боксерский поединок!" },
  { id: 2, text: "Желаем, чтобы единственным 'холдом' в вашей жизни был холд на свободное время в отпуске!" },
  { id: 3, text: "Пусть в 2026 году 'быстрые платежи' касаются только зачисления вашей премии!" },
  { id: 4, text: "Желаем, чтобы ваш личный KPI всегда зашкаливал только от уровня счастья!" },
  { id: 5, text: "Пусть комплаенс одобряет все ваши мечты автоматически и без лишних документов!" },
  { id: 6, text: "Желаем, чтобы инфляция касалась только вашего чувства юмора и количества друзей!" },
  { id: 7, text: "Пусть 'валютный контроль' пропускает все ваши желания через зелёный коридор!" },
  { id: 8, text: "Желаем, чтобы 2026-й год прошел без 'технических перерывов' в вашем отличном настроении!" },
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [openedWishId, setOpenedWishId] = useState<number | null>(null);
  const [showMainGreeting, setShowMainGreeting] = useState(false);
  const [musicTrigger, setMusicTrigger] = useState(false);

  const handleStart = () => {
    setMusicTrigger(true);
    setCurrentPage('advent');
  };

  const handleBack = () => {
    setCurrentPage('home');
    setOpenedWishId(null);
    setShowMainGreeting(false);
  };

  const toggleWish = (id: number) => {
    setMusicTrigger(true); // Ensure music starts if user clicks a small gift first (though unlikely)
    setOpenedWishId(openedWishId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-1000 font-['Inter',sans-serif]">
      <Snowfall />
      <MusicPlayer triggerStart={musicTrigger} />

      {/* Decorative corners */}
      <div className="fixed top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#fee600]/30 m-8 pointer-events-none z-30"></div>
      <div className="fixed bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#fee600]/30 m-8 pointer-events-none z-30"></div>

      {currentPage === 'home' ? (
        <div className="z-20 flex flex-col items-center animate-fadeIn text-center px-4 max-w-2xl">
          <div className="mb-8 scale-90 md:scale-100">
            <Tree />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] mb-2 uppercase">
            Райффайзен<span className="raiffeisen-yellow">банк</span>
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-widest text-gray-400 mb-12">
            С НОВЫМ ГОДОМ 2026
          </p>

          <div className="flex flex-col items-center gap-6">
            <GiftBox onClick={handleStart} />
            
            <div className="mt-12 flex flex-col items-center gap-4 group opacity-80 hover:opacity-100 transition-opacity">
               <RaiffeisenLogo className="w-14 h-14" />
               <span className="text-xs font-bold tracking-[0.4em] raiffeisen-yellow uppercase">Happy New Year</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="z-20 w-full max-w-5xl px-6 py-12 flex flex-col items-center animate-fadeIn h-screen overflow-y-auto no-scrollbar relative">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between w-full items-center mb-10 gap-8">
            <button 
              onClick={handleBack}
              className="text-gray-400 hover:text-[#fee600] transition-colors flex items-center gap-2 group order-2 md:order-1"
            >
              <span className="text-2xl transition-transform group-hover:-translate-x-1">←</span> На главную
            </button>
            
            <div className="flex flex-col items-center gap-3 order-1 md:order-2">
              <RaiffeisenLogo className="w-20 h-20" />
              <div className="text-center">
                <h1 className="text-lg md:text-xl font-bold tracking-[0.2em] uppercase text-white">ПОЖЕЛАНИЯ</h1>
                <p className="text-[#fee600] font-bold tracking-[0.4em] text-lg md:text-xl mt-1">2026 ГОД</p>
              </div>
            </div>

            <div className="w-32 hidden md:block order-3"></div>
          </div>

          {/* Grid of Small Gifts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mb-6">
            {FUNNY_WISHES.map((wish) => (
              <div key={wish.id} className="flex flex-col items-center gap-4 group">
                <div className="relative">
                   <GiftBox 
                    size="sm" 
                    onClick={() => toggleWish(wish.id)} 
                   />
                   <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full raiffeisen-bg-yellow text-black flex items-center justify-center font-bold text-xs shadow-lg">
                      {wish.id}
                   </div>
                </div>
                
                <div className={`
                  transition-all duration-500 overflow-hidden text-center
                  ${openedWishId === wish.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  <div className="bg-[#111] border border-[#fee600]/30 p-4 rounded-sm shadow-xl mt-2">
                    <p className="text-sm italic font-light text-gray-200">
                      {wish.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Large Gift Section - Moved Higher */}
          <div className="mt-0 mb-12 flex flex-col items-center">
             <h3 className="text-[#fee600] uppercase tracking-[0.3em] text-[10px] mb-6 font-bold opacity-80">Главное поздравление</h3>
             <GiftBox onClick={() => { setMusicTrigger(true); setShowMainGreeting(true); }} size="lg" />
          </div>

          {/* Corporate Footer */}
          <div className="py-10 border-t border-[#fee600]/10 w-full flex flex-col items-center text-center">
            <p className="text-white text-xl font-bold uppercase tracking-tight opacity-90">
              Торговое финансирование
            </p>
            <div className="mt-6 flex gap-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-1 h-1 rounded-full raiffeisen-bg-yellow animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
              ))}
            </div>
          </div>

          {/* Soulful Greeting Modal */}
          {showMainGreeting && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-fadeIn">
              <div className="bg-[#050505] border border-[#fee600]/30 p-8 md:p-16 rounded-sm max-w-3xl relative shadow-[0_0_120px_rgba(254,230,0,0.1)]">
                <button 
                  onClick={() => setShowMainGreeting(false)}
                  className="absolute top-4 right-6 text-gray-500 hover:text-[#fee600] transition-colors text-4xl font-light"
                >
                  &times;
                </button>

                <div className="flex justify-center mb-10">
                  <RaiffeisenLogo className="w-16 h-16" />
                </div>

                <div className="space-y-8 text-center">
                  <h2 className="text-3xl md:text-5xl font-bold raiffeisen-yellow tracking-[0.1em] uppercase mb-8">
                    Дорогие коллеги!
                  </h2>
                  
                  <div className="space-y-6 text-gray-200 leading-relaxed font-light text-xl italic max-w-xl mx-auto">
                    <p>
                      Новый год — это время, когда мы подводим итоги и строим амбициозные планы. 
                      2026 год проходит под знаком Сильной Лошади — символа выносливости, скорости и успеха.
                    </p>
                    <p>
                      Мы благодарим каждого из вас за профессионализм, преданность делу и ту невероятную энергию, 
                      которую вы вкладываете в наш общий результат. Пусть наступающий год принесет вам 
                      новые вершины, финансовую стабильность и гармонию в семьях.
                    </p>
                    <p>
                      Пусть каждый ваш проект будет успешным, а каждая сделка — выгодной!
                    </p>
                  </div>

                  <div className="mt-16 pt-12 border-t border-[#fee600]/15 flex flex-col items-center">
                    <p className="raiffeisen-yellow font-semibold tracking-[0.3em] uppercase mb-3 text-sm opacity-80">
                      С искренними пожеланиями,
                    </p>
                    <p className="text-white text-3xl font-bold uppercase tracking-tighter">
                      Торговое финансирование
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] z-0">
        <div className="grid grid-cols-10 h-full w-full">
            {Array.from({length: 100}).map((_, i) => (
                <div key={i} className="border border-white/5 aspect-square flex items-center justify-center p-2">
                    <span className="text-[6px] transform -rotate-45 font-bold tracking-tighter">RAIFFEISEN 2026</span>
                </div>
            ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
