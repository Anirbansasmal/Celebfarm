import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Colors, Fonts} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import Button from '../../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {, } from 'react-native-gesture-handler';
import Icons from '../../../themes/icons';
import Images from '../../../themes/Images';
import ButtonLinear from '../../../Components/Button Linear';
import Modal from 'react-native-modal';
import ImageProfile from '../../../Components/ImageProfile';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../../utils/helpers/NetInfo';
import {getBarterRequest} from '../../../redux/reducers/HomeUserReducer';
import {
  getBarterExploreRequest,
  getbarterInviteExploreRequest,
  getbarterinviteExploreRequest,
  getCreatorEigibilityRequest,
} from '../../../redux/reducers/BarterUserReducer';
import Loader from '../../../utils/helpers/Loader';
import HeaderCommon from '../../../Components/HeaderCommon';
import showErrorAlert from '../../../utils/helpers/Toast';
import Requested from './Requested';
import {Youtube} from '../../../utils/helpers/YoutubeInstagramConnect';
import Barter from './Barter';
import Fallback from '../../auth/Fallback';
var status = '';
function Explore(props) {
  const [isShow, setShow] = useState(false);
  const [isSelect, setSelect] = useState(false);
  const [barter, setBarter] = useState([]);
  const [gender, setGender] = useState('');
  const [niche, setNiche] = useState('');
  const [follower, setFollower] = useState('');
  const [isGender, setIsGender] = useState(false);
  const [isNiche, setIsNiche] = useState(false);
  const [isFollower, setIsFollower] = useState(false);
  const [data, setData] = useState([
    {
      name: 'Image',
      count: 9,
      image: '',
    },
    {
      name: 'Image',
      count: 9,
      image: '',
    },
    {
      name: 'Image',
      count: 9,
      image: '',
    },
    {
      name: 'Image',
      count: 9,
      image: '',
    },
    {
      name: 'Image',
      count: 9,
      image: '',
    },
    {
      name: 'Image',
      count: 9,
      image: '',
    },
  ]);
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const BarterReducer = useSelector(state => state.BarterReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);

  async function barterDetail() {
    var obj1 = 'creatorID=' + AuthReducer?.creatorID;
    console.log(obj);
    connectionrequest()
      .then(() => {
        // setTimeout(() => {

        // }, 1000);
        dispatch(getCreatorEigibilityRequest(obj1));
      })
      .catch(err => {
        console.log(err);
        Toast('Please connect to internet');
      });
  }

  async function barterRequest() {
    try {
      var obj = {
        creatorID: AuthReducer?.creatorID,

        campaignID: barter[0]?.campaignID,

        isAccepted: false,

        isReject: false,

        isRequest: true,
      };
      console.log(obj);
      connectionrequest()
        .then(() => {
          dispatch(getbarterInviteExploreRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (error) {}
  }
  const render = ({item, index}) => {
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
            width: Dimensions.get('window').width / 2.4,
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
                width: 75,
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
            {item?.name == 'LinkInBio' || item?.name == 'CollaborativePost' ? (
              <Image
                source={Icons.tick}
                style={{height: normalize(12), width: normalize(12)}}
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
  };
  const renderEligibility = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: normalize(1),
            paddingVertical: normalize(9),
            borderColor: Colors.borderColor,
            justifyContent: 'space-between',
            paddingHorizontal: normalize(9),
            borderRadius: normalize(4),
            marginTop: normalize(6),
            marginBottom: normalize(6),
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={Icons.images}
              style={{
                width: normalize(18),
                height: normalize(18),
              }}
              resizeMode="contain"
            />
            <View>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(12),
                  marginStart: normalize(7),
                }}>
                {' '}
                Gender
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(12),
                  marginStart: normalize(7),
                }}>
                {' '}
                {gender}
              </Text>
            </View>
          </View>
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
            <Image
              source={isGender ? Icons.tickGreen : Icons.close_barter}
              style={{height: normalize(19), width: normalize(19)}}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderWidth: normalize(1),
            paddingVertical: normalize(9),
            borderColor: Colors.borderColor,
            justifyContent: 'space-between',
            paddingHorizontal: normalize(9),
            borderRadius: normalize(4),
            marginTop: normalize(6),
            marginBottom: normalize(6),
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={Icons.images}
              style={{
                width: normalize(18),
                height: normalize(18),
              }}
              resizeMode="contain"
            />
            <View>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(12),
                  marginStart: normalize(7),
                }}>
                {' '}
                Minimum{' '}
                {BarterReducer?.barterDetailsResponse?.platformType ==
                'Instagram'
                  ? 'Followers'
                  : 'Subscriber'}
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(12),
                  marginStart: normalize(7),
                }}>
                {' '}
                {follower}
              </Text>
            </View>
          </View>
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
            <Image
              source={isFollower ? Icons.tickGreen : Icons.close_barter}
              style={{height: normalize(19), width: normalize(19)}}
            />
          </View>
        </View>

        <View
          style={{
            borderWidth: normalize(1),
            paddingVertical: normalize(9),
            borderColor: Colors.borderColor,
            justifyContent: 'space-between',
            paddingHorizontal: normalize(9),
            borderRadius: normalize(4),
            marginTop: normalize(6),
            marginBottom: normalize(6),
            alignItems: 'center',
          }}>
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}> */}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(12),
                marginStart: normalize(7),
              }}>
              {' '}
              Niche
            </Text>
            {/* </View> */}
            <View
              style={{
                borderRadius: normalize(9),
                height: normalize(18),
                width: normalize(18),
                // paddingHorizontal: normalize(4),
                backgroundColor: Colors.white,
                marginStart: normalize(7),
                // position: 'absolute',
                // end: 9,
              }}>
              <Image
                source={isNiche ? Icons.tickGreen : Icons.close_barter}
                style={{height: normalize(19), width: normalize(19)}}
              />
            </View>
          </View>
          <ScrollView horizontal style={{width: '100%'}}>
            <FlatList
              data={BarterReducer?.barterDetailsResponse?.barterNiches?.split(
                ',',
              )}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      height: normalize(27),
                      paddingHorizontal: normalize(14),
                      marginStart: normalize(10),
                      marginTop: normalize(6),
                      borderRadius: normalize(19),
                      alignContent: 'center',
                      backgroundColor: '#2C1D66',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(12),
                      }}>
                      {item}
                    </Text>
                  </View>
                );
              }}
              numColumns={2}
            />
          </ScrollView>
        </View>
      </>
    );
  };
  useEffect(() => {
    barterDetail();
  }, []);
  if (status == '' || BarterReducer.status != status) {
    switch (BarterReducer.status) {
      case 'barter/getBarterExploreRequest':
        status = BarterReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'barter/getBarterExploreSuccess':
        status = BarterReducer.status;
        console.log(
          'BarterReducer?.Address?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          BarterReducer.barterCreatorEigibilityResponse?.niche,
          BarterReducer.barterDetailsResponse?.barterNiches,
        );
        var nicheVal =
          BarterReducer?.barterCreatorEigibilityResponse?.niche?.split(',');
        var nichebarter = BarterReducer?.barterDetailsResponse?.barterNiches
          ?.replace(/\s*,\s*/g, ',')
          ?.split(',');
        var nichearr = false;
        nicheVal?.some(item => {
          if (nichebarter?.includes(item)) {
            nichearr = true;
          }
          console.log(nicheVal, nichebarter, nichebarter?.includes(item));
        });
        if (nichearr) {
          setIsNiche(true);
        }
        setNiche(nichearr);
        console.log(
          BarterReducer?.barterDetailsResponse?.barterGender ==
            BarterReducer?.barterCreatorEigibilityResponse?.gender ||
            BarterReducer?.barterDetailsResponse?.barterGender ==
              BarterReducer?.barterCreatorEigibilityResponse?.gender ||
            BarterReducer?.barterDetailsResponse?.barterGender ==
              BarterReducer?.barterCreatorEigibilityResponse?.gender,
        );
        if (
          BarterReducer?.barterDetailsResponse?.barterGender ==
            BarterReducer?.barterCreatorEigibilityResponse?.gender ||
          BarterReducer?.barterDetailsResponse?.barterGender ==
            BarterReducer?.barterCreatorEigibilityResponse?.gender ||
          BarterReducer?.barterDetailsResponse?.barterGender ==
            BarterReducer?.barterCreatorEigibilityResponse?.gender
        ) {
          console.log(gender);
          setGender(BarterReducer?.barterDetailsResponse?.barterGender);
          setIsGender(
            BarterReducer?.barterCreatorEigibilityResponse?.gender == null
              ? false
              : true,
          );
        } else if (
          BarterReducer?.barterDetailsResponse?.barterGender == 'All'
        ) {
          setGender(BarterReducer?.barterDetailsResponse?.barterGender);
          setIsGender(
            BarterReducer?.barterCreatorEigibilityResponse?.gender == null
              ? false
              : true,
          );
        } else {
          setGender(BarterReducer?.barterDetailsResponse?.barterGender);
          setIsGender(false);
        }
        // console.log(
        //   parseInt(
        //     BarterReducer?.barterCreatorEigibilityResponse?.followers?.toString(),
        //   ) >=
        //     parseInt(
        //       BarterReducer?.barterDetailsResponse?.barterMinFollowers.toString(),
        //     )
        //     ? parseInt(
        //         BarterReducer?.barterDetailsResponse?.barterMinfollowers?.toString(),
        //       )
        //     : parseInt(
        //         BarterReducer?.barterDetailsResponse?.barterMinFollowers?.toString(),
        //       ),
        // );
        console.log(
          parseInt(
            BarterReducer?.barterCreatorEigibilityResponse?.followers?.toString(),
          ) >=
            parseInt(
              BarterReducer?.barterDetailsResponse?.barterMinFollowers?.toString(),
            )
            ? (setIsFollower(true),
              parseInt(
                BarterReducer?.barterDetailsResponse?.barterMinFollowers?.toString(),
              ))
            : (setIsFollower(false),
              parseInt(
                BarterReducer?.barterDetailsResponse?.barterMinFollowers?.toString(),
              )),
        );
        if (
          parseInt(BarterReducer?.barterCreatorEigibilityResponse?.followers) !=
          null
        ) {
          setFollower(
            parseInt(
              BarterReducer?.barterCreatorEigibilityResponse?.followers?.toString(),
            ) >=
              parseInt(
                BarterReducer?.barterDetailsResponse?.barterMinFollowers?.toString(),
              )
              ? (setIsFollower(true),
                parseInt(
                  BarterReducer?.barterDetailsResponse?.barterMinFollowers?.toString(),
                ))
              : (setIsFollower(false),
                parseInt(
                  BarterReducer?.barterDetailsResponse?.barterMinFollowers?.toString(),
                )),
          );
        } else {
          setFollower(
            BarterReducer?.barterDetailsResponse?.barterMinFollowers?.toString(),
          );
          setIsFollower(false);
        }
        // if (BarterReducer?.barterCreatorEigibilityResponse?.gender) {

        // }

        setBarter([BarterReducer?.barterDetailsResponse]);
        break;
      case 'barter/getBarterExploreFailure':
        status = BarterReducer.status;
        break;

      case 'barter/getbarterInviteExploreRequest':
        status = BarterReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'barter/getbarterInviteExploreSuccess':
        status = BarterReducer.status;
        setTimeout(() => {
          setSelect(true);
        }, 1000);
        break;
      case 'barter/getbarterInviteExploreFailure':
        status = BarterReducer.status;
        break;

      case 'barter/getCreatorEigibilityRequest':
        status = BarterReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'barter/getCreatorEigibilitySuccess':
        status = BarterReducer.status;
        var obj =
          'campaignID=' +
          props?.route?.params?.id +
          '&creatorID=' +
          AuthReducer?.creatorID;
        dispatch(getBarterExploreRequest(obj));
        break;
      case 'barter/getCreatorEigibilityFailure':
        status = BarterReducer.status;
        break;
    }
  }
  return (
    <>
      <Loader
        visible={
          BarterReducer?.status == 'barter/getBarterExploreRequest' ||
          BarterReducer?.status == 'barter/getbarterInviteExploreRequest'
        }
      />

      <HeaderCommon
        picTitle={true}
        home={true}
        back={true}
        backgroundColor={'#000'}
        title={'Explore'}
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
      {BarterReducer?.status == 'barter/getBarterExploreRequest' ? (
        <Fallback />
      ) : (
        <SafeAreaView style={style.container}>
          <View style={style.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <>
                <View
                  style={{
                    marginTop: normalize(24),
                    borderRadius: normalize(7),
                  }}>
                  {isShow ? (
                    <ActivityIndicator
                      style={style.loader}
                      size="large"
                      color={Colors.white}
                    />
                  ) : null}
                  <ImageBackground
                    source={
                      barter[0]?.productImageUrl == null
                        ? Images.dyning
                        : {uri: barter[0]?.productImageUrl}
                    }
                    style={{
                      height: normalize(280),
                    }}
                    onLoadStart={() => setShow(true)}
                    onLoadEnd={() => setShow(false)}
                    imageStyle={{borderRadius: normalize(6)}}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      marginTop: normalize(12),
                      borderRadius: normalize(7),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: normalize(22),
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
                          brandImageUrl={barter[0]?.brandImageUrl}
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
                          {barter[0]?.brandName}
                        </Text>
                      </View>
                      {barter[0]?.discount !== null ? (
                        <>
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
                                paddingHorizontal: normalize(10),
                                justifyContent: 'center',
                                height: normalize(16),
                                marginRight: normalize(9),
                              }}>
                              <Text
                                style={{
                                  color: Colors.white,
                                  fontSize: normalize(10),
                                }}>
                                Barter
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
                                barter[0]?.platformType == 'Instagram'
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
                              }}>
                              {/* {moment(barter[0]?.campaignDate).format('DD MMM')} */}
                            </Text>
                          </View>
                        </>
                      ) : (
                        <View></View>
                      )}
                    </View>
                    {barter[0]?.discount != null ? (
                      <View
                        style={{
                          height: normalize(1),
                          width: normalize(Dimensions.get('screen').width),
                          marginTop: normalize(12),
                          borderWidth: normalize(1),
                          borderColor: '#434540',
                        }}
                      />
                    ) : (
                      <View></View>
                    )}
                  </View>
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
                    {barter[0]?.barterProductTitle}
                  </Text>
                  <View
                    style={{
                      marginTop: normalize(9),
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={style.textVoice}>
                      {barter[0]?.barterProductDesc}
                    </Text>
                  </View>
                </View>
                {barter[0]?.deliverables != null ? (
                  <>
                    <View
                      style={{
                        marginTop: normalize(22),
                        marginBottom: normalize(12),
                        width: '100%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: normalize(14),
                            fontFamily: Fonts.Inter_Bold,
                          }}>
                          Deliverable
                        </Text>
                        <Image
                          source={
                            barter[0]?.platformType == 'Instagram'
                              ? Icons.insta
                              : Icons.youtube
                          }
                          style={{
                            width: normalize(14),
                            height: normalize(14),
                          }}
                          resizeMode="contain"
                        />
                      </View>
                      <View
                        style={{
                          marginTop: normalize(12),
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            height: normalize(1),
                            width: normalize(
                              Dimensions.get('window').width - 82,
                            ),
                            backgroundColor: Colors.grey,
                            alignSelf: 'center',
                            opacity: 0.7,
                            marginBottom: normalize(9),
                          }}></View>
                        <FlatList
                          data={barter[0]?.deliverables}
                          renderItem={render}
                          keyExtractor={item => item.id}
                          numColumns={2}
                          style={{width: '100%'}}
                          ItemSeparatorComponent={
                            <View style={{width: normalize(19)}}></View>
                          }
                          contentContainerStyle={{
                            justifyContent: 'space-around',
                          }}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: normalize(12),
                            alignItems: 'center',
                          }}></View>
                      </View>
                    </View>
                  </>
                ) : null}
                {barter[0]?.deliverables != null ? (
                  <>
                    <View
                      style={{
                        // marginTop: normalize(22),
                        marginBottom: normalize(12),
                        width: '100%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: normalize(14),
                            fontFamily: Fonts.Inter_Bold,
                          }}>
                          Creator Eligibility
                        </Text>
                      </View>
                      <View
                        style={{
                          marginTop: normalize(12),
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            height: normalize(1),
                            width: normalize(
                              Dimensions.get('window').width - 82,
                            ),
                            backgroundColor: Colors.grey,
                            alignSelf: 'center',
                            opacity: 0.7,
                            marginBottom: normalize(9),
                          }}></View>
                        {renderEligibility()}
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: normalize(12),
                            alignItems: 'center',
                          }}></View>
                      </View>
                    </View>
                  </>
                ) : null}
              </>
            </ScrollView>
          </View>
          <View
            style={{
              marginTop: normalize(12),
              marginBottom: normalize(10),
            }}>
            {/* <View style={{flexDirection: 'row', marginTop: normalize(45)}}> */}
            <ButtonLinear
              height={normalize(40)}
              alignSelf={'center'}
              backgroundColor={Colors.btnColor}
              title={
                barter[0]?.['status'] == 'Requested'
                  ? 'Already Requested'
                  : BarterReducer?.barterDetailsResponse?.platformType ==
                    'Instagram'
                  ? !BarterReducer?.barterCreatorEigibilityResponse
                      ?.isConnectedInsta ==
                    (BarterReducer?.barterDetailsResponse?.platformType ==
                      'Instagram')
                    ? 'Connect to Instagram'
                    : 'Request'
                  : BarterReducer?.barterDetailsResponse?.platformType ==
                    'Youtube'
                  ? !BarterReducer?.barterCreatorEigibilityResponse
                      ?.isConnectedYoutube ==
                    (BarterReducer?.barterDetailsResponse?.platformType ==
                      'Youtube')
                    ? 'Connect to Youtube'
                    : 'Request'
                  : 'Request'
              }
              disabled={barter[0]?.['status'] == 'Requested' ? true : false}
              width={'94%'}
              textColor={Colors.black}
              titlesingle={true}
              borderRadius={normalize(25)}
              marginHorizontal={normalize(5)}
              btnBottom={0}
              onPress={() => {
                console.log(
                  BarterReducer?.barterCreatorEigibilityResponse
                    ?.isConnectedYoutube ==
                    (BarterReducer?.barterCreatorEigibilityResponse
                      ?.platformType ==
                      'Youtube'),
                );
                ProfileReducer?.getVerificationResponse?.result?.account ==
                  true &&
                ProfileReducer?.getVerificationResponse?.result?.address ==
                  true &&
                ProfileReducer?.getVerificationResponse?.result?.profileImage ==
                  true &&
                ProfileReducer?.getVerificationResponse?.result
                  ?.aadharVerification == true
                  ? BarterReducer?.barterDetailsResponse?.platformType ==
                    'Instagram'
                    ? BarterReducer?.barterCreatorEigibilityResponse
                        ?.isConnectedInsta ==
                      (BarterReducer?.barterDetailsResponse?.platformType ==
                        'Instagram')
                      ? isNiche && isFollower && isGender
                        ? barterRequest()
                        : showErrorAlert(
                            'You are not eligible for this request',
                          )
                      : Youtube(AuthReducer?.creatorID, dispatch)
                    : BarterReducer?.barterDetailsResponse?.platformType ==
                      'Youtube'
                    ? BarterReducer?.barterCreatorEigibilityResponse
                        ?.isConnectedYoutube ==
                      (BarterReducer?.barterDetailsResponse?.platformType ==
                        'Youtube')
                      ? isNiche && isFollower && isGender
                        ? barterRequest()
                        : showErrorAlert(
                            'You are not eligible for this request',
                          )
                      : Youtube(AuthReducer?.creatorID, dispatch)
                    : null
                  : showErrorAlert(
                      'Please conplete your account setup and profile',
                    );
              }}
            />
            {/* </View> */}
            {/* </View> */}
          </View>
        </SafeAreaView>
      )}
      <Modal
        isVisible={isSelect}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        style={{width: '100%', alignSelf: 'center', margin: 0}}
        animationInTiming={800}
        animationOutTiming={1000}
        backdropColor={'#000000'}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#ddd',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#181818',
            borderTopLeftRadius: normalize(12),
            borderTopRightRadius: normalize(12),
            maxHeight: props.height,
            paddingLeft: normalize(20),
            paddingBottom: normalize(15),
            paddingTop: normalize(0),
            paddingEnd: normalize(19),
            height: normalize(130),
            flexDirection: 'row',
            // justifyContent: 'space-around',
          }}>
          <ImageBackground
            source={
              barter[0]?.productImageUrl
                ? {uri: barter[0]?.productImageUrl}
                : Images.dyning
            }
            style={{
              height: normalize(70),
              width: normalize(70),
              alignSelf: 'center',
            }}
          />
          <View
            style={{
              colors: '#0000',
              borderRadius: normalize(3),
              marginStart: normalize(12),
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: normalize(14),
                fontFamily: Fonts.Inter_Bold,
                color: Colors.white,
              }}>
              Request sent
            </Text>
            <Text
              style={{
                fontSize: normalize(11),
                fontFamily: Fonts.Inter_Regular,
                color: Colors.white,
                marginTop: normalize(3),
              }}>
              Your request has been successfully{'\n'}sent to{' '}
              {barter[0]?.brandName}.
            </Text>
            {/* {brand-name} */}
          </View>
          <TouchableOpacity
            style={{
              // position: 'absolute',
              // top: normalize(24),
              // end: normalize(18),
              // height:normalize(29),
              // backgroundColor: Colors.red,
              marginTop: normalize(19),
            }}
            onPress={() => {
              setSelect(false);
              setTimeout(() => {
                props?.navigation?.goBack();
              }, 700);
            }}>
            <Image
              source={Icons.closefilter}
              style={{
                height: normalize(19),
                width: normalize(19),
              }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
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
    fontSize: normalize(14),
    marginStart: normalize(12),
    fontFamily: Fonts.Inter_SemiBold,
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
  loader: {
    alignSelf: 'center',
  },
  textVoice: {
    color: Colors.white,
    fontSize: normalize(10),
    fontFamily: Fonts.Inter_Medium,
    opacity: 0.9,
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

export default Explore;
