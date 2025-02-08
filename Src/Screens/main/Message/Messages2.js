import React, {useCallback, useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ImageBackground,
  TextInput,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import {Colors, Fonts, Images, Icons} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import MyStatusBar from '../../../utils/MyStatusBar';
import Button from '../../../Components/Button';
import ActionSheet from 'react-native-actionsheet';
import {useSelector, useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import moment from 'moment';
import _ from 'lodash';
import FileViewer from 'react-native-file-viewer';
import {io} from 'socket.io-client';
import DocumentPicker from 'react-native-document-picker';
import {
  getApi,
  getPreparedImageData,
  imageSignFile,
  postApi,
  uploadFile,
  uploadPdf,
  uploadToFile,
  uploadToFileVideo,
} from './ChatService';
import Loader from '../../../utils/helpers/Loader';
import ImageCropPicker from 'react-native-image-crop-picker';
import {PERMISSIONS, request} from 'react-native-permissions';
const {width, height} = Dimensions.get('screen');
import RNFS from 'react-native-fs';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';

let status = '';

export default function Messages(props) {
  const {firstId, senderDetails, client, socket, onlineUser} =
    props?.route?.params;

  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [prevChat, setPrevChat] = useState([]);
  const [textMsg, setTextMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isEmojee, setIsemojee] = useState(false);
  const [online, setOnline] = useState('');
  const [pickedDocument, setPickedDocument] = useState(null);
  const [docType, setdocType] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [chatId, setChatid] = useState('');
  const [loadChat, setLoadChat] = useState([
    {
      id: 1,
      name: 'John Doe',
      lastmsg: 'Nunc tincidunt eleifend urna',
      time: '16.56',
      isOnline: true,
    },
    {
      id: 2,
      name: 'Amanda D.',
      lastmsg: 'Duis accumsan nibh id',
      time: 'Thu',
      isOnline: true,
    },

    {
      id: 3,
      name: 'Dylan Berry',
      lastmsg: 'Vestibulum suscipit tincidunt',
      time: 'Thu',
      isOnline: true,
    },
  ]);
  const [message, setMessage] = useState([]);

  const flatListRef = useRef(null);

  let actionSheet = useRef();
  var optionArray = [
    'Upload Document From Phone',
    // 'Scan Document',
    'Upload Image From Phone',
    'Cancel',
  ];

  const showActionSheet = () => {
    //To show the Bottom ActionSheet
    actionSheet.current.show();
  };

  // uploadDoc = () => {};

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.xls,
          DocumentPicker.types.xlsx,
          DocumentPicker.types.plainText,
        ],
        allowMultiSelection: false,
      });

      console.log(
        result[0].uri,
        result[0].type, // mime type
        result[0].name,
        result[0].size,
      );

      setPickedDocument(result[0]);

      sendAttachmentFile(result[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the document picker
        console.log('Document picker cancelled.');
      } else {
        console.error('Error picking document:', err);
      }
    }
  };

  const sendAttachment = async item => {
    const header = {
      'Content-Type': 'multipart/form-data',
      authorization: AuthReducer?.token,
    };
    const response = await uploadToFile(
      item,
      chatId,
      AuthReducer?.token,
      client?.creatorID,
    );
    console.log(
      'res-chat-file-upload',
      response.data,
      response.data?.fileDetails?.full_url,
    );

    const payload = {
      senderid: client.creatorID,
      message: '',
      chatid: chatId,
      msg_type: 'attachment',
      attachment: item?.name,
      sender_type: 'Creator',
    };
    const payload1 = {
      senderid: client.creatorID,
      message: '',
      chatid: chatId,
      msg_type: 'attachment',
      attachmentName: item?.name,
      attachment: await chatImage(item?.name),
      sender_type: 'Creator',
    };

    console.log('payload doc upload', payload);

    socket.emit('sendMessage', {...payload, recipientId: firstId});
    setPrevChat(prev => [...prev, {...payload1, recipientId: firstId}]);
    const response1 = await postApi('/chat/messages/create', payload, header);

    setMessage('');
  };

  const sendAttachmentFile = async item => {
    const header = {
      'Content-Type': 'multipart/form-data',
      authorization: AuthReducer?.token,
    };

    const response = await uploadToFileVideo(item, chatId, AuthReducer?.token);
    console.log('res-chat-file-upload', response.data);
    const payload = {
      senderid: client.creatorID,
      message: '',
      chatid: chatId,
      msg_type: 'attachment',
      attachment: item?.name,
      sender_type: 'Creator',
    };

    const payload1 = {
      senderid: client.creatorID,
      message: '',
      chatid: chatId,
      msg_type: 'attachment',
      attachment: await chatImage(item?.name),
      attachmentName: item?.name,
      sender_type: 'Creator',
    };
    console.log('payload doc upload', payload);
    socket.emit('sendMessage', {
      ...payload,
      recipientId: firstId,
      type: 'Creator',
    });
    setPrevChat(prev => [...prev, {...payload, recipientId: firstId}]);
    const response1 = await postApi('/chat/messages/create', payload, header);

    setMessage('');
  };

  const getAttachmentType = attachment => {
    const fileExtension = attachment.split('.').pop();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
      return 'image';
    } else if (fileExtension === 'pdf') {
      return 'pdf';
    } else if (['doc', 'docx'].includes(fileExtension)) {
      return 'doc';
    }
    return 'other';
  };

  const getUrlExtension = url => {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  };

  const showDoc = async url => {
    try {
      const extension = getUrlExtension(url);

      const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;

      const options = {
        fromUrl: url,
        toFile: localFile,
      };
      console.log(extension);
      await RNFS.downloadFile(options).promise;

      RNFS.downloadFile(options)
        .promise.then(res => {
          console.log(res);
          FileViewer.open(localFile);
        })
        .then(resfile => {
          // success
          console.log('file saved to', res.path);
        })
        .catch(error => {
          // error
        });
    } catch (e) {}
  };
  useEffect(() => {
    // setTimeout(() => {
    // }, 1000);
    // readMsg();
  }, []);

  useEffect(() => {
    // console.log('get-online');
    socket.on('getOnlineUsers', data => {
      console.log('get-online', data);
      console.log('user.id', firstId);
      if (parseInt(data.senderId) == parseInt(firstId)) {
        // setCurrentChatUserName(data.chatUserName);
        setOnline(data.message ? true : false);
      }
    });
    return () => {
      socket.off('getOnlineUsers');
    };
  }, [socket]);

  useEffect(() => {
    try {
      const header = {
        authorization: AuthReducer.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
      const payload = {
        firstId: AuthReducer?.creatorID,
        secondId: firstId,
        type: 'Creator',
      };
      console.log(payload);
      // if (parseInt(user) != parseInt(data?.chatId)) return;
      postApi('/chat', payload, header).then(res => {
        console.log('302 res', res);
        setChatid(res?.data[0]?.id);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      getRoomChat(chatId);
    }, 1400);
  }, [chatId]);
  useEffect(() => {
    if (socket === null) return;
    socket.on('getMessage', data => {
      console.log('data', data);
      setPrevChat(prev => [...prev, data]);

      //setMessages(prev => [...prev, data]);
    });
    socket.on('getTyping', data => {
      console.log('get-Typing', data);
      console.log('user.id', firstId);
      if (parseInt(data.senderId) == parseInt(firstId)) {
        // setCurrentChatUserName(data.chatUserName);
        setTyping(data.message ? true : false);
      }
    });
    return () => {
      socket.off('getMessage');
      socket.off('getTyping');
      // socket.off('getOnlineUsers');
    };
  }, [socket, firstId]);

  useEffect(() => {
    scrollToBottom();
  }, [prevChat]);

  const readMsg = async () => {
    const payload = {
      chatid: chatId,
      senderid: client.id,
    };
    // const response = await postApi(payload);
  };

  async function getRoomChat(id) {
    var arr = [];
    setIsLoading(true);
    const header = {
      'Content-Type': 'application/json',
      authorization: AuthReducer?.token,
      Accept: 'application/json',
    };
    console.log(header);
    const response = await getApi('/chat/messages/' + id, header);
    console.log('303', response);
    if (response.status == 200) {
      for (const item of response.data) {
        const res =
          item?.msg_type === 'attachment'
            ? await chatImage(item?.attachment) // Wait for chatImage to resolve before moving on
            : null;

        arr.push({
          attachment: res,
          attachmentName: item?.attachment,
          chatid: item?.chatid,
          id: item?.id,
          is_read: item?.is_read,
          message: item?.message,
          msg_type: item?.msg_type,
          sender_type: item?.sender_type,
          senderid: item?.senderid,
          timestamp: item?.timestamp,
        });
      }

      setPrevChat([...arr]);
      setTimeout(() => {
        scrollToBottom();
        setIsLoading(false);
      }, 500);
    } else {
      setIsLoading(false);
      showMessage({
        message: 'Not able to fetch old chat.',
        duration: 2000,
        type: 'danger',
      });
    }
  }
  async function chatImage(item) {
    var image = '';
    try {
      await imageSignFile(item, chatId, AuthReducer?.token).then(res => {
        image = res?.data?.result;
        // console.log('164', res?.data?.result);
      });
      return image;
    } catch (error) {}
  }
  const sendTextChat = async () => {
    if (message.length > 0) {
      const payload = {
        senderid: client.creatorID,
        message: message,
        chatid: chatId,
        msg_type: 'text',
      };
      const payload1 = {
        senderid: client.creatorID,
        message: message,
        // recipientId:firstId,
        chatid: chatId,
        msg_type: 'text',
        sender_type: 'Creator',
      };
      console.log('payload', payload);

      socket.emit('sendMessage', {
        ...payload,
        recipientId: firstId,
        type: 'Creator',
      });
      setPrevChat(prev => [...prev, {...payload, recipientId: firstId}]);
      const header = {
        'Content-Type': 'application/json',
        authorization: AuthReducer?.token,
        Accept: 'application/json',
      };
      console.log(header);
      const response = await postApi('/chat/messages/create', payload1, header)
        .then(res => {
          console.log(response);
          setMessage('');
        })
        .catch(err => {
          console.log(err);
        });

      scrollToBottom();
      console.log(response);
    }
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({animated: true});
      }, 500);
    }
  };

  const handleKeyup = () => {
    socket.emit('typing', {
      typing: true,
      recipientId: firstId,
      senderid: client.creatorID,
      chatUserName: client.fname,
    });
  };

  const handleKeyDown = () => {
    // Clear any existing timeout
    // clearTimeout(typingTimeout);
    socket.emit('typing', {
      typing: false,
      recipientId: firstId,
      senderid: client.creatorID,
      chatUserName: client.fname,
    });
    // const newTimeout = setTimeout(() => {
    //   socket.emit("typing", { typing: false, recipientId, chatUserId:userDetails.id,chatUserName:userDetails.fname });
    // }, 500);
    // setTypingTimeout(newTimeout);
  };

  const openImagePicker = type => {
    if (Platform.OS == 'android' && Platform.Version >= 33) {
      let options = {
        includeBase64: true,
        mediaType: type == 'camera' ? 'photo' : type,
        cropping: type == 'video' ? false : true,
        multiple: false,
        freeStyleCropEnabled: true,
        maxFiles: 1,
        height: 400,
        width: 400,
        cropperChooseText: 'confirm',

        cropperCancelText: 'Back',
      };
      if (type == 'camera') {
        ImageCropPicker.openCamera({options}).then(image => {
          let imageObject = getPreparedImageData(image);
          setdocType('image');
          setPickedDocument(imageObject);

          console.log(image);
        });
      } else {
        ImageCropPicker.openPicker(options).then(async image => {
          let totalSize = 0;
          let inValidFileName = '';
          let filename = image.path
            .split('/')
            .pop()
            .split('#')[0]
            .split('?')[0];
          if (type == 'image') {
            if (image.mime != 'image/jpeg' && image.mime != 'image/png') {
              inValidFileName = filename;
            }
          } else if (type == 'video') {
            if (image.mime != 'video/mp4' && image.mime != 'video/mpeg') {
              inValidFileName = filename;
            }
          } else if (type == 'audio') {
            if (image.mime != 'audio/mpeg' || image.mime != 'audio/wav') {
              inValidFileName = filename;
            }
          }
          totalSize += image.size;

          if (inValidFileName != '') {
            Alert.alert('Invalid file type. - ' + inValidFileName);
            return false;
          }

          if (totalSize / 1000000 > 50) {
            Alert.alert('Files size is more than 50mb.');
            return false;
          }
          let imageObject = getPreparedImageData(image);
          console.log('image', imageObject);
          setdocType('image');
          setPickedDocument(imageObject);
          type == 'video'
            ? sendAttachmentFile(imageObject)
            : sendAttachment(imageObject);
        });
      }
    } else {
      try {
        let options = {
          includeBase64: true,
          mediaType: type == 'camera' ? 'photo' : type,
          cropping: true,
          multiple: false,
          freeStyleCropEnabled: true,
          maxFiles: 10,
          height: 400,
          width: 400,
          cropperChooseText: 'confirm',
          cropperCancelText: 'Back',
          // multiple:false
        };
        {
          type == 'camera'
            ? request(
                Platform.select({
                  android: PERMISSIONS.ANDROID.CAMERA,
                  ios: PERMISSIONS.IOS.CAMERA,
                }),
              ).then(response => {
                if (response === 'granted') {
                  ImageCropPicker.openCamera({options}).then(image => {
                    // setIsUploading(false);
                    let imageObject = getPreparedImageData(image);

                    setdocType('image');
                    setPickedDocument(imageObject);

                    console.log(imageObject);
                    sendAttachment(imageObject);
                  });
                } else if (response === 'blocked' || response === 'denied') {
                  console.log('blocked/denied');
                } else if (response === 'unavailable') {
                  console.log('unavailable');
                }
              })
            : request(
                Platform.select({
                  android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
                  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
                }),
              ).then(response => {
                if (response === 'granted') {
                  ImageCropPicker.openPicker(options).then(async image => {
                    let totalSize = 0;
                    let inValidFileName = '';
                    let filename = image.path
                      .split('/')
                      .pop()
                      .split('#')[0]
                      .split('?')[0];
                    if (type == 'image') {
                      if (
                        image.mime != 'image/jpeg' &&
                        image.mime != 'image/png'
                      ) {
                        inValidFileName = filename;
                      }
                    } else if (type == 'video') {
                      if (
                        image.mime != 'video/mp4' &&
                        image.mime != 'video/mpeg'
                      ) {
                        inValidFileName = filename;
                      }
                    } else if (type == 'audio') {
                      if (
                        image.mime != 'audio/mpeg' ||
                        image.mime != 'audio/wav'
                      ) {
                        inValidFileName = filename;
                      }
                    }
                    totalSize += image.size;

                    if (inValidFileName != '') {
                      Alert.alert('Invalid file type. - ' + inValidFileName);
                      return false;
                    }

                    if (totalSize / 1000000 > 50) {
                      Alert.alert('Files size is more than 50mb.');
                      return false;
                    }
                    let imageObject = getPreparedImageData(image);
                    setdocType('image');
                    setPickedDocument(imageObject);
                    sendAttachment(imageObject);
                    console.log(imageObject);
                    // setIsUploading(false);
                  });
                } else if (response === 'blocked' || response === 'denied') {
                  console.log('blocked/denied');
                  //setIsUploading(false);
                } else if (response === 'unavailable') {
                  console.log('unavailable');
                  //setIsUploading(false);
                }
              });
        }
      } catch (error) {
        console.log('Camera Error::', error);
      }
    }
  };

  const renderItem = ({item}) => {
    console.log('senderid message', item?.senderid, client?.creatorID);

    console.log('senderid message image ', item?.attachment);

    return (
      <TouchableOpacity
        onPress={() =>
          item?.msg_type == 'attachment' || item?.msg_type == 'text-attachment'
            ? showDoc(item?.attachment)
            : null
        }>
        <View
          style={{
            flexDirection:
              item?.senderid == client?.creatorID ? 'row-reverse' : 'row',
            paddingHorizontal: 20,
            paddingVertical: 0,
            alignItems: 'center',
          }}>
          {/* {item?.senderid == client?.creatorID ? null : (
            <Image
              source={
                user?.profile_image == ''
                  ? Images.profile
                  : {uri: user?.profile_image}
              }
              style={{height: 50, width: 50, borderRadius: 25}}
            />
          )} */}

          {item?.msg_type == 'attachment' ||
          item?.msg_type == 'text-attachment' ? (
            <>
              {getAttachmentType(item?.attachmentName) == 'image' ? (
                <Image
                  source={{uri: item?.attachment}}
                  resizeMode="contain"
                  style={{
                    alignSelf: 'center',
                    width: 150,
                    height: 180,
                    marginTop: 20,
                  }}></Image>
              ) : (
                <Image
                  source={Images?.SelectedDoc}
                  resizeMode="contain"
                  style={{
                    alignSelf: 'center',
                    width: 100,
                    height: 100,
                    marginTop: 20,
                  }}></Image>
              )}
            </>
          ) : (
            <View
              style={{
                alignItems:
                  item?.senderid == client?.creatorID
                    ? 'flex-end'
                    : 'flex-start',
                marginBottom: 10,
              }}>
              <View
                style={{
                  paddingHorizontal: normalize(12),
                  paddingVertical: normalize(10),
                  backgroundColor: Colors.bcolor,
                  borderWidth: normalize(1),
                  borderColor: Colors.borderColor,
                  borderRadius: normalize(6),
                  borderTopRightRadius: 0,
                }}>
                <Text
                  style={
                    item?.senderid == client?.creatorID
                      ? style.msgTextWhite
                      : style.msgText
                  }>
                  {item?.message}
                </Text>
              </View>
              {item?.senderid ? ( //{item?.sender != true ? (
                <Text style={style.msgDate}>
                  {moment(item?.timestamp).format('hh:mm a')}
                </Text>
              ) : null}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = useCallback(item => item?.id?.toString(), []);
  const listRef = useRef();

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: '#090909'}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <MyStatusBar backgroundColor={'#090909'} barStyle={'dark-content'} />
        <View
          style={{
            flexDirection: 'row',
            height: normalize(60),
            paddingHorizontal: normalize(10),
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#090909',
            borderBottomWidth: normalize(1),
            borderBottomColor: Colors.bcolor,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Image
                source={Icons.arrowleft}
                style={{
                  height: normalize(30),
                  width: normalize(30),
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <ImageBackground
              source={
                senderDetails?.ImageName !== 'No Image'
                  ? {uri: senderDetails?.ImageName}
                  : Images?.profile
              }
              style={{
                height: normalize(30),
                width: normalize(30),
                marginRight: normalize(10),
                marginLeft: normalize(5),
              }}
              imageStyle={{borderRadius: normalize(10 / 2)}}
              resizeMode="cover"
            />
            <View>
              <Text
                style={{
                  color: Colors.white,
                  fontWeight: '500',
                  fontSize: normalize(14),
                  fontFamily: Fonts.Poppins_Medium,
                }}>
                {senderDetails?.Name}
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontWeight: '500',
                  fontSize: normalize(11),
                  fontFamily: Fonts.Poppins_Light,
                }}>
                {typing ? 'typing...' : online == '' ? 'Active' : '20 mins ago'}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <Image
                source={Icons.call}
                style={{
                  height: normalize(25),
                  width: normalize(15),
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity style={{marginStart: normalize(12)}}>
              <Image
                source={Icons.inf}
                style={{
                  height: normalize(25),
                  width: normalize(15),
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <SafeAreaView
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: normalize(20),
              backgroundColor: Colors.black,
            }}>
            <FlatList
              ref={flatListRef}
              pagingEnabled={false}
              legacyImplementation={false}
              keyExtractor={keyExtractor}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              // data={allMessages}
              data={prevChat}
              renderItem={renderItem}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: normalize(10),
              alignItems: 'center',
              backgroundColor: Colors.bcolor,
              paddingVertical: normalize(9),
            }}>
            <TouchableOpacity
              style={{
                marginHorizontal: normalize(10),
              }}
              onPress={() => pickDocument()}>
              <Image
                source={Icons.File_dock_fill}
                style={{
                  height: normalize(14),
                  width: normalize(14),
                }}
                // resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                openImagePicker('photo');
              }}>
              <Image
                source={Icons.images}
                style={{
                  height: normalize(14),
                  width: normalize(14),
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginHorizontal: normalize(10),
              }}
              onPress={() => openImagePicker('video')}>
              <Image
                source={Icons.play}
                style={{
                  height: normalize(14),
                  width: normalize(14),
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginRight: normalize(9)}}
              onPress={() => {}}>
              <Image
                source={Icons.circle}
                style={{
                  height: normalize(14),
                  width: normalize(14),
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: Colors.bcolor,
                color: Colors.white,
                borderWidth: normalize(1),
                borderColor: Colors.white,
                borderRadius: normalize(6),
                flexDirection: 'row',
                width: '54%',
                alignItems: 'center',
                paddingHorizontal: normalize(3),
              }}>
              <TextInput
                value={message}
                onChangeText={text => {
                  setMessage(text);
                }}
                onFocus={() => handleKeyup()}
                onEndEditing={() => handleKeyDown()}
                onPressIn={() => setIsemojee(false)}
                placeholder="Write a reply…"
                placeholderTextColor={Colors.white}
                style={{
                  backgroundColor: Colors.bcolor,
                  color: Colors.white,
                  shadowColor: '#0000001A',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  flex: 1,
                  shadowOpacity: 0.8,
                  shadowRadius: 8.84,
                  elevation: 5,
                  paddingVertical: normalize(10),
                  // height: normalize(40),
                }}
              />
              <TouchableOpacity
                style={{
                  marginHorizontal: normalize(6),
                }}
                onPress={() => {
                  setIsemojee(!isEmojee);
                }}>
                <Image
                  source={Icons.emojihappy}
                  style={{
                    height: normalize(18),
                    width: normalize(18),
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{marginStart: normalize(9)}}
              onPress={() => {
                if (message !== '') {
                  sendTextChat();
                }
              }}>
              <Image
                source={Icons.send}
                style={{
                  height: normalize(23),
                  width: normalize(23),
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <ActionSheet
            ref={actionSheet}
            // Title of the Bottom Sheet
            title={'Which one do you like ?'}
            // Options Array to show in bottom sheet
            options={optionArray}
            // Define cancel button index in the option array
            // This will take the cancel option in bottom
            // and will highlight it
            cancelButtonIndex={2}
            // Highlight any specific option
            destructiveButtonIndex={2}
            onPress={index => {
              // if (index == 0) {
              // } else if (index == 1) {
              // }

              console.log(index);
              // Clicking on the option will give you alert
              // alert(optionArray[index]);
            }}
          />
          {isLoading ? <Loader></Loader> : null}
        </SafeAreaView>
        {isEmojee ? (
          <EmojiSelector
            category={Categories.symbols}
            onEmojiSelected={emoji => setMessage(message + emoji)}
            showSearchBar={false}
            // showTabs={false}
          />
        ) : null}
      </KeyboardAvoidingView>
    </>
  );
}
const style = StyleSheet.create({
  notiBox: {
    backgroundColor: Colors.white,
    shadowColor: '#0000001A',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8.84,
    elevation: 5,
    borderRadius: normalize(15),
    padding: normalize(10),
    position: 'relative',
    marginBottom: normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.white,
  },

  msgTextWhite: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.white,
  },

  msgDate: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.white,
  },
});
