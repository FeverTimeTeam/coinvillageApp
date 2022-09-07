import React, {useState} from 'react';
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PassbookButton from '../../components/PassbookButton';
import color from '../../constants/color';
import {useEffect} from 'react';

const ConsumeScreen = () => {
  type item = {
    name: string;
    price: number;
    num: number;
    totalPrice: number;
  };
  const [item, setItem] = useState<item>({
    name: '연필꽂이',
    price: 20,
    num: 2,
    totalPrice: 40,
  });
  const [balance, setBalance] = useState<number>(537);
  const {name, price, num, totalPrice} = item;

  return (
    <View style={styles.block}>
      <View style={styles.balanceContainer}>
        <View style={styles.balanceView}>
          <Text style={styles.balanceText}>
            잔액 <Text style={styles.bold}>{balance}</Text> 미소
          </Text>
        </View>
      </View>
      <View style={styles.itemNameContainer}>
        <Text style={styles.itemNameText}>품목</Text>
        <TextInput
          style={[styles.input, styles.itemNameInput]}
          value={item.name}
          onChange={e => {
            setItem({
              ...item,
              name: e.nativeEvent.text,
            });
          }}
        />
      </View>
      <View style={styles.priceNumContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>1개 당 가격</Text>
          <TextInput
            style={[styles.input, styles.priceInput]}
            value={item.price.toString()}
            onChange={e => {
              const tmpPrice = parseInt(e.nativeEvent.text);
              if (!isNaN(tmpPrice)) {
                setItem({
                  ...item,
                  price: parseInt(e.nativeEvent.text),
                });
              } else if (e.nativeEvent.text === '') {
                setItem({
                  ...item,
                  price: 0,
                });
              } else {
                Alert.alert('Alert Title', 'My Alert Msg', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]);
              }
            }}
          />
        </View>
        <View style={styles.multiplyWrapper}>
          <Text style={styles.multiply}>X</Text>
        </View>
        <View style={styles.numContainer}>
          <Text style={styles.numText}>개수</Text>
          <TextInput
            style={[styles.input, styles.numInput]}
            value={item.num.toString()}
            onChange={e => {
              const tmpNum = parseInt(e.nativeEvent.text);
              if (!isNaN(tmpNum)) {
                setItem({
                  ...item,
                  num: parseInt(e.nativeEvent.text),
                });
              } else if (e.nativeEvent.text === '') {
                setItem({
                  ...item,
                  num: 0,
                });
              } else {
                Alert.alert('Alert Title', 'My Alert Msg', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]);
              }
            }}
          />
        </View>
      </View>
      <View style={styles.separatorBar} />
      <View style={styles.consumeButtonContainer}>
        <Text style={styles.totalPrice}>
          총 <Text style={styles.bold}>{item?.totalPrice}</Text>미소 차감
        </Text>
        <PassbookButton buttonText="구매하기" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: `${color.white}`,
    paddingHorizontal: 16,
  },
  balanceContainer: {
    height: 35,
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  balanceView: {
    backgroundColor: `${color.kb}`,
    width: 117,
    height: '100%',
    borderRadius: 17.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceText: {
    color: `${color.white}`,
    fontSize: 15,
  },
  bold: {
    fontWeight: 'bold',
  },
  itemNameContainer: {
    paddingHorizontal: 9,
    marginBottom: 29,
  },
  itemNameText: {
    marginBottom: 13,
    fontSize: 18,
  },
  itemNameInput: {
    paddingLeft: 28,
    fontSize: 18,
  },
  priceNumContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 380,
    paddingHorizontal: 9,
  },
  priceContainer: {
    flex: 5,
  },
  priceText: {
    fontSize: 18,
  },
  priceInput: {
    fontSize: 18,
    marginTop: 13,
    textAlign: 'center',
  },
  multiplyWrapper: {
    flex: 1,
    paddingTop: 49,
  },
  multiply: {
    fontSize: 16,
    textAlign: 'center',
    color: `${color.deep}`,
  },
  numContainer: {
    flex: 5,
  },
  numText: {
    fontSize: 18,
  },
  numInput: {
    fontSize: 18,
    marginTop: 15,
    textAlign: 'center',
  },
  consumeButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    height: 192,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalPrice: {
    color: `${color.system_warning}`,
    fontSize: 20,
    width: '100%',
    textAlign: 'right',
    marginBottom: 24,
  },
  input: {
    height: 53,
    borderWidth: 1,
    borderColor: `${color.light_warm_gray}`,
    borderRadius: 10,
  },
  separatorBar: {
    height: 7,
    backgroundColor: `${color.light_gray2}`,
    marginTop: 30,
  },
});

export default ConsumeScreen;
