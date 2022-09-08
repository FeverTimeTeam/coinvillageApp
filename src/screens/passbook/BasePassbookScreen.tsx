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
    itemId: number;
    contentName: string;
    money: number;
    moneyState: 'Withdrawal' | 'Deposit';
    createdDate: fullDate;
  };
  const [basePassbookDetailList, setBasePassbookDetailList] = useState<
    basePassbookDetail[]
  >([
    {
      itemId: 0,
      contentName: '지우개',
      money: 2,
      moneyState: 'Withdrawal',
      createdDate: {
        year: new Date().getFullYear() + 1,
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
      },
    },
    {
      itemId: 1,
      contentName: '월급',
      money: 100,
      moneyState: 'Deposit',
      createdDate: {
        year: new Date().getFullYear() + 1,
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
      },
    },
    {
      itemId: 2,
      contentName: '그립톡',
      money: 2,
      moneyState: 'Withdrawal',
      createdDate: {
        year: new Date().getFullYear() + 1,
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
      },
    },
    {
      itemId: 3,
      contentName: '빗',
      money: 2,
      moneyState: 'Withdrawal',
      createdDate: {
        year: new Date().getFullYear() + 1,
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
      },
    },
    {
      itemId: 4,
      contentName: '빗',
      money: 2,
      moneyState: 'Withdrawal',
      createdDate: {
        year: new Date().getFullYear() + 1,
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
      },
    },
    {
      itemId: 5,
      contentName: '빗',
      money: 2,
      moneyState: 'Withdrawal',
      createdDate: {
        year: new Date().getFullYear() + 1,
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
      },
    },
    {
      itemId: 6,
      contentName: '빗',
      money: 2,
      moneyState: 'Withdrawal',
      createdDate: {
        year: new Date().getFullYear() + 1,
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
      },
    },
    {
      itemId: 7,
      contentName: '빗',
      money: 2,
      moneyState: 'Withdrawal',
      createdDate: {
        year: new Date().getFullYear() + 1,
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
      },
    },
    {
      itemId: 8,
      contentName: '빗',
      money: 2,
      moneyState: 'Withdrawal',
      createdDate: {
        year: new Date().getFullYear() + 1,
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
      },
    },
    {
      itemId: 9,
      contentName: '빗',
      money: 2,
      moneyState: 'Withdrawal',
      createdDate: {
        year: new Date().getFullYear() + 1,
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
      },
    },
    {
      itemId: 10,
      contentName: '빗',
      money: 2,
      moneyState: 'Withdrawal',
      createdDate: {
        year: new Date().getFullYear() + 1,
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
      },
    },
    {
      itemId: 11,
      contentName: '빗',
      money: 2,
      moneyState: 'Withdrawal',
      createdDate: {
        year: new Date().getFullYear() + 1,
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
      },
    },
    {
      itemId: 12,
      contentName: '빗',
      money: 2,
      moneyState: 'Withdrawal',
      createdDate: {
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
            <View style={styles.detailContentContainer} key={item.itemId}>
              <View style={styles.dateContainer}>
                <Text style={styles.date}>{item.createdDate.month}월</Text>
                <Text style={styles.date}>{item.createdDate.date}일</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.contentName}>{item.contentName}</Text>
                {item.moneyState === 'Withdrawal' ? (
                  <Text style={[styles.money, styles.withdrawal]}>
                    -{item.money}
                  </Text>
                ) : (
                  <Text style={[styles.money, styles.deposit]}>
                    +{item.money}
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
