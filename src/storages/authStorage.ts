import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'auth';

const authStorage = {
  async get() {
    const rawData = await AsyncStorage.getItem(key);
    if (!rawData) {
      return null;
    }
    try {
      const data: any = JSON.parse(rawData);
      return data;
    } catch (e) {
      return null;
    }
  },
  set(authResult) {
    return AsyncStorage.setItem(key, JSON.stringify(authResult));
  },
  clear() {
    return AsyncStorage.removeItem(key);
  },
};

export default authStorage;
