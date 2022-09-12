import React from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';
import {useEffect} from 'react';
import color from '../constants/color';
import {useNavigation} from '@react-navigation/native';

const PostGridItem = ({post}) => {
  const navigation = useNavigation();
  const dimensions = useWindowDimensions();
  const size = dimensions.width / 3;

  const onPress = () => {
    // navigation.pop();
    Alert.alert('직업 아이콘 선택 완료!', '', [
      {
        text: '확인',
        onPress: () => {
          navigation.pop();
        },
      },
    ]);
  };

  useEffect(() => {
    console.log(post.item.photoURL);
    // console.log(num.toFixed(2));
  }, [post]);

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          opacity: pressed ? 0.6 : 1,
          width: size,
          height: size,
        },
        styles.block,
      ]}>
      <Image
        source={require('../assets/images/job_icons/bank/bank.png')}
        resizeMethod="resize"
        resizeMode="cover"
      />
      <Text>{post.item.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: `${color.white}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: `${color.light_gray2}`,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default PostGridItem;
