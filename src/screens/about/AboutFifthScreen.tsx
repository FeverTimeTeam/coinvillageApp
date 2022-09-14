import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import About from '~/components/About';
import Order from '../../components/Order';
import color from '../../constants/color';

const AboutFifthScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.block}>
      <About next="AboutLast">
        <View>
          <Image
            source={require('../../assets/images/about_consume/about_consume.png')}
            style={styles.consume}
            resizeMode="contain"
          />
          <View style={styles.descriptionContainer}>
            <View style={styles.row}>
              <Text style={[styles.description, styles.bold]}>
                돈을 모아 물건을 살
              </Text>
              <Text style={styles.description}> 수 있어요!</Text>
            </View>
          </View>
        </View>
        <View style={styles.orderContainer}>
          <Order current={5} />
        </View>
      </About>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  consume: {
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

export default AboutFifthScreen;
