import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {
  KakaoOAuthToken,
  login,
  getProfile as getKakaoProfile,
  KakaoProfile,
  unlink,
} from '@react-native-seoul/kakao-login';
import axios from 'axios';

const LoginScreen = ({navigation}) => {
  const [ttoken, setTtoken] = useState('');
  ///const [uunlink, setUunlink] = useState('');

  const kakaoLogin = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();
    let access_token = {access_token: token.accessToken};
    console.log(access_token);
    axios
      .post('http://127.0.0.1:8000/auth/login/', access_token)
      .then(function (response) {
        console.log(JSON.stringify(response));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View>
      <Button title={'카카오 버튼'} onPress={() => kakaoLogin()} />
      <TouchableOpacity>
        <Text>카카오 버톤</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
