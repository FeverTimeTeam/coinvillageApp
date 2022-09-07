import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Pressable,
  Text,
  Image,
  Button,
} from 'react-native';
import color from '../../constants/color';

const PassbookScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.block}>
      <View style={styles.informationTextContainer}>
        <Text style={styles.informationText}>
          *월급은 자동으로 입출금 통장에 입금됩니다.
        </Text>
        <Text style={styles.informationText}>
          받은 월급으로 소비, 적금, 투자가 가능합니다.
        </Text>
      </View>
      <Pressable
        style={({pressed}) => [
          styles.passbookButton,
          Platform.OS === 'ios' &&
            pressed && {backgroundColor: color.light_gray},
        ]}
        android_ripple={{color: '#ededed'}}
        onPress={() => {
          navigation.push('BasePassbook');
        }}>
        <Image source={require('../../assets/images/savingsAccount.png')} />
      </Pressable>
      <Pressable
        style={({pressed}) => [
          styles.passbookButton,
          Platform.OS === 'ios' &&
            pressed && {backgroundColor: color.light_gray},
        ]}
        android_ripple={{color: '#ededed'}}
        onPress={() => {
          navigation.push('InstallmentPassbook');
        }}>
        <Image source={require('../../assets/images/installmentAccount.png')} />
      </Pressable>
      <Pressable
        style={({pressed}) => [
          styles.passbookButton,
          Platform.OS === 'ios' &&
            pressed && {backgroundColor: color.light_gray},
        ]}
        android_ripple={{color: '#ededed'}}
        onPress={() => {
          navigation.push('StockPassbook');
        }}>
        <Image source={require('../../assets/images/investmentAccount.png')} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  passbookButton: {
    marginTop: 15,
  },
  button: {
    height: 10,
  },
  informationTextContainer: {
    width: '90%',
    height: 80,
    marginTop: 10,
    paddingLeft: 20,
    backgroundColor: color.light_gray3,
    justifyContent: 'center',
    borderRadius: 15,
  },
  informationText: {
    fontSize: 18,
  },
});

export default PassbookScreen;
