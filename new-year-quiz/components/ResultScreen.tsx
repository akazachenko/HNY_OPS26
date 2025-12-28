import React, { useEffect, useState } from 'react';
import { RESULTS } from '../constants';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, totalQuestions }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simple fade in effect
    setTimeout(() => setShowContent(true), 100);
  }, []);

  // Determine message based on score
  const resultData = [...RESULTS].reverse().find(r => score >= r.minScore) || RESULTS[0];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full max-w-4xl mx-auto p-4 z-10 relative overflow-y-auto bg-raif-black">
      
      <div className={`w-full max-w-2xl transform transition-all duration-1000 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        {/* Score Header */}
        <div className="text-center mb-10">
           <div className="inline-block relative">
              <span className="text-8xl font-black text-raif-yellow block leading-none">{score}</span>
              <span className="text-2xl font-bold text-gray-500 block uppercase tracking-widest">из {totalQuestions}</span>
           </div>
           <h2 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-4">{resultData.title}</h2>
           <p className="text-gray-400 text-lg">{resultData.message}</p>
        </div>

        {/* Corporate Postcard */}
        <div className="bg-white rounded-sm overflow-hidden shadow-2xl mb-10">
          <div className="h-2 bg-raif-yellow w-full"></div>
          <div className="p-8 md:p-10 text-black">
            <div className="flex justify-between items-start mb-6">
               <div>
                  <h3 className="text-2xl font-extrabold uppercase tracking-wide">RAIFFEISEN BANK</h3>
                  <p className="text-sm font-semibold text-gray-500">Securities Settlements</p>
               </div>
               <div className="w-12 h-12 bg-raif-yellow flex items-center justify-center text-black">
                  <i className="fas fa-snowflake text-2xl"></i>
               </div>
            </div>
            
            <div className="space-y-4 font-medium text-lg text-gray-800 leading-relaxed">
               <p>
                 <span className="font-bold">Дорогие коллеги!</span>
               </p>
               <p>
                 Спасибо за каждый совместный проект, написанный код, решенный баг и выпитую вместе чашку кофе. 
                 Пусть в новом году наши проекты взлетают, а рабочие чаты пестрят только приятными новостями!
               </p>
               <p>
                 Желаем всем счастья, здоровья и баланса между <span className="bg-raif-yellow px-1">WORK</span> и <span className="bg-black text-white px-1">LIFE</span>!
               </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
               <p className="font-festive text-2xl text-raif-yellow bg-black px-4 py-1 transform -rotate-2 inline-block">С Новым 2026 Годом!</p>
               <div className="text-right text-xs text-gray-400 font-sans">
                  CREATED BY<br/>SECURITIES SETTLEMENTS
               </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4 text-center">
            <button onClick={() => window.location.reload()} className="px-8 py-3 bg-raif-yellow hover:bg-white text-black font-bold uppercase tracking-wider transition-colors rounded-sm">
              <i className="fas fa-redo mr-2"></i> Попробовать снова
            </button>
             <button className="px-8 py-3 border-2 border-gray-700 hover:border-raif-yellow text-white hover:text-raif-yellow font-bold uppercase tracking-wider transition-colors rounded-sm">
              <i className="fas fa-share-alt mr-2"></i> Поделиться
            </button>
        </div>

      </div>
    </div>
  );
};

export default ResultScreen;