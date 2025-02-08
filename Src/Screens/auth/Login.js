import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors, Fonts} from '../../themes/Themes';
import normalize from '../../utils/helpers/dimen';
import Selector from '../../Components/Selector';
import Icons from '../../themes/icons';
import TextInputItem from '../../Components/TextInputItem';
import Toast from '../../utils/helpers/Toast';
import Header from '../../Components/Header';
import ButtonLinear from '../../Components/Button Linear';
import Loader from '../../utils/helpers/Loader';
import connectionrequest from '../../utils/helpers/NetInfo';
import {otpSendRequest} from '../../redux/reducers/AuthReducer';
import {getDeviceToken} from '../../utils/helpers/FirebaseToken';
import constant from '../../utils/helpers/constant';

function Login(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);

  const [mobile, setMobile] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [country, setCountry] = useState('');
  let status = '';
  useEffect(() => {
    getDeviceToken().then(token => {
      console.log('token', token);
    });
  }, []);

  async function sendOtp() {
    try {
      if (mobile == '') {
        Toast('Please enter 10 digit mobile number');
      } else if (mobile.length < 10) {
        Toast('Incorrect Mobile Number');
      } else {
        let obj = 'phoneNo=' + mobile.toString();
        connectionrequest()
          .then(() => {
            console.log('login', obj);
            constant.OTP='';
            dispatch(otpSendRequest(obj));
          })
          .catch(err => {
            console.log(err);
            Toast('Please connect to internet');
          });
      }
    } catch (e) {
      console.log(e);
    }
  }

  if (constant.OTP == '') {
    if (status == '' || AuthReducer.status != status) {
      switch (AuthReducer.status) {
        case 'Auth/otpSendRequest':
          status = AuthReducer.status;
          break;

        case 'Auth/otpSendSuccess':
          status = AuthReducer.status;
          props.navigation.navigate('Otp', {
            mobile: mobile,
          });
          break;

        case 'Auth/otpSendFailure':
          status = AuthReducer.status;
          break;
      }
    }
  }
  return (
    <>
      <Loader visible={AuthReducer.status == 'Auth/otpSendRequest'} />
      <SafeAreaView style={style.container}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Header
            picTitle={false}
            logo={false}
            back={true}
            backgroundColor={'#000'}
            title={'Log in / Sign up'}
            heardetext={Colors.white}
            headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(51)}
            textfontSize={normalize(16)}
            fontFamily={Fonts.Inter_Bold}
            marginStart={normalize(45)}
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
              <Text style={style.text}>Enter your phone number</Text>
              <Text style={style.text2}>
                We’ll send you a OTP - it helps us keep your account secure.
              </Text>
              <Text style={style.text3}>Phone number:</Text>
              <View style={style.btnPos}>
                <Selector
                  text={country}
                  placeholder="+91"
                  onPress={() => setShowPicker(true)}
                  icon={Icons.arrow_down}
                  width={'25%'}
                  height={normalize(42)}
                  imageheight={normalize(10)}
                  imagewidth={normalize(11)}
                  backcolor={Colors.black}
                  borderRadius={normalize(6)}
                  borderWidth={normalize(1)}
                  borderColor={Colors.borderColor}
                  placeholderTextColor={'#A1A1A1'}
                  fontFamily={Fonts.Inter_Medium}
                  margright={normalize(6)}
                  marginLeft={normalize(0)}
                  fontcolor={'#ffff'}
                />
                <TextInputItem
                  heightInput={
                    Platform.OS == 'ios' ? normalize(42) : normalize(40)
                  }
                  widthInput={'75%'}
                  value={mobile}
                  placeholder="Enter phone number"
                  onChangeText={text => setMobile(text)}
                  marginTop={normalize(0)}
                  placeholderTextColor={'#ABABAB'}
                  fontFamily={Fonts.Inter_Medium}
                  color={'#fff'}
                  maxLength={10}
                  borderRadius={7}
                  keyboardType={'number-pad'}
                  borderColor={Colors.borderColor}
                  borderWidth={normalize(1)}
                  backgroundColor={Colors.black}
                  inputHeight={normalize(52)}
                />
              </View>
            </View>
          </ScrollView>
          <View style={style.containerPol}>
            <Text
              style={{
                ...style.text2,
                textAlign: 'justify',
                fontFamily: Fonts.Inter_Regular,
              }}>
              By signing up you agree to Celebfarm’s
              {
                <Text
                  style={{
                    ...style.text2,
                    textAlign: 'justify',
                    fontFamily: Fonts.Inter_Regular,
                    color: Colors.yellow,
                  }}>
                  {' '}
                  Terms of service, user agreement
                </Text>
              }{' '}
              and
              <Text
                style={{
                  ...style.text2,
                  textAlign: 'justify',
                  fontFamily: Fonts.Inter_Regular,
                  color: Colors.yellow,
                }}>
                {' '}
                privacy policy.
              </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
        <ButtonLinear
          width={'92%'}
          height={normalize(40)}
          alignSelf={'center'}
          backgroundColor={Colors.btnColor}
          title={'Send OTP'}
          textColor={Colors.black}
          fontFamily={Fonts.Inter_SemiBold}
          titlesingle={true}
          borderRadius={normalize(25)}
          btnBottom={10}
          onPress={() => {
            sendOtp();
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
    paddingHorizontal: normalize(16),
    alignItems: 'center',
    flex: 1,
    marginTop: normalize(12),
    // backgroundColor:Colors.red
  },
  text: {
    color: Colors.white,
    fontSize: normalize(21),
    marginTop: normalize(0),
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Bold,
  },
  btnPos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: normalize(19),
  },
  containerPol: {
    position: 'absolute',
    bottom: normalize(19),
    width: '100%',
    marginStart: normalize(12),
  },
  text2: {
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: normalize(7),
    opacity: 0.8,
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Medium,
  },
  text3: {
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: normalize(22),
    opacity: 0.8,
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Medium,
  },
});
export default Login;
