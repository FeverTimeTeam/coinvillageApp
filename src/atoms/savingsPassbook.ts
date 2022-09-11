import {atom} from 'recoil';

export interface SavingsPassbook {
  savingsId: number;
  savingsTotal: number;
  createdAt: string;
  content: string | null;
  total: string;
}

interface SavingsPassbookListState {
  items: SavingsPassbook[] | null;
}

export const savingsPassbookListState = atom<SavingsPassbookListState>({
  key: 'savingsPassbookState',
  default: {
    items: null,
  },
});
