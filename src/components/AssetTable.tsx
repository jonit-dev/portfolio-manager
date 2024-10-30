import React from 'react';
import { Asset } from '../types';

interface Props {
  assets: Asset[];
}

function AssetTable({ assets }: Props) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Asset</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Provider</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Notes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Market Cap</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ITCAS Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sector</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">APY (%)</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Target %</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Current %</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Value (CAD)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {assets.map((asset) => (
              <tr key={asset.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-amber-500 font-medium">{asset.asset}</td>
                <td className="px-6 py-4 whitespace-nowrap">{asset.provider}</td>
                <td className="px-6 py-4 whitespace-nowrap">{asset.notes}</td>
                <td className="px-6 py-4 whitespace-nowrap">{asset.marketCap}</td>
                <td className="px-6 py-4 whitespace-nowrap">{asset.itcasScore}</td>
                <td className="px-6 py-4 whitespace-nowrap">{asset.sector}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">{asset.apy}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">{asset.targetAllocation}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">{asset.currentAllocation}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">${asset.valueCAD.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssetTable;