import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Button, Image, TouchableOpacity} from 'react-native';
import PassbookButton from '../components/PassbookButton';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.block}>
      <Header />
      <LinearGradient
        colors={['#6DC3DF', '#FFFCB7']}
        locations={[0, 0.5]}
        style={styles.block}>
        <Image
          source={require('../assets/images/world.png')}
          style={styles.world}
          resizeMode="contain"
        />
        <Image
          source={require('../assets/images/world_shadow.png')}
          style={styles.shadow}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Job');
            }}>
            <Image source={require('../assets/images/buttons/job.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Investment');
            }}>
            <Image
              source={require('../assets/images/buttons/investment.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Passbook');
            }}>
            <Image source={require('../assets/images/buttons/passbook.png')} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  world: {
    width: '100%',
    height: 390,
    zIndex: 3,
  },
  shadow: {
    position: 'absolute',
    width: 230,
    height: 139,
    left: 74,
    top: 310,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 14,
  },
  button: {
    marginTop: 16,
  },
});

export default HomeScreen;
