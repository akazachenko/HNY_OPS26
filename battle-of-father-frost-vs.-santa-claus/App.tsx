
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CharacterType, CharacterStats, GameState, BattleLog, GameMode } from './types';
import { getNarrative, getIntroMessage, generateAvatar } from './services/geminiService';
import CharacterDisplay from './components/CharacterDisplay';

type Language = 'en' | 'ru';

const TRANSLATIONS = {
  en: {
    title: "Winter Duel",
    loading: "Summoning the Legends...",
    loadingSub: "Gemini is painting the epic battle portraits",
    turn: "TURN",
    yourTurn: "YOUR TURN",
    health: "HEALTH",
    snowballs: "SNOWBALLS",
    giftBag: "GIFT BAG",
    outOfAmmo: "OUT!",
    duelLog: "DUEL LOG",
    emptyLog: "The legends size each other up...",
    barrage: "BARRAGE",
    prepare: "PREPARE",
    legendary: "LEGENDARY",
    champion: "CHAMPION!",
    replay: "REPLAY",
    restart: "RESTART",
    ammoCost: "1 AMMO",
    giftCost: "50 GIFT",
    prepareGain: "+AMMO/GIFT",
    footer: "Duel for the Eternal Bag of Gifts • North Pole Arena",
    howToPlay: "How to Play",
    close: "Close",
    critical: "CRITICAL!",
    gameMode: "Game Mode",
    pvp: "Player vs Player",
    pvai: "Player vs AI",
    selectChar: "Select Your Character",
    rules: [
      { title: "Barrage", desc: "Throw a snowball (5-30 dmg). 15% Crit chance. 50% of damage fuels Magic!" },
      { title: "Prepare", desc: "Gather 2-4 snowballs and gain a small 10% Magic boost safely." },
      { title: "Legendary", desc: "Unleash a huge attack (30-60 dmg). Costs 50% Magic. Can Crit!" },
      { title: "Victory", desc: "Reduce enemy HP to 0 or reach 100% Gift Magic to win instantly!" }
    ],
    names: {
      [CharacterType.FATHER_FROST]: "Father Frost",
      [CharacterType.SANTA_CLAUS]: "Santa Claus"
    },
    moves: {
      [CharacterType.FATHER_FROST]: "Siberian Blizzard",
      [CharacterType.SANTA_CLAUS]: "Rein-Deer Rush"
    },
    actions: {
      snowball: "threw a massive snowball!",
      outOfSnow: "reached for snow but only found air!",
      gather: (found: number, gifts: number) => `gathered ${found} snowballs and claimed ${gifts}% of the Bag!`,
      special: (move: string) => `unleashed their ultimate move: ${move}!`
    }
  },
  ru: {
    title: "Зимний Поединок",
    loading: "Призыв Легенд...",
    loadingSub: "Gemini создает эпические портреты",
    turn: "ХОД",
    yourTurn: "ВАШ ХОД",
    health: "ЗДОРОВЬЕ",
    snowballs: "СНЕЖКИ",
    giftBag: "МЕШОК",
    outOfAmmo: "ПУСТО!",
    duelLog: "ЖУРНАЛ БИТВЫ",
    emptyLog: "Легенды оценивают друг друга...",
    barrage: "ОБСТРЕЛ",
    prepare: "ПОДГОТОВКА",
    legendary: "ЛЕГЕНДАРНЫЙ",
    champion: "ПОБЕДИТЕЛЬ!",
    replay: "ЗАНОВО",
    restart: "СБРОС",
    ammoCost: "1 СНЕЖОК",
    giftCost: "50 МАГИИ",
    prepareGain: "+СНЕГ/МАГИЯ",
    footer: "Битва за Вечный Мешок Подарков • Арена Северного Полюса",
    howToPlay: "Как играть",
    close: "Закрыть",
    critical: "КРИТИЧЕСКИЙ!",
    gameMode: "Режим игры",
    pvp: "Игрок против Игрока",
    pvai: "Игрок против ИИ",
    selectChar: "Выберите героя",
    rules: [
      { title: "Обстрел", desc: "Бросок снежка (5-30 ур). 15% шанс Крита. 50% урона дает Магию!" },
      { title: "Подготовка", desc: "Соберите 2-4 снежка и получите 10% Магии безопасно." },
      { title: "Легендарный", desc: "Мощный спецприем (30-60 ур). Тратит 50% Магии. Может Критовать!" },
      { title: "Победа", desc: "Снизьте ОЗ врага до 0 или наберите 100% Магии для победы!" }
    ],
    names: {
      [CharacterType.FATHER_FROST]: "Дед Мороз",
      [CharacterType.SANTA_CLAUS]: "Санта-Клаус"
    },
    moves: {
      [CharacterType.FATHER_FROST]: "Сибирская Вьюга",
      [CharacterType.SANTA_CLAUS]: "Олений Таран"
    },
    actions: {
      snowball: "бросил огромный снежок!",
      outOfSnow: "потянулся за снегом, но схватил лишь воздух!",
      gather: (found: number, gifts: number) => `собрал ${found} снежков и захватил ${gifts}% мешка!`,
      special: (move: string) => `использовал ультимативный прием: ${move}!`
    }
  }
};

