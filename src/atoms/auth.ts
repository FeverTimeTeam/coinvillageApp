import {atom} from 'recoil';

export interface User {
  memberId: number;
  email: string;
  password: string;
  nickname: string;
  phoneNumber: string;
  property: number;
  authorityDtoSet: [
    {
      authorityName: 'ROLE_NATION' | 'ROLE_RULER';
    },
  ];
}

interface AuthState {
  user: User | null;
}

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    user: null,
  },
});
