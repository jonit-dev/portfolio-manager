import { IAsset } from '../types';

interface IAllocationChartsProps {
  assets: IAsset[];
}

export function AllocationCharts({ assets }: IAllocationChartsProps) {
  // TODO: Implement charts using recharts
  return (
    <div className='min-h-[300px] flex items-center justify-center'>
      <p className='text-base-content/50'>Charts coming soon...</p>
    </div>
  );
}
