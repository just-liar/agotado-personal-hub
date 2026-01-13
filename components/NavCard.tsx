
import React from 'react';
import { NavItem } from '../types';

interface NavCardProps {
  item: NavItem;
}

const NavCard: React.FC<NavCardProps> = ({ item }) => {
  // Check if icon string already includes 'fa-' or 'fab' style classes
  const iconClass = item.icon.includes('fa-') && !item.icon.includes('fas') && !item.icon.includes('fab') 
    ? `fas ${item.icon}` 
    : item.icon;

  return (
    <a
      href={item.url}
      target={item.url === '#' ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="bento-item group relative block"
    >
      <div className="bento-inner glass p-10 rounded-[2.5rem] h-full flex flex-col items-start transition-all duration-500 overflow-hidden">
        {/* Subtle background glow on hover - light theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-8 bg-white border border-black/5 shadow-sm text-2xl transition-all duration-500 group-hover:scale-110 ${item.color}`}>
          <i className={iconClass}></i>
        </div>
        
        <div className="relative z-10">
          <h3 className="text-3xl font-semibold tracking-tight mb-3 text-[#1d1d1f]">
            {item.title}
          </h3>
          <p className="text-[17px] leading-relaxed text-[#86868b] font-medium max-w-[280px]">
            {item.description}
          </p>
        </div>

        <div className="mt-12 flex items-center text-[15px] font-semibold text-[#0066cc] group-hover:translate-x-1 transition-transform duration-300">
          访问 <i className="fas fa-arrow-right ml-2 text-xs"></i>
        </div>
      </div>
    </a>
  );
};

export default NavCard;
