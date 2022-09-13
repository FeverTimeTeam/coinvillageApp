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
import {axiosInstance} from '../../queries/index';
import {basePassbookState} from '../../atoms/basePassbook';
import {useRecoilState} from 'recoil';
import LoadingScreen from '../../components/LoadingScreen';

const BasePassbookScreen = () => {
  const navigation = useNavigation();

  const [basePassbookListState, setBasePassbookListState] =
    useRecoilState(basePassbookState);

  const [total, setTotal] = useState<number>(0);

  const getBasePassbookList = () => {
    axiosInstance
      .get('/accounts')
      .then(response => {
        setBasePassbookListState({items: response.data.reverse()});
        if (basePassbookListState) {
          setTotal(basePassbookListState.items[0].accountTotal);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBasePassbookList();
  }, []);

  const [balance, setBalance] = useState<number>(0);

  return (
    <View style={styles.block}>
      <LoadingScreen />
      <View>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>현재 잔액</Text>
          <Text style={styles.balanceMoneyText}>
            {basePassbookListState ? total : 0}
            리브
          </Text>
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
          ListFooterComponent={<View style={styles.footer} />}
          data={basePassbookListState.items}
          renderItem={({item}) => (
            <View style={styles.detailContentContainer} key={item.accountId}>
              <View style={styles.dateContainer}>
                <Text style={styles.date}>{item.createdAt}</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.contentName}>{item.content}</Text>
                {item.state === 'DEPOSIT' ? (
                  <Text style={[styles.money, styles.deposit]}>
                    {item.total}
                  </Text>
                ) : (
                  <Text style={[styles.money, styles.withdrawal]}>
                    {item.total}
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
  footer: {
    height: 300,
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
