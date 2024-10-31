import { Banknote, Coins, Home, Landmark, LayoutDashboard, LineChart } from 'lucide-react';
import { JSX } from 'react';
import { IconType } from '../../types/icons';

const icons = {
  Coins,
  LineChart,
  Home,
  Landmark,
  Banknote,
  LayoutDashboard,
} as const;

interface ITabProps {
  id: string;
  label: string;
  icon: IconType;
  isActive: boolean;
  onClick: () => void;
}

export const Tab = ({ label, icon, isActive, onClick }: ITabProps): JSX.Element => {
  const Icon = icons[icon];

  return (
    <button
      className={`
        tab flex-1 gap-1.5 px-3 py-2 min-h-0 h-auto text-sm transition-colors duration-200
        hover:bg-primary/10 
        ${isActive ? 'tab-active text-primary font-medium' : 'text-base-content/70'}
      `}
      onClick={onClick}
    >
      <Icon className="w-4 h-4" />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
};
