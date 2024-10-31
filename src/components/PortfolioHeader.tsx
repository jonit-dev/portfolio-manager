import { DollarSign, TrendingUp, Wallet } from 'lucide-react';
import { JSX } from 'react';
import { IPortfolioStats } from '../types';

interface IProps {
  stats: IPortfolioStats;
}

export function PortfolioHeader({ stats }: IProps): JSX.Element {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
      <div className='bg-gray-800 rounded-lg p-6 shadow-lg'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-amber-500'>
            Total Portfolio Value
          </h2>
          <DollarSign className='h-6 w-6 text-amber-500' />
        </div>
        <div className='mt-4'>
          <p className='text-2xl font-bold'>
            CA${stats.totalValueCAD.toLocaleString()}
          </p>
          <p className='text-gray-400'>
            R${stats.totalValueBRL.toLocaleString()}
          </p>
        </div>
      </div>

      <div className='bg-gray-800 rounded-lg p-6 shadow-lg'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-green-500'>
            Est. Passive Income
          </h2>
          <TrendingUp className='h-6 w-6 text-green-500' />
        </div>
        <div className='mt-4'>
          <p className='text-2xl font-bold'>
            CA${stats.passiveIncome.toLocaleString()}
          </p>
          <p className='text-gray-400'>Global Yield: {stats.globalYield}%</p>
        </div>
      </div>

      <div className='bg-gray-800 rounded-lg p-6 shadow-lg'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-blue-500'>Total BTC</h2>
          <Wallet className='h-6 w-6 text-blue-500' />
        </div>
        <div className='mt-4'>
          <p className='text-2xl font-bold'>₿ {stats.totalBTC}</p>
        </div>
      </div>
    </div>
  );
}
