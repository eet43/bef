import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const Jfood = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    setIsLoding(true);
    axios
      .get('https://delivery-friend.herokuapp.com/board/category/2', {
        header: {
          token: '1234',
        },
      })
      .then(function (response) {
        console.log(response);
        setData(response.data); /// 제목: [{'id: adaw }]
        console.log(data);
      })
      .catch(console.error)
      .finally(() => setIsLoding(false));
  }, []);

  const renderBoard = ({item, onPress}) => { //보여지는 하나의 list
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Board', {itemData: item})}>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={require('../assets/default_food1.jpeg')}
              resizeMode={'cover'}
              resizeMethod={'auto'}
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{`${item.title}`}</Text>
            <Text numberOfLines={2} style={styles.cardDetails}>{`${item.text}`}</Text>
            <View style={styles.cardBottom1}>
              <Text style={styles.fontSize}>{`${item.date}`}</Text>
              <Text style={styles.fontSize}>{`${item.location}`}</Text>
            </View>
            <View style={styles.cardBottom2}>
              <Text style={styles.fontSize}>{`${item.price}`}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.mainPostView}>
      {isLoding ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data.reverse()}
          keyExtractor={item => `key-${item.id}`}
          renderItem={renderBoard}
        />
      )}
    </SafeAreaView>
  );
};

export default Jfood;

const styles = StyleSheet.create({
  mainPostView: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
  cardBottom1: {
    flex: 3,
    flexDirection: 'row',
  },
  cardBottom2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  fontSize: {
    fontSize: 8,
    color: '#444',
  },
});
