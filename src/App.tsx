import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { TabNavigation } from './components/TabNavigation';
import { SummaryView } from './views/SummaryView';
import { CategoryView } from './views/CategoryView';
import { Asset, AssetCategory } from './types';

const categories: AssetCategory[] = [
  { id: 'crypto', name: 'Cryptocurrency', icon: 'Coins' },
  { id: 'stocks', name: 'Stocks', icon: 'LineChart' },
  { id: 'real-estate', name: 'Real Estate', icon: 'Home' },
  { id: 'bonds', name: 'Bonds', icon: 'Landmark' },
  { id: 'cash', name: 'Cash', icon: 'Banknote' }
];

const initialAssets: Asset[] = [
  {
    id: 1,
    category: 'crypto',
    asset: 'BTC',
    provider: 'Kraken',
    notes: 'Cold Storage',
    marketCap: 'High',
    itcasScore: 95,
    sector: 'Store of Value',
    apy: 0,
    targetAllocation: 30,
    currentAllocation: 34.16,
    sharePrice: 57242.00,
    quantity: 0.00359428,
    valueCAD: 384173.08
  },
  {
    id: 2,
    category: 'stocks',
    asset: 'VTI',
    provider: 'Vanguard',
    notes: 'Total Market ETF',
    marketCap: 'High',
    itcasScore: 90,
    sector: 'Broad Market',
    apy: 1.5,
    targetAllocation: 40,
    currentAllocation: 35.84,
    sharePrice: 245.32,
    quantity: 150,
    valueCAD: 402123.45
  },
  {
    id: 3,
    category: 'real-estate',
    asset: 'VNQ',
    provider: 'Vanguard',
    notes: 'REIT ETF',
    marketCap: 'High',
    itcasScore: 85,
    sector: 'Real Estate',
    apy: 3.8,
    targetAllocation: 15,
    currentAllocation: 18.25,
    sharePrice: 84.56,
    quantity: 200,
    valueCAD: 204678.90
  }
];

function App() {
  const [activeTab, setActiveTab] = useState<string>('summary');
  const [assets] = useState<Asset[]>(initialAssets);

  return (
    <Layout>
      <TabNavigation 
        categories={categories}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
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
  );
}

export default App;