const INITIAL_STATS: Record<CharacterType, CharacterStats> = {
  [CharacterType.FATHER_FROST]: {
    name: CharacterType.FATHER_FROST,
    hp: 100,
    maxHp: 100,
    snowballs: 5,
    giftProgress: 0,
    color: '#38bdf8', 
    image: '',
    specialMove: '' 
  },
  [CharacterType.SANTA_CLAUS]: {
    name: CharacterType.SANTA_CLAUS,
    hp: 100,
    maxHp: 100,
    snowballs: 5,
    giftProgress: 0,
    color: '#ef4444', 
    image: '',
    specialMove: '' 
  }
};

const AUDIO_ASSETS = {
  bgm: "https://cdn.pixabay.com/audio/2022/11/22/audio_1e30909c91.mp3",
  throw: "https://cdn.pixabay.com/audio/2022/03/15/audio_731478145e.mp3",
  impact: "https://cdn.pixabay.com/audio/2021/11/24/audio_3d1f11462a.mp3", 
  gather: "https://cdn.pixabay.com/audio/2021/11/25/audio_24a2599723.mp3",
  special: "https://cdn.pixabay.com/audio/2022/03/10/audio_f839626388.mp3",
  victory: "https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3",
  crit: "https://cdn.pixabay.com/audio/2022/03/15/audio_731478145e.mp3"
};

const RAIFFEISEN_LOGO_URL = "https://vsememy.ru/kartinki/wp-content/uploads/2023/03/1643623548_54-papik-pro-p-logotip-raiffaizenbanka-60.png";

