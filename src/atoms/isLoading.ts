import {atom} from 'recoil';

export interface IsLoadingState {
  state: boolean;
}

export const isLoadingState = atom<IsLoadingState>({
  key: 'isLoadingState',
  default: {
    state: true,
  },
});
