import {atom} from 'recoil';

export interface BasePassbook {
  accountId: number;
  property: number;
  createdAt: string;
  content: string;
  count: number;
  total: string;
  state: 'DEPOSIT' | 'WITHDRAWL';
  accountTotal: number;
}

interface BasePassbookState {
  items: BasePassbook[] | [];
}

export const basePassbookState = atom<BasePassbookState>({
  key: 'basePassbookState',
  default: {
    items: [],
  },
});
