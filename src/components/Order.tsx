import React from 'react';
import {StyleSheet, View} from 'react-native';
import color from '../constants/color';

type Props = {
  current: number;
  children?: any;
};

const Order: React.FC<Props> = ({current, children}) => {
  const orderList = [1, 2, 3, 4, 5];
  return (
    <View style={styles.orderWrapper}>
      {orderList.map((value, index) => {
        if (current === value) {
          return <View key={index} style={[styles.circle, styles.yellow]} />;
        } else {
          return <View key={index} style={[styles.circle]} />;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  orderWrapper: {
    paddingHorizontal: 150,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circle: {
    backgroundColor: `${color.light_gray2}`,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  yellow: {
    backgroundColor: `${color.kb}`,
  },
});

export default Order;
