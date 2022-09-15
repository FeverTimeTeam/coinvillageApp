import {atom} from 'recoil';

export const propertyState = atom<number>({
  key: 'propertyState',
  default: 0,
});
