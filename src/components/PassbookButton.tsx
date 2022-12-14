import React from 'react';
import {Platform, Pressable, StyleSheet, Text} from 'react-native';
import color from '../constants/color';
import ShadowEffect from './ShadowEffect';

type Props = {
  buttonText: string;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  onPress: () => void;
};

const PassbookButton: React.FC<Props> = ({
  buttonText,
  onPress,
  textColor = `${color.kb}`,
  backgroundColor = `${color.light_yellow}`,
  borderColor = `${color.white}`,
}) => {
  return (
    <ShadowEffect
      style={styles({textColor, backgroundColor, borderColor}).block}>
      <Pressable
        style={({pressed}) => [
          styles({textColor, backgroundColor, borderColor}).button,
          Platform.OS === 'ios' &&
            pressed && {backgroundColor: color.light_gray},
        ]}
        android_ripple={{color: '#ededed'}}
        onPress={onPress}>
        <Text
          style={styles({textColor, backgroundColor, borderColor}).buttonText}>
          {buttonText}
        </Text>
      </Pressable>
    </ShadowEffect>
  );
};

const styles = (value: {
  textColor: string;
  backgroundColor: string;
  borderColor: string;
}) =>
  StyleSheet.create({
    block: {
      width: '100%',
    },
    button: {
      width: '100%',
      height: 64,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: value.backgroundColor,
      borderWidth: 1,
      borderColor: value.borderColor,
      borderRadius: 15,
    },
    buttonText: {
      fontSize: 24,
      color: value.textColor,
    },
  });

export default PassbookButton;
