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
import ImageProfile from '../../../../Components/ImageProfile';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../../../utils/helpers/NetInfo';
import {
  getInviteCollaboRequest,
  getInviteDetailsRequest,
} from '../../../../redux/reducers/CollaborationReducer';
import showErrorAlert from '../../../../utils/helpers/Toast';
import moment from 'moment';
var status = '';

function Paid(props) {
  useEffect(() => {}, []);
  const dispatch = useDispatch();
  const HomeReducer = useSelector(state => state.HomeReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const CollaborationReducer = useSelector(state => state.CollaborationReducer);
  const [inviteContent, setInviteContent] = useState('');
  const [deliverable, setDeliverable] = useState('');
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
      case 'collaboration/getInviteDetailsRequest':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/getInviteDetailsSuccess':
        status = CollaborationReducer.status;
        console.log('hgfgcvcb', CollaborationReducer?.inviteDetailsResponse);
        var arr = [];
        setInviteContent([CollaborationReducer?.inviteDetailsResponse]);
        CollaborationReducer?.inviteDetailsResponse?.deliverables?.map(item => {
          if (item?.count > 0) {
            arr.push({
              name: item.name,
              price: item.price,
              totalDelivarablePrice: item.totalDelivarablePrice,
              id: item.id,
              count: item.count,
            });
          }
        }),
          setDeliverable([...arr]);
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
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
      <View
        style={{
          flexDirection: 'row',
          padding: normalize(0),
          justifyContent: 'space-between',
          borderBottomColor: '#434540',
          borderBottomWidth: normalize(1),
          paddingVertical: normalize(12),
          backgroundColor: Colors.black,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: normalize(12),
            }}
            onPress={() => props.navigation.goBack()}>
            <Image
              source={Icons.arrowleft}
              style={{
                height: normalize(12),
                width: normalize(18),
              }}
            />
          </TouchableOpacity>
          <Text style={style.text}>Offer</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginEnd: normalize(12),
          }}>
          <Image
            source={Icons.notification}
            style={style.imageLeft}
            resizeMode="contain"
          />
          <View
            style={{
              width: normalize(12),
            }}></View>
          <Image
            source={Icons.user}
            style={style.imageLeft}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* <SafeAreaView style={style.container}> */}
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
                    borderRadius={normalize(3)}
                    backgroundColor={Colors.white}
                    brandImageUrl={inviteContent[0]?.brandImageUrl}
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
                    {inviteContent[0]?.brandName}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      borderRadius: normalize(19),
                      backgroundColor: '#214C40',
                      paddingHorizontal: normalize(7),
                      justifyContent: 'center',
                      height: normalize(18),
                      marginRight: normalize(9),
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                      }}>
                      Paid
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: Colors.white,
                      height: normalize(3),
                      width: normalize(3),
                      borderRadius: normalize(3 / 2),
                      marginRight: normalize(9),
                    }}
                  />
                  <Image
                    source={
                      inviteContent[0]?.platform == 'Instagram'
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
                      marginRight: normalize(7),
                    }}
                  />
                  <Text style={{color: Colors.white, fontSize: normalize(10)}}>
                    {moment(inviteContent[0]?.campignDate).format('DD MMM')}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: normalize(Dimensions.get('screen').width),
                marginTop: normalize(12),
                borderWidth: normalize(1),
                borderColor: Colors.borderColor,
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
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Bold,
                }}>
                {inviteContent[0]?.campaignTitle}
              </Text>
              <View
                style={{
                  marginTop: normalize(7),
                  borderRadius: normalize(6),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={[
                    {...style.textVoice, fontFamily: Fonts.Inter_Regular},
                  ]}>
                  {inviteContent[0]?.campaignDesc}
                </Text>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.borderColor,
                  width: (Dimensions.get('window').width - 50) / 2,
                  marginTop: normalize(10),
                  padding: normalize(9),
                  borderRadius: normalize(6),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(12),
                    fontFamily: Fonts.Inter_Medium,
                  }}>
                  Total Deliverable
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(16),
                    marginTop: normalize(7),
                    fontFamily: Fonts.Inter_Bold,
                  }}>
                  {inviteContent[0]?.totalDeliverable ?? 0}
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.borderColor,
                  width: (Dimensions.get('window').width - 50) / 2,
                  marginTop: normalize(10),
                  padding: normalize(9),
                  borderRadius: normalize(6),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(12),
                    fontFamily: Fonts.Inter_Medium,
                  }}>
                  Payout
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(16),
                    marginTop: normalize(7),
                    fontFamily: Fonts.Inter_Bold,
                  }}>
                  {inviteContent[0]?.payout ?? 0}
                </Text>
              </View>
            </View>
            {inviteContent[0]?.campaignImageURL ? (
              <View
                style={{
                  borderWidth: normalize(1),
                  borderColor: Colors.borderColor,
                  backgroundColor: Colors.bcolor,
                  borderRadius: normalize(7),
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: normalize(6),
                  marginTop: normalize(18),
                }}>
                <ImageBackground
                  source={
                    inviteContent[0]?.campaignImageURL !== null
                      ? {uri: inviteContent[0]?.campaignImageURL}
                      : Images.dyning
                  }
                  style={{
                    height: normalize(40),
                    width: normalize(40),
                  }}
                  imageStyle={{borderRadius: normalize(3)}}
                  resizeMode="cover"
                />
                <Text
                  style={[
                    {
                      ...style.textVoice,
                      marginStart: normalize(12),
                      width: '70%',
                    },
                  ]}>
                  {inviteContent[0]?.campaignProductTitle}
                </Text>
              </View>
            ) : null}

            <View
              style={{
                marginTop: normalize(19),
                marginBottom: normalize(172),
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
                  height: normalize(1),
                  width: normalize(Dimensions.get('window').width - 90),
                  backgroundColor: '#363833',
                  alignSelf: 'center',
                  marginTop: normalize(12),
                }}></View>
              <View
                style={{
                  marginTop: normalize(0),
                  borderRadius: normalize(6),
                  justifyContent: 'space-between',
                }}>
                <FlatList
                  data={deliverable}
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
                          <View style={{flexDirection: 'row'}}>
                            <Image
                              source={Icons.images}
                              style={{
                                height: normalize(17),
                                width: normalize(17),
                              }}
                            />
                            <Text
                              style={{
                                color: Colors.white,
                                fontSize: normalize(12),
                                marginRight: normalize(9),
                                marginLeft: normalize(12),
                                fontFamily: Fonts.Inter_Regular,
                              }}>
                              {item?.name}
                            </Text>
                            <View
                              style={{
                                borderRadius: normalize(18),
                                height: normalize(19),
                                paddingHorizontal: normalize(7),
                                backgroundColor: Colors.white,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  color: Colors.black,
                                  fontSize: normalize(10),
                                  fontFamily: Fonts.Inter_SemiBold,
                                }}>
                                {item?.count}
                              </Text>
                            </View>
                          </View>
                          <Text
                            style={{
                              color: Colors.white,
                              fontSize: normalize(12),
                            }}>
                            ₹ {item?.totalDelivarablePrice}
                          </Text>
                        </View>
                      </>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          </>
        </ScrollView>
      </View>
      <ButtonLinear
        width={'91%'}
        height={normalize(40)}
        alignSelf={'center'}
        backgroundColor={Colors.btnColor}
        title={'Accept'}
        textColor={Colors.black}
        titlesingle={true}
        borderRadius={normalize(25)}
        marginTop={12}
        onPress={() => {
          CollaborationReducer?.inviteDetailsResponse?.isAccepted == false
            ? props?.navigation?.navigate('OfferScreen', {
                campaignID:
                  CollaborationReducer?.inviteDetailsResponse?.campaignID,
              })
            : showErrorAlert('This offer is already accepted');
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
    // marginBottom:normalize(199)
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

export default Paid;
