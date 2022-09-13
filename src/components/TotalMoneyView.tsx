import {StyleSheet, Text, View} from 'react-native';
import color from '~/constants/color';
import ShadowEffect from './ShadowEffect';

type Props = {
  total: number;
  backgroundColor: string;
};

const TotalMoneyView: React.FC<Props> = ({total = 0, backgroundColor}) => {
  return (
    <ShadowEffect>
      <View
        style={[styles.totalMoneyView, dynamicStyles({backgroundColor}).block]}>
        <Text style={styles.textSize}>
          총 <Text style={styles.bold}>{total}</Text> 리브
        </Text>
      </View>
    </ShadowEffect>
  );
};

const dynamicStyles = (value: {backgroundColor: string}) =>
  StyleSheet.create({
    block: {
      backgroundColor: value.backgroundColor,
    },
  });

const styles = StyleSheet.create({
  totalMoneyView: {
    // backgroundColor: `${color.light_apricot}`,
    width: 130,
    height: 40,
    borderRadius: 17.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSize: {
    fontSize: 18,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default TotalMoneyView;
