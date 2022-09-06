import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import JobScreen from './JobScreen';
import InvestmentScreen from './investment/InvestmentScreen';
import PassbookScreen from './passbook/PassbookScreen';
import BasePassbookScreen from './passbook/BasePassbookScreen';
import InstallmentPassbookScreen from './passbook/InstallmentPassbookScreen';
import StockPassbookScreen from './passbook/StockPassbookScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Job" component={JobScreen} />
      <Stack.Screen name="Investment" component={InvestmentScreen} />
      <Stack.Screen name="Passbook" component={PassbookScreen} />
      <Stack.Screen name="BasePassbook" component={BasePassbookScreen} />
      <Stack.Screen
        name="InstallmentPassbook"
        component={InstallmentPassbookScreen}
      />
      <Stack.Screen name="StockPassbook" component={StockPassbookScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
