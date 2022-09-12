import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import PassbookButton from '../../components/PassbookButton';
import color from '../../constants/color';
import {useNavigation} from '@react-navigation/native';
import {axiosInstance} from '../../queries/index';

const StockPassbookDepositScreen = () => {
  const navigation = useNavigation();
  const [total, setTotal] = useState<number>(0);

  return (
    <View style={styles.block}>
      <View>
        <View style={styles.balanceWrapper}>
          <View style={[styles.backgroundGreen, styles.balance]}>
            <Text style={[styles.textBig]}>
              총 <Text style={styles.bold}>537 </Text>미소
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.textBig}>얼마를 입금하시겠습니까?</Text>
          <TextInput
            style={[styles.input, styles.textBig]}
            value={total.toString()}
            onChange={e => {
              const tmpTotal = parseInt(e.nativeEvent.text);
              if (!isNaN(tmpTotal)) {
                setTotal(tmpTotal);
              } else if (e.nativeEvent.text === '') {
                setTotal(0);
              } else {
                console.log('숫자만 입력');
              }
            }}
          />
        </View>
      </View>
      <View>
        <Text style={[styles.textColorSystem]}>
          *종목 구매는 ‘투자' 탭에서 이루어집니다.
        </Text>
        <View style={styles.passbookButtonWrapper}>
          <PassbookButton
            buttonText="입금하기"
            textColor={color.green}
            backgroundColor={color.light_green2}
            onPress={() => {
              axiosInstance
                .post('/accounts/stock', {
                  total: total,
                })
                .then(response => {
                  console.log(response.data);
                })
                .catch(e => {
                  console.log(e);
                });
              navigation.pop();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: `${color.white}`,
    paddingHorizontal: 16,
    paddingBottom: 48,
    display: 'flex',
    justifyContent: 'space-between',
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
  input: {
    borderWidth: 1,
    height: 53,
    borderRadius: 10,
    borderColor: `${color.light_warm_gray}`,
    marginTop: 13,
    paddingLeft: 16,
  },
  passbookButtonWrapper: {
    marginTop: 13,
    marginBottom: 15,
  },
});

export default StockPassbookDepositScreen;