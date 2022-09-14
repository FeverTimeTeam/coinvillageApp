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
  ImageBackground,
  ScrollView,
} from 'react-native';
import color from '../../constants/color';
import {useRecoilState} from 'recoil';
import {authState} from '../../atoms/auth';
import ShadowEffect from '~/components/ShadowEffect';
import {basePassbookListState} from '../../atoms/basePassbook';

const PassbookScreen = () => {
  const navigation = useNavigation();
  const [authUserState, setAuthUserState] = useRecoilState(authState);
  const [basePassbookList, setBasePassbookList] = useRecoilState(
    basePassbookListState,
  );
  return (
    <ScrollView style={styles.block}>
      <ShadowEffect>
        <View style={styles.informationTextContainer}>
          <Text style={styles.informationText}>
            *월급은 자동으로 입출금 통장에 입금됩니다.
          </Text>
          <Text style={styles.informationText}>
            받은 월급으로 소비, 적금, 투자가 가능합니다.
          </Text>
        </View>
      </ShadowEffect>
      <ShadowEffect>
        <View style={styles.property}>
          <Text style={styles.propertyText}>
            {basePassbookList?.items[0]?.property}
          </Text>
        </View>
      </ShadowEffect>
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
        <ShadowEffect>
          <ImageBackground
            style={styles.imageBackground}
            source={require('../../assets/images/savingsAccount.png')}
            resizeMode="contain">
            <Text style={[styles.country, {color: color.kb}]}>
              {authUserState.user?.countryName} 은행
            </Text>
            <Text style={styles.username}>
              {authUserState.user?.nickname}님
            </Text>
          </ImageBackground>
        </ShadowEffect>
      </Pressable>
      <Pressable
        style={({pressed}) => [
          styles.passbookButton,
          Platform.OS === 'ios' &&
            pressed && {backgroundColor: color.light_gray},
        ]}
        android_ripple={{color: '#ededed'}}
        onPress={() => {
          navigation.push('SavingsPassbook');
        }}>
        <ShadowEffect>
          <ImageBackground
            style={styles.imageBackground}
            source={require('../../assets/images/installmentAccount.png')}
            resizeMode="contain">
            <Text style={[styles.country, {color: color.apricot}]}>
              {authUserState.user?.countryName} 은행
            </Text>
            <Text style={styles.username}>
              {authUserState.user?.nickname}님
            </Text>
          </ImageBackground>
        </ShadowEffect>
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
        <ShadowEffect>
          <ImageBackground
            style={styles.imageBackground}
            source={require('../../assets/images/investmentAccount.png')}
            resizeMode="contain">
            <Text style={[styles.country, {color: color.light_green}]}>
              {authUserState.user?.countryName} 은행
            </Text>
            <Text style={styles.username}>
              {authUserState.user?.nickname}님
            </Text>
          </ImageBackground>
        </ShadowEffect>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: `${color.white}`,
  },
  passbookButton: {
    marginTop: 15,
    display: 'flex',
    alignItems: 'center',
  },
  imageBackground: {
    width: 343,
    height: 178,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 22,
  },
  country: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  username: {
    fontSize: 15,
    fontWeight: 'bold',
    color: `${color.deep}`,
  },
  button: {
    height: 10,
  },
  informationTextContainer: {
    height: 80,
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.light_gray3,
    borderRadius: 15,
  },
  informationText: {
    fontSize: 18,
  },
});

export default PassbookScreen;
