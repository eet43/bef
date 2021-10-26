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

const Jfood = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Jfood</Text>
      <Button title={'Click Here'} onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default Jfood;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
