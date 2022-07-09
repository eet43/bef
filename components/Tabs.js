import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTab from '../screens/HomeTab';
import ProfileScreen from '../screens/ProfileScreen';
import ChatListScreen from '../screens/ChatListScreen';
import PostScreen from '../screens/PostScreen';
import ChatScreen from '../screens/ChatScreen';
import BoardScreen from '../screens/BoardScreen';
import NewChatScreen from '../screens/NewChatScreen';
import Location from '../screens/Location';
import {useNavigationState} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const HomeBoardStack = ({navigation, route}) => {
  // route.state && route.state.index > 0
  //   ? navigation.setOptions({tabBarStyle: {display: 'none'}})
  //   : navigation.setOptions({tabBarStyle: {display: 'flex'}});
  return (
    <HomeStack.Navigator>
      <Stack.Screen
        name={'Home'}
        component={HomeTab}
        options={{title: '배달프렌즈'}}
      />
      <Stack.Screen
        name={'BoardScreen'}
        component={BoardScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
        }}
      />
      <Stack.Screen name={'NewChatScreen'} component={NewChatScreen} />
    </HomeStack.Navigator>
  );
};

const ProfileBStack = ({navigation, stack}) => {
  return (
    <ProfileStack.Navigator>
      <Stack.Screen
        name={'ProfileScreen'}
        component={ProfileScreen}
        options={{title: '내 정보'}}
      />
    </ProfileStack.Navigator>
  );
};

const MessageStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Message'} component={ChatListScreen} />
      <Stack.Screen
        name={'ChatScreen'}
        component={ChatScreen}
        options={({route}) => ({
          title: route.params.record.nickName,
        })}
      />
    </Stack.Navigator>
  );
};

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
const Tabs = ({navigation}) => {
  const getTabBarVisibility = route => {
    console.log(route);
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';
    console.log('route : ', routeName);

    if (routeName === 'NewChatScreen') {
      return 'none';
    }

    return 'flex';
  };

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
        name={'HomeTab'}
        component={HomeBoardStack}
        options={route => ({
          tabBarStyle: {display: getTabBarVisibility(route)},
          headerShown: false,
          title: '배달프렌즈',
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
                style={{color: focused ? '#FF8000' : '#748c94', fontSize: 12}}>
                Home
              </Text>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name={'ChatListScreen'}
        component={MessageStack}
        options={route => ({
          headerShown: false,
          tabBarStyle: {display: getTabBarVisibility(route)},
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
                style={{color: focused ? '#FF8000' : '#748c94', fontSize: 12}}>
                Chat
              </Text>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name={'ProfileStack'}
        component={ProfileBStack}
        options={{
          headerShown: false,
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
                style={{color: focused ? '#FF8000' : '#748c94', fontSize: 12}}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'PostScreen'}
        component={PostScreen}
        options={{
          headerLeft: () => (
            <MaterialCommunityIcons
              name={'keyboard-backspace'}
              size={25}
              color={'#FF8000'}
              onPress={() => {}}
            />
          ),
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
