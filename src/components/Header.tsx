import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import color from '../constants/color';
import {authState} from '../atoms/auth';
import {useRecoilState} from 'recoil';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  const [authUserState, setAuthUserState] = useRecoilState(authState);
  return (
    <View style={styles.block}>
      <Image
        style={styles.covil}
        source={require('../assets/images/header_image/header_image.png')}
      />
      <View>
        {authUserState.user ? (
          <TouchableOpacity
            style={styles.userContainer}
            onPress={() => {
              navigation.navigate('Logout');
            }}>
            <Text style={styles.username}>{authUserState.user.nickname}</Text>
            <Text style={styles.nation}> 국민</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.loginWrapper}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.loginText}>로그인</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: `${color.white}`,
    height: 70,
    paddingLeft: 19,
    paddingRight: 22,
  },
  covil: {},
  userContainer: {
    height: '100%',
    paddingBottom: 18,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  username: {
    color: `${color.warm_gray1}`,
    fontWeight: 'bold',
    fontSize: 22,
  },
  nation: {
    color: `${color.warm_gray1}`,
    fontSize: 18,
    textAlignVertical: 'bottom',
  },
  loginWrapper: {
    width: 89,
    height: 42,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: `${color.white}`,
    borderWidth: 2,
    borderColor: `${color.warm_gray1}`,
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: `${color.warm_gray1}`,
  },
});

export default Header;
