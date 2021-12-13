import React from 'react';
import {Surface} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Colors from './Colors';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image, SafeAreaView,
} from 'react-native';
import axios from 'axios';

const iconSize = 30;

const Header = ({back, summit, navigation}) => {
  return (
    <Surface style={styles.header}>
      <SafeAreaView style={styles.view}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="back" size={iconSize} color={Colors.white} />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.view}>
        <Text>게시글 등록</Text>
      </View>
      <View style={styles.rightView}>
        <TouchableOpacity onPress={() => summit}>
          <Feather name={'done'} size={iconSize} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </Surface>
  );
};
export default Header;

const styles = StyleSheet.create({
  header: {
    height: 90,
    elevation: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FF8000',
  },
  view: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightView: {
    justifyContent: 'flex-end',
  }
});
