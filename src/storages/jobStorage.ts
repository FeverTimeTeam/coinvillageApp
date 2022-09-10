import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'job';

const jobStorage = {
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
  set(jobResult) {
    return AsyncStorage.setItem(key, JSON.stringify(jobResult));
  },
  clear() {
    return AsyncStorage.removeItem(key);
  },
};

export default jobStorage;
