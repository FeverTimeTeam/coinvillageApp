import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import color from '../../constants/color';
import {useNavigation} from '@react-navigation/native';
import PassbookButton from '~/components/PassbookButton';
import {axiosInstance} from '../../queries/index';
import {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {
  savingsPassbookListState,
  SavingsPassbook,
  savingsBillState,
} from '../../atoms/savingsPassbook';
import LoadingScreen from '~/components/LoadingScreen';
import TotalMoneyView from '~/components/TotalMoneyView';
import {maturityMoneyState} from '../../atoms/savingsPassbook';

const SavingsPassbookScreen = () => {
  const navigation = useNavigation();
  const [savingsPassbookList, setSavingsPassbookList] = useRecoilState(
    savingsPassbookListState,
  );
  const [billSetting, setBillSetting] = useRecoilState(savingsBillState);
  const [maturityMoney, setMaturityMoney] = useRecoilState(maturityMoneyState);

  useEffect(() => {
    const getSavingsPassbookList = () => {
      axiosInstance
        .get('/savings')
        .then(response => {
          setSavingsPassbookList({items: response.data.reverse()});
          const tmpMaturityMoney =
            ((savingsPassbookList?.items[0]?.interest + 100) *
              billSetting.bill *
              6) /
            100;
          setMaturityMoney(parseInt(tmpMaturityMoney.toFixed(0), 10));
        })
        .catch(e => {
          console.log(e);
        });
    };

    getSavingsPassbookList();
  }, [
    savingsPassbookList,
    setSavingsPassbookList,
    billSetting,
    setMaturityMoney,
  ]);

  const postSavings = () => {
    axiosInstance
      .post('/savings')
      .then(response => {
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const [term, setTerm] = useState<string>('매 달 1일');

  return (
    <View style={styles.block}>
      <LoadingScreen />
      <View>
        <View style={styles.installmentContainer}>
          <View style={styles.totalMoneyContainer}>
            <Text style={[styles.bold, styles.baseTextSize]}>저축내역</Text>
            <TotalMoneyView
              total={savingsPassbookList?.items[0]?.savingsTotal}
              backgroundColor={color.light_apricot}
            />
          </View>
          <View style={styles.moneyUnitSettingContainer}>
            <Text style={[styles.baseTextSize, styles.termText]}>
              {term} {billSetting.bill} 리브씩 저금중
            </Text>
            <TouchableOpacity
              style={styles.settingButton}
              onPress={() => {
                navigation.navigate('SavingsSetting', {
                  interest: savingsPassbookList?.items[0]?.interest,
                });
              }}>
              <Image source={require('~/assets/images/setting.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.billContainer}>
            <Text style={styles.baseTextSize}>
              이자율 {savingsPassbookList?.items[0]?.interest}%
            </Text>
            <Text style={styles.baseTextSize}>
              6개월 만기 시 {maturityMoney} 리브
            </Text>
          </View>
          {savingsPassbookList?.items[0]?.maturity !== 0 && (
            <View style={styles.buttonWrapper}>
              <PassbookButton
                textColor={color.apricot}
                backgroundColor={color.light_apricot}
                buttonText="만기된 적금 받기"
                onPress={() => {
                  postSavings();
                }}
              />
            </View>
          )}
        </View>
        <View style={styles.separatorBar} />
        <FlatList
          style={styles.detailContentList}
          ListFooterComponent={<View style={styles.footer} />}
          data={savingsPassbookList.items}
          renderItem={({item}) => (
            <View style={styles.detailContentContainer} key={item.savingsId}>
              <View style={styles.itemContainer}>
                <View style={styles.dateContentContainer}>
                  <Text style={styles.date}>{item.createdAt}</Text>
                  <View style={styles.seperator} />
                  <Text style={styles.contentName}>{item.content}</Text>
                </View>
                <View style={styles.moneyWrapper}>
                  {item.stateName === 'DEPOSIT' ? (
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
  baseTextSize: {
    fontSize: 20,
    color: `${color.deep}`,
  },
  bold: {
    fontWeight: 'bold',
  },
  seperator: {
    width: 10,
  },
  installmentContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
  },
  totalMoneyContainer: {
    marginTop: 15,
    marginBottom: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moneyUnitSettingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  termText: {
    marginRight: 13,
  },
  settingButton: {},
  separatorBar: {
    height: 7,
    backgroundColor: `${color.light_gray3}`,
    marginVertical: 15,
  },
  detailContentList: {},
  detailContentContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    paddingTop: 10,
    paddingHorizontal: 13,
  },
  date: {
    color: `${color.system_information}`,
  },
  itemContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    // backgroundColor: '#111',
  },
  dateContentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentName: {
    color: `${color.deep}`,
    fontSize: 18,
    textAlign: 'left',
  },
  moneyWrapper: {},
  money: {
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
  billContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonWrapper: {
    marginTop: 15,
  },
});

export default SavingsPassbookScreen;
