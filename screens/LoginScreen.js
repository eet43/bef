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

const kakaoLogin = async (): Promise<void> => {
  const token: KakaoOAuthToken = await login();
  axios
    .get('http://127.0.0.1:8000/auth/kakao/login/', {
      params: {
        access_token: token.accessToken,
      },
    })
    .then(function (response) {
    })
    .catch(function (error) {
      console.log(error);
    });
};

const LoginScreen = ({navigation}) => {
  const [ttoken, setTtoken] = useState('');
  ///const [uunlink, setUunlink] = useState('');
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', flex: 2, justifyContent: 'center'}}>
        <Image
          source={require('../assets/rn-social-logo.png')}
          style={{width: '100%', height: '70%', resizeMode: 'cover'}}
        />
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
});
