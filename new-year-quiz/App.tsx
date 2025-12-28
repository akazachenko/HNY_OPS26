import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import AudioPlayer from './components/AudioPlayer';
import Snowfall from './components/Snowfall';
import FestiveLights from './components/FestiveLights';
import { QUESTIONS } from './constants';

function App() {
  const [gameState, setGameState] = useState<'welcome' | 'quiz' | 'result'>('welcome');
  const [score, setScore] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const startQuiz = () => {
    setGameState('quiz');
    setIsMusicPlaying(true); // Attempt to auto-start music on first interaction
  };

  const finishQuiz = (finalScore: number) => {
    setScore(finalScore);
    setGameState('result');
  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div className="min-h-screen bg-raif-black text-white overflow-hidden relative selection:bg-raif-yellow selection:text-black font-sans">
      
      {/* Atmosphere Layers */}
      <FestiveLights />
      <Snowfall />
      
      {/* Music Control */}
      <AudioPlayer isPlaying={isMusicPlaying} onToggle={toggleMusic} />

      {/* Game Screens */}
      <div className="relative z-10 w-full h-full pt-12">
        {gameState === 'welcome' && (
          <WelcomeScreen onStart={startQuiz} />
        )}

        {gameState === 'quiz' && (
          <QuizScreen onComplete={finishQuiz} />
        )}

        {gameState === 'result' && (
          <ResultScreen score={score} totalQuestions={QUESTIONS.length} />
        )}
      </div>
    </div>
  );
}

export default App;