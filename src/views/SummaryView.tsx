import { JSX } from 'react';
import { AllocationCharts } from '../components/AllocationCharts';
import { AssetsTable } from '../components/AssetsTable';
import { Card } from '../components/common/Card';
import { IAsset } from '../types';

interface ISummaryViewProps {
  assets: IAsset[];
}

export const SummaryView = ({ assets }: ISummaryViewProps): JSX.Element => {
  const totalValue = assets.reduce((sum, asset) => sum + asset.valueCAD, 0);

  return (
    <div className="space-y-6 p-4">
      <div className="stats shadow bg-base-200/50 backdrop-blur-sm w-full hover:shadow-lg transition-all duration-300">
        <div className="stat">
          <div className="stat-title font-medium">Total Portfolio Value</div>
          <div className="stat-value text-primary">${totalValue.toLocaleString()}</div>
          <div className="stat-desc">↗︎ $2,345 (2.3%) from last month</div>
        </div>
        <div className="stat">
          <div className="stat-title font-medium">Total Assets</div>
          <div className="stat-value text-primary">{assets.length}</div>
          <div className="stat-desc">↗︎ 2 new assets this quarter</div>
        </div>
        <div className="stat">
          <div className="stat-title font-medium">Portfolio Score</div>
          <div className="stat-value text-primary">92</div>
          <div className="stat-desc">↗︎ Excellent diversification</div>
        </div>
      </div>

      <AllocationCharts assets={assets} />

      <Card title="Assets Overview" className="w-full">
        <AssetsTable assets={assets} />
      </Card>
    </div>
  );
};
