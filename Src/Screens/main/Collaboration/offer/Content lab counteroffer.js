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
import {Colors, Fonts} from '../../../../themes/Themes';
import normalize from '../../../../utils/helpers/dimen';
import Button from '../../../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../../themes/icons';
import Images from '../../../../themes/Images';
import {ScrollView} from 'react-native-gesture-handler';
import ButtonLinear from '../../../../Components/Button Linear';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../../../utils/helpers/NetInfo';
import {
  getAcceptOfferRequest,
  getInviteCollaboRequest,
  getInviteDetailsRequest,
} from '../../../../redux/reducers/CollaborationReducer';
import HeaderCommon from '../../../../Components/HeaderCommon';
import ImageProfile from '../../../../Components/ImageProfile';
import moment from 'moment';
import {
  getAcceptContentLabOfferRequest,
  getRejectContentLabOfferRequest,
} from '../../../../redux/reducers/ContentLabReducer';
import {showError} from '../../Message/ChatService';
import showErrorAlert from '../../../../utils/helpers/Toast';
var status = '';

function ContentLabCounteroffer(props) {
  useEffect(() => {}, []);
  const dispatch = useDispatch();
  const HomeReducer = useSelector(state => state.HomeReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const CollaborationReducer = useSelector(state => state.CollaborationReducer);
  const [inviteContent, setInviteContent] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);
  const [isShowAlert, setShowAlert] = useState(false);

  useEffect(() => {
    console.log('campaignID', props?.route?.params?.campaignID);
    var obj =
      'creatorID=' +
      AuthReducer?.creatorID +
      '&campaignID=' +
      props?.route?.params?.campaignID;
    try {
      connectionrequest()
        .then(() => {
          dispatch(getInviteDetailsRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }, []);
  
  async function accept(selected) {
    var obj = {
      creatorID: AuthReducer?.creatorID,
      campaignID: inviteContent[0]?.campaignID,
      isAccepted: !selected,
      isReject: !selected,
    };

    console.log(obj);
    try {
      connectionrequest()
        .then(() => {
          setTimeout(() => {
            dispatch(getInviteCollaboRequest(obj));
          }, 1800);
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }
  
  async function decline() {
    try {
      var obj = {};
      connectionrequest()
        .then(() => {
          dispatch(getRejectContentLabOfferRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (error) {}
  }
  if (status == '' || CollaborationReducer.status != status) {
    switch (CollaborationReducer.status) {
      case 'collaboration/getInviteDetailsRequest':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/getInviteDetailsSuccess':
        status = CollaborationReducer.status;
        console.log('hgfgcvcb', CollaborationReducer?.inviteDetailsResponse);
        setInviteContent([CollaborationReducer?.inviteDetailsResponse]);
        break;
      case 'collaboration/getInviteDetailsFailure':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/getInviteCollaboRequest':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/getInviteCollaboSuccess':
        status = CollaborationReducer.status;
        console.log('hgfgcvcb', CollaborationReducer?.inviteDetailsResponse);
        props?.navigation?.goBack();
        break;
      case 'collaboration/getInviteDetailsFailure':
        status = CollaborationReducer.status;
        break;
    }
  }

  function dateText(date) {
    return (
      <Text
        style={{
          color: Colors.white,
          fontSize: normalize(10),
          fontFamily: Fonts.Inter_Bold,
        }}>
        {date}
      </Text>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
      <HeaderCommon
        picTitle={true}
        home={true}
        back={true}
        backgroundColor={'#000'}
        title={'Offer'}
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
        <ScrollView>
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
                    brandImageUrl={inviteContent[0]?.brandImageUrl}
                    imgheight={normalize(16)}
                    imgwidth={normalize(16)}
                    justifyContent={'center'}
                  />
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(12),
                      marginStart: normalize(3),
                      fontFamily: Fonts.Inter_Bold,
                    }}>
                    {inviteContent[0]?.brandName}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={style.Lab}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                        fontFamily: Fonts.Inter_Medium,
                      }}>
                      Content Lab
                    </Text>
                  </View>
                  <View style={style.circle} />
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(10),
                      fontFamily: Fonts.Inter_Medium,
                    }}>
                    {moment(inviteContent[0]?.campaignDate).format('DD MMM')}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                // height: normalize(2),
                width: normalize(Dimensions.get('screen').width),
                marginTop: normalize(12),
                borderWidth: normalize(1),
                borderColor: '#434540',
              }}
            />
            <View
              style={{
                marginTop: normalize(12),
                borderRadius: normalize(4),
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(14),
                  fontFamily: Fonts.Inter_Bold,
                }}>
                {inviteContent[0]?.campaignTitle}
              </Text>
              <View
                style={{
                  marginTop: normalize(12),
                  borderRadius: normalize(6),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={style.textVoice}>
                  {inviteContent[0]?.campaignDesc}
                </Text>
              </View>
            </View>
            <View style={style.payoutContainer}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(12),
                  fontFamily: Fonts.Inter_Regular,
                  opacity: 0.8,
                }}>
                Payout
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(14),
                  marginTop: normalize(7),
                  fontFamily: Fonts.Inter_Bold,
                }}>
                ₹{inviteContent[0]?.payout}
              </Text>
            </View>
            <View
              style={{
                marginTop: normalize(23),
                marginBottom: normalize(12),
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(14),
                  fontFamily: Fonts.Inter_Bold,
                }}>
                Deliverables
              </Text>
              <View
                style={{
                  marginTop: normalize(12),
                  borderRadius: normalize(6),
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    height: normalize(1),
                    width: normalize(Dimensions.get('window').width - 90),
                    backgroundColor: '#363833',
                    alignSelf: 'center',
                    marginTop: normalize(0),
                  }}></View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    marginTop: normalize(12),
                  }}>
                  <FlatList
                    data={inviteContent[0]?.deliverables}
                    renderItem={({item, index}) => {
                      return (
                        <>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: normalize(12),
                              alignItems: 'center',
                            }}>
                            <View style={{flexDirection: 'row', width: '33%'}}>
                              <Image
                                source={Icons.images}
                                style={{
                                  height: normalize(17),
                                  width: normalize(17),
                                }}
                              />
                              <Text style={style.text8}>{item?.type}</Text>
                            </View>
                            <View style={{flexDirection: 'row', width: '18%'}}>
                              <Text
                                style={{
                                  color: Colors.white,
                                  fontSize: normalize(12),
                                  fontFamily: Fonts.Inter_SemiBold,
                                }}>
                                {item?.min} :{item?.sec}m
                              </Text>
                            </View>
                            <View
                              style={{
                                ...style.deliverable,
                                width: '12%',
                                alignItems: 'flex-start',
                              }}>
                              <Text
                                style={{
                                  color: Colors.white,
                                  fontSize: normalize(12),
                                  fontFamily: Fonts.Inter_Bold,
                                }}>
                                ₹{item?.price}
                              </Text>
                            </View>
                          </View>

                          <View
                            style={{
                              height: normalize(1),
                              width: normalize(
                                Dimensions.get('window').width - 90,
                              ),
                              backgroundColor: '#363833',
                              alignSelf: 'center',
                              marginTop: normalize(12),
                            }}
                          />
                        </>
                      );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </View>
            </View>
          </>
        </ScrollView>
        <View
          style={{
            bottom: 0,
            position: 'absolute',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: normalize(12),
              justifyContent: 'space-between',
              width: Dimensions.get('window').width,
            }}>
            <TouchableOpacity
              activeOpacity={1}
              style={style.reject}
              onPress={() => {
                accept(true)
              }}>
              <MaskedView
                style={{height: 18}}
                maskElement={
                  <Text
                    style={{
                      ...style.text,
                      fontSize: normalize(12),
                      marginTop: normalize(0),
                      alignSelf: 'center',
                    }}>
                    {'Reject'}
                  </Text>
                }>
                <LinearGradient
                  colors={['#EAF7A7', '#EAF7A7', '#B7F9CF', '#B7F9CF']}
                  start={{x: 1, y: 1}}
                  end={{x: 0, y: 0.33}}
                  style={{flex: 1}}
                />
              </MaskedView>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={1}
              style={style.counter}
              onPress={() => {
                props.navigation.navigate('ContentLaboffer', {
                  counterOffer: inviteContent,
                });
              }}>
              <MaskedView
                style={{height: 18}}
                maskElement={
                  <Text
                    style={{
                      ...style.text,
                      fontSize: normalize(12),
                      marginTop: normalize(0),
                      marginStart: normalize(0),
                      alignSelf: 'center',
                    }}>
                    {'Counter Offer'}
                  </Text>
                }>
                <LinearGradient
                  colors={['#EAF7A7', '#EAF7A7', '#B7F9CF', '#B7F9CF']}
                  start={{x: 1, y: 1}}
                  end={{x: 0, y: 0.33}}
                  style={{flex: 1}}
                />
              </MaskedView>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </View>
      </View>
      <ButtonLinear
        width={'91%'}
        height={normalize(36)}
        backgroundColor={Colors.btnColor}
        title={'Accept'}
        textColor={Colors.black}
        titlesingle={true}
        borderRadius={normalize(25)}
        marginHorizontal={normalize(5)}
        btnBottom={0}
        alignSelf={'center'}
        marginTop={normalize(9)}
        onPress={() => {
          {
            CollaborationReducer?.inviteDetailsResponse?.isAccepted == false
              ? props?.navigation?.navigate('OfferScreen', {
                  campaignID:
                    CollaborationReducer?.inviteDetailsResponse?.campaignID,
                })
              : showErrorAlert('This offer is already accepted');
          }
        }}
      />
      {/* </SafeAreaView> */}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
    paddingHorizontal: normalize(10),
    // height: Dimensions.get('screen').height,
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
  text8: {
    color: Colors.white,
    fontSize: normalize(12),
    marginRight: normalize(9),
    marginLeft: normalize(7),
    fontFamily: Fonts.Inter_Regular,
  },
  textVoice: {
    color: Colors.white,
    fontSize: normalize(12),
    fontFamily: Fonts.Inter_Regular,
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
    height: normalize(18),
    width: normalize(18),
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
  payoutContainer: {
    paddingStart: normalize(7),
    paddingTop: normalize(6),
    paddingEnd: normalize(12),
    paddingBottom: normalize(6),
    borderWidth: normalize(1),
    borderColor: Colors.borderColor,
    marginTop: normalize(12),
    width: '50%',
    borderRadius: normalize(3),
  },
  deliverable: {
    flexDirection: 'row',
    borderColor: '#2A2C27',
    justifyContent: 'space-between',
  },
  Lab: {
    borderRadius: normalize(19),
    backgroundColor: '#D35C36',
    paddingHorizontal: normalize(7),
    justifyContent: 'center',
    height: normalize(18),
    marginRight: normalize(9),
  },
  circle: {
    backgroundColor: Colors.white,
    height: normalize(3),
    width: normalize(3),
    borderRadius: normalize(3 / 2),
    marginRight: normalize(9),
  },
  reject: {
    height: normalize(40),
    width: '35%',
    backgroundColor: '#0000',
    justifyContent: 'center',
    marginTop: normalize(12),
    marginHorizontal: normalize(6),
  },
  counter: {
    height: normalize(40),
    width: '45%',
    borderRadius: normalize(22),
    backgroundColor: '#0000',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: normalize(12),
    marginHorizontal: normalize(6),
    borderWidth: normalize(1),
    borderColor: '#EAF7A7',
  },
});

export default ContentLabCounteroffer;
