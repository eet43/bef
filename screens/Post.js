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
import {Kaede} from 'react-native-textinput-effects';

const Post = ({navigation}) => {
  return (
    <View>
      <Kaede label={'Title'} inputPadding={16} />
      <Kaede label={'Website'} inputPadding={16} />
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
