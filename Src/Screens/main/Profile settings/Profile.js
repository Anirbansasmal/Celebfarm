import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import {Colors, Fonts} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import Icons from '../../../themes/icons';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import HeaderCommon from '../../../Components/HeaderCommon';
import MyStatusBar from '../../../utils/MyStatusBar';
import connectionrequest from '../../../utils/helpers/NetInfo';
import Toast from '../../../utils/helpers/Toast';
import {
  getEditImageRequest,
  getUserRequest,
} from '../../../redux/reducers/UserReducer';
import Loader from '../../../utils/helpers/Loader';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  getAadhaarRequest,
  getAccountVerificationRequest,
  getInstagramDetailRequest,
  getInstagramRemoveRequest,
  getInstagramUserDetailRequest,
  getYoutubeDetailRequest,
  getYoutubeRemoveRequest,
  getYoutubeUserDetailRequest,
} from '../../../redux/reducers/ProfileReducer';
import HeaderData from '../../../Components/HeaderData';
import {logoutRequest} from '../../../redux/reducers/AuthReducer';
import axios from 'axios';
import moment from 'moment';
import {
  addGetRefToken,
  getInstaDetails,
  Youtube,
} from '../../../utils/helpers/YoutubeInstagramConnect';
import onFacebookLogin from '../../../utils/helpers/FacebookLogin';
import constant from '../../../utils/helpers/constant';
import Fallback from '../../auth/Fallback';
var status = '',
  status1 = '';
