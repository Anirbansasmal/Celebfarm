import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Linking,
  SafeAreaView,
} from 'react-native';
import {Colors, Fonts} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import Icons from '../../../themes/icons';
import Images from '../../../themes/Images';
import {ScrollView} from 'react-native-gesture-handler';
import RNSwitch from '../../../Components/Switch';
import ButtonLinear from '../../../Components/Button Linear';
import {useDispatch, useSelector} from 'react-redux';
import {getContentLabRequest} from '../../../redux/reducers/ContentLabReducer';
import connectionrequest from '../../../utils/helpers/NetInfo';
import Loader from '../../../utils/helpers/Loader';
import HeaderCommon from '../../../Components/HeaderCommon';
import Image from 'react-native-fast-image';
import {
  getCommercialRequest,
  getInstagramUserDetailRequest,
  getYoutubeUserDetailRequest,
} from '../../../redux/reducers/ProfileReducer';
import {
  getInstaFeedDetails,
  getrefreshToken,
  getYoutubeDetails,
  getYoutubeFeedDetails,
} from '../../../utils/helpers/YoutubeInstagramConnect';
import HeaderData from '../../../Components/HeaderData';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import {logoutRequest} from '../../../redux/reducers/AuthReducer';
import Fallback from '../../auth/Fallback';
var status = '',
  status1 = '';
