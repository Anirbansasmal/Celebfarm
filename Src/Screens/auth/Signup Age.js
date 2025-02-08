import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Colors, Fonts} from '../../themes/Themes';
import normalize from '../../utils/helpers/dimen';
import Toast from '../../utils/helpers/Toast';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../themes/icons';
import Header from '../../Components/Header';
import ButtonLinear from '../../Components/Button Linear';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import Picker from '../../Components/Picker';
import {signuplocalRequest} from '../../redux/reducers/AuthReducer';
import TextInputItem from '../../Components/TextInputItem';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
var status = '';

function SignupAge(props) {
  const [day, setDay] = useState(false);
  const [month, setMonth] = useState(false);
  const [year, setYear] = useState(false);
  const [dayValue, setDayValue] = useState('');
  const [monthValue, setMonthValue] = useState([]);
  const [yearValue, setYearValue] = useState('');

  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [days, setDays] = useState([
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
  ]);

  const [months, setMonths] = useState([
    {name: 'January', value: '01'},
    {name: 'February', value: '02'},
    {name: 'March', value: '03'},
    {name: 'April', value: '04'},
    {name: 'May', value: '05'},
    {name: 'June', value: '06'},
    {name: 'July', value: '07'},
    {name: 'August', value: '08'},
    {name: 'September', value: '09'},
    {name: 'October', value: '10'},
    {name: 'November', value: '11'},
    {name: 'December', value: '12'},
  ]);
  const [years, setYears] = useState([
    1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961,
    1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973,
    1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985,
    1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997,
    1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
    2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031,
  ]);
  function age() {
    console.log('45 ', AuthReducer);
    if (dayValue == '') {
      Toast('Please select your birth day');
    } else if (monthValue.length == 0) {
      Toast('Please select your birth month');
    } else if (yearValue == '') {
      Toast('Please select your birth year');
    } else {
      var obj = {
        name: AuthReducer?.signupLocalResponse?.name,
        email: AuthReducer?.signupLocalResponse?.email,
        Age: yearValue + '-' + monthValue[0]?.value + '-' + dayValue,
      };
      dispatch(signuplocalRequest(obj));
      props.navigation.navigate('SignupEmail');
    }
  }

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/signupLocalRequest':
        status = AuthReducer.status;
        break;

      case 'Auth/signupLocalSuccess':
        status = AuthReducer.status;
        console.log('44', AuthReducer?.signupLocalResponse?.name);
        setName(AuthReducer?.signupLocalResponse?.name);
        break;
      case 'Auth/signupLocalFailure':
        status = AuthReducer.status;
        break;
    }
  }

  return (
    <>
      <SafeAreaView style={style.container}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          // keyboardVerticalOffset={0.9}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Header
            picTitle={false}
            logo={false}
            back={true}
            backgroundColor={'#000'}
            title={'Sign up'}
            heardetext={Colors.white}
            headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(51)}
            textfontSize={normalize(16)}
            fontFamily={Fonts.Inter_Bold}
            marginStart={normalize(22)}
            textColor={'#ffff'}
            {...props}
          />
          <View
            style={{
              height: normalize(1),
              backgroundColor: '#434540',
            }}
          />
          <ScrollView style={{flex: 1}}>
            <View style={style.containerBody}>
              <Text style={style.text}>What’s your age?</Text>
              <Text style={style.text2}>Tell us when you were born.</Text>
              <Text style={style.text3}>Date of birth</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: normalize(12),
                  width: '100%',
                }}>
                <TextInputItem
                  heightInput={
                    Platform.OS == 'ios' ? normalize(52) : normalize(53)
                  }
                  widthInput={
                    Platform.OS == 'ios' ? normalize(102) : normalize(90)
                  }
                  value={dayValue}
                  placeholder="Date"
                  onChangeText={text => setDayValue(text)}
                  marginTop={normalize(0)}
                  placeholderTextColor={'#ABABAB'}
                  fontFamily={Fonts.Inter_Medium}
                  color={'#fff'}
                  borderRadius={7}
                  keyboardType={'decimal-pad'}
                  maxLength={2}
                  borderColor={'#434540'}
                  borderWidth={normalize(1)}
                  inputHeight={normalize(52)}
                  backgroundColor={Colors.black}
                />
                <TouchableOpacity
                  style={style.drop}
                  activeOpacity={0.8}
                  onPress={() => setMonth(!month)}>
                  <View style={{}}>
                    <Text
                      style={[
                        {
                          ...style.text4,
                          opacity: 0.7,
                          marginBottom: normalize(4),
                        },
                      ]}>
                      Month
                    </Text>
                    {monthValue[0]?.name ? (
                      <Text style={[{...style.text4, fontSize: normalize(12)}]}>
                        {monthValue[0]?.name}
                      </Text>
                    ) : null}
                  </View>
                  <Image
                    source={Icons.arrow_down}
                    style={{
                      height: normalize(18),
                      width: normalize(18),
                    }}
                  />
                </TouchableOpacity>
                <TextInputItem
                  heightInput={
                    Platform.OS == 'ios' ? normalize(52) : normalize(53)
                  }
                  widthInput={
                    Platform.OS == 'ios' ? normalize(102) : normalize(90)
                  }
                  value={yearValue}
                  placeholder="Year"
                  onChangeText={text => setYearValue(text)}
                  marginTop={normalize(0)}
                  placeholderTextColor={'#ABABAB'}
                  fontFamily={Fonts.Inter_Medium}
                  color={'#fff'}
                  borderRadius={7}
                  keyboardType={'decimal-pad'}
                  borderColor={'#434540'}
                  maxLength={4}
                  borderWidth={normalize(1)}
                  inputHeight={normalize(52)}
                  backgroundColor={Colors.black}
                />
              </View>
            </View>
          </ScrollView>
          {/* <Picker
            backgroundColor={Colors.bcolor}
            dataList={months}
            modalVisible={month}
            onBackdropPress={() => setMonth(!month)}
            renderData={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setMonthValue([item]);
                    setMonth(!month);
                    console.log('setMonthValue', monthValue);
                  }}
                  style={style.dropDownItem}>
                  <Text
                    style={[
                      style.dropDownItemText,
                      monthValue[0]?.value == item?.value
                        ? {color: Colors.red}
                        : {color: Colors.white},
                    ]}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          /> */}
        </KeyboardAvoidingView>
        <Modal
          isVisible={month}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          style={{width: '100%', alignSelf: 'center', margin: 0}}
          animationInTiming={800}
          animationOutTiming={1000}
          backdropColor={'#000000'}
          onBackButtonPress={() => onBackdropPress()}
          onBackdropPress={() => setMonth(false)}>
          <View
            style={style.containerMonth}>
            <View style={{alignItems: 'flex-start', marginTop:normalize(7)}}>
              <Text style={{color: Colors.white, fontFamily:Fonts.Inter_Bold, fontSize:normalize(16)}}>Select Month</Text>
              <View
                style={{
                  height: normalize(1),
                  marginTop:normalize(12),
                  width: '90%',
                  backgroundColor: Colors.grey,
                }}></View>
            </View>
            <FlatList
              data={months}
              keyExtractor={item => item.name?.toString()}
              numColumns={3}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setMonthValue([item]);
                      setMonth(!month);
                      console.log('setMonthValue', monthValue);
                    }}
                    style={{
                      ...style.dropDownItem,
                      backgroundColor:
                        monthValue[0]?.value == item?.value
                          ? Colors.white
                          : Colors.bcolor,
                    }}>
                    <Text
                      style={[
                        style.dropDownItemText,
                        monthValue[0]?.value == item?.value
                          ? {color: Colors.black}
                          : {color: Colors.white},
                      ]}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Modal>
        <ButtonLinear
          width={'91%'}
          height={normalize(40)}
          alignSelf={'center'}
          backgroundColor={Colors.btnColor}
          title={'Next'}
          textColor={Colors.black}
          titlesingle={true}
          borderRadius={normalize(25)}
          marginHorizontal={normalize(5)}
          fontFamily={Fonts.Inter_SemiBold}
          btnBottom={0}
          onPress={() => {
            age();
          }}
        />
      </SafeAreaView>

      {/* </View> */}
    </>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  containerBody: {
    paddingHorizontal: normalize(14),
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: normalize(21),
    marginTop: normalize(12),
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Bold,
  },
  text2: {
    color: Colors.white,
    fontSize: normalize(11),
    marginTop: normalize(7),
    opacity: 0.9,
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Medium,
  },
  text5: {
    color: Colors.white,
    fontFamily: Fonts.Inter_Bold,
    fontSize: normalize(16),
  },
  border: {
    height: normalize(1),
    marginTop: normalize(12),
    width: '90%',
    backgroundColor: Colors.grey,
  },
  containerMonth: {
    flex: 1,
    backgroundColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: normalize(200),
    backgroundColor: '#181818',
    borderTopLeftRadius: normalize(17),
    borderTopRightRadius: normalize(17),
    paddingLeft: normalize(20),
    paddingBottom: normalize(15),
    paddingTop: normalize(19),
    height: normalize(200),
  },
  dropDownItem: {
    paddingVertical: normalize(10),
    borderColor: Colors.borderColor,
    borderWidth: normalize(1),
    paddingHorizontal: normalize(12),
    margin: normalize(6),
    borderRadius: normalize(29),
    color: Colors.white,
  },
  dropDownItemText: {
    fontSize: normalize(14),
    lineHeight: normalize(14),
    fontFamily: Fonts.montserrat_reg,
  },
  text3: {
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: normalize(22),
    opacity: 0.9,
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Regular,
  },
  text4: {
    color: Colors.white,
    fontSize: normalize(12),
    fontFamily: Fonts.Inter_Medium,
  },
  drop: {
    height: normalize(52),
    width: normalize(102),
    padding: normalize(12),
    borderRadius: normalize(6),
    borderWidth: normalize(1),
    borderColor: '#434540',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default SignupAge;