const SnowBackground: React.FC = () => {
  const [snowflakes] = useState(() => Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 10 + 5}s`,
    size: `${Math.random() * 5 + 2}px`
  })));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {snowflakes.map(flake => (
        <div 
          key={flake.id} 
          className="snowflake"
          style={{
            left: flake.left,
            animation: `snowfall ${flake.duration} linear infinite`,
            animationDelay: flake.delay,
            fontSize: flake.size
          }}
        >
          ●
        </div>
      ))}
    </div>
  );
};

const HolidayGarland: React.FC = () => {
  const colors = ['#ef4444', '#22c55e', '#eab308', '#3b82f6'];
  const lights = Array.from({ length: 40 });
  return (
    <div className="garland">
      {lights.map((_, i) => (
        <div 
          key={i} 
          className="light" 
          style={{ 
            color: colors[i % colors.length],
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
};

const DecoratedTree: React.FC<{ sizeClass: string, colorClass: string, isSmall?: boolean }> = ({ sizeClass, colorClass, isSmall }) => (
  <div className={`relative inline-flex items-center justify-center ${sizeClass}`}>
    <i className={`fas fa-tree ${colorClass} ${sizeClass} drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]`}></i>
    {/* Star - adjusted for smaller size and better alignment on tip */}
    <i className="fas fa-star absolute -top-[10%] left-1/2 -translate-x-1/2 text-yellow-300 scale-[0.6] animate-pulse drop-shadow-[0_0_6px_gold]"></i>
    {/* Ornaments */}
    <div className={`absolute top-[35%] left-[44%] rounded-full bg-red-500 shadow-[0_0_8px_red] animate-pulse ${isSmall ? 'w-1 h-1' : 'w-2 h-2'}`}></div>
    <div className={`absolute top-[52%] left-[28%] rounded-full bg-yellow-400 shadow-[0_0_8px_gold] animate-pulse delay-100 ${isSmall ? 'w-1 h-1' : 'w-2 h-2'}`}></div>
    <div className={`absolute top-[58%] right-[28%] rounded-full bg-blue-400 shadow-[0_0_8px_cyan] animate-pulse delay-200 ${isSmall ? 'w-1 h-1' : 'w-2 h-2'}`}></div>
    <div className={`absolute top-[78%] left-[52%] -translate-x-1/2 rounded-full bg-white shadow-[0_0_8px_white] animate-pulse delay-300 ${isSmall ? 'w-1 h-1' : 'w-2 h-2'}`}></div>
  </div>
);

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ru');
  const [showInstructions, setShowInstructions] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSetup, setShowSetup] = useState(true);
  
  const [gameState, setGameState] = useState<GameState>({
    currentTurn: 1,
    activeCharacter: CharacterType.FATHER_FROST,
    players: JSON.parse(JSON.stringify(INITIAL_STATS)),
    battleLogs: [],
    winner: null,
    isNarrating: false,
    gameMode: GameMode.PVAI,
    userCharacter: CharacterType.FATHER_FROST
  });

  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [hitCharacter, setHitCharacter] = useState<CharacterType | null>(null);
  const [projectile, setProjectile] = useState<{ from: CharacterType, active: boolean } | null>(null);
  const [intro, setIntro] = useState("");
  const logEndRef = useRef<HTMLDivElement>(null);

  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const sfxThrow = useRef<HTMLAudioElement | null>(null);
  const sfxImpact = useRef<HTMLAudioElement | null>(null);
  const sfxGather = useRef<HTMLAudioElement | null>(null);
  const sfxSpecial = useRef<HTMLAudioElement | null>(null);
  const sfxVictory = useRef<HTMLAudioElement | null>(null);
  const sfxCrit = useRef<HTMLAudioElement | null>(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    bgmRef.current = new Audio(AUDIO_ASSETS.bgm);
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.4;
    sfxThrow.current = new Audio(AUDIO_ASSETS.throw);
    sfxImpact.current = new Audio(AUDIO_ASSETS.impact);
    sfxGather.current = new Audio(AUDIO_ASSETS.gather);
    sfxSpecial.current = new Audio(AUDIO_ASSETS.special);
    sfxVictory.current = new Audio(AUDIO_ASSETS.victory);
    sfxCrit.current = new Audio(AUDIO_ASSETS.crit);

    const initializeApp = async () => {
      try {
        const [introMsg, frostImg, santaImg] = await Promise.all([
          getIntroMessage(lang),
          generateAvatar(CharacterType.FATHER_FROST),
          generateAvatar(CharacterType.SANTA_CLAUS)
        ]);

        setIntro(introMsg);
        setGameState(prev => ({
          ...prev,
          players: {
            ...prev.players,
            [CharacterType.FATHER_FROST]: { 
              ...prev.players[CharacterType.FATHER_FROST], 
              image: frostImg,
              specialMove: TRANSLATIONS[lang].moves[CharacterType.FATHER_FROST]
            },
            [CharacterType.SANTA_CLAUS]: { 
              ...prev.players[CharacterType.SANTA_CLAUS], 
              image: santaImg,
              specialMove: TRANSLATIONS[lang].moves[CharacterType.SANTA_CLAUS]
            }
          }
        }));
        setIsLoadingImages(false);
      } catch (error) {
        console.error("Initialization failed:", error);
        setIsLoadingImages(false);
      }
    };
    initializeApp();

    return () => {
      bgmRef.current?.pause();
      bgmRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (bgmRef.current) bgmRef.current.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [gameState.battleLogs]);

  const playSFX = (sound: React.RefObject<HTMLAudioElement | null>) => {
    if (!isMuted && sound.current) {
      sound.current.currentTime = 0;
      sound.current.play().catch(() => {});
    }
  };

  const calculateDamage = (baseMin: number, baseMax: number) => {
    let damage = Math.floor(Math.random() * (baseMax - baseMin + 1)) + baseMin;
    const isCritical = Math.random() < 0.15; 
    if (isCritical) {
      damage = Math.floor(damage * 2.5);
    }
    return { damage, isCritical };
  };

  const handleAction = useCallback(async (actionType: 'snowball' | 'gather' | 'special') => {
    if (gameState.winner || gameState.isNarrating || isLoadingImages) return;

    if (bgmRef.current && bgmRef.current.paused && !isMuted) {
      bgmRef.current.play().catch(() => {});
    }

    setGameState(prev => ({ ...prev, isNarrating: true }));

    const actorType = gameState.activeCharacter;
    const targetType = actorType === CharacterType.FATHER_FROST ? CharacterType.SANTA_CLAUS : CharacterType.FATHER_FROST;
    const actor = { ...gameState.players[actorType] };
    const target = { ...gameState.players[targetType] };

    let damageTotal = 0;
    let isCriticalHit = false;
    let actionDesc = "";

    if (actionType === 'snowball') {
      if (actor.snowballs > 0) {
        playSFX(sfxThrow);
        setProjectile({ from: actorType, active: true });
        await new Promise(r => setTimeout(r, 600));
        setProjectile(null);
        
        const res = calculateDamage(5, 30);
        damageTotal = res.damage;
        isCriticalHit = res.isCritical;
        
        if (isCriticalHit) playSFX(sfxCrit);
        playSFX(sfxImpact);
        
        actor.snowballs -= 1;
        actor.giftProgress = Math.min(100, actor.giftProgress + Math.floor(damageTotal * 0.5));
        actionDesc = t.actions.snowball;
        
        setHitCharacter(targetType);
        setTimeout(() => setHitCharacter(null), isCriticalHit ? 1000 : 600);
      } else {
        actionDesc = t.actions.outOfSnow;
      }
    } else if (actionType === 'gather') {
      playSFX(sfxGather);
      const found = Math.floor(Math.random() * 3) + 2;
      const gifts = 10; 
      actor.snowballs = Math.min(8, actor.snowballs + found);
      actor.giftProgress = Math.min(100, actor.giftProgress + gifts);
      actionDesc = t.actions.gather(found, gifts);
    } else if (actionType === 'special') {
      if (actor.giftProgress >= 50) {
        playSFX(sfxSpecial);
        const res = calculateDamage(30, 60);
        damageTotal = res.damage;
        isCriticalHit = res.isCritical;
        
        actor.giftProgress -= 50;
        actor.giftProgress = Math.min(100, actor.giftProgress + Math.floor(damageTotal * 0.25));
        
        actionDesc = t.actions.special(actor.specialMove);
        setHitCharacter(targetType);
        setTimeout(() => setHitCharacter(null), 1000);
      } else {
        actionDesc = lang === 'ru' ? "Недостаточно праздничной магии!" : "Not enough holiday magic!";
      }
    }

    target.hp = Math.max(0, target.hp - damageTotal);
    
    const narrative = await getNarrative(
      t.names[actorType], 
      t.names[targetType], 
      `${actionDesc}${isCriticalHit ? ` (${t.critical})` : ''}`, 
      target.hp,
      lang
    );

    const newLog: BattleLog = {
      turn: gameState.currentTurn,
      actor: actorType,
      action: actionDesc,
      narrative,
      damage: damageTotal,
      isCritical: isCriticalHit
    };

    setGameState(prev => {
      const nextActive = target.hp <= 0 || actor.giftProgress >= 100 ? prev.activeCharacter : targetType;
      const winner = target.hp <= 0 ? actorType : (actor.giftProgress >= 100 ? actorType : null);

      if (winner) {
        playSFX(sfxVictory);
        bgmRef.current?.pause();
      }

      return {
        ...prev,
        currentTurn: prev.currentTurn + 1,
        activeCharacter: nextActive,
        players: {
          ...prev.players,
          [actorType]: actor,
          [targetType]: target
        },
        battleLogs: [...prev.battleLogs, newLog],
        winner,
        isNarrating: false
      };
    });
  }, [gameState, isLoadingImages, isMuted, lang, t]);

  // AI Logic
  useEffect(() => {
    if (gameState.gameMode === GameMode.PVAI && 
        gameState.activeCharacter !== gameState.userCharacter && 
        !gameState.winner && 
        !gameState.isNarrating && 
        !isLoadingImages) {
      
      const aiTimer = setTimeout(() => {
        const actor = gameState.players[gameState.activeCharacter];
        
        // AI Decision
        if (actor.giftProgress >= 50 && Math.random() > 0.3) {
          handleAction('special');
        } else if (actor.snowballs > 0 && Math.random() > 0.4) {
          handleAction('snowball');
        } else {
          handleAction('gather');
        }
      }, 1500);

      return () => clearTimeout(aiTimer);
    }
  }, [gameState, handleAction, isLoadingImages]);

  const startGame = (mode: GameMode, char: CharacterType) => {
    setShowSetup(false);
    setGameState(prev => ({
      ...prev,
      gameMode: mode,
      userCharacter: char,
      activeCharacter: CharacterType.FATHER_FROST,
      players: JSON.parse(JSON.stringify({
        ...INITIAL_STATS,
        [CharacterType.FATHER_FROST]: { ...INITIAL_STATS[CharacterType.FATHER_FROST], image: prev.players[CharacterType.FATHER_FROST].image, specialMove: TRANSLATIONS[lang].moves[CharacterType.FATHER_FROST] },
        [CharacterType.SANTA_CLAUS]: { ...INITIAL_STATS[CharacterType.SANTA_CLAUS], image: prev.players[CharacterType.SANTA_CLAUS].image, specialMove: TRANSLATIONS[lang].moves[CharacterType.SANTA_CLAUS] }
      }))
    }));
    if (bgmRef.current && !isMuted) {
      bgmRef.current.currentTime = 0;
      bgmRef.current.play().catch(() => {});
    }
  };

  const resetGame = () => {
    setShowSetup(true);
    setGameState(prev => ({
      ...prev,
      winner: null,
      currentTurn: 1,
      battleLogs: []
    }));
  };

  if (isLoadingImages) {
    return (
      <div className="h-screen w-screen snow-bg flex flex-col items-center justify-center p-6 text-center">
        <SnowBackground />
        <div className="z-10 flex flex-col items-center gap-8">
          <div className="relative">
            <i className="fas fa-snowflake text-6xl text-sky-400 animate-spin-slow"></i>
            <i className="fas fa-wand-sparkles absolute -top-4 -right-4 text-3xl text-yellow-400 animate-pulse"></i>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold holiday-font text-white mb-4">{t.loading}</h1>
            <p className="text-sky-200 animate-pulse italic">{t.loadingSub}</p>
          </div>
          <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-sky-400 animate-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen snow-bg flex flex-col p-3 md:p-6 overflow-hidden relative">
      <SnowBackground />
      <HolidayGarland />
      
      {/* Top Bar */}
      <div className="absolute top-4 left-4 z-50 flex items-center gap-3">
        <img src={RAIFFEISEN_LOGO_URL} alt="Raiffeisen Bank" className="h-8 md:h-12 object-contain filter drop-shadow-md" />
      </div>

      <div className="absolute top-4 right-4 z-50 flex gap-2 items-center">
        <button onClick={() => setIsMuted(!isMuted)} className="glass-card w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/20">
          <i className={`fas ${isMuted ? 'fa-volume-xmark' : 'fa-volume-high'} text-[10px] md:text-xs text-white`}></i>
        </button>
        <button onClick={() => setShowInstructions(true)} className="glass-card w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/20">
          <i className="fas fa-question text-[10px] md:text-xs text-white"></i>
        </button>
        <button onClick={resetGame} className="glass-card w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/20">
          <i className="fas fa-cog text-[10px] md:text-xs text-white"></i>
        </button>
        <button onClick={() => setLang(prev => prev === 'en' ? 'ru' : 'en')} className="glass-card px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all border border-white/20 min-w-[40px] md:min-w-[50px]">
          {lang === 'en' ? 'RU' : 'EN'}
        </button>
      </div>

      {/* Setup Overlay */}
      {showSetup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-500">
           <div className="glass-card max-w-xl w-full p-6 md:p-10 border-white/20 text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold holiday-font text-white drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">{t.title}</h2>
              
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.2em] text-sky-300 font-bold">{t.gameMode}</p>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setGameState(prev => ({...prev, gameMode: GameMode.PVAI}))}
                    className={`py-3 rounded-xl border-2 transition-all font-bold text-sm ${gameState.gameMode === GameMode.PVAI ? 'border-sky-400 bg-sky-500/20 text-white' : 'border-white/10 text-white/40 hover:border-white/30'}`}
                  >
                    <i className="fas fa-robot mb-2 block text-xl"></i>
                    {t.pvai}
                  </button>
                  <button 
                    onClick={() => setGameState(prev => ({...prev, gameMode: GameMode.PVP}))}
                    className={`py-3 rounded-xl border-2 transition-all font-bold text-sm ${gameState.gameMode === GameMode.PVP ? 'border-red-400 bg-red-500/20 text-white' : 'border-white/10 text-white/40 hover:border-white/30'}`}
                  >
                    <i className="fas fa-user-friends mb-2 block text-xl"></i>
                    {t.pvp}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.2em] text-yellow-300 font-bold">{t.selectChar}</p>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => startGame(gameState.gameMode, CharacterType.FATHER_FROST)} className="group relative rounded-2xl overflow-hidden aspect-square border-2 border-white/10 hover:border-sky-400 transition-all">
                    <img src={gameState.players[CharacterType.FATHER_FROST].image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                      <span className="text-white font-bold text-xs">{t.names[CharacterType.FATHER_FROST]}</span>
                    </div>
                  </button>
                  <button onClick={() => startGame(gameState.gameMode, CharacterType.SANTA_CLAUS)} className="group relative rounded-2xl overflow-hidden aspect-square border-2 border-white/10 hover:border-red-400 transition-all">
                    <img src={gameState.players[CharacterType.SANTA_CLAUS].image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                      <span className="text-white font-bold text-xs">{t.names[CharacterType.SANTA_CLAUS]}</span>
                    </div>
                  </button>
                </div>
              </div>
           </div>
        </div>
      )}

      {showInstructions && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="glass-card max-w-lg w-full p-6 md:p-8 relative border-white/20 shadow-2xl">
            <button onClick={() => setShowInstructions(false)} className="absolute top-4 right-4 text-white/50 hover:text-white"><i className="fas fa-times text-xl"></i></button>
            <h2 className="text-3xl font-bold holiday-font text-sky-300 mb-6 text-center">{t.howToPlay}</h2>
            <div className="space-y-4 md:space-y-6">
              {t.rules.map((rule, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center text-sky-400 font-bold border border-white/10 text-xs md:text-sm">{idx + 1}</div>
                  <div>
                    <h3 className="font-bold text-white mb-0.5 md:mb-1 uppercase text-[10px] md:text-xs tracking-wide">{rule.title}</h3>
                    <p className="text-white/60 text-[10px] md:text-xs leading-relaxed">{rule.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowInstructions(false)} className="w-full mt-6 md:mt-8 bg-sky-500 hover:bg-sky-400 text-white font-bold py-2.5 md:py-3 rounded-xl text-sm">{t.close}</button>
          </div>
        </div>
      )}
      
      <header className="z-20 text-center mb-4 md:mb-8 relative pt-8 md:pt-2">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-10 opacity-30 pointer-events-none items-end">
          <DecoratedTree sizeClass="text-5xl" colorClass="text-green-900" isSmall={true} />
          <DecoratedTree sizeClass="text-7xl" colorClass="text-green-800" />
          <DecoratedTree sizeClass="text-5xl" colorClass="text-green-900" isSmall={true} />
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold holiday-font text-white drop-shadow-2xl mb-1 flex items-center justify-center gap-3">
          <div className="hidden sm:block">
            <DecoratedTree sizeClass="text-4xl md:text-6xl" colorClass="text-green-600" />
          </div>
          <span className="relative px-2">
             <i className="fas fa-snowflake absolute -top-2 -left-8 text-xs text-sky-300/30 animate-pulse"></i>
             {t.title}
             <i className="fas fa-snowflake absolute -top-2 -right-8 text-xs text-sky-300/30 animate-pulse"></i>
          </span>
          <div className="hidden sm:block">
            <DecoratedTree sizeClass="text-4xl md:text-6xl" colorClass="text-green-600" />
          </div>
        </h1>
        <p className="text-sky-300 text-[10px] md:text-sm italic max-w-xl mx-auto opacity-90 px-4 line-clamp-1 h-5">{intro}</p>
      </header>

      <main className="z-10 flex-1 flex flex-col lg:flex-row gap-4 md:gap-6 items-center justify-between max-w-screen-2xl mx-auto w-full px-2 md:px-12 relative overflow-y-auto lg:overflow-visible pb-20 lg:pb-0">
        {projectile?.active && (
          <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
            <div className={`w-8 h-8 bg-white rounded-full blur-[2px] shadow-[0_0_20px_#fff] ${projectile.from === CharacterType.FATHER_FROST ? 'snowball-ltr' : 'snowball-rtl'}`}>
              <div className="w-full h-full animate-spin flex items-center justify-center opacity-50"><i className="fas fa-snowflake text-sky-400 text-xs"></i></div>
            </div>
          </div>
        )}

        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <CharacterDisplay 
            stats={gameState.players[CharacterType.FATHER_FROST]} 
            isActive={gameState.activeCharacter === CharacterType.FATHER_FROST && !gameState.winner} 
            isHit={hitCharacter === CharacterType.FATHER_FROST} 
            isAI={gameState.gameMode === GameMode.PVAI && gameState.userCharacter !== CharacterType.FATHER_FROST}
            lang={lang} 
          />
        </div>

        <div className="w-full lg:w-1/4 flex flex-col gap-4 self-stretch justify-center max-w-md mx-auto">
          <div className="glass-card flex-1 min-h-[120px] max-h-[200px] md:max-h-[250px] overflow-hidden flex flex-col">
            <div className="p-2 border-b border-white/10 text-[8px] md:text-[9px] font-bold uppercase text-white/40 tracking-widest flex justify-between bg-white/5">
              <span>{t.duelLog}</span>
              <span>{t.turn} {gameState.currentTurn}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar text-[10px] md:text-xs">
              {gameState.battleLogs.length === 0 && <p className="text-center text-white/20 italic py-6">{t.emptyLog}</p>}
              {gameState.battleLogs.slice(-5).map((log, i) => (
                <div key={i} className="animate-in slide-in-from-bottom duration-300">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-bold text-[9px] md:text-[10px]" style={{ color: gameState.players[log.actor].color }}>{t.names[log.actor]}</span>
                    {log.damage! > 0 && (
                      <span className={`${log.isCritical ? 'text-yellow-400 text-sm font-black animate-pulse' : 'text-red-400 font-bold'}`}>
                        {log.isCritical && '★'} -{log.damage}
                      </span>
                    )}
                  </div>
                  <p className={`leading-relaxed font-light italic ${log.isCritical ? 'text-white font-medium' : 'text-white/80'}`}>
                    "{log.narrative}"
                  </p>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>

          {!gameState.winner ? (
            <div className={`glass-card p-3 md:p-4 flex flex-col gap-2 transition-opacity duration-300 ${
              (gameState.gameMode === GameMode.PVAI && gameState.activeCharacter !== gameState.userCharacter) ? 'opacity-50 pointer-events-none' : 'opacity-100'
            }`}>
              <div className="grid grid-cols-1 gap-2">
                <button onClick={() => handleAction('snowball')} disabled={gameState.isNarrating || gameState.players[gameState.activeCharacter].snowballs === 0} className="bg-sky-500/20 hover:bg-sky-500/40 disabled:opacity-30 py-2.5 md:py-3 px-4 rounded-xl border border-sky-400/30 flex items-center justify-between group">
                  <span className="flex items-center gap-2 font-bold text-xs md:text-sm"><i className="fas fa-snowflake group-hover:rotate-180 transition-transform"></i>{t.barrage}</span>
                  <span className="text-[8px] md:text-[10px] opacity-60 uppercase">{t.ammoCost}</span>
                </button>
                <button onClick={() => handleAction('gather')} disabled={gameState.isNarrating} className="bg-yellow-500/20 hover:bg-yellow-500/40 disabled:opacity-30 py-2.5 md:py-3 px-4 rounded-xl border border-yellow-400/30 flex items-center justify-between">
                  <span className="flex items-center gap-2 font-bold text-xs md:text-sm"><i className="fas fa-hand-holding-hand"></i>{t.prepare}</span>
                  <span className="text-[8px] md:text-[10px] opacity-60 uppercase">{t.prepareGain}</span>
                </button>
                <button onClick={() => handleAction('special')} disabled={gameState.isNarrating || gameState.players[gameState.activeCharacter].giftProgress < 50} className="bg-purple-600/30 hover:bg-purple-600/50 disabled:opacity-30 py-2.5 md:py-3 px-4 rounded-xl border border-purple-500/40 flex items-center justify-between">
                  <span className="flex items-center gap-2 font-bold text-xs md:text-sm"><i className="fas fa-magic"></i>{t.legendary}</span>
                  <span className="text-[8px] md:text-[10px] opacity-60 uppercase">{t.giftCost}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-card p-6 text-center flex flex-col gap-3 animate-in fade-in zoom-in duration-700 bg-yellow-400/10 border-yellow-400/50">
               <h2 className="text-xl md:text-2xl font-bold holiday-font text-yellow-400">{t.champion}</h2>
               <p className="text-lg md:text-xl font-bold text-white uppercase tracking-tighter">{t.names[gameState.winner]}</p>
               <button onClick={resetGame} className="bg-yellow-400 hover:bg-white text-blue-900 font-bold py-2 px-6 rounded-lg shadow-lg active:scale-95 text-sm">{t.replay}</button>
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <CharacterDisplay 
            stats={gameState.players[CharacterType.SANTA_CLAUS]} 
            isActive={gameState.activeCharacter === CharacterType.SANTA_CLAUS && !gameState.winner} 
            isHit={hitCharacter === CharacterType.SANTA_CLAUS} 
            isAI={gameState.gameMode === GameMode.PVAI && gameState.userCharacter !== CharacterType.SANTA_CLAUS}
            isFlipped={true} 
            lang={lang} 
          />
        </div>
      </main>

      <footer className="z-20 p-2 md:p-4 text-center text-[8px] md:text-[10px] text-white/30 uppercase tracking-[0.2em]">{t.footer}</footer>
    </div>
  );
};

export default App;
