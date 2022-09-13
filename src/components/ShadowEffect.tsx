import {ReactNode} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import color from '~/constants/color';

type Offset = {
  width: number;
  height: number;
};

type Props = {
  shadowColor?: string;
  opacity?: number;
  offset?: Offset;
  radius?: number;
  children: ReactNode;
  style: any;
};

const ShadowEffect: React.FC<Props> = ({
  shadowColor = `${color.warm_gray_deep}`,
  opacity = 0.3,
  offset = {width: 3, height: 3},
  radius = 3,
  children,
  style,
}) => {
  return (
    <View style={[styles({shadowColor, opacity, offset, radius}).block, style]}>
      {children}
    </View>
  );
};

const styles = (value: {
  shadowColor: string;
  opacity: number;
  offset: Offset;
  radius: number;
}) =>
  StyleSheet.create({
    block: {
      ...Platform.select({
        ios: {
          shadowColor: `${color.warm_gray_deep}`, //그림자색
          shadowOpacity: 0.3, //그림자 투명도
          shadowOffset: {width: 3, height: 3}, //그림자 위치
          shadowRadius: 3,
        },
        android: {
          //ANDROID
          elevation: 3,
        },
      }),
    },
  });

export default ShadowEffect;
