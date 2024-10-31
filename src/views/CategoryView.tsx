import { AllocationChart } from '../components/AllocationChart';
import { AssetTable } from '../components/AssetTable';
import { Card } from '../components/common/Card';
import { IAsset, IAssetCategory } from '../types';

interface ICategoryViewProps {
  assets: IAsset[];
  category: IAssetCategory;
}

export function CategoryView({ assets, category }: ICategoryViewProps) {
  const totalValue = assets.reduce((sum, asset) => sum + asset.valueCAD, 0);

  return (
    <div className='space-y-6'>
      <div className='stats shadow bg-base-200 w-full'>
        <div className='stat'>
          <div className='stat-title'>{category.name} Total Value</div>
          <div className='stat-value text-primary'>
            ${totalValue.toLocaleString()}
          </div>
        </div>
        <div className='stat'>
          <div className='stat-title'>Number of Assets</div>
          <div className='stat-value text-primary'>{assets.length}</div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card title='Category Allocation' className='lg:col-span-1'>
          <AllocationChart assets={assets} />
        </Card>

        <Card title={`Assets in ${category.name}`} className='lg:col-span-2'>
          <AssetTable assets={assets} />
        </Card>
      </div>
    </div>
  );
}
