import {useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {authState} from '../atoms/auth';
import {firstState} from '../atoms/first';
import {axiosInstance} from '../queries';
import authStorage from '../storages/authStorage';
import {isLoadingState} from '../atoms/isLoading';

export default function useAuthLoadEffect() {
  const [authUserState, setAuthUserState] = useRecoilState(authState);
  const [firstScreenState, setFirstScreenState] = useRecoilState(firstState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);

  useEffect(() => {
    const fn = async () => {
      const auth = await authStorage.get();
      if (!auth) {
        setIsLoading({state: false});
        return;
      }
      setAuthUserState({user: auth.memberResponseDto});
      axiosInstance.defaults.headers.Authorization = `Bearer ${auth.token}`;
      await setFirstScreenState({name: 'Home'});
      setIsLoading({state: false});
    };

    fn();
  }, [setIsLoading, setFirstScreenState, setAuthUserState]);
}
