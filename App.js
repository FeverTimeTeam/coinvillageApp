import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/screens/RootStack';
import SplashScreen from 'react-native-splash-screen';
import {RecoilRoot} from 'recoil';

const App = () => {
  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide(); /** 추가 **/
      }, 1000); /** 스플래시 시간 조절 (2초) **/
    } catch (e) {
      console.warn('에러발생');
      console.warn(e);
    }
  }, []);
  return (
    <RecoilRoot>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
