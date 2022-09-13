import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {axiosInstance} from '../queries';
import authStorage from '../storages/authStorage';
import {useRecoilState} from 'recoil';
import {authState} from '../atoms/auth';
import color from '../constants/color';

const LogoutScreen = () => {
  const navigation = useNavigation();

  const [authUserState, setAuthUserState] = useRecoilState(authState);

  const logout = () => {
    setAuthUserState({user: null});
    axiosInstance.defaults.headers.Authorization = undefined;
    authStorage.clear();
    navigation.pop();
  };
  return (
    <SafeAreaView style={styles.block}>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          logout();
        }}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  logoutButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${color.kb}`,
    height: 70,
    borderRadius: 8,
  },
  logoutText: {
    color: `${color.white}`,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default LogoutScreen;
