import {atom} from 'recoil';

export interface SavingsPassbook {
  savingsId: number;
  savingsTotal: number;
  createdAt: string;
  content: string | null;
  total: string;
}

interface SavingsPassbookListState {
  items: SavingsPassbook[] | [];
}

export const savingsPassbookListState = atom<SavingsPassbookListState>({
  key: 'savingsPassbookState',
  default: {
    items: [],
  },
});

interface SavingsBillState {
  bill: number;
}

export const savingsBillState = atom<SavingsBillState>({
  key: 'savingsBillState',
  default: {
    bill: 0,
  },
});
