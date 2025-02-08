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
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../themes/icons';
import Toast from '../../../utils/helpers/Toast';
import {ScrollView} from 'react-native-gesture-handler';
import TextInputItem from '../../../Components/TextInputItem';
import ButtonLinear from '../../../Components/Button Linear';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../../utils/helpers/NetInfo';
import {
  addAddressRequest,
  getAddressRequest,
  updateAddressRequest,
} from '../../../redux/reducers/ProfileReducer';
import Loader from '../../../utils/helpers/Loader';
import Selector from '../../../Components/Selector';
import Picker from '../../../Components/Picker';
import {
  citiesRequest,
  locationRequest,
  stateRequest,
} from '../../../redux/reducers/AuthReducer';
import HeaderCommon from '../../../Components/HeaderCommon';
var status = '',
  status1 = '';

function Address(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const [address, setAddress] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [cityValue, setCityValue] = useState('');

  const [showPicker, setShowPicker] = useState(false);
  const [showPickerC, setShowPickerC] = useState(false);
  const [showPickerState, setShowPickerState] = useState(false);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  const [pincode, setPincode] = useState('');

  useEffect(() => {
    const unsuscribe = props.navigation.addListener('focus', payload => {
      getAddress();
      dispatch(locationRequest());
    });
    return () => {
      unsuscribe();
    };
  }, []);

  function saveAddress() {
    try {
      if (address1 == '') {
        Toast('Please enter your address details1');
      } else if (address2 == '') {
        Toast('Please enter your address details2');
      } else if (stateValue == '') {
        Toast('Please enter your state');
      } else if (city == '') {
        Toast('Please enter your city');
      } else if (pincode == '') {
        Toast('Please enter your pincode');
      } else {
        let obj = {
          Id: 0,
          CreatorId: AuthReducer?.creatorID,
          Address1: address1,
          Address2: address2,
          State: stateValue,
          City: cityValue,
          Country: countryValue,
          PinCode: pincode,
        };

        connectionrequest()
          .then(() => {
            dispatch(addAddressRequest(obj));
          })
          .catch(err => {
            console.log(err);
            Toast('Please connect to internet');
          });
      }
    } catch (e) {}
  }
  async function locationState(name) {
    try {
      connectionrequest()
        .then(() => {
          const obj = 'countryName=' + name;
          dispatch(stateRequest(obj));
        })
        .catch(err => {});
    } catch (error) {}
  }
  async function locationCity(name) {
    try {
      connectionrequest()
        .then(() => {
          const obj = 'countryName=' + countryValue + '&' + 'stateName=' + name;
          dispatch(citiesRequest(obj));
        })
        .catch(err => {});
    } catch (error) {}
  }

  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/getAddressRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Profile/getAddressSuccess':
        status = ProfileReducer.status;
        console.log(
          'ProfileReducer?.Address?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          ProfileReducer.addressResponse,
        );
        setAddress1(ProfileReducer?.addressResponse?.address1);
        setAddress2(ProfileReducer?.addressResponse?.address2);
        setStateValue(ProfileReducer?.addressResponse?.state);
        setCityValue(ProfileReducer?.addressResponse?.city);
        setPincode(ProfileReducer?.addressResponse?.pinCode?.toString());
        setAddress(ProfileReducer?.addressResponse?.id);
        setCountryValue(ProfileReducer?.addressResponse?.country);

        break;
      case 'Profile/getAddressFailure':
        status = ProfileReducer.status;
        break;

      case 'Profile/updateAddressRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Profile/updateAddressSuccess':
        status = ProfileReducer.status;
        console.log(
          'ProfileReducer?.updateaddressResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          ProfileReducer.updateAddressResponse,
        );
        break;
      case 'Profile/updateAddressFailure':
        status = ProfileReducer.status;
        break;
      case 'Profile/addAddressRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Profile/addAddressSuccess':
        status = ProfileReducer.status;
        console.log(
          'ProfileReducer?.nichResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          ProfileReducer.addAddressResponse,
        );
        Toast(ProfileReducer?.addAddressResponse);
        break;
      case 'Profile/addAddressFailure':
        status = ProfileReducer.status;
        break;
    }
  }
  if (status1 == '' || AuthReducer.status != status1) {
    switch (AuthReducer.status) {
      case 'Auth/locationRequest':
        status1 = AuthReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Auth/locationSuccess':
        status1 = AuthReducer.status;
        console.log(
          'AuthReducer?.launageResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          AuthReducer.locationResponse,
        );
        setCountry(AuthReducer.locationResponse);
        break;
      case 'Auth/locationFailure':
        status1 = AuthReducer.status;
        break;
      case 'Auth/stateRequest':
        status1 = AuthReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Auth/stateSuccess':
        status1 = AuthReducer.status;
        console.log(
          'AuthReducer?.launageResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          AuthReducer.stateResponse,
        );
        setState(AuthReducer.stateResponse?.result);
        break;
      case 'Auth/stateFailure':
        status1 = AuthReducer.status;
        break;
      case 'Auth/citiesRequest':
        status1 = AuthReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Auth/citiesSuccess':
        status1 = AuthReducer.status;
        console.log(
          'AuthReducer?.launageResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          AuthReducer.citesResponse,
        );
        setCity(AuthReducer.citesResponse?.result);
        break;
      case 'Auth/citiesFailure':
        status1 = AuthReducer.status;
        break;
    }
  }
  function updateAddress() {
    try {
      if (address1 == '') {
        Toast('Please enter your address details1');
      } else if (address2 == '') {
        Toast('Please enter your address details2');
      } else if (stateValue == '') {
        Toast('Please enter your state');
      } else if (cityValue == '') {
        Toast('Please enter your city');
      } else if (pincode == '') {
        Toast('Please enter your pincode');
      } else {
        let obj = {
          Id: 0,
          CreatorId: AuthReducer?.creatorID,
          // AddressId: address,
          Address1: address1,
          Address2: address2,
          State: stateValue,
          City: cityValue,
          PinCode: pincode,
          Country: countryValue,
        };
        connectionrequest()
          .then(() => {
            dispatch(addAddressRequest(obj));
          })
          .catch(err => {
            console.log(err);
            Toast('Please connect to internet');
          });
      }
    } catch (e) {}
  }

  function getAddress() {
    try {
      let obj = 'CreatorId=' + AuthReducer?.creatorID;
      connectionrequest()
        .then(() => {
          dispatch(getAddressRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {}
  }

  return (
    <>
      <Loader
        visible={
          ProfileReducer?.status == 'Profile/addAddressRequest' ||
          ProfileReducer?.status == 'Profile/updateAddressRequest' ||
          ProfileReducer?.status == 'Profile/getAddressRequest'
        }
      />
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <HeaderCommon
            picTitle={true}
            home={true}
            back={true}
            backgroundColor={'#000'}
            title={'Address'}
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
          <ScrollView>
            <View style={style.container}>
              <>
                <View
                  style={{
                    marginTop: normalize(12),
                    borderRadius: normalize(7),
                  }}>
                  <View
                    style={{
                      marginTop: normalize(12),
                      borderRadius: normalize(7),
                    }}>
                    <Text
                      style={{
                        color: '#CECECE',
                        fontSize: normalize(12),
                        marginLeft: normalize(3),
                        marginTop: normalize(0),
                      }}>
                      Address detail 1
                    </Text>

                    <TextInputItem
                      heightInput={
                        Platform.OS == 'ios' ? normalize(42) : normalize(40)
                      }
                      widthInput={'100%'}
                      value={address1}
                      placeholder="Address 1"
                      onChangeText={text => setAddress1(text)}
                      marginTop={normalize(10)}
                      placeholderTextColor={'#ABABAB'}
                      fontFamily={Fonts.Inter_Regular}
                      color={'#fff'}
                      borderRadius={7}
                      borderColor={'#434540'}
                      borderWidth={1}
                      backgroundColor={Colors.black}
                      inputHeight={normalize(52)}
                    />
                    <Text
                      style={{
                        color: '#CECECE',
                        fontSize: normalize(12),
                        marginLeft: normalize(3),
                        marginTop: normalize(22),
                      }}>
                      Address detail 2
                    </Text>

                    <TextInputItem
                      heightInput={
                        Platform.OS == 'ios' ? normalize(42) : normalize(40)
                      }
                      widthInput={'100%'}
                      value={address2}
                      placeholder="Address 2"
                      onChangeText={text => setAddress2(text)}
                      marginTop={normalize(10)}
                      placeholderTextColor={'#ABABAB'}
                      fontFamily={Fonts.Inter_Medium}
                      color={'#fff'}
                      borderRadius={7}
                      borderColor={'#434540'}
                      borderWidth={1}
                      backgroundColor={Colors.black}
                      inputHeight={normalize(52)}
                    />
                    <Text
                      style={{
                        color: '#CECECE',
                        fontSize: normalize(12),
                        marginLeft: normalize(3),
                        marginTop: normalize(22),
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
                        marginTop: normalize(22),
                      }}>
                      State
                    </Text>
                    <Selector
                      text={stateValue}
                      placeholder="Select state"
                      onPress={() => setShowPickerState(true)}
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
                        marginTop: normalize(22),
                      }}>
                      City
                    </Text>

                    <Selector
                      text={cityValue}
                      placeholder="Select city"
                      onPress={() => setShowPickerC(true)}
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
                        marginTop: normalize(22),
                      }}>
                      pin code
                    </Text>

                    <TextInputItem
                      heightInput={
                        Platform.OS == 'ios' ? normalize(42) : normalize(40)
                      }
                      widthInput={'100%'}
                      value={pincode}
                      placeholder="Pin code"
                      onChangeText={text => setPincode(text)}
                      marginTop={normalize(10)}
                      placeholderTextColor={'#ABABAB'}
                      fontFamily={Fonts.Inter_Regular}
                      color={'#fff'}
                      borderRadius={7}
                      maxLength={6}
                      marginBottom={normalize(10)}
                      borderColor={'#434540'}
                      borderWidth={1}
                      keyboardType="number-pad"
                      backgroundColor={Colors.black}
                      inputHeight={normalize(52)}
                    />
                  </View>
                </View>
              </>
            </View>
          </ScrollView>
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
                      onPress={() => locationState(item?.name)}>
                      <View
                        style={{
                          ...style.border,
                          backgroundColor:
                            item?.name == countryValue ? Colors.white : null,
                          borderColor:
                            item?.name == countryValue
                              ? Colors.bcolor
                              : Colors.white,
                        }}></View>
                      <TouchableOpacity
                        onPress={() => {
                          setCountryValue(item?.name);
                          setCity(item['cities']);
                          setShowPicker(!showPicker);
                          locationState(item?.name);
                        }}
                        style={style.dropDownItem}>
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
          {showPickerC ? (
            <Picker
              backgroundColor={Colors.bcolor}
              dataList={city}
              modalVisible={showPickerC}
              isSearch={true}
              title={'City'}
              height={normalize(250)}
              onBackdropPress={() => setShowPickerC(!showPickerC)}
              renderData={({item, index}) => {
                return (
                  <>
                    <TouchableOpacity
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={style.border}></View>

                      <TouchableOpacity
                        onPress={() => {
                          setCityValue(item?.name);
                          setShowPickerC(!showPickerC);
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
                  </>
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
                  <>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={style.border}></View>

                      <TouchableOpacity
                        onPress={() => {
                          setStateValue(item?.name);
                          setShowPickerState(!showPickerState);
                          locationCity(item?.name);
                          
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
                  </>
                );
              }}
            />
          ) : null}
        </KeyboardAvoidingView>
        <ButtonLinear
          width={'92%'}
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
            address == '' ? saveAddress() : updateAddress();
          }}
        />
      </SafeAreaView>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    // flex: 1,
    paddingHorizontal: normalize(10),
    // height: Dimensions.get('screen').height,
  },
  containerBody: {
    paddingHorizontal: normalize(10),
    marginTop: normalize(12),
    flex: 1,
    marginBottom: normalize(43),
    backgroundColor: Colors.black,
  },
  border: {
    height: normalize(18),
    width: normalize(18),
    borderRadius: normalize(18),
    borderWidth: normalize(1),
    borderColor: Colors.white,
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
    height: normalize(38),
    width: normalize(38),
  },
  dropDownItem: {
    paddingVertical: normalize(7),
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
});

export default Address;
