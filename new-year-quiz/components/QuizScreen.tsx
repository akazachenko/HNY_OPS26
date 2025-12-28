import React, { useState, useEffect } from 'react';
import { QUESTIONS } from '../constants';
import { Question } from '../types';
import { QuestionVisual } from './QuestionAnimations';

interface QuizScreenProps {
  onComplete: (score: number) => void;
}

const TIMER_SECONDS = 15;

const QuizScreen: React.FC<QuizScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [isPaused, setIsPaused] = useState(false);

  const currentQuestion: Question = QUESTIONS[currentIndex];

  useEffect(() => {
    if (isPaused) return;

    if (timeLeft === 0) {
      handleTimeOut();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPaused]);

  // Reset timer on new question
  useEffect(() => {
     setTimeLeft(TIMER_SECONDS);
     setIsPaused(false);
  }, [currentIndex]);

  const handleTimeOut = () => {
    setIsPaused(true);
    setSelectedOption('TIMEOUT'); 
  };

  const handleAnswer = (optionId: string) => {
    if (selectedOption) return; // Prevent double click

    setIsPaused(true);
    setSelectedOption(optionId);
    
    if (optionId === currentQuestion.correctOptionId) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      onComplete(score);
    }
  };

  // Calculate progress
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
      
      {/* Dynamic Background Image with Fade Effect */}
      <div 
        key={currentQuestion.id}
        className="absolute inset-0 z-0 opacity-40 transition-opacity duration-1000 ease-in-out"
        style={{
           backgroundImage: `url(${currentQuestion.backgroundImage})`,
           backgroundSize: 'cover',
           backgroundPosition: 'center',
        }}
      ></div>
      {/* Heavy overlay for readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-raif-black via-raif-black/95 to-raif-black/90"></div>

      <div className="relative z-10 w-full max-w-3xl px-6 py-4 flex flex-col items-center">
        
        {/* Animated Visual Header */}
        <div className="mb-6 w-full flex justify-center h-32 items-center">
           <QuestionVisual questionId={currentQuestion.id} />
        </div>

        {/* Question Content */}
        <div className="w-full">
            <div className="flex justify-between items-end mb-6 border-b border-gray-700 pb-4">
                <div>
                   <p className="text-raif-yellow font-bold text-sm tracking-widest uppercase mb-1">Вопрос {currentIndex + 1}/{QUESTIONS.length}</p>
                   <h2 className="text-white text-2xl md:text-3xl font-extrabold leading-tight shadow-black drop-shadow-lg">
                      {currentQuestion.text}
                   </h2>
                </div>
                <div className="flex flex-col items-end min-w-[70px] ml-4">
                   <div className={`text-xl font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                      {timeLeft}<span className="text-sm font-normal text-gray-400">c</span>
                   </div>
                   <div className="w-full bg-gray-800 h-1 mt-2 rounded-full">
                      <div className="bg-raif-yellow h-1 rounded-full transition-all duration-500" style={{width: `${progress}%`}}></div>
                   </div>
                </div>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 gap-3 mb-6">
              {currentQuestion.options.map((option) => {
                let btnClass = "bg-transparent border-2 border-gray-600 text-white hover:border-raif-yellow hover:text-raif-yellow"; // Default
                let markerClass = "bg-gray-700 text-gray-300";

                if (selectedOption) {
                  if (option.id === currentQuestion.correctOptionId) {
                    // Correct
                    btnClass = "bg-raif-yellow border-raif-yellow text-black";
                    markerClass = "bg-black text-white";
                  } else if (option.id === selectedOption) {
                    // Wrong Selected
                    btnClass = "bg-red-600 border-red-600 text-white";
                    markerClass = "bg-red-800 text-white";
                  } else {
                    // Others
                    btnClass = "border-gray-800 text-gray-600 opacity-50 cursor-not-allowed";
                    markerClass = "bg-gray-800 text-gray-600";
                  }
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(option.id)}
                    disabled={selectedOption !== null}
                    className={`
                      relative p-4 rounded-sm text-left transition-all duration-200
                      flex items-center group font-bold text-lg
                      ${btnClass}
                      ${!selectedOption && 'hover:bg-gray-800/50'}
                    `}
                  >
                    <div className={`
                      w-8 h-8 flex items-center justify-center mr-4 text-sm font-black flex-shrink-0 transition-colors
                      ${markerClass}
                    `}>
                      {option.id.toUpperCase()}
                    </div>
                    <span className="flex-grow text-base md:text-lg">{option.text}</span>
                    
                    {/* Result Indicator */}
                    {selectedOption && option.id === currentQuestion.correctOptionId && (
                       <div className="absolute right-5 w-8 h-8 bg-black rounded-full flex items-center justify-center">
                         <i className="fas fa-check text-raif-yellow"></i>
                       </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action Button */}
            <div className="h-14 flex items-center justify-center md:justify-end">
              {selectedOption && (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-white text-black font-bold text-lg hover:bg-raif-yellow transition-colors duration-200 shadow-xl flex items-center rounded-sm"
                >
                  {currentIndex < QUESTIONS.length - 1 ? 'ДАЛЬШЕ' : 'К РЕЗУЛЬТАТАМ'} 
                  <i className="fas fa-arrow-right ml-3"></i>
                </button>
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;