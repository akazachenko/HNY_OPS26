
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GameState } from '../types';
import { generateNewYearWish } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

const SlingshotGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [wish, setWish] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Координаты теперь вычисляются динамически
  const [coords, setCoords] = useState({ 
    baseX: 0, 
    baseY: 0, 
    sackX: 0, 
    sackY: 0 
  });

  useEffect(() => {
    const updateCoords = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCoords({
          baseX: rect.width / 2,
          baseY: rect.height - 180,
          sackX: rect.width / 2,
          sackY: 100
        });
      }
    };

    updateCoords();
    window.addEventListener('resize', updateCoords);
    return () => window.removeEventListener('resize', updateCoords);
  }, []);

  // Removed event parameter to fix type mismatch with Framer Motion's onTap handler
  const handleLaunch = useCallback(async () => {
    if (gameState !== GameState.IDLE) return;
    
    console.log("Launch triggered!"); // Для отладки
    setGameState(GameState.FLYING);
    
    // Запускаем запрос к ИИ заранее
    const wishPromise = generateNewYearWish();

    // Анимация полета снежинки к мешку (600мс)
    setTimeout(async () => {
      setGameState(GameState.REVEALING);
      try {
        const generatedWish = await wishPromise;
        setWish(generatedWish);
      } catch (err) {
        setWish("Счастья, здоровья и успехов в новом году!");
      }
      
      setTimeout(() => {
        setGameState(GameState.SHOWING_WISH);
      }, 800);
    }, 600);
  }, [gameState]);

  const resetGame = (e: React.MouseEvent) => {
    e.stopPropagation();
    setGameState(GameState.IDLE);
    setWish('');
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] md:h-[600px] overflow-visible select-none touch-none flex items-center justify-center"
    >
      {/* Слой с мешком (Мишень) */}
      <div 
        className="absolute transition-all duration-500"
        style={{ 
          left: coords.sackX, 
          top: coords.sackY,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <motion.div
          animate={gameState === GameState.FLYING ? { 
            scale: [1, 1.3, 1], 
            rotate: [0, -15, 15, 0],
          } : {}}
          className="relative drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
        >
          <svg width="120" height="140" viewBox="0 0 120 140" fill="none">
            <path d="M20 130C20 135.523 42.3858 140 70 140C97.6142 140 120 135.523 120 130C120 100 110 50 85 45C85 45 95 30 95 20C95 10 80 0 60 0C40 0 25 10 25 20C25 30 35 45 35 45C10 50 0 100 0 130C0 135.523 8.9543 140 20 130Z" fill="#B91C1C"/>
            <path d="M35 45C35 45 45 55 60 55C75 55 85 45 85 45" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round"/>
            <path d="M40 80L50 90M50 80L40 90" stroke="white" strokeWidth="2" strokeOpacity="0.3"/>
          </svg>
        </motion.div>
      </div>

      {/* Рогатка и Кнопка */}
      <div 
        className="absolute"
        style={{ 
          left: coords.baseX, 
          top: coords.baseY,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <svg width="300" height="300" viewBox="0 0 240 240" className="overflow-visible">
          <defs>
            <linearGradient id="antlerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A0522D" />
              <stop offset="100%" stopColor="#5D2E0C" />
            </linearGradient>
          </defs>
          
          {/* Рога */}
          <motion.path 
            animate={gameState === GameState.FLYING ? { rotate: [-10, 0] } : {}}
            d="M100 210 C80 190 60 150 55 110 C50 70 70 40 80 30" 
            fill="none" stroke="url(#antlerGrad)" strokeWidth="12" strokeLinecap="round" 
          />
          <motion.path 
            animate={gameState === GameState.FLYING ? { rotate: [10, 0] } : {}}
            d="M140 210 C160 190 180 150 185 110 C190 70 170 40 160 30" 
            fill="none" stroke="url(#antlerGrad)" strokeWidth="12" strokeLinecap="round" 
          />
          
          {/* Тетива */}
          <motion.path 
            animate={gameState === GameState.FLYING ? { 
              d: ["M100 200 L140 200", "M100 200 Q120 260 140 200", "M100 200 L140 200"],
            } : {}}
            d="M100 200 L140 200" 
            stroke="#FBBF24" strokeWidth="3" strokeDasharray="5 3"
          />

          {/* ИНТЕРАКТИВНАЯ ЗОНА (Кнопка-снежинка) */}
          {gameState === GameState.IDLE && (
            <motion.g
              // Use anonymous function wrapper to resolve type mismatch with Framer Motion native event signatures
              onTap={() => handleLaunch()}
              className="cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8, y: 20 }}
            >
              {/* Невидимый большой круг для легкого попадания пальцем/мышкой */}
              <circle cx="120" cy="200" r="60" fill="transparent" />
              
              <motion.circle 
                cx="120" cy="200" r="40" 
                fill="white" fillOpacity="0.1"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />

              <text x="120" y="215" textAnchor="middle" fontSize="60" className="drop-shadow-lg">❄️</text>
              
              <text 
                x="120" y="205" 
                textAnchor="middle" 
                className="font-black pointer-events-none"
                style={{ fontSize: '10px', fill: '#1E3A8A', letterSpacing: '1px' }}
              >
                НАЖМИ
              </text>
            </motion.g>
          )}
        </svg>

        {gameState === GameState.IDLE && (
          <div className="absolute top-[240px] left-1/2 -translate-x-1/2 whitespace-nowrap">
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-[10px] text-white font-bold uppercase tracking-tighter"
            >
              Стреляй снежинкой в мешок!
            </motion.div>
          </div>
        )}
      </div>

      {/* Снаряд в полете */}
      <AnimatePresence>
        {gameState === GameState.FLYING && (
          <motion.div
            initial={{ left: coords.baseX, top: coords.baseY + 20, opacity: 1, scale: 1.5 }}
            animate={{ 
              left: coords.sackX, 
              top: coords.sackY, 
              scale: [1.5, 2, 0.5],
              rotate: 360,
              opacity: [1, 1, 0] 
            }}
            transition={{ duration: 0.6, ease: "circIn" }}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 text-5xl"
          >
            ❄️
          </motion.div>
        )}
      </AnimatePresence>

      {/* Окно с пожеланием */}
      <AnimatePresence>
        {(gameState === GameState.REVEALING || gameState === GameState.SHOWING_WISH) && (
          <motion.div
            initial={{ scale: 0, x: '-50%', y: '-50%', top: coords.sackY, opacity: 0 }}
            animate={{ scale: 1, x: '-50%', y: '-50%', top: '50%', opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed left-1/2 z-50 w-[90%] max-w-sm"
          >
            <div className="relative aspect-square rounded-full bg-gradient-to-br from-red-600 to-red-900 shadow-[0_0_100px_rgba(255,0,0,0.4)] flex flex-col items-center justify-center p-8 text-center border-[10px] border-yellow-500/20 overflow-hidden">
              <div className="relative z-10 space-y-4">
                <h2 className="text-2xl font-black text-yellow-300 uppercase tracking-widest">2026 ✨</h2>
                <div className="min-h-[80px] flex items-center justify-center">
                  {wish ? (
                    <p className="text-xl font-medium italic text-white leading-tight">«{wish}»</p>
                  ) : (
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  )}
                </div>
                {gameState === GameState.SHOWING_WISH && (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={resetGame}
                    className="mt-4 px-6 py-2 bg-white text-red-900 font-black rounded-full text-xs uppercase tracking-widest shadow-xl"
                  >
                    Еще раз ✨
                  </motion.button>
                )}
              </div>
              
              {/* Снежинки вокруг пожелания */}
              <div className="absolute inset-0 pointer-events-none">
                 {[...Array(8)].map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{ 
                        x: [0, (Math.random() - 0.5) * 300], 
                        y: [0, (Math.random() - 0.5) * 300],
                        opacity: [0, 0.6, 0],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                      className="absolute left-1/2 top-1/2 text-xl"
                    >
                      ❄️
                    </motion.span>
                 ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SlingshotGame;
