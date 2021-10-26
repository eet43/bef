import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getProfile = () => {
  AsyncStorage.getItem('User', (error, result) => {
    const UserInfo = JSON.parse(result);
    alert(UserInfo);
  });
};
const Profile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Profile Screens</Text>
      <Button title={'Click Here'} onPress={() => getProfile()} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
