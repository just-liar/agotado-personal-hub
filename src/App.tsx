
import React, { useState, useEffect } from 'react';
import BackgroundAnimation from './components/BackgroundAnimation';
import StudyPlan from './components/StudyPlan';
import StudyProgress from './components/StudyProgress';
import DailyQuiz from './components/DailyQuiz';
import CountdownQuote from './components/CountdownQuote';
import MinimalDock from './components/MinimalDock';

const App: React.FC = () => {
  const [uptime, setUptime] = useState("0d 0h 0m");

  useEffect(() => {
    const start = new Date('2024-01-01').getTime();
    const update = () => {
      const now = new Date().getTime();
      const diff = now - start;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setUptime(`${days}d ${hours}h ${mins}m`);
    };
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col items-center pt-8 pb-24 px-6 sm:px-12 selection:bg-indigo-500/10">
      <BackgroundAnimation />

      <nav className="relative z-20 w-full max-w-6xl flex justify-between items-center mb-24 py-8">
        <div className="text-xl font-bold tracking-tighter text-[#1d1d1f] hover:opacity-70 transition-opacity cursor-default">Agotado.</div>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-black/5 backdrop-blur-md text-[11px] font-bold text-[#1d1d1f] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)] animate-pulse"></span>
            System Online
          </div>
          <div className="text-[11px] font-bold text-[#86868b] tracking-[0.2em] uppercase opacity-80">
            Runtime {uptime}
          </div>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-40">
          <div className="mb-20"> {/* Increased margin from title */}
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#4F46E5] via-[#6366F1] to-[#818CF8]">
                Agotado.xyz
              </span>
            </h1>
          </div>

          <div className="max-w-3xl mx-auto space-y-0"> {/* Removed space between these two lines */}
            <p className="text-2xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#6366F1] via-[#FBCFE8] to-[#7DD3FC]">
              创造简单
            </p>
            <h2 className="text-2xl md:text-4xl font-semibold leading-[1.3] tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#818CF8] via-[#F9A8D4] to-[#38BDF8] saturate-125">
                专注于构建高效、美观、有温度的数字体验
              </span>
            </h2>
          </div>

          <CountdownQuote />
        </div>

        {/* Study Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-40 min-h-[500px]">
          <StudyProgress />
          <DailyQuiz />
        </div>

        <StudyPlan />

        <MinimalDock />

        {/* Footer */}
        <footer className="text-[#86868b] text-[12px] font-medium border-t border-black/5 pt-12 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-2">
              <p className="text-[#1d1d1f] font-bold tracking-tight">© {new Date().getFullYear()} Agotado.</p>
              <div className="flex items-center gap-4 opacity-70 hover:opacity-100 transition-opacity">
                 <a href="https://beian.miit.gov.cn/" className="hover:text-indigo-500">蜀ICP备xxxxxxxx号</a>
              </div>
            </div>
            
            {/* Social Links moved here */}
            <div className="flex items-center gap-10">
              <a href="https://github.com" target="_blank" className="text-[#1d1d1f]/40 hover:text-indigo-500 transition-all hover:-translate-y-1 text-xl">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="text-[#1d1d1f]/40 hover:text-pink-400 transition-all hover:-translate-y-1 text-xl">
                <i className="fab fa-weixin"></i>
              </a>
              <a href="#" className="text-[#1d1d1f]/40 hover:text-sky-400 transition-all hover:-translate-y-1 text-xl">
                <i className="fas fa-envelope"></i>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 opacity-60">
              <span className="flex items-center gap-2">
                <i className="fas fa-microchip text-[10px]"></i> 1Panel Stack
              </span>
              <span className="flex items-center gap-2">
                <i className="fas fa-terminal text-[10px]"></i> Ubuntu Node
              </span>
              <span className="flex items-center gap-2">
                <i className="fas fa-shield-halved text-[10px]"></i> SSL Secured
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