function ContentLab(props) {
  const [isContent, setIsContent] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [isShow, setShow] = useState(false);
  const ContentLabReducer = useSelector(state => state.ContentLabReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [contentLab, setContentLab] = useState([]);
  const [youtube, setYoutube] = useState([]);
  const [isSelect, setSelect] = useState('');
  const [insta, setInsta] = useState([]);
  const [instaCom, setInstaCom] = useState([]);

  var arr = [];

  useEffect(() => {
    console.log('hfgmhnfhnf');
    const unsuscribe = props.navigation.addListener('focus', payload => {
      content();
      commercial();
    });
    return () => {
      unsuscribe();
    };
  }, []);

  async function content() {
    var obj = {};
    var obj2 = `creatorID=${AuthReducer?.creatorID}`;
    try {
      connectionrequest()
        .then(() => {
          obj = 'creatorID=' + AuthReducer?.creatorID;
          dispatch(getContentLabRequest(obj));
          dispatch(getYoutubeUserDetailRequest(obj2));
          dispatch(getInstagramUserDetailRequest(obj2));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {}
  }

  function logout() {
    try {
      dispatch(logoutRequest());
    } catch (e) {
      console.log(e);
    }
  }

  function commercial() {
    try {
      let obj = 'CreatorId=' + AuthReducer?.creatorID;
      connectionrequest()
        .then(() => {
          dispatch(getCommercialRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {}
  }

  async function contentUpdate() {
    console.log(ProfileReducer?.instagramuserResponse?.result?.token);
    console.log(
      '112',
      JSON.parse(ProfileReducer?.youtubeuserResponse?.result?.tokens),
    );
    try {
      getrefreshToken(
        AuthReducer?.creatorID,
        ProfileReducer?.youtubeuserResponse?.result,
        ProfileReducer?.youtubeuserResponse?.result?.tokens,
        dispatch,
        JSON.parse(ProfileReducer?.youtubeuserResponse?.result?.tokens)[
          'servicecode'
        ],
      ).then(() => {});
    } catch (e) {
      console.log(e);
    }
  }
  async function instaYotube() {
    try {
      var arr = [],
        arr2 = [];
      console.log(ProfileReducer?.instagramuserResponse?.result?.igid);
      getInstaFeedDetails(
        'Reels',
        ProfileReducer?.instagramuserResponse?.result?.igid,
        ProfileReducer?.instagramuserResponse?.result?.token,
        7
      ).then(res => {
        console.log('insta', res?.data?.data);
        for (
          let i = 0;
          i < (res?.data?.data?.length > 6 ? 6 : res?.data?.data?.length);
          i++
        ) {
          if (res.data?.data[i].media_url) {
            arr.push({media: res.data?.data[i].media_url, type: 'Instagram'});
          }
        }
        console.log(arr);
        setInsta([...arr]);
      });

      getYoutubeFeedDetails(
        'video',
        JSON.parse(ProfileReducer?.youtubeuserResponse?.result?.tokens)[
          'access_token'
        ],
      ).then(res => {
        console.log('yotube', res?.data);
        for (
          var i = 0;
          i < (res?.data?.items?.length > 6 ? res?.data?.items?.length : 6);
          i++
        ) {
          if (res.data?.items[i]?.snippet) {
            arr2.push({
              media: res?.data?.items[i]?.snippet?.thumbnails?.maxres?.url,
              videoId: res?.data.items[i]?.id?.videoId,
              type: 'Youtube',
            });
          }
        }
        setYoutube([...arr2]);
      });
    } catch (error) {}
  }
  if (status == '' || ContentLabReducer.status != status) {
    switch (ContentLabReducer.status) {
      case 'contentLab/getContentLabRequest':
        status = ContentLabReducer.status;
        break;

      case 'contentLab/getContentLabSuccess':
        console.log('hjfvdfmnsvdfn', ContentLabReducer?.contentLabResponse);
        status = ContentLabReducer.status;
        setContentLab([
          ContentLabReducer?.contentLabResponse == null
            ? []
            : ContentLabReducer?.contentLabResponse,
        ]);
        setIsContent(
          ContentLabReducer?.contentLabResponse?.createdDate != ''
            ? true
            : false,
        );
        break;

      case 'contentLab/getContentLabFailure':
        status = ContentLabReducer.status;
        break;
    }
  }
  if (status1 == '' || ProfileReducer.status != status1) {
    switch (ProfileReducer.status) {
      case 'Profile/getYoutubeUserDetailRequest':
        status1 = ProfileReducer.status;
        break;

      case 'Profile/getYoutubeUserDetailSuccess':
        console.log('hjfvdfmnsvdfn', ProfileReducer?.contentLabResponse);
        status1 = ProfileReducer.status;
        break;

      case 'Profile/getYoutubeUserDetailFailure':
        status1 = ProfileReducer.status;
        break;

      case 'Profile/getYoutubeDetailRequest':
        status1 = ProfileReducer.status;
        break;

      case 'Profile/getYoutubeDetailSuccess':
        console.log('hjfvdfmnsvdfn', ProfileReducer?.contentLabResponse);
        status1 = ProfileReducer.status;
        instaYotube();
        break;

      case 'Profile/getYoutubeDetailFailure':
        status1 = ProfileReducer.status;
        break;

      case 'Profile/getInstagramUserDetailRequest':
        status1 = ProfileReducer.status;
        break;

      case 'Profile/getInstagramUserDetailSuccess':
        console.log('hjfvdfmnsvdfn', ProfileReducer?.contentLabResponse);
        status1 = ProfileReducer.status;
        setTimeout(() => {
          contentUpdate();
        }, 2000);
        break;

      case 'Profile/getInstagramUserDetailFailure':
        status1 = ProfileReducer.status;
        break;

      case 'Profile/getCommercialRequest':
        status1 = ProfileReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Profile/getCommercialSuccess':
        status1 = ProfileReducer.status;
        console.log(
          'ProfileReducer?.Address?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          ProfileReducer.commercialResponse,
        );
        ProfileReducer?.commercialResponse?.map((item, index) => {
          if (item?.rate > 0) {
            arr.push({
              creatorId: AuthReducer?.creatorID,
              deliverableName: item?.deliverableName,
              CommercialDetailsId: item?.id,
              platformType: item?.platformType,
              rate: item?.rate,
            });
          }
        });
        setInstaCom(arr);
        break;
      case 'Profile/getCommercialFailure':
        status1 = ProfileReducer.status;
        break;
    }
  }

  return (
    <>
      <HeaderData
        title={'Content Lab'}
        backScreen={() => setShow(!isShow)}
        notifiPress={() => props?.navigation.navigate('Notifications')}
        profilePress={() => props?.navigation.navigate('Chat')}
      />
      {ContentLabReducer.status == 'contentLab/getContentLabRequest' ? (
        <Fallback />
      ) : (
        <SafeAreaView style={{flex: 1}}>
          {isContent ? (
            <View style={style.container}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <>
                  <View
                    style={{
                      padding: normalize(6),
                      backgroundColor: '#252525',
                      marginTop: normalize(12),
                      borderRadius: normalize(7),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <ImageBackground
                        source={
                          contentLab[0]['image']
                            ? {uri: contentLab[0]['image']}
                            : Images.lab
                        }
                        style={{
                          width: normalize(100),
                          height: normalize(100),
                        }}
                        imageStyle={{
                          borderRadius: normalize(6),
                        }}
                        resizeMode={
                          Platform.OS == 'android' ? 'contain' : 'cover'
                        }
                      />
                      <View
                        style={{
                          // backgroundColor:Colors.red,
                          // justifyContent: 'space-between',
                          width: '61%',
                        }}>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            alignSelf: 'flex-end',
                            // backgroundColor: Colors.red,
                            alignItems: 'center',
                            marginEnd: '7%',
                          }}
                          activeOpacity={0.7}
                          onPress={() =>
                            props.navigation.navigate('EditProfileContentLab')
                          }>
                          <Image
                            source={Icons.edit}
                            style={{
                              height: normalize(14),
                              width: normalize(14),
                            }}
                            resizeMode="contain"
                          />
                          <Text
                            style={{
                              color: Colors.white,
                              fontSize: normalize(8),
                              marginLeft: normalize(3),
                            }}>
                            Edit Profile
                          </Text>
                        </TouchableOpacity>
                        <View
                          style={
                            {
                              // marginStart: normalize(-18),
                            }
                          }>
                          <Text
                            style={{
                              color: Colors.white,
                              fontSize: normalize(12),
                              marginBottom: normalize(7),
                              marginTop: normalize(12),
                            }}>
                            {contentLab[0]['creatorName'] ?? ''}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignContent: 'center',
                            }}>
                            <Image
                              source={Icons.location}
                              style={{
                                height: normalize(12),
                                width: normalize(12),
                              }}
                              resizeMode={'contain'}
                            />
                            <Text style={style.subText}>
                              {contentLab[0]['country'] +
                                ', ' +
                                contentLab[0]['city']}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignContent: 'center',
                            }}>
                            <Image
                              source={Icons.languagesquare}
                              style={{
                                height: normalize(12),
                                width: normalize(12),
                              }}
                            />
                            <ScrollView
                              nestedScrollEnabled={true}
                              horizontal
                              showsHorizontalScrollIndicator={false}>
                              {contentLab[0]['languages']?.map(
                                (item, index) => {
                                  return (
                                    <View
                                      style={
                                        {
                                          // width: '50%',
                                        }
                                      }>
                                      <Text style={style.subText}>
                                        {item}
                                        {','}
                                      </Text>
                                    </View>
                                  );
                                },
                              )}
                            </ScrollView>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: normalize(12),
                      }}>
                      <View style={style.socialContent}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text style={style.text7}>Followers</Text>
                          <Image
                            source={Icons.insta}
                            style={style.upimage}
                            resizeMode="contain"
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: normalize(12),
                            alignItems: 'center',
                          }}>
                          <Text style={style.text7}>
                            {ProfileReducer?.instagramuserResponse?.result
                              ?.followers == ''
                              ? '0'
                              : ProfileReducer?.instagramuserResponse?.result
                                  ?.followers}
                          </Text>
                          {/* <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          source={Icons.Arrow_drop_up_gray}
                          style={style.upimage}
                          resizeMode="contain"
                        />
                        <View style={{width: normalize(4)}}></View>
                        <Text style={style.text7}>0.4%</Text>
                      </View> */}
                        </View>
                      </View>
                      <View style={style.socialContent}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text style={style.text7}>Subscribe</Text>
                          <Image
                            source={Icons.youtube}
                            style={style.upimage}
                            resizeMode="contain"
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: normalize(12),
                            alignItems: 'center',
                          }}>
                          <Text style={style.text7}>
                            {
                              ProfileReducer?.youtubeuserResponse?.result
                                ?.subscriber
                            }
                          </Text>
                          {/* <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          source={Icons.Arrow_drop_up}
                          style={style.upimage}
                          resizeMode="contain"
                        />
                        <View style={{width: normalize(4)}}></View>
                        <Text style={style.text7}>0.4%</Text>
                      </View> */}
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: normalize(12),
                        width: '100%',
                      }}>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          backgroundColor: Colors.black,
                          borderRadius: normalize(4),
                          padding: normalize(7),
                          width: '100%',
                          flexDirection: 'row',
                        }}>
                        <View style={{}}>
                          <Text style={style.text7}>Completed Jobs</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              // justifyContent: 'space-between',
                              marginTop: normalize(12),
                            }}>
                            <Text style={style.text7}>
                              {contentLab[0] ?? ['completedJobs']
                                ? '0'
                                : contentLab[0]['completedJobs']}
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                marginStart: normalize(7),
                              }}>
                              <View style={{width: normalize(4)}}></View>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            height: normalize(45),
                            width: normalize(1),
                            backgroundColor: '#ffff',
                          }}></View>
                        <View style={{}}>
                          <Text style={style.text7}>Amount Earned</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              // justifyContent: 'space-between',
                              marginTop: normalize(12),
                            }}>
                            <Text style={style.text7}>
                              ₹
                              {contentLab[0] ?? ['amountEarned']
                                ? '0'
                                : contentLab[0]['amountEarned']}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      marginTop: normalize(33),
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(16),
                      }}>
                      Voice over
                    </Text>
                    <View
                      style={{
                        marginTop: normalize(12),
                        padding: normalize(12),
                        borderWidth: normalize(1),
                        borderColor: Colors.borderColor,
                        borderRadius: normalize(4),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={style.textVoice}>
                        Are you okay with using your voice in video?
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: normalize(12),
                            marginRight: normalize(9),
                          }}>
                          No
                        </Text>
                        <RNSwitch
                          handleOnPress={() => {
                            // getNearByGroups();
                          }}
                          value={contentLab[0]['isVoiceOver'] == true ? 1 : 0}
                          activeTrackColor="#C4FD65"
                          inActiveTrackColor="#C4C4C4"
                          thumbColor="#C4C4C4"
                          activethumbColor="#000"
                        />
                        <Text
                          style={{
                            color: Colors.white,
                            marginStart: normalize(9),
                            fontSize: normalize(12),
                          }}>
                          Yes
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      marginTop: normalize(33),
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(16),
                      }}>
                      Commercials
                    </Text>
                    <View
                      style={{
                        marginTop: normalize(12),
                        padding: normalize(12),
                        borderWidth: normalize(1),
                        borderColor: Colors.borderColor,
                        borderRadius: normalize(4),
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: normalize(12),
                          }}>
                          Items
                        </Text>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: normalize(12),
                          }}>
                          Starting at
                        </Text>
                      </View>
                      <View
                        style={{
                          height: normalize(1),
                          width: normalize(
                            Dimensions.get('window').width - 102,
                          ),
                          backgroundColor: '#363833',
                          alignSelf: 'center',
                          marginTop: normalize(12),
                        }}></View>
                      {/* <FlatList
                        data={instaCom}
                        renderItem={({item, index}) => {
                          return (
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: normalize(12),
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
                                  }}>
                                  {item?.deliverableName}
                                </Text>
                              </View>
                              <Text
                                style={{
                                  color: Colors.white,
                                  fontSize: normalize(12),
                                }}>
                                {item?.rate}
                              </Text>
                            </View>
                          );
                        }}
                        keyExtractor={index => index?.toString()}
                      /> */}
