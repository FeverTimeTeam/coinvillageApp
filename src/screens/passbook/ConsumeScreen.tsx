import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PassbookButton from '../../components/PassbookButton';
import color from '../../constants/color';
import {axiosInstance} from '../../queries/index';
import {useNavigation} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {basePassbookListState} from '../../atoms/basePassbook';

const ConsumeScreen = () => {
  const navigation = useNavigation();
  type item = {
    content: string;
    count: number;
    price: number;
    total: number;
  };
  const [item, setItem] = useState<item>({
    content: '',
    count: 0,
    price: 0,
    total: 0,
  });
  const {content, count, price, total} = item;

  const [basePassbookList, setBasePassbookList] = useRecoilState(
    basePassbookListState,
  );

  const buyContent = () => {
    axiosInstance
      .post('/accounts', {
        content: content,
        count: count,
        total: count * price,
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const {StatusBarManager} = NativeModules;
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(statusBarFrameData => {
        setStatusBarHeight(statusBarFrameData.height);
      });
    }
  }, [StatusBarManager]);
  return (
    <KeyboardAvoidingView
      style={styles.block}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={statusBarHeight + 44}>
      <View>
        <View style={styles.balanceContainer}>
          <View style={styles.balanceView}>
            <Text style={styles.balanceText}>
              잔액{' '}
              <Text style={styles.bold}>
                {basePassbookList.items[0].accountTotal}
              </Text>{' '}
              리브
            </Text>
          </View>
        </View>
        <View style={styles.itemNameContainer}>
          <Text style={styles.itemNameText}>품목</Text>
          <TextInput
            style={[styles.input, styles.itemNameInput]}
            value={item.content}
            onChange={e => {
              setItem({
                ...item,
                content: e.nativeEvent.text,
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
                    price: tmpPrice,
                    total: tmpPrice * count,
                  });
                } else if (e.nativeEvent.text === '') {
                  setItem({
                    ...item,
                    price: 0,
                  });
                } else {
                  console.log('숫자만 입력');
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
              value={item.count.toString()}
              onChange={e => {
                const tmpCount = parseInt(e.nativeEvent.text);
                if (!isNaN(tmpCount)) {
                  setItem({
                    ...item,
                    count: tmpCount,
                    total: tmpCount * price,
                  });
                } else if (e.nativeEvent.text === '') {
                  setItem({
                    ...item,
                    count: 0,
                  });
                } else {
                  console.log('숫자만 입력');
                }
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.consumeButtonContainer}>
        <View style={styles.separatorBar} />
        <Text style={styles.totalPrice}>
          총 <Text style={styles.bold}>{item?.total}</Text>미소 차감
        </Text>
        <PassbookButton
          style={styles.buyButton}
          buttonText="구매하기"
          onPress={() => {
            Alert.alert(
              `${content}를 ${count}개 구매하시겠습니까?`,
              `총 ${total} 미소 차감`,
              [
                {
                  text: '구매하기',
                  onPress: () => {
                    buyContent();
                    navigation.pop();
                    Alert.alert('구매 완료!', `총 ${total} 리브 차감`, [
                      {
                        text: '확인',
                        onPress: () => {},
                      },
                    ]);
                  },
                },
                {
                  text: '취소하기',
                  onPress: () => {},
                  style: 'cancel',
                },
              ],
            );
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: `${color.white}`,
    paddingHorizontal: 16,
    display: 'flex',
    justifyContent: 'space-between',
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
    // height: 380,
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
    marginTop: 20,
    marginBottom: 30,
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
    // marginTop: 30,
  },
  buyButton: {},
});

export default ConsumeScreen;
