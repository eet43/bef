import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({navigation}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [nickName, setNickName] = useState('');
  const [id, setId] = useState('');

  const openImage = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('취소됐어요');
      } else if (response.errorCode) {
        console.log('errorCode : ', response.errorCode);
      } else if (response.errorMessage) {
        console.log('errorMessage : ', response.errorMessage);
      } else {
        let sour = {uri: response.assets[0].uri};
        setImageUrl(sour);
        console.log(response.assets[0].uri);
      }
    });
  };

  AsyncStorage.getItem('user_id', (error, result) => {
    setId(result);
    console.log(id);
  });

  const summit = () => {
    axios
      .post('http://127.0.0.1:8000/signup/', {
        nickname: nickName,
        image: imageUrl,
        id: id,
      })
      .then(function (response) {
        if (response.status == 201) {
          //회원가입 성공
          AsyncStorage.setItem(
            'User',
            JSON.stringify({
              id: response.data['id'],
              email: response.data['email'],
              nickname: response.data['nickname'],
              image: response.data['image'],
            }),
            () => {
              console.log('유저정보 저장 완료');
              console.log(response);
            },
          );
          navigation.replace('MainNavi');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={imageUrl} style={styles.imageButton} />
      <Button title={'프로필 설정'} onPress={() => openImage()}></Button>
      <TextInput
        style={styles.input}
        onChangeText={text => setNickName(text)}
      />
      <Button title={'회원 가입하기'} onPress={() => summit()} />
    </View>
  );
};
export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  imageButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black',
  },
  input: {
    width: 250,
    height: 40,
    marginTop: 30,
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    textAlign: 'center',
    textAlignVertical: 'top',
  },
});
