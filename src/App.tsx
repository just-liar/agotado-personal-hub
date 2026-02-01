
import React from 'react';
import BackgroundAnimation from './components/BackgroundAnimation';
import StudyPlan from './components/StudyPlan';
import StudyProgress from './components/StudyProgress';
import DailyQuiz from './components/DailyQuiz';
import CountdownQuote from './components/CountdownQuote';
import MinimalDock from './components/MinimalDock';

const App: React.FC = () => {
  return (
    <div className="min-h-screen relative flex flex-col items-center pt-8 pb-24 px-6 sm:px-12 selection:bg-indigo-500/10">
      <BackgroundAnimation />

      <main className="relative z-10 w-full max-w-5xl mt-24">
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
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
