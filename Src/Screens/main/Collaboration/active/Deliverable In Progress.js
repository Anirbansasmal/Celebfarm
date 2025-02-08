'use strict';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../../../themes/Themes';
import normalize from '../../../../utils/helpers/dimen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../../themes/icons';
import Toast from '../../../../utils/helpers/Toast';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import TextArea from '../../../../Components/TextArea';
import ButtonLinear from '../../../../Components/Button Linear';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import connectionrequest from '../../../../utils/helpers/NetInfo';
import {imageSign} from '../../../../utils/helpers/ApiRequest';
import {
  getDeleteImageRequest,
  getUploadContentHubRequest,
  getUploadImageRequest,
  updateContentRequest,
  uploadContentRequest,
} from '../../../../redux/reducers/CollaborationReducer';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import Loader from '../../../../utils/helpers/Loader';
import ImageProfile from '../../../../Components/ImageProfile';
import HeaderCommon from '../../../../Components/HeaderCommon';
import {showError, uploadToVideo} from '../../Message/ChatService';
import Image from 'react-native-fast-image';
import showErrorAlert from '../../../../utils/helpers/Toast';
import Fallback from '../../../auth/Fallback';
var status = '';
var arr1 = [];
var arr = [];

function DeliverableInProgress(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const CollaborationReducer = useSelector(state => state.CollaborationReducer);
  const [selImage, setSelectedImage] = useState();
  const [image, setImage] = useState([]);
  const [isSelect, setSelected] = useState(false);
  const [editable, setEditable] = useState(false);
  const [isSelectImage, setSelectImage] = useState('');
  const [caption, setCaption] = useState('');
  const [indexDel, setIndexDel] = useState();
  const [inprogress, setInProgress] = useState();
  const [deliverables, setDeliverable] = useState();
  const [deliverablesEdit, setDeliverableEdit] = useState([]);
  const [isSelectVideo, setSelectVideo] = useState(false);
  const [isSelectVal, setSelectVal] = useState(false);
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    const unsuscribe = props.navigation.addListener('focus', payload => {
      arr = [];
      arr1 = [];
      deliverable();
      setInProgress(props?.route?.params?.progress);
      setDeliverable(props?.route?.params?.deliverable);
      console.log(props?.route?.params?.progress);
      content();
    });
    return () => {
      unsuscribe();
    };
  }, []);

  async function deliverable() {}

  function pickupGallery() {
    console.log('options', options);
    const options = {
      mediaType: 'photo',
      maxHeight: 400,
      maxWidth: 400,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        console.log('User image picker');
        var imageUri = {
          path: response.assets[0].uri,
          name: response.assets?.[0]?.fileName,
          type: response.assets?.[0]?.type,
        };
        setSelectedImage(imageUri);
        arr.push(imageUri?.name);
        setSelected(false);
        setTimeout(() => {
          uploadImage(imageUri);
        }, 500);
      }
    });
  }

  function getRandomTextNumber(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  function pickupGalleryVideo() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'video',
    }).then(video => {
      console.log(video);
      var imageUri = {
        path:
          Platform.OS === 'ios'
            ? video.path.replace('file://', '')
            : video.path,
        name: getRandomTextNumber(10),
        type: video?.mime,
      };

      setSelectedImage(imageUri);
      arr.push(imageUri?.name);
      setSelected(false);
      setTimeout(() => {
        uploadImage(imageUri);
      }, 500);
    });
  }

  function pickupGalleryImageVideo() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
    }).then(video => {
      console.log(video);
      var imageUri = {
        path:
          Platform.OS === 'ios'
            ? video.path.replace('file://', '')
            : video.path,
        name: getRandomTextNumber(10),
        type: video?.mime,
      };

      setSelectedImage(imageUri);
      arr.push(imageUri?.name);
      setSelected(false);
      setTimeout(() => {
        uploadImage(imageUri);
      }, 500);
    });
  }

  async function uploadImage(imageObj) {
    console.log('nfmdf', imageObj);
    var obj;
    if (imageObj?.type == 'video/mp4') {
      obj = {
        id: AuthReducer?.creatorID.toString(),
        folderName: 'ContentHub',
        image64: null, // Assuming it's null for now, modify if necessary
        imageName: '', // Provide fallback for optional chaining
        contentType: imageObj?.type || '', // Provide fallback for optional chaining
        bucketName: 'dev_celebfarm',
        path: imageObj?.path, // The local path of the image (for RN, you might need `uri`)
        type: imageObj?.type, // Mime type of the image
        fileName: imageObj?.name, // Name of the file
      };
    } else {
      obj = {
        id: AuthReducer?.creatorID.toString(),
        folderName: 'ContentHub',
        image64: null,
        imageName: imageObj?.name,
        contentType: '.' + imageObj?.type.replace('image/', ''),
        bucketName: 'dev_celebfarm',
        path: imageObj?.path, // The local path of the image (for RN, you might need `uri`)
        type: imageObj?.type, // Mime type of the image
        fileName: imageObj?.name, // Name of the file
      };
    }
    console.log('image upload', obj);
    try {
      setSelectVideo(true);
      var res = uploadToVideo(
        obj,
        AuthReducer?.creatorID,
        AuthReducer?.token,
      ).then(res => {
        setSelectVideo(false);
        console.log('upload', JSON.stringify(res.data));
        setSelectVideo(true);
        imageSign(
          res.data.result,
          AuthReducer?.creatorID,
          AuthReducer?.token,
        ).then(resimg => {
          console.log('bnvnmbvns', arr1);
          arr1.push({name: res.data.result, url: resimg?.data?.result});
          setSelectVideo(false);
          setSelectVal(true);
        });
      });
      arr = [];
    } catch (e) {
      console.log(e);
    }
  }

  function uploadImageVideo() {
    return (
      <>
        {isSelectVideo ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator
              visible={isSelectVideo}
              color={Colors.white}
              size={'large'}
              style={{
                height: normalize(120),
              }}
            />
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(12),
                fontFamily: Fonts.Inter_SemiBold,
              }}>
              Uploading...
            </Text>
          </View>
        ) : (
          <View
            style={{
              height: normalize(111),
              marginTop: normalize(7),
              marginBottom: normalize(7),
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              borderStyle: 'dashed',
              borderWidth: 1,
              borderColor: Colors.white,
            }}
            imageStyle={{borderRadius: normalize(4)}}>
            <Image
              source={Icons.documentupload}
              style={{
                height: normalize(44),
                width: normalize(44),
              }}
            />
            <View
              style={{
                marginStart: normalize(12),
              }}
              activeOpacity={0.9}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(12),
                }}>
                Upload Media
              </Text>
              <Text
                style={{
                  color: '#434540',
                  fontSize: normalize(10),
                  marginTop: normalize(7),
                }}>
                Aspect Ration Square - 1:1
              </Text>
              <Text
                style={{
                  color: '#434540',
                  fontSize: normalize(10),
                }}>
                Format JPG, PNG, JPEG AVI {'\n'} WMV HEVC GIF MP4 2000
              </Text>
            </View>
          </View>
        )}
      </>
    );
  }

  async function saveupload() {
    let imgArr = [],
      linkArr = [];
    for (let i = 0; i < arr1.length; i++) {
      imgArr.push(arr1[i]?.name);
      linkArr.push(arr1[i]?.url);
    }
    if (caption == '' || caption == undefined || caption == null) {
      showErrorAlert('Please enter caption');
    } else if (imgArr.length == 0 || imgArr == null) {
      showErrorAlert('Please select an image');
    } else {
      var obj = {
        id: 0,
        creatorID: AuthReducer?.creatorID,
        campaignID: CollaborationReducer?.activeDetailsResponse?.campaignID,
        status: 'InReview',
        contents: caption,
        deliverableType: props?.route?.params?.deliverable?.name,
        imageNameArr: imgArr,
      };
      console.log(obj);
      try {
        connectionrequest()
          .then(() => {
            dispatch(uploadContentRequest(obj));
          })
          .catch(err => {
            console.log(err);
            Toast('Please connect to internet');
          });
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function content() {
    var obj = 'id=' + props?.route?.params?.deliverable?.contentHubID;

    console.log(obj);
    try {
      connectionrequest()
        .then(() => {
          dispatch(getUploadContentHubRequest(obj));
        })
        .catch(err => {
          console.log(err);
          showErrorAlert('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function editContent() {
    let imgArr = [],
      linkArr = [];
    for (let i = 0; i < arr1.length; i++) {
      imgArr.push(arr1[i]?.name);
      linkArr.push(arr1[i]?.url);
    }
    if (caption == '') {
      Toast('Please enter caption');
    } else if (imgArr.length < 0) {
      Toast('Please select image');
    } else {
      var obj = {
        id: props?.route?.params?.deliverable?.contentHubID,
        creatorID: AuthReducer?.creatorID,
        campaignID: deliverablesEdit?.campaignID,
        status: deliverablesEdit?.status,
        contents: caption,
        deliverableType: 'InReview',
        imageNameArr: imgArr,
      };
      console.log(obj);
      try {
        connectionrequest()
          .then(() => {
            dispatch(updateContentRequest(obj));
          })
          .catch(err => {
            console.log(err);
            Toast('Please connect to internet');
          });
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function sentApprove() {
    let imgArr = [],
      linkArr = [];
    for (let i = 0; i < arr1.length; i++) {
      imgArr.push(arr1[i]?.name);
      linkArr.push(arr1[i]?.url);
    }
    if (caption == null || caption == undefined) {
      showError('Please provide a caption');
    } else if (imgArr.length == 0 || imgArr == null) {
      showError('Please provide an image');
    } else {
      var obj = {
        id: CollaborationReducer?.contentHubResponse?.id,
        creatorID: AuthReducer?.creatorID,
        campaignID: CollaborationReducer?.activeDetailsResponse?.campaignID,
        status: 'InReview',
        contents: caption,
        deliverableType: props?.route?.params?.deliverable?.name,
        imageNameArr: imgArr,
      };
      console.log(obj);
      try {
        connectionrequest()
          .then(() => {
            dispatch(updateContentRequest(obj));
          })
          .catch(err => {
            console.log(err);
            Toast('Please connect to internet');
          });
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function deleteImage(name) {
    var obj =
      'id=' +
      AuthReducer?.creatorID +
      '&' +
      'folderName=' +
      'ContentHub' +
      '&' +
      'imageName=' +
      name +
      '&' +
      'bucketName=' +
      'dev_celebfarm';
    console.log(obj);
    try {
      connectionrequest()
        .then(() => {
          dispatch(getDeleteImageRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }

  const renderItemImage = ({item, index}) => {
    console.log(item);
    return (
      <View
        style={{
          marginBottom: normalize(12),
          marginEnd: normalize(10),
          marginTop: normalize(12),
        }}>
        <Image
          source={{uri: item?.url}}
          style={{
            height: normalize(45),
            width: normalize(45),
            flexDirection: 'row',
            alignContent: 'flex-end',
            borderRadius: normalize(7),
          }}
          resizeMode={Image.resizeMode.cover}>
          <TouchableOpacity
            onPress={() => {
              deleteImage(item?.name);
              setIndexDel(index);
            }}
            style={{
              position: 'absolute',
              end: normalize(3),
              top: normalize(3),
            }}>
            <Image
              source={Icons.close}
              style={{height: normalize(12), width: normalize(12)}}
            />
          </TouchableOpacity>
        </Image>
      </View>
    );
  };

  const renderItemEditImage = ({item, index}) => {
    console.log(item);
    return (
      <View style={{marginBottom: normalize(12), marginEnd: normalize(10)}}>
        <Image
          source={{uri: item?.url}}
          style={{
            height: normalize(45),
            width: normalize(45),
            flexDirection: 'row',
            alignContent: 'flex-end',
            borderRadius: normalize(7),
          }}
          resizeMode={Image.resizeMode.cover}></Image>
      </View>
    );
  };

  if (status == '' || CollaborationReducer.status != status) {
    switch (CollaborationReducer.status) {
      case 'collaboration/getUploadImageRequest':
        status = CollaborationReducer.status;
        setSelectVideo(true);
        break;
      case 'collaboration/getUploadImageSuccess':
        status = CollaborationReducer.status;
        setSelectVideo(false);

        arr1.push({
          url: CollaborationReducer?.uploadImageResponse,
          name: arr[0],
        });
        console.log('hgfgcvcb 407', arr1);
        arr = [];
        break;
      case 'collaboration/getUploadImageFailure':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/getDeleteImageRequest':
        status = CollaborationReducer.status;
        break;
      case 'collaboration/getDeleteImageSuccess':
        status = CollaborationReducer.status;
        console.log('hgfgcvcb', image);
        // arr.push(imageUri?.name);
        setSelectVal(false);
        arr1.pop(indexDel);
        break;
      case 'collaboration/getDeleteImageFailure':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/uploadContentRequest':
        status = CollaborationReducer.status;
        setIsClick(true);
        break;
      case 'collaboration/uploadContentSuccess':
        status = CollaborationReducer.status;
        console.log('hgfgcvcb', image);
        arr1 = [];
        setTimeout(() => {
          props.navigation.navigate('Active');
        }, 1000);
        break;
      case 'collaboration/uploadContentFailure':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/updateContentRequest':
        status = CollaborationReducer.status;
        setIsClick(true);
        break;
      case 'collaboration/updateContentSuccess':
        status = CollaborationReducer.status;
        console.log('hgfgcvcb', image);
        // arr.push(imageUri?.name);
        if (editable == false) {
        }
        setEditable(false);
        editable == false
          ? props.navigation.navigate('Active', {
              campaignID: props?.route?.params?.campaignID,
            })
          : null;

        break;
      case 'collaboration/updateContentFailure':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/getUploadContentHubRequest':
        status = CollaborationReducer.status;
        break;
      case 'collaboration/getUploadContentHubSuccess':
        status = CollaborationReducer.status;
        if (CollaborationReducer?.contentHubResponse != null) {
          setDeliverableEdit(
            CollaborationReducer?.contentHubResponse?.deliverableType == null
              ? []
              : CollaborationReducer?.contentHubResponse,
          );
          setCaption(CollaborationReducer?.contentHubResponse?.contents);
          console.log(
            'names',
            CollaborationReducer?.contentHubResponse?.imageNames,
          );
          {
            CollaborationReducer?.contentHubResponse?.imageNames != ''
              ? CollaborationReducer?.contentHubResponse?.imageNames
                  ?.split(',')
                  ?.map(async item => {
                    var res = await imageSign(
                      item,
                      AuthReducer?.creatorID,
                      AuthReducer?.token,
                    );
                    arr1.push({name: item, url: res.data.result});
                    console.log('bnvnmbvnsfvnsdfdsf', res.data.result);
                  })
              : null;
          }
        } else {
        }
        console.log('hgfgcvcb 440', CollaborationReducer?.contentHubResponse);
        break;
      case 'collaboration/getUploadContentHubFailure':
        status = CollaborationReducer.status;
        break;
    }
  }

  return (
    <>
      <HeaderCommon
        picTitle={true}
        home={true}
        back={true}
        backgroundColor={'#000'}
        title={'In Progress'}
        heardetext={Colors.white}
        headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(51)}
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
      {CollaborationReducer.status ==
        'collaboration/getUploadContentHubRequest' ||
      CollaborationReducer.status == 'collaboration/uploadContentRequest' ||
      CollaborationReducer.status == 'collaboration/updateContentRequest' ? (
        <Fallback />
      ) : (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
          <ScrollView>
            <View style={style.container}>
              <View
                style={{
                  marginTop: normalize(12),
                }}>
                <View style={style.containerBrand}>
                  <View style={style.socialContainer}>
                    <View style={style.imageContainer}>
                      <ImageProfile
                        alignItems={'center'}
                        height={normalize(18)}
                        width={normalize(18)}
                        borderRadius={normalize(4)}
                        backgroundColor={Colors.white}
                        brandImageUrl={inprogress?.brandImageUrl}
                        imgheight={normalize(16)}
                        imgwidth={normalize(16)}
                        justifyContent={'center'}
                      />
                      <Text style={style.brandTxt}>
                        {inprogress?.brandName}
                      </Text>
                    </View>

                    <View style={style.camType}>
                      <View style={style.containerCam}>
                        <Text style={style.txtCam}>
                          {inprogress?.campaignType}
                        </Text>
                      </View>
                      <View style={style.dotCam} />
                      <Image
                        source={
                          inprogress?.platform == 'Youtube'
                            ? Icons.youtube
                            : Icons.insta
                        }
                        style={style.social}
                        resizeMode="contain"
                      />
                      <View style={style.dotCam} />
                      <Text style={style.dateTxt}>
                        {moment(inprogress?.campaignDate).format('DD MMM')}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      marginTop: normalize(12),
                      width: normalize(Dimensions.get('window').width - 106),
                      height: normalize(1),
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
                          fontFamily: Fonts.Inter_SemiBold,
                        }}>
                        {deliverables?.name}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        paddingHorizontal: normalize(10),
                        paddingVertical: normalize(3),
                        backgroundColor:
                          deliverables?.status == 'In Progress'
                            ? '#2D353B'
                            : deliverables?.status == 'InReview'
                            ? '#77C3FD1A'
                            : '',
                        borderRadius: normalize(19),
                      }}>
                      <Text
                        style={[
                          {
                            ...style.text4,
                            color:
                              deliverables?.status == 'InReview'
                                ? Colors.yellow
                                : deliverables?.status == 'In Progress'
                                ? '#77C3FD'
                                : '',
                            fontFamily: Fonts.Inter_SemiBold,
                          },
                        ]}>
                        {deliverables?.status}
                      </Text>
                    </TouchableOpacity>
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
                      source={Icons.active}
                      style={{height: normalize(27), width: normalize(26)}}
                      resizeMode="contain"
                    />
                    <Image
                      source={Icons.lineborder}
                      style={{width: normalize(84), height: normalize(7)}}
                      resizeMode="contain"
                    />
                    <Image
                      source={Icons.imagesGrey}
                      style={{height: normalize(27), width: normalize(26)}}
                      resizeMode="contain"
                    />
                    <Image
                      source={Icons.lineborder}
                      style={{width: normalize(52), height: normalize(7)}}
                      resizeMode="contain"
                    />
                    <Image
                      source={Icons.imagesGrey}
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
                      width: '90%',
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                        marginTop: normalize(7),
                        marginStart: normalize(-12),
                        fontFamily: Fonts.Inter_SemiBold,
                      }}>
                      In Progress
                    </Text>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                        marginStart: normalize(17),
                        marginTop: normalize(7),
                        fontFamily: Fonts.Inter_SemiBold,
                        opacity: 0.4,
                      }}>
                      Approved
                    </Text>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                        marginStart: normalize(17),
                        marginTop: normalize(7),
                        fontFamily: Fonts.Inter_SemiBold,
                        opacity: 0.4,
                      }}>
                      Live
                    </Text>
                    {/* <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(10),
                      marginEnd: normalize(4),
                      marginTop: normalize(7),
                      fontFamily: Fonts.Inter_SemiBold,
                      opacity: 0.4,
                    }}>
                    Payment
                  </Text> */}
                  </View>
                </View>

                {deliverablesEdit.length >= 0 && editable == false ? (
                  <>
                    <TouchableOpacity
                      style={{
                        marginTop: normalize(12),
                        borderWidth: normalize(1),
                        borderColor: '#434540',
                        paddingHorizontal: normalize(9),
                      }}
                      onPress={() => {
                        deliverables?.name == 'Reel' ||
                        deliverables?.name == 'Dedicated Video' ||
                        deliverables?.name == 'Integrated Video' ||
                        deliverables?.name == 'Shorts'
                          ? deliverables?.name == 'Dedicated Video' ||
                            deliverables?.name == 'Integrated Video' ||
                            deliverables?.name == 'Reel' ||
                            deliverables?.name == 'Shorts'
                            ? arr1.length == 1
                              ? showErrorAlert(
                                  'Please either delete previous video then you can upload a new one',
                                )
                              : pickupGalleryVideo()
                            : pickupGalleryVideo()
                          : deliverables?.name == 'Static Post' ||
                            deliverables?.name == 'Photo Story'
                          ? arr1.length == 1
                            ? showErrorAlert(
                                'Please either delete previous video then you can upload a new one',
                              )
                            : pickupGallery()
                          : deliverables?.name == 'Video Story'
                          ? arr1.length == 1
                            ? showErrorAlert(
                                'Please either delete previous video then you can upload a new one',
                              )
                            : pickupGalleryVideo()
                          : deliverables?.name == 'Carousel Post'
                          ? pickupGalleryImageVideo()
                          : null;
                      }}
                      activeOpacity={0.8}>
                      {deliverables?.name == 'Carousel Post' ? (
                        <>{uploadImageVideo()}</>
                      ) : isSelectVal == false ? (
                        <>{uploadImageVideo()}</>
                      ) : null}

                      <FlatList
                        data={arr1}
                        renderItem={renderItemImage}
                        numColumns={5}
                        contentContainerStyle={{
                          justifyContent: 'space-between',
                          marginTop: normalize(12),
                        }}
                        keyExtractor={item => item?.toString()}
                      />
                    </TouchableOpacity>

                    <TextArea
                      heightInput={
                        Platform.OS == 'ios' ? normalize(142) : normalize(140)
                      }
                      value={caption}
                      placeholder="Write your caption..."
                      onChangeText={text => setCaption(text)}
                      marginTop={normalize(18)}
                      placeholderTextColor={'#fff'}
                      fontFamily={Fonts.Inter_Medium}
                      color={'#fff'}
                      borderRadius={7}
                      borderColor={'#434540'}
                      multiline={true}
                      borderWidth={1}
                      background={Colors.black}
                    />
                  </>
                ) : editable == true ? (
                  <>
                    <View
                      style={{
                        marginTop: normalize(12),
                        borderWidth: normalize(1),
                        borderColor: '#434540',
                        paddingHorizontal: normalize(9),
                      }}>
                      {/* {isSelectVal ? ( */}
                      <TouchableOpacity
                        style={{
                          height: normalize(111),
                          marginTop: normalize(7),
                          marginBottom: normalize(7),
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          borderStyle: 'dashed',
                          borderWidth: 1,
                          borderColor: Colors.white,
                          borderRadius: normalize(4),
                        }}
                        onPress={() => {
                          deliverables?.name == 'Reel' ||
                          deliverables?.name == 'Dedicated Video' ||
                          deliverables?.name == 'Integrated Video' ||
                          deliverables?.name == 'Shorts'
                            ? deliverables?.name == 'Dedicated Video' ||
                              deliverables?.name == 'Integrated Video' ||
                              deliverables?.name == 'Reel' ||
                              deliverables?.name == 'Shorts'
                              ? arr1.length == 1
                                ? showErrorAlert(
                                    'Please either delete previous video then you can upload a new one',
                                  )
                                : pickupGalleryVideo()
                              : pickupGalleryVideo()
                            : deliverables?.name == 'Static Post' ||
                              deliverables?.name == 'Photo Story'
                            ? arr1.length == 1
                              ? showErrorAlert(
                                  'Please either delete previous photo then you can upload a new one',
                                )
                              : pickupGallery()
                            : deliverables?.name == 'Video Story'
                            ? arr1.length == 1
                              ? showErrorAlert(
                                  'Please either delete previous video then you can upload a new one',
                                )
                              : pickupGalleryVideo()
                            : deliverables?.name == 'Carousel Post'
                            ? pickupGalleryImageVideo()
                            : null;
                        }}>
                        <Image
                          source={Icons.documentupload}
                          style={{
                            height: normalize(44),
                            width: normalize(44),
                          }}
                        />
                        <View
                          style={{
                            marginStart: normalize(12),
                          }}>
                          <Text
                            style={{
                              color: Colors.white,
                              fontSize: normalize(12),
                            }}>
                            Upload Media
                          </Text>
                          <Text
                            style={{
                              color: '#434540',
                              fontSize: normalize(10),
                              marginTop: normalize(7),
                            }}>
                            Aspect Ration Square - 1:1
                          </Text>
                          <Text
                            style={{
                              color: '#434540',
                              fontSize: normalize(10),
                            }}>
                            Format JPG, PNG, JPEG 2000
                          </Text>
                        </View>
                      </TouchableOpacity>
                      {/* ) : null} */}

                      <FlatList
                        data={arr1}
                        renderItem={renderItemImage}
                        numColumns={5}
                        contentContainerStyle={{
                          justifyContent: 'space-between',
                          marginTop: normalize(12),
                        }}
                        keyExtractor={item => item?.toString()}
                      />
                    </View>

                    <TextArea
                      heightInput={
                        Platform.OS == 'ios' ? normalize(142) : normalize(140)
                      }
                      value={caption}
                      placeholder="Write your caption..."
                      onChangeText={text => setCaption(text)}
                      marginTop={normalize(18)}
                      placeholderTextColor={'#fff'}
                      fontFamily={Fonts.Inter_Medium}
                      color={'#fff'}
                      borderRadius={7}
                      borderColor={'#434540'}
                      multiline={true}
                      borderWidth={1}
                      background={Colors.black}
                    />
                  </>
                ) : (
                  <View
                    style={{
                      marginTop: normalize(12),
                      borderWidth: normalize(1),
                      borderColor: '#434540',
                      paddingHorizontal: normalize(9),
                      paddingVertical: normalize(9),
                      borderRadius: normalize(6),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          // height: normalize(25),
                          paddingHorizontal: normalize(8),
                          paddingVertical: normalize(4),
                          backgroundColor:
                            deliverables?.status == 'InReview'
                              ? '#77C3FD1A'
                              : '#77C3FD1A',
                          borderRadius: normalize(19),
                        }}>
                        <Text
                          style={[
                            {
                              ...style.text4,
                              color:
                                deliverables?.status == 'InReview'
                                  ? Colors.yellowlight
                                  : '#77C3FD',
                              fontSize: normalize(12),
                              opacity: 1,
                              fontFamily: Fonts.Inter_SemiBold,
                            },
                          ]}>
                          {deliverables?.status}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{flexDirection: 'row'}}
                        activeOpacity={0.7}
                        onPress={() => {
                          setEditable(!editable);
                        }}>
                        <Image
                          source={Icons.edit}
                          style={{height: normalize(12), width: normalize(12)}}
                        />
                        <Text
                          style={{
                            fontFamily: Fonts.Inter_Medium,
                            fontSize: normalize(10),
                            color: Colors.white,
                            marginStart: normalize(7),
                          }}>
                          Edit
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <FlatList
                      data={arr1}
                      renderItem={renderItemEditImage}
                      numColumns={5}
                      contentContainerStyle={{
                        justifyContent: 'space-between',
                        marginTop: normalize(12),
                      }}
                      keyExtractor={item => item}
                    />
                    <Text
                      style={{
                        fontFamily: Fonts.Inter_Light,
                        fontSize: normalize(10),
                        color: Colors.white,
                      }}>
                      {deliverablesEdit?.contents}
                      {/* Lorem ipsum dolor sit amet, consec tetu. Lorem ipsum dolor sit amet, consec tetu. Lorem ipsum dolor sit amet, consec tetu. Lorem ipsum dolor sit amet, consec tetu. sit amet, consec tetu. Lorem ipsum dolor sit amet, consec tetu. Lorem ipsum dolor sit amet, consec tetu. #brand #brandname  */}
                    </Text>
                  </View>
                )}
                {deliverables?.status == 'InReview' ? (
                  editable == true && deliverables?.status == 'InReview' ? (
                    <ButtonLinear
                      width={'100%'}
                      height={normalize(37)}
                      alignSelf={'center'}
                      backgroundColor={Colors.btnColor}
                      title={
                        deliverablesEdit.length <= 0
                          ? 'Upload'
                          : 'Send for Approval'
                      } //
                      textColor={Colors.black}
                      titlesingle={true}
                      borderRadius={normalize(25)}
                      marginHorizontal={normalize(5)}
                      marginTop={normalize(22)}
                      onPress={() => {
                        deliverablesEdit.length <= 0
                          ? saveupload()
                          : // editable
                            // ? editContent()
                            // :
                            sentApprove();
                      }}
                    />
                  ) : (
                    <></>
                  )
                ) : (
                  <ButtonLinear
                    width={'100%'}
                    height={normalize(37)}
                    alignSelf={'center'}
                    backgroundColor={Colors.btnColor}
                    title={
                      deliverablesEdit.length <= 0
                        ? 'Upload'
                        : // editable
                          // ? 'Edit'
                          // :
                          'Send for Approval'
                    } //
                    textColor={Colors.black}
                    titlesingle={true}
                    disabled={isClick ? true : false}
                    borderRadius={normalize(25)}
                    marginHorizontal={normalize(5)}
                    marginTop={normalize(22)}
                    onPress={() => {
                      deliverablesEdit.length <= 0
                        ? saveupload()
                        : // editable
                          // ? editContent()
                          // :
                          sentApprove();
                    }}
                  />
                )}
              </View>
            </View>
          </ScrollView>

          <Modal
            isVisible={isSelect}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            backdropTransitionOutTiming={0}
            hideModalContentWhileAnimating={true}
            style={{width: '100%', alignSelf: 'center', margin: 0}}
            animationInTiming={800}
            animationOutTiming={1000}
            backdropColor={'#000000'}
            onBackButtonPress={() => setSelected()}
            onBackdropPress={() => setSelected(false)}>
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
                maxHeight: props.height,
                paddingLeft: normalize(20),
                paddingBottom: normalize(15),
                paddingTop: normalize(19),
                height: normalize(170),
              }}>
              <LinearGradient
                colors={
                  isSelectImage != 'Gallery'
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
                    setSelectImage('Camera');
                    // pickupCamera();
                  }}>
                  <Text
                    style={{
                      fontSize: normalize(16),
                      fontFamily: Fonts.Inter_Medium,
                      color:
                        isSelectImage != 'Gallery' ? '#434540' : Colors.white,
                    }}>
                    Capture & upload photo from camera
                  </Text>
                </TouchableOpacity>
              </LinearGradient>

              <LinearGradient
                colors={
                  isSelectImage == 'Gallery'
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
                    setSelectImage('Gallery');
                    pickupGallery();
                  }}>
                  <Text
                    style={{
                      fontSize: normalize(16),
                      fontFamily: Fonts.Inter_Medium,
                      color:
                        isSelectImage == 'Gallery' ? '#434540' : Colors.white,
                    }}>
                    Upload video from gallery
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </Modal>
        </SafeAreaView>
      )}
    </>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    // flex: 1,
    paddingHorizontal: normalize(10),
    height: Dimensions.get('screen').height,
    marginBottom: normalize(19),
  },
  containerBrand: {
    borderRadius: normalize(4),
    borderWidth: normalize(1),
    borderColor: '#2A2C27',
    paddingHorizontal: normalize(9),
    marginTop: normalize(12),
    backgroundColor: Colors.bcolor,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(9),
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandTxt: {
    color: Colors.white,
    fontSize: normalize(10),
    marginStart: normalize(3),
    fontFamily: Fonts.Inter_SemiBold,
  },
  camType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerCam: {
    borderRadius: normalize(19),
    backgroundColor: '#463080',
    paddingHorizontal: normalize(7),
    paddingVertical: normalize(2),
    justifyContent: 'center',
    marginRight: normalize(4),
  },
  txtCam: {
    color: Colors.white,
    fontSize: normalize(10),
    fontFamily: Fonts.Inter_SemiBold,
  },
  dotCam: {
    backgroundColor: Colors.white,
    height: normalize(3),
    width: normalize(3),
    borderRadius: normalize(3 / 2),
    marginRight: normalize(4),
  },
  dateTxt: {
    color: Colors.white,
    fontSize: normalize(10),
    fontFamily: Fonts.Inter_Medium,
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

export default DeliverableInProgress;
