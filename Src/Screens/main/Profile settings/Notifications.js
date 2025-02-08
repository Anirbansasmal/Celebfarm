import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
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
import {useDispatch, useSelector} from 'react-redux';
import HeaderCommon from '../../../Components/HeaderCommon';
import {
  getNotificationReadRequest,
  getNotificationRequest,
  getNotificationUpdateRequest,
} from '../../../redux/reducers/ProfileReducer';
import moment from 'moment';
import Fallback from '../../auth/Fallback';
var status = '';
function Notifications(props) {
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);

  const [data, setNotification] = useState([
    ...(ProfileReducer?.notificationResponse?.result ?? ''),
  ]);
  useEffect(() => {
    try {
      var obj = 'creatorID=' + AuthReducer?.creatorID;
      setTimeout(() => {
        // dispatch(getNotificationRequest(obj));
        readNotification();
      }, 2000);
    } catch (error) {}
  }, []);

  function readNotification(notificationID) {
    try {
      var obj = 'creatorID=' + AuthReducer?.creatorID;
      dispatch(getNotificationReadRequest(obj));
    } catch (error) {}
  }

  // const renderData = ({item, index}) => {
  //   return (
  //     <View style={{}}>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           // paddingHorizontal: normalize(3),
  //           paddingVertical: normalize(10),
  //           justifyContent: 'space-between',
  //         }}>
  //         <ImageBackground
  //           source={item?.proimage}
  //           style={{height: normalize(36), width: normalize(36)}}
  //           resizeMode="contain">
  //           <Image
  //             source={item?.proimage1}
  //             style={{
  //               height: normalize(16),
  //               width: normalize(16),
  //               alignSelf: 'flex-end',
  //               position: 'absolute',
  //               bottom: normalize(-4),
  //               end: normalize(-5),
  //             }}
  //             resizeMode="contain"
  //           />
  //         </ImageBackground>
  //         <View style={{width: '84%', marginStart: normalize(0)}}>
  //           <Text style={{color: Colors.white, fontFamily: Fonts.Inter_Medium}}>
  //             {item?.content}
  //           </Text>
  //           <View style={{flexDirection: 'row', marginTop: normalize(12)}}>
  //             {item?.typ == 'invite' ? (
  //               <>
  //                 <Button
  //                   width={normalize(50)}
  //                   height={normalize(22)}
  //                   alignSelf={'center'}
  //                   backgroundColor={Colors.black}
  //                   title={'Reject'}
  //                   textColor={Colors.white}
  //                   titlesingle={true}
  //                   borderRadius={normalize(25)}
  //                   marginHorizontal={normalize(0)}
  //                   fontSize={normalize(10)}
  //                   btnBottom={0}
  //                   onPress={() => {
  //                   }}
  //                 />
  //                 <Button
  //                   width={normalize(60)}
  //                   height={normalize(22)}
  //                   alignSelf={'center'}
  //                   backgroundColor={'#06B863'}
  //                   title={'Accept'}
  //                   textColor={Colors.white}
  //                   fontSize={normalize(10)}
  //                   titlesingle={true}
  //                   borderRadius={normalize(25)}
  //                   marginHorizontal={normalize(5)}
  //                   btnBottom={0}
  //                   onPress={() => {
  //                   }}
  //                 />
  //               </>
  //             ) : null}
  //             {item?.typ == 'offer' ? (
  //               <>
  //                 <Button
  //                   width={normalize(50)}
  //                   height={normalize(22)}
  //                   alignSelf={'center'}
  //                   backgroundColor={Colors.black}
  //                   title={'Reject'}
  //                   textColor={Colors.white}
  //                   titlesingle={true}
  //                   borderRadius={normalize(25)}
  //                   marginHorizontal={normalize(0)}
  //                   fontSize={normalize(10)}
  //                   btnBottom={0}
  //                   onPress={() => {

  //                   }}
  //                 />
  //                 <Button
  //                   width={normalize(80)}
  //                   height={normalize(22)}
  //                   alignSelf={'center'}
  //                   backgroundColor={'#fff'}
  //                   title={'Counteroffer'}
  //                   textColor={Colors.black}
  //                   titlesingle={true}
  //                   fontSize={normalize(10)}
  //                   borderRadius={normalize(25)}
  //                   // marginHorizontal={normalize(5)}
  //                   btnBottom={0}
  //                   onPress={() => {

  //                   }}
  //                 />
  //                 <Button
  //                   width={normalize(50)}
  //                   height={normalize(22)}
  //                   alignSelf={'center'}
  //                   backgroundColor={'#06B863'}
  //                   title={'Accept'}
  //                   textColor={Colors.white}
  //                   titlesingle={true}
  //                   borderRadius={normalize(25)}
  //                   marginHorizontal={normalize(5)}
  //                   fontSize={normalize(10)}
  //                   btnBottom={0}
  //                   onPress={() => {

  //                   }}
  //                 />
  //               </>
  //             ) : null}
  //             <Text
  //               style={{
  //                 color: Colors.white,
  //                 fontFamily: Fonts.Inter_Medium,
  //                 position: 'absolute',
  //                 end: 0,
  //               }}>
  //               {item?.time}
  //             </Text>
  //           </View>
  //         </View>
  //       </View>
  //       <View
  //         style={{
  //           width: '100%',
  //           backgroundColor: '#434540',
  //           height: normalize(1),
  //           marginTop: normalize(7),
  //         }}
  //       />
  //     </View>
  //   );
  // };

  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/getNotificationRequest':
        status = ProfileReducer.status;
        break;

      case 'Profile/getNotificationSuccess':
        status = ProfileReducer.status;
        console.log('hgfgcvcb youtube', ProfileReducer?.youtubeuserResponse);
        setNotification([
          ...(ProfileReducer?.notificationResponse?.result ?? ''),
        ]);
        break;
      case 'Profile/getNotificationFailure':
        status = ProfileReducer.status;
        break;
      // case 'homeCollab/getBarterRequest':
      //   status1 = ProfileReducer.status;
      //   break;

      // case 'homeCollab/getBarterSuccess':
      //   status1 = ProfileReducer.status;
      //   console.log('hgfgcvcb');
      //   // setBarter([...ProfileReducer?.productResponse?.result]);
      //   break;
      // case 'homeCollab/getBarterFailure':
      //   status1 = ProfileReducer.status;
      //   break;
    }
  }

  const renderData = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{}}
        onPress={() => {
          (item?.status == 'Approved' &&
            item?.deliverableType !== '' &&
            item?.contentHubID) ||
          (item?.status == 'Accepted' && item?.deliverableType == '')
            ? props?.navigation?.navigate(
                item?.campaignType == 'UGC'
                  ? 'DeliverableApprovedContent'
                  : item?.campaignType == 'Barter' && item?.contentHubID
                  ? 'DeliverableApproved'
                  : item?.deliverableType == ''
                  ? 'Collaboration'
                  : '',
                {
                  progress: {
                    campaignID: item?.campaignID,
                    brandName: item?.brandName,
                    brandImageUrl: item?.brandImage,
                    campaignTitle: item?.campaignTitle,
                    platform: item?.platformType,
                    campaignType: item?.campaignType,
                    campaignDate: item?.createdDate,
                  },
                  deliverable: {
                    name: item?.deliverableType,
                    status: item?.status,
                    contentHubID: item?.contentHubID,
                  },
                },
              )
            : item?.status == 'ChangeRequired'
            ? props?.navigation?.navigate('DeliverableApproved', {
                progress: {
                  campaignID: item?.campaignID,
                  brandName: item?.brandName,
                  brandImageUrl: item?.brandImage,
                  campaignTitle: item?.campaignTitle,
                  platform: item?.platformType,
                  campaignType: item?.campaignType,
                  campaignDate: item?.createdDate,
                },
                deliverable: {
                  name: item?.deliverableType,
                  status: item?.status,
                  contentHubID: item?.contentHubID,
                },
              })
            : null;
        }}
        activeOpacity={0.8}>
        <View
          style={{
            flexDirection: 'row',
            // paddingHorizontal: normalize(3),
            paddingVertical: normalize(10),
            justifyContent: 'space-between',
          }}>
          <ImageBackground
            source={{uri: item?.brandImage}}
            style={{height: normalize(36), width: normalize(36)}}
            imageStyle={{borderRadius: normalize(7)}}
            resizeMode="contain"
          />

          <View style={{width: '86%', marginStart: normalize(0)}}>
            <Text style={{color: Colors.white, fontFamily: Fonts.Inter_Medium}}>
              {item?.message}
            </Text>
            <View
              style={{
                borderRadius: normalize(7),
                // alignItems: 'center',
                backgroundColor: Colors.white,
                marginTop: normalize(12),
                // padding: normalize(12),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginStart: normalize(10),
                  marginEnd: normalize(10),
                  marginTop: normalize(10),
                  marginBottom:
                    (item?.status == 'Approved' &&
                      item?.deliverableType !== '' &&
                      item?.contentHubID) ||
                    (item?.status == 'Accepted' && item?.deliverableType == '')
                      ? normalize(0)
                      : normalize(10),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '60%',
                  }}>
                  {/* <View style={{flexDirection:'row', width:'70%'}}> */}
                  <Image
                    source={
                      item?.status == 'Approved'
                        ? Icons.active
                        : {uri: item?.campaignImage}
                    }
                    style={{height: normalize(33), width: normalize(33)}}
                    resizeMode="contain"
                  />
                  <View style={{marginStart: normalize(7), width: '80%'}}>
                    <Text
                      style={{
                        fontFamily: Fonts.Inter_Medium,
                        fontSize: normalize(14),
                        color: Colors.black,
                      }}>
                      {item?.status == 'Accepted'
                        ? item?.campaignTitle
                        : item?.deliverableType}
                    </Text>
                    {item?.status == 'Accepted' ? (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          source={
                            item?.platformType == 'Instagram'
                              ? Icons.insta
                              : Icons.youtube
                          }
                          style={{height: normalize(12), width: normalize(12)}}
                          resizeMode="contain"
                        />
                        <View
                          style={{
                            height: normalize(6),
                            width: normalize(6),
                            borderRadius: normalize(6),
                            backgroundColor: Colors.black,
                            marginStart: normalize(6),
                          }}
                        />
                        <Image
                          source={Icons.ActiveInprogress}
                          style={{
                            height: normalize(12),
                            width: normalize(12),
                            marginStart: normalize(6),
                          }}
                          resizeMode="contain"
                        />
                        <Text
                          style={{
                            color: Colors.black,
                          }}>
                          {item?.totalDeliverable}
                        </Text>
                      </View>
                    ) : (
                      <Text
                        style={{
                          fontFamily: Fonts.Inter_Medium,
                          fontSize: normalize(10),
                        }}>
                        {moment(item?.createdDate).format('DD MMMM YYYY')}
                      </Text>
                    )}
                  </View>
                  {/* </View> */}
                </View>
                {item?.status == 'Approved' || 'Change Required' ? (
                  <Button
                    width={
                      item?.status == 'Approved'
                        ? normalize(80)
                        : normalize(100)
                    }
                    height={normalize(27)}
                    alignSelf={'center'}
                    backgroundColor={
                      item?.status == 'Approved'
                        ? '#06B8631A'
                        : item?.status == 'Accepted'
                        ? '#06B8631A'
                        : '#F6E9E9'
                    }
                    title={
                      item?.status == 'Approved'
                        ? 'Approved'
                        : item?.status == 'Accepted'
                        ? 'Accepted'
                        : 'Change Required'
                    }
                    textColor={
                      item?.status == 'Approved'
                        ? Colors.green
                        : item?.status == 'Accepted'
                        ? Colors.green
                        : Colors.red
                    }
                    fontSize={normalize(10)}
                    titlesingle={true}
                    borderRadius={normalize(25)}
                    btnBottom={0}
                    onPress={() => {
                      item?.status == 'Approved'
                        ? props?.navigation?.navigate(
                            item?.campaignType == 'UGC'
                              ? 'DeliverableApprovedContent'
                              : 'DeliverableApproved',
                            {
                              progress: {
                                campaignID: item?.campaignID,
                                brandName: item?.brandName,
                                brandImageUrl: item?.brandImage,
                                campaignTitle: item?.campaignTitle,
                                platform: item?.platformType,
                                campaignType: item?.campaignType,
                                campaignDate: item?.createdDate,
                                contentHubID: item?.contentHubID,
                              },
                              deliverable: {
                                name: item?.deliverableType,
                                status: item?.status,
                              },
                            },
                          )
                        : item?.status == 'ChangeRequired'
                        ? props?.navigation?.navigate('DeliverableApproved', {
                            progress: {
                              campaignID: item?.campaignID,
                              brandName: item?.brandName,
                              brandImageUrl: item?.brandImage,
                              campaignTitle: item?.campaignTitle,
                              platform: item?.platformType,
                              campaignType: item?.campaignType,
                              campaignDate: item?.createdDate,
                              contentHubID: item?.contentHubID,
                            },
                            deliverable: {
                              name: item?.deliverableType,
                              status: item?.status,
                            },
                          })
                        : null;
                    }}
                  />
                ) : null}
              </View>
              {(item?.status == 'Approved' &&
                item?.deliverableType !== '' &&
                item?.contentHubID) ||
              (item?.status == 'Accepted' && item?.deliverableType == '') ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#252525',
                    marginTop: normalize(19),
                    paddingStart: normalize(9),
                    paddingTop: normalize(3),
                    paddingBottom: normalize(5),
                    borderBottomLeftRadius: normalize(7),
                    borderBottomRightRadius: normalize(7),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.Inter_Regular,
                      color: Colors.white,
                    }}>
                    {item?.status == 'Approved'
                      ? 'Mark Live'
                      : item?.status == 'ChangeRequired'
                      ? ''
                      : 'View Offer'}
                  </Text>
                  <Image
                    source={Icons.arrow}
                    style={{
                      height: normalize(10),
                      width: normalize(10),
                      marginEnd: normalize(7),
                    }}
                    resizeMode="contain"
                  />
                </View>
              ) : null}
            </View>

            <View style={{flexDirection: 'row', marginTop: normalize(9)}}>
              {/* {item?.typ == 'invite' ? (
                <>
                  <Button
                    width={normalize(50)}
                    height={normalize(22)}
                    alignSelf={'center'}
                    backgroundColor={Colors.black}
                    title={'Reject'}
                    textColor={Colors.white}
                    titlesingle={true}
                    borderRadius={normalize(25)}
                    marginHorizontal={normalize(0)}
                    fontSize={normalize(10)}
                    btnBottom={0}
                    onPress={() => {}}
                  />
                </>
              ) : null}
              {item?.typ == 'offer' ? (
                <>
                  <Button
                    width={normalize(50)}
                    height={normalize(22)}
                    alignSelf={'center'}
                    backgroundColor={Colors.black}
                    title={'Reject'}
                    textColor={Colors.white}
                    titlesingle={true}
                    borderRadius={normalize(25)}
                    marginHorizontal={normalize(0)}
                    fontSize={normalize(10)}
                    btnBottom={0}
                    onPress={() => {}}
                  />
                  <Button
                    width={normalize(80)}
                    height={normalize(22)}
                    alignSelf={'center'}
                    backgroundColor={'#fff'}
                    title={'Counteroffer'}
                    textColor={Colors.black}
                    titlesingle={true}
                    fontSize={normalize(10)}
                    borderRadius={normalize(25)}
                    // marginHorizontal={normalize(5)}
                    btnBottom={0}
                    onPress={() => {}}
                  />
                  <Button
                    width={normalize(50)}
                    height={normalize(22)}
                    alignSelf={'center'}
                    backgroundColor={'#06B863'}
                    title={'Accept'}
                    textColor={Colors.white}
                    titlesingle={true}
                    borderRadius={normalize(25)}
                    marginHorizontal={normalize(5)}
                    fontSize={normalize(10)}
                    btnBottom={0}
                    onPress={() => {}}
                  />
                </>
              ) : null} */}
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: Fonts.Inter_Medium,
                  position: 'absolute',
                  end: 0,
                }}>
                {moment(item?.createdDate).format('hh:mm a')}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: '#434540',
            height: normalize(1),
            marginTop: normalize(19),
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
        <HeaderCommon
          picTitle={true}
          home={true}
          back={true}
          notifi={false}
          backgroundColor={'#000'}
          title={'Notifications'}
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
        {ProfileReducer?.status == 'Profile/getNotificationRequest' ? (
          <Fallback />
        ) : (
          <View style={style.container}>
            <ScrollView>
              <>
                <View
                  style={{
                    marginTop: normalize(12),
                    marginBottom: normalize(29),
                  }}>
                  <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderData}
                  />
                </View>

                <View
                  style={{
                    marginTop: normalize(82),
                  }}></View>
              </>
            </ScrollView>
          </View>
        )}
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

export default Notifications;
