import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../Components/Button';
import Header from '../../Components/Header';
import {Colors, Fonts} from '../../themes/Themes';
import normalize from '../../utils/helpers/dimen';
import Toast from '../../utils/helpers/Toast';
import ButtonLinear from '../../Components/Button Linear';
import {useDispatch, useSelector} from 'react-redux';
import constant from '../../utils/helpers/constant';
import {
  deviceTokenRequest,
  otpSendRequest,
  otpVerifyRequest,
} from '../../redux/reducers/AuthReducer';
import connectionrequest from '../../utils/helpers/NetInfo';
import Loader from '../../utils/helpers/Loader';
import {getDeviceToken} from '../../utils/helpers/FirebaseToken';
import OtpInput from '../../Components/Otp';

function Otp(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);

  const [otp, setOtp] = useState('');
  const [seconds, setSeconds] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);
  var status = '';
  const [arr, setArr] = useState([]);
  const {mobile} = props.route.params;
  useEffect(() => {
    setArr(mobile.split(''));
    console.log(arr);
  }, []);

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
    setIsTimerActive(false); // Reset the timer
  };

  async function verifyOtp() {
    try {
      if (otp == '') {
        Toast('Please enter Otp');
      } else {
        var otpVal = otp;
        let obj = 'OTP=' + otpVal + '&' + 'phoneNo=' + mobile.toString();
        connectionrequest()
          .then(() => {
            console.log('login', obj);
            dispatch(otpVerifyRequest(obj));
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
    setIsTimerActive(true);
    setSeconds(60);
    try {
      if (mobile == '') {
        Toast('Please enter 10 digit mobile number');
      } else if (mobile.length < 10) {
        Toast('Please enter mobile number');
      } else {
        let obj = 'phoneNo=' + mobile.toString();
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
      case 'Auth/otpVerifyRequest':
        status = AuthReducer.status;
        break;

      case 'Auth/otpVerifySuccess':
        status = AuthReducer.status;
        console.log('success')
        if (AuthReducer?.otpVerifyResponse?.result?.userID !== 0) {
          if (
            AuthReducer?.otpVerifyResponse?.result?.isSignedUp &&
            AuthReducer?.profile == true
          ) {
            props.navigation.navigate('Home');
          } else {
            getDeviceToken().then(res => {
              var obj = {
                CreatorID: AuthReducer?.CreatorID,
                FCMToken: res,
              };
              dispatch(deviceTokenRequest(obj));
            });
            props.navigation.navigate('SignupName', {
              mobile: mobile,
            });
          }
        } else {
        }
        break;

      case 'Auth/otpVerifyFailure':
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
            title={'Log in / Sign up'}
            heardetext={Colors.white}
            headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(51)}
            textfontSize={normalize(16)}
            fontFamily={Fonts.Inter_Bold}
            marginStart={normalize(43)}
            backPress={constant.OTP='otp'}
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
                Enter the 6-digit security code we sent to *******
                {arr[7] + arr[8] + arr[9]}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: normalize(12),
                }}>
                <OtpInput length={6} onOtpChange={handleOtpChange} />
              </View>
              {/* <View
                style={{
                  // alignSelf: 'flex-end',
                  justifyContent:'space-between',
                  flexDirection:'row',
                }}>
                <Text
                  onPress={() => {dispatch(otpSendRequest());props?.navigation?.goBack()}}
                  style={{
                    ...style.text3,
                    color: Colors.white,
                  }}>
                  Change Mobile No.
                </Text> */}
                <Text
                  onPress={() => (!isTimerActive ? resendOtp() : null)}
                  style={{
                    ...style.text3,
                    color: Colors.yellow,
                  }}>
                  Resend OTP {' '}
                  {isTimerActive ?
                    <Text
                      style={{
                        ...style.text3,
                        color: Colors.yellow,
                      }}>
                      in {formatTime(seconds)}
                    </Text>
                  :null}
                </Text>
              {/* </View> */}
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

export default Otp;
