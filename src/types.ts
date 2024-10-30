export interface PortfolioStats {
  totalValueCAD: number;
  totalValueBRL: number;
  passiveIncome: number;
  globalYield: number;
  totalBTC: number;
}

export interface Asset {
  id: number;
  category: string;
  asset: string;
  provider: string;
  notes: string;
  marketCap: string;
  itcasScore: number;
  sector: string;
  apy: number;
  targetAllocation: number;
  currentAllocation: number;
  sharePrice?: number;
  quantity?: number;
  valueCAD: number;
}

export interface AssetCategory {
  id: string;
  name: string;
  icon: string;
}