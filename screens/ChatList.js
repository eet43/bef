import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ChatList = ({navigation}) => {
  const [nickName, setNickName] = useState('');
  const [id, setId] = useState(0);
  const [Items, setItems] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('User', (error, result) => {
      console.log(result);
      const UserInfo = JSON.parse(result);
      setId(UserInfo.id);
    });
  }, []);

  const [userList, setUserList] = useState([
    {
      nickName: '정은영',
      image: '{"uri":"file:///Users/thebettertech/Library/Developer/CoreSimulator/Devices/9196F6C7-CEF8-4EB808-2AC47EE426DA/data/Containers/Data/Application/7BC49E8F-9BEC-45CB-8F02-254581D6D40F/tmp/20F91CF5-382D-48BB-920D-D75B8996DBC0.jpg"}',
      sender_id: '1943114808',
      receiver_id: '2003818972',
    },
  ]);
  const setChat = () => { //채팅 리스트 받아오기
    axios
      .post('http://127.0.0.1:8000/chat/room/room_name/', {
        room_name: 'asdf-1234',
      })
      .then(function (response) {
        // setItems(response.data);
        // const u_list = Items.services.map(function( item ) {
        //   return {
        //     nickName: item.nickname,
        //     image: item.image,
        //     sender_id: id,
        //     receiver_id: item.id,
        //   };
        // });
        navigation.replace('Chat', {
          address: `ws://127.0.0.1:8000/ws/chat/asdf-1234/`,
          record: {
            nickName: '정은영',
            image: '{"uri":"file:///Users/thebettertech/Library/Developer/CoreSimulator/Devices/9196F6C7-CEF8-4EB808-2AC47EE426DA/data/Containers/Data/Application/7BC49E8F-9BEC-45CB-8F02-254581D6D40F/tmp/20F91CF5-382D-48BB-920D-D75B8996DBC0.jpg"}',
            sender_id: '1943114808',
            receiver_id: '2003818972',
          },
        });
      })
      .catch(console.error);
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{
          marginHorizontal: 15,
          marginTop: 20,
        }}
        data={userList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={index}
            style={{
              padding: 10,
              elevation: 10,
              borderRadius: 10,
              borderWidth: 1,
              backgroundColor: '#ff',
              borderColor: '#ddd',
              marginBottom: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => setChat()}>
            <Image
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                borderWidth: 0.5,
                borderColor: '#ddd',
              }}
              source={item.image}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 14,
                marginLeft: 20,
                fontWeight: '400',
              }}>{item.nickName} </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default ChatList;
