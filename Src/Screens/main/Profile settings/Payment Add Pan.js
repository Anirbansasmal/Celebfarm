import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../themes/icons';
import {ScrollView} from 'react-native-gesture-handler';
import TextInputItem from '../../../Components/TextInputItem';
import ButtonLinear from '../../../Components/Button Linear';
import {useDispatch, useSelector} from 'react-redux';
import Picker from '../../../Components/Picker';
import Toast from '../../../utils/helpers/Toast';
import {
  getPanRequest,
  getPanVerifyRequest,
} from '../../../redux/reducers/ProfileReducer';
import Loader from '../../../utils/helpers/Loader';
import connectionrequest from '../../../utils/helpers/NetInfo';
import HeaderCommon from '../../../Components/HeaderCommon';
var status = '';
function PaymentAddPan(props) {
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [name, setName] = useState('');
  const [pan, setPan] = useState('');

  const [day, setDay] = useState(false);
  const [month, setMonth] = useState(false);
  const [year, setYear] = useState(false);
  const [dayValue, setDayValue] = useState('');
  const [monthValue, setMonthValue] = useState('');
  const [yearValue, setYearValue] = useState('');

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

  useEffect(() => {
    getPan();
  }, []);

  async function savePan() {
    try {
      if (pan == '') {
        Toast('Please select your birth day');
      } else {
        var obj = {
          kycStatus: ProfileReducer?.kycStatus,
          status: ProfileReducer?.status,
          message: ProfileReducer?.message,
          kycResult: {
            idNumber: ProfileReducer?.panVerifyResponse?.kycResult?.idNumber,
            idStatus: ProfileReducer?.panVerifyResponse?.kycResult?.idStatus,
            category: ProfileReducer?.panVerifyResponse?.kycResult?.category,
            name: ProfileReducer?.panVerifyResponse?.kycResult?.name,
          },
          responseKey: ProfileReducer?.panVerifyResponse?.responseKey,
          responseCode: ProfileReducer?.panVerifyResponse?.responseCode,
          requestTimestamp: ProfileReducer?.panVerifyResponse?.requestTimestamp,
          responseTimestamp:
            ProfileReducer?.panVerifyResponse?.responseTimestamp,
          decentroTxnId:
            ProfileReducer?.panVerifyResponse?.kycResult?.decentroTxnId,
          // Age: yearValue + '-' + monthValue + '-' + dayValue,
        };
        console.log('obj', obj);
        connectionrequest()
          .then(() => {
            // dispatch(getPanRequest(obj));
          })
          .catch(e => {
            console.log(e);
          });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function verifyPan() {
    try {
    } catch (e) {}
    if (pan == '') {
      Toast('Please Enter your PAN');
    } else {
      var obj =
        'creatorID=' +
        AuthReducer?.creatorID +
        '&' +
        'panNumber=' +
        pan.toString();
      connectionrequest()
        .then(() => {
          dispatch(getPanVerifyRequest(obj));
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  async function getPan() {
    try {
      connectionrequest()
        .then(() => {
          var obj = 'creatorID=' + AuthReducer?.creatorID;
          dispatch(getPanRequest(obj));
        })
        .catch(e => {
          console.log(e);
        });
    } catch (error) {}
  }

  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/getPanVerifyRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Profile/getPanVerifySuccess':
        status = ProfileReducer.status;
        console.log(
          'ProfileReducer?.nichResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          ProfileReducer.initSessionResponse,
        );
        savePan();
        break;
      case 'Profile/getPanVerifyFailure':
        status = ProfileReducer.status;
        break;

      case 'Profile/getPanRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Profile/getPanSuccess':
        status = ProfileReducer.status;
        console.log(
          'ProfileReducer?.nichResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          // ProfileReducer.aadhaarCaptchaResponse,
        );
        setPan(ProfileReducer?.getPanResponse?.kycidNumber);
        setName(ProfileReducer?.getPanResponse?.kycName);
        break;
      case 'Profile/getPanFailure':
        status = ProfileReducer.status;
        Toast(ProfileReducer?.aadhaarCaptchaResponse?.message);
        break;
    }
  }

  return (
    <>
      <Loader visible={'Profile/getPanVerifyRequest' == status} />
      <SafeAreaView style={style.container}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <HeaderCommon
            picTitle={true}
            home={true}
            back={true}
            backgroundColor={'#000'}
            title={'Payments'}
            heardetext={Colors.white}
            headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(51)}
            textfontSize={normalize(16)}
            fontFamily={Fonts.Inter_Bold}
            // marginStart={normalize(33)}
            notifiPress={() => props.navigation.navigate('Notifications')}
            profilePress={() => props.navigation.navigate('Chat')}
            backScreen={() => props.navigation.goBack()}
            textColor={'#ffff'}
            {...props}
          />
          <View style={style.containerBody}>
            <ScrollView style={{flex: 1}}>
              <>
                <View
                  style={{
                    marginTop: normalize(12),
                    borderRadius: normalize(7),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: normalize(6),
                    }}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(16),
                          marginStart: normalize(3),
                        }}>
                        PAN Details
                      </Text>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(10),
                          marginStart: normalize(3),
                          marginTop: normalize(9),
                        }}>
                        Enter your PAN card details.
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={{
                      color: '#FFFF',
                      fontSize: normalize(12),
                      marginLeft: normalize(3),
                      marginTop: normalize(22),
                    }}>
                    Name on PAN
                  </Text>

                  <TextInputItem
                    heightInput={
                      Platform.OS == 'ios' ? normalize(42) : normalize(40)
                    }
                    widthInput={'100%'}
                    value={name}
                    placeholder="Enter Your Name"
                    onChangeText={text => setName(text)}
                    marginTop={normalize(10)}
                    autoCapitalize={'words'}
                    placeholderTextColor={'#cccc'}
                    fontFamily={Fonts.Inter_Regular}
                    color={'#ffff'}
                    borderRadius={7}
                    borderColor={'#434540'}
                    borderWidth={1}
                    backgroundColor={Colors.black}
                    inputHeight={normalize(52)}
                  />

                  <Text
                    style={{
                      color: '#FFFF',
                      fontSize: normalize(12),
                      marginLeft: normalize(3),
                      marginTop: normalize(22),
                    }}>
                    PAN number
                  </Text>

                  <TextInputItem
                    heightInput={
                      Platform.OS == 'ios' ? normalize(42) : normalize(40)
                    }
                    widthInput={'100%'}
                    value={pan}
                    placeholder="XXXXXXX"
                    onChangeText={text => setPan(text)}
                    marginTop={normalize(10)}
                    placeholderTextColor={'#ABABAB'}
                    fontFamily={Fonts.Inter_Regular}
                    color={'#fff'}
                    maxLength={10}
                    autoCapitalize={'characters'}
                    borderRadius={7}
                    borderColor={'#434540'}
                    borderWidth={1}
                    backgroundColor={Colors.black}
                    textTransform={'uppercase'}
                    inputHeight={normalize(52)}
                  />
                  {/* <Text
                    style={{
                      color: '#ffff',
                      fontSize: normalize(12),
                      marginLeft: normalize(3),
                      marginTop: normalize(12),
                    }}>
                    Date of birth
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: normalize(12),
                      width: '100%',
                    }}>
                    <TouchableOpacity
                      style={style.drop}
                      activeOpacity={0.9}
                      onPress={() => {
                        setDay(!day);
                      }}>
                      <View style={{alignItems: 'center'}}>
                        <Text
                          style={[
                            {
                              ...style.text4,
                              opacity: 0.3,
                              marginBottom: normalize(4),
                            },
                          ]}>
                          Day
                        </Text>

                        <Text
                          style={[{...style.text4, fontSize: normalize(14)}]}>
                          {dayValue}
                        </Text>
                      </View>
                      <Image
                        source={Icons.arrow_down}
                        style={{
                          height: normalize(18),
                          width: normalize(18),
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={style.drop}
                      activeOpacity={0.9}
                      onPress={() => {
                        setMonth(!month);
                      }}>
                      <View style={{}}>
                        <Text
                          style={[
                            {
                              ...style.text4,
                              opacity: 0.3,
                              marginBottom: normalize(4),
                            },
                          ]}>
                          Month
                        </Text>

                        <Text
                          style={[{...style.text4, fontSize: normalize(14)}]}>
                          {monthValue}
                        </Text>
                      </View>
                      <Image
                        source={Icons.arrow_down}
                        style={{
                          height: normalize(18),
                          width: normalize(18),
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={style.drop}
                      activeOpacity={0.9}
                      onPress={() => {
                        setYear(!year);
                      }}>
                      <View style={{}}>
                        <Text
                          style={[
                            {
                              ...style.text4,
                              opacity: 0.3,
                              marginBottom: normalize(4),
                            },
                          ]}>
                          Year
                        </Text>

                        <Text
                          style={[{...style.text4, fontSize: normalize(14)}]}>
                          {yearValue}
                        </Text>
                      </View>
                      <Image
                        source={Icons.arrow_down}
                        style={{
                          height: normalize(18),
                          width: normalize(18),
                        }}
                      />
                    </TouchableOpacity>
                  </View> */}
                </View>
              </>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <Picker
          backgroundColor={Colors.bcolor}
          dataList={days}
          modalVisible={day}
          onBackdropPress={() => setDay(false)}
          renderData={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setDayValue(item);
                  setDay(!day);
                }}
                style={style.dropDownItem}>
                <Text
                  style={[
                    style.dropDownItemText,
                    dayValue == item
                      ? {color: Colors.red}
                      : {color: Colors.white},
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <Picker
          backgroundColor={Colors.bcolor}
          dataList={months}
          modalVisible={month}
          onBackdropPress={() => setMonth(!month)}
          renderData={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setMonthValue(item);
                  setMonth(!month);
                }}
                style={style.dropDownItem}>
                <Text
                  style={[
                    style.dropDownItemText,
                    monthValue == item
                      ? {color: Colors.red}
                      : {color: Colors.white},
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <Picker
          backgroundColor={Colors.bcolor}
          dataList={years}
          modalVisible={year}
          onBackdropPress={() => setYear(false)}
          renderData={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setYearValue(item);
                  setYear(!year);
                }}
                style={style.dropDownItem}>
                <Text
                  style={[
                    style.dropDownItemText,
                    yearValue == item
                      ? {color: Colors.red}
                      : {color: Colors.white},
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <ButtonLinear
          width={'90%'}
          height={normalize(40)}
          alignSelf={'center'}
          backgroundColor={Colors.btnColor}
          title={'Verify'}
          textColor={Colors.black}
          titlesingle={true}
          borderRadius={normalize(25)}
          marginHorizontal={normalize(5)}
          btnBottom={10}
          onPress={() => {
            verifyPan();
          }}
        />
      </SafeAreaView>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  containerBody: {
    paddingHorizontal: normalize(10),
    flex: 1,
    backgroundColor: Colors.black,
  },
  text: {
    color: Colors.white,
    fontSize: normalize(16),
    marginStart: normalize(12),
  },
  text2: {
    color: Colors.white,
    fontSize: normalize(14),
  },
  text6: {
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: normalize(7),
  },
  text3: {
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: normalize(22),
    opacity: 0.7,
  },
  text7: {
    color: Colors.white,
    fontSize: normalize(12),
  },
  textVoice: {
    color: Colors.white,
    fontSize: normalize(12),
  },
  imageLeft: {
    height: normalize(18),
    width: normalize(17),
  },
  upimage: {
    height: normalize(18),
    width: normalize(18),
  },
  profile: {
    height: normalize(49),
    width: normalize(49),
  },
  profileCollabration: {
    height: normalize(19),
    width: normalize(19),
    marginRight: normalize(7),
  },
  profileCollabr: {
    height: normalize(12),
    width: normalize(12),
  },
  text4: {
    color: Colors.white,
    fontSize: normalize(14),
    opacity: 0.7,
    marginStart: normalize(6),
    alignSelf: 'flex-start',
  },
  btn: {
    flexDirection: 'row',
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: normalize(22),
    alignItems: 'center',
    paddingHorizontal: normalize(7),
    height: normalize(29),
  },
  drop: {
    height: normalize(52),
    width: normalize(82),
    padding: normalize(12),
    borderRadius: normalize(6),
    borderWidth: normalize(1),
    borderColor: '#434540',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropDownItem: {
    paddingVertical: normalize(12),
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: normalize(1),
    color: Colors.white,
  },
  dropDownItemText: {
    fontSize: normalize(14),
    lineHeight: normalize(14),
    fontFamily: Fonts.montserrat_reg,
  },
  text4: {
    color: Colors.white,
    fontSize: normalize(10),
    fontFamily: Fonts.Inter_Medium,
  },
  drop: {
    height: normalize(52),
    width: normalize(82),
    padding: normalize(12),
    borderRadius: normalize(6),
    borderWidth: normalize(1),
    borderColor: Colors.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default PaymentAddPan;
