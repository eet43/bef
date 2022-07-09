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
import axios from 'axios';

const NewChatScreen = ( {route}) => {
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState(route.params.record.sender_id);
  const [receiverId, setReceiverId] = useState(route.params.record.receiver_id);
  const [nickName, setNickName] = useState(route.params.record.nickName);
  const [image, setImage] = useState(route.params.record.image);
  let ws = useRef(null);

  useEffect(() => {
    if (!ws.current) {
      console.log('채팅 시작');
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
    ws.current.onmessage = e => {
      const response = JSON.parse(e.data);
      console.log('onmessage=>', JSON.stringify(response));
      let sentMessages = {
        _id: response.receiverId,
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
    ws.current.send(JSON.stringify(obj));
    console.log('messages => ', messages);
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages} //왜 비어있었을까 ?
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
export default NewChatScreen;
