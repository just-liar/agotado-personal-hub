import React, { useState, useEffect } from 'react';

export interface StudyItem {
  id: number;
  subject: string;
  topic: string;
  status: number;
  priority: number;
}

const statusTextMap: Record<number, string> = {
  0: '未开始',
  1: '进行中',
  2: '已完成',
};

const statusColorMap: Record<number, string> = {
  0: 'bg-gray-100 text-gray-600',
  1: 'bg-amber-50 text-amber-600',
  2: 'bg-emerald-50 text-emerald-600',
};

const renderStars = (priority: number) => (
  <div className="flex gap-0.5 text-amber-400 text-xs">
    {Array.from({ length: priority }).map((_, index) => (
      <span key={index}>⭐</span>
    ))}
  </div>
);

const StudyPlan: React.FC = () => {
  const [items, setItems] = useState<StudyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/study-plan');
        if (!res.ok) {
          throw new Error('Failed to fetch study plan');
        }
        const data: StudyItem[] = await res.json();
        setItems(data);
      } catch (err) {
        // setError('无法加载学习计划，请稍后重试。');
        // For demo purposes if API fails, we might want to show empty or mock, but let's stick to error state
         setError('无法加载学习计划 (API 可能未部署)');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mb-40 w-full max-w-5xl mx-auto">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
            学习计划
          </h3>
          <p className="text-sm text-[#86868b] mt-1">
            实时学习任务列表
          </p>
        </div>
      </div>

      <div className="glass rounded-[2rem] p-6 sm:p-8 border border-black/5 bg-white/70 min-h-[200px]">
        {loading && (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            </div>
        )}
        
        {error && (
            <div className="text-center py-10 text-gray-500">
                <p>{error}</p>
            </div>
        )}

        {!loading && !error && items.length === 0 && (
             <div className="text-center py-10 text-gray-400">
                暂无学习计划
            </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white/50 rounded-xl p-4 border border-black/5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColorMap[item.status]}`}>
                    {statusTextMap[item.status]}
                  </span>
                  {renderStars(item.priority)}
                </div>
                <h4 className="font-semibold text-[#1d1d1f] mb-1">{item.subject}</h4>
                <p className="text-sm text-[#86868b]">{item.topic}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StudyPlan;
