import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Kfood from './Kfood';
import Jfood from './Jfood';
import Cfood from './Cfood';
import BoardScreen from './BoardScreen';

const Top = createMaterialTopTabNavigator();

const HomeTab = ( {navigation}) => {
  return (
    <Top.Navigator>
      <Top.Screen name={'Korean'} component={Kfood} options={{title: '한식'}} />
      <Top.Screen name={'Japanese'} component={Jfood} options={{title: '분식'}} />
      <Top.Screen name={'Chinese'} component={Cfood} options={{title: '카페 디저트'}} />
    </Top.Navigator>
  );
};

export default HomeTab;
