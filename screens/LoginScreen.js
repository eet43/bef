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
      .get('https://delivery-friend.herokuapp.com/user/auth/kakao/', {
        params: {
          access_token: token.accessToken,
        },
      })
      .then(function (response) {
        if (response.status == 201) {
          ///데이터베이스에 있을 경우 ( 기존 회원 )
          console.log('11111');
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
        } else { ///데이터베이스에 없을 경우 ( 신규 회원 )
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
      <Image
        source={require('../assets/loginLogo.png')}
        style={{width: '100%', height: 700, resizeMode: 'contain'}}
      />
      <View style={styles.content}>
        <TouchableOpacity onPress={() => kakaoLogin()} style={styles.area}>
          <Image
            source={require('../assets/kakao_login_large_wide.png')}
            style={styles.imageStyles}
          />
        </TouchableOpacity>
      </View>
      <Text style={{fontSize: 16, color: 'gray', textAlign: 'center', marginHorizontal: 48,}}>
        서비스를 이용하시려면 카카오톡 로그인 버튼을 클릭해주세요.
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    justifyContent: 'center',
    margin: 40,
    marginTop: -180,
    marginBottom: -60,
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
});
