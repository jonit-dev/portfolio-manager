import { DollarSign, TrendingUp, Wallet } from 'lucide-react';
import { JSX } from 'react';
import { IPortfolioStats } from '../types';
import { Sparkline } from './common/Sparkline';

interface IProps {
  stats: IPortfolioStats;
}

export function PortfolioHeader({ stats }: IProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-base-200/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-primary/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-primary">Total Portfolio Value</h2>
          <div className="p-2 rounded-lg bg-primary/10">
            <DollarSign className="h-5 w-5 text-primary" />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-base-content">
            CA${Math.round(stats.totalValueCAD).toLocaleString()}
          </p>
          <p className="text-base-content/60 text-sm mt-1">
            R${Math.round(stats.totalValueBRL).toLocaleString()}
          </p>
        </div>
        <div className="mt-4">
          <Sparkline data={stats.history.totalValue} />
        </div>
      </div>

      <div className="bg-base-200/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-primary/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-primary">Monthly Passive Income</h2>
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-base-content">
            CA${Math.round(stats.passiveIncome).toLocaleString()}
          </p>
          <p className="text-base-content/60 text-sm mt-1">Annual Yield: {stats.globalYield}%</p>
        </div>
        <div className="mt-4">
          <Sparkline data={stats.history.passiveIncome} />
        </div>
      </div>

      <div className="bg-base-200/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-primary/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-primary">Total BTC</h2>
          <div className="p-2 rounded-lg bg-primary/10">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-base-content">₿ {stats.totalBTC.toFixed(8)}</p>
        </div>
        <div className="mt-4">
          <Sparkline data={stats.history.btc} />
        </div>
      </div>
    </div>
  );
}
