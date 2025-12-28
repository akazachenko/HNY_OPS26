
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MONTHS } from './constants';
import { FolkFrame } from './components/FolkFrame';
import { Snowflakes } from './components/Snowflakes';
import { geminiService } from './services/geminiService';
import { ChevronLeft, ChevronRight, Sparkles, BookOpen, Volume2, VolumeX, Star } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [images, setImages] = useState<Record<number, string>>({});
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStartedMusic, setHasStartedMusic] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const totalPages = 14;

  const fetchCoverImage = useCallback(async () => {
    const url = await geminiService.generateCoverImage();
    if (url) setCoverImage(url);
  }, []);

  const fetchImageForMonth = useCallback(async (monthIndex: number) => {
    if (monthIndex < 1 || monthIndex > 12) return;
    if (images[monthIndex]) return;

    setLoading(true);
    const monthData = MONTHS[monthIndex - 1];
    const imageUrl = await geminiService.generateMonthImage(monthData.imagePrompt);
    if (imageUrl) {
      setImages(prev => ({ ...prev, [monthIndex]: imageUrl }));
    }
    setLoading(false);
  }, [images]);

  useEffect(() => {
    fetchCoverImage();
  }, [fetchCoverImage]);

  useEffect(() => {
    if (currentPage >= 1 && currentPage <= 12) {
      fetchImageForMonth(currentPage);
    }
  }, [currentPage, fetchImageForMonth]);

  // Handle audio play state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted && hasStartedMusic) {
        audioRef.current.play().catch(err => console.log("Autoplay prevented:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted, hasStartedMusic]);

  const startExperience = () => {
    setHasStartedMusic(true);
    nextPage();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!hasStartedMusic) setHasStartedMusic(true);
  };

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 0));

  const renderIntroPage = () => (
    <div className="relative w-full h-full min-h-[85vh] flex items-center justify-center overflow-hidden rounded-3xl border-8 border-yellow-600/30 shadow-2xl">
      {coverImage && (
        <img 
          src={coverImage} 
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105" 
          alt="Cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60"></div>
      
      <FolkFrame className="relative z-10 p-12 bg-black/30 backdrop-blur-sm rounded-2xl">
        <div className="flex justify-center mb-6">
          <Star className="text-yellow-400 animate-pulse mr-4" size={32} />
          <Star className="text-yellow-400 animate-bounce" size={48} />
          <Star className="text-yellow-400 animate-pulse ml-4" size={32} />
        </div>
        <h1 className="vasnetsov-font text-6xl md:text-9xl shimmer-text mb-6 drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">
          Сказочный Календарь
        </h1>
        <div className="text-8xl md:text-[10rem] font-bold mb-8 text-white drop-shadow-2xl flex items-center justify-center">
          <span className="glow-filter">2026</span>
        </div>
        <p className="text-2xl md:text-4xl max-w-2xl mx-auto italic text-yellow-100 mb-12 drop-shadow-md">
          Волшебное поздравление для коллег бэк-офиса Райффайзен Банка
        </p>
        <button 
          onClick={startExperience}
          className="flex items-center gap-3 bg-raiffeisen-yellow text-black px-12 py-5 rounded-full font-bold text-2xl hover:scale-110 transition-all shadow-[0_0_40px_rgba(254,230,0,0.5)] group border-4 border-white/20"
        >
          <BookOpen size={28} className="group-hover:rotate-12 transition-transform" />
          Начать путешествие
        </button>
      </FolkFrame>
    </div>
  );

  const renderMonthPage = (index: number) => {
    const month = MONTHS[index - 1];
    const image = images[index];

    return (
      <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[75vh]">
        <div className="relative group">
          <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform"></div>
          {loading && !image ? (
            <div className="aspect-square bg-neutral-900/80 flex flex-col items-center justify-center rounded-3xl border-4 border-yellow-600/20 animate-pulse backdrop-blur-md">
              <Sparkles className="text-yellow-500 mb-4 animate-spin" size={64} />
              <p className="text-yellow-500/50 vasnetsov-font text-xl">Творим новогоднее чудо...</p>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-3xl border-8 border-yellow-600/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-neutral-900">
              <img 
                src={image || `https://picsum.photos/seed/${month.name}/1000/1000`} 
                alt={month.brother}
                className="w-full h-auto aspect-square object-cover transform hover:scale-105 transition-transform duration-[2000ms]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/70 to-transparent">
                <p className="vasnetsov-font text-4xl text-yellow-400 drop-shadow-lg glow-filter">{month.brother}</p>
              </div>
            </div>
          )}
        </div>

        <div className="text-left flex flex-col justify-center bg-black/60 p-10 rounded-3xl backdrop-blur-xl border border-yellow-600/20 shadow-2xl">
          <h2 className="vasnetsov-font text-6xl md:text-8xl shimmer-text mb-8 border-b-4 border-yellow-500/20 pb-6">
            {month.name}
          </h2>
          <div className="relative">
             <div className="absolute -left-6 -top-6 text-yellow-600/30 text-9xl font-serif">"</div>
             <p className="text-2xl md:text-3xl leading-relaxed text-yellow-50 font-medium italic relative z-10 drop-shadow-sm">
                {month.wish}
             </p>
          </div>
          <div className="mt-12 flex gap-6 items-center">
            <div className="h-[2px] flex-grow bg-gradient-to-r from-yellow-500/50 to-transparent"></div>
            <span className="vasnetsov-font text-lg text-yellow-600/60 tracking-[0.4em] uppercase">2026 РАЙФФАЙЗЕН</span>
          </div>
        </div>
      </div>
    );
  };

  const renderFinalPage = () => (
    <div className="relative w-full h-full min-h-[85vh] flex items-center justify-center overflow-hidden rounded-3xl border-8 border-yellow-600/30 shadow-2xl">
      {coverImage && (
        <img 
          src={coverImage} 
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-110 blur-[1px]" 
          alt="Final Background"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black"></div>
      
      <FolkFrame className="relative z-10 p-12 text-center max-w-4xl">
        <h2 className="vasnetsov-font text-7xl md:text-[9rem] shimmer-text mb-12 drop-shadow-2xl animate-pulse">
          С Новым 2026 Годом!
        </h2>
        
        <div className="space-y-8 bg-black/60 p-10 rounded-3xl backdrop-blur-2xl border-2 border-yellow-500/30 shadow-[0_0_50px_rgba(0,0,0,1)]">
          <p className="text-3xl md:text-5xl text-white font-bold leading-tight shimmer-text">
            Пусть каждый ваш день будет сказкой!
          </p>
          <p className="text-xl md:text-3xl text-yellow-100/90 italic leading-relaxed">
            Желаем бэк-офису Райффайзен Банка процветания, 
            новых профессиональных высот и бесконечного тепла в сердцах.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {['СЧАСТЬЕ', 'УСПЕХ', 'ЛЮБОВЬ', 'ПОБЕДЫ', 'УЮТ'].map((tag, idx) => (
            <div key={idx} className="px-10 py-4 bg-raiffeisen-yellow text-black font-black text-xl rounded-xl shadow-[0_10px_30px_rgba(254,230,0,0.4)] transform hover:scale-110 transition-transform cursor-default border-2 border-white/40" style={{ rotate: `${idx % 2 === 0 ? 5 : -5}deg` }}>
              {tag}
            </div>
          ))}
        </div>

        <button 
          onClick={() => setCurrentPage(0)}
          className="mt-20 text-yellow-400 hover:text-white transition-all underline decoration-dotted underline-offset-[16px] text-2xl font-bold vasnetsov-font"
        >
          Пройти путь заново
        </button>
      </FolkFrame>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-12 bg-[#050505] overflow-hidden relative">
      <Snowflakes />
      
      {/* Background Music Element - Updated to 'Кабы не было зимы' */}
      <audio 
        ref={audioRef}
        src="https://mp3.hitmotop.com/get/music/20170830/V_Tolkunova_-_Kaby_ne_bylo_zimy_47829286.mp3" 
        loop
      />

      {/* Music Toggle UI */}
      <button 
        onClick={toggleMute}
        className="fixed top-12 right-12 z-40 p-5 bg-black/60 backdrop-blur-2xl border-2 border-yellow-500/40 rounded-full text-raiffeisen-yellow hover:scale-110 transition-all shadow-2xl group"
        title={isMuted ? "Включить музыку" : "Выключить музыку"}
      >
        {isMuted ? <VolumeX size={32} /> : <Volume2 size={32} className="animate-pulse group-hover:scale-125 transition-transform" />}
      </button>

      <main className="w-full max-w-7xl z-10 page-transition">
        {currentPage === 0 && renderIntroPage()}
        {currentPage >= 1 && currentPage <= 12 && renderMonthPage(currentPage)}
        {currentPage === 13 && renderFinalPage()}
      </main>

      {/* Navigation Controls */}
      <div className="fixed bottom-12 left-0 right-0 flex justify-center gap-16 z-20">
        {currentPage > 0 && (
          <button 
            onClick={prevPage}
            className="group p-8 bg-black/70 text-raiffeisen-yellow rounded-full hover:bg-raiffeisen-yellow hover:text-black transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-2xl border-2 border-yellow-500/30"
          >
            <ChevronLeft size={48} className="group-hover:-translate-x-2 transition-transform" />
          </button>
        )}
        {currentPage < totalPages - 1 && (
          <button 
            onClick={nextPage}
            className="group p-8 bg-black/70 text-raiffeisen-yellow rounded-full hover:bg-raiffeisen-yellow hover:text-black transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-2xl border-2 border-yellow-500/30"
          >
            <ChevronRight size={48} className="group-hover:translate-x-2 transition-transform" />
          </button>
        )}
      </div>

      {/* Progress Line */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 flex gap-4 z-30">
        {Array.from({ length: totalPages }).map((_, i) => (
          <div 
            key={i}
            className={`h-2 rounded-full transition-all duration-700 shadow-sm ${
              currentPage === i ? 'bg-raiffeisen-yellow w-16 glow-filter' : 'bg-neutral-800 w-4'
            }`}
          ></div>
        ))}
      </div>

      {/* Subtle branding */}
      <div className="fixed bottom-4 right-8 text-yellow-500/30 vasnetsov-font text-sm tracking-widest hidden md:block">
        © 2026 RAIFFEISEN BANK BACK-OFFICE • MAGIC CALENDAR
      </div>
    </div>
  );
};

export default App;
