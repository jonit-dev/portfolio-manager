import React from 'react';
import { Asset } from '../types';
import { Card } from '@tremor/react';

interface Props {
  assets: Asset[];
}

export function AssetsTable({ assets }: Props) {
  return (
    <Card className="bg-cyber-darker border border-cyber-primary/20">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cyber-primary/20">
              <th className="px-6 py-3 text-left text-xs font-medium text-cyber-text uppercase tracking-wider">Asset</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-cyber-text uppercase tracking-wider">Provider</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-cyber-text uppercase tracking-wider">Notes</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-cyber-text uppercase tracking-wider">Market Cap</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-cyber-text uppercase tracking-wider">ITCAS Score</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-cyber-text uppercase tracking-wider">APY (%)</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-cyber-text uppercase tracking-wider">Target %</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-cyber-text uppercase tracking-wider">Current %</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-cyber-text uppercase tracking-wider">Value (CAD)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyber-primary/20">
            {assets.map((asset) => (
              <tr key={asset.id} className="hover:bg-cyber-primary/5">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium text-neon-blue">{asset.asset}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-cyber-text">{asset.provider}</td>
                <td className="px-6 py-4 whitespace-nowrap text-cyber-text">{asset.notes}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-cyber-text">{asset.marketCap}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-cyber-text">{asset.itcasScore}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-neon-green">{asset.apy}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-cyber-text">{asset.targetAllocation}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-cyber-text">{asset.currentAllocation}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-cyber-text">
                  ${asset.valueCAD.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}