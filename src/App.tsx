import { JSX, useState } from 'react';
import { Theme } from 'react-daisyui';
import { Layout } from './components/Layout';
import { TabNavigation } from './components/TabNavigation';
import { categories, initialAssets } from './mocks/data';
import { IAsset } from './types';
import { CategoryView } from './views/CategoryView';
import { SummaryView } from './views/SummaryView';

export const App = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>('summary');
  const [assets] = useState<IAsset[]>(initialAssets);

  return (
    <Theme dataTheme="sunset">
      <Layout>
        <TabNavigation categories={categories} activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="p-6">
          {activeTab === 'summary' ? (
            <SummaryView assets={assets} />
          ) : (
            <CategoryView
              assets={assets.filter(asset => asset.category === activeTab)}
              category={categories.find(cat => cat.id === activeTab)!}
            />
          )}
        </div>
      </Layout>
    </Theme>
  );
};
