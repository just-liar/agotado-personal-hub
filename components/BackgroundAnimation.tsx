
import React from 'react';

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#f5f5f7]">
      {/* Indigo glow */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-400/10 blur-[100px]"
        style={{ animation: 'pulse 12s infinite alternate' }}
      ></div>
      {/* Powder Pink glow */}
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-pink-200/20 blur-[100px]"
        style={{ animation: 'pulse 18s infinite alternate-reverse' }}
      ></div>
      {/* Sky Blue glow */}
      <div 
        className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-sky-300/10 blur-[100px]"
        style={{ animation: 'pulse 15s infinite alternate' }}
      ></div>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.3); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default BackgroundAnimation;
