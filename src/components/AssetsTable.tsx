import { JSX } from 'react';
import { IAsset } from '../types';

interface IAssetsTableProps {
  assets: IAsset[];
}

export function AssetsTable({ assets }: IAssetsTableProps): JSX.Element {
  return (
    <div className='overflow-x-auto'>
      <table className='table table-zebra w-full'>
        <thead>
          <tr>
            <th>Asset</th>
            <th>Category</th>
            <th>Value (CAD)</th>
            <th>Allocation</th>
            <th>Target</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.asset}</td>
              <td>{asset.category}</td>
              <td>${asset.valueCAD.toLocaleString()}</td>
              <td>{asset.currentAllocation}%</td>
              <td>{asset.targetAllocation}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
