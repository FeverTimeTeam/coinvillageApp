import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import color from '../../constants/color';

const StockDetailScreen = ({route, navigation}) => {
  const {stockId, content, amount} = route.params;
  const [price, setPrice] = useState(10);
  return (
    <View style={styles.block}>
      <Text
        style={[
          styles.textSizeBig,
          styles.fontColor,
          styles.bold,
          styles.content,
        ]}>
        {content}
      </Text>
      <View style={[styles.itemContainer]}>
        <Text style={[styles.textSizeMid, styles.fontColor]}>1주 당 금액</Text>
        <Text style={[styles.textSizeMid, styles.fontColor]}>
          <Text style={styles.bold}>{price}</Text> 미소
        </Text>
      </View>
      <View style={[styles.itemContainer]}>
        <Text style={[styles.textSizeMid, styles.fontColor]}>구입한 주</Text>
        <Text style={[styles.textSizeMid, styles.fontColor]}>
          <Text style={styles.bold}>{amount}</Text> 주
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: `${color.white}`,
    paddingHorizontal: 27,
    paddingTop: 26,
  },
  bold: {
    fontWeight: 'bold',
  },
  textSizeMid: {
    fontSize: 20,
  },
  textSizeBig: {
    fontSize: 24,
  },
  fontColor: {
    color: `${color.deep}`,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  content: {
    marginBottom: 43,
  },
});

export default StockDetailScreen;
