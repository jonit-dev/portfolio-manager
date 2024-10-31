import { AllocationCharts } from '../components/AllocationCharts';
import { AssetsTable } from '../components/AssetsTable';
import { Card } from '../components/common/Card';
import { IAsset } from '../types';

interface ISummaryViewProps {
  assets: IAsset[];
}

export function SummaryView({ assets }: ISummaryViewProps) {
  const totalValue = assets.reduce((sum, asset) => sum + asset.valueCAD, 0);

  return (
    <div className='space-y-6'>
      <div className='stats shadow bg-base-200 w-full'>
        <div className='stat'>
          <div className='stat-title'>Total Portfolio Value</div>
          <div className='stat-value text-primary'>
            ${totalValue.toLocaleString()}
          </div>
        </div>
        <div className='stat'>
          <div className='stat-title'>Total Assets</div>
          <div className='stat-value text-primary'>{assets.length}</div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card title='Portfolio Allocation' className='lg:col-span-1'>
          <AllocationCharts assets={assets} />
        </Card>

        <Card title='Assets Overview' className='lg:col-span-2'>
          <AssetsTable assets={assets} />
        </Card>
      </div>
    </div>
  );
}
