
import React from 'react';
import { CharacterStats, CharacterType } from '../types';

interface Props {
  stats: CharacterStats;
  isActive: boolean;
  isHit: boolean;
  isFlipped?: boolean;
  isAI?: boolean;
  lang: 'en' | 'ru';
}

const CharacterDisplay: React.FC<Props> = ({ stats, isActive, isHit, isFlipped, isAI, lang }) => {
  const hpPercentage = (stats.hp / stats.maxHp) * 100;
  
  const labelMap = {
    en: { turn: "YOUR TURN", health: "HEALTH", snowballs: "SNOWBALLS", bag: "GIFT BAG", out: "OUT!", ai: "AI", name: stats.name === CharacterType.FATHER_FROST ? "Father Frost" : "Santa Claus" },
    ru: { turn: "ВАШ ХОД", health: "ЗДОРОВЬЕ", snowballs: "СНЕЖКИ", bag: "МЕШОК", out: "ПУСТО!", ai: "ИИ", name: stats.name === CharacterType.FATHER_FROST ? "Дед Мороз" : "Санта-Клаус" }
  };

  const l = labelMap[lang];

  return (
    <div className={`flex flex-col items-center transition-all duration-700 w-full ${isActive ? 'z-20' : 'z-10'}`}>
      <div 
        className={`relative w-full aspect-[3/4] max-w-[280px] md:max-w-[320px] rounded-3xl border-4 overflow-hidden mb-4 transition-all duration-500 shadow-2xl
          ${isActive ? 'border-yellow-400 scale-105 brightness-110' : 'border-white/10 opacity-70 scale-95'}
          ${isHit ? 'hit-shake border-red-500' : ''}
          character-idle
        `}
      >
        <div 
          className="absolute inset-0 opacity-40 blur-3xl animate-pulse"
          style={{ backgroundColor: stats.color }}
        ></div>

        <img 
          src={stats.image} 
          alt={stats.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${isFlipped ? 'scale-x-[-1]' : ''} ${isActive ? 'scale-110' : 'scale-100'}`}
        />

        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {isAI && (
            <span className="bg-purple-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md border border-purple-400 shadow-lg uppercase tracking-tighter">
              {l.ai}
            </span>
          )}
          {isActive && (
            <span className="animate-bounce bg-yellow-400 text-blue-900 text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg uppercase">
              {l.turn}
            </span>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
           <h2 className="text-xl md:text-2xl font-bold holiday-font tracking-wider text-white mb-1 drop-shadow-md">{l.name}</h2>
           <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                <div className="flex justify-between text-[9px] font-bold text-white/70">
                  <span>{l.health}</span>
                  <span>{stats.hp}%</span>
                </div>
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                    style={{ width: `${hpPercentage}%`, backgroundColor: stats.color }}
                  ></div>
                </div>
              </div>
           </div>
        </div>
      </div>

      <div className="w-full max-w-[280px] md:max-w-[320px] space-y-2 glass-card p-2 md:p-3">
        <div className="flex justify-around text-xs">
          <div className="flex flex-col items-center">
            <span className="text-blue-300 font-bold uppercase text-[8px] md:text-[9px] mb-1">{l.snowballs}</span>
            <div className="flex flex-wrap justify-center gap-1 max-w-[80px]">
              {[...Array(stats.snowballs)].map((_, i) => (
                <i key={i} className="fas fa-snowflake text-[8px] md:text-[10px] text-blue-300"></i>
              ))}
              {stats.snowballs === 0 && <span className="text-red-400 text-[8px] font-bold">{l.out}</span>}
            </div>
          </div>
          <div className="w-px bg-white/10"></div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-red-300 font-bold uppercase text-[8px] md:text-[9px] mb-1">{l.bag}</span>
            <span className="text-white font-mono text-sm">{stats.giftProgress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDisplay;
