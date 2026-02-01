import React, { useState, useEffect } from 'react';

interface Quote {
  content: string;
  source?: string;
}

const QUOTES: Quote[] = [
  { content: "Stay hungry, stay foolish.", source: "求知若饥，虚心若愚。" },
  { content: "Talk is cheap. Show me the code.", source: "空谈误国，实干兴邦 (代码见真章)。" },
  { content: "Simplicity is the ultimate sophistication.", source: "至繁归于至简。" },
  { content: "The best way to predict the future is to create it.", source: "预测未来最好的方式就是去创造它。" },
  { content: "Done is better than perfect.", source: "完成比完美更重要。" },
  { content: "Code never lies, comments sometimes do.", source: "代码不撒谎，注释偶尔会。" },
  { content: "靡不有初，鲜克有终。", source: "All things have a beginning, but few have a good end." },
  { content: "路漫漫其修远兮，吾将上下而求索。", source: "The road ahead is long and hard, yet I will search high and low." },
  { content: "不积跬步，无以至千里。", source: "No accumulation of steps, no reaching a thousand miles." },
  { content: "种一棵树最好的时间是十年前，其次是现在。", source: "The best time to plant a tree was 10 years ago. The second best time is now." },
  { content: "It always seems impossible until it's done.", source: "事情在完成之前，看似不可能。" },
  { content: "Believe you can and you're halfway there.", source: "相信你能做到，你就已经成功了一半。" },
  { content: "Keep looking up... that's the secret of life.", source: "仰望星空……这就是生活的秘密。" },
  { content: "Every moment is a fresh beginning.", source: "每一刻都是崭新的开始。" },
  { content: "星光不问赶路人，时光不负有心人。", source: "Stars don't ask the traveler; time doesn't fail the aspirant." }
];

const TARGET_DATE = new Date('2025-12-26T00:00:00').getTime();

const CountdownQuote: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [currentQuote, setCurrentQuote] = useState<Quote>(QUOTES[0]);
  const [isHovered, setIsHovered] = useState(false);

  // 倒计时逻辑
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        };
      }
      return { days: 0, hours: 0, minutes: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // 每分钟更新一次即可

    return () => clearInterval(timer);
  }, []);

  // 每日激励语初始化
  useEffect(() => {
    const today = new Date().toDateString();
    let seed = 0;
    for (let i = 0; i < today.length; i++) {
      seed += today.charCodeAt(i);
    }
    const dailyIndex = seed % QUOTES.length;
    setCurrentQuote(QUOTES[dailyIndex]);
  }, []);

  // 切换激励语
  const handleSwitchQuote = (e: React.MouseEvent) => {
    e.stopPropagation(); // 防止冒泡（虽然目前没有父级点击事件，好习惯）
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * QUOTES.length);
    } while (QUOTES[newIndex].content === currentQuote.content && QUOTES.length > 1);
    setCurrentQuote(QUOTES[newIndex]);
  };

  return (
    <div 
      className="mt-12 group relative inline-flex items-center justify-center min-w-[280px] h-14 px-8 rounded-full cursor-default transition-all duration-500 overflow-hidden glass hover:bg-white/20 hover:border-white/30 hover:scale-105 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 倒计时状态 */}
      <div className={`absolute transition-all duration-500 transform ${isHovered ? '-translate-y-12 opacity-0' : 'translate-y-0 opacity-100'}`}>
        <span className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          距离目标还有 {timeLeft.days} 天 {timeLeft.hours} 小时 {timeLeft.minutes} 分
        </span>
      </div>

      {/* 激励语状态 */}
      <div className={`absolute w-full px-4 flex flex-col items-center justify-center transition-all duration-500 transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="text-center">
          <p className="text-sm font-medium text-[#1d1d1f]">{currentQuote.content}</p>
          {currentQuote.source && (
            <p className="text-xs text-[#86868b] mt-0.5 scale-90">{currentQuote.source}</p>
          )}
        </div>
        
        {/* 切换按钮 - 仅在 Hover 时显示 */}
        <button 
          onClick={handleSwitchQuote}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-black/5 text-[#86868b] hover:text-indigo-500 transition-colors"
          title="换一句"
        >
          <i className="fas fa-sync-alt text-xs"></i>
        </button>
      </div>
    </div>
  );
};

export default CountdownQuote;
