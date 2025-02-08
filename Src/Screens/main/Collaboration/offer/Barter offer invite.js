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
import moment from 'moment';
import HeaderCommon from '../../../../Components/HeaderCommon';
import {useDispatch, useSelector} from 'react-redux';
import {
  getInviteCollaboRequest,
  getInviteDetailsRequest,
} from '../../../../redux/reducers/CollaborationReducer';
import connectionrequest from '../../../../utils/helpers/NetInfo';
import ImageProfile from '../../../../Components/ImageProfile';
var status = '';

function BarterOffer(props) {
  const dispatch = useDispatch();
  const HomeReducer = useSelector(state => state.HomeReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const CollaborationReducer = useSelector(state => state.CollaborationReducer);
  const [invite, setInvite] = useState('');
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
          Toast('Please connect to internet');
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
        console.log('hgfgcvcb');
        setInvite([CollaborationReducer?.inviteDetailsResponse]);
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
                <ImageBackground
                  source={
                    invite[0]?.campaignImageURL == null
                      ? Images.dyning
                      : {uri: invite[0]?.campaignImageURL}
                  }
                  style={{
                    width: normalize(Dimensions.get('screen').width - 97),
                    height: normalize(161),
                  }}
                  imageStyle={{borderRadius: normalize(6)}}
                  // resizeMode="contain"
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: normalize(42),
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
                      brandImageUrl={invite[0]?.brandImageUrl}
                      imgheight={normalize(16)}
                      imgwidth={normalize(16)}
                      justifyContent={'center'}
                    />
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                        marginStart: normalize(3),
                        fontFamily: Fonts.Inter_SemiBold,
                      }}>
                      {invite[0]?.brandName}
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
                        backgroundColor: '#463080',
                        paddingHorizontal: normalize(12),
                        justifyContent: 'center',
                        height: normalize(18),
                        marginRight: normalize(9),
                      }}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(10),
                          fontFamily: Fonts.Inter_Medium,
                        }}>
                        {invite[0]?.campaignType}
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
                    <Image
                      source={
                        invite[0]?.platform == 'Instagram'
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
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                        fontFamily: Fonts.Inter_Medium,
                      }}>
                      {moment(invite[0]?.createdDate).format('DD MMM')}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: normalize(2),
                  width: normalize(Dimensions.get('screen').width),
                  marginTop: normalize(12),
                  borderWidth: normalize(1),
                  borderColor: '#434540',
                }}
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
                    fontFamily: Fonts.Inter_Bold,
                  }}>
                  {invite[0]?.discount} Off
                </Text>
              </View>
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
                    fontSize: normalize(14),
                    fontFamily: Fonts.Inter_Bold,
                  }}>
                  {invite[0]?.campaignTitle}
                </Text>
                <View
                  style={{
                    marginTop: normalize(7),
                    borderRadius: normalize(6),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={style.textVoice}>{invite[0]?.campaignDesc}</Text>
                </View>
                <Text
                  style={[
                    {
                      ...style.textVoice,
                      marginTop: normalize(19),
                      fontFamily: Fonts.Inter_Regular,
                    },
                  ]}>
                  From {dateText(moment(invite[0]?.fromDate).date())} to{' '}
                  {dateText(moment(invite[0]?.toDate).date())}
                </Text>
              </View>
              {invite[0]?.deliverables ? (
                <View
                  style={{
                    marginTop: normalize(49),
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
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: normalize(12),
                        alignItems: 'center',
                      }}>
                      <FlatList
                        data={invite[0]?.deliverables}
                        numColumns={2}
                        renderItem={({item, index}) => {
                          console.log(item);
                          return (
                            <>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  borderWidth: normalize(1),
                                  paddingHorizontal: normalize(19),
                                  paddingVertical: normalize(9),
                                  borderColor: Colors.borderColor,
                                  justifyContent: 'center',
                                  alignSelf: 'flex-start',
                                  borderRadius: normalize(4),
                                  width: normalize(120),
                                  marginTop: normalize(6),
                                  marginBottom: normalize(6),
                                  marginStart:
                                    index % 2 != 0 ? normalize(12) : 0,

                                  // margin:normalize(6),

                                  alignItems: 'center',
                                  width: normalize(
                                    (Dimensions.get('window').width + 10) / 2.9,
                                  ),
                                }}>
                                <Image
                                  source={Icons.images}
                                  style={{
                                    width: normalize(18),
                                    height: normalize(18),
                                  }}
                                  resizeMode="contain"
                                />

                                <Text
                                  style={{
                                    color: Colors.white,
                                    fontSize: normalize(10),
                                    marginStart: normalize(7),
                                  }}>
                                  {item?.name}
                                </Text>
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
                                  <Text
                                    style={{
                                      color: Colors.black,
                                      fontSize: normalize(8),
                                    }}>
                                    {item?.count}
                                  </Text>
                                </View>
                              </View>
                            </>
                          );
                        }}
                        contentContainerStyle={{
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}
                      />
                    </View>
                  </View>
                </View>
              ) : null}
            </>
          </ScrollView>
        </View>
        <View
          style={{
            marginTop: normalize(12),
            marginBottom: normalize(12),
          }}>
          <View style={{flexDirection: 'row', }}>
            <Button
              width={'30%'}
              height={normalize(40)}
              alignSelf={'center'}
              backgroundColor={'#000000'}
              title={'Reject'}
              textColor={Colors.white}
              titlesingle={true}
              borderRadius={normalize(25)}
              marginHorizontal={normalize(5)}
              btnBottom={0}
              onPress={() => {
                inviteRequest(true);
              }}
            />
            <ButtonLinear
              width={'55%'}
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
                // inviteRequest(false);
                
              }}
            />
          </View>
        </View>
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
    fontSize: normalize(11),
    opacity: 0.8,
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
    height: normalize(19),
    width: normalize(19),
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

export default BarterOffer;
