import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  SafeAreaView,
} from 'react-native';
import {Colors, Fonts} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import Images from '../../../themes/Images';
import Icons from '../../../themes/icons';
import Modal from 'react-native-modal';
import MyStatusBar from '../../../utils/MyStatusBar';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../../utils/helpers/NetInfo';
import Carousel from 'react-native-snap-carousel';
import Toast from '../../../utils/helpers/Toast';
import {
  getBarterRequest,
  getHomeCollaborationRequest,
} from '../../../redux/reducers/HomeUserReducer';
import moment from 'moment';
import {
  deviceTokenRequest,
  logoutRequest,
} from '../../../redux/reducers/AuthReducer';
import axios from 'axios';
import FacebookLogin from '../../../utils/helpers/FacebookLogin';
import {authorize} from 'react-native-app-auth';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import constents from '../../../utils/helpers/constant';
import ImageProfile from '../../../Components/ImageProfile';
import ConnectInstagramScreen from '../../auth/Instagram Permission';
import ConnectInstagramAskScreen from '../../auth/Instagram Ask';
import EmptyComponent from '../../../Components/EmptyComponent';
import BaterCommon from '../../../Components/BarterCommon';
import {getUserRequest} from '../../../redux/reducers/UserReducer';
import {WebView} from 'react-native-webview';
import {postApi} from '../Message/ChatService';
import {
  getAadhaarRequest,
  getAccountVerificationRequest,
  getInstagramUserDetailRequest,
  getYoutubeDetailRequest,
  getYoutubeUserDetailRequest,
} from '../../../redux/reducers/ProfileReducer';
import {getDeviceToken} from '../../../utils/helpers/FirebaseToken';
import Loader from '../../../utils/helpers/Loader';
import HeaderData from '../../../Components/HeaderData';
import {
  addGetRefToken,
  getInstaDetails,
  Youtube,
} from '../../../utils/helpers/YoutubeInstagramConnect';
import Facebook from '../../../Components/Facebook';
import {Settings} from 'react-native-fbsdk-next';
import Fallback from '../../auth/Fallback';
var status = '',
  status1 = '';

