import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../../../themes/Themes';
import normalize from '../../../../utils/helpers/dimen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../../themes/icons';
import Image from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';
import connectionrequest from '../../../../utils/helpers/NetInfo';
import {
  getDeleteImageRequest,
  getUploadContentHubRequest,
  getUploadImageRequest,
  updateContentRequest,
  uploadContentRequest,
} from '../../../../redux/reducers/CollaborationReducer';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import ImageProfile from '../../../../Components/ImageProfile';
import HeaderCommon from '../../../../Components/HeaderCommon';
import {
  getInstaImageDetails,
  getrefreshToken,
  getYoutubeDetails,
} from '../../../../utils/helpers/YoutubeInstagramConnect';
import {getYoutubeUserDetailRequest} from '../../../../redux/reducers/ProfileReducer';
import Fallback from '../../../auth/Fallback';
var status = '', status1='';
let arr1 = [];
var arr = [];

function DeliverableLive(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);

  const CollaborationReducer = useSelector(state => state.CollaborationReducer);
  const [caption, setCaption] = useState('');
  const [indexDel, setIndexDel] = useState();
  const [inprogress, setInProgress] = useState();
  const [deliverables, setDeliverable] = useState();
  const [deliverablesEdit, setDeliverableEdit] = useState([]);
  const [youtubeData, setYoutubeData] = useState([]);

  useEffect(() => {
    const unsuscribe = props.navigation.addListener('focus', payload => {
      arr = [];
      arr1 = [];
      setInProgress(props?.route?.params?.progress);
      setDeliverable(props?.route?.params?.deliverable);
      console.log(props?.route?.params?.progress);
      contentUpdate();
      setTimeout(() => {
        content();
      }, 5000);
    });
    return () => {
      unsuscribe();
    };
  }, []);
  
  async function contentUpdate() {
    console.log(ProfileReducer?.instagramuserResponse?.result?.token);
    console.log(
      '67',
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

  function getYoutube() {
    console.log(inprogress?.platform);
    try {
      inprogress?.platform == 'Instagram'
        ? getInstaImageDetails(
            CollaborationReducer?.contentHubResponse?.igMediaID,
            ProfileReducer?.instagramuserResponse?.result?.token,
          ).then(res => {
            console.log('hgfgcvcb ', res);
            setYoutubeData(res.data);
          })
        : getYoutubeDetails(
            CollaborationReducer?.contentHubResponse?.youtubeMediaID,
            JSON.parse(ProfileReducer?.youtubeuserResponse?.result?.tokens)[
              'access_token'
            ],
          ).then(res => {
            console.log('hgfgcvcb ', res);
            setYoutubeData({
              media_url: res?.data?.snippet?.thumbnails?.default?.url,
              caption: res?.data?.snippet?.description,
            });
          });
    } catch (error) {}
  }
  function pickupGallery() {
    console.log('options', options);
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 400,
      maxWidth: 400,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        var imageUri = {
          image: response.assets[0].base64,
          name: response.assets?.[0]?.fileName,
          type: response.assets?.[0]?.type,
        };
        setSelectedImage(imageUri);
        arr.push(imageUri?.name);
        setSelected(false);
        setTimeout(() => {
          uploadImage(imageUri);
        }, 2000);
      }
    });
  }

  async function payment() {}

  async function uploadImage(imageObj) {
    // console.log('nfmdf',imageObj)
    var obj = {
      id: AuthReducer?.creatorID.toString(),
      folderName: 'ContentHub',
      image64: imageObj?.image,
      imageName: imageObj?.name,
      contentType: '.' + imageObj?.type.replace('image/', ''),
      bucketName: 'dev_celebfarm',
    };
    console.log(obj);
    try {
      connectionrequest()
        .then(() => {
          dispatch(getUploadImageRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function content() {
    var obj = 'id=' + props?.route?.params?.deliverable?.contentHubID;
    let objcreator = 'creatorID=' + AuthReducer?.creatorID;
    console.log(obj);
    try {
      connectionrequest()
        .then(() => {
          dispatch(getUploadContentHubRequest(obj));
          dispatch(getYoutubeUserDetailRequest(objcreator));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }

  const renderItemEditImage = (item, vmdid, socialType) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={{marginBottom: normalize(12), marginEnd: normalize(10)}}
        onPress={() =>
          socialType == 'Instagram'
            ? Linking.openURL(vmdid)
            : Linking.openURL(`https://www.youtube.com/watch?v=${vmdid}`)
        }>
        <Image
          source={{uri: item}}
          style={{
            height: normalize(297),
            marginTop: normalize(12),
            width: normalize(270),
            flexDirection: 'row',
            alignContent: 'flex-end',
            borderRadius: normalize(4),
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  if (status == '' || CollaborationReducer.status != status) {
    switch (CollaborationReducer.status) {
      case 'collaboration/getUploadContentHubRequest':
        status = CollaborationReducer.status;
        break;
      case 'collaboration/getUploadContentHubSuccess':
        status = CollaborationReducer.status;
        if (CollaborationReducer?.contentHubResponse != null) {
          setDeliverableEdit(CollaborationReducer?.contentHubResponse);
          setCaption(CollaborationReducer?.contentHubResponse?.contents);
          getYoutube();
        } else {
        }
        console.log('hgfgcvcb 440', CollaborationReducer?.contentHubResponse);
        break;
      case 'collaboration/getUploadContentHubFailure':
        status = CollaborationReducer.status;
        break;
    }
  }
  
  if (status1 == '' || ProfileReducer?.status != status1) {
    switch (ProfileReducer?.status) {
      case 'Profile/getYoutubeDetailRequest':
        status1 = ProfileReducer.status;
        break;
      case 'Profile/getYoutubeDetailSuccess':
        status1 = ProfileReducer.status;
        break;
      case 'Profile/getYoutubeDetaiFailure':
        status1 = ProfileReducer.status;
        break;
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
          title={'Live'}
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
        {ProfileReducer.status ==
          'Profile/getYoutubeDetailRequest' ||
        CollaborationReducer.status ==
          'collaboation/getUploadContentHubRequest' ? (
          <Fallback />
        ) : (
          <ScrollView nestedScrollEnabled={true}>
            <View style={style.container}>
              <View
                style={{
                  marginTop: normalize(7),
                }}>
                <View
                  style={{
                    borderRadius: normalize(4),
                    borderWidth: normalize(1),
                    borderColor: '#2A2C27',
                    paddingHorizontal: normalize(9),
                    marginTop: normalize(12),
                    backgroundColor: Colors.bcolor,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: normalize(8),
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
                        borderRadius={normalize(9)}
                        backgroundColor={Colors.white}
                        brandImageUrl={inprogress?.brandImageUrl}
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
                        {inprogress?.brandName}
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
                          paddingHorizontal: normalize(7),
                          paddingVertical: normalize(2),
                          justifyContent: 'center',
                          marginRight: normalize(7),
                        }}>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: normalize(10),
                            fontFamily: Fonts.Inter_SemiBold,
                          }}>
                          {inprogress?.campaignType}
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: Colors.white,
                          height: normalize(3),
                          width: normalize(3),
                          borderRadius: normalize(3 / 2),
                          marginRight: normalize(7),
                        }}
                      />
                      <Image
                        source={
                          inprogress?.platform == 'Youtube'
                            ? Icons.youtube
                            : Icons.insta
                        }
                        style={style.social}
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
                        {moment(inprogress?.campaignDate).format('DD MMM')}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      marginTop: normalize(12),
                      width: normalize(Dimensions.get('window').width - 106),
                      height: normalize(2),
                      backgroundColor: '#2A2C27',
                    }}></View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: normalize(7),
                      marginBottom: normalize(9),
                      justifyContent: 'space-between',
                      // marginTop: normalize(18),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={Icons.images}
                        style={style.profileCollabration}
                        resizeMode="contain"
                      />
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(12),
                          fontFamily: Fonts.Inter_Bold,
                        }}>
                        {deliverables?.name}
                      </Text>
                    </View>

                    <View
                      style={{
                        alignItems: 'center',
                        // height: normalize(25),
                        paddingHorizontal: normalize(10),
                        paddingVertical: normalize(4),
                        backgroundColor: '#2D353B',
                        borderRadius: normalize(19),
                      }}>
                      <Text
                        style={[
                          {
                            ...style.text4,
                            color: '#7A6EFE',
                            fontSize: normalize(10),
                            opacity: 1,
                            marginStart: normalize(0),
                            fontFamily: Fonts.Inter_Bold,
                          },
                        ]}>
                        {deliverables?.status}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: normalize(18),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      paddingHorizontal: normalize(12),
                    }}>
                    <Image
                      source={Icons.activeGrey}
                      style={{height: normalize(27), width: normalize(26)}}
                      resizeMode="contain"
                    />
                    <Image
                      source={Icons.lineborder}
                      style={{width: normalize(82), height: normalize(23)}}
                      resizeMode="contain"
                    />
                    <Image
                      source={Icons.active2Grey}
                      style={{height: normalize(27), width: normalize(26)}}
                      resizeMode="contain"
                    />
                    <Image
                      source={Icons.lineborder}
                      style={{width: normalize(56), height: normalize(23)}}
                      resizeMode="contain"
                    />
                    <Image
                      source={Icons.active4}
                      style={{height: normalize(27), width: normalize(26)}}
                      resizeMode="contain"
                    />
                    {/* <Image
                    source={Icons.lineborder}
                    style={{width: normalize(26)}}
                    resizeMode="contain"
                  />
                  <Image
                    source={Icons.imagesGrey}
                    style={{height: normalize(27), width: normalize(26)}}
                    resizeMode="contain"
                  /> */}
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                        marginTop: normalize(7),
                        opacity: 0.4,
                        fontFamily: Fonts.Inter_Medium,
                      }}>
                      In Progress
                    </Text>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                        marginStart: normalize(17),
                        marginTop: normalize(7),
                        opacity: 0.4,
                        fontFamily: Fonts.Inter_Medium,
                      }}>
                      Approved
                    </Text>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(12),
                        marginEnd: normalize(10),
                        marginTop: normalize(7),
                        fontFamily: Fonts.Inter_Bold,
                      }}>
                      Live
                    </Text>
                    {/* <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(10),
                      marginEnd: normalize(4),
                      marginTop: normalize(7),
                      opacity: 0.4,
                      fontFamily: Fonts.Inter_Medium,
                    }}>
                    Payment
                  </Text> */}
                  </View>
                </View>

                <View style={{marginTop: normalize(12)}}>
                  <View
                    style={{
                      borderWidth: normalize(1),
                      borderColor: '#2A2C27',
                      padding: normalize(8),
                      borderRadius: normalize(5),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        {/* <ImageBackground
                        source={Images.profile}
                        style={style.profile}
                        imageStyle={{
                          borderRadius: normalize(42),
                        }}
                        resizeMode="contain"
                      /> */}

                        <ImageProfile
                          alignItems={'center'}
                          height={normalize(29)}
                          width={normalize(29)}
                          borderRadius={normalize(19)}
                          backgroundColor={Colors.white}
                          brandImageUrl={inprogress?.brandImageUrl}
                          imgheight={normalize(27)}
                          imgwidth={normalize(27)}
                          justifyContent={'center'}
                        />
                        <View style={{marginStart: normalize(12)}}>
                          <Text
                            style={[
                              {
                                ...style.text2,
                                fontSize: normalize(10),
                                fontFamily: Fonts.Inter_Bold,
                              },
                            ]}>
                            {inprogress?.brandName}
                          </Text>
                          <Text
                            style={[{...style.text6, fontSize: normalize(10)}]}>
                            {moment(inprogress?.dateOfPosted).format('DDD')}{' '}
                            days ago
                          </Text>
                        </View>
                      </View>
                      <Image
                        source={
                          inprogress?.platform == 'Instagram'
                            ? Icons.insta
                            : Icons.youtube
                        }
                        style={style.profileCollabration}
                        resizeMode="contain"
                      />
                    </View>
                    {renderItemEditImage(
                      inprogress?.platform == 'Instagram'
                        ? youtubeData?.media_url
                        : `https://img.youtube.com/vi/${CollaborationReducer?.contentHubResponse?.youtubeMediaID}/mqdefault.jpg`,
                      inprogress?.platform == 'Instagram'
                        ? youtubeData?.media_url
                        : CollaborationReducer?.contentHubResponse
                            ?.youtubeMediaID,
                      inprogress?.platform,
                    )}
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(12),
                        marginTop: normalize(18),
                      }}>
                      {youtubeData?.caption}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: normalize(12),
                    // width: '92%',
                  }}></View>
                {/* <ButtonLinear
                  width={'72%'}
                  height={normalize(27)}
                  backgroundColor={Colors.btnColor}
                  title={'Request Payment'}
                  textColor={Colors.black}
                  titlesingle={true}
                  alignSelf={'flex-end'}
                  borderRadius={normalize(25)}
                  marginHorizontal={normalize(5)}
                  onPress={() => {
                    // props.navigation.navigate('Otp');
                  }}
                /> */}
              </View>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </>
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
    height: normalize(34),
    width: normalize(34),
  },
  profileCollabration: {
    height: normalize(19),
    width: normalize(19),
    marginRight: normalize(7),
  },
  social: {
    height: normalize(14),
    width: normalize(14),
    marginRight: normalize(7),
  },
  profileCollabr: {
    height: normalize(12),
    width: normalize(12),
  },
  modelView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(9),
    paddingVertical: normalize(7),
    paddingHorizontal: normalize(7),
    marginEnd: normalize(18),
  },
  text4: {
    color: Colors.white,
    fontSize: normalize(12),
    alignSelf: 'center',
    color: '#77C3FD',
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

export default DeliverableLive;
