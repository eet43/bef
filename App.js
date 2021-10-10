import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoardingScreen from './screens/OnBoardingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View} from 'react-native';

const AppStack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen
          name={'OnBoardingScreen'}
          component={OnBoardingScreen}
          options={{header: () => null}}
        />
        <AppStack.Screen name={'Login'} component={LoginScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
