import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useRecoilState} from 'recoil';
import color from '../../constants/color';
import {axiosInstance} from '../../queries';
import {stockHistoryListState} from '../../atoms/stock';

const StockTransactionScreen = () => {
  const [stockHistoryList, setStockHistoryList] = useRecoilState(
    stockHistoryListState,
  );

  useEffect(() => {
    const getStockHistoryList = () => {
      axiosInstance
        .get('/stocks/history')
        .then(response => {
          // console.log(response.data.reverse());
          setStockHistoryList({items: response.data.reverse()});
        })
        .catch(e => {
          console.log(e);
        });
    };
    getStockHistoryList();
  }, [setStockHistoryList]);

  return (
    <View style={styles.block}>
      <FlatList
        style={styles.detailContentList}
        ListFooterComponent={<View style={styles.footer} />}
        data={stockHistoryList.items}
        renderItem={({item}) => (
          <View style={styles.detailContentContainer} key={item.stockId}>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>{item.createdAt}</Text>
              <Text style={styles.contentName}>{item.content}</Text>
            </View>
            <View style={styles.contentContainer}>
              {item.stateName === 'DEPOSIT' ? (
                <Text style={[styles.money, styles.deposit]}>
                  +{item.countCount}주
                </Text>
              ) : (
                <Text style={[styles.money, styles.withdrawal]}>
                  -{item.countCount}주
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
    marginHorizontal: 20,
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingTop: 20,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  date: {
    color: `${color.system_information}`,
    fontSize: 15,
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
