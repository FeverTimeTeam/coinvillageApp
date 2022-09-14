import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Order from '../../components/Order';
import color from '../../constants/color';
import {useNavigation} from '@react-navigation/native';
import About from '~/components/About';

const AboutFirstScreen = () => {
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
          locations={[0, 0.7]}
          style={styles.inner}>
          <View>
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
              <Text style={styles.description}>당신의 코인빌리지</Text>
            </View>
            <Image
              resizeMode="center"
              style={styles.covil}
              source={require('../../assets/images/covil_text/covil_text.png')}
            />
          </View>
          <View style={styles.orderContainer}>
            <Order current={1} />
          </View>
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
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  world: {
    width: '100%',
    height: 390,
    zIndex: 3,
    marginBottom: 70,
  },
  shadow: {
    position: 'absolute',
    width: 230,
    height: 139,
    left: 74,
    top: 320,
  },
  descriptionWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  description: {
    color: `${color.kb}`,
    fontSize: 20,
    fontWeight: 'bold',
  },
  covil: {
    width: '100%',
    height: 120,
    // backgroundColor: '#111',
  },
  orderContainer: {
    width: '100%',
  },
});

export default AboutFirstScreen;
