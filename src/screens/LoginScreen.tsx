import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  NativeModules,
  Alert,
  ScrollView,
} from 'react-native';
import {axiosInstance} from '../queries/index';
import {useNavigation} from '@react-navigation/native';
import authStorage from '../storages/authStorage';
import {authState} from '../atoms/auth';
import {useRecoilState} from 'recoil';
import color from '../constants/color';
import {Platform} from 'react-native';

const LoginScreen = () => {
  const {StatusBarManager} = NativeModules;
  const navigation = useNavigation();
  const [authUserState, setAuthUserState] = useRecoilState(authState);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [loginButtonText, setLoginButtonText] = useState<
    '로그인' | '마을 입장 중...'
  >('로그인');

  const login = async () => {
    setLoginButtonText('마을 입장 중...');
    axiosInstance
      .post('/members/authenticate', {
        email: email,
        password: password,
      })
      .then(response => {
        console.log(JSON.stringify(response.data.memberResponseDto));
        console.log(response.data.token);
        authStorage.set(response.data);
        setAuthUserState({user: response.data.memberResponseDto});
        axiosInstance.defaults.headers.Authorization = `Bearer ${response.data.token}`;
        setLoginButtonText('로그인');
        Alert.alert('로그인 되었습니다!', '마을로 입장해주세요', [
          {
            text: '마을 입장하기',
            onPress: () => {
              navigation.pop();
            },
          },
        ]);
        // navigation.pop();
      })
      .catch(e => {
        console.log(e);
        setLoginButtonText('로그인');
        Alert.alert('로그인 실패!', '아이디, 비밀번호가 일치하지 않습니다.', [
          {
            text: '확인',
            onPress: () => {
              // navigation.pop();
            },
            style: 'destructive',
          },
        ]);
      });
  };

  const [statusBarHeight, setStatusBarHeight] = useState(0);
  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(statusBarFrameData => {
        setStatusBarHeight(statusBarFrameData.height);
      });
    }
  }, [StatusBarManager]);

  return (
    <KeyboardAvoidingView
      style={styles.block}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={statusBarHeight}>
      <View style={styles.covilContainer}>
        <Image
          style={styles.covilImage}
          source={require('../assets/images/login_image/login.png')}
        />
        <Text style={styles.covilDescription}>당신의 코인 빌리지</Text>
      </View>
      <ScrollView>
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>아이디</Text>
            <TextInput
              style={styles.input}
              placeholder="이메일 입력"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Text style={styles.inputTitle}>비밀번호</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="비밀번호 입력"
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              login();
              setEmail('');
              setPassword('');
            }}>
            <Text style={styles.loginText}>{loginButtonText}</Text>
          </TouchableOpacity>
          <View style={styles.signupContainer}>
            <Text style={styles.signUpDescriptionText}>
              아직 회원이 아니신가요?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
                setEmail('');
                setPassword('');
              }}>
              <Text style={styles.signUpText}> 회원가입하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: `${color.white}`,
    // backgroundColor: `${color.white}`,
    // paddingTop: 174,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
  },
  form: {
    flex: 6,
  },
  covilContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    height: 301,
    // height: 127,
    paddingTop: 174,
    marginBottom: 80,
  },
  covilImage: {
    marginBottom: 20,
  },
  covilDescription: {
    color: `${color.kb}`,
    fontSize: 20,
  },
  inputTitle: {
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: `${color.light_gray}`,
    marginBottom: 25,
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
  signupContainer: {
    marginTop: 13,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  signUpDescriptionText: {
    color: `${color.warm_gray1}`,
  },
  signUpText: {
    color: `${color.warm_gray1}`,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
