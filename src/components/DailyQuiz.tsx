import React, { useState } from 'react';

// 从环境变量读取 Key，确保安全
const SILICONFLOW_API_KEY = import.meta.env.VITE_SILICONFLOW_API_KEY;

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
      // 11408 考研专家 Agent 提示词
      const systemPrompt = `你是一位精通计算机专业课 11408（数据结构、计算机组成原理、操作系统、计算机网络）的首席讲师。
      你的核心任务是根据用户输入的知识点，出 5 道考研难度的单选题。
      输出格式必须是纯 JSON 数组，不要包含任何 Markdown 标记（如 \`\`\`json）。
      每个题目对象包含：
      - "question": 题目描述
      - "options": 4个选项的字符串数组
      - "correctIndex": 正确选项索引(0-3)
      - "explanation": 简短解析（结合11408大纲）`;

      const userPrompt = `请为我出 5 道关于 "${topic}" 的选择题，难度：中等偏上。`;

      const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SILICONFLOW_API_KEY}`
        },
        body: JSON.stringify({
          model: "deepseek-ai/DeepSeek-V3", // 使用 DeepSeek-V3
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 2048,
          response_format: { type: "json_object" } // 强制 JSON 模式（如果模型支持）
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      let content = data.choices[0].message.content;
      
      // 清理可能存在的 Markdown 标记
      content = content.replace(/```json/g, '').replace(/```/g, '').trim();
      
      // 尝试解析 JSON
      let parsedQuestions;
      try {
        parsedQuestions = JSON.parse(content);
        // 兼容返回对象包含 'questions' 字段的情况
        if (parsedQuestions.questions && Array.isArray(parsedQuestions.questions)) {
            parsedQuestions = parsedQuestions.questions;
        }
      } catch (e) {
        console.error("JSON Parse Error:", e);
        throw new Error("生成格式错误，请重试");
      }

      setQuestions(parsedQuestions);
      setUserAnswers(new Array(parsedQuestions.length).fill(-1));
      setStatus('quiz');
    } catch (error) {
      console.error('Quiz generation failed:', error);
      alert('出题失败，请检查网络或重试');
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
        calculatedScore += 20;
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
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white">11408 专家</span>
        </h3>
        <p className="text-[#86868b] text-sm">
          DeepSeek-V3 驱动 · 考研重难点突破
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center relative z-10">
        
        {/* State: Idle */}
        {status === 'idle' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">今天复习了哪个知识点？</label>
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="例如：KMP算法、虚拟内存、TCP三次握手..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white/60 backdrop-blur-sm"
                onKeyDown={(e) => e.key === 'Enter' && generateQuiz()}
              />
            </div>
            <button 
              onClick={generateQuiz}
              disabled={!topic.trim()}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
            >
              生成真题模拟
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
            <p className="text-indigo-600 font-medium animate-pulse">DeepSeek 正在解析大纲...</p>
            <p className="text-xs text-gray-400 mt-2">正在生成 11408 考研难度题目</p>
          </div>
        )}

        {/* State: Quiz */}
        {status === 'quiz' && (
          <div className="space-y-6 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
            {questions.map((q, qIdx) => (
              <div key={qIdx} className="bg-white/60 p-4 rounded-xl border border-white/50">
                <p className="font-medium text-[#1d1d1f] mb-3 leading-relaxed">{qIdx + 1}. {q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleOptionSelect(qIdx, oIdx)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                        userAnswers[qIdx] === oIdx 
                          ? 'bg-indigo-600 text-white shadow-md' 
                          : 'bg-white hover:bg-indigo-50 text-gray-700 border border-gray-100'
                      }`}
                    >
                      <span className="mr-2 opacity-70">{String.fromCharCode(65 + oIdx)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button 
              onClick={submitQuiz}
              disabled={userAnswers.includes(-1)}
              className="w-full py-3 mt-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-200"
            >
              提交试卷
            </button>
          </div>
        )}

        {/* State: Result */}
        {status === 'result' && (
          <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
            <div className="text-center mb-6 bg-white/50 p-6 rounded-2xl border border-white/50">
              <div className="text-sm text-gray-500 mb-1">本次得分</div>
              <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
                {score}
              </span>
              <span className="text-gray-400 text-sm"> / 100</span>
            </div>

            {questions.map((q, idx) => {
              const isCorrect = userAnswers[idx] === q.correctIndex;
              return (
                <div key={idx} className={`p-5 rounded-xl border ${isCorrect ? 'bg-green-50/80 border-green-100' : 'bg-red-50/80 border-red-100'}`}>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <p className="font-bold text-sm text-[#1d1d1f] flex-1">
                      {idx + 1}. {q.question}
                    </p>
                    {!isCorrect && (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-red-100 text-red-600 rounded-full whitespace-nowrap">
                        错题
                      </span>
                    )}
                  </div>
                  
                  <div className="text-xs space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-500">正确答案:</span>
                        <span className="font-bold text-green-700">{q.options[q.correctIndex]}</span>
                    </div>
                    <div className="bg-white/60 p-3 rounded-lg text-gray-600 leading-relaxed border border-black/5">
                        <span className="font-semibold text-indigo-600 block mb-1">解析：</span>
                        {q.explanation}
                    </div>
                  </div>
                </div>
              );
            })}
            
            <button 
              onClick={resetQuiz}
              className="w-full py-3 mt-4 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-all shadow-lg"
            >
              继续刷题
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyQuiz;
