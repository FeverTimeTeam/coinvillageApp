import React, {useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PostGridItem from '../../components/PostGridItem';
import color from '../../constants/color';

const SelectJobIconScreen = () => {
  type icon = {
    id: number;
    name: string;
    photoURL: string;
  };

  const [icons, setIcons] = useState<icon[]>([
    {
      id: 0,
      name: '은행원',
      photoURL: '~/assets/images/job_icons/base_icon/base_icon.png',
    },
    {
      id: 1,
      name: '우체부',
      photoURL: '~/assets/images/job_icons/postman/postman.png',
    },
    // {
    //   id: 2,
    //   name: '은행원',
    //   photoURL: '../../assets/images/job_icons/base_icon/base_icon.png',
    // },
    // {
    //   id: 3,
    //   name: '은행원',
    //   photoURL: '../../assets/images/job_icons/base_icon/base_icon.png',
    // },
    // {
    //   id: 4,
    //   name: '은행원',
    //   photoURL: '../../assets/images/job_icons/base_icon/base_icon.png',
    // },
    // {
    //   id: 5,
    //   name: '은행원',
    //   photoURL: '../../assets/images/job_icons/base_icon/base_icon.png',
    // },
    // {
    //   id: 6,
    //   name: '은행원',
    //   photoURL: '../../assets/images/job_icons/base_icon/base_icon.png',
    // },
    // {
    //   id: 7,
    //   name: '은행원',
    //   photoURL: '../../assets/images/job_icons/base_icon/base_icon.png',
    // },
  ]);

  return (
    <View style={styles.block}>
      <FlatList
        style={styles.block}
        data={icons}
        renderItem={item => <PostGridItem key={item.id} post={item} />}
        numColumns={3}
        keyExtractor={item => item.id}
      />
      {icons.map(icon => {
        console.log(icon.photoURL);
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    // backgroundColor: `${color.white}`,
  },
});

export default SelectJobIconScreen;
