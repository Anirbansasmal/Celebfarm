import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../Components/Header';
import {Colors, Fonts} from '../../themes/Themes';
import normalize from '../../utils/helpers/dimen';
import Toast from '../../utils/helpers/Toast';
import ButtonLinear from '../../Components/Button Linear';
import {useDispatch, useSelector} from 'react-redux';
import {
  deviceTokenRequest,
  otpSendRequest,
  otpVerifyEmailRequest,
  otpVerifyRequest,
  signUpRequest,
} from '../../redux/reducers/AuthReducer';
import connectionrequest from '../../utils/helpers/NetInfo';
import Loader from '../../utils/helpers/Loader';
import {getDeviceToken} from '../../utils/helpers/FirebaseToken';
import OtpInput from '../../Components/Otp';

function OtpEmailVerify(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);

  const [otp, setOtp] = useState('');
  const [seconds, setSeconds] = useState(120);
  const [isTimerActive, setIsTimerActive] = useState(true);

  var status = '';
  const [arr, setArr] = useState([]);
  const {email} = props.route.params;
  useEffect(() => {}, []);

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);

      return () => clearInterval(interval); // Clean up interval on component unmount
    } else if (handleResendOtp) {
      handleResendOtp();
    }
  }, [seconds]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleResendOtp = () => {
    // Logic to resend OTP
    console.log('Resend OTP');
    setIsTimerActive(true); // Reset the timer
  };

  async function verifyOtp() {
    try {
      if (otp == '') {
        Toast('Please enter Otp');
      } else {
        var otpVal = otp;
        let obj =
          'creatorID=' +
          AuthReducer?.otpVerifyResponse?.result?.userID +'&'+
          'OTP=' +
          otpVal +
          '&' +
          'email=' +
          email.toString();
        connectionrequest()
          .then(() => {
            console.log('login', obj);
            dispatch(otpVerifyEmailRequest(obj));
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

  async function signup() {
    console.log('creatorID', AuthReducer?.otpVerifyResponse?.result?.userID);
    try {
      if (AuthReducer?.signupLocalResponse?.age == '') {
        Toast('Please select your DOB');
      } else if (AuthReducer?.signupLocalResponse?.name == '') {
        Toast('Please enter full name');
      } else {
        let obj = {
          Name: AuthReducer?.signupLocalResponse?.name,
          DOB: AuthReducer?.signupLocalResponse?.Age?.toString(),
          Email: email,
          creatorID: AuthReducer?.otpVerifyResponse?.result?.userID,
        };
        connectionrequest()
          .then(() => {
            console.log('signup', obj);
            dispatch(signUpRequest(obj));
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
  async function resendOtp() {
    setIsTimerActive(false);
    setSeconds(120);
    try {
      if (mobile == '') {
        Toast('Please enter 10 digit mobile number');
      } else if (mobile.length < 10) {
        Toast('Please enter mobile number');
      } else {
        let obj =
          'creatorID=' +
          AuthReducer?.creatorID +
          '&' +
          'email=' +
          email +
          '&' +
          'otp=' +
          otp;
        connectionrequest()
          .then(() => {
            console.log('login', obj);
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

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/otpVerifyEmailRequest':
        status = AuthReducer.status;
        break;

      case 'Auth/otpVerifyEmailSuccess':
        status = AuthReducer.status;
        signup();
        break;

      case 'Auth/otpVerifyEmailFailure':
        status = AuthReducer.status;
        break;
      case 'Auth/signUpRequest':
        status = AuthReducer.status;
        break;

      case 'Auth/signUpSuccess':
        status = AuthReducer.status;
        console.log('hgfgcvcb');
        props.navigation.navigate('GetStarted'); //Location
        break;
      case 'Auth/signUpFailure':
        status = AuthReducer.status;
        break;
    }
  }

  const handleOtpChange = otpVal => {
    setOtp(otpVal);
  };

  return (
    <>
      <Loader visible={AuthReducer.status == 'Auth/otpVerifyRequest'} />

      <SafeAreaView style={style.container}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Header
            picTitle={false}
            logo={false}
            back={true}
            backgroundColor={'#000'}
            title={'Verify Email'}
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
              height: normalize(1),
              backgroundColor: '#434540',
            }}
          />
          <ScrollView style={{flex: 1}}>
            <View style={style.containerBody}>
              <Text style={style.text}>We just sent you an OTP</Text>
              <Text style={style.text2}>
                Enter the 6-digit security code we sent to {email}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: normalize(12),
                }}>
                <OtpInput length={6} onOtpChange={handleOtpChange} />
              </View>
              <View
                style={{
                  alignSelf: 'flex-end',
                }}>
                <Text
                  onPress={() => (isTimerActive ? resendOtp() : null)}
                  style={{
                    ...style.text3,
                    color: Colors.yellow,
                  }}>
                  Resend OTP in{' '}
                  {
                    <Text
                      onPress={() => (isTimerActive ? resendOtp() : null)}
                      style={{
                        ...style.text3,
                        color: Colors.yellow,
                      }}>
                      {formatTime(seconds)}
                    </Text>
                  }
                </Text>
              </View>
              <View
                style={{
                  height: normalize(1),
                  backgroundColor: '',
                  alignSelf: 'flex-end',
                  top: normalize(9),
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: normalize(12),
                  alignSelf: 'center',
                }}></View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <ButtonLinear
          width={'91%'}
          height={normalize(40)}
          alignSelf={'center'}
          backgroundColor={Colors.btnColor}
          title={'Submit'}
          textColor={Colors.black}
          titlesingle={true}
          borderRadius={normalize(25)}
          marginHorizontal={normalize(5)}
          btnBottom={0}
          onPress={() => {
            verifyOtp();
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
    paddingHorizontal: normalize(12),
    flex: 1,
    backgroundColor: Colors.black,
  },
  text: {
    color: Colors.white,
    fontSize: normalize(19),
    marginTop: normalize(12),
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Bold,
  },
  text2: {
    color: Colors.white,
    fontSize: normalize(10),
    marginTop: normalize(7),
    opacity: 0.9,
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Regular,
  },
  text3: {
    color: '#FFDD55',
    fontSize: normalize(12),
    marginTop: normalize(12),
    alignSelf: 'flex-end',
    fontFamily: Fonts.Inter_Medium,
  },
  inputtext: {
    height: normalize(40),
    width: normalize(40),
    marginStart: normalize(7),
    color: Colors.white,
    textAlign: 'center',
    fontSize: normalize(12),
    borderColor: '#434540',
    borderWidth: normalize(1),
    borderRadius: normalize(6),
    fontFamily: Fonts.Inter_Medium,
  },
});

export default OtpEmailVerify;
