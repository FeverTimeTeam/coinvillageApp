import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Button,
  Image,
  TouchableOpacity,
  Platform,
  Pressable,
  Text,
  useWindowDimensions,
} from 'react-native';
import PassbookButton from '../components/PassbookButton';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import color from '../constants/color';
import Spinner from 'react-native-loading-spinner-overlay';
import {useEffect} from 'react';
import LoadingScreen from '../components/LoadingScreen';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dimensions = useWindowDimensions();
  const boxSize = dimensions.width - 20;
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // useEffect(() => {
  //   setInterval(() => {
  //     setIsLoading(true);
  //   }, 1000);
  // }, []);

  return (
    <View style={styles.block}>
      <LinearGradient
        colors={['white', '#FFFCB7']}
        locations={[0, 0.5]}
        style={styles.inner}>
        {/* <Spinner
          visible={!isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        /> */}
        <Header />
        <Image
          source={require('../assets/images/world.png')}
          style={styles.world}
          resizeMode="contain"
        />
        <Image
          source={require('../assets/images/world_shadow.png')}
          style={styles.shadow}
        />
        <View style={styles.todayContainer}>
          <TouchableOpacity style={styles.heartWrapper} onPress={() => {}}>
            <Image
              source={require('../assets/images/heart/heart.png')}
              style={styles.heart}
            />
          </TouchableOpacity>
          {/* <View style={dynamicStyles({boxSize}).todayBox}>
            <Text>오늘의 정보</Text>
          </View> */}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Job');
            }}>
            <Image source={require('../assets/images/buttons/job.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Investment');
            }}>
            <Image
              source={require('../assets/images/buttons/investment.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Passbook');
            }}>
            <Image source={require('../assets/images/buttons/passbook.png')} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

// const dynamicStyles = (value: {boxSize: any}) =>
//   StyleSheet.create({
//     todayBox: {
//       position: 'absolute',
//       top: 300,
//       left: 10,
//       width: `${value.boxSize}`,
//       // width: '100%',
//       height: 200,
//       backgroundColor: `${color.black}`,
//       zIndex: 3,
//     },
//   });

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingTop: 50,
  },
  world: {
    width: '100%',
    height: 390,
    zIndex: 3,
  },
  shadow: {
    position: 'absolute',
    width: 230,
    height: 139,
    left: 74,
    top: 420,
  },
  todayContainer: {
    position: 'absolute',
  },
  heartWrapper: {
    position: 'absolute',
    left: 225,
    top: 250,
    zIndex: 3,
  },
  heart: {},
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 14,
  },
  button: {
    marginTop: 16,
    ...Platform.select({
      ios: {
        shadowColor: `${color.warm_gray_deep}`, //그림자색
        shadowOpacity: 0.3, //그림자 투명도
        shadowOffset: {width: 3, height: 3}, //그림자 위치
        shadowRadius: 3,
      },
      android: {
        //ANDROID
        elevation: 3,
      },
    }),
  },
});

export default HomeScreen;
