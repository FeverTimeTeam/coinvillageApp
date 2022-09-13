import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setInterval(() => {
      setIsLoading(true);
    }, 1000);
  }, []);
  return (
    <View style={styles.block}>
      <Spinner
        visible={!isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    // transform: translate(-50%, -50%),
  },
  spinnerTextStyle: {},
});
export default LoadingScreen;
