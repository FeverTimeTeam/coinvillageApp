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
import {myStockDetailState, myStockListState} from '../../atoms/stock';
import {useRecoilState} from 'recoil';
import {axiosInstance} from '../../queries/index';

const InvestmentSellScreen = ({route, navigation}) => {
  const {StatusBarManager} = NativeModules;
  const {stockId} = route.params;
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  const [myStockDetail, setMyStockDetail] = useRecoilState(myStockDetailState);

  const [statusBarHeight, setStatusBarHeight] = useState(0);
  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(statusBarFrameData => {
        setStatusBarHeight(statusBarFrameData.height);
      });
    }
  }, [StatusBarManager]);

  useEffect(() => {
    const getMyStockDetail = () => {
      axiosInstance
        .get(`/stocks/mypage/${stockId}`)
        .then(response => {
          console.log(response.data);
          setMyStockDetail({detail: response.data});
          setTotal(myStockDetail.detail.buyCount * myStockDetail.detail.price);
        })
        .catch(e => {
          console.log(e);
        });
    };
    getMyStockDetail();
  }, [setMyStockDetail, stockId, myStockDetail]);

  const sellStock = () => {
    axiosInstance
      .post(`/stocks/mypage/${stockId}`, {})
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
          {myStockDetail.detail?.content}
        </Text>
        <Text
          style={[
            styles.textSizeSmall,
            styles.fontColor,
            styles.marginHorizontal,
          ]}>
          {myStockDetail.detail?.description}
        </Text>
      </ScrollView>
      <View>
        <View style={styles.buyFormWrapper}>
          <View style={[styles.buyForm]}>
            <View style={[styles.itemContainer]}>
              <Text style={[styles.textSizeMid, styles.fontColor]}>1??? ???</Text>
              <Text style={[styles.textSizeMid, styles.fontColor]}>
                <Text style={styles.bold}>{myStockDetail.detail?.price}</Text>{' '}
                ??????
              </Text>
            </View>
            <View style={[styles.itemContainer]}>
              <Text style={[styles.textSizeMid, styles.fontColor]}>
                ?????? ???
              </Text>
              <Text style={[styles.textSizeMid, styles.fontColor]}>
                <Text style={styles.bold}>
                  {myStockDetail.detail?.buyCount}
                </Text>{' '}
                ???
              </Text>
            </View>
            {/* <View style={styles.amount}>
              <TextInput
                style={styles.input}
                onChange={e => {
                  const tmpCount = parseInt(e.nativeEvent.text);
                  if (!isNaN(tmpCount) && myStockDetail.detail?.price) {
                    setCount(tmpCount);
                    setTotal(tmpCount * myStockDetail.detail?.price);
                  } else if (e.nativeEvent.text === '') {
                    setCount(0);
                    setTotal(0);
                  } else {
                    console.log('????????? ??????');
                  }
                }}
              />
              <Text style={[styles.textSizeBig, styles.fontColor]}>???</Text>
            </View> */}
            <View style={[styles.marginHorizontal, styles.marginTop]}>
              <Text
                style={[styles.total, styles.fontColorRed, styles.textSizeBig]}>
                ??? <Text style={[styles.bold]}>{total} ??????</Text>
              </Text>
            </View>
            <PassbookButton
              buttonText="??????"
              textColor="white"
              backgroundColor={color.kb}
              onPress={() => {
                Alert.alert(
                  `${myStockDetail.detail?.content} ${myStockDetail.detail.buyCount}??? ?????????????????????????`,
                  `??? ${total} ??????`,
                  [
                    {
                      text: '??????',
                      onPress: () => {
                        sellStock();
                        // getMyStockList();
                        Alert.alert('?????? ??????!', `??? ${total} ??????`, [
                          {
                            text: '??????',
                            onPress: () => {
                              navigation.pop();
                            },
                          },
                        ]);
                      },
                    },
                    {
                      text: '????????????',
                      onPress: () => {},
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
  marginTop: {
    marginTop: 16,
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
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 26,
    height: 77,
    borderRadius: 15,
    // marginBottom: 41,
  },
  content: {
    marginBottom: 23,
  },
  buyFormWrapper: {
    ...Platform.select({
      ios: {
        shadowColor: `${color.warm_gray_deep}`, //????????????
        shadowOpacity: 0.1, //????????? ?????????
        shadowOffset: {height: -8}, //????????? ??????
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
    paddingTop: 15,
    paddingBottom: 41,
  },
  amount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 20,
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

export default InvestmentSellScreen;
