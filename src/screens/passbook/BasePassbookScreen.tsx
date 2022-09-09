import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import color from '../../constants/color';
import {useNavigation} from '@react-navigation/native';
import PassbookButton from '../../components/PassbookButton';

const BasePassbookScreen = () => {
  const navigation = useNavigation();
  type fullDate = {
    year: number;
    month: number;
    date: number;
  };
  type basePassbookDetail = {
    accountId: number;
    content: string;
    total: number;
    state: 'Withdrawal' | 'Deposit';
    createdAt: fullDate;
  };
  const [basePassbookDetailList, setBasePassbookDetailList] = useState<
    basePassbookDetail[]
  >([
    {
      accountId: 0,
      content: '지우개',
      total: 2,
      state: 'Withdrawal',
      createdAt: {
        year: new Date().getFullYear() + 1,
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
      },
    },
    {
      accountId: 1,
      content: '월급',
      total: 100,
      state: 'Deposit',
      createdAt: {
        year: new Date().getFullYear() + 1,
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
      },
    },
    {
      accountId: 1,
      content: '전기세',
      total: 10,
      state: 'Withdrawal',
      createdAt: {
        year: new Date().getFullYear() + 1,
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
      },
    },
  ]);
  const [balance, setBalance] = useState<number>(0);
  useEffect(() => {
    let dd = new Date();
  }, []);

  return (
    <View style={styles.block}>
      <View>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>현재 잔액</Text>
          <Text style={styles.balanceMoneyText}>{balance}미소</Text>
        </View>
        <View style={styles.consumeButtonWrapper}>
          <PassbookButton
            buttonText="소비하기"
            onPress={() => {
              navigation.navigate('Consume');
            }}
          />
        </View>
        <View style={styles.separatorBar} />
        <FlatList
          style={styles.detailContentList}
          data={basePassbookDetailList}
          renderItem={({item}) => (
            <View style={styles.detailContentContainer} key={item.accountId}>
              <View style={styles.dateContainer}>
                <Text style={styles.date}>{item.createdAt.month}월</Text>
                <Text style={styles.date}>{item.createdAt.date}일</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.contentName}>{item.content}</Text>
                {item.state === 'Withdrawal' ? (
                  <Text style={[styles.money, styles.withdrawal]}>
                    -{item.total}
                  </Text>
                ) : (
                  <Text style={[styles.money, styles.deposit]}>
                    +{item.total}
                  </Text>
                )}
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  balanceContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    height: 82,
    paddingLeft: 35,
  },
  balanceText: {
    color: `${color.gray}`,
    fontSize: 15,
  },
  balanceMoneyText: {
    fontSize: 30,
  },
  separatorBar: {
    height: 7,
    backgroundColor: `${color.light_gray3}`,
  },
  detailContentList: {},
  detailContentContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 9,
    height: 50,
    paddingTop: 10,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  date: {
    color: `${color.system_information}`,
    fontSize: 12,
  },
  contentContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 16,
  },
  contentName: {
    width: '70%',
    color: `${color.deep}`,
    fontSize: 18,
    textAlign: 'left',
  },
  money: {
    width: '20%',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  withdrawal: {
    color: `${color.system_warning}`,
  },
  deposit: {
    color: `${color.blue}`,
  },
  consumeButtonWrapper: {
    width: '100%',
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  consumeButton: {
    width: '100%',
    height: 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${color.light_yellow}`,
    borderRadius: 15,
  },
  consumeButtonText: {
    color: `${color.kb}`,
    fontSize: 24,
  },
});

export default BasePassbookScreen;
