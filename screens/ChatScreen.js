import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { uuid } from 'uuidv4';


const ChatScreen = ( {navigation, route}) => {
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState(route.params.record.sender_id);
  const [receiverId, setReceiverId] = useState(route.params.record.receiver_id);
  const [nickName, setNickName] = useState(route.params.record.nickName);
  const [image, setImage] = useState(route.params.record.image);
  const [address, setAddress] = useState('');
  const [Items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  var uuid = require('uuid');
  const uuidv1 = require('uuid/v1');

  let ws = useRef(null);

  useEffect(() => {
    if (!ws.current) {
      console.log(route.params.address);
      ws.current = new WebSocket(route.params.address);
      console.log('initiateSocketConnection');
      ws.current.onopen = () => {
        console.log('connection establish open');
      };
      ws.current.onerror = e => {
        // an error occurred
        console.log(e.message);
      };
      ws.current.onclose = () => {
        console.log('connection establish closed');
      };
      return () => {
        ws.current.close();
      };
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post('http://127.0.0.1:8000/chat/room/asdf-1234/', {
        room_name: 'asdf-1234',
      })
      .then(function (response) {
        let s_messages = [];
        console.log(response.data);
        response.data.forEach(item => {
          let message = {
            _id: uuid.v1(), // receiver id
            text: item.message,
            createdAt: new Date(),
            user: {
              _id: item.senderId, // sender id
              name: nickName,
              avatar: image,
            },
          };
          console.log(message);
          s_messages.push(message);
        });
        console.log('this');
        console.log(s_messages);
        setMessages(s_messages);
        // console.log(messages);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    ws.current.onmessage = e => {
      const response = JSON.parse(e.data);
      console.log('onmessage=>', JSON.stringify(response));
      let sentMessages = {
        _id: uuid.v1(),
        text: response.message,
        createdAt: new Date(),
        user: {
          _id: response.senderId,
          name: nickName,
          avatar: image,
        },
      };
      console.log(sentMessages);
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, sentMessages),
      );
      console.log('현재 메시지 :', messages);
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    let obj = {
      senderId: senderId,
      receiverId: receiverId,
      message: messages[0].text,
      action: 'message',
    };
    console.log(obj);
    ws.current.send(JSON.stringify(obj));
    console.log('messages => ', messages);
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: senderId, // set sender id
        }}
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
export default ChatScreen;
