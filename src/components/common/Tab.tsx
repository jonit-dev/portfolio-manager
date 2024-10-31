import {
  Banknote,
  Coins,
  Home,
  Landmark,
  LayoutDashboard,
  LineChart,
} from 'lucide-react';
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

export const Tab = ({
  label,
  icon,
  isActive,
  onClick,
}: ITabProps): JSX.Element => {
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
};
