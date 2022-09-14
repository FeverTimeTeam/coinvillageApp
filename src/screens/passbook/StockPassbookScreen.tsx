import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import color from '../../constants/color';
import {useNavigation} from '@react-navigation/native';
import PassbookButton from '../../components/PassbookButton';
import {axiosInstance} from '../../queries/index';
import {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {savingsPassbookListState} from '../../atoms/savingsPassbook';
import {myStockListState} from '../../atoms/stock';
import LoadingScreen from '../../components/LoadingScreen';
import TotalMoneyView from '~/components/TotalMoneyView';

const StockPassbookScreen = () => {
  const navigation = useNavigation();
  const [myStockList, setMyStockList] = useRecoilState(myStockListState);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const getMyStockList = () => {
      axiosInstance
        .get('/stocks/mypage')
        .then(response => {
          console.log(response.data);
          setMyStockList({items: response.data});
          if (myStockList) {
            setTotal(myStockList.items[0].stockTotal);
          }
        })
        .catch(e => {
          console.log(e);
        });
    };
    getMyStockList();
  }, [setMyStockList, myStockList]);

  return (
    <View style={styles.block}>
      <LoadingScreen />
      <View style={styles.marginHorizontal}>
        <View style={styles.balanceWrapper}>
          <View style={[styles.backgroundGreen, styles.balance]}>
            <TotalMoneyView
              total={myStockList?.items[0]?.stockTotal}
              backgroundColor={color.light_green2}
            />
          </View>
        </View>
        <View style={[styles.descriptionText]}>
          <Text style={[styles.textColorSystem]}>
            *종목 구매는 ‘투자' 탭에서 이루어집니다.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.passbookButtonWrapper}>
            <PassbookButton
              buttonText="이체하기"
              textColor={color.green}
              backgroundColor={color.white}
              borderColor={color.light_green3}
              onPress={() => {
                navigation.navigate('StockPassbookWithdrawal', {
                  stockTotal: total,
                });
              }}
            />
          </View>
          <View style={styles.passbookButtonWrapper}>
            <PassbookButton
              buttonText="입금하기"
              textColor={color.green}
              backgroundColor={color.light_green2}
              borderColor={color.light_green2}
              onPress={() => {
                navigation.navigate('StockPassbookDeposit', {
                  stockTotal: myStockList.items[0]?.stockTotal,
                });
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.transactionButton}
          onPress={() => {
            navigation.navigate('StockTransaction');
          }}>
          <Text
            style={[
              styles.transactionText,
              styles.textBig,
              styles.textColorGreen,
            ]}>
            거래 내역 확인
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separatorBar} />
      <View style={styles.marginHorizontal}>
        <View style={styles.stock}>
          <Text style={[styles.textHuge, styles.bold]}>보유 종목</Text>
        </View>
        <FlatList
          style={[styles.detailContentList]}
          ListFooterComponent={<View style={styles.footer} />}
          data={myStockList.items}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.contentContainer}
              key={item.stockId}
              onPress={() => {
                navigation.navigate('StockDetail', {
                  stockId: item.stockId,
                  content: item.content,
                  price: item.price,
                  buyCount: item.buyCount,
                });
              }}>
              <Text style={[styles.textMid]}>{item.content}</Text>
              <Text style={[styles.bold, styles.textBig]}>
                {item.buyCount}주
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: `${color.white}`,
  },
  footer: {
    height: 350,
  },
  marginHorizontal: {
    marginHorizontal: 16,
  },
  textSmall: {
    fontSize: 12,
  },
  textMid: {
    fontSize: 15,
  },
  textBig: {
    fontSize: 18,
  },
  textHuge: {
    fontSize: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  textColorDeep: {
    color: `${color.deep}`,
  },
  textColorSystem: {
    color: `${color.system_information}`,
  },
  textColorGreen: {
    color: `${color.green}`,
  },
  backgroundGreen: {
    backgroundColor: `${color.light_green2}`,
  },
  separatorBar: {
    height: 7,
    backgroundColor: `${color.light_gray3}`,
  },
  transactionButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  transactionText: {
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  balanceWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: 15,
    marginBottom: 32,
    ...Platform.select({
      ios: {
        shadowColor: `${color.warm_gray_deep}`, //그림자색
        shadowOpacity: 0.1, //그림자 투명도
        shadowOffset: {width: 1, height: 1}, //그림자 위치
        shadowRadius: 3,
      },
      android: {
        //ANDROID
        elevation: 3,
      },
    }),
  },
  balance: {
    width: 117,
    height: 35,
    borderRadius: 17.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    marginBottom: 10,
  },
  stock: {
    marginTop: 15,
    marginBottom: 5,
  },
  submitButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
    borderRadius: 15,
    marginTop: 13,
    marginBottom: 15,
  },
  passbookButtonWrapper: {
    width: '47%',
    marginBottom: 11,
    ...Platform.select({
      ios: {
        shadowColor: `${color.warm_gray_deep}`, //그림자색
        shadowOpacity: 0.2, //그림자 투명도
        shadowOffset: {width: 2, height: 2}, //그림자 위치
        shadowRadius: 3,
      },
      android: {
        //ANDROID
        elevation: 3,
      },
    }),
  },
  detailContentList: {},
  contentContainer: {
    backgroundColor: `${color.white}`,
    height: 71,
    width: '99%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    borderRadius: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: `${color.warm_gray_deep}`, //그림자색
        shadowOpacity: 0.2, //그림자 투명도
        shadowOffset: {width: 2, height: 3}, //그림자 위치
        shadowRadius: 3,
      },
      android: {
        //ANDROID
        elevation: 3,
      },
    }),
  },
});

export default StockPassbookScreen;
