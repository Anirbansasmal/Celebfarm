import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../Components/Header';
import {Colors, Fonts} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import Toast from '../../../utils/helpers/Toast';
import ButtonLinear from '../../../Components/Button Linear';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../../utils/helpers/NetInfo';
import Loader from '../../../utils/helpers/Loader';
import OtpInput from '../../../Components/Otp';
import { getEditEmailRequest, getotpVerifyEmailRequest } from '../../../redux/reducers/UserReducer';

var status = '';
function OtpEmailVerifyEdit(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const UserReducer = useSelector(state => state.UserReducer);


  const [otp, setOtp] = useState('');
  const [seconds, setSeconds] = useState(120);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const {email} = props.route.params;
  useEffect(() => {}, []);

  async function verifyOtp() {
    try {
      if (otp == '') {
        Toast('Please enter Otp');
      } else {
        var otpVal = otp;
        let obj =
          'creatorID=' +
          AuthReducer?.creatorID +
          '&' +
          'OTP=' +
          otpVal +
          '&' +
          'email=' +
          email.toString();
        connectionrequest()
          .then(() => {
            console.log('login', obj);
            dispatch(getotpVerifyEmailRequest(obj));
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

  async function emailEdit() {
    console.log('creatorID', AuthReducer?.creatorID);
    try {
      let obj = {
        Email: email,
        creatorID: AuthReducer?.creatorID,
      };
      connectionrequest()
        .then(() => {
          console.log('signup', obj);
          dispatch(getEditEmailRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }

  if (status == '' || UserReducer.status != status) {
    switch (UserReducer.status) {
      case 'userProfile/getotpVerifyEmailRequest':
        status = AuthReducer.status;
        break;

      case 'userProfile/getotpVerifyEmailSuccess':
        status = UserReducer.status;
        console.log(props?.params);
        emailEdit();
        break;

      case 'userProfile/getotpVerifyEmailFailure':
        status = UserReducer.status;
        break;

        case 'userProfile/getEditEmailRequest':
          status = AuthReducer.status;
          break;
  
        case 'userProfile/getEditEmailSuccess':
          status = UserReducer.status;
          props.navigation.goBack();

          break;
  
        case 'userProfile/getEditEmailFailure':
          status = UserReducer.status;
          break;
  
    }
  }

  const handleOtpChange = otpVal => {
    setOtp(otpVal);
  };

  return (
    <>
      <Loader visible={AuthReducer.status == 'Auth/otpVerifyEmailRequest'} />

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
              {/* <View
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
                      style={{
                        ...style.text3,
                        color: Colors.yellow,
                      }}>
                      {formatTime(seconds)}
                    </Text>
                  }
                </Text>
              </View> */}
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

export default OtpEmailVerifyEdit;
