import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import color from '../../constants/color';
import {axiosInstance} from '../../queries';
import {useRecoilState} from 'recoil';
import {allStockListState} from '../../atoms/stock';
import LoadingScreen from '../../components/LoadingScreen';
import ShadowEffect from '~/components/ShadowEffect';

const InvestmentScreen = () => {
  const navigation = useNavigation();
  const [allStockList, setAllStockList] = useRecoilState(allStockListState);
  useEffect(() => {
    const getAllStockList = () => {
      axiosInstance
        .get('/stocks')
        .then(response => {
          setAllStockList({items: response.data});
        })
        .catch(e => {
          console.log(e);
        });
    };

    getAllStockList();
  }, [allStockList, setAllStockList]);

  return (
    <View style={styles.block}>
      <LoadingScreen />
      <View style={styles.myInvestmentWrapper}>
        <TouchableOpacity
          style={styles.myInvestment}
          onPress={() => {
            navigation.navigate('MyInvestment');
          }}>
          <Text style={[styles.textColorWhite, styles.bold, styles.textBig]}>
            My 투자
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.textHuge, styles.bold]}>종목</Text>
      <View>
        <FlatList
          style={[styles.detailContentList]}
          ListFooterComponent={<View style={styles.footer} />}
          data={allStockList.items}
          renderItem={({item}) => (
            <ShadowEffect>
              <TouchableOpacity
                style={styles.contentContainer}
                key={item.stockId}
                onPress={() => {
                  navigation.push('InvestmentBuy', {
                    stockId: item.stockId,
                    content: item.content,
                  });
                }}>
                <Text style={[styles.textMid]}>{item.content}</Text>
                {item.gap > 0 ? (
                  <Text style={[styles.up, styles.bold, styles.textBig]}>
                    +{item.percent.toFixed(2)}%
                  </Text>
                ) : item.gap < 0 ? (
                  <Text style={[styles.down, styles.bold, styles.textBig]}>
                    {item.percent.toFixed(2)}%
                  </Text>
                ) : (
                  <Text style={[styles.bold, styles.textHuge]}>-</Text>
                )}
              </TouchableOpacity>
            </ShadowEffect>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: `${color.white}`,
    paddingHorizontal: 16,
  },
  footer: {
    height: 200,
  },
  textSmall: {
    fontSize: 12,
  },
  textMid: {
    fontSize: 15,
  },
  textBig: {
    fontSize: 18,
  },
  textHuge: {
    fontSize: 22,
  },
  bold: {
    fontWeight: 'bold',
  },
  textColorDeep: {
    color: `${color.deep}`,
  },
  textColorSystem: {
    color: `${color.system_information}`,
  },
  textColorGreen: {
    color: `${color.green}`,
  },
  textColorWhite: {
    color: `${color.white}`,
  },
  backgroundGreen: {
    backgroundColor: `${color.light_green2}`,
  },
  separatorBar: {
    height: 7,
    backgroundColor: `${color.light_gray3}`,
  },
  up: {
    color: `${color.system_warning}`,
  },
  down: {
    color: `${color.blue}`,
  },
  myInvestmentWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  myInvestment: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: `${color.kb}`,
    height: 45,
    width: 102,
  },
  balance: {
    width: 117,
    height: 35,
    borderRadius: 17.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    marginBottom: 10,
  },
  stock: {
    marginTop: 15,
    marginBottom: 5,
  },
  submitButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
    borderRadius: 15,
    marginTop: 13,
    marginBottom: 15,
  },
  passbookButtonWrapper: {
    marginBottom: 11,
    ...Platform.select({
      ios: {
        shadowColor: `${color.warm_gray_deep}`, //그림자색
        shadowOpacity: 0.2, //그림자 투명도
        shadowOffset: {width: 2, height: 2}, //그림자 위치
        shadowRadius: 3,
      },
      android: {
        //ANDROID
        elevation: 3,
      },
    }),
  },
  detailContentList: {},
  contentContainer: {
    backgroundColor: `${color.white}`,
    height: 71,
    width: '99%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    borderRadius: 16,
    marginBottom: 16,
  },
});

export default InvestmentScreen;
