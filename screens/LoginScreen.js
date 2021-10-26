import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  KakaoOAuthToken,
  login,
  getProfile as getKakaoProfile,
  KakaoProfile,
  unlink,
} from '@react-native-seoul/kakao-login';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const kakaoLogin = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();
    axios
      .get('http://127.0.0.1:8000/auth/kakao/login/', {
        params: {
          access_token: token.accessToken,
        },
      })
      .then(function (response) {
        if (response.status == 201) {
          ///데이터베이스에 있을 경우 ( 기존 회원 )
          console.log('11111');
          navigation.replace('MainNavi');
        } else {
          AsyncStorage.setItem(
            'user_id',
            JSON.stringify(response.data['id']),
            () => {
              console.log('유저정보 저장 완료');
            },
          );
          navigation.replace('Signup');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', flex: 2, justifyContent: 'center'}}>
        <Image
          source={require('../assets/rn-social-logo.png')}
          style={{width: '100%', height: '70%', resizeMode: 'cover'}}
        />
        <Text style={styles.text}>서비스를 이용해보세요</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => kakaoLogin()} style={styles.area}>
          <Image
            source={require('../assets/kakao_login_large_wide.png')}
            style={styles.imageStyles}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  area: {
    borderRadius: 12,
    borderWidth: 2,
    width: '100%',
    height: '20%',
  },
  imageStyles: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
  },
  text: {
    fontSize: 28,
    marginBottom: 15,
  },
});
