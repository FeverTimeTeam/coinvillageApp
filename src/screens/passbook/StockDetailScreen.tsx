import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import color from '../../constants/color';

const StockDetailScreen = ({route, navigation}) => {
  const {stockId, content, price, buyCount} = route.params;
  // const priceHistory = usePriceHistory('ethereum');
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
          <Text style={styles.bold}>{price}</Text> 리브
        </Text>
      </View>
      <View style={[styles.itemContainer]}>
        <Text style={[styles.textSizeMid, styles.fontColor]}>구입한 주</Text>
        <Text style={[styles.textSizeMid, styles.fontColor]}>
          <Text style={styles.bold}>{buyCount}</Text> 주
        </Text>
      </View>
      {/* <LineGraph points={priceHistory} color="#4484B2" /> */}
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
