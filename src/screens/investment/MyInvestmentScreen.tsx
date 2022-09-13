import React, {useState} from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PassbookButton from '../../components/PassbookButton';
import {useNavigation} from '@react-navigation/native';
import color from '../../constants/color';
import {useRecoilState} from 'recoil';
import {myStockListState} from '../../atoms/stock';
import {axiosInstance} from '../../queries/index';
import {useEffect} from 'react';

const MyInvestmentScreen = () => {
  const navigation = useNavigation();
  const [myStockList, setMyStockList] = useRecoilState(myStockListState);

  useEffect(() => {
    const getMyStockList = () => {
      axiosInstance
        .get('/stocks/mypage')
        .then(response => {
          console.log(response.data);
          setMyStockList({items: response.data});
        })
        .catch(e => {
          console.log(e);
        });
    };
    getMyStockList();
  }, [setMyStockList]);

  return (
    <View style={styles.block}>
      <View style={styles.marginHorizontal}>
        <View style={styles.balanceWrapper}>
          <View style={[styles.backgroundKb, styles.balance]}>
            <Text style={[styles.textBig, styles.textColorWhite]}>
              총{' '}
              <Text style={styles.bold}>
                {myStockList.items[0]?.stockTotal}{' '}
              </Text>
              리브
            </Text>
          </View>
        </View>
      </View>
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
                navigation.navigate('InvestmentSell', {
                  stockId: item.stockId,
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
  textColorWhite: {
    color: `${color.white}`,
  },
  backgroundKb: {
    backgroundColor: `${color.kb}`,
  },
  backgroundGreen: {
    backgroundColor: `${color.light_green2}`,
  },
  separatorBar: {
    height: 7,
    backgroundColor: `${color.light_gray3}`,
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

export default MyInvestmentScreen;
