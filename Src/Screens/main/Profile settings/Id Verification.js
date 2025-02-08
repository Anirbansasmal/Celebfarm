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
import Button from '../../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../themes/icons';
import Images from '../../../themes/Images';
import {ScrollView} from 'react-native-gesture-handler';
import Toast from '../../../utils/helpers/Toast';
import TextInputItem from '../../../Components/TextInputItem';
import ButtonLinear from '../../../Components/Button Linear';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAadhaarCaptchaRequest,
  getAadhaarOtpRequest,
  getAadhaarRequest,
  getInitSessionRequest,
} from '../../../redux/reducers/ProfileReducer';
import connectionrequest from '../../../utils/helpers/NetInfo';
import Loader from '../../../utils/helpers/Loader';
import HeaderCommon from '../../../Components/HeaderCommon';

var status = '';

function IdVerification(props) {
  const [adhar, setAdhar] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [isCaptcha, setIsCaptcha] = useState(false);
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  async function verifyAdharCaptcha() {
    try {
      console.log('ngmdfbgdfbgm');
      if (adhar == '') {
        Toast('Please enter your 16 digit aadhaar number');
      } else {
        var obj = `creatorID=${AuthReducer?.creatorID}&aadhaarNo=${adhar}&captcha=${captcha}`;
        connectionrequest()
          .then(() => {
            dispatch(getAadhaarOtpRequest(obj));
          })
          .catch(() => {});
      }
    } catch (e) {}
  }

  useEffect(() => {
    initSession();
  }, []);

  async function initSession() {
    console.log(rendomId(125549, 1987979));

    var obj1 = `CreatorID=${AuthReducer?.creatorID}`;
    try {
      connectionrequest()
        .then(() => {
          dispatch(getAadhaarRequest(obj1));
        })
        .then(() => {});
    } catch (error) {}
  }

  async function reloadCaptcha() {
    console.log(rendomId(125549, 1987979));
    var obj = `creatorID=${AuthReducer?.creatorID}`;
    try {
      connectionrequest()
        .then(() => {
          dispatch(getAadhaarCaptchaRequest(obj));
        })
        .then(() => {});
    } catch (error) {}
  }

  function rendomId(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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

      case 'Profile/getAadhaarRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Profile/getAadhaarSuccess':
        status = ProfileReducer.status;
        setCaptcha(ProfileReducer?.aadhaarResponse?.aadhaarNo);
        setAdhar(ProfileReducer?.aadhaarResponse?.aadhaarReferenceNumber);
        var obj = `creatorID=${AuthReducer?.creatorID}`;
        ProfileReducer?.aadhaarResponse?.status != null
          ? null
          : dispatch(getInitSessionRequest(obj));
        // verifyCaptcha();
        break;
      case 'Profile/getAadhaarFailure':
        status = ProfileReducer.status;
        var obj = `creatorID=${AuthReducer?.creatorID}`;
        ProfileReducer?.aadhaarResponse?.status != null
          ? null
          : dispatch(getInitSessionRequest(obj));
        break;
      case 'Profile/getAadhaarCaptchaRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Profile/getAadhaarCaptchaSuccess':
        status = ProfileReducer.status;
        console.log(
          'ProfileReducer?.nichResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          ProfileReducer.aadhaarCaptchaResponse,
        );
        Toast(ProfileReducer?.aadhaarCaptchaResponse?.message);
        break;
      case 'Profile/getAadhaarCaptchaFailure':
        status = ProfileReducer.status;
        Toast('Request failed ');
        break;
      case 'Profile/getAadhaarOtpRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Profile/getAadhaarOtpSuccess':
        status = ProfileReducer.status;
        console.log(
          'ProfileReducer?.nichResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          ProfileReducer.aadhaarOtpResponse,
        );
        Toast(ProfileReducer?.aadhaarOtpResponse?.message);
        props.navigation.navigate('IdVerification2', {
          aadhaar: adhar,
        });
        break;
      case 'Profile/getAadhaarOtpFailure':
        status = ProfileReducer.status;
        Toast(ProfileReducer?.error?.response?.data?.message);

        break;
    }
  }

  return (
    <>
      <Loader
        visible={
          'Profile/getInitSessionRequest' == status ||
          'Profile/getAadhaarCaptchaRequest' == status ||
          'Profile/getAadhaarOtpRequest' == status
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
          <View style={style.containerBody}>
            <ScrollView>
              <View
                style={{
                  marginTop: normalize(12),
                  borderRadius: normalize(7),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(16),
                    marginLeft: normalize(3),
                    fontFamily: Fonts.Inter_Bold,
                  }}>
                  Id Verification
                </Text>

                <Text
                  style={{
                    color: '#CECECE',
                    fontSize: normalize(12),
                    marginLeft: normalize(3),
                    marginTop: normalize(22),
                  }}>
                  Aadhar Card Number
                </Text>

                <TextInputItem
                  heightInput={
                    Platform.OS == 'ios' ? normalize(42) : normalize(40)
                  }
                  keyboardType="number-pad"
                  widthInput={'100%'}
                  value={adhar}
                  placeholder=""
                  onChangeText={text => setAdhar(text)}
                  marginTop={normalize(10)}
                  maxLength={12}
                  placeholderTextColor={'#ABABAB'}
                  fontFamily={Fonts.Inter_Regular}
                  color={'#ffff'}
                  borderRadius={7}
                  borderColor={'#434540'}
                  borderWidth={1}
                  backgroundColor={Colors.black}
                  inputHeight={normalize(52)}
                />
                {ProfileReducer?.aadhaarResponse?.status ? null : (
                  <Text
                    style={{
                      color: '#CECECE',
                      fontSize: normalize(12),
                      marginLeft: normalize(3),
                      marginTop: normalize(22),
                      textTransform: 'capitalize',
                    }}>
                    Enter captcha
                  </Text>
                )}
                {ProfileReducer?.aadhaarResponse?.status ? null : (
                  <TextInputItem
                    heightInput={
                      Platform.OS == 'ios' ? normalize(42) : normalize(40)
                    }
                    widthInput={'100%'}
                    value={captcha}
                    placeholder=""
                    onChangeText={text => setCaptcha(text)}
                    marginTop={normalize(10)}
                    placeholderTextColor={'#ABABAB'}
                    fontFamily={Fonts.Inter_Regular}
                    color={'#ffff'}
                    borderRadius={7}
                    borderColor={'#434540'}
                    borderWidth={1}
                    backgroundColor={Colors.black}
                    inputHeight={normalize(52)}
                  />
                )}
                {ProfileReducer?.aadhaarResponse?.status != null ? null : (
                  <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                    <Image
                      source={{
                        uri: isCaptcha
                          ? 'data:image/png;base64,' +
                            ProfileReducer?.aadhaarCaptchaResponse?.data
                              ?.captchaImage
                          : 'data:image/png;base64,' +
                            ProfileReducer?.initSessionResponse?.data
                              ?.captchaImage,
                      }}
                      style={{
                        height: normalize(22),
                        width: normalize(97),
                        marginTop: normalize(12),
                        alignSelf: 'flex-end',
                      }}
                    />
                    <TouchableOpacity
                      style={{}}
                      onPress={() => {
                        reloadCaptcha();
                        setIsCaptcha(true);
                      }}>
                      <Image
                        source={Icons.reload}
                        style={{
                          height: normalize(22),
                          width: normalize(22),
                          marginTop: normalize(12),
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        {ProfileReducer?.aadhaarResponse?.status ? null : (
          <ButtonLinear
            width={'90%'}
            height={normalize(40)}
            alignSelf={'center'}
            backgroundColor={Colors.btnColor}
            title={'Send OTP'}
            textColor={Colors.black}
            titlesingle={true}
            borderRadius={normalize(25)}
            marginHorizontal={normalize(5)}
            btnBottom={0}
            onPress={() => {
              verifyAdharCaptcha();
            }}
          />
        )}
      </SafeAreaView>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
    paddingHorizontal: normalize(10),
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
});

export default IdVerification;
