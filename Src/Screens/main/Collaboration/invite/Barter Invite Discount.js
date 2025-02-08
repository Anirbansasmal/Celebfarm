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
import {useDispatch, useSelector} from 'react-redux';
import {
  getSelectRequest,
  getSelectSuccess,
} from '../../../../redux/reducers/HomeUserReducer';
import connectionrequest from '../../../../utils/helpers/NetInfo';
import {
  getInviteCollaboRequest,
  getInviteDetailsRequest,
} from '../../../../redux/reducers/CollaborationReducer';
import ImageProfile from '../../../../Components/ImageProfile';
import Toast from '../../../../utils/helpers/Toast';
import moment from 'moment';
import HeaderCommon from '../../../../Components/HeaderCommon';
var status = '';

function BarterInviteDiscount(props) {
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

  function dateText(date) {
    return (
      <Text
        style={{
          color: Colors.white,
          fontSize: normalize(12),
          fontFamily: Fonts.Inter_Bold,
        }}>
        {date}
      </Text>
    );
  }
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
      <HeaderCommon
        picTitle={true}
        home={true}
        back={true}
        backgroundColor={'#000'}
        title={'Invite'}
        heardetext={Colors.white}
        headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(51)}
        textfontSize={normalize(16)}
        fontFamily={Fonts.Inter_Bold}
        backScreen={() => {
          props.navigation.goBack();
          dispatch(getSelectSuccess('Invite'));
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
                resizeMode="contain"
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
                  <View
                    style={{
                      borderRadius: normalize(19),
                      backgroundColor: '#463080',
                      paddingHorizontal: normalize(10),
                      paddingVertical: normalize(3),
                      justifyContent: 'center',
                      marginRight: normalize(9),
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                      }}>
                      Barter
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
                height: normalize(1),
                width: normalize(Dimensions.get('screen').width),
                marginTop: normalize(12),
                backgroundColor: '#434540',
              }}
            />

            <View style={style.offer}>
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
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Bold,
                }}>
                {invite[0]?.campaignTitle}
              </Text>
              <View
                style={{
                  marginTop: normalize(12),
                }}>
                <Text style={style.textVoice}>{invite[0]?.campaignDesc}</Text>
              </View>

              <Text style={style.text7}>
                From {dateText(moment(invite[0]?.fromDate).format('DD MMM'))} to{' '}
                {dateText(moment(invite[0]?.toDate).format('DD MMM'))}
              </Text>
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
                            marginStart: index % 2 != 0 ? normalize(12) : 0,

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
                            }}
                            numberOfLines={2}>
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
          </>
        </ScrollView>

        <View
          style={{
            marginTop: normalize(12),
            // marginBottom: normalize(92),
          }}>
          <View style={{flexDirection: 'row'}}>
            <Button
              width={'30%'}
              height={normalize(40)}
              alignSelf={'center'}
              backgroundColor={'#000000'}
              title={'Ignore'}
              textColor={Colors.white}
              titlesingle={true}
              borderRadius={normalize(25)}
              marginHorizontal={normalize(5)}
              btnBottom={0}
              onPress={() => {
                props.navigation.goBack(), dispatch(getSelectRequest('Invite'));
                setIsAccepted(true);
                inviteRequest(true);
              }}
            />
            <ButtonLinear
              width={'60%'}
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
                inviteRequest(false);
              }}
            />
          </View>
          {/* </View> */}
        </View>
      </View>
      {/* </SafeAreaView> */}
    </SafeAreaView>
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
    fontFamily: Fonts.Inter_Medium,
    marginTop: normalize(14),
  },
  textVoice: {
    color: Colors.white,
    fontSize: normalize(12),
    fontFamily: Fonts.Inter_Light,
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
  offer: {
    backgroundColor: Colors.white,
    height: normalize(18),
    alignSelf: 'flex-start',
    marginTop: normalize(6),
    borderRadius: normalize(5),
    paddingHorizontal: normalize(7),
    justifyContent: 'center',
  },
  reel: {
    flexDirection: 'row',
    borderWidth: normalize(1),
    paddingHorizontal: normalize(22),
    paddingVertical: normalize(9),
    borderColor: '#2A2C27',
    justifyContent: 'space-between',
    borderRadius: normalize(4),
    alignItems: 'center',
  },
  circle: {
    borderRadius: normalize(18),
    height: normalize(22),
    paddingHorizontal: normalize(6),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: normalize(7),
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

export default BarterInviteDiscount;
