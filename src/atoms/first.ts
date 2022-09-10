import {atom} from 'recoil';

interface FirstState {
  name: 'Home' | 'AboutFirst';
}

export const firstState = atom<FirstState>({
  key: 'firstState',
  default: {
    name: 'AboutFirst',
  },
});
