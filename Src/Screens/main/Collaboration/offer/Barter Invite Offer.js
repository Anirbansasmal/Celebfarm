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
import Button from '../../../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../../themes/icons';
import Images from '../../../../themes/Images';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import ButtonLinear from '../../../../Components/Button Linear';
import HeaderCommon from '../../../../Components/HeaderCommon';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../../../utils/helpers/NetInfo';
import {
  getInviteCollaboRequest,
  getInviteDetailsRequest,
} from '../../../../redux/reducers/CollaborationReducer';
import ImageProfile from '../../../../Components/ImageProfile';
import moment from 'moment';
import Modal from 'react-native-modal';
import Toast from '../../../../utils/helpers/Toast';
import AcceptOffer from './Accept Offer';
import OfferScreen from './Offer Terms';
import {showError} from '../../Message/ChatService';

var status = '';

function BarterInviteOffer(props) {
  useEffect(() => {}, []);
  const dispatch = useDispatch();
  const HomeReducer = useSelector(state => state.HomeReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const CollaborationReducer = useSelector(state => state.CollaborationReducer);
  const [invite, setInvite] = useState([]);
  const [isAccepted, setIsAccepted] = useState(false);
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
          // Toast('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (status == '' || CollaborationReducer.status != status) {
    switch (CollaborationReducer.status) {
      case 'collaboration/getAcceptOfferRequest':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/getAcceptOfferSuccess':
        status = CollaborationReducer.status;
        console.log('hgfgcvcb');
        // setInvite([...CollaborationReducer?.inviteDetailsResponse]);
        break;
      case 'collaboration/getAcceptOfferFailure':
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

  function inviteRequest(accepted) {
    var obj = {
      creatorID: AuthReducer?.creatorID,
      campaignID: invite[0]?.campaignID,
      isAccepted: !accepted,
      isReject: !accepted,
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

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
        <HeaderCommon
          picTitle={true}
          home={true}
          back={true}
          backgroundColor={'#000'}
          title={'Offer'}
          heardetext={Colors.white}
          headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(51)}
          textfontSize={normalize(16)}
          fontFamily={Fonts.Inter_Bold}
          backScreen={() => {
            props.navigation.goBack();
          }}
          textColor={'#ffff'}
          {...props}
        />
        <View style={style.container}>
          <ScrollView>
            <>
              <View
                style={{
                  marginTop: normalize(12),
                  borderRadius: normalize(7),
                }}>
                <ImageBackground
                  source={
                    CollaborationReducer?.inviteDetailsResponse
                      ?.campaignImageURL == ''
                      ? Images.dyning
                      : {
                          uri: CollaborationReducer?.inviteDetailsResponse
                            ?.campaignImageURL,
                        }
                  }
                  style={{
                    width: normalize(Dimensions.get('screen').width - 97),
                    height: normalize(280),
                  }}
                  imageStyle={{borderRadius: normalize(3)}}
                  // resizeMode="contain"
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: normalize(52),
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
                      borderRadius={normalize(3)}
                      backgroundColor={Colors.white}
                      brandImageUrl={
                        CollaborationReducer?.inviteDetailsResponse
                          ?.brandImageUrl
                      }
                      imgheight={normalize(16)}
                      imgwidth={normalize(16)}
                      justifyContent={'center'}
                    />
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                        marginStart: normalize(3),
                        fontFamily: Fonts.Inter_Bold,
                      }}>
                      {CollaborationReducer?.inviteDetailsResponse?.brandName}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity style={style.cardTypeDel}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(10),
                        }}>
                        {CollaborationReducer?.inviteDetailsResponse
                          ?.campaignType == 'Barter'
                          ? 'Barter'
                          : CollaborationReducer?.inviteDetailsResponse
                              ?.campaignType == 'Paid+'
                          ? 'Paid+'
                          : CollaborationReducer?.inviteDetailsResponse
                              ?.campaignType == 'Paid'
                          ? 'Paid'
                          : CollaborationReducer?.inviteDetailsResponse
                              ?.campaignType == 'Content Lab'
                          ? 'Content Lab'
                          : ''}
                      </Text>
                    </TouchableOpacity>
                    <View style={style.circle} />
                    <Image
                      source={
                        CollaborationReducer?.inviteDetailsResponse?.platform ==
                        'Instagram'
                          ? Icons.insta
                          : Icons.youtube
                      }
                      style={style.profileCollabration}
                      resizeMode="contain"
                    />
                    <View style={style.circle} />
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                        fontFamily: Fonts.Inter_Medium,
                      }}>
                      {moment(
                        CollaborationReducer?.inviteDetailsResponse?.createDate,
                      ).format('DD MMM')}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: normalize(1),
                  width: normalize(Dimensions.get('screen').width),
                  marginTop: normalize(12),
                  backgroundColor: '#434540',
                }}
              />
              <View
                style={{
                  marginTop: normalize(12),
                  // backgroundColor:Colors.red,
                  borderRadius: normalize(4),
                  // marginStart: normalize(7),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(16),
                    fontFamily: Fonts.Inter_Bold,
                  }}>
                  {CollaborationReducer?.inviteDetailsResponse?.campaignTitle}
                </Text>
                <View
                  style={{
                    marginTop: normalize(12),
                    borderRadius: normalize(6),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={style.textVoice}>
                    {CollaborationReducer?.inviteDetailsResponse?.campaignDesc}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: normalize(33),
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
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      height: normalize(1),
                      width: normalize(Dimensions.get('window').width - 82),
                      backgroundColor: '#363833',
                      alignSelf: 'center',
                    }}></View>
                  <FlatList
                    data={
                      CollaborationReducer?.inviteDetailsResponse?.deliverables
                    }
                    numColumns={2}
                    renderItem={({item, index}) => {
                      console.log(item);
                      return (
                        <>
                          <View
                            style={{
                              flexDirection: 'row',
                              borderWidth: normalize(1),
                              paddingHorizontal: normalize(9),
                              paddingVertical: normalize(9),
                              borderColor: Colors.borderColor,
                              justifyContent: 'center',
                              height: normalize(51),
                              borderRadius: normalize(4),
                              // marginEnd: index % 2 != 0 ? normalize(12) : 0,
                              marginTop: normalize(6),
                              marginBottom: normalize(6),
                              marginStart: index % 2 != 0 ? normalize(10) : 0,
                              // margin:normalize(6),
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              width: Dimensions.get('window').width / 2.22,
                            }}>
                            <Image
                              source={Icons.images}
                              style={{
                                width: normalize(18),
                                height: normalize(18),
                              }}
                              resizeMode="contain"
                            />

                            {item?.name?.length >= 12 ? (
                              <Text
                                style={{
                                  color: Colors.white,
                                  fontSize: normalize(10),
                                  marginStart: normalize(7),
                                  flexWrap: 'wrap',
                                  width: 70,
                                }}
                                numberOfLines={2}>
                                {item?.name}
                              </Text>
                            ) : (
                              <Text
                                style={{
                                  color: Colors.white,
                                  fontSize: normalize(10),
                                  marginStart: normalize(7),
                                }}>
                                {item?.name}
                              </Text>
                            )}
                            <View
                              style={{
                                borderRadius: normalize(9),
                                height: normalize(18),
                                width: normalize(18),
                                paddingHorizontal: normalize(4),
                                backgroundColor: Colors.white,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginStart: normalize(7),
                              }}>
                              {item?.name == 'LinkInBio' ||
                              item?.name == 'CollaborativePost' ? (
                                <Image
                                  source={Icons.tick}
                                  style={{
                                    height: normalize(12),
                                    width: normalize(12),
                                  }}
                                  resizeMode="contain"
                                />
                              ) : (
                                <Text
                                  style={{
                                    color: Colors.black,
                                    fontSize: normalize(8),
                                  }}>
                                  {item?.count}
                                </Text>
                              )}
                            </View>
                          </View>
                        </>
                      );
                    }}
                    contentContainerStyle={{}}
                  />
                </View>
              </View>
            </>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              marginTop: normalize(12),
              width: '100%',
            }}>
            <Button
              width={'32%'}
              height={normalize(40)}
              alignSelf={'center'}
              backgroundColor={'#000000'}
              title={'Reject'}
              textColor={Colors.white}
              titlesingle={true}
              borderRadius={normalize(22)}
              marginHorizontal={normalize(5)}
              btnBottom={0}
              onPress={() => {
                props.navigation.goBack();
                setIsAccepted(true);
                inviteRequest(true);
              }}
            />
            <ButtonLinear
              width={'57%'}
              height={normalize(40)}
              alignSelf={'center'}
              backgroundColor={Colors.btnColor}
              title={'Accept'}
              textColor={Colors.black}
              titlesingle={true}
              borderRadius={normalize(25)}
              marginHorizontal={normalize(5)}
              btnBottom={0}
              onPress={() => {
                setIsAccepted(false);
                {
                  CollaborationReducer?.inviteDetailsResponse?.isAccepted ==
                  true
                    ? props?.navigation?.navigate('OfferScreen', {
                        campaignID:
                          CollaborationReducer?.inviteDetailsResponse
                            ?.campaignID,
                      })
                    : showError('This offer is already accepted');
                }
              }}
            />
          </View>
        </View>

        {/* <Modal
          isVisible={isShowAlert}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          style={{width: '100%', alignSelf: 'center', margin: 0}}
          animationInTiming={800}
          animationOutTiming={1000}
          backdropColor={'#000000'}
          onBackdropPress={() => setShowAlert(false)}>
          <OfferScreen onBack={() => setShowAlert(false)} />
        </Modal> */}
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
  cardTypeDel: {
    borderRadius: normalize(19),
    backgroundColor: '#463080',
    paddingHorizontal: normalize(12),
    justifyContent: 'center',
    height: normalize(16),
    marginRight: normalize(9),
  },
  circle: {
    backgroundColor: Colors.white,
    height: normalize(3),
    width: normalize(3),
    borderRadius: normalize(3 / 2),
    marginRight: normalize(9),
  },
  cardDel: {
    flexDirection: 'row',
    borderWidth: normalize(1),
    paddingHorizontal: normalize(22),
    paddingVertical: normalize(9),
    borderColor: '#2A2C27',
    justifyContent: 'space-between',
    borderRadius: normalize(4),
    alignItems: 'center',
  },
  circleNumber: {
    borderRadius: normalize(18),
    height: normalize(22),
    paddingHorizontal: normalize(6),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: normalize(7),
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
    fontFamily: Fonts.Inter_Medium,
    textAlign: 'justify',
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
    height: normalize(14),
    width: normalize(14),
    marginRight: normalize(7),
  },
  profileCollabr: {
    height: normalize(21),
    width: normalize(21),
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

export default BarterInviteOffer;
