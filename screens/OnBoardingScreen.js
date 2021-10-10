import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
  let backgroundColor;

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};
const Skip = ({...props}) => (
  <Button title={'Skip'} color={'#000000'} {...props} />
);
const Next = ({...props}) => (
  <Button title={'Next'} color={'#000000'} {...props} />
);
const Done = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16}}>Done</Text>
  </TouchableOpacity>
);

const OnBoardingScreen = ({navigation}) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.replace('Login')}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: <Image source={require('../assets/onboarding-img1.png')} />,
          title: '첫번째 화면',
          subtitle: '서비스에 대해 설명하시오',
        },
        {
          backgroundColor: '#fdeb93',
          image: <Image source={require('../assets/onboarding-img2.png')} />,
          title: '두번째 화면',
          subtitle: '서비스에 대해 설명하시오',
        },
        {
          backgroundColor: '#e9bcbe',
          image: <Image source={require('../assets/onboarding-img3.png')} />,
          title: '세번째 화면',
          subtitle: '서비스에 대해 설명하시오',
        },
      ]}
    />
  );
};
export default OnBoardingScreen;
