import React, {useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {axiosInstance} from '../queries/index';
import {useNavigation} from '@react-navigation/native';
import authStorage from '../storages/authStorage';
import {authState} from '../atoms/auth';
import {useRecoilState} from 'recoil';
import {SafeAreaView} from 'react-native-safe-area-context';
import color from '../constants/color';
import {Platform} from 'react-native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [authUserState, setAuthUserState] = useRecoilState(authState);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = () => {
    axiosInstance
      .post('/members/authenticate', {
        email: email,
        password: password,
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
    <KeyboardAvoidingView
      style={styles.block}
      behavior={Platform.select({ios: 'padding'})}>
      <View style={styles.covilContainer}>
        <Image
          style={styles.covilImage}
          source={require('../assets/images/login_image/login.png')}
        />
        <Text style={styles.covilDescription}>당신의 코인 빌리지</Text>
      </View>
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
        <Text style={styles.loginText}>로그인</Text>
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
    </KeyboardAvoidingView>
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
