import {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {authState} from '../atoms/auth';
import {firstState} from '../atoms/first';
import {axiosInstance} from '../queries';
import authStorage from '../storages/authStorage';

export default function useAuthLoadEffect() {
  const [authUserState, setAuthUserState] = useRecoilState(authState);
  const [firstScreenState, setFirstScreenState] = useRecoilState(firstState);

  useEffect(() => {
    const fn = async () => {
      const auth = await authStorage.get();
      if (!auth) {
        return;
      }
      setAuthUserState({user: auth.memberResponseDto});
      axiosInstance.defaults.headers.Authorization = `Bearer ${auth.token}`;
      setFirstScreenState({name: 'Home'});
    };

    fn();
  }, [setAuthUserState]);
}
