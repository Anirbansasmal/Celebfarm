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
import connectionrequest from '../../../utils/helpers/NetInfo';
import {getActiveDetailsRequest} from '../../../redux/reducers/CollaborationReducer';
import HeaderCommon from '../../../Components/HeaderCommon';
import ImageProfile from '../../../Components/ImageProfile';
import moment from 'moment';
var status = '';
function ActiveContent(props) {
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
              ? props.navigation.navigate('DeliverableInProgressContent', {
                  progress: activeCollab,
                  deliverable: item,
                })
              : item?.status == 'InReview'
              ? props.navigation.navigate('DeliverableInProgressContent', {
                  progress: activeCollab,
                  deliverable: item,
                })
              : item?.status == 'Approved'
              ? props.navigation.navigate('DeliverableApprovedContent', {
                  progress: activeCollab,
                  deliverable: item,
                })
              : item?.status == 'Live'
              ? props.navigation.navigate('DeliverablePaymentContent', {
                  progress: activeCollab,
                  deliverable: item,
                })
              : item?.status == 'PaymentRequest'
              ? props.navigation.navigate('DeliverablePaymentContent', {
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
                    : item?.status == 'PaymentRequest'
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
                        : item?.status == 'PaymentRequest'
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
                  : item?.status == 'Change Required'
                  ? 'Change Required'
                  : item?.status == 'Approved'
                  ? 'Approved'
                  : item?.status == 'PaymentRequest'
                  ? 'Payment'
                  : ''}
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
      <HeaderCommon
        picTitle={true}
        home={true}
        back={true}
        backgroundColor={'#000'}
        title={'Active'}
        heardetext={Colors.white}
        headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(61)}
        textfontSize={normalize(16)}
        fontFamily={Fonts.Inter_Bold}
        backScreen={() => {
          props.navigation.goBack();
        }}
        // marginStart={normalize(33)}
        textColor={'#ffff'}
        {...props}
      />
      {/* <SafeAreaView style={style.container}> */}
      <View style={style.container}>
        {/* <ScrollView> */}
        <View
          style={{
            marginTop: normalize(12),
          }}>
          <View
            style={{
              borderRadius: normalize(4),
              borderWidth: normalize(1),
              borderColor: '#2A2C27',
              backgroundColor: Colors.bcolor,
              paddingHorizontal: normalize(9),
              marginTop: normalize(12),
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
                    backgroundColor: '#D35C36',
                    paddingHorizontal: normalize(7),
                    justifyContent: 'center',
                    height: normalize(19),
                    marginRight: normalize(9),
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(10),
                    }}>
                    Content Lab
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    backgroundColor: Colors.white,
                    height: normalize(3),
                    width: normalize(3),
                    borderRadius: normalize(3 / 2),
                    marginRight: normalize(9),
                  }}
                />
                <Text style={{color: Colors.white, fontSize: normalize(10)}}>
                  {moment(activeCollab?.campaignDate).format('DD MMM')}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: normalize(7),
                marginBottom: normalize(9),
              }}>
              <View
                style={{
                  marginStart: normalize(0),
                  justifyContent: 'space-between',
                  // width: normalize(Dimensions.get('window').width - 220),
                }}>
                <Text style={{color: Colors.white, fontSize: normalize(13)}}>
                  {activeCollab?.campaignDesc}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: normalize(18),
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
                    }}>
                    {activeCollab?.totalDeliverable}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginTop: normalize(18)}}></View>
          <Text
            style={[
              {
                ...style.text4,
                color: Colors.white,
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
                Active
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
                {activeCollab?.campaignReport['inProgress']}
              </Text>
            </View>

            <View style={style.card}>
              <Text
                style={[
                  {
                    ...style.text4,
                    color: Colors.white,
                    fontSize: normalize(11),
                    opacity: 1,
                    fontFamily: Fonts.Inter_Regular,
                  },
                ]}>
                In Review
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
                    fontSize: normalize(11),
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
                        isShow == 0 ? Fonts.Inter_Medium : Fonts.Inter_Regular,
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
                        isShow == 1 ? Fonts.Inter_Medium : Fonts.Inter_Regular,
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
            }}></View>
        </View>

        {isShow == 0 ? (
          <>
            <FlatList
              data={deliverable}
              renderItem={renderDeliverable}
              keyExtractor={item => item.toString()}
            />
          </>
        ) : (
          <>
            {activeCollab?.creatorBrief ? (
              <ScrollView>
                <View style={{flexDirection: 'row', marginTop: normalize(12)}}>
                  <Image
                    source={{
                      uri: activeCollab?.creatorBrief?.brandDetails?.imgUrl,
                    }}
                    style={{height: normalize(70), width: normalize(70)}}
                  />
                  <View style={{marginStart: normalize(12)}}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(14),
                        fontFamily: Fonts.Inter_Bold,
                      }}>
                      {activeCollab?.creatorBrief?.brandDetails?.brandName}
                    </Text>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                        fontFamily: Fonts.Inter_Medium,
                      }}>
                      {activeCollab?.creatorBrief?.brandDetails?.city}
                    </Text>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                        fontFamily: Fonts.Inter_Medium,
                      }}>
                      {activeCollab?.creatorBrief?.brandDetails?.country}
                    </Text>
                  </View>
                </View>
                <View>
                  {activeCollab?.creatorBrief?.about ? (
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
                      <Text style={style.textDesc}>
                        {/* {activeCollab?.creatorBrief?.brandDetails?.country} */}
                        Lorem ipsum dolor sit amet, consec tetu. Lorem ipsum
                        dolor sit amet, consec tetu. Lorem ipsum dolor sit amet,
                        consec tetu. Lorem ipsum dolor sit amet, consec tetu.
                        sit amet, consec tetu. Lorem ipsum dolor sit amet,
                        consec tetu. Lorem ipsum dolor sit amet, consec tetu.
                        #brand #brandname
                      </Text>
                    </>
                  ) : null}
                  {activeCollab?.creatorBrief?.brand ? (
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
                          Branding tone
                        </Text>
                      </View>
                      <Text style={style.textDesc}>
                        {/* {activeCollab?.creatorBrief?.brandDetails?.country} */}
                        Lorem ipsum dolor sit amet, consec tetu. Lorem ipsum
                        dolor sit amet, consec tetu. Lorem ipsum dolor sit amet,
                        consec tetu. Lorem ipsum dolor sit amet, consec tetu.
                        sit amet, consec tetu. Lorem ipsum dolor sit amet,
                        consec tetu. Lorem ipsum dolor sit amet, consec tetu.
                        #brand #brandname
                      </Text>
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
                      <Text style={style.textDesc}>
                        {/* {activeCollab?.creatorBrief?.brandDetails?.country} */}
                      </Text>
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
                        <Text style={style.textCreate}>
                          {/* {activeCollab?.creatorBrief?.brandDetails?.country} */}
                          Don't
                        </Text>
                      </View>
                      <Text style={style.textDesc}>
                        {/* {activeCollab?.creatorBrief?.brandDetails?.country} */}
                      </Text>
                    </>
                  ) : null}
                  {activeCollab?.creatorBrief?.guidline ? (
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
                      <Text style={style.textDesc}>
                        {/* {activeCollab?.creatorBrief?.brandDetails?.country} */}
                      </Text>
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
                        <Text style={style.textCreate}>
                          {/* {activeCollab?.creatorBrief?.brandDetails?.country} */}
                          Instagram Asks
                        </Text>
                      </View>
                      <Text style={style.textDesc}>
                        {/* {activeCollab?.creatorBrief?.brandDetails?.country} */}
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
                          {/* {activeCollab?.creatorBrief?.brandDetails?.country} */}
                          Assets and References
                        </Text>
                      </View>
                      <Text style={style.textDesc}>
                        {/* {activeCollab?.creatorBrief?.brandDetails?.country} */}
                      </Text>
                    </>
                  ) : null}
                </View>
              </ScrollView>
            ) : null}
          </>
        )}
        {/* </ScrollView> */}
      </View>
      {/* </SafeAreaView> */}
    </SafeAreaView>
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
  card: {
    padding: normalize(8),
    borderRadius: normalize(4),
    borderWidth: normalize(1),
    borderColor: Colors.borderColor,
    backgroundColor: Colors.bcolor,
    alignItems: 'center',
    width: (Dimensions.get('screen').width - 70) / 3,
    marginEnd: normalize(3),
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
    fontSize: normalize(16),
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

export default ActiveContent;
