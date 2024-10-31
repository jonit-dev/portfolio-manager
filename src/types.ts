import { IconType } from './types/icons';

export interface IAssetCategory {
  id: string;
  name: string;
  icon: IconType;
}

export interface IAsset {
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
  sharePrice: number;
  quantity: number;
  valueCAD: number;
}

export interface ITabItem {
  id: string;
  label: string;
  icon: IconType;
}
