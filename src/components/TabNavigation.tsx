import React from 'react';
import { Coins, LineChart, Home, Landmark, Banknote, LayoutDashboard } from 'lucide-react';
import { AssetCategory } from '../types';

const icons = {
  Coins,
  LineChart,
  Home,
  Landmark,
  Banknote,
  LayoutDashboard
};

interface Props {
  categories: AssetCategory[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TabNavigation({ categories, activeTab, onTabChange }: Props) {
  return (
    <div className="bg-cyber-darker/50 backdrop-blur-sm border-b border-cyber-primary/20">
      <div className="px-4">
        <nav className="flex space-x-1">
          <TabButton
            id="summary"
            label="Summary"
            icon="LayoutDashboard"
            isActive={activeTab === 'summary'}
            onClick={() => onTabChange('summary')}
          />
          {categories.map((category) => (
            <TabButton
              key={category.id}
              id={category.id}
              label={category.name}
              icon={category.icon}
              isActive={activeTab === category.id}
              onClick={() => onTabChange(category.id)}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}

interface TabButtonProps {
  id: string;
  label: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

function TabButton({ label, icon, isActive, onClick }: TabButtonProps) {
  const Icon = icons[icon as keyof typeof icons];
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300
        ${isActive 
          ? 'border-cyber-primary text-cyber-primary shadow-neon' 
          : 'border-transparent text-gray-400 hover:text-cyber-primary hover:border-cyber-primary/50'}
      `}
    >
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </button>
  );
}