import {
  Banknote,
  Coins,
  Home,
  Landmark,
  LayoutDashboard,
  LineChart,
} from 'lucide-react';
import { AssetCategory } from '../types';

const icons = {
  Coins,
  LineChart,
  Home,
  Landmark,
  Banknote,
  LayoutDashboard,
};

interface Props {
  categories: AssetCategory[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TabNavigation({ categories, activeTab, onTabChange }: Props) {
  return (
    <div className='bg-base-200/50 backdrop-blur-sm border-b border-primary/20'>
      <div className='px-4'>
        <div className='tabs tabs-boxed bg-base-200/50'>
          <button
            className={`tab gap-2 ${
              activeTab === 'summary' ? 'tab-active' : ''
            }`}
            onClick={() => onTabChange('summary')}
          >
            <LayoutDashboard className='w-4 h-4' />
            Summary
          </button>
          {categories.map((category) => {
            const Icon = icons[category.icon as keyof typeof icons];
            return (
              <button
                key={category.id}
                className={`tab gap-2 ${
                  activeTab === category.id ? 'tab-active' : ''
                }`}
                onClick={() => onTabChange(category.id)}
              >
                <Icon className='w-4 h-4' />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
