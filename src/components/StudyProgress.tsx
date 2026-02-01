import React, { useState, useEffect } from 'react';
import { StudyItem } from '../components/StudyPlan'; // Reuse the interface from StudyPlan or types

// Map generic subject names to specific ones if needed, or just use partial matching
const TARGET_SUBJECTS = [
  { key: '数据结构', label: '数据结构', color: 'bg-blue-500' },
  { key: '计网', label: '计算机网络', color: 'bg-indigo-500' },
  { key: '操作系统', label: '操作系统', color: 'bg-purple-500' },
  { key: '计组', label: '计算机组成原理', color: 'bg-pink-500' },
];

const StudyProgress: React.FC = () => {
  const [progressData, setProgressData] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/backend-api/study-plan');
        if (!res.ok) throw new Error('Failed to fetch');
        const data: StudyItem[] = await res.json();

        // Calculate progress for each target subject
        const newProgress: Record<string, number> = {};
        
        TARGET_SUBJECTS.forEach(subject => {
          // Filter items that include the subject key (fuzzy match)
          const subjectItems = data.filter(item => item.subject.includes(subject.key));
          const total = subjectItems.length;
          const completed = subjectItems.filter(item => item.status === 2).length; // status 2 is completed
          
          // If no items, default to 0 (or maybe random for demo if empty? No, stick to real logic)
          // For demo purposes, if total is 0, let's show 0%
          newProgress[subject.key] = total === 0 ? 0 : Math.round((completed / total) * 100);
        });

        setProgressData(newProgress);
      } catch (err) {
        console.error(err);
        // Fallback or empty state
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="glass rounded-[2.5rem] p-8 h-full flex flex-col justify-between bg-white/80 border border-white/20 shadow-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold tracking-tight text-[#1d1d1f] mb-2">
          学习进度
        </h3>
        <p className="text-[#86868b] text-sm">
          核心课程完成情况概览
        </p>
      </div>

      <div className="space-y-6 flex-1 flex flex-col justify-center">
        {loading ? (
           <div className="space-y-6 animate-pulse">
             {[1, 2, 3, 4].map(i => (
               <div key={i} className="h-12 bg-gray-100 rounded-xl w-full"></div>
             ))}
           </div>
        ) : (
          TARGET_SUBJECTS.map((subject) => (
            <div key={subject.key} className="group">
              <div className="flex justify-between items-end mb-2">
                <span className="font-medium text-[#1d1d1f]">{subject.label}</span>
                <span className="text-sm font-bold text-[#86868b] group-hover:text-indigo-600 transition-colors">
                  {progressData[subject.key] || 0}%
                </span>
              </div>
              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${subject.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${progressData[subject.key] || 0}%` }}
                ></div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-black/5 flex justify-between items-center text-xs text-[#86868b]">
        <span>上次同步: 刚刚</span>
        <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            实时更新
        </span>
      </div>
    </div>
  );
};

export default StudyProgress;
