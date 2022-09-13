import React, {useRef, useState} from 'react';
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
  Animated,
} from 'react-native';
import PassbookButton from '~/components/PassbookButton';
import LinearGradient from 'react-native-linear-gradient';
import Header from '~/components/Header';
import color from '../constants/color';
import Spinner from 'react-native-loading-spinner-overlay';
import {useEffect} from 'react';
import LoadingScreen from '../components/LoadingScreen';
import {useNavigation} from '@react-navigation/native';
import Slide from '~/components/Slide';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dimensions = useWindowDimensions();
  const boxSize = dimensions.width - 20;

  const [isHeartClicked, setIsHeartClicked] = useState<boolean>(false);

  return (
    <View style={styles.block}>
      <LinearGradient
        colors={['white', '#FFFCB7']}
        locations={[0, 0.5]}
        style={styles.inner}>
        <Header />

        <TouchableOpacity
          style={styles.heartWrapper}
          onPress={() => {
            setIsHeartClicked(prev => !prev);
          }}>
          <Image
            source={require('~/assets/images/speech_bubble/speech_bubble.png')}
            style={styles.heart}
          />
        </TouchableOpacity>

        <Image
          source={require('~/assets/images/world.png')}
          style={styles.world}
          resizeMode="contain"
        />
        <Image
          source={require('~/assets/images/world_shadow.png')}
          style={styles.shadow}
        />
        {isHeartClicked && (
          <View style={styles.today}>
            <Text style={styles.todayTitle}>오늘의 Talk</Text>
            <Text style={styles.todayContent}>
              선생님은 내일 본가 갈 예정 ㅎㅎ
            </Text>
          </View>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Job');
            }}>
            <Image source={require('~/assets/images/buttons/job.png')} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Investment');
            }}>
            <Image source={require('~/assets/images/buttons/investment.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Passbook');
            }}>
            <Image source={require('~/assets/images/buttons/passbook.png')} />
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
  // rectangle: {
  //   backgroundColor: 'white',
  //   zIndex: 3,
  //   width: 100,
  //   height: 100,
  // },
  inner: {
    flex: 1,
    paddingTop: 50,
  },
  world: {
    width: '100%',
    height: 390,
    zIndex: 2,
  },
  shadow: {
    position: 'absolute',
    width: 230,
    height: 139,
    left: 74,
    top: 420,
  },
  today: {
    width: '90%',
    position: 'absolute',
    top: 300,
    zIndex: 3,
    marginHorizontal: 15,
    backgroundColor: 'rgba(50,50,50,0.4)',
    height: 81,
    borderRadius: 17,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: `${color.white}`, //그림자색
        shadowOpacity: 0.8, //그림자 투명도
        shadowOffset: {width: 5, height: 5}, //그림자 위치
        shadowRadius: 3,
      },
      android: {
        //ANDROID
        elevation: 3,
      },
    }),
  },
  todayTitle: {
    color: `${color.white}`,
    fontSize: 20,
    fontWeight: 'bold',
  },
  todayContent: {
    color: `${color.white}`,
    fontSize: 18,
  },
  heartWrapper: {
    position: 'absolute',
    left: 200,
    top: 190,
    zIndex: 8,
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
