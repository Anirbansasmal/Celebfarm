import React, {useCallback, useEffect, useState} from 'react';
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
import Toast from '../../../utils/helpers/Toast';

import {ScrollView} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import RNSwitch from '../../../Components/Switch';
import ButtonLinear from '../../../Components/Button Linear';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../../utils/helpers/NetInfo';
import {
  getContentLabEditRequest,
  getContentLabRequest,
} from '../../../redux/reducers/ContentLabReducer';
import Loader from '../../../utils/helpers/Loader';
import TextInputItem from '../../../Components/TextInputItem';
import HeaderCommon from '../../../Components/HeaderCommon';
import {
  addCommercialRequest,
  getCommercialRequest,
  updateCommercialRequest,
} from '../../../redux/reducers/ProfileReducer';
import showErrorAlert from '../../../utils/helpers/Toast';
var status = '',
  status1 = '';
function ContentLabEdit(props) {
  const [image, setImage] = useState({});
  const [imageObj, setImageObj] = useState('');
  const [voice, setVoice] = useState(false);
  const [short, setShort] = useState(0);
  const [long, setLong] = useState(0);
  const [Carousel, setCarousel] = useState(0);
  const [ImageCom, setComImage] = useState(0);
  const [statics, setStatic] = useState(0);

  const [contentLab, setContentLab] = useState([]);
  const [commercialinsta, setCommercialinsta] = useState([]);
  const [youtube, setYoutube] = useState([]);
  const [address2, setAddress2] = useState('0');

  const dispatch = useDispatch();
  const ContentLabReducer = useSelector(state => state.ContentLabReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  var arr = [];
  function onPressCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(response => {
      if (!response.data) {
        console.log('User cancelled image picker');
      } else {
        var imagname = response.path.substring(
          response.path.lastIndexOf('/') + 1,
        );
        console.log(imagname);
        let obj = {
          name: imagname,
          type: response.mime,
        };
        setImage(obj);
        setImageObj(response.data);
      }
    });
  }
  function onPressGallery() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        let obj = {
          name: response.filename,
          type: response.mime,
        };
        setImage(obj);
        setImageObj(response.data);
      }
    });
  }
  useEffect(() => {
    contentLabView();
    commercials();
  }, []);

  function saveCommercial() {
    var arr = [];
    try {
      commercialinsta?.map((item, index) => {
        if (item?.rate > 0) {
          arr.push({
            creatorId: AuthReducer?.creatorID,
            deliverableName: item?.deliverableName,
            platformType: item?.platformType,
            rate: item?.rate,
            id: item?.CommercialDetailsId,
          });
        }
      });
      youtube?.map((item, index) => {
        if (item?.rate > 0) {
          arr.push({
            creatorId: AuthReducer?.creatorID,
            deliverableName: item?.deliverableName,
            platformType: item?.platformType,
            rate: item?.rate,
            id: item?.CommercialDetailsId,
          });
        }
      });
      let obj = arr;
      console.log('obj=>>>', youtube);
      connectionrequest()
        .then(() => {
          dispatch(addCommercialRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {}
  }

  async function editContentLab() {
    var id = AuthReducer.creatorID;
    try {
      let obj = {
        CreatorID: id,
        IsVoiceOver: voice == 1 ? true : false,
        ShortVideoPrice: short,
        LongVideoPrice: long,
        StaticPostPrice: statics,
        StaticPostPrice: ImageCom,
        StaticPostPrice: Carousel,
        InstaSpotlight: '',
        YoutubeSpotlight: '',
        InstaFollowers: '',
        YoutubeSubscribe: '',
      };
      connectionrequest()
        .then(() => {
          console.log('login', obj);
          saveCommercial();
          dispatch(getContentLabEditRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function contentLabView() {
    var obj = {};
    try {
      connectionrequest()
        .then(() => {
          obj = 'creatorID=' + AuthReducer?.creatorID;
          dispatch(getContentLabRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {}
  }

  const renderItemComercial = useCallback(({item, index}) => {
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
              style={{height: normalize(17), width: normalize(17)}}
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
          <View
            style={{
              flexDirection: 'row',
              borderWidth: normalize(1),
              paddingVertical: normalize(4),
              paddingHorizontal: normalize(4),
              borderColor: Colors.borderColor,
              borderRadius: normalize(4),
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(12),
              }}></Text>

            <TextInputItem
              heightInput={Platform.OS == 'ios' ? normalize(22) : normalize(20)}
              widthInput={normalize(70)}
              value={item?.rate?.toString() == 0 ? '' : item?.rate?.toString()}
              placeholder="0"
              onChangeText={value => {
                const tempData = [...youtube];
                tempData[index].rate = value;
                console.log(tempData);
                setYoutube(tempData);
              }}
              marginTop={normalize(0)}
              placeholderTextColor={'#ABABAB'}
              fontFamily={Fonts.Inter_Medium}
              color={'#fff'}
              maxLength={6}
              borderRadius={0}
              keyboardType={'number-pad'}
              borderColor={Colors.borderColor}
              borderWidth={normalize(0)}
              backgroundColor={Colors.black}
              inputHeight={normalize(45)}
            />
          </View>
        </View>
      </>
    );
  }, []);

  function commercials() {
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
  function updateCommercial() {
    var arr = [];
    try {
      insta?.map((item, index) => {
        if (item?.rate > 0) {
          arr.push({
            creatorId: AuthReducer?.creatorID,
            CommercialDetailsId: item?.CommercialDetailsId,
            deliverableName: item?.deliverableName,
            platformType: item?.platformType,
            rate: item?.rate,
          });
        }
      });

      youtube?.map((item, index) => {
        if (item?.rate > 0) {
          arr.push({
            creatorId: AuthReducer?.creatorID,
            CommercialDetailsId: item?.CommercialDetailsId,
            deliverableName: item?.deliverableName,
            platformType: item?.platformType,
            rate: item?.rate,
          });
        }
      });
      let obj = arr;
      connectionrequest()
        .then(() => {
          dispatch(updateCommercialRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {}
  }
  const renderItemImage = ({item, index}) => {
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
              style={{height: normalize(17), width: normalize(17)}}
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
          <View
            style={{
              flexDirection: 'row',
              borderWidth: normalize(1),
              paddingVertical: normalize(4),
              paddingHorizontal: normalize(4),
              borderColor: Colors.borderColor,
              borderRadius: normalize(4),
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(12),
              }}></Text>

            <TextInputItem
              heightInput={Platform.OS == 'ios' ? normalize(22) : normalize(20)}
              widthInput={normalize(70)}
              value={item?.rate?.toString() == 0 ? '' : item?.rate?.toString()}
              placeholder="0"
              onChangeText={value => {
                const tempData = [...commercialinsta];
                tempData[index].rate = value;
                setCommercialinsta(tempData);
              }}
              marginTop={normalize(0)}
              placeholderTextColor={'#ABABAB'}
              fontFamily={Fonts.Inter_Medium}
              color={'#fff'}
              maxLength={6}
              borderRadius={0}
              keyboardType={'number-pad'}
              borderColor={Colors.borderColor}
              borderWidth={normalize(0)}
              backgroundColor={Colors.black}
              inputHeight={normalize(45)}
            />
          </View>
        </View>
      </>
    );
  };

  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/getCommercialRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Profile/getCommercialSuccess':
        status = ProfileReducer.status;
        var arr = [],
          arr1 = [];
        ProfileReducer?.commercialResponse?.map((item, index) => {
          if (item?.platformType == 'Instagram') {
            var obj = {
              creatorId: AuthReducer?.creatorID,
              deliverableName: item?.deliverableName,
              CommercialDetailsId: item?.id,
              platformType: item?.platformType,
              rate: item?.rate,
            };
            arr.push(obj);
            // if (item?.id > 0) {
            //   setAddress2(item?.id);
            // }
          } else if (item?.platformType == 'Youtube') {
            var obj1 = {
              creatorId: AuthReducer?.creatorID,
              deliverableName: item?.deliverableName,
              CommercialDetailsId: item?.id,
              platformType: item?.platformType,
              rate: item?.rate,
            };
            arr1.push(obj1);
            // if (item?.id > 0) {
            //   setAddress2(item?.id);
            // }
          }
        });
        console.log('arr', arr);
        setCommercialinsta(arr);
        setYoutube(arr1);
        break;
      case 'Profile/getCommercialFailure':
        status = ProfileReducer.status;
        break;
      case 'Profile/updateCommercialRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Profile/updateCommercialSuccess':
        status = ProfileReducer.status;
        console.log(
          'ProfileReducer?.updateCommercialResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          ProfileReducer.updateCommercialResponse,
        );
        break;
      case 'Profile/updateCommercialFailure':
        status = ProfileReducer.status;
        break;
      case 'Profile/addCommercialRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Profile/addCommercialSuccess':
        status = ProfileReducer.status;
        console.log(
          'ProfileReducer?.CommercialResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          ProfileReducer.addCommercialResponse,
        );
        // props?.navigation?.goBack();
        break;
      case 'Profile/addCommercialFailure':
        status = ProfileReducer.status;
        break;
    }
  }

  if (status1 == '' || status1 !== ContentLabReducer?.status) {
    switch (ContentLabReducer?.status) {
      case 'contentLab/getContentLabEditRequest':
        status1 = ContentLabReducer.status;
        break;

      case 'contentLab/getContentLabEditSuccess':
        status1 = ContentLabReducer.status;

        props.navigation.navigate('ContentLab');
        break;

      case 'contentLab/getContentLabEditFailure':
        status1 = ContentLabReducer.status;
        break;
      case 'contentLab/getContentLabRequest':
        status1 = ContentLabReducer.status;
        break;

      case 'contentLab/getContentLabSuccess':
        status1 = ContentLabReducer.status;
        setContentLab([ContentLabReducer?.contentLabResponse]);
        setVoice(ContentLabReducer?.contentLabResponse['isVoiceOver']);
        break;

      case 'contentLab/getContentLabFailure':
        status1 = ContentLabReducer.status;
        showErrorAlert(ContentLabReducer?.error?.message);
        setContentLab([]);
        break;
    }
  }
  return (
    <>
      <Loader
        visible={
          ContentLabReducer.status == 'contentLab/getContentLabEditRequest' ||
          ContentLabReducer.status == 'contentLab/getContentLabRequest'
        }
      />
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
        <HeaderCommon
          picTitle={true}
          home={true}
          back={true}
          backgroundColor={'#000'}
          title={'Content Lab'}
          heardetext={Colors.white}
          headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(61)}
          textfontSize={normalize(16)}
          fontFamily={Fonts.Inter_Bold}
          backScreen={() => {
            props.navigation.goBack();
          }}
          notifiPress={() => props.navigation.navigate('Notifications')}
          profilePress={() => props.navigation.navigate('Chat')}
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
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(16),
                    marginLeft: normalize(3),
                  }}>
                  Setup your content lab
                </Text>
                <View
                  style={{
                    height: normalize(2),
                    // width: normalize(Dimensions.get('screen').width - 91),
                  }}
                />
                {/* <TouchableOpacity
                  style={{flexDirection: 'row', justifyContent: 'center'}}
                  activeOpacity={0.7}
                  onPress={() => setSelect(!isSelect)}>
                  <ImageBackground
                    source={
                      imageObj == '' && !contentLab.length > 0
                        ? Images.content
                        : imageObj != ''
                        ? {uri: `data:image/png;base64,${imageObj}`}
                        : {uri: contentLab[0]['image']} //
                    }
                    style={{
                      width: '100%',
                      height: normalize(110),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    imageStyle={{
                      borderRadius:
                        imageObj == '' && !contentLab.length > 0
                          ? 0
                          : normalize(7),
                    }}
                    resizeMode={
                      imageObj == '' && !contentLab.length > 0
                        ? 'contain'
                        : imageObj != ''
                        ? 'cover'
                        : 'cover'
                    }>
                    {imageObj == '' && !contentLab.length > 0 ? (
                      <>
                        <Image
                          source={Icons.document_upload}
                          style={{height: normalize(12), width: normalize(12)}}
                        />
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: normalize(12),
                            marginTop: normalize(12),
                          }}>
                          Upload profile picture
                        </Text>
                      </>
                    ) : null}
                  </ImageBackground>
                </TouchableOpacity> */}
              </View>
              <View
                style={{
                  marginTop: normalize(18),
                  // backgroundColor:Colors.red,
                  borderWidth: normalize(1),
                  borderColor: Colors.borderColor,
                  padding: normalize(8),
                  borderRadius: normalize(4),
                  // marginStart: normalize(7),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(16),
                    fontFamily: Fonts.Inter_SemiBold,
                  }}>
                  Voice over
                </Text>
                <View
                  style={{
                    marginTop: normalize(7),
                    borderRadius: normalize(6),
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
                        setVoice(!voice);
                      }}
                      value={voice ? 1 : 0}
                      activeTrackColor="#C4FD65"
                      inActiveTrackColor="#C4C4C4"
                      thumbColor="#C4C4C4"
                      activethumbColor="#000"
                    />
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(12),
                        marginStart: normalize(6),
                      }}>
                      Yes
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginTop: normalize(23),
                  marginBottom: normalize(12),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(16),
                  }}>
                  Commercial
                </Text>
                <View
                  style={{
                    marginTop: normalize(12),
                    padding: normalize(9),
                    borderWidth: normalize(1),
                    borderColor: Colors.borderColor,
                    borderRadius: normalize(6),
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
                      Deliverables
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
                      width: normalize(Dimensions.get('window').width),
                      backgroundColor: '#363833',
                      alignSelf: 'center',
                      marginTop: normalize(12),
                    }}></View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: normalize(12),
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={Icons.images}
                        style={{height: normalize(17), width: normalize(17)}}
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

                    <TextInputItem
                      heightInput={
                        Platform.OS == 'ios' ? normalize(33) : normalize(27)
                      }
                      widthInput={'29%'}
                      value={ImageCom}
                      placeholder=""
                      onChangeText={text => setComImage(text)}
                      marginTop={normalize(0)}
                      placeholderTextColor={'#ABABAB'}
                      fontFamily={Fonts.Inter_Medium}
                      color={'#fff'}
                      maxLength={10}
                      borderRadius={7}
                      keyboardType={'number-pad'}
                      borderColor={Colors.borderColor}
                      borderWidth={normalize(1)}
                      backgroundColor={Colors.black}
                      inputHeight={normalize(52)}
                    />
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
                        style={{height: normalize(17), width: normalize(17)}}
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

                    <TextInputItem
                      heightInput={
                        Platform.OS == 'ios' ? normalize(33) : normalize(27)
                      }
                      widthInput={'29%'}
                      value={Carousel}
                      placeholder=""
                      onChangeText={text => setCarousel(text)}
                      marginTop={normalize(0)}
                      placeholderTextColor={'#ABABAB'}
                      fontFamily={Fonts.Inter_Medium}
                      color={'#fff'}
                      maxLength={10}
                      borderRadius={7}
                      keyboardType={'number-pad'}
                      borderColor={Colors.borderColor}
                      borderWidth={normalize(1)}
                      backgroundColor={Colors.black}
                      inputHeight={normalize(52)}
                    />
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
                        style={{height: normalize(17), width: normalize(17)}}
                      />
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(12),
                          marginRight: normalize(9),
                          marginLeft: normalize(12),
                        }}>
                        Long Video
                      </Text>
                    </View>
                    <TextInputItem
                      heightInput={
                        Platform.OS == 'ios' ? normalize(33) : normalize(27)
                      }
                      widthInput={'29%'}
                      value={long}
                      placeholder=""
                      onChangeText={text => setShort(text)}
                      marginTop={normalize(0)}
                      placeholderTextColor={'#fff'}
                      fontFamily={Fonts.Inter_Medium}
                      color={'#fff'}
                      maxLength={10}
                      borderRadius={7}
                      keyboardType={'number-pad'}
                      borderColor={Colors.borderColor}
                      borderWidth={normalize(1)}
                      backgroundColor={Colors.black}
                      inputHeight={normalize(52)}
                    />
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
                        style={{height: normalize(17), width: normalize(17)}}
                      />
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(12),
                          marginRight: normalize(9),
                          marginLeft: normalize(12),
                        }}>
                        Short Video
                      </Text>
                    </View>

                    <TextInputItem
                      heightInput={
                        Platform.OS == 'ios' ? normalize(33) : normalize(27)
                      }
                      widthInput={'29%'}
                      value={short}
                      placeholder=""
                      onChangeText={text => setLong(text)}
                      marginTop={normalize(0)}
                      placeholderTextColor={'#ABABAB'}
                      fontFamily={Fonts.Inter_Medium}
                      color={'#fff'}
                      maxLength={10}
                      borderRadius={7}
                      keyboardType={'number-pad'}
                      borderColor={Colors.borderColor}
                      borderWidth={normalize(1)}
                      backgroundColor={Colors.black}
                      inputHeight={normalize(52)}
                    />
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
                        style={{height: normalize(17), width: normalize(17)}}
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

                    <TextInputItem
                      heightInput={
                        Platform.OS == 'ios' ? normalize(33) : normalize(27)
                      }
                      widthInput={'29%'}
                      value={statics}
                      placeholder=""
                      onChangeText={text => setStatic(text)}
                      marginTop={normalize(0)}
                      placeholderTextColor={'#ABABAB'}
                      fontFamily={Fonts.Inter_Medium}
                      color={'#fff'}
                      maxLength={10}
                      borderRadius={7}
                      keyboardType={'number-pad'}
                      borderColor={Colors.borderColor}
                      borderWidth={normalize(1)}
                      backgroundColor={Colors.black}
                      inputHeight={normalize(52)}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginTop: normalize(12),
                  marginBottom: normalize(92),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(16),
                  }}>
                  Add your Spotlight
                </Text>
                <View
                  style={{
                    marginTop: normalize(12),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={style.btnSpotlight}
                    activeOpacity={0.9}
                    onPress={() =>
                      props?.navigation?.navigate('InstaContent')
                    }>
                    <Image
                      source={Icons.insta}
                      style={{height: normalize(17), width: normalize(17)}}
                      resizeMode="cover"
                    />
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(12),
                        marginRight: normalize(9),
                        marginLeft: normalize(12),
                      }}>
                      Add instagram
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={style.btnSpotlight}
                    activeOpacity={0.9}
                    onPress={() =>
                      props?.navigation?.navigate('YoutubeContentShorts')
                    }>
                    <Image
                      source={Icons.youtube}
                      style={{height: normalize(17), width: normalize(17)}}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(12),
                        marginRight: normalize(9),
                        marginLeft: normalize(12),
                      }}>
                      Add Youtube
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* </View> */}
            </>
          </ScrollView>

          <ButtonLinear
            width={'99%'}
            height={normalize(40)}
            alignSelf={'center'}
            backgroundColor={Colors.btnColor}
            title={'Update '}
            textColor={Colors.black}
            fontFamily={Fonts.Inter_SemiBold}
            titlesingle={true}
            borderRadius={normalize(25)}
            btnBottom={19}
            onPress={() => {
              editContentLab();
            }}
          />
        </View>

        {/* </SafeAreaView> */}
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
  textite: {
    color: Colors.white,
    fontSize: normalize(10),
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
  textVoice: {
    color: Colors.white,
    fontSize: normalize(10),
    width: normalize(151),
  },
  modelView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(9),
    paddingVertical: normalize(7),
    paddingHorizontal: normalize(7),
    marginEnd: normalize(18),
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
  btnSpotlight: {
    flexDirection: 'row',
    padding: normalize(12),
    borderRadius: normalize(7),
    borderWidth: normalize(1),
    borderColor: Colors.borderColor,
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

export default ContentLabEdit;
