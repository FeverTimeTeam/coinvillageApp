import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import PassbookButton from '../components/PassbookButton';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.block}>
      <Button
        title="직업"
        onPress={() => {
          navigation.navigate('Job');
        }}
      />
      <Button
        title="투자"
        onPress={() => {
          navigation.navigate('Investment');
        }}
      />
      <Button
        title="통장"
        onPress={() => {
          navigation.navigate('Passbook');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {},
});

export default HomeScreen;
