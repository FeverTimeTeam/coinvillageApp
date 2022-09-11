import React, {useState} from 'react';
import {
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import color from '../../constants/color';

const InvestmentScreen = () => {
  const navigation = useNavigation();
  const [stockPassbookList, setStockPassbookList] = useState([
    {
      stockId: 0,
      content: '선생님 몸무게',
      amount: 2,
      state: 'DEPOSIT',
    },
    {
      stockId: 1,
      content: '학급 총 지각 횟수',
      amount: 34,
      state: 'DEPOSIT',
    },
    {
      stockId: 2,
      content: '선생님 손소독 횟수',
      amount: 234,
    },
    {
      stockId: 3,
      content: '선생님 몸무게',
      amount: 1,
    },
    {
      stockId: 4,
      content: '선생님 몸무게',
      amount: 45,
    },
    {
      stockId: 5,
      content: '선생님 몸무게',
      amount: 5,
    },
    {
      stockId: 6,
      content: '선생님 몸무게',
      amount: 1,
    },
    {
      stockId: 7,
      content: '선생님 몸무게',
      amount: 45,
    },
    {
      stockId: 8,
      content: '선생님 몸무게',
      amount: 5,
    },
  ]);
  return (
    <View style={styles.block}>
      <View style={styles.myInvestmentWrapper}>
        <TouchableOpacity
          style={styles.myInvestment}
          onPress={() => {
            navigation.navigate('MyInvestment');
          }}>
          <Text style={[styles.textColorWhite, styles.bold, styles.textBig]}>
            My 투자
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.textHuge, styles.bold]}>종목</Text>
      <View>
        <FlatList
          style={[styles.detailContentList]}
          ListFooterComponent={<View style={styles.footer} />}
          data={stockPassbookList}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.contentContainer}
              key={item.stockId}
              onPress={() => {
                navigation.navigate('InvestmentBuy', {
                  stockId: item.stockId,
                  content: item.content,
                });
              }}>
              <Text style={[styles.textMid]}>{item.content}</Text>
              {item.state === 'DEPOSIT' ? (
                <Text style={[styles.bold, styles.textBig, styles.deposit]}>
                  {item.amount}%
                </Text>
              ) : (
                <Text style={[styles.bold, styles.textBig, styles.withdrawal]}>
                  {item.amount}%
                </Text>
              )}
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
    paddingHorizontal: 16,
  },
  footer: {
    height: 200,
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
  backgroundGreen: {
    backgroundColor: `${color.light_green2}`,
  },
  separatorBar: {
    height: 7,
    backgroundColor: `${color.light_gray3}`,
  },
  withdrawal: {
    color: `${color.system_warning}`,
  },
  deposit: {
    color: `${color.blue}`,
  },
  myInvestmentWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  myInvestment: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: `${color.kb}`,
    height: 45,
    width: 102,
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

export default InvestmentScreen;
