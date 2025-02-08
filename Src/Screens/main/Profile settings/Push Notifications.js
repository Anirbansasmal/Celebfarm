import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
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
import RNSwitch from '../../../Components/Switch';
import {useDispatch, useSelector} from 'react-redux';
import HeaderCommon from '../../../Components/HeaderCommon';
import connectionrequest from '../../../utils/helpers/NetInfo';
import {
  getNotificationDetailsRequest,
  getNotificationUpdateRequest,
} from '../../../redux/reducers/ProfileReducer';
import Loader from '../../../utils/helpers/Loader';
var status = '';
function PushNotifications(props) {
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);

  const [pauseAll, setPauseAll] = useState(false);
  const [barterRequest, setBarterRequest] = useState(false);
  const [collaborationInvites, setCollaborationInvites] = useState(false);
  const [collaborationOffers, setCollaborationOffers] = useState(false);
  const [messages, setMessages] = useState(false);
  const [payment, setPayment] = useState(false);
  const [contentReview, setContentReview] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  useEffect(() => {
    try {
      connectionrequest().then(() => {
        notification();
      });
    } catch (error) {}
  }, []);
  function notification() {
    var obj = 'creatorID=' + AuthReducer?.creatorID;
    dispatch(getNotificationDetailsRequest(obj));
  }
  function updateNotification(...val) {
    console.log('restv', val[0][7]);
    try {
      var obj = {
        CreatorID: AuthReducer?.creatorID,
        PauseAll: val[0][0] == 'pause' ? val[0][1] : pauseAll,
        BarterRequest: val[0][2] == 'barter' ? val[0][3] : barterRequest,
        // CollaborationInvites: val == 'collaboration' ? collaborationInvites : '',
        CollaborationOffers:
          val[0][6] == 'collaborationoffers' ? val[0][7] : collaborationOffers,
        Messages: val[0][4] == 'message' ? val[0][5] : messages,
        // Payment: val == 'pause' ? false : '',
        ContentReview: val[0][8] == 'contentreview' ? val[0][9] : contentReview,
        // EmailNotifications: val == 'pause' ? true : '',
      };
      connectionrequest()
        .then(() => {
          dispatch(getNotificationUpdateRequest(obj));
        })
        .then(() => {});
    } catch (error) {}
  }

  function getNotificationChange(val) {
    if (val == 'pauseAll') {
      console.log('pauseAll', barterRequest);
      if (pauseAll) {
      } else {
        setBarterRequest(true);
        setMessages(true);
        setContentReview(true);
        setCollaborationOffers(true);

        updateNotification([
          'pause',
          true,
          'barter',
          true,
          'message',
          true,
          'collaborationoffer',
          true,
          'contentreview',
          true,
        ]);
      }
    } else if (val == 'barter') {
      console.log(
        'barter',
        !barterRequest == true &&
          messages == true &&
          collaborationOffers == true &&
          contentReview == true,
      );
      setPauseAll(
        !barterRequest == true &&
          messages == true &&
          collaborationOffers == true &&
          contentReview == true
          ? true
          : false,
      );
      setMessages(messages);
      setContentReview(contentReview);
      setCollaborationOffers(collaborationOffers);

      updateNotification([
        'pause',
        !barterRequest == true &&
        messages == true &&
        collaborationOffers == true &&
        contentReview == true
          ? true
          : false,
        'barter',
        !barterRequest,
        'message',
        messages,
        'collaborationoffers',
        collaborationOffers,
        'contentreview',
        contentReview,
      ]);
    } else if (val == 'message') {
      setPauseAll(
        barterRequest == true &&
          !messages == true &&
          collaborationOffers == true &&
          contentReview == true
          ? true
          : false,
      );
      setBarterRequest(barterRequest);
      setContentReview(contentReview);
      setCollaborationOffers(collaborationOffers);

      updateNotification([
        'pause',
        barterRequest == true &&
        !messages == true &&
        collaborationOffers == true &&
        contentReview == true
          ? true
          : false,
        'barter',
        barterRequest,
        'message',
        !messages,
        'collaborationoffers',
        collaborationOffers,
        'contentreview',
        contentReview,
      ]);
    } else if (val == 'collaborationoffer') {
      setPauseAll(
        barterRequest == true &&
          messages == true &&
          !collaborationOffers == true &&
          contentReview == true
          ? true
          : false,
      );
      setBarterRequest(barterRequest);
      setMessages(messages);
      setContentReview(contentReview);

      updateNotification([
        'pause',
        barterRequest == true &&
        messages == true &&
        !collaborationOffers == true &&
        contentReview == true
          ? true
          : false,
        'barter',
        barterRequest,
        'message',
        messages,
        'collaborationoffers',
        !collaborationOffers,
        'contentreview',
        contentReview,
      ]);
    } else if (val == 'contentreview') {
      setPauseAll(
        barterRequest == true &&
          messages == true &&
          !contentReview == true &&
          collaborationOffers == true
          ? true
          : false,
      );
      setBarterRequest(barterRequest);
      setMessages(messages);
      setCollaborationOffers(collaborationOffers);

      updateNotification([
        'pause',
        barterRequest == true &&
        messages == true &&
        !contentReview == true &&
        collaborationOffers == true
          ? true
          : false,
        'barter',
        barterRequest,
        'message',
        messages,
        'collaborationoffers',
        collaborationOffers,
        'contentreview',
        !contentReview,
      ]);
    } else {
    }
  }
  if (status == '' || ProfileReducer?.status != status) {
    switch (ProfileReducer?.status) {
      case 'Profile/getNotificationDetailsRequest':
        status = ProfileReducer?.status;
        break;
      case 'Profile/getNotificationDetailsSuccess':
        status = ProfileReducer?.status;
        setPauseAll(
          ProfileReducer?.notificationDetailsResponse?.result?.pauseAll,
        ); // Set PauseAll to true
        setBarterRequest(
          ProfileReducer?.notificationDetailsResponse?.result?.barterRequest,
        ); // Set Barter Request to true
        // setCollaborationInvites(ProfileReducer?.notificationDetailsResponse?.result?.collaborationInvites); // Set Collaboration Invites to false
        setCollaborationOffers(
          ProfileReducer?.notificationDetailsResponse?.result
            ?.collaborationOffers,
        ); // Set Collaboration Offers to true
        setMessages(
          ProfileReducer?.notificationDetailsResponse?.result?.messages,
        ); // Set Messages to true
        // setPayment(ProfileReducer?.notificationDetailsResponse?.result?.payment); // Set Payment to false
        setContentReview(
          ProfileReducer?.notificationDetailsResponse?.result?.contentReview,
        ); // Set Content Review to true
        // setEmailNotifications(ProfileReducer?.notificationDetailsResponse?.result?.emailNotifications); // Set Email Notifications to false
        break;
      case 'Profile/getNotificationDetailsFaliure':
        status = ProfileReducer?.status;
        break;

      case 'Profile/getNotificationUpdateRequest':
        status = ProfileReducer?.status;
        break;
      case 'Profile/getNotificationUpdateSuccess':
        status = ProfileReducer?.status;

        break;
      case 'Profile/getNotificationUpdateFaliure':
        status = ProfileReducer?.status;
        break;
    }
  }
  return (
    <>
      <Loader
        visible={
          'Profile/getNotificationUpdateRequest' == ProfileReducer?.status
        }
      />
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
        <HeaderCommon
          picTitle={true}
          home={true}
          back={true}
          backgroundColor={'#000'}
          title={'Push Notifications'}
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
        {/* <SafeAreaView style={style.container}> */}
        <View style={style.container}>
          <ScrollView>
            <>
              {/* <View style={style.containerBody}>
                <View style={style.contentBody}>
                  <View style={style.contentBodyblw}>
                    <Text style={style.text}>Pause all</Text>
                  </View>

                  <RNSwitch
                    handleOnPress={() => {
                      // getNearByGroups();

                      if (
                        barterRequest == false ||
                        messages == false ||
                        collaborationOffers == false ||
                        contentReview == false
                      ) {
                        setPauseAll(true);
                        setBarterRequest(true);
                        setMessages(true);
                        setContentReview(true);
                        setCollaborationOffers(true);
                        setTimeout(() => {
                          getNotificationChange('pauseAll');
                        }, 2000);
                      }
                    }}
                    value={pauseAll ? 0 : 1}
                    activeTrackColor="#C4FD65"
                    inActiveTrackColor="#CECECE"
                    thumbColor="#000"
                    activethumbColor="#000"
                  />
                </View>
              </View>
              <View
                style={{
                  marginTop: normalize(12),
                  backgroundColor: '#434540',
                  width: '100%',
                  height: 1,
                }}></View> */}
              <View style={style.containerBody}>
                <View style={style.contentBody}>
                  <View style={style.contentBodyblw}>
                    <Text style={style.text}>Barter requests</Text>
                  </View>

                  <RNSwitch
                    handleOnPress={() => {
                      // getNearByGroups();
                      setBarterRequest(prev => !prev);
                      getNotificationChange('barter');
                    }}
                    value={barterRequest ? 0 : 1}
                    activeTrackColor="#C4FD65"
                    inActiveTrackColor="#CECECE"
                    thumbColor="#000"
                    activethumbColor="#000"
                  />
                </View>
              </View>

              <View
                style={{
                  marginTop: normalize(12),
                  backgroundColor: '#434540',
                  width: '100%',
                  height: 1,
                }}></View>

              {/* <View style={style.containerBody}>
              <View style={style.contentBody}>
                <View style={style.contentBodyblw}>
                  <Text style={style.text}>Collaboration invites</Text>
                </View>

                <RNSwitch
                  handleOnPress={() => {
                    // getNearByGroups();
                    setCollaborationInvites(!collaborationInvites);
                    updateNotification('collaboration');
                  }}
                  value={collaborationInvites == true ? 1 : 0}
                  activeTrackColor="#C4FD65"
                  inActiveTrackColor="#CECECE"
                  thumbColor="#000"
                  activethumbColor="#000"
                />
              </View>
            </View> */}

              {/* <View
              style={{
                marginTop: normalize(12),
                backgroundColor: '#434540',
                width: '100%',
                height: 1,
              }}></View> */}

              <View style={style.containerBody}>
                <View style={style.contentBody}>
                  <View style={style.contentBodyblw}>
                    <Text style={style.text}>Messages</Text>
                  </View>

                  <RNSwitch
                    handleOnPress={() => {
                      // getNearByGroups();
                      console.log(messages);
                      setMessages(prev => !prev);
                      console.log(messages);
                      getNotificationChange('message');
                    }}
                    value={messages == true ? 0 : 1}
                    activeTrackColor="#C4FD65"
                    inActiveTrackColor="#CECECE"
                    thumbColor="#000"
                    activethumbColor="#000"
                  />
                </View>
              </View>
              <View
                style={{
                  marginTop: normalize(12),
                  backgroundColor: '#434540',
                  width: '100%',
                  height: 1,
                }}></View>

              <View style={style.containerBody}>
                <View style={style.contentBody}>
                  <View style={style.contentBodyblw}>
                    <Text style={style.text}>Collaboration offers</Text>
                  </View>

                  <RNSwitch
                    handleOnPress={() => {
                      // getNearByGroups();
                      setCollaborationOffers(prev => !prev);
                      getNotificationChange('collaborationoffer');
                    }}
                    value={collaborationOffers ? 0 : 1}
                    activeTrackColor="#C4FD65"
                    inActiveTrackColor="#CECECE"
                    thumbColor="#000"
                    activethumbColor="#000"
                  />
                </View>
              </View>

              <View
                style={{
                  marginTop: normalize(12),
                  backgroundColor: '#434540',
                  width: '100%',
                  height: 1,
                }}></View>

              {/* <View style={style.containerBody}>
              <View style={style.contentBody}>
                <View style={style.contentBodyblw}>
                  <Text style={style.text}>Payment</Text>
                </View>

                <RNSwitch
                  handleOnPress={() => {
                    // getNearByGroups();
                    setPayment(!payment);
                    updateNotification('payment');
                  }}
                  value={payment ? 1 : 0}
                  activeTrackColor="#C4FD65"
                  inActiveTrackColor="#CECECE"
                  thumbColor="#000"
                  activethumbColor="#000"
                />
              </View>
            </View> */}

              {/* <View
              style={{
                marginTop: normalize(12),
                backgroundColor: '#434540',
                width: '100%',
                height: 1,
              }}></View> */}

              <View style={style.containerBody}>
                <View style={style.contentBody}>
                  <View style={style.contentBodyblw}>
                    <Text style={style.text}>Content review</Text>
                  </View>

                  <RNSwitch
                    handleOnPress={() => {
                      // getNearByGroups();
                      setContentReview(prev => !prev);
                      console.log(contentReview);
                      getNotificationChange('contentreview');
                    }}
                    value={contentReview ? 0 : 1}
                    activeTrackColor="#C4FD65"
                    inActiveTrackColor="#CECECE"
                    thumbColor="#000"
                    activethumbColor="#000"
                  />
                </View>
              </View>

              <View
                style={{
                  marginTop: normalize(12),
                  backgroundColor: '#434540',
                  width: '100%',
                  height: 1,
                }}></View>

              {/* <View style={style.containerBody}>
              <View style={style.contentBody}>
                <View style={style.contentBodyblw}>
                  <Text style={style.text}>Email notifications</Text>
                </View>

                <RNSwitch
                  handleOnPress={() => {
                    // getNearByGroups();
                    setEmailNotifications(!emailNotifications);
                    updateNotification('emailNotifications');
                  }}
                  value={emailNotifications ? 1 : 0}
                  activeTrackColor="#C4FD65"
                  inActiveTrackColor="#CECECE"
                  thumbColor="#000"
                  activethumbColor="#000"
                />
              </View>
            </View> */}
            </>
          </ScrollView>
        </View>
        {/* </SafeAreaView> */}
      </SafeAreaView>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    // flex: 1,
    paddingHorizontal: normalize(10),
    height: Dimensions.get('screen').height,
  },
  containerBody: {
    marginTop: normalize(7),
    borderRadius: normalize(7),
  },
  contentBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(6),
  },
  contentBodyblw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: normalize(12),
    marginStart: normalize(3),
    fontFamily: Fonts.Inter_Medium,
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
});

export default PushNotifications;
