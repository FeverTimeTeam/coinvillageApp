import React from 'react';
import {Platform, Pressable, StyleSheet, Text} from 'react-native';
import color from '../constants/color';

type Props = {
  buttonText: string;
  textColor?: string;
  backgroundColor?: string;
  onPress: () => void;
};

const PassbookButton: React.FC<Props> = ({
  buttonText,
  onPress,
  textColor = `${color.kb}`,
  backgroundColor = `${color.light_yellow}`,
}) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles({textColor, backgroundColor}).button,
        Platform.OS === 'ios' && pressed && {backgroundColor: color.light_gray},
      ]}
      android_ripple={{color: '#ededed'}}
      onPress={onPress}>
      <Text style={styles({textColor, backgroundColor}).buttonText}>
        {buttonText}
      </Text>
    </Pressable>
  );
};

const styles = (value: {textColor: string; backgroundColor: string}) =>
  StyleSheet.create({
    button: {
      width: '100%',
      height: 64,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: `${color.light_yellow}`,
      borderRadius: 15,
    },
    buttonText: {
      fontSize: 24,
      color: value.textColor,
    },
  });

export default PassbookButton;
