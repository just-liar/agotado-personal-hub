
import { NavItem } from './types/types';

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    id: 'alist',
    title: '我的云盘',
    description: '安全且高效的私有云存储系统，支持全平台高速访问。',
    url: 'https://alist.agotado.xyz',
    icon: 'fa-cloud',
    color: 'text-blue-500'
  },
  {
    id: 'panel',
    title: '控制中心',
    description: '基于 1Panel 的服务器管理集群，实时监控与运维。',
    url: 'https://panel.agotado.xyz',
    icon: 'fa-terminal',
    color: 'text-orange-500'
  },
  {
    id: 'waste',
    title: '智慧分类',
    description: '利用智能算法实现的垃圾分类管理系统，让环保更简单。',
    url: '#',
    icon: 'fa-leaf',
    color: 'text-green-600'
  },
  {
    id: 'github',
    title: '开源贡献',
    description: '在 GitHub 上查看我的代码库、开源项目以及技术沉淀。',
    url: 'https://github.com',
    icon: 'fa-brands fa-github',
    color: 'text-[#24292f]'
  }
];
