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

interface BasePassbookListState {
  items: BasePassbook[] | [];
}

export const basePassbookListState = atom<BasePassbookListState>({
  key: 'basePassbookListState',
  default: {
    items: [],
  },
});
