import React, {Children, useEffect, useRef, useState} from 'react';
import {Animated, Button, StyleSheet, Text, View} from 'react-native';

type Props = {
  children: any;
};

const Slide: React.FC<Props> = ({children}) => {
  const animation = useRef(new Animated.Value(0)).current;
  const [enabled, setEnabled] = useState(false);
  const upDownAnimation = Animated.spring(animation, {
    toValue: enabled ? 10 : 0,
    friction: 1,
    tension: 20,
    useNativeDriver: true,
  });

  useEffect(() => {
    Animated.loop(upDownAnimation, {
      iterations: 10,
    }).start();
  }, [upDownAnimation]);

  setInterval(() => {
    setEnabled(!enabled);
  }, 500);

  return (
    <View>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{translateY: animation}],
          },
        ]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  container: {
    // position: 'absolute',
    // left: 50,
    // top: 50,
    // width: 100,
    // height: 100,
    // backgroundColor: '#111',
    zIndex: 5,
  },
});

export default Slide;
