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

export interface MyStock {
  stockId: number;
  content: string;
  description: string;
  price: number;
  buyCount: number;
  stockTotal: number;
}

interface MyStockListState {
  items: MyStock[] | [];
}

export const myStockListState = atom<MyStockListState>({
  key: 'myStockListState',
  default: {
    items: [],
  },
});

interface MyStockDetailState {
  detail: MyStock | null;
}

export const myStockDetailState = atom<MyStockDetailState>({
  key: 'myStockDetailState',
  default: {
    detail: null,
  },
});
