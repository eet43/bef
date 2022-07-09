import { Button, Platform, Text, View } from "react-native";
import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Container = Styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Label = Styled.Text`
    font-size: 24px;
`;

interface Locations {
  latitude: number;
  longitude: number;
}

async function requestPermission() {
  try {
    if (Platform.OS === 'ios') {
      return await Geolocation.requestAuthorization('always');
    }
  } catch (e) {
    console.log(e);
  }
}

const CurrentPosition = () => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [locationObj, setLocationObj] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('User', (error, result) => {
      console.log(result);
    });
    requestPermission().then(result => {
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          pos => {
            setLat(pos.coords.latitude);
            setLon(pos.coords.longitude);
            console.log(pos);
            console.log(pos.coords.latitude);
            console.log(pos.coords);
            console.log(lat);
            console.log(lon);
          },
          error => {
            console.log(error);
          },
          {enableHighAccuracy: true, timeout: 3600, maximumAge: 3600},
        );
      }
    });
  }, []);

  const _callApi = async () => {
    try {
      let res = await axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lon}&y=${lat}`,
          {
            headers: {
              Authorization: 'KakaoAK 6e0df93d05b69544e1a2f5a10c7b0dcb', // REST API 키
            },
          },
        )
        .then( res => {
          console.log('안녕하세요');
          const location = res.data.documents[ 0 ];
          console.log(res);
          console.log(location);
          setLocationObj(location.address_name);
        } );
      console.log( locationObj );
    } catch (error) {
      console.log( error.message );
    }
  };

  if (lon == 0) {
    return (
      <View>
        <Text>Splash Screen</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Button title="Api 불러오기 버튼" onPress={_callApi} />
        <Text>{locationObj}</Text>
      </View>
    );
  }
};

export default CurrentPosition;
