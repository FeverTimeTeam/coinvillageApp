import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
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
import {propertyState} from '~/atoms/property';
import {axiosInstance} from '../../queries/index';

const PassbookScreen = () => {
  const navigation = useNavigation();
  const [authUser, setAuthUser] = useRecoilState(authState);
  const [property, setProperty] = useRecoilState(propertyState);

  useEffect(() => {
    const getProperty = () => {
      axiosInstance
        .get('/members/property')
        .then(response => {
          setProperty(response.data.property);
        })
        .catch(e => {
          console.log(e);
        });
    };
    getProperty();
  }, [setProperty]);

  return (
    <ScrollView style={styles.block}>
      <View style={styles.informationTextContainer}>
        <Text style={styles.informationText}>
          * 월급은 자동으로 입출금 통장에 입금됩니다.
        </Text>
        <Text style={styles.informationText}>
          받은 월급으로 소비, 적금, 투자가 가능합니다.
        </Text>
      </View>
      <ShadowEffect shadowColor={color.warm_gray1}>
        <View style={styles.propertyContainer}>
          <Image
            style={styles.coin}
            source={require('~/assets/images/job_icons/bank/bank.png')}
          />
          <View>
            <View style={styles.title}>
              <Text>나의 총 재산</Text>
            </View>
            <View style={styles.property}>
              <ShadowEffect>
                <Text style={styles.propertyText}>{property} 리브</Text>
              </ShadowEffect>
            </View>
          </View>
        </View>
      </ShadowEffect>
      <Pressable
        style={styles.passbookButton}
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
              {authUser.user?.countryName} 은행
            </Text>
            <Text style={styles.username}>{authUser.user?.nickname}님</Text>
          </ImageBackground>
        </ShadowEffect>
      </Pressable>
      <Pressable
        style={styles.passbookButton}
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
              {authUser.user?.countryName} 은행
            </Text>
            <Text style={styles.username}>{authUser.user?.nickname}님</Text>
          </ImageBackground>
        </ShadowEffect>
      </Pressable>
      <Pressable
        style={styles.passbookButton}
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
              {authUser.user?.countryName} 은행
            </Text>
            <Text style={styles.username}>{authUser.user?.nickname}님</Text>
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
  coin: {},
  passbookButton: {
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
  },
  imageBackground: {
    // width: 343,
    // height: 178,
    width: 330,
    height: 180,
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
    marginHorizontal: 10,
    height: 60,
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: `${color.light_gray3}`,
  },
  informationText: {
    fontSize: 16,
  },
  propertyContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: `${color.kb}`,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  title: {
    display: 'flex',
    width: '100%',
  },
  property: {
    display: 'flex',
    width: '100%',
  },
  propertyText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: `${color.white}`,
  },
});

export default PassbookScreen;
