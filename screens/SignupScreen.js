import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const SignupScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>닉네임을 입력해주세요.</Text>
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
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
});
