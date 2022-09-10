import React, {useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {axiosInstance} from '../queries/index';
import {useNavigation} from '@react-navigation/native';
import authStorage from '../storages/authStorage';
import {authState} from '../atoms/auth';
import {useRecoilState} from 'recoil';
import {SafeAreaView} from 'react-native-safe-area-context';
import color from '../constants/color';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [authUserState, setAuthUserState] = useRecoilState(authState);

  const login = () => {
    axiosInstance
      .post('/members/authenticate', {
        email: 'mycom@naver.com',
        password: 'string',
      })
      .then(response => {
        console.log(JSON.stringify(response.data.memberResponseDto));
        console.log(response.data.token);
        authStorage.set(response.data.memberResponseDto);
        setAuthUserState({user: response.data.memberResponseDto});
        axiosInstance.defaults.headers.Authorization = `Bearer ${response.data.token}`;
        navigation.pop();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <SafeAreaView style={styles.block}>
      <View style={styles.covilContainer}>
        <Image
          style={styles.covilImage}
          source={require('../assets/images/login_image/login.png')}
        />
        <Text style={styles.covilDescription}>당신의 코인 빌리지</Text>
      </View>
      <View>
        <Text>아이디</Text>
        <TextInput placeholder="아이디 입력" />
        <Text>비밀번호</Text>
        <TextInput placeholder="비밀번호 입력" />
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          login();
        }}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>
      <View>
        <Text>아직 회원이 아니신가요?</Text>
        <TouchableOpacity>
          <Text>회원가입하기</Text>
        </TouchableOpacity>
      </View>
      {authUserState.user ? (
        <View>
          <Text>로그인됨</Text>
          <Text>{authUserState.user?.email}</Text>
        </View>
      ) : (
        <Text>로그아웃됨</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: `${color.white}`,
    paddingTop: 174,
    paddingHorizontal: 16,
  },
  covilContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 127,
    marginBottom: 80,
  },
  covilImage: {
    marginBottom: 20,
  },
  covilDescription: {
    color: `${color.kb}`,
    fontSize: 20,
  },
  loginButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${color.kb}`,
    height: 60,
    borderRadius: 8,
  },
  loginText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: `${color.white}`,
  },
});

export default LoginScreen;
