import {atom} from 'recoil';

export interface BasePassbook {
  accountId: number;
  property: number;
  createdAt: string;
  content: string;
  count: number;
  total: string;
  state: 'DEPOSIT' | 'WITHDRAWL';
}

interface BasePassbookState {
  items: BasePassbook[] | null;
}

export const basePassbookState = atom<BasePassbookState>({
  key: 'basePassbookState',
  default: {
    items: null,
  },
});
