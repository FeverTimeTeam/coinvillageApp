import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {basePassbookState} from '../../atoms/basePassbook';
import color from '../../constants/color';
import {axiosInstance} from '../../queries';

const StockTransactionScreen = () => {
  const [basePassbookListState, setBasePassbookListState] =
    useRecoilState(basePassbookState);

  const getBasePassbookList = () => {
    axiosInstance
      .get('/accounts')
      .then(response => {
        setBasePassbookListState({items: response.data});
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBasePassbookList();
  }, []);

  return (
    <View style={styles.block}>
      <FlatList
        style={styles.detailContentList}
        ListFooterComponent={<View style={styles.footer} />}
        data={basePassbookListState.items}
        renderItem={({item}) => (
          <View style={styles.detailContentContainer} key={item.accountId}>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>{item.createdAt}</Text>
              <Text style={styles.contentName}>{item.content}</Text>
            </View>
            <View style={styles.contentContainer}>
              {item.state === 'DEPOSIT' ? (
                <Text style={[styles.money, styles.deposit]}>
                  {item.total}주
                </Text>
              ) : (
                <Text style={[styles.money, styles.withdrawal]}>
                  {item.total}주
                </Text>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: `${color.white}`,
  },
  footer: {
    height: 300,
  },
  detailContentList: {},
  detailContentContainer: {
    marginHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingTop: 10,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  date: {
    color: `${color.system_information}`,
    fontSize: 12,
  },
  contentContainer: {
    width: 120,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 16,
  },
  contentName: {
    color: `${color.deep}`,
    fontSize: 18,
    marginLeft: 12,
  },
  money: {
    fontSize: 23,
    fontWeight: 'bold',
    // textAlign: 'right',
  },
  deposit: {
    color: `${color.blue}`,
  },
  withdrawal: {
    color: `${color.system_warning}`,
  },
});

export default StockTransactionScreen;
