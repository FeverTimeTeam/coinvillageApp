import {atom} from 'recoil';

export interface JobProfileState {
  uri: string | undefined;
}

export const jobProfileState = atom<JobProfileState>({
  key: 'jobProfileState',
  default: {
    uri: undefined,
  },
});
