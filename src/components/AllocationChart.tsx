import React from 'react';
import { Card, DonutChart, Title, Legend } from '@tremor/react';
import { Asset } from '../types';

interface Props {
  title: string;
  assets: Asset[];
  useTarget?: boolean;
}

const COLORS = [
  'cyan',
  'emerald',
  'amber',
  'indigo',
  'rose'
];

export function AllocationChart({ title, assets, useTarget = false }: Props) {
  const data = assets.reduce((acc: { name: string; value: number }[], asset) => {
    const existingCategory = acc.find(item => item.name === asset.category);
    const value = useTarget ? asset.targetAllocation : asset.currentAllocation;
    
    if (existingCategory) {
      existingCategory.value += value;
    } else {
      acc.push({
        name: asset.category.charAt(0).toUpperCase() + asset.category.slice(1),
        value: value
      });
    }
    
    return acc;
  }, []);

  return (
    <Card 
      className="bg-cyber-darker border border-cyber-primary/20 hover:border-cyber-primary/40 transition-all duration-300"
    >
      <Title className="text-cyber-text mb-4">{title}</Title>
      <DonutChart
        data={data}
        category="value"
        index="name"
        valueFormatter={(number) => `${number.toFixed(1)}%`}
        colors={COLORS}
        showAnimation={true}
        className="mt-6"
      />
      <Legend 
        categories={data.map(item => item.name)}
        colors={COLORS}
        className="mt-6 text-cyber-text"
      />
    </Card>
  );
}