import { IAsset } from '../types';

interface IAllocationChartProps {
  assets: IAsset[];
}

export function AllocationChart({ assets }: IAllocationChartProps) {
  // TODO: Implement chart using recharts
  return (
    <div className='min-h-[300px] flex items-center justify-center'>
      <p className='text-base-content/50'>Chart coming soon...</p>
    </div>
  );
}
