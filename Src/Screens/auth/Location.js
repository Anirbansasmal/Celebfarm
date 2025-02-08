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
import Icons from '../../themes/icons';
import Toast from '../../utils/helpers/Toast';
import Header from '../../Components/Header';
import ButtonLinear from '../../Components/Button Linear';
import Picker from '../../Components/Picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  locationRequest,
  profilelocalRequest,
} from '../../redux/reducers/AuthReducer';
import connectionrequest from '../../utils/helpers/NetInfo';
import Loader from '../../utils/helpers/Loader';
import LinearGradient from 'react-native-linear-gradient';
var status = '';

function Location(props) {
  const [showPicker, setShowPicker] = useState(false);
  const [countryValue, setCountryValue] = useState('');
  const [country, setCountry] = useState([]);
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  async function location() {
    if (countryValue == '') {
      Toast('Please select country');
    } else {
      var obj = {
        country: countryValue,
        city: AuthReducer?.profileLocalResponse?.city,
        launage: AuthReducer?.profileLocalResponse?.launage,
        identity: AuthReducer?.profileLocalResponse?.identity,
        niche: AuthReducer?.profilelocaLResponse?.niche,
        social: AuthReducer?.profilelocaLResponse?.social,
      };
      dispatch(profilelocalRequest(obj));
      props.navigation.navigate('Location2');
    }
  }

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

  useEffect(() => {
    locationCountry();
  }, []);

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

  return (
    <>
      <Loader visible={AuthReducer.status == 'Auth/locationRequest'} />

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
          marginStart={normalize(42)}
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
              width: '18%',
            }}></LinearGradient>
        </View>
        <View style={style.containerBody}>
          <Text style={style.text}>Location</Text>
          <Text style={style.text2}>Select your country.</Text>
          <Text style={style.text3}>Country</Text>

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
                        onPress={() => {
                          setCountryValue(item?.name);
                          setShowPicker(!showPicker);
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
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: normalize(10),
            alignSelf:'center'
          }}>
          <ButtonLinear
            width={'82%'}
            height={normalize(40)}
            alignSelf={'center'}
            backgroundColor={Colors.btnColor}
            title={'Next'}
            textColor={Colors.black}
            fontFamily={Fonts.Inter_SemiBold}
            titlesingle={true}
            borderRadius={normalize(25)}
            marginHorizontal={normalize(5)}
            btnBottom={0}
            onPress={() => {
              location();
            }}
          />
        </View>
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
    marginStart: normalize(18),
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
    fontFamily: Fonts.Inter_Medium,
  },
  text3: {
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: normalize(42),
    opacity: 0.7,
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Regular,
  },
});

export default Location;