function Home(props) {
  const dispatch = useDispatch();
  const flatRef = React.useRef();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const HomeReducer = useSelector(state => state.HomeReducer);
  const UserReducer = useSelector(state => state.UserReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const [isShow, setShow] = useState(false);
  const [isShowInsta1, setShowInsta1] = useState(false);
  const [isShowAsk2, setShowAsk2] = useState(false);
  const [isShowSuccess3, setShowSuccess3] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
  const [isSelect, setSelect] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [isSelectSocial, setSelectSocial] = useState('1');
  const [youtubeDetails, setYoutubeDetails] = useState([]);
  const [instaDetails, setInstaDetails] = useState([]);
  const [index, setIndex] = useState(0);
  const [index1, setIndex1] = useState(0);
  const [authUrl, setAuthUrl] = useState(null);
  const isCarousel = React.useRef(null);
  const isCarousel1 = React.useRef(null);
  const [imageInsta, setInstaimage] = useState('');

  // const [, ] = useState([1,2]);
  const [dataCollaboration, setCollaboration] = useState([]);
  const insRef = useRef();
  let facebookLogin;
  const [dataBarter, setBarter] = useState([]);

  useEffect(() => {
    console.log('=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    var obj =
      'creatorID=' + AuthReducer?.creatorID + '&' + 'tabType=' + 'Active';
    var obj1 =
      'creatorID=' +
      AuthReducer?.creatorID +
      '&' +
      'tabType=' +
      'Explore' +
      '&' +
      'pageNo=' +
      1 +
      '&' +
      'pageSize=' +
      10;
    var obj3 = `CreatorID=${AuthReducer?.creatorID}`;
    try {
      connectionrequest()
        .then(() => {
          dispatch(getHomeCollaborationRequest(obj));
          dispatch(getAadhaarRequest(obj3));
          dispatch(getBarterRequest(obj1));
          dispatch(getAccountVerificationRequest(obj3));
          dispatch(getUserRequest(obj3));
          dispatch(getUserRequest(obj3));
          youtubeDetail();
          blogsData();
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    GoogleSignin.signOut();
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

  if (status == '' || HomeReducer.status != status) {
    switch (HomeReducer.status) {
      case 'homeCollab/getHomeCollaborationRequest':
        status = HomeReducer.status;
        break;

      case 'homeCollab/getHomeCollaborationSuccess':
        status = HomeReducer.status;
        console.log(
          'hgfgcvcb collaborationResponse',
          HomeReducer?.collaborationResponse,
        );
        setCollaboration([...(HomeReducer?.collaborationResponse ?? '')]);
        break;
      case 'homeCollab/getHomeCollaborationFailure':
        status = HomeReducer.status;
        break;
      case 'homeCollab/getBarterRequest':
        status = HomeReducer.status;
        break;

      case 'homeCollab/getBarterSuccess':
        status = HomeReducer.status;
        console.log('hgfgcvcb');
        setBarter([...(HomeReducer?.productResponse?.result ?? '')]);
        break;
      case 'homeCollab/getBarterFailure':
        status = HomeReducer.status;
        break;
    }
  }

  if (status1 == '' || ProfileReducer.status != status1) {
    switch (ProfileReducer.status) {
      case 'Profile/getYoutubeUserDetailRequest':
        status1 = ProfileReducer.status;
        break;

      case 'Profile/getYoutubeUserDetailSuccess':
        status1 = ProfileReducer.status;

        getDeviceToken().then(res => {
          var obj = {
            CreatorID: AuthReducer?.creatorID,
            FCMToken: res,
          };
          dispatch(deviceTokenRequest(obj));
        });
        console.log('hgfgcvcb youtube', ProfileReducer?.youtubeuserResponse);
        setYoutubeDetails([ProfileReducer?.youtubeuserResponse?.result ?? '']);
        setSelectSocial(ProfileReducer?.youtubeuserResponse?.result ? '0' : '1');
        break;
      case 'Profile/getYoutubeUserDetailFailure':
        status1 = ProfileReducer.status;
        break;

      case 'Profile/getInstagramUserDetailRequest':
        status1 = ProfileReducer.status;
        break;

      case 'Profile/getInstagramUserDetailSuccess':
        status1 = ProfileReducer.status;

        console.log('hgfgcvcb youtube', ProfileReducer?.youtubeuserResponse);
        setInstaDetails([ProfileReducer?.instagramuserResponse?.result ?? '']);
        setSelectSocial(
          ProfileReducer?.instagramuserResponse?.result ? '1' : '0',
        );

        break;
      case 'Profile/getInstagramUserDetailFailure':
        status1 = ProfileReducer.status;
        break;

      case 'Profile/getYoutubeDetailRequest':
        status1 = ProfileReducer.status;
        break;

      case 'Profile/getYoutubeDetailSuccess':
        status1 = ProfileReducer.status;
        youtubeDetail();
        break;

      case 'Profile/getYoutubeDetailFailure':
        status1 = ProfileReducer.status;
        break;

      case 'Profile/getInstagramDetailRequest':
        status1 = ProfileReducer.status;
        break;

      case 'Profile/getInstagramDetailSuccess':
        status1 = ProfileReducer.status;
        youtubeDetail();
        break;
      case 'Profile/getInstagramDetailFailure':
        status1 = ProfileReducer.status;
        break;
      case 'homeCollab/getBarterRequest':
        status1 = ProfileReducer.status;
        break;

      case 'homeCollab/getBarterSuccess':
        status1 = ProfileReducer.status;
        console.log('hgfgcvcb');
        // setBarter([...ProfileReducer?.productResponse?.result]);
        break;
      case 'homeCollab/getBarterFailure':
        status1 = ProfileReducer.status;
        break;
    }
  }

  async function blogsData() {
    await axios
      .get(
        'https://blog.celebfarm.com/wp-json/wp/v2/posts?per_page=5&orderby=date&order=desc',
      )
      .then(res => {
        console.log('blogs', res.data);
        setBlogs(res.data);
      });
  }

  const renderItem = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          style={{
            borderRadius: normalize(4),
            borderWidth: normalize(1),
            borderColor: Colors.borderColor,
            paddingHorizontal: normalize(9),
            marginTop: normalize(12),
            backgroundColor: Colors.bcolor,
            height: normalize(120),
            // marginBottom: index + 1 == dataActive.length ? normalize(48) : 0,
          }}
          onPress={() => {
            if (item?.type == 'ContentLab') {
              props.navigation.navigate('ActiveContent', {
                campaignID: item?.campaignID,
              }); //Deliverable Approved Content
            } else if (item?.type == 'Barter' || item?.type == 'Bater Offer') {
              console.log(item?.type);
              props.navigation.navigate('Active', {
                campaignID: item?.campaignID,
              }); //Deliverable Approved Content
            } else if (item?.type == 'Paid') {
              props.navigation.navigate('PaidInvite', {
                campaignID: item?.campaignID,
              }); //Deliverable Approved Content
            }
          }}
          activeOpacity={0.7}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: normalize(6),
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Image
                source={
                  item?.brandImageUrl == ''
                    ? Images.profile
                    : {uri: item?.brandImageUrl}
                }
                style={style.profileCollabr}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(10),
                  marginStart: normalize(3),
                  fontFamily: Fonts.Inter_Medium,
                }}>
                {item?.brandName}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  borderRadius: normalize(19),
                  backgroundColor:
                    item?.type == 'Barter'
                      ? Colors.collab1
                      : item?.type == 'Paid'
                      ? Colors.collab2
                      : item?.type == 'ContentLab'
                      ? Colors.collab3
                      : item?.type == 'barteroffer'
                      ? Colors.collab1
                      : item?.type == 'Paid+'
                      ? Colors.collab2
                      : null,
                  paddingHorizontal: normalize(7),
                  justifyContent: 'center',
                  height: normalize(19),
                  marginRight: normalize(6),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(10),
                  }}>
                  {item?.type == 'barteroffer'
                    ? 'Barter'
                    : item?.type == 'paid+gift'
                    ? 'Paid'
                    : item?.type}
                </Text>
              </TouchableOpacity>
              {item?.type !== 'ContentLab' && item?.type !== 'Paid' ? (
                <>
                  <View
                    style={{
                      backgroundColor: Colors.white,
                      height: normalize(3),
                      width: normalize(3),
                      borderRadius: normalize(3 / 2),
                      marginRight: normalize(6),
                    }}
                  />
                  <Image
                    source={
                      item?.platformType === 'Instagram'
                        ? Icons.insta
                        : Icons.youtube
                    }
                    style={style.profileCollabration}
                    resizeMode="contain"
                  />
                </>
              ) : null}
              <View
                style={{
                  backgroundColor: Colors.white,
                  height: normalize(3),
                  width: normalize(3),
                  borderRadius: normalize(3 / 2),
                  marginRight: normalize(6),
                }}
              />
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(10),
                }}>
                {moment(item?.campaignDate).format('DD MMM')}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: normalize(7),
              marginBottom: normalize(9),
            }}>
            {item?.type == 'Barter' && item?.discount == '' ? (
              <Image
                source={
                  item?.productImageUrl == ''
                    ? Images.dyning
                    : {uri: item?.productImageUrl}
                }
                style={{
                  height: normalize(70),
                  width: normalize(70),
                }}
                resizeMode="cover"
              />
            ) : null}

            {item?.discount != '' ? (
              <View>
                <ImageBackground
                  source={
                    item?.productImageUrl == ''
                      ? Images.dyning
                      : {uri: item?.brandImageUrl}
                  }
                  style={{
                    height: normalize(50),
                    width: normalize(70),
                  }}
                  imageStyle={{borderRadius: normalize(5)}}
                  resizeMode="cover"
                />
                <View
                  style={{
                    backgroundColor: Colors.white,
                    height: normalize(16),
                    alignSelf: 'flex-start',
                    marginTop: normalize(6),
                    borderRadius: normalize(3),
                    paddingHorizontal: normalize(3),
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: normalize(10),
                      marginStart: normalize(3),
                    }}>
                    10% Off
                  </Text>
                </View>
              </View>
            ) : null}

            <View
              style={{
                marginStart:
                  item?.type == 'Barter' || item?.type == 'barteroffer'
                    ? normalize(12)
                    : normalize(0),
                justifyContent: 'space-between',
                width:
                  item?.type == 'Barter' || item?.discount != ''
                    ? '75%'
                    : '100%',
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(12),
                  fontFamily: Fonts.Inter_SemiBold,
                }}>
                {item?.type == 'Barter' && item?.discount != ''
                  ? item?.barterOfferTitle?.substring(0, 48)
                  : item?.type == 'Barter'
                  ? item?.barterProductTitle?.substring(0, 28)
                  : item?.type == 'Paid+'
                  ? item?.paidCampaignName?.substring(0, 28)
                  : item?.contentLabTitle?.substring(0, 28)}
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(11),
                  fontFamily: Fonts.Inter_Regular,
                  width: '80%',
                  marginTop: normalize(6),
                }}
                numberOfLines={2}>
                {item?.type == 'Barter' && item?.discount != ''
                  ? 'From ' +
                    moment(item?.fromDate).format('DD MMM') +
                    ' to ' +
                    moment(item?.toDate).format('DD MMM')
                  : item?.type == 'Barter'
                  ? item?.barterProductDesc?.substring(0, 70)
                  : item?.type == 'Paid'
                  ? item?.paidCampaignDesc?.substring(0, 80)
                  : ''}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // backgroundColor:Colors.red,
                  marginTop:
                    item?.type == 'Barter'
                      ? normalize(7)
                      : item?.type == 'Paid'
                      ? normalize(7)
                      : normalize(20),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={Icons.document_upload}
                    style={style.profileCollabration}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(12),
                      fontFamily: Fonts.Inter_SemiBold,
                    }}>
                    {item?.totalDeliverables}
                  </Text>
                </View>
                {item?.type == 'Barter' || item?.discount !== '' ? null : (
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(12),
                      fontFamily: Fonts.Inter_SemiBold,
                    }}>
                    ₹{item?.totalValue}
                  </Text>
                )}
              </View>
            </View>
          </View>
          {item?.type == 'Paid+' ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: normalize(10),
              }}>
              <ImageBackground
                source={
                  item?.brandImageUrl == ''
                    ? Images.dyning
                    : {uri: item?.productImageUrl}
                }
                style={{
                  height: normalize(30),
                  width: normalize(30),
                }}
                imageStyle={{borderRadius: normalize(5)}}
                resizeMode="cover"
              />
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(10),
                  fontFamily: Fonts.Inter_SemiBold,
                  marginStart: normalize(6),
                }}>
                {item?.paidCampaignDesc?.substring(0, 90)}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </>
    );
  };

  const renderItemBarter = ({item, index}) => {
    return (
      <>
        <BaterCommon
          onPress={() => {
            props.navigation.navigate('Explore', {id: item?.campaignID});
          }}
          barter={style.barter}
          backColor={Colors.bcolor}
          imageBackStyle={style.imageBackStyle}
          barteProductTitle={item?.barteProductTitle}
          borderWidth={normalize(1)}
          brandImageUrl={item?.brandImageUrl}
          discount={item?.discount}
          barterDiscount={style?.barterDiscount}
          barterProductTitle={item?.barterProductTitle}
          totalDeliverables={item?.totalDeliverables}
          barterTextStyle={style.barterTextStyle}
          brandName={item?.brandName}
          fromDate={item?.fromDate}
          toDate={item?.toDate}
          imageViewStyle={style.barterImageViewStyle}
          offer={item?.offer}
          offerStyle={style.offerStyle}
          offerTextStyle={style.offerTextStyle}
          key={index}
          platformType={item?.platformType}
          productImageUrl={item?.productImageUrl}
          subContainer={style.subContainer}
          todateStyle={style.todateStyle}
          brandStyle={style.brandStyle}
          discountStyle={style.discountStyle}
          discountTextStyle={style.discountTextStyle}
          profileCollabration={style.profileCollabration}
        />
      </>
    );
  };
  const renderItemBlogs = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          borderWidth: normalize(1),
          borderColor: '#2A2C27',
          backgroundColor: '#181818',
          padding: normalize(9),
          borderRadius: normalize(4),
          padding: normalize(5),
          marginTop: normalize(12),
          alignItems: 'center',
        }}
        onPress={() => Linking?.openURL(item?.link)}>
        <ImageBackground
          source={{uri: item?.['yoast_head_json']['og_image'][0]['url']}}
          style={{
            height: normalize(155),
            // flex: 1,
            width:
              Platform.OS == 'ios'
                ? Dimensions.get('window').width - 47
                : Dimensions.get('window').width - 50,
          }}
          imageStyle={{
            borderRadius: normalize(4),
          }}
          resizeMode="cover"
        />
        {/* </ImageBackground> */}
        <Text
          style={{
            color: Colors.white,
            fontSize: normalize(14),
            // marginStart: normalize(3),
            alignSelf: 'flex-start',
            marginTop: normalize(12),
            fontFamily: Fonts.Inter_SemiBold,
            // textAlign: 'center',
          }}>
          {item?.yoast_head_json?.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: normalize(136),
            marginTop: normalize(6),
            alignSelf: 'flex-start',
          }}>
          <Text
            style={{
              color: Colors.lightgrey,
              fontSize: normalize(10),
              fontFamily: Fonts.Inter_Medium,
            }}>
            {moment(item?.date).format('MMMM DD yyyy')}
          </Text>
          <View
            style={{
              height: normalize(6),
              width: normalize(6),
              backgroundColor: Colors.white,
              borderRadius: normalize(9),
              marginStart: normalize(8),
              marginEnd: normalize(8),
            }}
          />
          <Text
            style={{
              color: Colors.lightgrey,
              fontSize: normalize(12),
              fontFamily: Fonts.Inter_Medium,
            }}>
            {item?.['yoast_head_json']?.twitter_misc['Est. reading time']} to
            read
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const getStatus = (val, isSetup) => {
    console.log(isSetup);
    return (
      <TouchableOpacity
        style={style.statusSub}
        onPress={() => {
          console.log('bnfvsdfns', isSetup);
          isSetup === false
            ? props.navigation.navigate('SignupName')
            : isSetup == 'reqimg'
            ? props.navigation.navigate('Profile')
            : isSetup == 'reqverify'
            ? props.navigation.navigate('IdVerification')
            : isSetup == 'reqadd'
            ? props.navigation.navigate('Address')
            : '';
        }}>
        <Image
          source={
            isSetup == true ||
            isSetup == 'Image' ||
            isSetup == 'address' ||
            isSetup == 'verify'
              ? Icons.tick
              : Icons.warning
          }
          style={{
            height: normalize(18),
            width: normalize(19),
            marginStart: normalize(-16),
            marginTop: normalize(-19),
          }}
          resizeMode="contain"
        />
        <View style={{flexDirection: 'row'}}>
          <Image
            source={Icons.images}
            style={{
              height: normalize(18),
              width: normalize(19),
              marginStart: normalize(5),
            }}
          />
          <Text
            style={{
              ...style.text8,
              fontSize: normalize(12),
              marginStart: normalize(7),
            }}>
            {val}
          </Text>
        </View>

        <Image
          source={
            isSetup == true ||
            isSetup == 'Image' ||
            isSetup == 'verify' ||
            isSetup == 'address'
              ? null
              : Icons.forward
          }
          style={{
            height: normalize(18),
            width: normalize(19),
            marginStart: normalize(5),
            position: 'absolute',
            end: normalize(5),
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  function logout() {
    try {
      dispatch(logoutRequest());
    } catch (e) {
      console.log(e);
    }
  }
  var scope =
    'public_profile,instagram_basic,pages_show_list,instagram_manage_insights,pages_read_engagement,pages_read_user_content';
  var loginFacebook = `https://www.facebook.com/v21.0/dialog/oauth?client_id=1126124512266280&redirect_uri=https://creators.celebfarm.com/facebook-auth/&scope=public_profile,instagram_basic,pages_show_list,instagram_manage_insights,pages_read_engagement,pages_read_user_content&response_type=code`;
  async function onFacebook() {
    try {
      FacebookLogin()
        .then(res => {
          console.log(res);
          console.log(constents.FBTOKEN);
          addGetRefToken(
            AuthReducer?.creatorID,
            res,
            constents.FBTOKEN,
            dispatch,
          );
        })
        .catch(err => {
          console.log(err);
        });

      // const config = {
      //   clientId: '1667000167118447',
      //   redirectUrl: 'https://celebfarm.com',
      //   scopes: ['user_profile',],
      //   serviceConfiguration: {
      //     authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
      //     tokenEndpoint: 'https://api.instagram.com/oauth/access_token',
      //   },
      // };
      // console.log(config);
      // const result = await authorize(config);
      // console.log('result');

      // axios
      //   .get(
      //     'https://www.facebook.com/v19.0/dialog/oauth?client_id=1667000167118447&redirect_uri=https://oauthdebugger.com/debug',
      //   )
      //   .then(val => {
      //     console.log(val)
      //   })
      //   .catch(e => {});

      // FB.api(
      //   '/me',
      //   'GET',
      //   {"fields":"id,name"},
      //   function(response) {
      //       // Insert your code here
      //   }
      // );

      // const responseInfoCallback = (error, result) => {
      //   if (error) {
      //     reject(error);
      //   } else {
      //     resolve(result);
      //   }
      // };

      // const infoRequest = new GraphRequest(
      //   '/me/accounts?',
      //   {
      //     access_token: {string: FBTOKEN},
      //     parameters: {
      //       fields: {
      //         string: 'id,name,access_token,instagram_business_account',
      //       },
      //     },
      //   },
      //   responseInfoCallback,
      // );
      const response = await axios.get(
        'https://graph.facebook.com/v19.0/me/accounts',
        {
          params: {
            fields: 'id,name,access_token,instagram_business_account',
            access_token: constents.FBTOKEN,
          },
        },
      );

      const jsonData = await response.data.json();
      // setData(jsonData);
      // setLoading(false);

      // console.log(infoRequest);
      console.log(jsonData);
    } catch (e) {}
  }

  function youtubeDetail() {
    try {
      var obj = 'creatorID=' + AuthReducer?.creatorID;
      connectionrequest()
        .then(res => {
          dispatch(getYoutubeUserDetailRequest(obj));
          dispatch(getInstagramUserDetailRequest(obj));
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

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <MyStatusBar
          backgroundColor={Colors.black}
          barStyle={'light-content'}
        />

        <HeaderData
          backScreen={() => setShow(!isShow)}
          title={
            'Hello, ' +
            (UserReducer?.userResponse?.creatorName?.split(' ')[0] ?? '')
          }
          notifiPress={() => props?.navigation.navigate('Notifications')}
          profilePress={() => props?.navigation.navigate('Chat')}
        />
        {HomeReducer?.status == 'homeCollab/getHomeCollaborationRequest' ||
        HomeReducer?.status == 'homeCollab/getBarterRequest' ||
        ProfileReducer?.status == 'Profile/getYoutubeDetailRequest' ||
        ProfileReducer?.status == 'Profile/getYoutubeUserDetailRequest' ||
        AuthReducer?.status == 'auth/deviceTokenRequest' ? (
          <Fallback />
        ) : (
          <>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <>
                <View style={style.containerBody}>
                  {AuthReducer?.signup == false ||
                  ProfileReducer?.getVerificationResponse?.result
                    ?.profileImage == false ||
                  ProfileReducer?.getVerificationResponse?.result
                    ?.aadharVerification == false ||
                  ProfileReducer?.getVerificationResponse?.result?.address ==
                    false ? (
                    <View style={style.containerAccount}>
                      <View style={style.emptyImage} />
                      <View>
                        <Text
                          style={{
                            ...style.text8,
                            fontFamily: Fonts.Inter_SemiBold,
                          }}>
                          Welcome to CelebFarm
                        </Text>
                        <Text style={{...style.text8, fontSize: normalize(12)}}>
                          Finish setting up your account
                        </Text>
                      </View>
                      <View style={style.viewLine} />
                      {getStatus('Complete Signing up', AuthReducer?.signup)}
                      {getStatus(
                        'Add Profile Picture',
                        UserReducer?.userResponse?.imageUrl
                          ? 'Image'
                          : 'reqimg',
                      )}
                      {getStatus(
                        'Verify Account',
                        ProfileReducer?.getVerificationResponse?.result
                          ?.aadharVerification
                          ? 'verify'
                          : 'reqverify',
                      )}
                      {getStatus(
                        'Add Shipping Address',
                        UserReducer?.userResponse?.address != null
                          ? 'address'
                          : 'reqadd',
                      )}
                    </View>
                  ) : null}

                  <View
                    style={{flexDirection: 'row', marginTop: normalize(18)}}>
                    <TouchableOpacity
                      style={[
                        {
                          ...style.btn,
                          backgroundColor:
                            isSelectSocial == '1' ? '#fff' : Colors.black,
                          borderColor: '#B7F9CF33',
                        },
                      ]}
                      activeOpacity={0.8}
                      onPress={() => setSelectSocial('1')}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginStart: normalize(7),
                          marginEnd: normalize(7),
                        }}>
                        <Image
                          source={Icons.insta}
                          style={{
                            width: 14,
                            height: 14,
                          }}
                          resizeMode="contain"></Image>
                        <Text
                          style={[
                            {
                              ...style.text4,
                              color:
                                isSelectSocial == '1'
                                  ? Colors.black
                                  : Colors.white,
                            },
                          ]}>
                          Instagram
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: normalize(12),
                      }}></View>

                    <TouchableOpacity
                      style={[
                        {
                          ...style.btn,
                          backgroundColor:
                            isSelectSocial == '0' ? '#fff' : Colors.black,
                          borderColor: '#B7F9CF33',
                        },
                      ]}
                      activeOpacity={0.8}
                      onPress={() => setSelectSocial('0')}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginStart: normalize(7),
                          marginEnd: normalize(7),
                        }}>
                        <Image
                          source={Icons.youtube}
                          style={{
                            width: 14,
                            height: 14,
                          }}
                          resizeMode="contain"></Image>
                        <Text
                          style={[
                            {
                              ...style.text4,
                              color:
                                isSelectSocial == '0'
                                  ? Colors.black
                                  : Colors.white,
                            },
                          ]}>
                          Youtube
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {youtubeDetails[0]?.['id'] != 0 && isSelectSocial === '0' ? (
                    <LinearGradient
                      colors={['#B7F9CF', '#EAF7A7', '#EAF7A7']}
                      style={{
                        padding: normalize(10),
                        marginTop: normalize(12),
                        borderRadius: normalize(4),
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <ImageBackground
                          source={{uri: youtubeDetails[0]?.['imageURl']}}
                          style={style.profile}
                          imageStyle={{borderRadius: normalize(24)}}
                          resizeMode="contain"
                        />
                        <View style={{marginStart: normalize(12)}}>
                          <Text style={style.text2}>
                            {youtubeDetails[0]?.['channel']}
                          </Text>
                          {/* <Text style={style.text6}>UIUX Design</Text> */}
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: normalize(12),
                        }}>
                        <View
                          style={{
                            justifyContent: 'space-between',
                            backgroundColor: Colors.black,
                            borderRadius: normalize(4),
                            padding: normalize(7),
                            width: (Dimensions.get('window').width - 60) / 2,
                          }}>
                          <Text style={style.text7}>Subscriber</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: normalize(12),
                            }}>
                            <Text
                              style={[
                                {...style.text7, fontFamily: Fonts.Inter_Black},
                              ]}>
                              {youtubeDetails[0]?.['subscriber']}
                            </Text>
                            {/* <View style={{flexDirection: 'row'}}>
                        <Image
                          source={Icons.Arrow_drop_up_gray}
                          style={style.upimage}
                          resizeMode="contain"
                        />
                        <View style={{width: normalize(4)}}></View>
                        <Text
                          style={[
                            {
                              ...style.text7,
                              fontFamily: Fonts.Inter_Light,
                              opacity: 0.9,
                            },
                          ]}>
                          0.4%
                        </Text>
                      </View> */}
                          </View>
                        </View>
                        <View
                          style={{
                            justifyContent: 'space-between',
                            backgroundColor: Colors.black,
                            borderRadius: normalize(4),
                            padding: normalize(7),
                            width: (Dimensions.get('window').width - 60) / 2,
                          }}>
                          <Text style={style.text7}>Engagement Rate</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: normalize(12),
                            }}>
                            <Text
                              style={[
                                {...style.text7, fontFamily: Fonts.Inter_Black},
                              ]}>
                              Nil
                            </Text>
                            {/* <View style={{flexDirection: 'row'}}>
                        <Image
                          source={Icons.Arrow_drop_up}
                          style={style.upimage}
                          resizeMode="contain"
                        />
                        <View style={{width: normalize(4)}}></View>
                        <Text
                          style={[
                            {...style.text7, fontFamily: Fonts.Inter_Light},
                          ]}>
                          0.4%
                        </Text>
                      </View> */}
                          </View>
                        </View>
                      </View>
                    </LinearGradient>
                  ) : instaDetails[0]?.['id'] !== 0 &&
                    isSelectSocial === '1' ? (
                    <LinearGradient
                      colors={['#B7F9CF', '#EAF7A7', '#EAF7A7']}
                      style={{
                        padding: normalize(10),
                        marginTop: normalize(12),
                        borderRadius: normalize(4),
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <ImageBackground
                          source={{
                            uri: imageInsta,
                          }}
                          style={style.profile}
                          imageStyle={{borderRadius: normalize(28)}}
                          resizeMode="cover"
                        />
                        <View style={{marginStart: normalize(12)}}>
                          <Text style={style.text2}>
                            {
                              ProfileReducer?.instagramuserResponse?.result
                                ?.username
                            }
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: normalize(12),
                        }}>
                        <View
                          style={{
                            justifyContent: 'space-between',
                            backgroundColor: Colors.black,
                            borderRadius: normalize(4),
                            padding: normalize(7),
                            width: (Dimensions.get('window').width - 60) / 2,
                          }}>
                          <Text style={style.text7}>Followers</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: normalize(12),
                            }}>
                            <Text
                              style={[
                                {...style.text7, fontFamily: Fonts.Inter_Black},
                              ]}>
                              {
                                ProfileReducer?.instagramuserResponse?.result
                                  ?.followers
                              }
                            </Text>
                            {/* <View style={{flexDirection: 'row'}}>
                        <Image
                          source={Icons.Arrow_drop_up_gray}
                          style={style.upimage}
                          resizeMode="contain"
                        />
                        <View style={{width: normalize(4)}}></View>
                        <Text
                          style={[
                            {
                              ...style.text7,
                              fontFamily: Fonts.Inter_Light,
                              opacity: 0.9,
                            },
                          ]}>
                          0.4%
                        </Text>
                      </View> */}
                          </View>
                        </View>
                        <View
                          style={{
                            justifyContent: 'space-between',
                            backgroundColor: Colors.black,
                            borderRadius: normalize(4),
                            padding: normalize(7),
                            width: (Dimensions.get('window').width - 60) / 2,
                          }}>
                          <Text style={style.text7}>Engagement Rate</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: normalize(12),
                            }}>
                            <Text
                              style={[
                                {...style.text7, fontFamily: Fonts.Inter_Black},
                              ]}>
                              {Math.floor(
                                ProfileReducer?.instagramuserResponse?.result
                                  ?.engagementRate,
                              ).toFixed(2)}
                              %
                            </Text>
                            {/* <View style={{flexDirection: 'row'}}>
                        <Image
                          source={Icons.Arrow_drop_up}
                          style={style.upimage}
                          resizeMode="contain"
                        />
                        <View style={{width: normalize(4)}}></View>
                        <Text
                          style={[
                            {...style.text7, fontFamily: Fonts.Inter_Light},
                          ]}>
                          0.4%
                        </Text>
                      </View> */}
                          </View>
                        </View>
                      </View>
                    </LinearGradient>
                  ) : (
                    <View
                      style={{
                        backgroundColor:
                          youtubeDetails[0]?.['id'] == 0 &&
                          isSelectSocial == '0'
                            ? Colors.bcolor
                            : instaDetails[0]?.['id'] == 0 &&
                              isSelectSocial === '1'
                            ? Colors.bcolor
                            : null,
                        marginTop: normalize(12),
                        borderRadius: normalize(4),
                        padding: normalize(7),
                      }}>
                      {youtubeDetails[0]?.['id'] == 0 &&
                      isSelectSocial == '0' ? (
                        <Text style={style.text3}>Connect account</Text>
                      ) : instaDetails[0]?.['id'] == 0 &&
                        isSelectSocial == '1' ? (
                        <Text style={style.text3}>Connect account</Text>
                      ) : null}
                      <View
                        style={{
                          justifyContent: 'space-between',
                          marginTop: normalize(7),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {isSelectSocial == '1' ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              height: normalize(47),
                              borderColor: Colors.borderColor,
                              borderWidth: normalize(1),
                              borderRadius: normalize(7),
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              paddingHorizontal: normalize(12),
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Image
                                source={Icons.insta}
                                style={{
                                  width: 25,
                                  height: 25,
                                }}
                                resizeMode="contain"></Image>
                              <Text style={style.text4}>Instagram</Text>
                            </View>
                            <TouchableOpacity
                              style={{
                                width: normalize(91),
                                height: normalize(33),
                                borderColor: Colors.grey,
                                backgroundColor: Colors.white,
                                borderRadius: normalize(25),
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                              onPress={() => {
                                onFacebook();
                              }}>
                              <Text style={style.text5}>Connect</Text>
                            </TouchableOpacity>
                          </View>
                        ) : youtubeDetails[0]?.['id'] == 0 ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              height: normalize(47),
                              borderColor: Colors.borderColor,
                              borderWidth: normalize(1),
                              borderRadius: normalize(7),
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              paddingHorizontal: normalize(12),
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Image
                                source={Icons.youtube}
                                style={{
                                  width: 25,
                                  height: 25,
                                }}
                                resizeMode="contain"></Image>
                              <Text style={style.text4}>Youtube</Text>
                            </View>
                            <TouchableOpacity
                              style={{
                                flexDirection: 'row',
                                width: normalize(91),
                                height: normalize(33),
                                borderColor: Colors.grey,
                                backgroundColor: Colors.white,
                                borderWidth: 1,
                                borderRadius: normalize(25),
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                              onPress={() =>
                                Youtube(AuthReducer?.creatorID, dispatch)
                              }>
                              <Text style={style.text5}>Connect</Text>
                            </TouchableOpacity>
                          </View>
                        ) : null}
                      </View>
                    </View>
                  )}
                  {/* <View></View> */}
                  <View
                    style={{
                      marginTop: normalize(19),
                      // backgroundColor:Colors.red
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(16),
                        fontFamily: Fonts.Inter_Medium,
                      }}>
                      Active Collaborations
                    </Text>
                    {dataCollaboration?.length > 0 ? (
                      <>
                        <Carousel
                          ref={c => {
                            isCarousel;
                          }}
                          data={dataCollaboration}
                          renderItem={renderItem}
                          onSnapToItem={index => setIndex(index)}
                          sliderWidth={Dimensions.get('screen').width - 17}
                          itemWidth={Dimensions.get('screen').width - 27} //normalize(Dimensions.get('screen').width-97)
                        />
                        <View style={style.pagination}>
                          <AnimatedDotsCarousel
                            length={dataCollaboration.length}
                            currentIndex={index}
                            maxIndicators={4}
                            interpolateOpacityAndColor={true}
                            activeIndicatorConfig={{
                              color: '#B7F9CF',
                              margin: 3,
                              opacity: 1,
                              size: 8,
                            }}
                            inactiveIndicatorConfig={{
                              color: 'white',
                              margin: 3,
                              opacity: 0.5,
                              size: 8,
                            }}
                            decreasingDots={[
                              {
                                config: {
                                  color: 'white',
                                  margin: 3,
                                  opacity: 0.5,
                                  size: 6,
                                },
                                quantity: 1,
                              },
                              {
                                config: {
                                  color: 'white',
                                  margin: 3,
                                  opacity: 0.5,
                                  size: 4,
                                },
                                quantity: 1,
                              },
                            ]}
                          />
                        </View>
                      </>
                    ) : (
                      <EmptyComponent
                        val={'No Active Collaborations'}
                        height={normalize(110)}
                        imgHeight={normalize(50)}
                        imgWidth={normalize(50)}
                      />
                    )}
                    <View style={{width: '50%', alignSelf: 'center'}}></View>
                  </View>
                  <View
                    style={{
                      marginTop: normalize(10),
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(16),
                        fontFamily: Fonts.Inter_Bold,
                      }}>
                      Barter Products
                    </Text>
                  </View>
                  {dataBarter?.length > 0 ? (
                    <Carousel
                      ref={c => {
                        isCarousel;
                      }}
                      // dotColor={Colors.red}
                      data={dataBarter}
                      renderItem={renderItemBarter}
                      onSnapToItem={index => setIndex1(index)}
                      sliderWidth={Dimensions.get('screen').width}
                      itemWidth={Dimensions.get('screen').width - 185} //normalize(Dimensions.get('screen').width-97)
                      activeSlideAlignment="start"
                      layout="default"
                      layoutCardOffset={`10`}
                      inactiveSlideScale={1}
                      inactiveSlideOpacity={1}
                    />
                  ) : (
                    <EmptyComponent
                      val={'Exciting Products coming soon'}
                      height={normalize(90)}
                      imgWidth={normalize(50)}
                      imgHeight={normalize(50)}
                    />
                  )}
                  <View style={style.pagination}>
                    <AnimatedDotsCarousel
                      length={dataBarter.length}
                      currentIndex={index1}
                      maxIndicators={4}
                      interpolateOpacityAndColor={true}
                      activeIndicatorConfig={{
                        color: '#B7F9CF',
                        margin: 3,
                        opacity: 1,
                        size: 8,
                      }}
                      inactiveIndicatorConfig={{
                        color: 'white',
                        margin: 3,
                        opacity: 0.5,
                        size: 8,
                      }}
                      decreasingDots={[
                        {
                          config: {
                            color: 'white',
                            margin: 3,
                            opacity: 0.5,
                            size: 6,
                          },
                          quantity: 1,
                        },
                        {
                          config: {
                            color: 'white',
                            margin: 3,
                            opacity: 0.5,
                            size: 4,
                          },
                          quantity: 1,
                        },
                      ]}
                    />
                  </View>
                  <View
                    style={{
                      marginTop: normalize(10),
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={Icons.logoCeleb}
                      style={{height: normalize(16), width: normalize(16)}}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(14),
                        fontFamily: Fonts.Inter_SemiBold,
                        marginStart: normalize(10),
                      }}>
                      CelebFarm | blogs
                    </Text>
                  </View>
                  <>
                    <Carousel
                      ref={c => {
                        isCarousel;
                      }}
                      data={blogs}
                      renderItem={renderItemBlogs}
                      onSnapToItem={index => setIndex(index)}
                      sliderWidth={Dimensions.get('screen').width - 17}
                      itemWidth={Dimensions.get('screen').width - 27} //normalize(Dimensions.get('screen').width-97)
                    />
                    <View style={style.pagination}>
                      <AnimatedDotsCarousel
                        length={blogs.length}
                        currentIndex={index}
                        maxIndicators={4}
                        interpolateOpacityAndColor={true}
                        activeIndicatorConfig={{
                          color: '#B7F9CF',
                          margin: 3,
                          opacity: 1,
                          size: 8,
                        }}
                        inactiveIndicatorConfig={{
                          color: 'white',
                          margin: 3,
                          opacity: 0.5,
                          size: 8,
                        }}
                        decreasingDots={[
                          {
                            config: {
                              color: 'white',
                              margin: 3,
                              opacity: 0.5,
                              size: 6,
                            },
                            quantity: 1,
                          },
                          {
                            config: {
                              color: 'white',
                              margin: 3,
                              opacity: 0.5,
                              size: 4,
                            },
                            quantity: 1,
                          },
                        ]}
                      />
                    </View>
                  </>
                </View>
                {isShowModal == true ? (
                  <WebView
                    source={{uri: loginFacebook.toString()}}
                    style={{
                      flex: 1,
                    }}
                  />
                ) : null}
              </>
            </ScrollView>
          </>
        )}
        <Modal
          isVisible={isShow}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          style={{width: '100%', alignSelf: 'center', margin: 0}}
          animationInTiming={800}
          animationOutTiming={1000}
          backdropColor={'#000000'}
          onBackButtonPress={() => onBackdropPress()}
          onBackdropPress={() => {
            setShow(false), setSelect('');
          }}>
          {/* <ScrollView> */}
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
                isSelect == 'Account'
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
                  props.navigation.navigate('Account'), setShow(false);
                  // setocuc;
                  setSelect('Account');
                  console.log('kfhdsfgdsh');
                }}>
                <Image
                  source={Icons.useracc}
                  style={[
                    {
                      ...style.imagem,
                      tintColor:
                        isSelect != 'Account' ? Colors.white : Colors.black,
                    },
                  ]}
                />
                <Text
                  style={{
                    fontSize: normalize(16),
                    fontFamily: Fonts.Inter_Medium,
                    color: isSelect != 'Account' ? Colors.white : '#434540',
                  }}>
                  Account
                </Text>
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              colors={
                isSelect == 'PushNotification'
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
                    setShow(false);
                  setSelect('PushNotification');
                }}>
                <Image
                  source={Icons.notificationacc}
                  style={[
                    {
                      ...style.imagem,
                      tintColor:
                        isSelect != 'PushNotification'
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
                      isSelect != 'PushNotification' ? Colors.white : '#434540',
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
                isSelect == 'Terms'
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
                  props.navigation.navigate('Terms'), setShow(false);
                  setSelect('Terms');
                }}>
                <Image
                  source={Icons.elementacc}
                  style={[
                    {
                      ...style.imagem,
                      tintColor:
                        isSelect != 'Terms' ? Colors.white : Colors.black,
                    },
                  ]}
                />
                <Text
                  style={{
                    fontSize: normalize(16),
                    fontFamily: Fonts.Inter_Medium,
                    color: isSelect != 'Terms' ? Colors.white : '#434540',
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
                isSelect == 'Contact'
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
                  props.navigation.navigate('ContactUsSend'), setShow(false);
                  setSelect('Contact');
                }}>
                <Image
                  source={Icons.useracc}
                  style={[
                    {
                      ...style.imagem,
                      tintColor:
                        isSelect != 'Contact' ? Colors.white : Colors.black,
                    },
                  ]}
                />
                <Text
                  style={{
                    fontSize: normalize(16),
                    fontFamily: Fonts.Inter_Medium,
                    color: isSelect != 'Contact' ? Colors.white : '#434540',
                  }}>
                  Contact Us
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={
                isSelect == 'Logout'
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
                  setSelect('Logout');
                }}>
                <Image
                  source={Icons.useracc}
                  style={[
                    {
                      ...style.imagem,
                      tintColor:
                        isSelect != 'Logout' ? Colors.white : Colors.black,
                    },
                  ]}
                />
                <Text
                  style={{
                    fontSize: normalize(16),
                    fontFamily: Fonts.Inter_Medium,
                    color: isSelect != 'Logout' ? Colors.white : '#434540',
                  }}>
                  Log out
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          {/* </ScrollView> */}
        </Modal>

        <Modal
          isVisible={isShowInsta1}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          style={{
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            margin: 0,
          }}
          // animationInTiming={800}
          // animationOutTiming={1000}
          backdropColor={'#000000'}
          onBackButtonPress={() => onBackdropPress()}
          onBackdropPress={() => setShowInsta1(false)}>
          <ConnectInstagramScreen
            onBack={val => {
              setShowInsta1(val);
            }}
            onConnect={val => {
              setShowAsk2(true);
            }}
          />
        </Modal>

        <Modal
          isVisible={isShowAsk2}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          style={{width: '100%', alignSelf: 'center', margin: 0}}
          animationInTiming={800}
          animationOutTiming={1000}
          backdropColor={'#000000'}
          onBackButtonPress={() => onBackdropPress()}
          onBackdropPress={() => setShowAsk2(false)}>
          {/* <ScrollView> */}
          <ConnectInstagramAskScreen
            onBack={val => setShowAsk2(val)}
            onConnect={() => {
              // onFacebook();
            }}
          />
          {/* </ScrollView> */}
        </Modal>

        <Modal
          isVisible={isShowSuccess3}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          style={{width: '100%', alignSelf: 'center', margin: 0}}
          animationInTiming={800}
          animationOutTiming={1000}
          backdropColor={'#000000'}
          onBackdropPress={() => setShowSuccess3(false)}>
          {/* <ScrollView> */}
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
              maxHeight: props.height,
              paddingLeft: normalize(20),
              paddingBottom: normalize(15),
              paddingTop: normalize(19),
              height: normalize(300),
            }}>
            <View
              style={{
                borderRadius: normalize(3),
              }}>
              <TouchableOpacity
                style={[
                  {
                    ...style.modelView,
                    marginTop: normalize(0),
                    alignSelf: 'flex-end',
                  },
                ]}
                onPress={() => {}}>
                <Image
                  source={Icons.close}
                  style={[
                    {
                      height: normalize(20),
                      width: normalize(20),
                    },
                  ]}
                />
              </TouchableOpacity>
              <Image
                source={Icons.success}
                style={[
                  {
                    height: normalize(130),
                    width: normalize(130),
                    alignSelf: 'center',
                  },
                ]}
                resizeMode="contain"
              />

              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color: Colors.green,
                  textAlign: 'center',
                  marginTop: normalize(10),
                }}>
                Great!
              </Text>
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  marginTop: normalize(10),
                  color: Colors.white,
                  marginTop: normalize(10),
                  textAlign: 'center',
                }}>
                Account Connected
              </Text>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBody: {
    paddingHorizontal: normalize(10),
    // marginTop: normalize(12),
    flex: 1,
    marginBottom: normalize(43),
    backgroundColor: Colors.black,
    paddingBottom: normalize(29),
  },
  containerAccount: {
    marginTop: normalize(12),
    borderWidth: normalize(1),
    borderColor: Colors.bcolor,
    borderRadius: normalize(9),
    padding: normalize(12),
  },
  emptyImage: {
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(16),
    backgroundColor: Colors.whitegrey,
    height: normalize(52),
    marginBottom: normalize(10),
  },
  viewLine: {
    width: '100%',
    height: normalize(1),
    backgroundColor: Colors.white,
    opacity: 0.12,
    marginTop: normalize(9),
  },
  statusSub: {
    flexDirection: 'row',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(9),
    alignItems: 'center',
    backgroundColor: Colors.bcolor,
    borderRadius: normalize(10),
    marginTop: normalize(12),
  },
  text: {
    color: Colors.white,
    fontSize: normalize(16),
    marginStart: normalize(12),
    fontFamily: Fonts.Inter_Bold,
  },
  text2: {
    color: Colors.black,
    fontSize: normalize(14),
    fontFamily: Fonts.Inter_Bold,
  },
  text5: {
    color: Colors.black,
    fontSize: normalize(14),
  },
  text6: {
    color: Colors.black,
    fontSize: normalize(12),
    marginTop: normalize(7),
    fontFamily: Fonts.Inter_Regular,
  },
  text3: {
    color: Colors.white,
    fontSize: normalize(12),
    opacity: 0.7,
  },
  text7: {
    color: Colors.white,
    fontSize: normalize(12),
    fontFamily: Fonts.Inter_Medium,
  },
  text8: {
    color: Colors.white,
    fontSize: normalize(14),
    fontFamily: Fonts.Inter_Medium,
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
    height: normalize(12),
    width: normalize(12),
    marginRight: normalize(7),
  },
  profileCollabr: {
    height: normalize(16),
    width: normalize(16),
  },
  text4: {
    color: Colors.white,
    fontSize: normalize(14),
    marginStart: normalize(6),
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Medium,
  },
  btn: {
    flexDirection: 'row',
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: normalize(4),
    alignItems: 'center',
    paddingHorizontal: normalize(7),
    height: normalize(29),
  },
  collbCard: {
    borderRadius: normalize(4),
    borderWidth: normalize(1),
    borderColor: Colors.borderColor,
    padding: normalize(9),
    marginTop: normalize(12),
    backgroundColor: Colors.bcolor,
    height: normalize(111),
  },
  barter: {
    borderWidth: normalize(1),
    borderColor: '#2A2C27',
    backgroundColor: '#181818',
    padding: normalize(5),
    height: normalize(234),
    width: normalize(161),
    alignItems: 'center',
    borderRadius: normalize(4),
    marginTop: normalize(9),
  },
  brand: {
    height: normalize(18),
    width: normalize(18),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(4),
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(6),
    justifyContent: 'space-between',
    alignContent: 'center',
    width: '99%',
    position: 'absolute',
    bottom: normalize(10),
    // width: normalize(136),
    // height: normalize(36),
  },
  imagem: {
    height: normalize(16),
    width: normalize(16),
    tintColor: Colors.black,
    marginEnd: normalize(9),
  },
  modelView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(9),
    paddingVertical: normalize(7),
    paddingHorizontal: normalize(7),
    marginEnd: normalize(18),
  },
  pagination: {
    justifyContent: 'center',
    marginTop: normalize(12),
    alignItems: 'center',
  },
  barterDiscount: {
    height: normalize(130),
    width: normalize(151),
    justifyContent: 'flex-end',
    padding: normalize(6),
  },
  barterTextStyle: {
    color: Colors.white,
    fontSize: normalize(10),
    // marginStart: normalize(3),
    alignSelf: 'flex-start',
    marginTop: normalize(6),
    fontFamily: Fonts.Inter_Medium,
  },
  brandStyle: {
    color: Colors.white,
    fontSize: normalize(12),
    marginStart: normalize(3),
    fontFamily: Fonts.Inter_Medium,
  },
  barterImageViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: normalize(9),
  },
  offerStyle: {
    backgroundColor: Colors.white,
    height: normalize(16),
    alignSelf: 'flex-start',
    marginTop: normalize(9),
    borderRadius: normalize(3),
    paddingHorizontal: normalize(3),
    justifyContent: 'center',
  },
  offerTextStyle: {
    color: Colors.black,
    fontSize: normalize(10),
    marginStart: normalize(3),
    fontFamily: Fonts.Inter_SemiBold,
  },
  todateStyle: {
    color: Colors.white,
    fontSize: normalize(10),
    marginTop: normalize(12),
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Light,
  },
  discountStyle: {
    backgroundColor: Colors.white,
    height: normalize(16),
    alignSelf: 'flex-start',
    marginTop: normalize(9),
    borderRadius: normalize(3),
    paddingHorizontal: normalize(3),
    justifyContent: 'center',
  },
  discountTextStyle: {
    color: Colors.black,
    fontSize: normalize(10),
    marginStart: normalize(3),
    fontFamily: Fonts.Inter_SemiBold,
  },
  imageBackStyle: {
    height: normalize(140),
    width: normalize(148),
    justifyContent: 'flex-end',
    padding: normalize(6),
  },
});

export default React.memo(Home);
