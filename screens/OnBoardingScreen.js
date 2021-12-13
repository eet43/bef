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
          image: <Image source={require('../assets/onboarding-img2.png')} />,
          title: '메뉴를 선택하세요',
          subtitle: '먹고 싶은 메뉴의 카테고리를 선택해보세요',
        },
        {
          backgroundColor: '#fdeb93',
          image: <Image source={require('../assets/onboarding-img1.png')} />,
          title: '의견을 조율해보세요',
          subtitle:
            '마음에 드는 음식을 선택한 후 채팅을 통해 최소 가격, 접선 장소, 시간과 같은 의견을 조율해보세요',
        },
        {
          backgroundColor: '#e9bcbe',
          image: <Image source={require('../assets/onboarding-img3.png')} />,
          title: '합리적인 가격에 음식을 받아보세요',
          subtitle:
            '정해진 시간에 장소에 간 후, 합리적인 가격으로 1인분을 받아보세요',
        },
      ]}
    />
  );
};
export default OnBoardingScreen;
