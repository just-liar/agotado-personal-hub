import React from 'react';

const MinimalDock: React.FC = () => {
  return (
    <div className="flex justify-center items-center gap-8 mb-24">
      {/* Cloud Drive */}
      <a 
        href="https://alist.agotado.xyz/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1"
      >
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-200 text-gray-400 group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-500 transition-colors shadow-sm">
          <i className="fas fa-cloud text-lg"></i>
        </div>
        <span className="text-[10px] font-medium text-gray-400 group-hover:text-gray-600 transition-colors uppercase tracking-wider">My Cloud</span>
      </a>

      {/* Notion */}
      <a 
        href="notion://www.notion.so/2e97879a21a9804d8c52dadc768538a1" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1"
      >
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-200 text-gray-400 group-hover:bg-gray-100 group-hover:border-gray-300 group-hover:text-black transition-colors shadow-sm">
          <i className="fas fa-book text-lg"></i>
        </div>
        <span className="text-[10px] font-medium text-gray-400 group-hover:text-gray-600 transition-colors uppercase tracking-wider">Notion</span>
      </a>
    </div>
  );
};

export default MinimalDock;
