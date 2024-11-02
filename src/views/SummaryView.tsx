import { JSX } from 'react';
import { AllocationCharts } from '../components/AllocationCharts';

import { Card } from '../components/common/Card';
import { PortfolioHeader } from '../components/layout/PortfolioHeader';
import { AssetsTable } from '../components/tables/AssetsTable';
import { IAsset, IHistoricalData, IPortfolioStats } from '../types';

interface ISummaryViewProps {
  assets: IAsset[];
}

function generateMockHistory(
  currentValue: number,
  points: number = 30,
  volatility: number = 0.02,
  trend: number = 0.3
): IHistoricalData[] {
  const history: IHistoricalData[] = [];
  let value = currentValue * 0.9; // Start 10% lower than current
  let momentum = 0;

  for (let i = 0; i < points; i++) {
    // Add trend bias
    const trendForce = (currentValue - value) * trend;

    // Add momentum with some decay
    momentum = momentum * 0.95 + trendForce * 0.05;

    // Add random noise
    const noise = (Math.random() - 0.5) * volatility * value;

    // Update value with momentum and noise
    value = value + momentum + noise;

    // Ensure we end at the current value
    if (i === points - 1) {
      value = currentValue;
    }

    history.push({
      value,
      timestamp: new Date(Date.now() - (points - i) * 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  return history;
}

export const SummaryView = ({ assets }: ISummaryViewProps): JSX.Element => {
  const totalValueCAD = assets.reduce((sum, asset) => sum + asset.valueCAD, 0);
  const totalBTC = assets
    .filter(asset => asset.category === 'crypto' && asset.asset === 'BTC')
    .reduce((sum, asset) => sum + asset.quantity, 0);

  // Calculate monthly passive income
  const annualPassiveIncome = assets.reduce(
    (sum, asset) => sum + asset.valueCAD * (asset.apy / 100),
    0
  );
  const monthlyPassiveIncome = annualPassiveIncome / 12;
  const globalYield = (annualPassiveIncome / totalValueCAD) * 100;

  // Generate mock historical data with different characteristics for each metric
  const history = {
    totalValue: generateMockHistory(totalValueCAD, 30, 0.01, 0.2),
    passiveIncome: generateMockHistory(monthlyPassiveIncome, 30, 0.005, 0.3),
    btc: generateMockHistory(totalBTC, 30, 0.015, 0.15),
  };

  const stats: IPortfolioStats = {
    totalValueCAD,
    totalValueBRL: totalValueCAD * 3.75, // Mock exchange rate
    passiveIncome: monthlyPassiveIncome,
    globalYield: Number(globalYield.toFixed(2)),
    totalBTC,
    history,
  };

  return (
    <div className="p-6 space-y-10">
      <PortfolioHeader stats={stats} />

      <Card title="Asset Allocation" className="w-full">
        <AllocationCharts assets={assets} />
      </Card>

      <Card title="Assets Overview" className="w-full">
        <AssetsTable assets={assets} />
      </Card>
    </div>
  );
};
