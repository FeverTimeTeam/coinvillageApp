import React, {useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import color from '../../constants/color';
import CardFlip from 'react-native-card-flip';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useRecoilState} from 'recoil';
import {authState} from '../../atoms/auth';
import {jobProfileState} from '../../atoms/jobProfile';
import {useEffect} from 'react';
import jobStorage from '../../storages/jobStorage';
import {useNavigation} from '@react-navigation/native';

const JobScreen = () => {
  const navigation = useNavigation();

  const [authUserState, setAuthUserState] = useRecoilState(authState);
  const [profile, setProfile] = useRecoilState(jobProfileState);

  const jobImage = 'coin';

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) {
          return;
        }
        if (res.assets) {
          setProfile({uri: res?.assets[0]?.uri});
          jobStorage.set(res?.assets[0]?.uri);
        }
      },
    );
  };

  useEffect(() => {
    console.log(profile.uri);
  }, [profile]);

  return (
    <View style={styles.block}>
      <CardFlip
        style={styles.cardContainer}
        ref={card => (this.card = card)}
        flipDirection="y">
        <TouchableOpacity
          style={[styles.card, styles.cardFront]}
          onPress={() => this.card.flip()}>
          {profile.uri ? (
            <Image style={styles.circle} source={{uri: profile.uri}} />
          ) : (
            <Image
              style={styles.circle}
              source={require('../../assets/images/profile.png')}
            />
          )}

          <Text style={[styles.text, styles.bold, styles.name]}>
            {authUserState.user?.nickname}
          </Text>
          <Text style={[styles.text, styles.jobName]}>
            {authUserState.user?.jobName}
          </Text>
          <View style={styles.settingButtonWrapper}>
            <TouchableOpacity onPress={onSelectImage}>
              <Image
                source={require('../../assets/images/setting_white.png')}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, styles.cardBack]}
          onPress={() => this.card.flip()}>
          <Image
            source={require('../../assets/images/job_icons/base_icon/base_icon.png')}
          />
          <View style={styles.jobDescriptionContainer}>
            <Text style={[styles.text, styles.bold, styles.bigText]}>
              하는 일
            </Text>
            <Text
              style={[styles.text, styles.smallText, styles.jobDescription]}>
              {authUserState.user?.jobContent}
            </Text>
          </View>
          <View style={styles.paycheckContainer}>
            <Text style={[styles.text, styles.bold, styles.bigText]}>월급</Text>
            <Text style={[styles.text, styles.bigText]}>
              <Text style={styles.bold}>{authUserState.user?.payCheck}</Text>{' '}
              리브
            </Text>
          </View>
          <View style={styles.settingButtonWrapper}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SelectJobIcon');
              }}>
              <Image
                source={require('../../assets/images/select_icon/select_icon.png')}
              />
            </TouchableOpacity>
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
  circle: {
    backgroundColor: `${color.deep}`,
    borderRadius: 128,
    width: 256,
    height: 256,
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
    paddingTop: 80,
    paddingBottom: 29,
  },
  cardBack: {
    backgroundColor: `${color.sky_blue}`,
    paddingTop: 50,
    paddingBottom: 29,
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
    textAlign: 'center',
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
    marginTop: 60,
    paddingHorizontal: 39,
    marginBottom: 30,
  },
});

export default JobScreen;
