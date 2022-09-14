import {atom} from 'recoil';

export interface SavingsPassbook {
  savingsId: number;
  savingsTotal: number;
  createdAt: string;
  content: string | null;
  total: string;
  interest: number;
  stateName: 'DEPOSIT' | 'WITHDRAWL';
  maturity: number;
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

export const maturityMoneyState = atom<number>({
  key: 'maturityMoney',
  default: 0,
});

// export const isMaturityState = atom<boolean>({
//   key: 'isMaturityState',
//   default: false,
// });
