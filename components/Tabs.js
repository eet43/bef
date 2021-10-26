import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainBoard from '../screens/MainBoard';
import Profile from '../screens/Profile';
import ChatList from '../screens/ChatList';
import Post from '../screens/Post';
import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}>
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#FF8000',
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name={'MainBoard'}
        component={MainBoard}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image
                source={require('../assets/home.png')}
                resizeMethod={'contain'}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#FF8000' : '#748c94',
                }}
              />
              <Text
                style={{ color: focused ? '#FF8000' : '#748c94', fontSize: 12, }}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'ChatList'}
        component={ChatList}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image
                source={require('../assets/Chat.png')}
                resizeMethod={'contain'}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#FF8000' : '#748c94',
                }}
              />
              <Text
                style={{ color: focused ? '#FF8000' : '#748c94', fontSize: 12, }}>Chat</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image
                source={require('../assets/User.png')}
                resizeMethod={'contain'}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#FF8000' : '#748c94',
                }}
              />
              <Text
                style={{ color: focused ? '#FF8000' : '#748c94', fontSize: 12, }}>Profile</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'Post'}
        component={Post}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/Post.png')}
              resizeMethod={'contain'}
              style={{
                width: 30,
                height: 30,
                tintColor: '#fff',
              }}
            />
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
