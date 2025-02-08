import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../themes/Themes';
import normalize from '../../utils/helpers/dimen';
import Button from '../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../themes/icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../Components/Header';
import ButtonLinear from '../../Components/Button Linear';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import ConnectInstagramAskScreen from './Instagram Ask';
import ConnectInstagramScreen from './Instagram Permission';
import {
  addGetRefToken,
  getInstaDetails,
  Youtube,
} from '../../utils/helpers/YoutubeInstagramConnect';
import onFacebookLogin from '../../utils/helpers/FacebookLogin';
import constants from '../../utils/helpers/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAccountVerificationRequest,
  getInstagramUserDetailRequest,
  getYoutubeUserDetailRequest,
} from '../../redux/reducers/ProfileReducer';
import connectionrequest from '../../utils/helpers/NetInfo';
var status = '';
function SocialAccounts(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const [imageInsta, setInstaimage] = useState('');
  const [showIns, setShowIns] = useState(false);
  const [youtubeDetails, setYoutubeDetails] = useState([]);
  useEffect(() => {
    youtubeinstaDetail();
    GoogleSignin.configure({
      scopes: [
        'https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/yt-analytics.readonly',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '1080046167832-4v11nceg06604c7r4finghua7ptqi04k.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId:
        '1080046167832-4v11nceg06604c7r4finghua7ptqi04k.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    });
  }, []);

  function youtubeinstaDetail() {
    try {
      var obj = 'creatorID=' + AuthReducer?.creatorID;
      connectionrequest()
        .then(res => {
          dispatch(getYoutubeUserDetailRequest(obj));
          dispatch(getInstagramUserDetailRequest(obj));
          dispatch(getAccountVerificationRequest(obj));
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {}
  }
  useEffect(() => {
    getInstaDetails(
      ProfileReducer?.instagramuserResponse?.result?.igid,
      ProfileReducer?.instagramuserResponse?.result?.token,
    ).then(res => {
      setInstaimage(res);
      console.log('image 226', imageInsta);
    });
  }, [ProfileReducer?.instagramuserResponse]);
  
  async function onFacebook() {
    try {
      onFacebookLogin()
        .then(res => {
          console.log(res);
          console.log(constants.FBTOKEN);
          addGetRefToken(
            AuthReducer?.creatorID,
            res,
            constants.FBTOKEN,
            dispatch,
          );
        })
        .catch(err => {
          console.log(err);
        });
    } catch (e) {}
  }
  function getProfile() {
    try {
      connectionrequest()
        .then(() => {
          var obj = '?creatorID=' + AuthReducer?.creatorID;
          dispatch(getProfileRequest(obj));
        })
        .catch(e => {
          console.log(e);
        });
    } catch (e) {}
  }
  async function saveLocal() {
    props.navigation.navigate('Home');
  }
  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/getYoutubeUserDetailRequest':
        status = ProfileReducer.status;
        break;
      case 'Profile/getYoutubeUserDetailSuccess':
        status = ProfileReducer.status;
        console.log('hgfgcvcb youtube', ProfileReducer?.youtubeuserResponse);
        setYoutubeDetails([ProfileReducer?.youtubeuserResponse?.result ?? '']);
        break;
      case 'Profile/getYoutubeUserDetailFailure':
        status = ProfileReducer.status;
        break;

      case 'Profile/getInstagramDetailRequest':
        status = ProfileReducer.status;
        break;
      case 'Profile/getInstagramDetailSuccess':
        status = ProfileReducer.status;
        console.log('hgfgcvcb youtube', ProfileReducer?.youtubeuserResponse);
        youtubeinstaDetail();
        break;
      case 'Profile/getYoutubeDetailFailure':
        status = ProfileReducer.status;
        break;

      case 'Profile/getInstagramUserDetailRequest':
        status = ProfileReducer.status;
        break;
      case 'Profile/getInstagramUserDetailSuccess':
        status = ProfileReducer.status;
        console.log('hgfgcvcb');
        break;
      case 'Profile/getInstagramUserDetailFailure':
        status = ProfileReducer.status;
        break;

      case 'Profile/getInstagramRemoveRequest':
        status = ProfileReducer.status;
        break;
      case 'Profile/getInstagramRemoveSuccess':
        status = ProfileReducer.status;
        console.log('hgfgcvcb');
        youtubeinstaDetail();
        break;
      case 'Profile/getInstagramRemoveFailure':
        status = ProfileReducer.status;
        break;
    }
  }

  return (
    <>
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
              width: '100%',
            }}></LinearGradient>
        </View>
        <View style={style.containerBody}>
          <Text style={style.text}>Add Social Accounts</Text>
          <Text style={style.text2}>
            To be visible to brands, connect your social accounts.
          </Text>
          <Text style={style.text3}>Connect Social Media</Text>
          <View
            style={{
              justifyContent: 'space-between',
              marginTop: normalize(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={style.connect}>
              {ProfileReducer?.getVerificationResponse?.result?.instaConnect ? (
                <>
                  <ImageBackground
                    source={{
                      uri: imageInsta,
                    }}
                    style={{
                      height: normalize(33),
                      width: normalize(33),
                    }}
                    imageStyle={{borderRadius: normalize(29)}}
                    resizeMode="cover"
                  />
                  <View>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(12),
                        marginLeft: normalize(3),
                        fontFamily: Fonts.Inter_Bold,
                      }}>
                      {ProfileReducer?.instagramuserResponse?.result?.username}
                    </Text>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                        marginLeft: normalize(3),
                      }}>
                      {}
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={Icons.insta}
                      style={{
                        height: normalize(19),
                        width: normalize(19),
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(12),
                        marginLeft: normalize(13),
                        fontFamily: Fonts.Inter_Bold,
                      }}>
                      Instagram
                    </Text>
                  </View>
                </>
              )}
              <TouchableOpacity
                style={{
                  borderRadius: normalize(17),
                  backgroundColor: ProfileReducer?.getVerificationResponse
                    ?.result?.instaConnect
                    ? '#252525'
                    : Colors.white,
                  paddingHorizontal: normalize(12),
                  paddingVertical: normalize(7),
                  justifyContent: 'center',
                  end: normalize(6),
                }}
                activeOpacity={0.8}
                onPress={() => {
                  // setModalVisible(!modalVisible);
                  ProfileReducer?.getVerificationResponse?.result?.instaConnect
                    ? instagSignout()
                    : onFacebook();
                }}>
                <Text
                  style={{
                    color: ProfileReducer?.getVerificationResponse?.result
                      ?.instaConnect
                      ? '#FFFF'
                      : Colors.black,
                    fontSize: normalize(10),
                    fontFamily: Fonts.Inter_SemiBold,
                  }}>
                  {ProfileReducer?.getVerificationResponse?.result?.instaConnect
                    ? 'Disconnect'
                    : 'Connect'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={style.connect}>
              {ProfileReducer?.youtubeuserResponse?.result?.channel == '' ? (
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={Icons.youtube}
                    style={{
                      height: normalize(19),
                      width: normalize(19),
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(12),
                      marginLeft: normalize(13),
                      fontFamily: Fonts.Inter_Bold,
                    }}>
                    Youtube
                  </Text>
                </View>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <ImageBackground
                    source={{
                      uri: ProfileReducer?.youtubeuserResponse?.result
                        ?.imageURl,
                    }}
                    style={{
                      height: normalize(33),
                      width: normalize(33),
                    }}
                    imageStyle={{borderRadius: normalize(29)}}
                    resizeMode="contain"
                  />
                  <View>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(12),
                        marginLeft: normalize(3),
                        fontFamily: Fonts.Inter_Bold,
                      }}>
                      {ProfileReducer?.youtubeuserResponse?.result?.channel}
                    </Text>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                        marginLeft: normalize(3),
                      }}>
                      {ProfileReducer?.youtubeuserResponse?.result?.channel}
                    </Text>
                  </View>
                </View>
              )}
              <TouchableOpacity
                style={{
                  borderRadius: normalize(17),
                  backgroundColor: ProfileReducer?.getVerificationResponse
                    ?.result?.youtubeConnect
                    ? '#252525'
                    : Colors.white,
                  paddingHorizontal: normalize(12),
                  paddingVertical: normalize(7),
                }}
                onPress={() => {
                  Youtube(AuthReducer?.creatorID, dispatch);
                }}>
                <Text
                  style={{
                    color: ProfileReducer?.getVerificationResponse?.result
                      ?.youtubeConnect
                      ? Colors.white
                      : Colors.black,
                    fontSize: normalize(10),
                    fontFamily: Fonts.Inter_Bold,
                  }}>
                  {youtubeDetails[0]?.['id'] == 0 ? 'Connect' : 'Disconnect'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.btnPos}>
            <ButtonLinear
              width={'81%'}
              height={normalize(40)}
              alignSelf={'center'}
              backgroundColor={Colors.btnColor}
              title={'Next'}
              textColor={Colors.black}
              titlesingle={true}
              borderRadius={normalize(25)}
              marginHorizontal={normalize(5)}
              btnBottom={10}
              onPress={() => {
                saveLocal();
              }}
            />
          </View>
        </View>
        {/* <ConnectInstagramAskScreen
          onBack={() => setShowIns(false)}
          isShow={showIns}
          onConnect={() => {}}
        />
        <ConnectInstagramScreen
          onBack={() => setShowInstagram(false)}
          onConnect={() => {
            setShowIns(true);
          }}
          isShow={showInstagram}
        /> */}
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
    alignItems: 'center',
  },
  btnPos: {
    position: 'absolute',
    bottom: 0,
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
    opacity: 0.9,
    alignSelf: 'flex-start',
  },
  text3: {
    color: Colors.white,
    fontSize: normalize(14),
    marginTop: normalize(22),
    alignSelf: 'flex-start',
  },
  connect: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width - 25,
    height: normalize(47),
    borderColor: Colors.borderColor,
    borderWidth: normalize(1),
    borderRadius: normalize(7),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: normalize(7),
    paddingHorizontal: normalize(12),
  },
  connectBtn: {
    width: normalize(91),
    height: normalize(33),
    borderColor: Colors.grey,
    backgroundColor: Colors.white,
    borderRadius: normalize(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text4: {
    color: Colors.white,
    fontSize: normalize(14),
    opacity: 0.7,
    marginStart: normalize(6),
    alignSelf: 'flex-start',
  },
  text5: {
    color: Colors.black,
    fontSize: normalize(14),
  },
});
export default SocialAccounts;
