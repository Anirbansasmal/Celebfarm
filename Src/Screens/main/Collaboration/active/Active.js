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
import {Colors, Fonts} from '../../../../themes/Themes';
import normalize from '../../../../utils/helpers/dimen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../../themes/icons';
import Images from '../../../../themes/Images';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getActiveDetailsRequest} from '../../../../redux/reducers/CollaborationReducer';
import connectionrequest from '../../../../utils/helpers/NetInfo';
import moment from 'moment';
import ImageProfile from '../../../../Components/ImageProfile';
import HeaderCommon from '../../../../Components/HeaderCommon';
import Fallback from '../../../auth/Fallback';
var status = '';

function Active(props) {
  const dispatch = useDispatch();
  const CollaborationReducer = useSelector(state => state.CollaborationReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [isShow, setShow] = useState(0);
  const [deliverable, setDeliverable] = useState([]);
  const [activeCollab, setActiveCollab] = useState();

  useEffect(() => {
    const unsuscribe = props.navigation.addListener('focus', payload => {
      active();
    });
    return () => {
      unsuscribe();
    };
  }, []);

  function active() {
    console.log(props?.route?.params?.campaignID);
    var obj =
      'campaignID=' +
      props?.route?.params?.campaignID +
      '&' +
      'creatorID=' +
      AuthReducer?.creatorID;
    try {
      connectionrequest()
        .then(() => {
          dispatch(getActiveDetailsRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (error) {
      console.log(error);
    }
  }

  if (status == '' || CollaborationReducer.status != status) {
    switch (CollaborationReducer.status) {
      case 'collaboration/getActiveDetailsRequest':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/getActiveDetailsSuccess':
        status = CollaborationReducer.status;
        console.log('hgfgcvcb');
        setActiveCollab(CollaborationReducer?.activeDetailsResponse ?? '');
        setDeliverable([
          ...(CollaborationReducer?.activeDetailsResponse?.deliverables ?? ''),
        ]);
        break;
      case 'collaboration/getActiveDetailsFailure':
        status = CollaborationReducer.status;
        break;
    }
  }

  const renderDeliverable = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: normalize(8),
            justifyContent: 'space-between',
            backgroundColor: Colors.bcolor,
            borderRadius: normalize(6),
            paddingHorizontal: normalize(12),
            paddingVertical: normalize(7),
            borderWidth: normalize(1),
            borderColor: '#2A2C27',
          }}
          activeOpacity={0.9}
          onPress={() =>
            item?.status == 'In Progress'
              ? props.navigation.navigate('Deliverable', {
                  progress: activeCollab,
                  deliverable: item,
                })
              : item?.status == 'InReview'
              ? props.navigation.navigate('Deliverable', {
                  progress: activeCollab,
                  deliverable: item,
                })
              : item?.status == 'Live'
              ? props.navigation.navigate('DeliverableLive', {
                  progress: activeCollab,
                  deliverable: item,
                })
              : item?.status == 'Approved'
              ? props.navigation.navigate('DeliverableApproved', {
                  progress: activeCollab,
                  deliverable: item,
                })
              : item?.status == 'ChangeRequired'
              ? props.navigation.navigate('DeliverableApproved', {
                  progress: activeCollab,
                  deliverable: item,
                })
              : null
          }>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={
                item?.status == 'In Progress'
                  ? Icons.active
                  : item?.status == 'InReview'
                  ? Icons.active5
                  : item?.status == 'ChangeRequired'
                  ? Icons.active6
                  : item?.status == 'Approved'
                  ? Icons.active2
                  : item?.status == 'Live'
                  ? Icons.active3
                  : Icons.active4
              }
              style={{height: normalize(27), width: normalize(27)}}
              resizeMode="contain"
            />
            <Text
              style={[
                {
                  ...style.text4,
                  color: Colors.white,
                  fontSize: normalize(12),
                  marginTop: normalize(6),
                },
              ]}>
              {item?.name}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                alignItems: 'center',
                paddingHorizontal: normalize(12),
                paddingVertical: normalize(4),
                backgroundColor:
                  item?.status == 'In Progress'
                    ? '#21292F'
                    : item?.status == 'InReview'
                    ? '#2E2A1D'
                    : item?.status == 'ChangeRequired'
                    ? '#2C201F'
                    : item?.status == 'Live'
                    ? '#22202F'
                    : item?.status == 'Payment'
                    ? '#302E30'
                    : item?.status == 'Approved'
                    ? '#162820'
                    : '#302E30',
                borderRadius: normalize(19),
              }}>
              <Text
                style={[
                  {
                    ...style.text4,
                    color:
                      item?.status == 'In Progress'
                        ? Colors.deli1
                        : item?.status == 'InReview'
                        ? Colors.yellowlight
                        : item?.status == 'ChangeRequired'
                        ? '#E16162'
                        : item?.status == 'Live'
                        ? Colors.purple
                        : item?.status == 'Payment'
                        ? Colors.white
                        : Colors.greenDark,
                    fontSize: normalize(12),
                    opacity: 1,
                    marginStart: 0,
                  },
                ]}>
                {item?.status == 'In Progress'
                  ? 'In Progress'
                  : item?.status == 'InReview'
                  ? 'In Review'
                  : item?.status == 'Live'
                  ? 'Live'
                  : item?.status == 'ChangeRequired'
                  ? 'Change Required'
                  : item?.status == 'Approved'
                  ? 'Approved'
                  : 'Payment'}
              </Text>
            </View>
            <Image
              source={Icons.arrow_right}
              style={{
                height: normalize(14),
                width: normalize(18),
                marginStart: normalize(12),
              }}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
      <HeaderCommon
        picTitle={true}
        home={true}
        back={true}
        backgroundColor={'#000'}
        title={'Active'}
        heardetext={Colors.white}
        headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(51)}
        textfontSize={normalize(16)}
        fontFamily={Fonts.Inter_Bold}
        backScreen={() => {
          props.navigation.goBack();
        }}
        notifiPress={() => props.navigation.navigate('Notifications')}
        profilePress={() => props.navigation.navigate('Chat')}
        // marginStart={normalize(33)}
        textColor={'#ffff'}
        {...props}
      />
      {CollaborationReducer.status ==
      'collaboration/getActiveDetailsRequest' ? (
        <Fallback />
      ) : (
        <View style={style.container}>
          <View
            style={{
              marginTop: normalize(12),
            }}>
            <View
              style={{
                borderRadius: normalize(4),
                borderWidth: normalize(1),
                borderColor: Colors.borderColor,
                paddingHorizontal: normalize(9),
                marginTop: normalize(12),
                backgroundColor: Colors.bcolor,
                marginBottom: normalize(18),
              }}>
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
                  {/* <View style={{borderRadius:normalize(12),padding:normalize(1),backgroundColor:Colors.white}}>
                  <ImageBackground
                    source={
                      activeCollab?.brandImageUrl == ''ƒ
                        ? Images.profile
                        : {uri: activeCollab?.brandImageUrl}
                    }
                    style={style.profileCollabr}
                    imageStyle={{borderRadius: normalize(12)}}
                    resizeMode="contain"
                  /></View> */}
                  <ImageProfile
                    alignItems={'center'}
                    height={normalize(18)}
                    width={normalize(18)}
                    borderRadius={normalize(4)}
                    backgroundColor={Colors.white}
                    brandImageUrl={activeCollab?.brandImageUrl}
                    imgheight={normalize(16)}
                    imgwidth={normalize(16)}
                    justifyContent={'center'}
                  />
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(10),
                      marginStart: normalize(3),
                      fontFamily: Fonts.Inter_Medium,
                    }}>
                    {activeCollab?.brandName}
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
                        activeCollab?.campaignType == 'Barter'
                          ? Colors.collab1
                          : activeCollab?.campaignType == 'Paid'
                          ? Colors.collab2
                          : activeCollab?.campaignType == 'contentlab'
                          ? Colors.collab3
                          : activeCollab?.campaignType == 'barteroffer'
                          ? Colors.collab1
                          : activeCollab?.campaignType == 'Paid+'
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
                      {activeCollab?.campaignType == 'barteroffer'
                        ? 'Barter'
                        : activeCollab?.campaignType == 'paid+gift'
                        ? 'Paid'
                        : activeCollab?.campaignType}
                    </Text>
                  </TouchableOpacity>

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
                      activeCollab?.platform === 'Instagram'
                        ? Icons.insta
                        : Icons.youtube
                    }
                    style={style.profileCollabration}
                    resizeMode="contain"
                  />
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
                    {moment(activeCollab?.campaignDate).format('DD MMM')}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: normalize(7),
                  marginBottom: normalize(9),
                }}>
                {activeCollab?.campaignType == 'Barter' &&
                activeCollab?.discount == null ? (
                  <Image
                    source={
                      activeCollab?.campaignImageURL == ''
                        ? Images.dyning
                        : {uri: activeCollab?.campaignImageURL}
                    }
                    style={{
                      height: normalize(70),
                      width: normalize(70),
                    }}
                    resizeMode="cover"
                  />
                ) : null}

                {/* {activeCollab?.discount != '' ? (
              <View>
                <ImageBackground
                  source={Images.dyning}
                  style={{
                    height: normalize(50),
                    width: normalize(70),
                  }}
                  imageStyle={{borderRadius: normalize(5)}}
                  resizeMode="cover"
                /> */}
                {/* <View
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
                </View> */}
                {/* </View>
            ) : null} */}

                <View
                  style={{
                    marginStart:
                      activeCollab?.campaignType == 'Barter' ||
                      activeCollab?.campaignType == 'barteroffer'
                        ? normalize(12)
                        : normalize(0),
                    justifyContent: 'space-between',
                    width:
                      activeCollab?.campaignType == 'Barter' ||
                      activeCollab?.discount != ''
                        ? '75%'
                        : '100%',
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(12),
                      fontFamily: Fonts.Inter_SemiBold,
                    }}>
                    {activeCollab?.campaignType == 'Barter' &&
                    activeCollab?.discount != ''
                      ? activeCollab?.campaignTitle?.substring(0, 48)
                      : activeCollab?.campaignType == 'Barter'
                      ? activeCollab?.campaignTitle?.substring(0, 28)
                      : activeCollab?.campaignType == 'Paid+'
                      ? activeCollab?.campaignTitle?.substring(0, 48)
                      : activeCollab?.campaignTitle?.substring(0, 48)}
                  </Text>
                  {/* <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(11),
                      fontFamily: Fonts.Inter_Regular,
                      width: '80%',
                      marginTop: normalize(6),
                    }}>
                    {activeCollab?.campaignType == 'Barter' &&
                    activeCollab?.discount != ''
                      ? 'From ' +
                        moment(activeCollab?.fromDate).format('DD MMM') +
                        ' to ' +
                        moment(activeCollab?.toDate).format('DD MMM')
                      : activeCollab?.campaignType == 'Barter'
                      ? activeCollab?.barterProductDesc?.substring(0, 78)
                      : activeCollab?.campaignType == 'Paid'
                      ? activeCollab?.paidCampaignDesc?.substring(0, 80)
                      : ''}
                  </Text> */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      // backgroundColor:Colors.red,
                      marginTop:
                        activeCollab?.campaignType == 'Barter'
                          ? normalize(7)
                          : activeCollab?.type == 'Paid'
                          ? normalize(7)
                          : normalize(10),
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
                        {activeCollab?.totalDeliverable}
                      </Text>
                    </View>
                    {/* {activeCollab?.campaignType == 'Barter' ||
                    activeCollab?.discount !== '' ? null : (
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(12),
                          fontFamily: Fonts.Inter_SemiBold,
                        }}>
                        ${activeCollab?.totalDeliverables}
                      </Text>
                    )} */}
                  </View>
                </View>
              </View>
              {activeCollab?.campaignType == 'Paid+' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: normalize(10),
                  }}>
                  <ImageBackground
                    source={
                      activeCollab?.brandImageUrl
                        ? {uri: activeCollab?.brandImageUrl}
                        : Images.dyning
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
                    {activeCollab?.campaignDesc?.substring(0, 90)}
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={{marginTop: normalize(0)}}></View>
            <Text
              style={[
                {
                  ...style.text4,
                  color: Colors.white,
                  marginStart: normalize(0),
                  fontFamily: Fonts.Inter_Bold,
                  opacity: 1,
                },
              ]}>
              Report
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: normalize(9),
                justifyContent: 'space-between',
              }}>
              <View style={style.card}>
                <Text
                  style={[
                    {
                      ...style.text4,
                      color: Colors.white,
                      fontSize: normalize(10),
                      opacity: 1,
                      fontFamily: Fonts.Inter_Regular,
                    },
                  ]}>
                  In progress
                </Text>
                <Text
                  style={[
                    {
                      ...style.text4,
                      color: Colors.white,
                      fontSize: normalize(16),
                      marginTop: normalize(3),
                      opacity: 1,
                      fontFamily: Fonts.Inter_SemiBold,
                    },
                  ]}>
                  {activeCollab?.campaignReport['inProgress'] ?? ''}
                </Text>
              </View>

              <View style={style.card}>
                <Text
                  style={[
                    {
                      ...style.text4,
                      color: Colors.white,
                      fontSize: normalize(12),
                      opacity: 1,
                      fontFamily: Fonts.Inter_Regular,
                    },
                  ]}>
                  Approved
                </Text>
                <Text
                  style={[
                    {
                      ...style.text4,
                      color: Colors.white,
                      fontSize: normalize(16),
                      marginTop: normalize(3),
                      opacity: 1,
                      fontFamily: Fonts.Inter_SemiBold,
                    },
                  ]}>
                  {activeCollab?.campaignReport['approved']}
                </Text>
              </View>
              <View style={style.card}>
                <Text
                  style={[
                    {
                      ...style.text4,
                      color: Colors.white,
                      fontSize: normalize(12),
                      opacity: 1,
                      fontFamily: Fonts.Inter_Regular,
                    },
                  ]}>
                  Live
                </Text>
                <Text
                  style={[
                    {
                      ...style.text4,
                      color: Colors.white,
                      fontSize: normalize(16),
                      marginTop: normalize(3),
                      opacity: 1,
                      fontFamily: Fonts.Inter_SemiBold,
                    },
                  ]}>
                  {activeCollab?.campaignReport['live']}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: normalize(12),
                alignItems: 'center',

                // justifyContent: 'space-between',
              }}>
              <View>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => setShow(0)}>
                  <Image
                    source={Icons.document_upload}
                    style={{height: normalize(18), width: normalize(18)}}
                    resizeMode="contain"
                  />
                  <Text
                    style={[
                      {
                        ...style.text4,
                        color: Colors.white,
                        fontSize: normalize(12),
                        opacity: isShow == 0 ? 1 : 0.7,
                        fontFamily:
                          isShow == 0
                            ? Fonts.Inter_Medium
                            : Fonts.Inter_Regular,
                      },
                    ]}>
                    Deliverables
                  </Text>
                </TouchableOpacity>
                {isShow == 0 ? (
                  <Image
                    source={Icons.lineborder}
                    style={{
                      height: normalize(3.7),
                      width:
                        isShow == 0
                          ? Dimensions.get('screen').width - 275
                          : Dimensions.get('screen').width - 205,
                      marginTop: normalize(9),
                      position: 'absolute',
                      top: normalize(12),
                      zIndex: 1,
                    }}
                  />
                ) : null}
              </View>

              <View>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginStart: normalize(19),
                  }}
                  onPress={() => setShow(1)}>
                  <Image
                    source={Icons.document_upload_grey}
                    style={{height: normalize(18), width: normalize(18)}}
                    resizeMode="contain"
                  />
                  <Text
                    style={[
                      {
                        ...style.text4,
                        color: Colors.white,
                        fontSize: normalize(12),
                        opacity: isShow == 1 ? 1 : 0.7,
                        fontFamily:
                          isShow == 1
                            ? Fonts.Inter_Medium
                            : Fonts.Inter_Regular,
                      },
                    ]}>
                    Creator Brief
                  </Text>
                </TouchableOpacity>
                {isShow != 0 ? (
                  <Image
                    source={Icons.lineborder}
                    style={{
                      height: normalize(3.7),
                      width:
                        isShow == 0
                          ? Dimensions.get('screen').width - 275
                          : Dimensions.get('screen').width - 275,
                      marginTop: normalize(9),
                      marginStart: normalize(19),
                      position: 'absolute',
                      top: normalize(12),
                    }}
                  />
                ) : null}
              </View>
            </View>

            <View
              style={{
                height: normalize(1.7),
                width: Dimensions.get('screen').width,
                backgroundColor: '#2A2C27',
                justifyContent: isShow == 0 ? 'space-between' : 'flex-start',
                marginTop: normalize(7),
                flexDirection: 'row',
              }}
            />
          </View>
          {isShow == 0 ? (
            <ScrollView>
              <View style={{flex: 1}}>
                <FlatList
                  data={deliverable}
                  renderItem={renderDeliverable}
                  keyExtractor={item => item.toString()}
                  style={{height: '100%', width: '100%'}}
                />
              </View>
            </ScrollView>
          ) : (
            <>
              {activeCollab?.creatorBrief ? (
                <ScrollView>
                  <View
                    style={{flexDirection: 'row', marginTop: normalize(12)}}>
                    <Image
                      source={{
                        uri: activeCollab?.brandImageUrl,
                      }}
                      style={{height: normalize(70), width: normalize(70)}}
                      resizeMode="contain"
                    />
                    <View style={{marginStart: normalize(12)}}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(12),
                          fontFamily: Fonts.Inter_Bold,
                        }}>
                        {activeCollab?.brandName}
                      </Text>
                      <Text
                        style={{
                          color: '#CECECE',
                          fontSize: normalize(10),
                          fontFamily: Fonts.Inter_Medium,
                        }}>
                        {activeCollab?.brandIndustry}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: normalize(12),
                        }}>
                        <Image
                          source={Icons.location}
                          style={{height: normalize(12), width: normalize(12)}}
                        />
                        <Text
                          style={{
                            color: '#CECECE',
                            fontSize: normalize(10),
                            fontFamily: Fonts.Inter_Medium,
                            marginStart: normalize(10),
                          }}>
                          {activeCollab?.brandCity}
                          {','} {activeCollab?.brandCountry}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    {activeCollab?.creatorBrief?.overview ? (
                      <>
                        <View style={style.creatorBrief}>
                          <View style={style.imageCont}>
                            <Image
                              source={Icons.image1}
                              style={{
                                height: normalize(12),
                                width: normalize(12),
                              }}
                            />
                          </View>
                          <Text style={style.textCreate}>
                            {/* {activeCollab?.creatorBrief?.brandDetails?.country} */}
                            About
                          </Text>
                        </View>
                        <Text style={style.textDesc}></Text>
                      </>
                    ) : null}
                    {activeCollab?.creatorBrief?.brandingTone ? (
                      <>
                        <View style={style.creatorBrief}>
                          <View style={style.imageCont}>
                            <Image
                              source={Icons.image1}
                              style={{
                                height: normalize(12),
                                width: normalize(12),
                              }}
                            />
                          </View>
                          <Text style={style.textCreate}>Branding tone</Text>
                        </View>
                        <Text style={style.textDesc}>
                          {activeCollab?.creatorBrief?.brandingTone}
                        </Text>
                      </>
                    ) : null}

                    {activeCollab?.creatorBrief?.talkingPoints ? (
                      <>
                        <View style={style.creatorBrief}>
                          <View style={style.imageCont}>
                            <Image
                              source={Icons.image1}
                              style={{
                                height: normalize(12),
                                width: normalize(12),
                              }}
                            />
                          </View>
                          <Text style={style.textCreate}>Talking points</Text>
                        </View>
                        {activeCollab?.creatorBrief?.talkingPoints?.map(
                          (item, index) => {
                            return (
                              <Text style={style.textDesc}>
                                {index + 1}
                                {'. '}
                                {item?.points}
                              </Text>
                            );
                          },
                        )}
                      </>
                    ) : null}
                    {activeCollab?.creatorBrief?.dos ? (
                      <>
                        <View style={style.creatorBrief}>
                          <View style={style.imageCont}>
                            <Image
                              source={Icons.image1}
                              style={{
                                height: normalize(12),
                                width: normalize(12),
                              }}
                            />
                          </View>
                          <Text style={style.textCreate}>
                            {/* {activeCollab?.creatorBrief?.brandDetails?.country} */}
                            do's
                          </Text>
                        </View>
                        {activeCollab?.creatorBrief?.dos?.map((item, index) => {
                          return (
                            <Text style={style.textDesc}>
                              {index + 1}
                              {'. '}
                              {item?.desc}
                            </Text>
                          );
                        })}
                      </>
                    ) : null}
                    {activeCollab?.creatorBrief?.dont ? (
                      <>
                        <View style={style.creatorBrief}>
                          <View style={style.imageCont}>
                            <Image
                              source={Icons.image1}
                              style={{
                                height: normalize(12),
                                width: normalize(12),
                              }}
                            />
                          </View>
                          <Text style={style.textCreate}>Don't</Text>
                        </View>
                        {activeCollab?.creatorBrief?.dont?.map(
                          (item, index) => {
                            return (
                              <Text style={style.textDesc}>
                                {index + 1}
                                {'.'} {item?.desc}
                              </Text>
                            );
                          },
                        )}
                      </>
                    ) : null}
                    {activeCollab?.creatorBrief?.specificGuidlines ? (
                      <>
                        <View style={style.creatorBrief}>
                          <View style={style.imageCont}>
                            <Image
                              source={Icons.image1}
                              style={{
                                height: normalize(12),
                                width: normalize(12),
                              }}
                            />
                          </View>
                          <Text style={style.textCreate}>
                            {/* {activeCollab?.creatorBrief?.brandDetails?.country} */}
                            Specific Guidelines
                          </Text>
                        </View>
                        {activeCollab?.creatorBrief?.specificGuidlines?.map(
                          item => {
                            return (
                              <>
                                <Text
                                  style={{
                                    ...style.textDesc,
                                    fontFamily: Fonts.Inter_Bold,
                                  }}>
                                  {item?.deliverableName}
                                </Text>
                                <Text style={style.textDesc}>{item?.text}</Text>
                              </>
                            );
                          },
                        )}
                      </>
                    ) : null}
                    {activeCollab?.creatorBrief?.instaAsk ? (
                      <>
                        <View style={style.creatorBrief}>
                          <View style={style.imageCont}>
                            <Image
                              source={Icons.image1}
                              style={{
                                height: normalize(12),
                                width: normalize(12),
                              }}
                            />
                          </View>
                          <Text style={style.textCreate}>Instagram Asks</Text>
                        </View>
                        <Text style={style.textDesc}>
                          {activeCollab?.creatorBrief?.instaAsk}
                        </Text>
                      </>
                    ) : null}
                    {activeCollab?.creatorBrief?.assests ? (
                      <>
                        <View style={style.creatorBrief}>
                          <View style={style.imageCont}>
                            <Image
                              source={Icons.image1}
                              style={{
                                height: normalize(12),
                                width: normalize(12),
                              }}
                            />
                          </View>
                          <Text style={style.textCreate}>
                            Assets and References
                          </Text>
                        </View>
                        {activeCollab?.creatorBrief?.assests?.map(item => {
                          return (
                            <>
                              <Text
                                style={{
                                  ...style.textDesc,
                                  fontFamily: Fonts.Inter_Bold,
                                }}>
                                Assets URL(s)
                              </Text>
                              <Text
                                style={{
                                  ...style.textDesc,
                                  color: Colors.btnColor,
                                }}>
                                {item?.assetURL}
                              </Text>
                            </>
                          );
                        })}
                      </>
                    ) : null}
                    {activeCollab?.creatorBrief?.assests ? (
                      <>
                        <View style={style.creatorBrief}>
                          <View style={style.imageCont}>
                            <Image
                              source={Icons.image1}
                              style={{
                                height: normalize(12),
                                width: normalize(12),
                              }}
                            />
                          </View>
                          <Text style={style.textCreate}>
                            Assets and References
                          </Text>
                        </View>
                        {activeCollab?.creatorBrief?.references?.map(item => {
                          return (
                            <>
                              <Text
                                style={{
                                  ...style.textDesc,
                                  fontFamily: Fonts.Inter_Bold,
                                }}>
                                Reference URL(s)
                              </Text>
                              <Text
                                style={{
                                  ...style.textDesc,
                                  color: Colors.btnColor,
                                }}>
                                {item?.referenceURL}
                              </Text>
                            </>
                          );
                        })}
                      </>
                    ) : null}
                  </View>
                </ScrollView>
              ) : null}
              {/* <FlatList
              data={deliverable}
              renderItem={renderDeliverable}
              keyExtractor={item => item.toString()}
            /> */}
            </>
          )}
        </View>
      )}
      {/* </SafeAreaView> */}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    paddingHorizontal: normalize(10),
    height: Dimensions.get('screen').height,
    marginBottom: normalize(18),
    flex: 1,
  },
  card: {
    padding: normalize(8),
    borderRadius: normalize(4),
    borderWidth: normalize(1),
    borderColor: Colors.borderColor,
    alignItems: 'center',
    width: (Dimensions.get('screen').width - 70) / 3,
    marginEnd: normalize(3),
    backgroundColor: Colors.bcolor,
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
    height: normalize(16),
    width: normalize(16),
    marginRight: normalize(7),
  },
  profileCollabr: {
    height: normalize(14),
    width: normalize(14),
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
  creatorBrief: {
    flexDirection: 'row',
    marginTop: normalize(12),
    alignItems: 'center',
  },
  imageCont: {
    backgroundColor: Colors.white,
    padding: normalize(7),
    borderRadius: normalize(18),
  },
  textCreate: {
    color: Colors.white,
    fontSize: normalize(10),
    fontFamily: Fonts.Inter_Medium,
    marginStart: normalize(12),
  },
  textDesc: {
    color: Colors.white,
    fontSize: normalize(10),
    fontFamily: Fonts.Inter_Light,
    marginTop: normalize(7),
  },
});

export default Active;
