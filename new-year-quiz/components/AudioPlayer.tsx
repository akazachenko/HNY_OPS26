import React, { useState, useEffect, useRef } from 'react';

const AudioPlayer: React.FC<{ isPlaying: boolean; onToggle: () => void }> = ({ isPlaying, onToggle }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Upbeat Jingle Bells Jazz version for better quiz mood
    audioRef.current = new Audio('https://cdn.pixabay.com/audio/2022/10/21/audio_3497b7b138.mp3'); 
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Audio playback waiting for interaction", error);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <button 
      onClick={onToggle}
      className={`fixed top-6 right-6 z-50 p-3 md:p-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(254,230,0,0.3)] border-2 hover:scale-110 active:scale-95 ${
        isPlaying 
          ? 'bg-raif-yellow text-black border-raif-yellow ring-4 ring-raif-yellow/20' 
          : 'bg-black/60 backdrop-blur-sm text-white border-white/30 hover:bg-raif-yellow hover:text-black hover:border-raif-yellow'
      }`}
      title={isPlaying ? "Выключить музыку" : "Включить музыку"}
    >
      <div className={`relative w-6 h-6 flex items-center justify-center`}>
        {isPlaying ? (
           <>
             <i className="fas fa-music text-xl animate-[bounce_1.5s_infinite]"></i>
             <div className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
             </div>
           </>
        ) : (
           <i className="fas fa-volume-mute text-xl"></i>
        )}
      </div>
    </button>
  );
};

export default AudioPlayer;