function Profile(props) {
  const dispatch = useDispatch();
  const UserReducer = useSelector(state => state.UserReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProfileVisible, setModalProfileVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [isShowMod, setShowMod] = useState(false);
  const [imageInsta, setInstaimage] = useState('');

  const [youtubeDetails, setYoutubeDetails] = useState([]);
  const [instaDetails, setInstaDetails] = useState([]);
  const [image, setImage] = useState({});
  const [imageObj, setImageObj] = useState('');
  const [isSelectTyp, setSelectTyp] = useState('');

  useEffect(() => {
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

  useEffect(() => {
    getInstaDetails(
      ProfileReducer?.instagramuserResponse?.result?.igid,
      ProfileReducer?.instagramuserResponse?.result?.token,
    ).then(res => {
      setInstaimage(res);
      console.log('image 226', imageInsta);
    });
  }, [ProfileReducer?.instagramuserResponse]);

  function updateProfile() {
    var id = AuthReducer.creatorID;
    try {
      if (imageObj == '') {
        Toast('Please select your profile picture');
      } else {
        let obj = {
          CreatorID: id,
          Image64String: imageObj,
          ImageName: image.name,
          ContentType: '.' + image.type.replace('image/', ''),
        };
        connectionrequest()
          .then(() => {
            console.log('login', obj);
            dispatch(getEditImageRequest(obj));
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

  async function youtubeChanel(userInfo, token) {
    try {
      var obj =
        'access_token=' +
        token +
        '&' +
        'part=' +
        'snippet,statistics' +
        '&' +
        'mine=' +
        'true';
      console.log(obj);
      const header = {
        Accept: 'application/json',
        'content-type': 'application/json',
      };
      axios
        .get(`https://www.googleapis.com/youtube/v3/channels?${obj}`, {
          headers: header,
        })
        .then(res => {
          console.log(res.data);
          youtubReport(res.data, userInfo, token);
        });
    } catch (error) {}
  }

  async function youtubReport(channel, userInfo, token) {
    try {
      var obj =
        'access_token=' +
        token +
        '&part' +
        'snippet,statistics' +
        '&mine=' +
        'true' +
        '&ids=' +
        'channel==MINE' +
        '&metrics=' +
        'averageViewPercentage,estimatedMinutesWatched,annotationClickThroughRate' +
        '&startDate=' +
        '2000-01-01' +
        '&endDate=' +
        moment().add(2, 'days').format('YYYY-MM-DD');
      console.log(obj);
      const header = {
        Accept: 'application/json',
        'content-type': 'application/json',
      };
      axios
        .get(`https://youtubeanalytics.googleapis.com/v2/reports?${obj}`, {
          header: header,
        })
        .then(res => {
          console.log(res.data);

          addYoutubeDetails(channel, userInfo, token, res.data);
        });
    } catch (error) {}
  }

  function addYoutubeDetails(channel, userInfo, token, report) {
    try {
      console.log('---------------->>>>>>>>>>>>>>', channel?.items);
      console.log('---------------->>>>>>>>>>>>>>', userInfo);
      console.log('---------------->>>>>>>>>>>>>>', report);

      var obj = {
        ID: 0,
        Tokens: token,
        Channel: channel?.items[0]['snippet']['customUrl'],
        Subscriber: channel?.items[0]['statistics']['subscriberCount'],
        Views: channel?.items[0]['statistics']['viewCount'],
        AvgView: channel?.items[0]['statistics']['subscriberCount'],
        AvgViewGain: report['rows'][0][0],
        AvgWatchTime: report['rows'][0][1],
        WatchTimeGain: report['rows'][0][1],
        ImpressionCTR: report['rows'][0][2],
        ImageURl: channel?.items[0]['snippet']['thumbnails']['default']['url'],
        CreatorID: AuthReducer?.creatorID,
      };
      connectionrequest()
        .then(res => {
          dispatch(getYoutubeDetailRequest(obj));
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {}
  }
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
  async function onFacebook() {
    try {
      onFacebookLogin()
        .then(res => {
          console.log(res);
          console.log(constant.FBTOKEN);
          addGetRefToken(
            AuthReducer?.creatorID,
            res,
            constant.FBTOKEN,
            dispatch,
          );
        })
        .catch(err => {
          console.log(err);
        });
    } catch (e) {}
  }

  async function youtubeSignout() {
    try {
      var obj = 'id=' + ProfileReducer?.youtubeuserResponse?.result?.id;

      dispatch(getYoutubeRemoveRequest(obj));
    } catch (error) {}
  }

  async function instagSignout() {
    try {
      var obj =
        'creatorID=' + ProfileReducer?.instagramuserResponse?.result?.creatorID;

      dispatch(getInstagramRemoveRequest(obj));
    } catch (error) {}
  }

  function getRandomTextNumber(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  function onPressGallery() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        let obj = {
          name: getRandomTextNumber(9),
          type: response.mime,
        };
        setImage(obj);
        setImageObj(response.data);
      }
    });
  }
  useEffect(() => {
    try {
      var obj = `CreatorID=${AuthReducer?.creatorID}`;
      connectionrequest()
        .then(() => {
          dispatch(getUserRequest(obj));
          dispatch(getAadhaarRequest(obj));
          dispatch(getAccountVerificationRequest(obj));
          youtubeinstaDetail();
        })
        .then(() => {});
    } catch (e) {}
  }, []);
  function logout() {
    try {
      dispatch(logoutRequest());
    } catch (e) {
      console.log(e);
    }
  }
  if (status1 == '' || ProfileReducer.status != status1) {
    switch (ProfileReducer.status) {
      case 'Profile/getYoutubeUserDetailRequest':
        status1 = ProfileReducer.status;
        break;
      case 'Profile/getYoutubeUserDetailSuccess':
        status1 = ProfileReducer.status;
        console.log('hgfgcvcb youtube', ProfileReducer?.youtubeuserResponse);
        setYoutubeDetails([ProfileReducer?.youtubeuserResponse?.result ?? '']);
        break;
      case 'Profile/getYoutubeUserDetailFailure':
        status1 = ProfileReducer.status;
        break;

      case 'Profile/getInstagramDetailRequest':
        status1 = ProfileReducer.status;
        break;
      case 'Profile/getInstagramDetailSuccess':
        status1 = ProfileReducer.status;
        console.log('hgfgcvcb youtube', ProfileReducer?.youtubeuserResponse);
        youtubeinstaDetail();
        break;
      case 'Profile/getYoutubeDetailFailure':
        status1 = ProfileReducer.status;
        break;

      case 'Profile/getInstagramUserDetailRequest':
        status1 = ProfileReducer.status;
        break;
      case 'Profile/getInstagramUserDetailSuccess':
        status1 = ProfileReducer.status;
        console.log('hgfgcvcb');
        setInstaDetails([...(ProfileReducer?.instauserResponse?.result ?? '')]);
        break;
      case 'Profile/getInstagramUserDetailFailure':
        status1 = ProfileReducer.status;
        break;
        
      case 'Profile/getYoutubeRemoveRequest':
        status1 = ProfileReducer.status;
        break;
      case 'Profile/getYoutubeRemoveSuccess':
        status1 = ProfileReducer.status;
        console.log('hgfgcvcb');
        youtubeinstaDetail();
        break;
      case 'Profile/getYoutubeRemoveFailure':
        status1 = ProfileReducer.status;
        break;
        
      case 'Profile/getInstagramRemoveRequest':
        status1 = ProfileReducer.status;
        break;
      case 'Profile/getInstagramRemoveSuccess':
        status1 = ProfileReducer.status;
        console.log('hgfgcvcb');
        youtubeinstaDetail();
        break;
      case 'Profile/getInstagramRemoveFailure':
        status1 = ProfileReducer.status;
        break;
    }
  }

  if (status == '' || UserReducer.status != status) {
    switch (UserReducer.status) {
      case 'userProfile/getEditImageRequest':
        status = UserReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'userProfile/getEditImageSuccess':
        status = UserReducer.status;
        console.log(
          'UserReducer?.nichResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          UserReducer.userEditImageResponse,
        );
        Toast(UserReducer?.userEditImageResponse?.toString());
        break;
      case 'userProfile/getEditImageFailure':
        status = UserReducer.status;
        break;
      case 'userProfile/getUserRequest':
        status = UserReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'userProfile/getUserSuccess':
        status = UserReducer.status;
        console.log(
          'UserReducer?.nichResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          UserReducer.launageResponse,
        );
        break;
      case 'userProfile/getUserFailure':
        status = UserReducer.status;
        break;
    }
  }

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
        <MyStatusBar
          barStyle={'light-content'}
          backgroundColor={Colors.black}
        />
        <HeaderData
          backScreen={() => setShowMod(!isShowMod)}
          title={'Profile'}
          notifiPress={() => props?.navigation.navigate('Notifications')}
          profilePress={() => props?.navigation.navigate('Chat')}
        />
        {/* <SafeAreaView style={style.container}> */}
        {'userProfile/getEditImageRequest' == UserReducer?.status ||
        'userProfile/getUserRequest' == UserReducer?.status ? (
          <Fallback />
        ) : (
          <View style={style.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <>
                <View
                  style={{
                    marginTop: normalize(12),
                    borderRadius: normalize(7),
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: normalize(10),
                      marginTop: normalize(10),
                      marginTop: normalize(10),
                    }}>
                    {imageObj == '' ? (
                      <ImageBackground
                        source={
                          UserReducer?.userResponse?.imageUrl
                            ? {uri: UserReducer?.userResponse?.imageUrl}
                            : Icons.profileEdit
                        }
                        style={{
                          height: normalize(90),
                          width: normalize(90),
                        }}>
                        <TouchableOpacity
                          onPress={() => setModalProfileVisible(true)}>
                          <Image
                            source={Icons.add}
                            style={{
                              height: normalize(25),
                              width: normalize(24),
                              position: 'absolute',
                              end: normalize(-10),
                              top: normalize(-10),
                            }}
                          />
                        </TouchableOpacity>
                      </ImageBackground>
                    ) : (
                      <ImageBackground
                        source={
                          imageObj
                            ? {uri: 'data:image/png;base64,' + imageObj}
                            : Icons.profileEdit
                        }
                        style={{
                          height: normalize(90),
                          width: normalize(90),
                        }}>
                        <TouchableOpacity
                          onPress={() => setModalProfileVisible(true)}>
                          <Image
                            source={Icons.add}
                            style={{
                              height: normalize(25),
                              width: normalize(24),
                              position: 'absolute',
                              end: normalize(-10),
                              top: normalize(-10),
                            }}
                          />
                        </TouchableOpacity>
                      </ImageBackground>
                    )}
                    <View
                      style={{
                        padding: normalize(5),
                        paddingHorizontal: normalize(12),
                        backgroundColor: '#06B8631A',
                        marginTop: normalize(10),
                        borderRadius: normalize(19),
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: normalize(5),
                      }}>
                      <Text
                        style={{
                          color: ProfileReducer?.getVerificationResponse?.result
                            ?.aadharVerification
                            ? Colors.greenDark
                            : Colors.yellow,
                        }}>
                        {ProfileReducer?.getVerificationResponse?.result
                          ?.aadharVerification
                          ? 'Verified'
                          : 'Not Verified'}
                      </Text>
                      <Image
                        source={
                          ProfileReducer?.getVerificationResponse?.result
                            ?.aadharVerification
                            ? Icons.verifytick
                            : Icons.review
                        }
                        style={{
                          width: normalize(14),
                          height: normalize(14),
                          marginStart: normalize(6),
                        }}
                        resizeMode="contain"
                      />
                    </View>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(20),
                        fontFamily: Fonts.Inter_SemiBold,
                      }}>
                      {UserReducer?.userResponse?.creatorName}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginBottom: normalize(7),
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flex: 1,
                    }}>
                    <LinearGradient
                      colors={['#B7F9CF', '#EAF7A7']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={{
                        ...style.linner,
                        flexDirection: 'row',
                        paddingHorizontal: normalize(12),
                      }}>
                      <View>
                        <Text style={style.textJob}>Job Completed</Text>
                        <View style={style.jobRow}>
                          <Image
                            source={Icons.documentupload}
                            style={style.jobImg}
                          />
                          <Text style={style.textJob1}>{0}</Text>
                        </View>
                      </View>
                    </LinearGradient>
                    <LinearGradient
                      colors={['#B7F9CF', '#EAF7A7']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={style.linner}>
                      <Text style={style.textJob}>Earnings</Text>
                      <View style={style.jobRow}>
                        <Image
                          source={Icons.documentupload}
                          style={style.jobImg}
                        />
                        <Text style={style.textJob1}>₹{0}</Text>
                      </View>
                    </LinearGradient>
                  </View>

                  {/* <LinearGradient
                    colors={['#B7F9CF', '#EAF7A7']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={{
                      backgroundColor: Colors.btnColor,
                      paddingHorizontal: normalize(6),
                      paddingVertical: normalize(9),
                      borderRadius: normalize(4),
                      marginTop: normalize(7),
                    }}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: normalize(12),
                        marginLeft: normalize(3),
                        fontFamily: Fonts.Inter_Regular,
                      }}>
                      Wallet Balance
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        marginTop: normalize(6),
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: Colors.black,
                          fontSize: normalize(16),
                          marginLeft: normalize(3),
                          fontFamily: Fonts.Inter_Bold,
                        }}>
                        ₹{0}
                      </Text>
                      <Image
                        source={Icons.line}
                        style={{
                          height: normalize(33),
                          width: normalize(81),
                        }}
                        resizeMode="contain"
                      />
                      <TouchableOpacity
                        style={{
                          borderRadius: normalize(17),
                          // height: normalize(22),
                          backgroundColor: Colors.black,
                          paddingHorizontal: normalize(10),
                          paddingVertical: normalize(3),
                          // marginEnd: normalize(9),
                        }}
                        onPress={() => props.navigation.navigate('Withdraw')}>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: normalize(12),
                            fontFamily: Fonts.Inter_SemiBold,
                          }}>
                          Withdraw
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </LinearGradient> */}

                  <View>
                    <TouchableOpacity
                      style={style.profile}
                      onPress={() => props.navigation.navigate('EditProfile')}>
                      <Image
                        source={Icons.user}
                        style={{height: normalize(19), width: normalize(19)}}
                        resizeMode="contain"
                      />
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(12),
                          marginLeft: normalize(3),
                          fontFamily: Fonts.Inter_Bold,
                        }}>
                        Edit your profile
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      style={[
                        {...style.profile, justifyContent: 'space-between'},
                      ]}
                      onPress={() =>
                        props.navigation.navigate('IdVerification')
                      }>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          source={Icons.user}
                          style={{height: normalize(19), width: normalize(19)}}
                          resizeMode="contain"
                        />
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: normalize(12),
                            marginLeft: normalize(3),
                            fontFamily: Fonts.Inter_Bold,
                          }}>
                          Id Verification
                        </Text>
                      </View>

                      <Image
                        source={
                          ProfileReducer?.getVerificationResponse?.result
                            ?.aadharVerification == false
                            ? Icons.review
                            : Icons.tick
                        }
                        style={{
                          height: normalize(25),
                          width: normalize(24),
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      borderWidth: normalize(1),
                      borderColor: '#2A2C27',
                      padding: normalize(6),
                      marginTop: normalize(18),
                      justifyContent: 'space-between',
                      borderRadius: normalize(6),
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(16),
                        fontFamily: Fonts.Inter_Bold,
                      }}>
                      Social Platform
                    </Text>

                    <View
                      style={{
                        borderWidth: normalize(1),
                        borderColor: '#2A2C27',
                        paddingVertical: normalize(12),
                        paddingHorizontal: normalize(12),
                        marginTop: normalize(18),
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      {ProfileReducer?.getVerificationResponse?.result
                        ?.instaConnect ? (
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
                              {
                                ProfileReducer?.instagramuserResponse?.result
                                  ?.username
                              }
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
                      )}
                      <TouchableOpacity
                        style={{
                          borderRadius: normalize(17),
                          backgroundColor: ProfileReducer
                            ?.getVerificationResponse?.result?.instaConnect
                            ? '#252525'
                            : Colors.white,
                          paddingHorizontal: normalize(12),
                          paddingVertical: normalize(7),
                          justifyContent: 'center',
                          position: 'absolute',
                          end: normalize(6),
                        }}
                        activeOpacity={0.8}
                        onPress={() => {
                          // setModalVisible(!modalVisible);
                          ProfileReducer?.getVerificationResponse?.result
                            ?.instaConnect
                            ? instagSignout()
                            : onFacebook();
                        }}>
                        <Text
                          style={{
                            color: ProfileReducer?.getVerificationResponse
                              ?.result?.instaConnect
                              ? '#FFFF'
                              : Colors.black,
                            fontSize: normalize(10),
                            fontFamily: Fonts.Inter_SemiBold,
                          }}>
                          {ProfileReducer?.getVerificationResponse?.result
                            ?.instaConnect
                            ? 'Disconnect'
                            : 'Connect'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        borderWidth: normalize(1),
                        borderColor: '#2A2C27',
                        padding: normalize(7),
                        marginTop: normalize(18),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      {ProfileReducer?.youtubeuserResponse?.result?.channel ==
                      '' ? (
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
                              {
                                ProfileReducer?.youtubeuserResponse?.result
                                  ?.channel
                              }
                            </Text>
                            <Text
                              style={{
                                color: Colors.white,
                                fontSize: normalize(10),
                                marginLeft: normalize(3),
                              }}>
                              {
                                ProfileReducer?.youtubeuserResponse?.result
                                  ?.channel
                              }
                            </Text>
                          </View>
                        </View>
                      )}
                      <TouchableOpacity
                        style={{
                          borderRadius: normalize(17),
                          backgroundColor: ProfileReducer
                            ?.getVerificationResponse?.result?.youtubeConnect
                            ? '#252525'
                            : Colors.white,
                          paddingHorizontal: normalize(12),
                          paddingVertical: normalize(7),
                        }}
                        onPress={() => {
                          ProfileReducer?.getVerificationResponse?.result
                            ?.youtubeConnect == false
                            ? Youtube(AuthReducer?.creatorID, dispatch)
                            : setModalVisible(!modalVisible);
                        }}>
                        <Text
                          style={{
                            color: ProfileReducer?.getVerificationResponse
                              ?.result?.youtubeConnect
                              ? Colors.white
                              : Colors.black,
                            fontSize: normalize(10),
                            fontFamily: Fonts.Inter_Bold,
                          }}>
                          {youtubeDetails[0]?.['id'] == 0
                            ? 'Connect'
                            : 'Disconnect'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={style.profile}
                    onPress={() => props.navigation.navigate('Payment')}>
                    <Text style={style.protext}>Payment</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{...style.profile, marginBottom: normalize(75)}}
                    onPress={() => props.navigation.navigate('Address')}>
                    <Text style={style.protext}>Address</Text>
                  </TouchableOpacity>
                </View>
              </>
            </ScrollView>
          </View>
        )}
        <Modal
          animationType="slide"
          // transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          style={{width: '100%', alignSelf: 'center', margin: 0}}
          animationInTiming={800}
          animationOutTiming={1000}
          backdropColor={'#000000'}>
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <>
                <Text style={style.modalTitle}>Disconnect</Text>
                <View
                  style={{
                    height: normalize(1),
                    backgroundColor: Colors.bgcolor,
                    width: '100%',
                    marginBottom: normalize(12),
                  }}
                />
                <Text style={style.modalText}>Remove this social account?</Text>
              </>
              <View style={{marginTop: normalize(148)}}>
                <View style={style.warningContainer}>
                  <Text style={style.warningText}>⚠️ </Text>
                  <Text
                    style={{
                      ...style.warningText,
                      color: Colors.white,
                      fontSize: normalize(10),
                    }}>
                    Only select the content corresponding to the{'\n'}
                    deliverable.
                  </Text>
                </View>
                <View style={style.buttonContainer}>
                  <TouchableOpacity
                    style={style.closeButton}
                    onPress={() => setModalVisible(false)}>
                    <Text style={style.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={style.removeButton}
                    onPress={() => {
                      setTimeout(() => {
                        youtubeSignout();
                        console.log('fsbfnmbsdmfns');
                      }, 1000);
                      setModalVisible(false);
                    }}>
                    <Text style={style.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          // transparent={true}
          visible={modalProfileVisible}
          onRequestClose={() => setModalProfileVisible(!modalProfileVisible)}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          style={{width: '100%', alignSelf: 'center', margin: 0}}
          animationInTiming={800}
          animationOutTiming={1000}
          backdropColor={'#000000'}>
          <View style={style.centeredViewProfile}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                marginTop: normalize(9),
                marginEnd: normalize(16),
              }}
              onPress={() => setModalProfileVisible(false)}>
              <Image
                source={Icons.closeProfileEdit}
                style={{height: normalize(25), width: normalize(24)}}
              />
            </TouchableOpacity>
            <ImageBackground
              source={
                imageObj
                  ? {uri: 'data:image/png;base64,' + imageObj}
                  : UserReducer?.userResponse?.imageUrl == null
                  ? Icons.profileEdit
                  : {uri: UserReducer?.userResponse?.imageUrl}
              }
              style={{
                height: normalize(180),
                width: normalize(180),
                alignSelf: 'center',
              }}
              imageStyle={{
                borderRadius: normalize(12),
              }}
            />
            <View
              style={{
                height: normalize(120),
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={style.closeButtonPro}
                onPress={() => onPressGallery()}>
                <Text style={{...style.closeButtonText, color: Colors.black}}>
                  Upload New
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{...style.closeButtonPro, backgroundColor: Colors.black}}
                onPress={() => {
                  setModalProfileVisible(false);
                  updateProfile();
                }}>
                <Text style={{...style.removeButtonText, color: Colors.white}}>
                  Save Photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={isShowMod}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          style={{width: '100%', alignSelf: 'center', margin: 0}}
          animationInTiming={800}
          animationOutTiming={1000}
          backdropColor={'#000000'}
          onBackdropPress={() => {
            setShowMod(false), setSelectTyp('');
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#ddd',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#181818',
              borderTopLeftRadius: normalize(17),
              borderTopRightRadius: normalize(17),
              maxHeight: normalize(250),
              paddingLeft: normalize(20),
              paddingBottom: normalize(15),
              paddingTop: normalize(19),
              height: normalize(270),
            }}>
            <LinearGradient
              colors={
                isSelectTyp == 'Account'
                  ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                  : ['#0000', '#0000', '#0000']
              }
              style={[
                {
                  borderRadius: normalize(3),
                },
              ]}>
              <TouchableOpacity
                style={[
                  {
                    ...style.modelView,
                    marginTop: normalize(0),
                    // backgroundColor: isSelect == 'Account' ? '#C4FD65' : '#0000',
                  },
                ]}
                onPress={() => {
                  props.navigation.navigate('Account'), setShowMod(false);
                  // setocuc;
                  setSelectTyp('Account');
                }}>
                <Image
                  source={Icons.useracc}
                  style={[
                    {
                      ...style.imagem,
                      tintColor:
                        isSelectTyp != 'Account' ? Colors.white : Colors.black,
                    },
                  ]}
                />
                <Text
                  style={{
                    fontSize: normalize(16),
                    fontFamily: Fonts.Inter_Medium,
                    color: isSelectTyp != 'Account' ? Colors.white : '#434540',
                  }}>
                  Account
                </Text>
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              colors={
                isSelectTyp == 'PushNotification'
                  ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                  : ['#0000', '#0000', '#0000']
              }
              style={{
                borderRadius: normalize(3),
              }}>
              <TouchableOpacity
                style={[
                  {
                    ...style.modelView,
                    marginTop: normalize(0),
                  },
                ]}
                onPress={() => {
                  props.navigation.navigate('PushNotifications'),
                    setShowMod(false);
                  setSelectTyp('PushNotification');
                }}>
                <Image
                  source={Icons.notificationacc}
                  style={[
                    {
                      ...style.imagem,
                      tintColor:
                        isSelectTyp != 'PushNotification'
                          ? Colors.white
                          : Colors.black,
                    },
                  ]}
                />
                <Text
                  style={{
                    fontSize: normalize(16),
                    fontFamily: Fonts.Inter_Medium,
                    color:
                      isSelectTyp != 'PushNotification'
                        ? Colors.white
                        : '#434540',
                  }}>
                  Push Notification
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            {/* <LinearGradient
            colors={
              isSelect == 'Privacy'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={{
              borderRadius: normalize(3),
            }}>
            <TouchableOpacity
              style={[
                {
                  ...style.modelView,
                  marginTop: 0,
                },
              ]}
              onPress={() => {
                props.navigation.navigate('PrivacyPolicy'), setShow(false);
                setSelect('Privacy');
              }}>
              <Image
                source={Icons.documentuploadacc}
                style={[
                  {
                    ...style.imagem,
                    tintColor:
                      isSelect != 'Privacy' ? Colors.white : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color: isSelect != 'Privacy' ? Colors.white : '#434540',
                }}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </LinearGradient> */}
            <LinearGradient
              colors={
                isSelectTyp == 'Terms'
                  ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                  : ['#0000', '#0000', '#0000']
              }
              style={{
                borderRadius: normalize(3),
              }}>
              <TouchableOpacity
                style={[
                  {
                    ...style.modelView,
                    marginTop: normalize(0),
                  },
                ]}
                onPress={() => {
                  props.navigation.navigate('Terms'), setShowMod(false);
                  setSelectTyp('Terms');
                }}>
                <Image
                  source={Icons.elementacc}
                  style={[
                    {
                      ...style.imagem,
                      tintColor:
                        isSelectTyp != 'Terms' ? Colors.white : Colors.black,
                    },
                  ]}
                />
                <Text
                  style={{
                    fontSize: normalize(16),
                    fontFamily: Fonts.Inter_Medium,
                    color: isSelectTyp != 'Terms' ? Colors.white : '#434540',
                  }}>
                  Terms of Use
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            {/* <LinearGradient
            colors={
              isSelect == 'FAQs'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={{
              borderRadius: normalize(3),
            }}>
            <TouchableOpacity
              style={[
                {
                  ...style.modelView,
                  marginTop: normalize(0),
                },
              ]}
              onPress={() => {
                // props.navigation.navigate('FAQ’s'),
                setShow(false);
                setSelect('FAQs');
              }}>
              <Image
                source={Icons.useracc}
                style={[
                  {
                    ...style.imagem,
                    tintColor: isSelect != 'FAQs' ? Colors.white : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color: isSelect != 'FAQs' ? Colors.white : '#434540',
                }}>
                FAQ’s
              </Text>
            </TouchableOpacity>
          </LinearGradient> */}
            <LinearGradient
              colors={
                isSelectTyp == 'Contact'
                  ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                  : ['#0000', '#0000', '#0000']
              }
              style={{
                borderRadius: normalize(3),
              }}>
              <TouchableOpacity
                style={[
                  {
                    ...style.modelView,
                    marginTop: normalize(0),
                  },
                ]}
                onPress={() => {
                  props.navigation.navigate('ContactUsSend'), setShowMod(false);
                  setSelectTyp('Contact');
                }}>
                <Image
                  source={Icons.useracc}
                  style={[
                    {
                      ...style.imagem,
                      tintColor:
                        isSelectTyp != 'Contact' ? Colors.white : Colors.black,
                    },
                  ]}
                />
                <Text
                  style={{
                    fontSize: normalize(16),
                    fontFamily: Fonts.Inter_Medium,
                    color: isSelectTyp != 'Contact' ? Colors.white : '#434540',
                  }}>
                  Contact Us
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={
                isSelectTyp == 'Logout'
                  ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                  : ['#0000', '#0000', '#0000']
              }
              style={{
                borderRadius: normalize(3),
                marginTop: normalize(29),
              }}>
              <TouchableOpacity
                style={[{...style.modelView, marginTop: normalize(0)}]}
                onPress={() => {
                  // props.navigation.navigate('Login');
                  logout();
                  setSelectTyp('Logout');
                }}>
                <Image
                  source={Icons.useracc}
                  style={[
                    {
                      ...style.imagem,
                      tintColor:
                        isSelectTyp != 'Logout' ? Colors.white : Colors.black,
                    },
                  ]}
                />
                <Text
                  style={{
                    fontSize: normalize(16),
                    fontFamily: Fonts.Inter_Medium,
                    color: isSelectTyp != 'Logout' ? Colors.white : '#434540',
                  }}>
                  Log out
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          {/* </ScrollView> */}
        </Modal>
        {/* <Modal
          animationType="slide"
          // transparent={true}
          visible={modalProfileVisible}
          onRequestClose={() => setModalProfileVisible(!modalProfileVisible)}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          style={{width: '100%', alignSelf: 'center', margin: 0}}
          animationInTiming={800}
          animationOutTiming={1000}
          backdropColor={'#000000'}>
          <View style={style.centeredViewProfile}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                marginTop: normalize(9),
                marginEnd: normalize(16),
              }}
              onPress={() => setModalProfileVisible(false)}>
              <Image
                source={Icons.closeProfileEdit}
                style={{height: normalize(25), width: normalize(24)}}
              />
            </TouchableOpacity>
            <ImageBackground
              source={
                imageObj
                  ? {uri: 'data:image/png;base64,' + imageObj}
                  : Icons.profileEdit
              }
              style={{
                height: normalize(180),
                width: normalize(180),
                alignSelf: 'center',
              }}
              imageStyle={{
                borderRadius: normalize(12),
              }}
            />
            <View
              style={{
                height: normalize(120),
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={style.closeButtonPro}
                onPress={() => onPressGallery()}>
                <Text style={{...style.closeButtonText, color: Colors.black}}>
                  Upload New
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{...style.closeButtonPro, backgroundColor: Colors.black}}
                onPress={() => {
                  setModalProfileVisible(false);
                  updateProfile();
                }}>
                <Text style={{...style.removeButtonText, color: Colors.white}}>
                  Save Photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */}
        {/* </SafeAreaView> */}
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
  textJob: {
    color: Colors.black,
    fontSize: normalize(12),
    marginLeft: normalize(3),
    fontFamily: Fonts.Inter_Regular,
  },
  jobRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(6),
  },
  jobImg: {
    height: normalize(16),
    width: normalize(16),
    tintColor: Colors.black,
  },
  textJob1: {
    color: Colors.black,
    fontSize: normalize(16),
    marginLeft: normalize(3),
    fontFamily: Fonts.Inter_Bold,
  },
  linner: {
    backgroundColor: Colors.btnColor,
    width: '47%', //47%
    paddingHorizontal: normalize(3),
    paddingVertical: normalize(9),
    borderRadius: normalize(4),
    height: normalize(60),
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
  protext: {
    color: Colors.white,
    fontSize: normalize(14),
    marginStart: normalize(6),
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Bold,
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
  profile: {
    borderWidth: normalize(1),
    borderColor: '#2A2C27',
    padding: normalize(10),
    marginTop: normalize(18),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: normalize(4),
  },
  centeredView: {
    flex: 1,
    backgroundColor: '#ddd',
    backgroundColor: '#181818',
    borderTopLeftRadius: normalize(17),
    borderTopRightRadius: normalize(17),
    maxHeight: normalize(370),
    paddingLeft: normalize(20),
    paddingBottom: normalize(15),
    paddingTop: normalize(19),
    paddingEnd: normalize(19),
    height: normalize(370),
  },
  centeredViewProfile: {
    backgroundColor: '#ffff',
    borderRadius: normalize(17),
    maxHeight: normalize(340),
    marginLeft: normalize(12),
    marginRight: normalize(12),
    // paddingLeft: normalize(20),
    // paddingBottom: normalize(15),
    paddingTop: normalize(9),
    // paddingEnd: normalize(9),
    height: normalize(340),
  },
  modalView: {
    borderRadius: 10,
    shadowColor: '#000',
    justifyContent: 'space-around',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: Fonts.Inter_Bold,
    marginBottom: 15,
    color: 'white',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    fontFamily: Fonts.Inter_Bold,
    color: 'white',
  },
  warningContainer: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningText: {
    color: 'yellow',
    fontSize: 14,
    // textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  closeButton: {
    borderRadius: 25,
    height: normalize(25),
    justifyContent: 'center',
    borderWidth: normalize(1),
    borderColor: Colors.white,
    marginRight: 10,
    flex: 1,
    alignItems: 'center',
  },
  closeButtonPro: {
    borderRadius: 10,
    height: normalize(29),
    width: normalize(160),
    justifyContent: 'center',
    borderWidth: normalize(1),
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    alignItems: 'center',
    marginTop: normalize(10),
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  removeButton: {
    borderRadius: 25,
    height: normalize(25),
    justifyContent: 'center',
    borderWidth: normalize(1),
    borderColor: Colors.red,
    marginRight: 10,
    flex: 1,
    alignItems: 'center',
  },
  removeButtonText: {
    color: Colors.red,
    fontSize: 16,
  },
  modelView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(9),
    paddingVertical: normalize(7),
    paddingHorizontal: normalize(7),
    marginEnd: normalize(18),
  },
  imagem: {
    height: normalize(16),
    width: normalize(16),
    tintColor: Colors.black,
    marginEnd: normalize(9),
  },
});

export default Profile;
