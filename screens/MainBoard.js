import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Kfood from './Kfood';
import Jfood from './Jfood';
import Cfood from './Cfood';

const Top = createMaterialTopTabNavigator();

const MainBoard = ({navigation}) => {
  return (
    <Top.Navigator>
      <Top.Screen name={'Korean'} component={Kfood} />
      <Top.Screen name={'Japanese'} component={Jfood} />
      <Top.Screen name={'Chinese'} component={Cfood} />
    </Top.Navigator>
  );
};

export default MainBoard;
