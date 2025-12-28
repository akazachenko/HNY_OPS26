
import React, { useState, useEffect, useRef } from 'react';

const MusicPlayer: React.FC<{ triggerStart?: boolean }> = ({ triggerStart }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // User provided direct MP3 link for "Wham! - Last Christmas"
  const festiveTrack = "https://fine.sunproxy.net/file/SU96ZU9iWDBFeHJTM3l6T3I0TXZyZ2l3eWFiYVF0dHlvc1NUcGR2RWgySmllaWpBZ2MzQnRoSHUyRFJlWEQzUzV2YytWbS9lR1pYUHhzNFROZS8rRlFmVUtrU1lhV1NRLzJhc3I3ei9Jalk9/Wham_-_Last_Christmas_(SkySound.cc).mp3";

  useEffect(() => {
    if (triggerStart && audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => {
        console.log("Autoplay blocked or failed, waiting for direct interaction", e);
      });
    }
  }, [triggerStart]);

  const toggleMusic = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio playback failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-50 flex items-center gap-3 bg-black/60 backdrop-blur-xl p-2 pl-4 rounded-full border border-[#fee600]/30 hover:border-[#fee600]/60 transition-all group shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col">
        <span className="text-[8px] text-[#fee600] font-bold tracking-[0.2em] uppercase opacity-80">Raiffeisen</span>
        <div className="flex flex-col">
          <span className="text-[10px] text-white font-bold tracking-widest uppercase hidden group-hover:block animate-fadeIn">Wham! - Last Christmas</span>
          <span className="text-[7px] text-gray-500 uppercase tracking-tighter hidden group-hover:block">
            Festive Mood
          </span>
        </div>
      </div>
      <button 
        onClick={toggleMusic}
        className="w-10 h-10 rounded-full raiffeisen-bg-yellow text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <div className="flex gap-1 items-end h-3">
             <div className="w-1 bg-black animate-[music-bar_0.8s_ease-in-out_infinite] h-full"></div>
             <div className="w-1 bg-black animate-[music-bar_1.1s_ease-in-out_infinite] h-2"></div>
             <div className="w-1 bg-black animate-[music-bar_0.9s_ease-in-out_infinite] h-3"></div>
          </div>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5V19L19 12L8 5Z" />
          </svg>
        )}
      </button>
      <audio ref={audioRef} src={festiveTrack} loop />
      
      <style>{`
        @keyframes music-bar {
          0%, 100% { height: 30%; }
          50% { height: 100%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
