import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PassbookButton from '../../components/PassbookButton';
import color from '../../constants/color';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {axiosInstance} from '../../queries';
import {useRecoilState} from 'recoil';
import {stockDetailState} from '../../atoms/stock';

const InvestmentBuyScreen = ({route, navigation}) => {
  const {StatusBarManager} = NativeModules;
  const {stockId, content} = route.params;
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  const [statusBarHeight, setStatusBarHeight] = useState(0);
  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(statusBarFrameData => {
        setStatusBarHeight(statusBarFrameData.height);
      });
    }
  }, []);

  const [stockDetail, setStockDetail] = useRecoilState(stockDetailState);

  useEffect(() => {
    const getStockDetail = () => {
      axiosInstance
        .get(`/stocks/${stockId}`)
        .then(response => {
          // setAllStockList({items: response.data.reverse()});
          console.log(response.data);
          setStockDetail({detail: response.data});
        })
        .catch(e => {
          console.log(e);
        });
    };

    getStockDetail();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.block}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={statusBarHeight + 44}>
      <ScrollView
        style={[styles.informationContainer, styles.marginHorizontal]}>
        <Text
          style={[
            styles.textSizeBig,
            styles.fontColor,
            styles.bold,
            styles.content,
            styles.marginHorizontal,
          ]}>
          {stockDetail.detail?.content}
        </Text>
        <Text
          style={[
            styles.textSizeSmall,
            styles.fontColor,
            styles.marginHorizontal,
          ]}>
          {stockDetail.detail?.description}
        </Text>
      </ScrollView>
      <View>
        <View style={[styles.itemContainer, styles.marginHorizontal]}>
          <Text style={[styles.textSizeMid, styles.fontColor]}>
            1주 당 금액
          </Text>
          <Text style={[styles.textSizeMid, styles.fontColor]}>
            <Text style={styles.bold}>{stockDetail.detail?.price}</Text> 미소
          </Text>
        </View>
        <View style={styles.buyFormWrapper}>
          <View style={[styles.buyForm]}>
            <View style={styles.amount}>
              <TextInput
                style={styles.input}
                onChange={e => {
                  const tmpCount = parseInt(e.nativeEvent.text);
                  if (!isNaN(tmpCount)) {
                    setCount(tmpCount);
                    setTotal(tmpCount * stockDetail.detail?.price);
                  } else if (e.nativeEvent.text === '') {
                    setCount(0);
                    setTotal(0);
                  } else {
                    console.log('숫자만 입력');
                  }
                }}
              />
              <Text style={[styles.textSizeBig, styles.fontColor]}>주</Text>
            </View>
            <View>
              <Text
                style={[styles.total, styles.fontColorRed, styles.textSizeBig]}>
                총 <Text style={[styles.bold]}>{total} 리브</Text> 차감
              </Text>
            </View>
            <PassbookButton
              buttonText="구매하기"
              textColor="white"
              backgroundColor={color.kb}
              onPress={() => {
                Alert.alert(
                  `${stockDetail.detail?.content}를 ${count}주 구매하시겠습니까?`,
                  `총 ${total} 미소 차감`,
                  [
                    {
                      text: '구매하기',
                      onPress: () => {
                        navigation.pop();
                        Alert.alert('구매 완료!', `총 ${total} 미소 차감`, [
                          {
                            text: '확인',
                            onPress: () => {},
                          },
                        ]);
                      },
                    },
                    {
                      text: '취소하기',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                  ],
                );
              }}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: `${color.white}`,
    paddingTop: 26,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  bold: {
    fontWeight: 'bold',
  },
  marginHorizontal: {
    marginHorizontal: 16,
  },
  textSizeSmall: {
    fontSize: 16,
  },
  textSizeMid: {
    fontSize: 20,
  },
  textSizeBig: {
    fontSize: 24,
  },
  fontColor: {
    color: `${color.deep}`,
  },
  fontColorRed: {
    color: `${color.system_warning}`,
  },
  informationContainer: {
    // position: 'absolute',
    // top: 15,
    marginBottom: 20,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 26,
    backgroundColor: `${color.light_gray2}`,
    height: 77,
    borderRadius: 15,
    marginBottom: 41,
  },
  content: {
    marginBottom: 23,
  },
  buyFormWrapper: {
    ...Platform.select({
      ios: {
        shadowColor: `${color.warm_gray_deep}`, //그림자색
        shadowOpacity: 0.1, //그림자 투명도
        shadowOffset: {height: -8}, //그림자 위치
        shadowRadius: 3,
      },
      android: {
        //ANDROID
        elevation: 3,
      },
    }),
  },
  buyForm: {
    backgroundColor: `${color.white}`,
    display: 'flex',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 29,
    paddingBottom: 41,
  },
  amount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    width: 300,
    height: 60,
    borderRadius: 15,
    borderColor: `${color.light_gray}`,
    marginRight: 14,
    paddingRight: 14,
    textAlign: 'right',
    fontSize: 20,
  },
  total: {
    marginBottom: 30,
  },
});

export default InvestmentBuyScreen;
