import React from 'react';

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-pink-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-sky-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '4s' }}></div>
    </div>
  );
};

export default BackgroundAnimation;
