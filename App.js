import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnBoardingScreen from './screens/OnBoardingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MainNavi from './navigations/loginNavigation';

const AppStack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen
          name={'OnBoardingScreen'}
          component={OnBoardingScreen}
          options={{headerShown: false}}
        />
        <AppStack.Screen
          name={'Login'}
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <AppStack.Screen
          name={'Signup'}
          component={SignupScreen}
          options={{headerShown: false}}
        />
        <AppStack.Screen
          name={'MainNavi'}
          component={MainNavi}
          options={{headerShown: false}}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
