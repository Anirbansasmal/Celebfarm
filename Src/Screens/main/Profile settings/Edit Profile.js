import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import Button from '../../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../themes/icons';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import TextInputItem from '../../../Components/TextInputItem';
import ButtonLinear from '../../../Components/Button Linear';
import MyStatusBar from '../../../utils/MyStatusBar';
import connectionrequest from '../../../utils/helpers/NetInfo';
import {
  getLaunageRequest,
  getNicheRequest,
  locationRequest,
} from '../../../redux/reducers/AuthReducer';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../utils/helpers/Loader';
import {
  getEditRequest,
  getUserRequest,
} from '../../../redux/reducers/UserReducer';
import Toast from '../../../utils/helpers/Toast';
import moment from 'moment';
import Modal from 'react-native-modal';
import HeaderCommon from '../../../Components/HeaderCommon';
import Selector from '../../../Components/Selector';
import Picker from '../../../Components/Picker';
var status = '',
  status1 = '';

function EditProfile(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const UserReducer = useSelector(state => state.UserReducer);
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerNiche, setShowPickerNiche] = useState(false);
  const [showPickerLan, setShowPickerLan] = useState(false);

  const [countryValue, setCountryValue] = useState('');
  const [dob, setDob] = useState('');
  const [day, setDay] = useState(false);
  const [month, setMonth] = useState(false);
  const [year, setYear] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showMoreLang, setShowMoreLang] = useState(false);

  const [dayValue, setDayValue] = useState('');
  const [monthValue, setMonthValue] = useState([]);
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
  const [name, setName] = useState('');
  const [data, setData] = useState([]);
  var languges = [],
    niches = [];
  // const [datalang, setDataLanguage] = useState([]);
  const [datalang, setDataLanguage] = useState([]);

  useEffect(() => {
    locationCountry();
  }, []);
  async function locationCountry() {
    try {
      connectionrequest()
        .then(() => {
          dispatch(locationRequest());
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/locationRequest':
        status = AuthReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Auth/locationSuccess':
        status = AuthReducer.status;
        console.log(
          'AuthReducer?.launageResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          AuthReducer.locationResponse,
        );
        setCountry(AuthReducer.locationResponse);
        break;
      case 'Auth/locationFailure':
        status = AuthReducer.status;
        break;
    }
  }

  var countSel = 0,
    countSel1 = 0;
  const numColumns = Math.floor(Dimensions.get('window').width / 100);
  const renderData = ({item, index}) => {
    console.log(item);
    return (
      <>
        <TouchableOpacity
          style={[
            style.containerviw,
            {
              borderColor: item?.isChose ? Colors.white : Colors.borderColor,
              backgroundColor: item?.isChose ? Colors.white : Colors.black,
            },
          ]}
          onPress={() => {
            const tempData = [...data];
            // tempData[index].isChose = !tempData[index]?.isChose;
            // setData([...tempData]);

            tempData.map((item, index) => {
              if (item?.isChose == true) {
                countSel = countSel == 3 ? countSel : countSel + 1;
                console.log('>>>>>>>>>>>>>>>> ', countSel);
              }
            });
            if (countSel == 3) {
              if (tempData[index].isChose == true) {
                tempData[index].isChose = false;
                setData([...tempData]);
                countSel = countSel - 1;
              }
            } else {
              if (tempData[index].isChose == false) {
                tempData[index].isChose = true;
                setData([...tempData]);
                countSel = countSel <= 3 ? countSel + 1 : countSel;
                console.log('count ', countSel);
              } else {
                tempData[index].isChose = false;
                setData([...tempData]);
                countSel = countSel - 1;
              }
            }
          }}>
          <Image
            source={Icons.notificationacc}
            style={{
              width: normalize(12),
              height: normalize(12),
            }}
            resizeMode="contain"
          />
          <Text
            style={[
              {
                ...style.text4,
                color: item?.isChose ? Colors.black : Colors.white,
                fontFamily: Fonts.Inter_Regular,
              },
            ]}>
            {item?.lang}
            {/* item?.lang?.length > 10
                  ? item?.lang?.substring(0, 18 - 10) + '....'
                  : */}
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  const renderData1 = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          style={[
            style.containerviw,
            {
              borderColor: item?.isChose ? Colors.white : Colors.borderColor,
              borderWidth: normalize(1),
              borderRadius: normalize(25),
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingHorizontal: normalize(12),
              paddingVertical: normalize(6),
              backgroundColor: item?.isChose ? Colors.white : Colors.black,
              marginBottom: normalize(8),
              marginStart: normalize(5),
            },
          ]}
          onPress={() => {
            const tempData = [...datalang];
            tempData.map((item, index) => {
              if (item?.isChose == true) {
                countSel1 = countSel1 == 5 ? countSel1 : countSel1 + 1;
                console.log('>>>>>>>>>>>>>>>> ', countSel1);
              }
            });
            if (countSel1 == 5) {
              if (tempData[index].isChose == true) {
                tempData[index].isChose = false;

                setDataLanguage([...tempData]);
                countSel1 = countSel1 - 1;
              }
            } else {
              if (tempData[index].isChose == false) {
                tempData[index].isChose = true;

                setDataLanguage([...tempData]);
                countSel1 = countSel1 <= 5 ? countSel1 + 1 : countSel1;
                console.log('count ', countSel1);
              } else {
                tempData[index].isChose = false;

                setDataLanguage([...tempData]);
                countSel1 = countSel1 - 1;
              }
            }
          }}>
          <Text
            style={[
              {
                ...style.text4,
                color: item?.isChose ? Colors.black : Colors.white,
                fontFamily: Fonts.Inter_Regular,
              },
            ]}>
            {item?.lang}
            {/* item?.lang?.length > 10
                ? item?.lang?.substring(0, 18 - 10) + '....'
                :  */}
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  useEffect(() => {
    console.log('=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    try {
      connectionrequest()
        .then(() => {
          dispatch(getNicheRequest());
          dispatch(getLaunageRequest());
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    console.log('=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    var obj = 'creatorID=' + AuthReducer?.creatorID;
    try {
      connectionrequest()
        .then(() => {
          setTimeout(() => {
            dispatch(getUserRequest(obj));
          }, 2000);
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/getNicheRequest':
        status = AuthReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Auth/getNicheSuccess':
        status = AuthReducer.status;
        console.log(
          'AuthReducer?.nichResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          AuthReducer.nicheResponse,
        );
        break;
      case 'Auth/getNicheFailure':
        status = AuthReducer.status;
        break;
      case 'Auth/getLaunageRequest':
        status = AuthReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Auth/getLaunageSuccess':
        status = AuthReducer.status;
        console.log(
          'AuthReducer?.nichResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          AuthReducer.launageResponse,
        );
        break;
      case 'Auth/getLaunageFailure':
        status = AuthReducer.status;
        break;
    }
  }

  if (status1 == '' || UserReducer.status != status1) {
    switch (UserReducer.status) {
      case 'userProfile/getUserRequest':
        status1 = AuthReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'userProfile/getUserSuccess':
        status1 = UserReducer.status;
        console.log('gjdfk');
        console.log(
          'AuthReducer?.userResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 314',
          UserReducer.userResponse?.niches,
        );
        console.log(
          'AuthReducer?.userResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 318',
          UserReducer.nicheResponse?.result,
        );
        var arr = [],
          arr2 = [];
        AuthReducer?.nicheResponse?.result?.map((item, index) => {
          UserReducer?.userResponse?.niches?.map((itemadd, index) => {
            // return {lang: item?.name, isChose: false};
            if (item?.name == itemadd) {
              arr.push({lang: itemadd, isChose: true});
            } else {
              // arr.push({lang: item?.name, isChose: false});
            }
          });
        });

        AuthReducer?.nicheResponse?.result?.map((item, index) => {
          arr2.push({lang: item?.name, isChose: false});
        });
        arr2.map((item, index) => {
          arr.map((item1, index1) => {
            if (item?.lang == item1?.lang) {
              arr2[index].isChose = true;
            }
          });
        });
        var arr3 = [],
          arr4 = [];

        AuthReducer?.launageResponse?.result?.map((item, index) => {
          UserReducer?.userResponse?.languages?.map((itemadd, index) => {
            // return {lang: item?.name, isChose: false};
            if (item?.name == itemadd) {
              arr3.push({lang: itemadd, isChose: true});
            } else {
              // arr.push({lang: item?.name, isChose: false});
            }
          });
        });

        AuthReducer?.launageResponse?.result?.map((item, index) => {
          arr3.push({lang: item?.name, isChose: false});
        });
        arr3.map((item, index) => {
          arr4.map((item1, index1) => {
            if (item?.lang == item1?.lang) {
              arr3[index].isChose = true;
            }
          });
        });
        console.log('>>>>>>>>>>>>>>>>>>>>>>> 368', arr);
        setDataLanguage(arr3);
        setData(arr2);
        setGender(
          UserReducer?.userResponse?.gender == 'Male'
            ? 'm'
            : UserReducer?.userResponse?.gender == 'Female'
            ? 'f'
            : UserReducer?.userResponse?.gender == 'Non-binary'
            ? 'Non-binary'
            : '',
        );
        setCountryValue(UserReducer?.userResponse?.country);
        setName(UserReducer?.userResponse?.creatorName);
        var dobval = UserReducer?.userResponse?.dob;
        var dobformate = moment(dobval)
          .utc(true)
          .format('yyyy-MM-DD')
          .replace('-', ' ')
          .replace('-', ' ');
        console.log(dobformate.replace('-', ' '));
        setDayValue(dobformate.split(' ')[2]);
        setMonthValue(
          months[Math.round(dobformate.split(' ')[1] - 1)]?.['name'],
        );
        setYearValue(dobformate.split(' ')[0]);
        console.log(
          'months ',
          months[Math.round(dobformate.split(' ')[1] - 1)]['name'],
        );
        break;
      case 'userProfile/getUserFailure':
        status1 = UserReducer.status;
        break;
      case 'userProfile/getEditRequest':
        status1 = UserReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'userProfile/getEditSuccess':
        status1 = UserReducer.status;
        console.log(
          'AuthReducer?.launageResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          UserReducer.userResponse,
        );
        props.navigation.goBack();

        break;
      case 'userProfile/getEditFailure':
        status1 = UserReducer.status;
        break;
    }
  }
  async function updateProfile() {
    data.map((item, index) => {
      if (item?.isChose == true) {
        niches.push(item?.lang);
      }
    });
    datalang.map((item, index) => {
      if (item?.isChose == true) {
        languges.push(item?.lang);
      }
    });
    try {
      console.log(months.find(item => item?.name == monthValue));
      let obj = {
        CreatorID: AuthReducer?.creatorID,
        creatorName: name,
        dob:
          yearValue +
          '-' +
          months.find(item => item?.name == monthValue)?.value +
          '-' +
          dayValue,
        gender:
          gender == 'm' ? 'Male' : gender == 'f' ? 'Female' : 'Non-binary',
        country: countryValue,
        niches: niches,
        languages: languges,
      };
      connectionrequest()
        .then(() => {
          console.log('login', obj);
          dispatch(getEditRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {}
  }
  function selected(sel) {
    var seldata = new Set([]);
    seldata = data?.map(item => {
      if (item?.isChose == true) {
        console.log('selected', item);
        return item?.lang + ', ';
      }
    });
    console.log('selected', seldata);
    return seldata;
  }
  function selectedLan(sel) {
    var seldata = new Set([]);
    seldata = datalang?.map(item => {
      if (item?.isChose == true) {
        console.log('selected', item);
        return item?.lang + ', ';
      }
    });
    console.log('selected', seldata);
    return seldata;
  }
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
        <Loader
          visible={
            AuthReducer?.status == 'Auth/getContentNicheRequest' ||
            AuthReducer?.status == 'Auth/getLaunageRequest' ||
            UserReducer?.status == 'userProfile/getEditRequest' ||
            AuthReducer.status == 'Auth/locationRequest'
          }
        />
        {/* <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.black} /> */}
        <HeaderCommon
          picTitle={true}
          home={true}
          back={true}
          backgroundColor={'#000'}
          title={'Edit Profile'}
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
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {/* <SafeAreaView style={style.container}> */}
          {/* <View > */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={style.container}>
            <>
              <View
                style={{
                  marginTop: normalize(12),
                  paddingHorizontal: normalize(3),
                  borderRadius: normalize(7),
                }}>
                <Text
                  style={{
                    color: '#CECECE',
                    fontSize: normalize(12),
                    marginLeft: normalize(3),
                  }}>
                  Name
                </Text>

                <TextInputItem
                  heightInput={
                    Platform.OS == 'ios' ? normalize(42) : normalize(40)
                  }
                  widthInput={'100%'}
                  value={name}
                  placeholder="Enter Full Name"
                  onChangeText={text => setName(text)}
                  marginTop={normalize(10)}
                  placeholderTextColor={'#ABABAB'}
                  fontFamily={Fonts.Inter_SemiBold}
                  color={Colors.white}
                  borderRadius={7}
                  borderColor={'#434540'}
                  borderWidth={1}
                  backgroundColor={Colors.black}
                  inputHeight={normalize(52)}
                />
                <View>
                  <Text
                    style={{
                      color: '#CECECE',
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
                              opacity: 0.3,
                              marginBottom: normalize(4),
                              marginEnd: normalize(5),
                              marginStart: normalize(0),
                            },
                          ]}>
                          Month
                        </Text>
                        {monthValue ? (
                          <Text
                            style={[
                              {
                                ...style.text4,
                                fontSize: normalize(14),
                                marginStart: 0,
                              },
                            ]}>
                            {monthValue}
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
                      borderWidth={normalize(1)}
                      inputHeight={normalize(52)}
                      backgroundColor={Colors.black}
                    />
                  </View>
                  <Text
                    style={{
                      color: '#CECECE',
                      fontSize: normalize(12),
                      marginLeft: normalize(3),
                      marginTop: normalize(12),
                    }}>
                    Identity
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: normalize(9)}}>
                    <Button
                      width={'22%'}
                      height={normalize(25)}
                      alignSelf={'center'}
                      backgroundColor={gender == 'm' ? Colors.white : '#000000'}
                      borderColor={'#434540'}
                      borderWidth={1}
                      title={'Male'}
                      textColor={gender == 'm' ? Colors.black : Colors.white}
                      titlesingle={true}
                      borderRadius={normalize(25)}
                      onPress={() => {
                        setGender('m');
                      }}
                    />
                    <Button
                      width={'27%'}
                      height={normalize(25)}
                      alignSelf={'center'}
                      backgroundColor={gender == 'f' ? Colors.white : '#000000'}
                      title={'Female'}
                      borderColor={'#434540'}
                      borderWidth={1}
                      textColor={gender == 'f' ? Colors.black : Colors.white}
                      titlesingle={true}
                      borderRadius={normalize(25)}
                      marginHorizontal={normalize(5)}
                      onPress={() => {
                        setGender('f');
                      }}
                    />
                    <Button
                      width={normalize(Dimensions.get('screen').width - 297)}
                      height={normalize(25)}
                      alignSelf={'center'}
                      backgroundColor={
                        gender == 'Non-binary' ? Colors.white : '#000000'
                      }
                      title={'Non-binary'}
                      borderColor={'#434540'}
                      borderWidth={1}
                      textColor={
                        gender == 'Non-binary' ? Colors.black : Colors.white
                      }
                      titlesingle={true}
                      borderRadius={normalize(25)}
                      marginHorizontal={normalize(5)}
                      onPress={() => {
                        setGender('Non-binary');
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      color: '#CECECE',
                      fontSize: normalize(12),
                      marginLeft: normalize(3),
                      marginTop: normalize(9),
                    }}>
                    Country
                  </Text>
                  <Selector
                    text={countryValue}
                    placeholder="Select country"
                    onPress={() => setShowPicker(true)}
                    icon={Icons.arrow_down}
                    width={'100%'}
                    height={normalize(42)}
                    imageheight={normalize(10)}
                    imagewidth={normalize(11)}
                    backcolor={Colors.black}
                    borderRadius={normalize(6)}
                    marginTop={normalize(12)}
                    borderWidth={normalize(1)}
                    borderColor={Colors.borderColor}
                    placeholderTextColor={'#A1A1A1'}
                    // fontFamily={Fonts.Roboto_Black}
                    margright={normalize(0)}
                    marginLeft={normalize(0)}
                    fontcolor={'#ffff'}
                  />
                  <Text
                    style={{
                      color: '#CECECE',
                      fontSize: normalize(12),
                      marginLeft: normalize(3),
                      marginTop: normalize(9),
                    }}>
                    Content Niche (Select upto 3)
                  </Text>
                  <View
                    style={{
                      marginTop: normalize(5),
                      // backgroundColor: Colors.red,
                    }}>
                    <Selector
                      text={selected(data?.find(item => item?.isChose == true))}
                      placeholder="Content Niche (Select upto 3)"
                      onPress={() => setShowPickerNiche(true)}
                      icon={Icons.arrow_down}
                      width={'100%'}
                      height={normalize(42)}
                      imageheight={normalize(10)}
                      imagewidth={normalize(11)}
                      backcolor={Colors.black}
                      borderRadius={normalize(6)}
                      marginTop={normalize(9)}
                      borderWidth={normalize(1)}
                      borderColor={Colors.borderColor}
                      placeholderTextColor={'#A1A1A1'}
                      // fontFamily={Fonts.Roboto_Black}
                      margright={normalize(0)}
                      marginLeft={normalize(0)}
                      fontcolor={'#ffff'}
                    />
                  </View>
                  <Text
                    style={{
                      color: '#CECECE',
                      fontSize: normalize(12),
                      marginLeft: normalize(3),
                      marginTop: normalize(9),
                    }}>
                    Your Language
                  </Text>
                  <View
                    style={{
                      marginTop: normalize(5),
                      marginBottom: normalize(12),
                    }}>
                    <Selector
                      text={selectedLan()}
                      placeholder="Select Language"
                      onPress={() => setShowPickerLan(true)}
                      icon={Icons.arrow_down}
                      width={'100%'}
                      height={normalize(42)}
                      imageheight={normalize(10)}
                      imagewidth={normalize(11)}
                      backcolor={Colors.black}
                      borderRadius={normalize(6)}
                      marginTop={normalize(9)}
                      borderWidth={normalize(1)}
                      borderColor={Colors.borderColor}
                      placeholderTextColor={'#A1A1A1'}
                      // fontFamily={Fonts.Roboto_Black}
                      margright={normalize(0)}
                      marginLeft={normalize(0)}
                      fontcolor={'#ffff'}
                    />
                  </View>
                </View>
              </View>
            </>
          </ScrollView>
          {/* </View> */}
        </KeyboardAvoidingView>
        {showPicker ? (
          <Picker
            backgroundColor={Colors.bcolor}
            dataList={country}
            modalVisible={showPicker}
            isSearch={true}
            title={'Country'}
            height={normalize(250)}
            onBackdropPress={() => setShowPicker(!showPicker)}
            renderData={({item, index}) => {
              return (
                <>
                  <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => {
                      setCountryValue(item?.name);
                      setShowPicker(!showPicker);
                    }}>
                    <View style={style.cardLocation}>
                      <View
                        style={{
                          height: normalize(12),
                          width: normalize(12),
                          backgroundColor:
                            item?.name == countryValue
                              ? Colors.white
                              : Colors.bcolor,
                          borderRadius: normalize(12),
                        }}></View>
                    </View>
                    <TouchableOpacity
                      style={style.dropDownItem}
                      onPress={() => {
                        setCountryValue(item?.name);
                        setShowPicker(!showPicker);
                      }}>
                      <Text
                        style={[
                          style.dropDownItemText,
                          countryValue == item?.name
                            ? {color: Colors.red}
                            : {color: Colors.white},
                        ]}>
                        {item?.name}
                      </Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                </>
              );
            }}
          />
        ) : null}
        {showPickerNiche ? (
          <Picker
            backgroundColor={Colors.bcolor}
            dataList={data}
            modalVisible={showPickerNiche}
            title={'Niches'}
            height={normalize(250)}
            onBackdropPress={() => setShowPickerNiche(!showPickerNiche)}
            renderData={renderData}
          />
        ) : null}
        {showPickerLan ? (
          <Picker
            backgroundColor={Colors.bcolor}
            dataList={datalang}
            modalVisible={showPickerLan}
            title={'Language'}
            height={normalize(250)}
            onBackdropPress={() => setShowPickerLan(!showPickerLan)}
            renderData={renderData1}
          />
        ) : null}
        {/* </SafeAreaView> */}
        {/* <Picker
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
      /> */}
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
            style={{
              flex: 1,
              backgroundColor: '#ddd',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#181818',
              borderTopLeftRadius: normalize(17),
              borderTopRightRadius: normalize(17),
              maxHeight: props.height,
              paddingLeft: normalize(10),
              paddingBottom: normalize(15),
              paddingTop: normalize(19),
              height: normalize(200),
            }}>
            <View
              style={{
                marginTop: normalize(12),
                marginBottom: normalize(12),
                marginStart: normalize(12),
              }}>
              <Text
                style={[
                  style.dropDownItemText,
                  {color: Colors.white, marginBottom: normalize(12)},
                ]}>
                Select Month
              </Text>
              <View
                style={{
                  height: normalize(1),
                  width: '90%',
                  backgroundColor: Colors.white,
                }}
              />
            </View>

            <FlatList
              data={months}
              keyExtractor={item => item.name?.toString()}
              numColumns={3}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setMonthValue(item?.name);
                      setMonth(!month);
                      console.log('setMonthValue', monthValue);
                    }}
                    style={{
                      ...style.dropDownItem,
                      backgroundColor:
                        monthValue == item?.name ? Colors.white : Colors.bcolor,
                    }}>
                    <Text
                      style={[
                        style.dropDownItemText,
                        monthValue == item?.name
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
        {/* <Picker
        backgroundColor={Colors.bcolor}
        dataList={years}
        modalVisible={year}
        onBackdropPress={() => setYear(false)}
        renderData={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (moment(Date.now()).format('YYYY') < parseInt(item)) {
                  Toast('Please dont select Future DOB');
                } else {
                  console.log(moment(Date.now()).format('YYYY'));
                  setYearValue(item);
                  setYear(!year);
                }
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
      /> */}
        <ButtonLinear
          width={'94%'}
          height={normalize(40)}
          alignSelf={'center'}
          backgroundColor={Colors.btnColor}
          title={'Save Changes'}
          textColor={Colors.black}
          titlesingle={true}
          borderRadius={normalize(25)}
          marginHorizontal={normalize(5)}
          btnBottom={0}
          onPress={() => {
            updateProfile();
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
    paddingHorizontal: normalize(6),
  },
  containerBody: {
    paddingHorizontal: normalize(10),
    marginTop: normalize(12),
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
    width: normalize(190),
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
  text8: {
    color: Colors.white,
    fontSize: normalize(14),
    opacity: 0.7,
    marginStart: normalize(6),
    alignSelf: 'flex-start',
  },
  dropDownItem: {
    paddingVertical: normalize(7),
    borderColor: Colors.borderColor,
    borderWidth: normalize(1),
    paddingHorizontal: normalize(16),
    margin: normalize(6),
    borderRadius: normalize(29),
    color: Colors.white,
  },
  dropDownItemText: {
    fontSize: normalize(14),
    lineHeight: normalize(14),
    fontFamily: Fonts.montserrat_reg,
  },
  cardLocation: {
    height: normalize(18),
    width: normalize(18),
    borderRadius: normalize(18),
    borderWidth: normalize(1),
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text4: {
    color: Colors.white,
    fontSize: normalize(12),
    fontFamily: Fonts.Inter_Regular,
    marginStart: normalize(6),
  },
  containerviw: {
    flexDirection: 'row',
    borderColor: Colors.borderColor,
    borderWidth: normalize(1),
    borderRadius: normalize(25),
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    marginTop: normalize(6),
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
    backgroundColor: Colors.black,
    marginBottom: normalize(8),
    marginStart: normalize(5),
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
    width: normalize(112),
    padding: normalize(12),
    borderRadius: normalize(6),
    borderWidth: normalize(1),
    borderColor: Colors.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default EditProfile;
