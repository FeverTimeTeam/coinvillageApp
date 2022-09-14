import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ReactNode} from 'react';
import color from '~/constants/color';

type Props = {
  next:
    | 'AboutFirst'
    | 'AboutSecond'
    | 'AboutThird'
    | 'AboutFourth'
    | 'AboutFifth'
    | 'AboutLast';
  children: ReactNode;
};

const About: React.FC<Props> = ({next, children}: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.block}>
      <TouchableOpacity
        style={styles.inner}
        onPress={() => {
          navigation.navigate(next);
        }}>
        {children}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: `${color.white}`,
  },
  inner: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 50,
  },
});

export default About;
