import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import About from '~/components/About';
import Order from '../../components/Order';
import color from '../../constants/color';

const AboutSecondScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.block}>
      <About next="AboutThird">
        <View>
          <Image
            source={require('../../assets/images/about_economy/economy.png')}
            style={styles.economy}
            resizeMode="contain"
          />
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>코빌에서는 친구들과</Text>
            <View style={styles.row}>
              <Text style={[styles.description, styles.bold]}>경제활동</Text>
              <Text style={styles.description}>을 할 수 있어요!</Text>
            </View>
          </View>
        </View>
        <View style={styles.orderContainer}>
          <Order current={2} />
        </View>
      </About>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  economy: {
    width: '100%',
    height: 390,
    zIndex: 3,
    marginBottom: 50,
  },
  descriptionContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 74,
  },
  description: {
    color: `${color.warm_gray_deep}`,
    fontSize: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  orderContainer: {
    width: '100%',
  },
});

export default AboutSecondScreen;
