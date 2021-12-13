import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  TextInput, ImageBackground,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";
import { Header, Icon } from "react-native-elements";

const SignupScreen = ({navigation}) => {
  let defImage = {
    uri: 'file:///Users/thebettertech/p_season/assets/default_profile.png',
  };
  const [imageUrl, setImageUrl] = useState(defImage);
  const [nickName, setNickName] = useState('');
  const [id, setId] = useState(0);

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

  console.log(imageUrl);
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
              image: imageUrl,
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
    <SafeAreaProvider style={{backgroundColor: '#fff'}}>
      <Header
        backgroundColor={'#fff'}
        centerComponent={{
          text: '프로필 설정',
          style: {color: 'black', fontSize: 20, fontWeight: 'bold'},
        }}
        rightComponent={
          <View style={styles.header}>
            <TouchableOpacity onPress={summit}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>완료</Text>
            </TouchableOpacity>
          </View>
        }
      />
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => openImage()}>
          <ImageBackground
            source={imageUrl}
            style={{width: 200, height: 200}}
            imageStyle={{borderRadius: 100}}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 3, alignItems: 'center'}}>
        <Text style={{fontSize: 20, color: '#C9E265', fontWeight: 'bold', marginRight: 230}}>
          닉네임
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setNickName(text)}
          autoCompleteType={false}
        />
      </View>
    </SafeAreaProvider>
  );
};
export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 280,
    height: 60,
    borderColor: '#C9E265',
    borderBottomWidth: 3,
    marginTop: -10,
    paddingTop: 20,
    fontSize: 17,
  },
});
