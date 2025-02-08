import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
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
import {ScrollView} from 'react-native-gesture-handler';
import TextInputItem from '../../../Components/TextInputItem';
import TextArea from '../../../Components/TextArea';
import ButtonLinear from '../../../Components/Button Linear';
import {useDispatch, useSelector} from 'react-redux';
import ImageProfile from '../../../Components/ImageProfile';
import connectionrequest from '../../../utils/helpers/NetInfo';
import Image from 'react-native-fast-image';
import {Video} from 'react-native-compressor';
import {
  getDeleteImageRequest,
  getUploadContentHubRequest,
  getUploadImageRequest,
  updateContentRequest,
  uploadContentRequest,
} from '../../../redux/reducers/CollaborationReducer';
import HeaderCommon from '../../../Components/HeaderCommon';
import moment from 'moment';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {imageSign} from '../../../utils/helpers/ApiRequest';
import {uploadToVideo} from '../Message/ChatService';
import showErrorAlert from '../../../utils/helpers/Toast';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
var status = '';
var arr1 = [];
var arr = [];

function DeliverableInProgressContent(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const HomeReducer = useSelector(state => state.HomeReducer);
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
  const [isSelectVideo, setSelectVideo] = useState();
  const [isSelectCar, setSelectedCar] = useState(false);
  const [isSelectVal, setSelectVal] = useState(false);
  const [deliverablesEdit, setDeliverableEdit] = useState([]);

  useEffect(() => {
    const unsuscribe = props.navigation.addListener('focus', payload => {
      arr = [];
      arr1 = [];
      deliverable();
      setInProgress(props?.route?.params?.progress);
      setDeliverable(props?.route?.params?.deliverable);

      console.log('70', props?.route?.params?.deliverable);
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
          Toast('Please connect to internet');
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
        id: deliverablesEdit?.id,
        creatorID: AuthReducer?.creatorID,
        campaignID: deliverablesEdit?.campaignID,
        status: deliverablesEdit?.status,
        contents: caption,
        deliverableType: 'InProgress',
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
          showErrorAlert('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }

  const renderItemImage = ({item, index}) => {
    console.log('url----->>>>>>>', item);
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
          imageStyle={{borderRadius: normalize(7)}}
          resizeMode="cover"></Image>
      </View>
    );
  };

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

  function uploadComponent() {
    return (
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
    );
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
          arr1.push({name: res.data.result, url: resimg?.data?.result});
          console.log('bnvnmbvns', arr1);
          setSelectVideo(false);
          setSelectVal(true);
        });
      });
      arr = [];
    } catch (e) {
      console.log(e);
    }
  }

  async function saveupload() {
    let imgArr = [],
      linkArr = [];
    for (let i = 0; i < arr1.length; i++) {
      imgArr.push(arr1[i]?.name);
      linkArr.push(arr1[i]?.url);
    }
    if (caption == undefined || caption == '') {
      showErrorAlert('Please provide a caption');
    } else if (imgArr.length == 0 || imgArr == null) {
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
            showErrorAlert('Please connect to internet');
          });
      } catch (e) {
        console.log(e);
      }
    }
  }

  if (status == '' || CollaborationReducer.status != status) {
    switch (CollaborationReducer.status) {
      case 'collaboration/getUploadImageRequest':
        status = CollaborationReducer.status;
        break;
      case 'collaboration/getUploadImageSuccess':
        status = CollaborationReducer.status;
        arr1.push({
          url: CollaborationReducer?.uploadImageResponse,
          name: arr[0],
        });
        setSelectVideo(false);
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
        arr1.pop(indexDel);
        break;
      case 'collaboration/getDeleteImageFailure':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/uploadContentRequest':
        status = CollaborationReducer.status;
        break;
      case 'collaboration/uploadContentSuccess':
        status = CollaborationReducer.status;
        console.log('hgfgcvcb', image);
        arr1 = [];
        props.navigation.navigate('ActiveContent');
        break;
      case 'collaboration/uploadContentFailure':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/updateContentRequest':
        status = CollaborationReducer.status;
        break;
      case 'collaboration/updateContentSuccess':
        status = CollaborationReducer.status;
        console.log('hgfgcvcb', image);
        // arr.push(imageUri?.name);
        arr1 = [];
        arr = [];
        props.navigation.navigate('ActiveContent');

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
                    setSelectVideo(false);
                    console.log('bnvnmbvnsfvnsdfdsf', res.data.result);
                  })
              : null;
            setSelectVideo(false);
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
                marginBottom: normalize(5),
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

  console.log(deliverablesEdit);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
      <HeaderCommon
        picTitle={true}
        home={true}
        back={true}
        backgroundColor={'#000'}
        title={'Deliverable'}
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
      <ScrollView>
        <View style={style.container}>
          <View
            style={{
              marginTop: normalize(12),
            }}>
            <View
              style={{
                borderRadius: normalize(4),
                borderWidth: normalize(1),
                borderColor: '#2A2C27',
                paddingHorizontal: normalize(9),
                marginTop: normalize(7),
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
                  <TouchableOpacity
                    style={{
                      borderRadius: normalize(19),
                      backgroundColor: '#D35C36',
                      paddingHorizontal: normalize(7),
                      justifyContent: 'center',
                      height: normalize(19),
                      marginRight: normalize(6),
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                        fontFamily: Fonts.Inter_Medium,
                      }}>
                      Content Lab
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: Colors.white,
                      height: normalize(3),
                      width: normalize(3),
                      borderRadius: normalize(3 / 2),
                      marginRight: normalize(6),
                    }}
                  />
                  <Text style={{color: Colors.white, fontSize: normalize(10)}}>
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
                    paddingHorizontal: normalize(7),
                    paddingVertical: normalize(4),
                    backgroundColor:
                      deliverables?.status == 'In Progress'
                        ? '#77C3FD1A'
                        : deliverables?.status == 'InReview'
                        ? '#2D353B'
                        : '',
                    borderRadius: normalize(19),
                  }}>
                  <Text
                    style={[
                      {
                        color:
                          deliverables?.status == 'InReview'
                            ? Colors.yellow
                            : deliverables?.status == 'In Progress'
                            ? '#77C3FD'
                            : '',
                        fontSize: normalize(12),
                        opacity: 1,
                        marginStart: 0,
                        fontFamily: Fonts.Inter_Medium,
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
                  source={Icons.active}
                  style={{height: normalize(27), width: normalize(26)}}
                  resizeMode="contain"
                />
                <Image
                  source={Icons.lineborder}
                  style={{width: normalize(86), height: normalize(7)}}
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
                    fontFamily: Fonts.Inter_Bold,
                  }}>
                  In Progress
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(10),
                    marginStart: normalize(17),
                    marginTop: normalize(7),
                    opacity: 0.6,
                  }}>
                  Approved
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(10),
                    marginEnd: normalize(4),
                    marginTop: normalize(7),
                    opacity: 0.6,
                  }}>
                  Payment
                </Text>
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
                  }}>
                  {deliverables?.name == 'Carousel Post' ? (
                    <>{uploadImageVideo()}</>
                  ) : isSelectVal == false ? (
                    <>{uploadImageVideo()}</>
                  ) : null}

                  <FlatList
                    data={arr1}
                    renderItem={renderItemImage}
                    numColumns={5}
                    contentContainerStyle={{justifyContent: 'space-between'}}
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
                      ? setSelectedCar(true)
                      : null;
                  }}
                  activeOpacity={0.9}>
                  {deliverables?.name == 'Carousel Post' ? (
                    <>{uploadImageVideo()}</>
                  ) : isSelectVal == false ? (
                    <>{uploadImageVideo()}</>
                  ) : null}

                  <FlatList
                    data={arr1}
                    renderItem={renderItemImage}
                    numColumns={5}
                    contentContainerStyle={{justifyContent: 'space-between'}}
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
                  title={'Send for Approval'}
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
                title={'Upload'} //
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
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    // flex: 1,
    paddingHorizontal: normalize(10),
    height: Dimensions.get('screen').height,
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

export default DeliverableInProgressContent;
