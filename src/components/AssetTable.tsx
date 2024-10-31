import { JSX } from 'react';
import { IAsset } from '../types';

interface IAssetTableProps {
  assets: IAsset[];
}

export function AssetTable({ assets }: IAssetTableProps): JSX.Element {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Asset</th>
            <th>Provider</th>
            <th>Value (CAD)</th>
            <th>Quantity</th>
            <th>Share Price</th>
            <th>APY</th>
          </tr>
        </thead>
        <tbody>
          {assets.map(asset => (
            <tr key={asset.id}>
              <td>{asset.asset}</td>
              <td>{asset.provider}</td>
              <td>${asset.valueCAD.toLocaleString()}</td>
              <td>{asset.quantity}</td>
              <td>${asset.sharePrice.toLocaleString()}</td>
              <td>{asset.apy}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
