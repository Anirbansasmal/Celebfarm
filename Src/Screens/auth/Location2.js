import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Colors, Fonts} from '../../themes/Themes';
import normalize from '../../utils/helpers/dimen';
import Button from '../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextInputItem from '../../Components/TextInputItem';
import Selector from '../../Components/Selector';
import Toast from '../../utils/helpers/Toast';
import Icons from '../../themes/icons';
import Header from '../../Components/Header';
import ButtonLinear from '../../Components/Button Linear';
import {useDispatch, useSelector} from 'react-redux';
import {
  citiesRequest,
  profilelocalRequest,
  stateRequest,
} from '../../redux/reducers/AuthReducer';
import Picker from '../../Components/Picker';
import connectionrequest from '../../utils/helpers/NetInfo';
import Loader from '../../utils/helpers/Loader';
import LinearGradient from 'react-native-linear-gradient';
var status = '';
function Location2(props) {
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerState, setShowPickerState] = useState(false);

  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [cityValue, setCityValue] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [country, setCountry] = useState(
    AuthReducer?.profileLocalResponse?.country,
  );
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  async function locationnext() {
    if (cityValue == '') {
      Toast('Please select city');
    } else if (AuthReducer?.profilelocalResponse?.country == '') {
      Toast('Please enter country');
    } else {
      var obj = {
        country: AuthReducer?.profileLocalResponse?.country,
        city: cityValue,
        launage: AuthReducer?.profilelocalResponse?.launage,
        identity: AuthReducer?.profilelocalResponse?.identity,
        niche: AuthReducer?.profilelocalResponse?.niche,
        social: AuthReducer?.profilelocalResponse?.social,
      };
      dispatch(profilelocalRequest(obj));
      props.navigation.navigate('Language');
    }
  }

  async function locationState(citiesName) {
    try {
      var obj = 'countryName=' + citiesName;
      connectionrequest()
        .then(() => {
          dispatch(stateRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function locationCities(statename) {
    try {
      var obj = 'countryName=' + country + '&' + 'stateName=' + statename;
      connectionrequest()
        .then(() => {
          dispatch(citiesRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    try {
      locationState(AuthReducer?.profileLocalResponse?.country);
    } catch (error) {}
  }, []);

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/stateRequest':
        status = AuthReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Auth/stateSuccess':
        status = AuthReducer.status;
        console.log(
          'AuthReducer?.launageResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          AuthReducer.locationResponse,
        );
        setState(AuthReducer.stateResponse?.result);

        break;
      case 'Auth/stateFailure':
        status = AuthReducer.status;
        break;
      case 'Auth/citiesRequest':
        status = AuthReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Auth/citiesSuccess':
        status = AuthReducer.status;
        console.log(
          'AuthReducer?.launageResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          AuthReducer.locationResponse,
        );
        setCity(AuthReducer.citesResponse?.result);

        break;
      case 'Auth/stateFailure':
        status = AuthReducer.status;
        break;
    }
  }

  return (
    <>
      <Loader visible={AuthReducer.status == 'Auth/stateRequest'} />
      <SafeAreaView style={style.container}>
        <Header
          picTitle={false}
          logo={false}
          back={true}
          backgroundColor={'#000'}
          title={'Getting started'}
          heardetext={Colors.white}
          headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(51)}
          textfontSize={normalize(16)}
          fontFamily={Fonts.Inter_Bold}
          marginStart={normalize(43)}
          textColor={'#ffff'}
          {...props}
        />
        <View
          style={{
            backgroundColor: '#434540',
            width: '100%',
          }}>
          <LinearGradient
            colors={['#B7E2F2', '#D8E480', '#FC9973']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              height: normalize(3),
              width: '36%',
            }}></LinearGradient>
        </View>
        <View style={style.containerBody}>
          <Text style={style.text}>Location</Text>
          <Text style={style.text2}>Select your current city.</Text>
          <Text style={{...style.text3, marginTop: normalize(42)}}>
            Country
          </Text>
          <TextInputItem
            heightInput={Platform.OS == 'ios' ? normalize(42) : normalize(40)}
            value={country}
            // onChangeText={text => setMobile(text)}
            editable={false}
            marginTop={normalize(10)}
            placeholderTextColor={'#ABABAB'}
            // fontFamily={Fonts.futura_medium_bt}
            color={'#ffff'}
            borderWidth={normalize(1)}
            borderColor={Colors.borderColor}
            borderRadius={7}
            backgroundColor={Colors.black}
            inputHeight={normalize(42)}
          />
          <Text style={style.text3}>State</Text>
          <Selector
            text={stateValue}
            placeholder="Select State"
            onPress={() => setShowPickerState(!showPickerState)}
            icon={Icons.arrow_down}
            width={'100%'}
            height={normalize(42)}
            imageheight={normalize(10)}
            imagewidth={normalize(11)}
            backcolor={Colors.black}
            borderRadius={normalize(6)}
            marginTop={normalize(17)}
            borderColor={Colors.borderColor}
            borderWidth={normalize(1)}
            placeholderTextColor={'#A1A1A1'}
            fontFamily={Fonts.Inter_Medium}
            margright={normalize(0)}
            marginLeft={normalize(0)}
            fontcolor={'#ffff'}
          />
          <Text style={style.text3}>City</Text>
          <Selector
            text={cityValue}
            placeholder="Select city"
            onPress={() => setShowPicker(!showPicker)}
            icon={Icons.arrow_down}
            width={'100%'}
            height={normalize(42)}
            imageheight={normalize(10)}
            imagewidth={normalize(11)}
            backcolor={Colors.black}
            borderRadius={normalize(6)}
            marginTop={normalize(17)}
            borderColor={Colors.borderColor}
            borderWidth={normalize(1)}
            placeholderTextColor={'#A1A1A1'}
            fontFamily={Fonts.Inter_Medium}
            margright={normalize(0)}
            marginLeft={normalize(0)}
            fontcolor={'#ffff'}
          />
          <View
            style={{
              position: 'absolute',
              bottom: normalize(10),
            }}></View>
          {showPicker ? (
            <Picker
              backgroundColor={Colors.bcolor}
              dataList={city}
              modalVisible={showPicker}
              isSearch={true}
              title={'City'}
              height={normalize(250)}
              onBackdropPress={() => setShowPicker(!showPicker)}
              renderData={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => {
                      setCityValue(item?.name);
                      setShowPicker(!showPicker);
                    }}>
                    <View style={style.card}>
                      <View
                        style={{
                          height: normalize(12),
                          width: normalize(12),
                          backgroundColor:
                            item?.name == cityValue
                              ? Colors.white
                              : Colors.bcolor,
                          borderRadius: normalize(12),
                        }}></View>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        setCityValue(item?.name);
                        setShowPicker(!showPicker);
                      }}
                      style={style.dropDownItem}>
                      <Text
                        style={[
                          style.dropDownItemText,
                          cityValue == item?.name
                            ? {color: Colors.red}
                            : {color: Colors.white},
                        ]}>
                        {item?.name}
                      </Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              }}
            />
          ) : null}
          {showPickerState ? (
            <Picker
              backgroundColor={Colors.bcolor}
              dataList={state}
              modalVisible={showPickerState}
              isSearch={true}
              title={'State'}
              height={normalize(250)}
              onBackdropPress={() => setShowPickerState(!showPickerState)}
              renderData={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => {
                      setStateValue(item?.name);
                      setShowPickerState(!showPickerState);
                      locationCities(item?.name);
                    }}>
                    <View style={style.card}>
                      <View
                        style={{
                          height: normalize(12),
                          width: normalize(12),
                          backgroundColor:
                            item?.name == stateValue
                              ? Colors.white
                              : Colors.bcolor,
                          borderRadius: normalize(12),
                        }}></View>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        setStateValue(item?.name);
                        setShowPickerState(!showPickerState);
                        locationCities(item?.name);
                      }}
                      style={style.dropDownItem}>
                      <Text
                        style={[
                          style.dropDownItemText,
                          stateValue == item?.name
                            ? {color: Colors.red}
                            : {color: Colors.white},
                        ]}>
                        {item?.name}
                      </Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              }}
            />
          ) : null}
        </View>

        <ButtonLinear
          width={'92%'}
          height={normalize(40)}
          alignSelf={'center'}
          backgroundColor={Colors.btnColor}
          title={'Next'}
          textColor={Colors.black}
          titlesingle={true}
          borderRadius={normalize(25)}
          marginHorizontal={normalize(5)}
          btnBottom={0}
          onPress={() => {
            locationnext();
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
    paddingHorizontal: normalize(14),
    flex: 1,
    alignItems: 'center',
  },
  dropDownItem: {
    paddingVertical: normalize(12),
    color: Colors.white,
    marginStart: normalize(12),
  },
  dropDownItemText: {
    fontSize: normalize(14),
    lineHeight: normalize(14),
    fontFamily: Fonts.montserrat_reg,
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
    fontSize: normalize(12),
    marginTop: normalize(7),
    opacity: 0.7,
    alignSelf: 'flex-start',
  },
  card: {
    height: normalize(18),
    width: normalize(18),
    borderRadius: normalize(18),
    borderWidth: normalize(1),
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text3: {
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: normalize(22),
    opacity: 0.7,
    alignSelf: 'flex-start',
  },
});
export default Location2;
