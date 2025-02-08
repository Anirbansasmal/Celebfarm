import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {Colors, Fonts} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import Button from '../../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../themes/icons';
import Images from '../../../themes/Images';
import Toast from '../../../utils/helpers/Toast';
import {ScrollView} from 'react-native-gesture-handler';
import ButtonLinear from '../../../Components/Button Linear';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../../utils/helpers/NetInfo';
import {
  getAadhaarVerifyOtpRequest,
  getInitSessionRequest,
  getSaveAadhaarRequest,
} from '../../../redux/reducers/ProfileReducer';
import Loader from '../../../utils/helpers/Loader';
import OtpInput from '../../../Components/Otp';
import HeaderCommon from '../../../Components/HeaderCommon';
import moment from 'moment';
var status = '';
function IdVerification2(props) {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(600); // 600 seconds = 10 minutes
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);

  async function verifyOtp() {
    try {
      console.log('ngmdfbgdfbgm');
      if (otp == '') {
        Toast('Please enter your aadhaar otp');
      } else {
        var obj = `creatorID=${AuthReducer?.creatorID}&otp=${otp}&aadhaarNo=${props?.route?.params?.aadhaar}`;
        connectionrequest()
          .then(() => {
            dispatch(getAadhaarVerifyOtpRequest(obj));
          })
          .catch(() => {});
      }
    } catch (e) {}
  }

  async function saveAadhaar() {
    try {
      console.log('ngmdfbgdfbgm');
      if (otp == '') {
        Toast('Please enter your aadhaar otp');
      } else {
        var obj = {
          DecentroTxnId: ProfileReducer?.verifyotpResponse?.decentroTxnId,
          Status: true,
          ResponseCode: ProfileReducer?.verifyotpResponse?.responseCode,
          Message: ProfileReducer?.verifyotpResponse?.message,
          AadhaarReferenceNumber: props?.route?.params?.aadhaar,
          DOB: moment(
            ProfileReducer?.verifyotpResponse?.data?.proofOfIdentity?.dob,
          ).format('YYYY-MM-DD'),
          HashedEmail:
            ProfileReducer?.verifyotpResponse?.data?.proofOfIdentity
              ?.hashedEmail,
          Gender:
            ProfileReducer?.verifyotpResponse?.data?.proofOfIdentity?.gender,
          HashedMobileNumber:
            ProfileReducer?.verifyotpResponse?.data?.proofOfIdentity
              ?.mobileNumber,
          Name: ProfileReducer?.verifyotpResponse?.data?.proofOfIdentity?.name,
          Country:
            ProfileReducer?.verifyotpResponse?.data?.proofOfAddress?.country,
          District:
            ProfileReducer?.verifyotpResponse?.data?.proofOfAddress?.district,
          House: ProfileReducer?.verifyotpResponse?.data?.proofOfAddress?.house,
          Landmark:
            ProfileReducer?.verifyotpResponse?.data?.proofOfAddress?.landmark,
          Locality:
            ProfileReducer?.verifyotpResponse?.data?.proofOfAddress?.locality,
          Pincode:
            ProfileReducer?.verifyotpResponse?.data?.proofOfAddress?.pincode,
          PostOffice:
            ProfileReducer?.verifyotpResponse?.data?.proofOfAddress?.postOffice,
          State: ProfileReducer?.verifyotpResponse?.data?.proofOfAddress?.state,
          Street:
            ProfileReducer?.verifyotpResponse?.data?.proofOfAddress?.street,
          SubDistrict:
            ProfileReducer?.verifyotpResponse?.data?.proofOfAddress
              ?.subDistrict,
          Image: ProfileReducer?.verifyotpResponse?.data?.image,
          AadhaarZip:
            ProfileReducer?.verifyotpResponse?.data?.aadhaarFile?.aadhaarZip,
          ShareCode:
            ProfileReducer?.verifyotpResponse?.data?.aadhaarFile?.shareCode,
          IsVerify: true,
          CreatorID: AuthReducer?.creatorID,
          aadhaarNo:ProfileReducer?.verifyotpResponse?.data?.aadhaarFile?.aadhaarNo,
        };
        connectionrequest()
          .then(() => {
            dispatch(getSaveAadhaarRequest(obj));
          })
          .catch(() => {});
      }
    } catch (e) {}
  }

  // async function initSession() {
  //   console.log(rendomId(125549, 1987979));
  //   var obj = {
  //     reference_id: 'ABCDEF' + rendomId(125549, 1987979),
  //     consent: true,
  //     purpose: 'For Aadhaar verification',
  //   };
  //   try {
  //     connectionrequest()
  //       .then(() => {
  //         dispatch(getInitSessionRequest(obj));
  //       })
  //       .then(() => {});
  //   } catch (error) {}
  // }
  useEffect(() => {
    try {
      connectionrequest().then(() => {
        // initSession();
      });
    } catch (error) {}
  }, []);
  function rendomId(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // Format timer (MM:SS)
  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/getInitSessionRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Profile/getInitSessionSuccess':
        status = ProfileReducer.status;
        console.log(
          'ProfileReducer?.nichResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          ProfileReducer.initSessionResponse,
        );
        // verifyCaptcha();
        break;
      case 'Profile/getInitSessionFailure':
        status = ProfileReducer.status;
        break;

      case 'Profile/getAadhaarVerifyOtpRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Profile/getAadhaarVerifyOtpSuccess':
        status = ProfileReducer.status;
        console.log(
          'ProfileReducer?.nichResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          ProfileReducer.verifyotpResponse,
        );
        Toast(ProfileReducer?.verifyotpResponse?.message);
        setTimeout(() => {
          saveAadhaar();
        }, 1000);

        // props.navigation.navigate('IdVerification3');
        break;
      case 'Profile/getAadhaarVerifyOtpFailure':
        status = ProfileReducer.status;
        console.log(ProfileReducer?.error);
        Toast('Something want wrong');
        break;
      case 'Profile/getSaveAadhaarRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Profile/getSaveAadhaarSuccess':
        status = ProfileReducer.status;
        console.log(
          'ProfileReducer?.nichResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          ProfileReducer.launageResponse,
        );
        props.navigation.goBack();
        props.navigation.goBack();

        break;
      case 'Profile/getSaveAadhaarFailure':
        status = ProfileReducer.status;
        break;
    }
  }

  const handleOtpChange = otpValue => {
    setOtp(otpValue);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setOtp(''); // Clear OTP after the timer ends
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000); // Decrement the timer every second

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);
  async function resendOtp() {
    try {
      obj = {};
      connectionrequest()
        .then(() => {
          dispatch();
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {}
  }
  return (
    <>
      <Loader
        visible={
          'Profile/getAadhaarVerifyOtpRequest' == status ||
          'Profile/getSaveAadhaarRequest' == status
        }
      />
      <SafeAreaView style={style.container}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <HeaderCommon
            picTitle={true}
            home={true}
            back={true}
            backgroundColor={'#000'}
            title={'Profile'}
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

          <View style={style.container}>
            <ScrollView>
              <>
                <View
                  style={{
                    justifyContent: 'center',
                    marginTop: normalize(22),
                  }}>
                  <OtpInput length={6} onOtpChange={handleOtpChange} />
                  <Text
                    style={{color: Colors.golden, alignSelf: 'flex-end'}}
                    onPress={() => {}}>
                    Resend OTP {timer > 0 ? formatTime() : ''}
                  </Text>
                </View>
              </>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <ButtonLinear
          width={'90%'}
          height={normalize(40)}
          alignSelf={'center'}
          backgroundColor={Colors.btnColor}
          title={'Save Changes'}
          textColor={Colors.black}
          titlesingle={true}
          borderRadius={normalize(25)}
          marginHorizontal={normalize(5)}
          btnBottom={10}
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
    paddingHorizontal: normalize(10),
    marginTop: normalize(12),
    flex: 1,
    marginBottom: normalize(43),
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
  inputtext: {
    height: normalize(38),
    width: normalize(38),
    marginStart: normalize(10),
    color: Colors.white,
    textAlign: 'center',
    // fontFamily: props.fontFamily,
    fontSize: normalize(12),
    borderColor: '#434540',
    borderWidth: normalize(1),
    borderRadius: normalize(6),
  },
});

export default IdVerification2;
