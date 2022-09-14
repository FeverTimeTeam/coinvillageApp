import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import color from '../../constants/color';
import ModalSelector from 'react-native-modal-selector';
import {axiosInstance} from '../../queries';
import {useRecoilState} from 'recoil';
import {
  savingsBillState,
  maturityMoneyState,
} from '../../atoms/savingsPassbook';
import PassbookButton from '../../components/PassbookButton';
import {useNavigation} from '@react-navigation/native';

const SavingsSettingScreen = ({route, navigation}) => {
  // const navigation = useNavigation();
  const {interest} = route.params;
  const [maturityMoney, setMaturityMoney] = useRecoilState(maturityMoneyState);
  const [tmpMaturityMoney, setTmpMaturityMoney] = useState(0);

  const [billInput, setBillInput] = useState(0);
  const [billSetting, setBillSetting] = useRecoilState(savingsBillState);

  const postSavingsSetting = () => {
    axiosInstance
      .put('/savings/change', {
        bill: billInput,
      })
      .then(response => {
        console.log(response.data);
        setBillSetting({bill: response.data.bill});
        Alert.alert(
          '적용되었습니다!',
          `매 달 ${billInput} 리브씩 저금합니다.`,
          [
            {
              text: '확인',
              onPress: () => {
                navigation.pop();
              },
            },
          ],
        );
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <View style={styles.block}>
      <View style={styles.termContainer}>
        <Text style={styles.currentText}>현재</Text>
        <Text style={styles.termText}>매 달 1일, {billInput} 리브</Text>
      </View>
      {/* <View style={styles.infoWrapper}>
        <Text style={styles.infoText}>
          * 설정 / 변경 시 다음 달부터 적용됩니다.
        </Text>
      </View> */}

      <View style={styles.billContainer}>
        <Text style={styles.selectText}>매달</Text>
        <TextInput
          style={[styles.input, styles.moneyInput]}
          value={billInput.toString()}
          onChange={e => {
            const tmpMoney = parseInt(e.nativeEvent.text);
            if (!isNaN(tmpMoney)) {
              setBillInput(tmpMoney);
              const tmpMaturity = ((interest + 100) * tmpMoney * 6) / 100;
              setTmpMaturityMoney(parseInt(tmpMaturity.toFixed(0), 10));
            } else if (e.nativeEvent.text === '') {
              setBillInput(0);
            } else {
              console.log('숫자만 입력');
            }
          }}
        />
        <Text style={styles.selectText}>리브 넣기</Text>
      </View>

      <View style={styles.billContainer}>
        <Text style={styles.selectText}>
          6개월 만기 시 {tmpMaturityMoney} 리브
        </Text>
      </View>
      <View style={styles.separatorBar} />
      <View style={styles.buttonWrapper}>
        <PassbookButton
          textColor={color.apricot}
          backgroundColor={color.light_apricot}
          buttonText="적용하기"
          onPress={() => {
            postSavingsSetting();
          }}
        />
      </View>
      {/* <View style={styles.radioListContainer}>
        <View style={styles.radioContainer}>
          <View style={styles.radioButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                setRadioSelected('week');
              }}>
              {radioSelected === 'week' ? (
                <Image
                  style={styles.radioButton}
                  source={require('../../assets/images/radio_active.png')}
                />
              ) : (
                <Image
                  style={styles.radioButton}
                  source={require('../../assets/images/radio_inactive.png')}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.selectText}>매주 (일주일 단위)</Text>
          </View>
          {radioSelected === 'week' && (
            <View style={styles.selectContentContainer}>
              <ModalSelector
                style={styles.select}
                data={data}
                initValue="요일 선택"
                onChange={option => {
                  console.log(`${option.label}을 선택하셨습니다.`);
                }}
              />
              <Text style={styles.selectText}>금액</Text>
              <TextInput
                style={[styles.input, styles.moneyInput]}
                value={weekMoney.toString()}
                onChange={e => {
                  const tmpMoney = parseInt(e.nativeEvent.text);
                  if (!isNaN(tmpMoney)) {
                    setWeekMoney(tmpMoney);
                  } else if (e.nativeEvent.text === '') {
                    setWeekMoney(0);
                  } else {
                    console.log('숫자만 입력');
                  }
                }}
              />
              <Text style={styles.selectText}>리브씩</Text>
            </View>
          )}
        </View>
        <View style={styles.radioContainer}>
          <View style={styles.radioButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                setRadioSelected('month');
              }}>
              {radioSelected === 'month' ? (
                <Image
                  style={styles.radioButton}
                  source={require('../../assets/images/radio_active.png')}
                />
              ) : (
                <Image
                  style={styles.radioButton}
                  source={require('../../assets/images/radio_inactive.png')}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.selectText}>매월 (한 달 단위)</Text>
          </View>
          {radioSelected === 'month' && (
            <View style={styles.selectContentContainer}>
              <ModalSelector
                style={styles.select}
                data={data}
                initValue="날짜 선택"
                onChange={option => {
                  console.log(`${option.label}을 선택하셨습니다.`);
                }}
              />
              <Text style={styles.selectText}>금액</Text>
              <TextInput
                style={[styles.input, styles.moneyInput]}
                value={monthMoney.toString()}
                onChange={e => {
                  const tmpMoney = parseInt(e.nativeEvent.text);
                  if (!isNaN(tmpMoney)) {
                    setMonthMoney(tmpMoney);
                  } else if (e.nativeEvent.text === '') {
                    setMonthMoney(0);
                  } else {
                    console.log('숫자만 입력');
                  }
                }}
              />
              <Text style={styles.selectText}>리브씩</Text>
            </View>
          )}
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: `${color.white}`,
    paddingHorizontal: 16,
  },
  termContainer: {
    marginTop: 15,
    marginHorizontal: 16,
  },
  separatorBar: {
    height: 7,
    backgroundColor: `${color.light_gray3}`,
    marginVertical: 15,
  },
  currentText: {
    fontSize: 15,
    color: `${color.gray}`,
    marginBottom: 10,
  },
  termText: {
    marginBottom: 14,
    fontSize: 20,
    color: `${color.deep}`,
  },
  infoWrapper: {
    height: 40,
    backgroundColor: `${color.light_gray3}`,
    borderRadius: 7,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 19,
  },
  infoText: {
    fontSize: 15,
    color: `${color.warm_gray1}`,
  },
  radioListContainer: {
    marginHorizontal: 16,
  },
  radioContainer: {
    display: 'flex',
  },
  radioButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  radioButton: {
    marginRight: 12,
  },
  selectText: {
    fontSize: 18,
  },
  selectContentContainer: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  select: {
    borderWidth: 1,
    borderColor: `${color.apricot}`,
    borderRadius: 6,
  },
  input: {
    height: 40,
    width: 180,
    borderWidth: 1,
    borderColor: `${color.apricot}`,
    borderRadius: 10,
    textAlign: 'center',
  },
  moneyInput: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonWrapper: {
    // marginVertical: 15,
  },
  billContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
});

export default SavingsSettingScreen;
