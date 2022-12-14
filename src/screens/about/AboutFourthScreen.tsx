import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import About from '~/components/About';
import Order from '../../components/Order';
import color from '../../constants/color';

const AboutFourthScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.block}>
      <About next="AboutFifth">
        <View>
          <Image
            source={require('../../assets/images/about_investment/about_investment.png')}
            style={styles.job}
            resizeMode="contain"
          />
          <View style={styles.descriptionContainer}>
            <View style={styles.row}>
              <Text style={styles.description}>번 돈으로 </Text>
              <Text style={[styles.description, styles.bold]}>주식</Text>
              <Text style={styles.description}>을 하고</Text>
            </View>
          </View>
        </View>
        <View style={styles.orderContainer}>
          <Order current={4} />
        </View>
      </About>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  job: {
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

export default AboutFourthScreen;
