import React from 'react';
import { Asset, AssetCategory } from '../types';
import { StatsCard } from '../components/StatsCard';
import { DollarSign, TrendingUp } from 'lucide-react';
import { AssetsTable } from '../components/AssetsTable';

interface Props {
  assets: Asset[];
  category: AssetCategory;
}

export function CategoryView({ assets, category }: Props) {
  const totalValue = assets.reduce((sum, asset) => sum + asset.valueCAD, 0);
  const avgYield = assets.reduce((sum, asset) => sum + asset.apy, 0) / assets.length || 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title={`Total ${category.name} Value`}
          value={`CA$${totalValue.toLocaleString()}`}
          icon={<DollarSign className="w-5 h-5" />}
          trend="+8.3% this month"
          trendUp={true}
        />
        <StatsCard
          title="Average Yield"
          value={`${avgYield.toFixed(2)}%`}
          icon={<TrendingUp className="w-5 h-5" />}
          trend="Based on current rates"
        />
        <StatsCard
          title="Total Assets"
          value={assets.length.toString()}
          icon={<DollarSign className="w-5 h-5" />}
          trend={`in ${category.name}`}
        />
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
        <AssetsTable assets={assets} />
      </div>
    </div>
  );
}