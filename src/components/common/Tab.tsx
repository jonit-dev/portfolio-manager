import {
  Banknote,
  Coins,
  Home,
  Landmark,
  LayoutDashboard,
  LineChart,
} from 'lucide-react';

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
  icon: keyof typeof icons;
  isActive: boolean;
  onClick: () => void;
}

export function Tab({ label, icon, isActive, onClick }: ITabProps) {
  const Icon = icons[icon];

  return (
    <button
      className={`tab gap-2 ${isActive ? 'tab-active' : ''}`}
      onClick={onClick}
    >
      <Icon className='w-4 h-4' />
      {label}
    </button>
  );
}
