import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PassbookButton from '../components/PassbookButton';
import color from '../constants/color';
import {axiosInstance} from '../queries';
import {useNavigation} from '@react-navigation/native';

const SignUpScreen = () => {
  const {StatusBarManager} = NativeModules;
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(statusBarFrameData => {
        setStatusBarHeight(statusBarFrameData.height);
      });
    }
  }, [StatusBarManager]);

  type Nation = {
    authority: [
      {
        authorityName: 'ROLE_NATION';
      },
    ];
    countryName: string;
    property: number;
    email: string;
    nickname: string;
    password: string;
  };

  const [nation, setNation] = useState<Nation>({
    authority: [
      {
        authorityName: 'ROLE_NATION',
      },
    ],
    countryName: '',
    property: 0,
    email: '',
    nickname: '',
    password: '',
  });

  const navigation = useNavigation();

  const signUp = () => {
    axiosInstance
      .post('/members/nation/signup', {
        authority: [
          {
            authorityName: 'ROLE_NATION',
          },
        ],
        countryName: nation?.countryName,
        property: nation?.property,
        email: nation?.email,
        nickname: nation?.nickname,
        password: nation?.password,
      })
      .then(() => {
        Alert.alert('나라에 가입되었습니다!', '로그인을 진행해주세요.', [
          {
            text: '확인',
            onPress: () => {
              navigation.pop();
            },
          },
        ]);
      })
      .catch(e => {
        console.log(e);
        Alert.alert('회원가입 실패!', '다시 시도해주세요', [
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

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.block}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={statusBarHeight}>
        <Text
          style={[
            styles.title,
            styles.fontSizeBig,
            styles.bold,
            styles.fontColorDeep,
          ]}>
          당신은 국민이에요
        </Text>
        <ScrollView style={styles.form}>
          <View style={[styles.inputWrapper]}>
            <Text style={[styles.content]}>이름</Text>
            <TextInput
              style={styles.input}
              value={nation?.nickname}
              placeholder="이름이 뭐야?"
              onChange={e => {
                setNation({
                  ...nation,
                  nickname: e.nativeEvent.text,
                });
              }}
            />
          </View>
          <View style={[styles.inputWrapper]}>
            <Text style={[styles.content]}>아이디</Text>
            <TextInput
              style={styles.input}
              value={nation?.email}
              placeholder="이메일을 입력해줘"
              keyboardType="email-address"
              onChange={e => {
                setNation({
                  ...nation,
                  email: e.nativeEvent.text,
                });
              }}
            />
          </View>
          <View style={[styles.inputWrapper]}>
            <Text style={[styles.content]}>비밀번호</Text>
            <TextInput
              style={styles.input}
              value={nation?.password}
              placeholder="비밀번호를 설정해줘"
              secureTextEntry={true}
              onChange={e => {
                setNation({
                  ...nation,
                  password: e.nativeEvent.text,
                });
              }}
            />
          </View>
          <View style={[styles.inputWrapper]}>
            <Text style={[styles.content]}>나라</Text>
            <TextInput
              style={styles.input}
              value={nation?.countryName}
              placeholder="너네 나라 이름이 뭐야?"
              onChange={e => {
                setNation({
                  ...nation,
                  countryName: e.nativeEvent.text,
                });
              }}
            />
            <Text style={styles.info}>*나라를 입력하면 반에 등록됩니다.</Text>
          </View>
          <PassbookButton
            buttonText="국민되기(가입)"
            textColor={color.white}
            backgroundColor={color.kb}
            onPress={() => {
              signUp();
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  fontSizeBig: {
    fontSize: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  fontColorDeep: {
    color: `${color.deep}`,
  },
  title: {
    marginBottom: 29,
  },
  info: {
    color: `${color.system_information}`,
    marginTop: 11,
  },
  form: {
    paddingHorizontal: 10,
  },
  content: {
    fontSize: 18,
    color: `${color.warm_gray_deep}`,
    marginBottom: 13,
  },
  inputWrapper: {
    marginBottom: 31,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: `${color.gray}`,
    paddingLeft: 4,
    paddingVertical: 12,
    fontSize: 16,
  },
});

export default SignUpScreen;
