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

const ChatList = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Chat Screens</Text>
      <Button title={'Click Here'} onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
