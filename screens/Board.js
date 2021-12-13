import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform, Button, TouchableOpacity,
} from 'react-native';
import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Post from '../screens/Post';
import AsyncStorage from "@react-native-async-storage/async-storage";
import async from "async";

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

const Board = ({route, navigation}) => {
  const itemData = route.params.itemData;
  const [label, setLabel] = useState('');
  const [nickname, setNickname] = useState('');
  const [image, setImage] = useState('');
  const [senderId, setSenderId] = useState('');
  const [receiverId, setReceiverId] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('User', (error, result) => {
      console.log(result);
      const UserInfo = JSON.parse(result);
      setSenderId(UserInfo.id);
    });
  }, []);

  const setChat = () => {
    axios
      .post('http://127.0.0.1:8000/chat/room/room_name/', {
        room_name: 'asdf-1234', ///주소
      })
      .then(function (response) {
        console.log(response);
        let user = {
          nickName: '김대희',
          sender_id: senderId,
          receiver_id: '1943114808',
          image: '{"uri":"file:///Users/thebettertech/Library/Developer/CoreSimulator/Devices/9196F6C7-CEF8-4EBD-9808-2AC47EE426DA/data/Containers/Data/Application/7BC49E8F-9BEC-45CB-8F02-254581D6D40F/tmp/17667C3E-4CBA-4059-B1C9-954869563CD9.jpg"}',
        };
        navigation.replace('NewChat', {
          address: `ws://127.0.0.1:8000/ws/chat/asdf-1234/`, ///주소
          record: user,
        });
      })
      .catch(console.error);
  };

  // const setChat = () => {
  //   console.log(1);
  //   axios
  //     .post('http://127.0.0.1:8000/chat/new_room/', {
  //       author: itemData.author, //유저 author id 값 보내주기
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //       let label = response.data['label'];
  //       let user = {
  //         nickName: response.data['nickname'],
  //         sender_id: senderId,
  //         receiver_id: response.data['social_login_id'],
  //         image: response.data['image'],
  //       };
  //       console.log(label);
  //       console.log(user);
  //       console.log(2);
  //       axios
  //         .post('http://127.0.0.1:8000/chat/room/room_name/', {
  //           room_name: label,
  //         })
  //         .then(function (response) {
  //           console.log(response);
  //           navigation.replace('NewChat', {
  //             address: `ws://127.0.0.1:8000/ws/chat/${label}/`,
  //             record: user,
  //           });
  //         })
  //         .catch(console.error);
  //     })
  //     .catch(console.error);
  // };


  return (
    <View style={styles.container}>
      <ImageHeaderScrollView ///이미지 불러오는 부분, 이미지 정보 input 생성하고 수정해야함.
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.7}
        minOverlayOpacity={0.3}
        renderHeader={() => (
          <Image
            source={require('../assets/default_food.jpeg')}
            style={styles.image}
          />
        )}>
        <TriggeringView style={styles.section}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>{itemData.title}</Text>
            <View>
              <TouchableOpacity style={styles.button} onPress={setChat}>
                <Text style={{fontSize: 15, color: '#fff'}}>메시지 보내기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TriggeringView>
        <View style={[styles.section, styles.sectionLarge]}>
          <Text style={styles.sectionContent}>{itemData.text}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.categories}>
            <View style={styles.categoryContainer}>
              <FontAwesome name={'tag'} size={16} color={'#fff'} />
              <Text style={styles.category}>{itemData.price}원</Text>
            </View>
            <View style={styles.categoryContainer}>
              <FontAwesome name={'tag'} size={16} color={'#fff'} />
              <Text style={styles.category}>{itemData.location}</Text>
            </View>
          </View>
        </View>
      </ImageHeaderScrollView>
    </View>
  );
};

export default Board;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF8000',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 15,
    color: '#fff',
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 5,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    minHeight: 300,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#FF8000',
    borderRadius: 20,
    padding: 10,
  },
});
