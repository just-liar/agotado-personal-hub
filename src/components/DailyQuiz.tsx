import React, { useState } from 'react';

// Use the API key provided by user (Note: In production, use env vars)
const GEMINI_API_KEY = 'AIzaSyCuEBUTTYysVQIb3gxqqeXGMVw2hvkjTDg';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const DailyQuiz: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'quiz' | 'result'>('idle');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  const generateQuiz = async () => {
    if (!topic.trim()) return;
    
    setStatus('loading');
    try {
      const prompt = `Generate 5 multiple-choice questions about "${topic}" for a computer science student. 
      Difficulty: Medium to Hard. 
      Language: Chinese (Simplified).
      Format: JSON array of objects. Each object must have:
      - "question": string
      - "options": array of 4 strings
      - "correctIndex": number (0-3)
      - "explanation": string (brief explanation of the answer)
      
      Return ONLY the raw JSON string, no markdown code blocks.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      const rawText = data.candidates[0].content.parts[0].text;
      // Clean up markdown code blocks if Gemini includes them
      const jsonStr = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedQuestions = JSON.parse(jsonStr);
      
      setQuestions(parsedQuestions);
      setUserAnswers(new Array(parsedQuestions.length).fill(-1));
      setStatus('quiz');
    } catch (error) {
      console.error('Quiz generation failed:', error);
      alert('出题失败，请重试或更换关键词');
      setStatus('idle');
    }
  };

  const handleOptionSelect = (qIndex: number, oIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[qIndex] = oIndex;
    setUserAnswers(newAnswers);
  };

  const submitQuiz = () => {
    let calculatedScore = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        calculatedScore += 20; // 5 questions, 20 pts each
      }
    });
    setScore(calculatedScore);
    setStatus('result');
  };

  const resetQuiz = () => {
    setTopic('');
    setStatus('idle');
    setQuestions([]);
    setUserAnswers([]);
    setScore(0);
  };

  return (
    <div className="rounded-[2.5rem] p-8 h-full flex flex-col bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 shadow-sm relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/20 rounded-full blur-3xl -mr-10 -mt-10"></div>

      <div className="mb-6 relative z-10">
        <h3 className="text-2xl font-semibold tracking-tight text-[#1d1d1f] mb-2 flex items-center gap-2">
          <span>Daily Quiz</span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600">AI 驱动</span>
        </h3>
        <p className="text-[#86868b] text-sm">
          挑战自我，每日精进
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center relative z-10">
        
        {/* State: Idle */}
        {status === 'idle' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">今天学了什么？</label>
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="例如：KMP算法、红黑树..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white/60 backdrop-blur-sm"
                onKeyDown={(e) => e.key === 'Enter' && generateQuiz()}
              />
            </div>
            <button 
              onClick={generateQuiz}
              disabled={!topic.trim()}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
            >
              生成题目
            </button>
          </div>
        )}

        {/* State: Loading */}
        {status === 'loading' && (
          <div className="text-center py-10">
            <div className="inline-block relative w-16 h-16 mb-4">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-100 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-indigo-600 font-medium animate-pulse">AI 正在出题中...</p>
            <p className="text-xs text-gray-400 mt-2">基于 Gemini Pro 模型生成</p>
          </div>
        )}

        {/* State: Quiz */}
        {status === 'quiz' && (
          <div className="space-y-6 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
            {questions.map((q, qIdx) => (
              <div key={qIdx} className="bg-white/60 p-4 rounded-xl border border-white/50">
                <p className="font-medium text-[#1d1d1f] mb-3">{qIdx + 1}. {q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleOptionSelect(qIdx, oIdx)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        userAnswers[qIdx] === oIdx 
                          ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' 
                          : 'hover:bg-gray-50 text-gray-600 border border-transparent'
                      }`}
                    >
                      {String.fromCharCode(65 + oIdx)}. {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button 
              onClick={submitQuiz}
              disabled={userAnswers.includes(-1)}
              className="w-full py-3 mt-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              提交答案
            </button>
          </div>
        )}

        {/* State: Result */}
        {status === 'result' && (
          <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
            <div className="text-center mb-6">
              <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
                {score}
              </span>
              <span className="text-gray-400 text-sm"> / 100分</span>
            </div>

            {questions.map((q, idx) => {
              const isCorrect = userAnswers[idx] === q.correctIndex;
              return (
                <div key={idx} className={`p-4 rounded-xl border ${isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                  <div className="flex justify-between items-start gap-2">
                    <p className="font-medium text-sm mb-2 text-[#1d1d1f] flex-1">
                      {idx + 1}. {q.question}
                    </p>
                    {!isCorrect && (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-red-100 text-red-600 rounded-full whitespace-nowrap">
                        已加入错题本
                      </span>
                    )}
                  </div>
                  
                  {!isCorrect && (
                    <div className="text-xs mt-2 text-gray-600">
                      <p className="font-semibold text-green-600 mb-1">正确答案: {q.options[q.correctIndex]}</p>
                      <p className="bg-white/50 p-2 rounded-lg">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
            
            <button 
              onClick={resetQuiz}
              className="w-full py-3 mt-4 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-all"
            >
              再来一轮
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyQuiz;
