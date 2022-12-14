import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PassbookButton from '../../components/PassbookButton';
import color from '../../constants/color';
import {useNavigation} from '@react-navigation/native';
import {axiosInstance} from '../../queries/index';
import TotalMoneyView from '~/components/TotalMoneyView';

const StockPassbookDepositScreen = ({route, navigation}) => {
  // const navigation = useNavigation();
  const {stockTotal} = route.params;
  const [total, setTotal] = useState<number>(0);

  const {StatusBarManager} = NativeModules;
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(statusBarFrameData => {
        setStatusBarHeight(statusBarFrameData.height);
      });
    }
  }, [StatusBarManager]);

  const depositToStockPassbook = () => {
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
  };
  return (
    <KeyboardAvoidingView
      style={styles.block}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? statusBarHeight + 44 : statusBarHeight + 100
      }>
      <View>
        <View style={styles.balanceWrapper}>
          <TotalMoneyView
            total={stockTotal}
            backgroundColor={color.light_green2}
          />
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
              Alert.alert(
                `주식 통장으로 ${total}리브 만큼 입금하시겠습니까?`,
                '입출금통장에서 출금됩니다.',
                [
                  {
                    text: '입금하기',
                    onPress: () => {
                      depositToStockPassbook();
                      navigation.pop();
                      Alert.alert('입금 완료!', `${total} 리브 입금`, [
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
    marginBottom: 50,
  },
});

export default StockPassbookDepositScreen;
