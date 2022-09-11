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

const StockPassbookScreen = () => {
  const navigation = useNavigation();
  const [totalMoney, setTotalMoney] = useState<number>(0);

  const [stockPassbookList, setStockPassbookList] = useState([
    {
      stockId: 0,
      content: '선생님 몸무게',
      amount: 2,
    },
    {
      stockId: 1,
      content: '선생님 몸무게',
      amount: 2,
    },
    {
      stockId: 2,
      content: '선생님 몸무게',
      amount: 2,
    },
    {
      stockId: 3,
      content: '선생님 몸무게',
      amount: 2,
    },
    {
      stockId: 4,
      content: '선생님 몸무게',
      amount: 2,
    },
    {
      stockId: 5,
      content: '선생님 몸무게',
      amount: 2,
    },
  ]);

  return (
    <View style={styles.block}>
      <View style={styles.paddingHorizontal}>
        <View style={styles.balanceWrapper}>
          <View style={[styles.backgroundGreen, styles.balance]}>
            <Text style={[styles.textBig]}>
              총 <Text style={styles.bold}>537 </Text>미소
            </Text>
          </View>
        </View>
        <View>
          <Text style={[styles.textColorSystem]}>
            *종목 구매는 ‘투자' 탭에서 이루어집니다.
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.submitButton, styles.backgroundGreen]}
          onPress={() => {}}>
          <Text style={[styles.bold, styles.textHuge, styles.textColorGreen]}>
            입금하기
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separatorBar} />
      <View style={styles.paddingHorizontal}>
        <View style={styles.stock}>
          <Text style={[styles.textHuge, styles.bold]}>보유 종목</Text>
        </View>

        <FlatList
          style={styles.detailContentList}
          data={stockPassbookList}
          renderItem={({item}) => (
            <View style={styles.detailContentContainer} key={item.stockId}>
              <View style={styles.dateContainer}>
                <Text style={styles.date}>{item.createdAt}</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={[styles.contentName, styles.textMid]}>
                  {item.content}
                </Text>
                <Text style={[styles.amount, styles.bold, styles.textBig]}>
                  {item.amount}주
                </Text>
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
    // justifyContent: 'space-between',
    backgroundColor: `${color.white}`,
  },
  paddingHorizontal: {
    paddingHorizontal: 16,
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
  balanceWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: 15,
    marginBottom: 32,
  },
  balance: {
    width: 117,
    height: 35,
    borderRadius: 17.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  detailContentList: {},
  contentContainer: {
    backgroundColor: `${color.white}`,
    height: 71,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#111', //그림자색
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
