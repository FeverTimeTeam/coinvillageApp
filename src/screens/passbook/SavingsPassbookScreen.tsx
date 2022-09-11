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
import PassbookButton from '../../components/PassbookButton';
import {axiosInstance} from '../../queries/index';
import {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {
  savingsPassbookListState,
  SavingsPassbook,
} from '../../atoms/savingsPassbook';

const SavingsPassbookScreen = () => {
  const navigation = useNavigation();
  const [totalMoney, setTotalMoney] = useState<number>(0);
  const [savingsPassbookList, setSavingsPassbookList] = useRecoilState(
    savingsPassbookListState,
  );
  const getSavingsPassbookList = () => {
    axiosInstance
      .get('/savings')
      .then(response => {
        console.log(response.data);
        setSavingsPassbookList({items: response.data});
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getSavingsPassbookList();
  }, []);

  const [term, setTerm] = useState<string>('매주 월요일');
  const [moneyUnit, setMoneyUnit] = useState<number>(0);
  return (
    <View style={styles.block}>
      <View>
        <View style={styles.installmentContainer}>
          <View style={styles.totalMoneyContainer}>
            <Text style={[styles.bold, styles.baseTextSize]}>저축내역</Text>
            <View style={styles.totalMoneyView}>
              <Text style={styles.baseTextSize}>
                총 <Text style={styles.bold}>{totalMoney}</Text> 미소
              </Text>
            </View>
          </View>
          <View style={styles.moneyUnitSettingContainer}>
            <Text style={[styles.baseTextSize, styles.termText]}>
              {term}, {moneyUnit} 미소
            </Text>
            <TouchableOpacity
              style={styles.settingButton}
              onPress={() => {
                navigation.navigate('SavingsSetting');
              }}>
              <Image source={require('../../assets/images/setting.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.consumeButtonWrapper}>
          <PassbookButton
            textColor={color.apricot}
            backgroundColor={color.light_apricot}
            buttonText="저축하기"
            onPress={() => {
              axiosInstance
                .post('/savings', {})
                .then(response => {
                  console.log(response.data);
                })
                .catch(e => {
                  console.log(e);
                });
            }}
          />
        </View>
        <View style={styles.separatorBar} />
        <FlatList
          style={styles.detailContentList}
          ListFooterComponent={<View style={styles.footer} />}
          data={savingsPassbookList.items}
          renderItem={({item}) => (
            <View style={styles.detailContentContainer} key={item.savingsId}>
              <View style={styles.dateContainer}>
                <Text style={styles.date}>{item.createdAt}</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.contentName}>{item.content}</Text>
                <Text style={[styles.money, styles.deposit]}>{item.total}</Text>
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
    fontSize: 18,
    color: `${color.deep}`,
  },
  bold: {
    fontWeight: 'bold',
  },
  installmentContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    height: 82,
    paddingLeft: 35,
    paddingHorizontal: 13,
  },
  totalMoneyContainer: {
    marginTop: 15,
    height: 35,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalMoneyView: {
    backgroundColor: `${color.light_apricot}`,
    width: 117,
    height: 35,
    borderRadius: 17.5,
    display: 'flex',
    justifyContent: 'center',
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
  },
  detailContentList: {},
  detailContentContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 9,
    height: 50,
    paddingTop: 10,
    paddingHorizontal: 13,
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

export default SavingsPassbookScreen;
