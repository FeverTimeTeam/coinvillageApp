import {atom} from 'recoil';

export interface User {
  memberId: number;
  email: string;
  password: string;
  nickname: string;
  phoneNumber: string;
  property: number;
  countryName: string;
  authorityDtoSet: [
    {
      authorityName: 'ROLE_NATION' | 'ROLE_RULER';
    },
  ];
  jobName: string;
  jobContent: string;
  payCheck: number;
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
