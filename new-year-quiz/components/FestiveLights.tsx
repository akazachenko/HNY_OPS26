import React from 'react';

const FestiveLights: React.FC = () => {
  // Генерация 20 лампочек
  const lights = Array.from({ length: 20 });

  return (
    <div className="fixed top-0 inset-x-0 h-20 z-40 pointer-events-none overflow-hidden flex justify-around px-2">
      {/* Имитация провода с помощью SVG для плавного изгиба */}
      <svg className="absolute top-0 left-0 w-full h-10" preserveAspectRatio="none">
         <path d="M0,0 Q50,20 100,0 T200,0 T300,0 T400,0 T500,0 T600,0 T700,0 T800,0 T900,0 T1000,0 T1100,0 T1200,0 T1300,0 T1400,0 T1500,0 T1600,0 T1700,0 T1800,0 T1900,0 T2000,0" 
               stroke="#4B5563" strokeWidth="2" fill="none" className="opacity-80" />
      </svg>

      {lights.map((_, i) => (
        <div key={i} className="relative flex flex-col items-center animate-swing origin-top"
             style={{ 
               animationDelay: `${Math.random() * 2}s`,
               animationDuration: `${3 + Math.random()}s`
             }}>
           {/* Цоколь */}
           <div className="w-2 h-3 bg-gray-800 z-10"></div>
           {/* Лампочка */}
           <div 
             className={`w-4 h-6 rounded-full z-10 animate-glow ${
               ['bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]', 
                'bg-raif-yellow shadow-[0_0_15px_rgba(254,230,0,0.6)]', 
                'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]', 
                'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]'][i % 4]
             }`}
             style={{ 
               animationDuration: `${1 + Math.random()}s` 
             }}
           >
             {/* Блик */}
             <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white opacity-40 rounded-full"></div>
           </div>
        </div>
      ))}
      <style>{`
        @keyframes glow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.95); }
        }
        @keyframes swing {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-swing {
          animation: swing 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FestiveLights;