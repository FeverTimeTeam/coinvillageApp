import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import color from '../constants/color';
import CardFlip from 'react-native-card-flip';

const JobScreen = () => {
  type nation = {
    name: string;
    jobName: string;
    jobDescription: string;
    paycheck: number;
  };
  const [nationInfo, setNationInfo] = useState<nation>({
    name: '유다연',
    jobName: '개발자',
    jobDescription: '돈 개 많 이 번 다 맨날 코딩하고~~!!~!~!',
    paycheck: 13204000,
  });

  return (
    <View style={styles.block}>
      <CardFlip
        style={styles.cardContainer}
        ref={card => (this.card = card)}
        flipDirection="y">
        <TouchableOpacity
          style={[styles.card, styles.cardFront]}
          onPress={() => this.card.flip()}>
          <Image source={require('../assets/images/profile.png')} />
          <Text style={[styles.text, styles.bold, styles.name]}>
            {nationInfo.name}
          </Text>
          <Text style={[styles.text, styles.jobName]}>
            {nationInfo.jobName}
          </Text>
          <View style={styles.settingButtonWrapper}>
            <Image source={require('../assets/images/setting_white.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, styles.cardBack]}
          onPress={() => this.card.flip()}>
          <Image source={require('../assets/images/coin.png')} />
          <View style={styles.jobDescriptionContainer}>
            <Text style={[styles.text, styles.bold, styles.bigText]}>
              하는 일
            </Text>
            <Text
              style={[styles.text, styles.smallText, styles.jobDescription]}>
              {nationInfo.jobDescription}
            </Text>
          </View>
          <View style={styles.paycheckContainer}>
            <Text style={[styles.text, styles.bold, styles.bigText]}>월급</Text>
            <Text style={[styles.text, styles.bigText]}>
              <Text style={styles.bold}>{nationInfo.paycheck}</Text> 리브
            </Text>
          </View>
        </TouchableOpacity>
      </CardFlip>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: `${color.white}`,
    paddingHorizontal: 24,
    paddingTop: 35,
  },
  text: {
    color: `${color.white}`,
  },
  smallText: {
    fontSize: 20,
  },
  bigText: {
    fontSize: 24,
  },
  bold: {
    fontWeight: 'bold',
  },
  cardContainer: {},
  card: {
    height: 567,
    backgroundColor: `${color.sky_blue}`,
    borderRadius: 25,
    display: 'flex',
    alignItems: 'center',
  },
  cardFront: {
    backgroundColor: `${color.sky_blue}`,
    paddingTop: 95,
    paddingBottom: 29,
  },
  cardBack: {
    backgroundColor: `${color.sky_blue}`,
    paddingTop: 61,
    paddingBottom: 29,
    paddingHorizontal: 39,
  },
  name: {
    fontSize: 35,
    letterSpacing: 5,
    marginTop: 104,
  },
  jobName: {
    fontSize: 23,
    marginTop: 18,
  },
  jobDescriptionContainer: {
    marginTop: 30,
  },
  jobDescription: {
    marginTop: 16,
  },
  settingButtonWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    paddingRight: 26,
  },
  paycheckContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 81,
  },
});

export default JobScreen;
