import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import Button from '../../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icons from '../../../themes/icons';
import Images from '../../../themes/Images';
import Header from '../../../Components/Header';
import LinearGradient from 'react-native-linear-gradient';
import {io} from 'socket.io-client';
import {useIsFocused} from '@react-navigation/native';
import constant from '../../../utils/helpers/constant';
import {getApi} from './ChatService';
import {useDispatch, useSelector} from 'react-redux';
import ImageProfile from '../../../Components/ImageProfile';
import connectionrequest from '../../../utils/helpers/NetInfo';
import {getUserRequest} from '../../../redux/reducers/UserReducer';
import showErrorAlert from '../../../utils/helpers/Toast';
import {imageSign, imageSignChat} from '../../../utils/helpers/ApiRequest';
import HeaderCommon from '../../../Components/HeaderCommon';
import Loader from '../../../utils/helpers/Loader';
import EmptyComponent from '../../../Components/EmptyComponent';
import moment from 'moment';
import Fallback from '../../auth/Fallback';
var status = '';

function Chat(props) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const UserReducer = useSelector(state => state.UserReducer);
  const [buttonSelection, setbuttonSelection] = useState(0); //0-ALL 1- UNREAD 2- READ
  const [userDetails, setUserDetails] = useState(null);
  const [messegeList, setMessegeList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [readMessegeList, setReadMessegeList] = useState([]);
  const [unreadMessegeList, setUnreadMessegeList] = useState([]);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [gettyping, setTyping] = useState([]);

  useEffect(() => {
    var obj = 'creatorID=' + AuthReducer?.creatorID;
    connectionrequest()
      .then(() => {
        dispatch(getUserRequest(obj));
        setLoading(true);
      })
      .catch(err => {
        console.log(err);
        showErrorAlert('Please connect to internet');
      });
  }, []);

  useEffect(() => {
    if (userDetails) {
      fetchMasterChat(AuthReducer?.creatorID);
    }
  }, [isFocused]);

  // const getUser = async () => {
  //   const user = JSON.parse(await getItemFromStorage(KEYMAIN.USER_PROFILE));
  //   console.log(user);
  //   setUserDetails(user);
  // };

  const fetchMasterChat = async user_id => {
    const header = {
      'Content-Type': 'application/json',
      authorization: AuthReducer?.token,
      Accept: 'application/json',
    };
    console.log(header);
    const response = await getApi(`/chat/chats/get-users`, header); ///chats/get-users
    console.log('chat', response.data);

    const sortedData = [...response.data].sort(
      (a, b) =>
        new Date(b.lastMessage?.timestamp?? new Date()) - new Date(a.lastMessage?.timestamp ?? new Date()),
    );
    setLoading(true);
    var arr = [],
      arr2 = [];
    for (let item of sortedData) {
      try {
        // Assuming `imageChat` is the API call that returns a result
        const imageName = item?.ImageName
          ? await imageChat(item?.ImageName)
          : 'No Image';

        // Once the API response is received, push the result into arr
        arr.push({
          ImageName: imageName,
        });

        // Any additional logic to be executed after each iteration
        // (e.g., subsequent API calls based on this result, looping logic, etc.)
        console.log(`Processed item with ImageName: ${imageName}`);
      } catch (error) {
        console.error(`Error processing item: ${item}`, error);
      }
    }
    console.log('arr', arr);
    // setTimeout(() => {
    sortedData?.map(async (item, index) => {
      console.log(
        '85=>>>>>>>>>>>>>>>>>>>>>',
        imageChat(arr[index]['ImageName']),
      );
      arr2.push({
        ImageName: arr[index]['ImageName'],
        Name: item?.Name,
        UserID: item?.UserID,
        profile_image: item?.profile_image,
        lastMessage: item?.lastMessage,
        date: item?.lastMessage?.timestamp ?? "",
        count: item?.unread,
      });
    });
    // }, 1000);

    setTimeout(() => {
      setMessegeList([...arr2]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    console.log('userDetails', userDetails);
    if (userDetails) {
      fetchMasterChat(userDetails.creatorID);
    }
    const newSocket = io('https://messages.celebfarm.com');
    setSocket(newSocket);
    console.log('Socket ', newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [userDetails]);

  useEffect(() => {
    console.log('socket connect', socket);
    if (socket === null) return;
    socket.emit('addNewUser', AuthReducer?.creatorID, 'Creator');

    socket.on('getOnlineUsers', res => {
      console.log('socket getOnlineUsers', res);
      setOnlineUsers(res);
    });

    socket.on('getNotification', data => {
      fetchMasterChat(userDetails.creatorID);
    });

    socket.on('getTyping', data => {
      setTyping(data);
      console.log('typing', data);
    });
    setLoading(false);
    // fetchChatData();
    return () => {
      socket.off('getOnlineUsers');
      socket.off('getTyping');
    };
  }, [socket]);

  if (status == '' || UserReducer.status != status) {
    switch (UserReducer.status) {
      case 'userProfile/getUserRequest':
        status = AuthReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'userProfile/getUserSuccess':
        status = UserReducer.status;
        console.log(UserReducer?.userResponse);
        setUserDetails(UserReducer?.userResponse);

        break;
      case 'userProfile/getUserFailure':
        status = UserReducer.status;
        break;
    }
  }

  const fetchChatData = async () => {
    const data = JSON.parse(await getItemFromStorage(KEYMAIN.CHAT_DATA));
    const user = JSON.parse(await getItemFromStorage(KEYMAIN.USER_PROFILE));

    if (data !== null) {
      console.log();
      props.navigation.navigate('Messege', {
        user: data?.otherMember,
        conversionId: data?.id,
        client: user,
        socket: socket,
        onlineUser: onlineUsers,
      });

      removeStoreItem(KEYMAIN.CHAT_DATA);
    }
  };

  async function imageChat(item) {
    var image = '';
    await imageSignChat(item, AuthReducer?.creatorID, AuthReducer?.token).then(
      res => {
        image = res?.data?.result;
        // console.log('164', res?.data?.result);
      },
    );
    return image;
  }
  const renderItem = ({item, index}) => {
    console.log(imageChat(item));
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            console.log('secound Details', item);
            props.navigation.navigate('Messages', {
              firstId: item?.UserID,
              // conversionId: item?.id,
              senderDetails: item,
              client: userDetails,
              socket: socket,
              onlineUser: onlineUsers,
            });
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: normalize(12),
              // alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <ImageProfile
                alignItems={'center'}
                height={normalize(38)}
                width={normalize(38)}
                borderRadius={normalize(3)}
                backgroundColor={Colors.white}
                brandImageUrl={item?.ImageName}
                imgheight={normalize(36)}
                imgwidth={normalize(36)}
                justifyContent={'center'}
              />
              <View
                style={{
                  padding: normalize(6),
                  height: normalize(52),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(12),
                  }}>
                  {item?.Name}
                </Text>

                {gettyping['message'] &&
                parseInt(gettyping['senderId']) == item?.UserID ? (
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(12),
                      marginTop: normalize(6),
                    }}>
                    {gettyping['message'] &&
                    parseInt(gettyping['senderId']) == item?.UserID
                      ? 'typing...'
                      : item?.lastMessage == ''
                      ? ''
                      : ''}
                  </Text>
                ) : (
                  <></>
                )}
                {item?.lastMessage ? (
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(12),
                      marginTop: normalize(6),
                    }}>
                    {item?.lastMessage == null ? '' : item?.lastMessage}
                  </Text>
                ) : (
                  <></>
                )}
              </View>
            </View>

            <View
              style={{
                padding: normalize(6),
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {item?.count > 0 ? (
                <LinearGradient
                  colors={['#B7F9CF', '#B7F9CF', '#EAF7A7', '#EAF7A7']}
                  style={{
                    height: normalize(14),
                    width: normalize(14),
                    borderRadius: normalize(9),
                    marginStart: normalize(7),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: normalize(9),
                      color: Colors.black,
                      fontFamily: Fonts.Inter_SemiBold,
                    }}>
                    {item?.count}
                  </Text>
                </LinearGradient>
              ) : (
                <></>
              )}
              {item?.date ? (
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(12),
                    marginTop: normalize(6),
                  }}>
                  {moment(item?.date).format('hh:mm a')}
                </Text>
              ) : (
                <></>
              )}
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: normalize(1),
            borderColor: '#434540',
            width: Dimensions.get('screen').width - 60,
            alignSelf: 'flex-end',
            marginTop: normalize(7),
          }}
        />
      </>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderCommon
        picTitle={true}
        home={true}
        back={true}
        backgroundColor={'#000'}
        title={'Messages'}
        heardetext={Colors.white}
        headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(51)}
        textfontSize={normalize(16)}
        fontFamily={Fonts.Inter_Bold}
        // marginStart={normalize(33)}
        chatmessage={false}
        backScreen={() => {
          props.navigation.goBack();
        }}
        notifiPress={() => props.navigation.navigate('Notifications')}
        textColor={'#ffff'}
        {...props}
      />
      {isLoading ? (
        <Fallback />
      ) : (
        <SafeAreaView style={style.container}>
          <FlatList
            data={messegeList} //
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={
              !isLoading &&  messegeList.length !==0? (
                <EmptyComponent
                  height={normalize(120)}
                  width={normalize(120)}
                  imgHeight={normalize(70)}
                  imgWidth={normalize(90)}
                  val={'No chat user found'}
                />
              ) : null
            }></FlatList>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
    padding: normalize(7),
  },
  containerBody: {
    paddingHorizontal: normalize(10),
    marginTop: normalize(12),
    flex: 1,
    marginBottom: normalize(43),
  },
  text: {
    color: Colors.white,
    fontSize: normalize(16),
    marginStart: normalize(12),
    fontFamily: Fonts.Inter_Bold,
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
export default Chat;
