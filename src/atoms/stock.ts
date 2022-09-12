import {atom} from 'recoil';

export interface Stock {
  stockId: number;
  content: string;
  price: number;
  percent: number;
  gap: number;
}

interface AllStockListState {
  items: Stock[] | [];
}

export const allStockListState = atom<AllStockListState>({
  key: 'allStockListState',
  default: {
    items: [],
  },
});

export interface StockDetail {
  stockId: number;
  content: string;
  description: string;
  price: number;
  variable: number | null;
  createdAt: string;
}

interface StockDetailState {
  detail: StockDetail | null;
}

export const stockDetailState = atom<StockDetailState>({
  key: 'stockDetailState',
  default: {
    detail: null,
  },
});
