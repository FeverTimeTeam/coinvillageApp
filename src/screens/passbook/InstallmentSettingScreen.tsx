import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import color from '../../constants/color';
import ModalSelector from 'react-native-modal-selector';

const InstallmentSettingScreen = () => {
  const [selectedValue, setSelectedValue] = useState('java');
  let index = 0;
  const data = [
    {key: index++, label: '월요일'},
    {key: index++, label: '화요일'},
    {key: index++, label: '수요일'},
    {
      key: index++,
      label: '목요일',
      accessibilityLabel: 'Tap here for cranberries',
    },
    // etc...
    // Can also add additional custom keys which are passed to the onChange callback
    {key: index++, label: '금요일', customKey: 'Not a fruit'},
  ];
  const [radioSelected, setRadioSelected] = useState<'week' | 'month'>('week');
  return (
    <View style={styles.block}>
      <View style={styles.termContainer}>
        <Text style={styles.currentText}>현재</Text>
        <Text style={styles.termText}>매주 월요일, 5 미소씩</Text>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.infoText}>
          * 변경 시 다음주 / 다음 달부터 적용됩니다.
        </Text>
      </View>
      <View style={styles.radioListContainer}>
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
                  alert(`${option.label} (${option.key})을 선택하셨습니다.`);
                }}
              />
              <Text style={styles.selectText}>금액</Text>
              <TextInput style={styles.input} />
              <Text style={styles.selectText}>미소씩</Text>
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
                  alert(`${option.label} (${option.key})을 선택하셨습니다.`);
                }}
              />
              <Text style={styles.selectText}>금액</Text>
              <TextInput style={styles.input} />
              <Text style={styles.selectText}>미소씩</Text>
            </View>
          )}
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
  },
  termContainer: {
    marginTop: 15,
    marginHorizontal: 16,
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
    height: 43,
    width: 70,
    borderWidth: 1,
    borderColor: `${color.apricot}`,
    borderRadius: 10,
    textAlign: 'center',
  },
});

export default InstallmentSettingScreen;