<View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: normalize(12),
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
                            }}>
                            Image
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: normalize(12),
                          }}>
                          ${contentLab[0]['staticPostPrice'] ?? '0'}
                        </Text>
                      </View><View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: normalize(12),
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
                            }}>
                            Carousel
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: normalize(12),
                          }}>
                          ${contentLab[0]['staticPostPrice'] ?? '0'}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: normalize(12),
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
                            }}>
                            Reels/Shorts
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: normalize(12),
                          }}>
                          ${contentLab[0]['staticPostPrice'] ?? '0'}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: normalize(12),
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
                            }}>
                            Long video
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: normalize(12),
                          }}>
                          ${contentLab[0]['longVideoPrice'] ?? '0'}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: normalize(12),
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
                            }}>
                            Short video
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: normalize(12),
                          }}>
                          ${contentLab[0]['shortVideoPrice'] ?? '0'}
                        </Text>
                      </View>
                      {/* </View> */}
                    </View>
                  </View>

                  <View
                    style={{
                      marginTop: normalize(33),
                      marginBottom: normalize(92),
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(16),
                      }}>
                      Spotlight
                    </Text>
                    <View
                      style={{
                        marginTop: normalize(12),
                        padding: normalize(7),
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <FlatList
                        data={[...insta, ...youtube]}
                        renderItem={({item}) => {
                          console.log(item);
                          return (
                            <>
                              <TouchableOpacity
                                onPress={() =>
                                  // props.navigation.navigate('SpotlightInsta')
                                  {
                                    item?.type == 'Instagram'
                                      ? Linking.openURL(item?.media)
                                      : Linking.openURL(
                                          `https://www.youtube.com/watch?v=${item?.videoId}`,
                                        );
                                  }
                                }>
                                <Image
                                  source={{uri: item?.media}}
                                  style={{
                                    height: normalize(130),
                                    width: normalize(
                                      Dimensions.get('window').width / 3,
                                    ),
                                    marginEnd: normalize(6),
                                    borderRadius: normalize(3),
                                  }}
                                  resizeMode={Image.resizeMode.cover}>
                                  <Image
                                    source={
                                      item?.type == 'Instagram'
                                        ? Icons.insta
                                        : Icons.youtube
                                    }
                                    style={{
                                      position: 'absolute',
                                      end: 10,
                                      top: 7,
                                      height: 18,
                                      width: 18,
                                    }}
                                  />
                                </Image>
                              </TouchableOpacity>
                            </>
                          );
                        }}
                        keyExtractor={index => index?.toString()}
                        horizontal={true}
                      />
                    </View>
                  </View>
                </>
              </ScrollView>
            </View>
          ) : (
            <View style={style.container}>
              {/* <ScrollView showsVerticalScrollIndicator={false}> */}
              <View
                style={{
                  justifyContent: 'space-between',
                  height: '90%',
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(16),
                    marginLeft: normalize(3),
                    marginTop: normalize(17),
                    fontFamily: Fonts.Inter_Bold,
                    alignSelf: 'flex-start',
                  }}>
                  Setup your content lab
                </Text>

                <View
                  style={{
                    position: 'absolute',
                    bottom: normalize(10),
                    alignSelf: 'center',
                    bottom: 0,
                    // top:0,
                  }}>
                  <ButtonLinear
                    width={'84%'}
                    height={normalize(40)}
                    alignSelf={'center'}
                    backgroundColor={Colors.btnColor}
                    title={'Get Started'}
                    textColor={Colors.black}
                    fontFamily={Fonts.Inter_SemiBold}
                    titlesingle={true}
                    borderRadius={normalize(25)}
                    // btnBottom={79}
                    onPress={() => {
                      props?.navigation?.navigate('EditProfileContentLab');
                    }}
                  />
                </View>
              </View>
              {/* </ScrollView> */}
            </View>
          )}
        </SafeAreaView>
      )}
      <Modal
        isVisible={isShow}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        style={{width: '100%', alignSelf: 'center', margin: 0}}
        animationInTiming={800}
        animationOutTiming={1000}
        backdropColor={'#000000'}
        onBackButtonPress={() => onBackdropPress()}
        onBackdropPress={() => {
          setShow(false), setSelect('');
        }}>
        {/* <ScrollView> */}
        <View
          style={{
            flex: 1,
            backgroundColor: '#ddd',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#181818',
            borderTopLeftRadius: normalize(17),
            borderTopRightRadius: normalize(17),
            maxHeight: normalize(250),
            paddingLeft: normalize(20),
            paddingBottom: normalize(15),
            paddingTop: normalize(19),
            height: normalize(270),
          }}>
          <LinearGradient
            colors={
              isSelect == 'Account'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={[
              {
                borderRadius: normalize(3),
              },
            ]}>
            <TouchableOpacity
              style={[
                {
                  ...style.modelView,
                  marginTop: normalize(0),
                  // backgroundColor: isSelect == 'Account' ? '#C4FD65' : '#0000',
                },
              ]}
              onPress={() => {
                props.navigation.navigate('Account'), setShow(false);
                setSelect('Account');
                console.log('kfhdsfgdsh');
              }}>
              <Image
                source={Icons.useracc}
                style={[
                  {
                    ...style.imagem,
                    tintColor:
                      isSelect != 'Account' ? Colors.white : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color: isSelect != 'Account' ? Colors.white : '#434540',
                }}>
                Account
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={
              isSelect == 'PushNotification'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={{
              borderRadius: normalize(3),
            }}>
            <TouchableOpacity
              style={[
                {
                  ...style.modelView,
                  marginTop: normalize(0),
                },
              ]}
              onPress={() => {
                props.navigation.navigate('PushNotifications'), setShow(false);
                setSelect('PushNotification');
              }}>
              <Image
                source={Icons.notificationacc}
                style={[
                  {
                    ...style.imagem,
                    tintColor:
                      isSelect != 'PushNotification'
                        ? Colors.white
                        : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color:
                    isSelect != 'PushNotification' ? Colors.white : '#434540',
                }}>
                Push Notification
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          {/* <LinearGradient
            colors={
              isSelect == 'Privacy'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={{
              borderRadius: normalize(3),
            }}>
            <TouchableOpacity
              style={[
                {
                  ...style.modelView,
                  marginTop: 0,
                },
              ]}
              onPress={() => {
                props.navigation.navigate('PrivacyPolicy'), setShow(false);
                setSelect('Privacy');
              }}>
              <Image
                source={Icons.documentuploadacc}
                style={[
                  {
                    ...style.imagem,
                    tintColor:
                      isSelect != 'Privacy' ? Colors.white : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color: isSelect != 'Privacy' ? Colors.white : '#434540',
                }}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </LinearGradient> */}
          <LinearGradient
            colors={
              isSelect == 'Terms'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={{
              borderRadius: normalize(3),
            }}>
            <TouchableOpacity
              style={[
                {
                  ...style.modelView,
                  marginTop: normalize(0),
                },
              ]}
              onPress={() => {
                props.navigation.navigate('Terms'), setShow(false);
                setSelect('Terms');
              }}>
              <Image
                source={Icons.elementacc}
                style={[
                  {
                    ...style.imagem,
                    tintColor:
                      isSelect != 'Terms' ? Colors.white : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color: isSelect != 'Terms' ? Colors.white : '#434540',
                }}>
                Terms of Use
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          {/* <LinearGradient
            colors={
              isSelect == 'FAQs'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={{
              borderRadius: normalize(3),
            }}>
            <TouchableOpacity
              style={[
                {
                  ...style.modelView,
                  marginTop: normalize(0),
                },
              ]}
              onPress={() => {
                // props.navigation.navigate('FAQ’s'),
                setShow(false);
                setSelect('FAQs');
              }}>
              <Image
                source={Icons.useracc}
                style={[
                  {
                    ...style.imagem,
                    tintColor: isSelect != 'FAQs' ? Colors.white : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color: isSelect != 'FAQs' ? Colors.white : '#434540',
                }}>
                FAQ’s
              </Text>
            </TouchableOpacity>
          </LinearGradient> */}
          <LinearGradient
            colors={
              isSelect == 'Contact'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={{
              borderRadius: normalize(3),
            }}>
            <TouchableOpacity
              style={[
                {
                  ...style.modelView,
                  marginTop: normalize(0),
                },
              ]}
              onPress={() => {
                props.navigation.navigate('ContactUsSend'), setShow(false);
                setSelect('Contact');
              }}>
              <Image
                source={Icons.useracc}
                style={[
                  {
                    ...style.imagem,
                    tintColor:
                      isSelect != 'Contact' ? Colors.white : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color: isSelect != 'Contact' ? Colors.white : '#434540',
                }}>
                Contact Us
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={
              isSelect == 'Logout'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={{
              borderRadius: normalize(3),
              marginTop: normalize(29),
            }}>
            <TouchableOpacity
              style={[{...style.modelView, marginTop: normalize(0)}]}
              onPress={() => {
                // props.navigation.navigate('Login');
                logout();
                setSelect('Logout');
              }}>
              <Image
                source={Icons.useracc}
                style={[
                  {
                    ...style.imagem,
                    tintColor:
                      isSelect != 'Logout' ? Colors.white : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color: isSelect != 'Logout' ? Colors.white : '#434540',
                }}>
                Log out
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        {/* </ScrollView> */}
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
  socialContent: {
    justifyContent: 'space-between',
    backgroundColor: Colors.black,
    borderRadius: normalize(4),
    padding: normalize(7),
    width: '48%',
  },
  imagem: {
    height: normalize(16),
    width: normalize(16),
    tintColor: Colors.black,
    marginEnd: normalize(9),
  },
  modelView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(9),
    paddingVertical: normalize(7),
    paddingHorizontal: normalize(7),
    marginEnd: normalize(18),
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
    width: normalize(170),
  },
  imageLeft: {
    height: normalize(18),
    width: normalize(17),
  },
  upimage: {
    height: normalize(12),
    width: normalize(12),
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
  subText: {
    color: Colors.white,
    fontSize: normalize(10),
    marginLeft: normalize(3),
    marginBottom: normalize(9),
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
export default ContentLab;
