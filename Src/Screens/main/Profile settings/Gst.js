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
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../themes/icons';
import {ScrollView} from 'react-native-gesture-handler';
import TextInputItem from '../../../Components/TextInputItem';
import ButtonLinear from '../../../Components/Button Linear';
import {useDispatch, useSelector} from 'react-redux';
import Picker from '../../../Components/Picker';
import Toast from '../../../utils/helpers/Toast';
import {
  getGstRequest,
  getGstVerifyRequest,
  getPanRequest,
  getPanVerifyRequest,
} from '../../../redux/reducers/ProfileReducer';
import Loader from '../../../utils/helpers/Loader';
import connectionrequest from '../../../utils/helpers/NetInfo';
import HeaderCommon from '../../../Components/HeaderCommon';
import showErrorAlert from '../../../utils/helpers/Toast';
var status = '';
function GstAdd(props) {
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [gst, setGst] = useState('');
  useEffect(() => {
    getDeatils();
  }, []);

  async function getDeatils() {
    try {
      connectionrequest()
        .then(() => {
          var obj = 'creatorID=' + AuthReducer?.creatorID;
          dispatch(getGstRequest(obj));
        })
        .catch(e => {
          console.log(e);
        });
    } catch (error) {}
  }
  async function verifyGst() {
    try {
    } catch (e) {}
    if (gst == '') {
      Toast('Please Enter your GST number');
    } else {
      var obj =
        'creatorID=' +
        AuthReducer?.creatorID +
        '&' +
        'gstNumber=' +
        gst.toString();
      connectionrequest()
        .then(() => {
          dispatch(getGstVerifyRequest(obj));
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  function rendomId(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/getGstVerifyRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Profile/getGstVerifySuccess':
        status = ProfileReducer.status;
        console.log(
          'ProfileReducer?.nichResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          ProfileReducer.initSessionResponse,
        );
        showErrorAlert('Gst Add successfully');
        props?.navigation?.goBack();
        break;
      case 'Profile/getGstVerifyFailure':
        status = ProfileReducer.status;
        Toast(ProfileReducer?.gstVerifyResponse?.message);
        break;

      case 'Profile/getGstRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Profile/getGstSuccess':
        status = ProfileReducer.status;
        setGst(ProfileReducer?.getPanResponse?.kycidNumber);
        break;
      case 'Profile/getGstFailure':
        status = ProfileReducer.status;
        break;
    }
  }

  return (
    <>
      <Loader visible={'Profile/getGstVerifyRequest' == status} />
      <SafeAreaView style={style.container}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <HeaderCommon
            picTitle={true}
            home={true}
            back={true}
            backgroundColor={'#000'}
            title={'Payments'}
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
            <ScrollView style={{flex: 1}}>
              <>
                <View
                  style={{
                    marginTop: normalize(12),
                    borderRadius: normalize(7),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: normalize(6),
                    }}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(16),
                          marginStart: normalize(3),
                        }}>
                        GST Details
                      </Text>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(10),
                          marginStart: normalize(3),
                          marginTop: normalize(9),
                        }}>
                        Enter your GST card details.
                      </Text>
                    </View>
                  </View>

                  <TextInputItem
                    heightInput={
                      Platform.OS == 'ios' ? normalize(42) : normalize(40)
                    }
                    widthInput={'100%'}
                    value={gst}
                    placeholder="Enter Your GST number"
                    onChangeText={text => setGst(text)}
                    marginTop={normalize(10)}
                    autoCapitalize={'characters'}
                    placeholderTextColor={'#cccc'}
                    fontFamily={Fonts.Inter_Regular}
                    color={'#ffff'}
                    borderRadius={7}
                    borderColor={'#434540'}
                    borderWidth={1}
                    backgroundColor={Colors.black}
                    inputHeight={normalize(52)}
                  />
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
          title={'Verify'}
          textColor={Colors.black}
          titlesingle={true}
          borderRadius={normalize(25)}
          marginHorizontal={normalize(5)}
          btnBottom={10}
          onPress={() => {
            verifyGst();
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
  drop: {
    height: normalize(52),
    width: normalize(82),
    padding: normalize(12),
    borderRadius: normalize(6),
    borderWidth: normalize(1),
    borderColor: '#434540',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropDownItem: {
    paddingVertical: normalize(12),
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: normalize(1),
    color: Colors.white,
  },
  dropDownItemText: {
    fontSize: normalize(14),
    lineHeight: normalize(14),
    fontFamily: Fonts.montserrat_reg,
  },
  text4: {
    color: Colors.white,
    fontSize: normalize(10),
    fontFamily: Fonts.Inter_Medium,
  },
  drop: {
    height: normalize(52),
    width: normalize(82),
    padding: normalize(12),
    borderRadius: normalize(6),
    borderWidth: normalize(1),
    borderColor: Colors.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default GstAdd;
