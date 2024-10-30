import React from 'react';
import { DollarSign, TrendingUp, PieChart } from 'lucide-react';
import { Asset } from '../types';
import { StatsCard } from '../components/StatsCard';
import { AllocationChart } from '../components/AllocationChart';
import { Grid } from '@tremor/react';

interface Props {
  assets: Asset[];
}

// Sample historical data for sparklines
const generateSparklineData = (days: number, trend: 'up' | 'down') => {
  const data = [];
  let value = 100;
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    value += trend === 'up' 
      ? Math.random() * 5 
      : -Math.random() * 5;
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.max(0, value)
    });
  }
  
  return data;
};

export function SummaryView({ assets }: Props) {
  const totalValue = assets.reduce((sum, asset) => sum + asset.valueCAD, 0);
  const passiveIncome = assets.reduce((sum, asset) => sum + (asset.valueCAD * asset.apy / 100), 0);

  return (
    <div className="space-y-6">
      <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
        <StatsCard
          title="Total Portfolio Value"
          value={`CA$${totalValue.toLocaleString()}`}
          icon={<DollarSign className="w-5 h-5" />}
          trend="+12.5% this month"
          trendUp={true}
          sparklineData={generateSparklineData(30, 'up')}
        />
        <StatsCard
          title="Est. Annual Income"
          value={`CA$${passiveIncome.toLocaleString()}`}
          icon={<TrendingUp className="w-5 h-5" />}
          trend={`${(passiveIncome/totalValue*100).toFixed(2)}% yield`}
          trendUp={true}
          sparklineData={generateSparklineData(30, 'up')}
        />
        <StatsCard
          title="Asset Categories"
          value={assets.length.toString()}
          icon={<PieChart className="w-5 h-5" />}
          trend="5 categories"
          sparklineData={generateSparklineData(30, 'up')}
        />
      </Grid>

      <Grid numItems={1} numItemsLg={2} className="gap-6">
        <AllocationChart
          title="Current Allocation"
          assets={assets}
        />
        <AllocationChart
          title="Target Allocation"
          assets={assets}
          useTarget={true}
        />
      </Grid>
    </div>
  );
}