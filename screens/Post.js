import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import axios from 'axios';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from "react-native-vector-icons/FontAwesome";

Date.prototype.format = function (f) { ///시간 표준화 형식 맞추기
  if (!this.valueOf()) {
    return ' ';
  }

  var weekName = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  let d = this;
  let h = this;
  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
    switch ($1) {
      case 'yyyy':
        return d.getFullYear();
      case 'yy':
        return (d.getFullYear() % 1000).zf(2);
      case 'MM':
        return (d.getMonth() + 1).zf(2);
      case 'dd':
        return d.getDate().zf(2);
      case 'E':
        return weekName[d.getDay()];
      case 'HH':
        return d.getHours().zf(2);
      case 'hh':
        return ((h = d.getHours() % 12) ? h : 12).zf(2);
      case 'mm':
        return d.getMinutes().zf(2);
      case 'ss':
        return d.getSeconds().zf(2);
      case 'a/p':
        return d.getHours() < 12 ? '오전' : '오후';
      default:
        return $1;
    }
  });
};

String.prototype.string = function (len) {
  var s = '',
    i = 0;
  while (i++ < len) {
    s += this;
  }
  return s;
};
String.prototype.zf = function (len) {
  return '0'.string(len - this.length) + this;
};
Number.prototype.zf = function (len) {
  return this.toString().zf(len);
};

const Post = ({navigation}) => {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '한식', value: 1},
    {label: '분식', value: 2},
    {label: '카페·디저트', value: 3},
    {label: '일식', value: 4},
  ]);
  const [date, setDate] = useState(new Date());
  const [timeText, setTimeText] = useState('');
  const placeholder = '주문 시간을 입력해주세요';

  AsyncStorage.getItem('User', (error, result) => {
    console.log(result);
    const UserInfo = JSON.parse(result);
    setId(UserInfo.id);
  });
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
    setDate(date);
    const time = date.format('a/p hh시 mm분');
    setTimeText(time);
  };

  const postUser = () => {
    axios
      .post('http://127.0.0.1:8000/board/new_post/', {
        author: id,
        title: title,
        text: text,
        date: date,
        location: location,
        price: price,
        category: value,
        thumbnail: '',
      })
      .then(function (response) {
        console.log('게시글 등록 완료');
        navigation.replace('MainNavi');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.footer}>
        <View style={styles.action}>
          <FontAwesome name={'heart-o'} color={'#05375a'} size={20} />
          <TextInput placeholder={'제목을 입력하세요'} style={styles.textInput} autoComplete={'off'} autoCapitalize={'none'} onChangeText={text => setTitle(text)}/>
        </View>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          disableBorderRadius={true}
          placeholder="카테고리를 선택해주세요"
          style={styles.border}
          textStyle={styles.textInput}
        />
        <View style={styles.action}>
          <FontAwesome name={'map-o'} color={'#05375a'} size={20} />
          <TextInput placeholder={'수령장소를 입력하세요'} style={styles.textInput} autoComplete={'off'} autoCapitalize={'none'} onChangeText={text => setLocation(text)}/>
        </View>
        <View style={styles.action}>
          <FontAwesome name={'diamond'} color={'#05375a'} size={20} />
          <TextInput placeholder={'지불 가격을 입력하세요'} style={styles.textInput} autoComplete={'off'} autoCapitalize={'none'} onChangeText={text => setPrice(text)}/>
        </View>
        <View style={styles.action}>
          <FontAwesome name={'hourglass-half'} color={'#05375a'} size={20} />
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              pointerEvents="none"
              style={styles.textInput}
              placeholder={placeholder}
              placeholderTextColor="#77808D"
              editable={false}
              value={timeText}
            />
            <DateTimePickerModal
              headerTextIOS={placeholder}
              isVisible={isDatePickerVisible}
              mode="time"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.action, {marginTop: 10}]}>
          <FontAwesome name={'pencil'} color={'#05375a'} size={20} />
          <TextInput placeholder={'본문 내용을 입력하세요'} style={[styles.textInput, {height:180}]} autoComplete={'off'} autoCapitalize={'none'} multiline={true} onChangeText={text => setText(text)}/>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={[
              styles.signIn,
              { backgroundColor: '#FF8000',
                 }]}
            onPress={() => postUser()}>
            <Text style={[styles.textSign, {
              color:'#fff' }]}>등록하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8000',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 8,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  border: {
    marginTop: 10,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    fontSize: 18,
    height: 30,
    marginLeft: 12,
  },
});
