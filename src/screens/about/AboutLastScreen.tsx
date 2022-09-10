import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Order from '../../components/Order';
import color from '../../constants/color';
import {useNavigation} from '@react-navigation/native';

const AboutLastScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.block}>
      <TouchableOpacity
        style={styles.block}
        onPress={() => {
          navigation.navigate('AboutSecond');
        }}>
        <LinearGradient
          colors={['#FAEB9E', '#FFFFFF']}
          locations={[0, 0.9]}
          style={styles.inner}>
          <Image
            source={require('../../assets/images/world.png')}
            style={styles.world}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/images/world_shadow.png')}
            style={styles.shadow}
          />
          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>코빌을 시작해보세요</Text>
          </View>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Text style={styles.startText}>시작하기</Text>
          </TouchableOpacity>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  inner: {
    flex: 1,
    display: 'flex',
    paddingTop: 50,
  },
  world: {
    width: '100%',
    height: 390,
    zIndex: 3,
    marginBottom: 150,
  },
  shadow: {
    position: 'absolute',
    width: 230,
    height: 139,
    left: 74,
    top: 360,
  },
  descriptionWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  description: {
    color: `${color.kb}`,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 26,
  },
  startButton: {
    backgroundColor: `${color.kb}`,
    marginHorizontal: 19,
    height: 60,
    borderRadius: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startText: {
    color: `${color.white}`,
    fontSize: 23,
    fontWeight: 'bold',
  },
});

export default AboutLastScreen;
