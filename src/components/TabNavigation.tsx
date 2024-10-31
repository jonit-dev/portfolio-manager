import { IAssetCategory } from '../types';
import { Tab } from './common/Tab';

interface ITabNavigationProps {
  categories: IAssetCategory[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TabNavigation({
  categories,
  activeTab,
  onTabChange,
}: ITabNavigationProps) {
  return (
    <div className='bg-base-200/50 backdrop-blur-sm border-b border-primary/20'>
      <div className='px-4'>
        <div className='tabs tabs-boxed bg-base-200/50'>
          <Tab
            id='summary'
            label='Summary'
            icon='LayoutDashboard'
            isActive={activeTab === 'summary'}
            onClick={() => onTabChange('summary')}
          />
          {categories.map((category) => (
            <Tab
              key={category.id}
              id={category.id}
              label={category.name}
              icon={category.icon as any} // TODO: Type this properly
              isActive={activeTab === category.id}
              onClick={() => onTabChange(category.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
