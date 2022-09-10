import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import JobScreen from './JobScreen';
import InvestmentScreen from './investment/InvestmentScreen';
import PassbookScreen from './passbook/PassbookScreen';
import BasePassbookScreen from './passbook/BasePassbookScreen';
import InstallmentPassbookScreen from './passbook/InstallmentPassbookScreen';
import StockPassbookScreen from './passbook/StockPassbookScreen';
import ConsumeScreen from './passbook/ConsumeScreen';
import InstallmentSettingScreen from './passbook/InstallmentSettingScreen';
import LoginScreen from './LoginScreen';
import LogoutScreen from './LogoutScreen';
import SignUpScreen from './SignUpScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
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
        name="SignUp"
        component={SignUpScreen}
        // options={{
        //   headerShown: false,
        // }}
      />
      <Stack.Screen
        name="Job"
        component={JobScreen}
        options={{title: '직업'}}
      />
      <Stack.Screen name="Investment" component={InvestmentScreen} />
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
        name="InstallmentPassbook"
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
        name="InstallmentSetting"
        component={InstallmentSettingScreen}
        options={{title: '적금 통장'}}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
