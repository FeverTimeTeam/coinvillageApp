import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import JobScreen from './jobScreen/JobScreen';
import InvestmentScreen from './investment/InvestmentScreen';
import PassbookScreen from './passbook/PassbookScreen';
import BasePassbookScreen from './passbook/BasePassbookScreen';
import InstallmentPassbookScreen from './passbook/SavingsPassbookScreen';
import StockPassbookScreen from './passbook/StockPassbookScreen';
import ConsumeScreen from './passbook/ConsumeScreen';
import InstallmentSettingScreen from './passbook/SavingsSettingScreen';
import LoginScreen from './LoginScreen';
import LogoutScreen from './LogoutScreen';
import SignUpScreen from './SignUpScreen';
import AboutFirstScreen from './about/AboutFirstScreen';
import AboutSecondScreen from './about/AboutSecondScreen';
import AboutThirdScreen from './about/AboutThirdScreen';
import AboutFourthScreen from './about/AboutFourthScreen';
import AboutFifthScreen from './about/AboutFifthScreen';
import AboutLastScreen from './about/AboutLastScreen';
import useAuthLoadEffect from '../hooks/useAuthLoadEffect';
import {useRecoilState} from 'recoil';
import {firstState} from '../atoms/first';
import {useEffect} from 'react';
import {isLoadingState} from '../atoms/isLoading';
import StockPassbookDepositScreen from './passbook/StockPassbookDepositScreen';
import StockDetailScreen from './passbook/StockDetailScreen';
import StockTransactionScreen from './passbook/StockTransactionScreen';
import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyInvestmentScreen from './investment/MyInvestmentScreen';
import InvestmentBuyScreen from './investment/InvestmentBuyScreen';
import InvestmentSellScreen from './investment/InvestmentSellScreen';
import SignUpWebViewScreen from './SignUpWebViewScreen';
import SelectJobIconScreen from './jobScreen/SelectJobIconScreen';
import StockPassbookWithdrawalScreen from './passbook/StockPassbookWithdrawalScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const navigation = useNavigation();
  const [isLoading] = useRecoilState(isLoadingState);
  const [firstScreenState, setFirstScreenState] = useRecoilState(firstState);

  useAuthLoadEffect();

  // useEffect(() => {
  //   console.log(isLoading);
  // }, [isLoading]);

  // console.log(firstScreenState.name);
  return (
    isLoading.state === false && (
      <Stack.Navigator initialRouteName={firstScreenState.name}>
        <Stack.Screen
          name="AboutFirst"
          component={AboutFirstScreen}
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="AboutSecond"
          component={AboutSecondScreen}
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="AboutThird"
          component={AboutThirdScreen}
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="AboutFourth"
          component={AboutFourthScreen}
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="AboutFifth"
          component={AboutFifthScreen}
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="AboutLast"
          component={AboutLastScreen}
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Logout"
          component={LogoutScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUpWebView"
          component={SignUpWebViewScreen}
          // options={{
          //   headerShown: false,
          // }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Job"
          component={JobScreen}
          options={{title: '직업'}}
        />
        <Stack.Screen
          name="SelectJobIcon"
          component={SelectJobIconScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name="Investment"
          component={InvestmentScreen}
          options={{title: '투자'}}
        />
        <Stack.Screen
          name="InvestmentBuy"
          component={InvestmentBuyScreen}
          options={{title: '상세정보'}}
        />
        <Stack.Screen
          name="MyInvestment"
          component={MyInvestmentScreen}
          options={{title: 'My 투자'}}
        />
        <Stack.Screen
          name="InvestmentSell"
          component={InvestmentSellScreen}
          options={{title: '상세정보'}}
        />
        <Stack.Screen
          name="Passbook"
          component={PassbookScreen}
          options={{title: '통장'}}
        />
        <Stack.Screen
          name="BasePassbook"
          component={BasePassbookScreen}
          options={{title: '입출금 통장'}}
        />
        <Stack.Screen
          name="SavingsPassbook"
          component={InstallmentPassbookScreen}
          options={{title: '적금 통장'}}
        />
        <Stack.Screen
          name="StockPassbook"
          component={StockPassbookScreen}
          options={{title: '주식 통장'}}
        />
        <Stack.Screen
          name="Consume"
          component={ConsumeScreen}
          options={{title: '입출금 통장'}}
        />
        <Stack.Screen
          name="SavingsSetting"
          component={InstallmentSettingScreen}
          options={{
            title: '적금 통장',
            // headerRight: () => (
            //   <Button
            //     onPress={() => {
            //       navigation.navigate('SavingsPassbook');
            //       usePostSavingsSetting();
            //     }}
            //     title="적용"
            //   />
            // ),
          }}
        />
        <Stack.Screen
          name="StockPassbookDeposit"
          component={StockPassbookDepositScreen}
          options={{title: '주식 통장'}}
        />
        <Stack.Screen
          name="StockPassbookWithdrawal"
          component={StockPassbookWithdrawalScreen}
          options={{title: '주식 통장'}}
        />
        <Stack.Screen
          name="StockDetail"
          component={StockDetailScreen}
          options={{title: '상세 정보'}}
        />
        <Stack.Screen
          name="StockTransaction"
          component={StockTransactionScreen}
          options={{
            title: '거래 내역',
            // headerRight: () => (
            //   <Button
            //     onPress={() => {
            //       navigation.navigate('StockPassbook');
            //     }}
            //     title="적용"
            //   />
            // ),
          }}
        />
      </Stack.Navigator>
    )
  );
};

export default RootStack;
