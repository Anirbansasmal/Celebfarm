/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import StackNavigatior from './Src/navigators/StackNavigator';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {getTokenRequest} from './Src/redux/reducers/AuthReducer';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {getDeviceToken} from './Src/utils/helpers/FirebaseToken';
import {
  getNotificationDetailsRequest,
  getNotificationIsNewRequest,
  getNotificationRequest,
} from './Src/redux/reducers/ProfileReducer';
import constant from './Src/utils/helpers/constant';
var status = '';

function App() {
  // LogBox.ignoreLogs();
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);

  useEffect(() => {
    requestUserPermission();
    dispatch(getTokenRequest());
    getDeviceToken().then(res => {
      console.log(res);
    });
    notificationListener();
    // Foreground State
    messaging().onMessage(async remoteMessage => {
      console.log('foreground', remoteMessage);
      updateNotification();
      onDisplayNotification(JSON.parse(remoteMessage?.notification?.body)); //
    });
  }, []);

  function updateNotification() {
    try {
     var timeRes= setTimeout(() => {
        var obj = 'creatorID=' + AuthReducer?.creatorID;
        console.log('update notification', obj);
        dispatch(getNotificationRequest(obj));
      }, 500);
      clearTimeout(timeRes);
    } catch (error) {}
  }

  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/getNotificationRequest':
        status = ProfileReducer.status;
        break;
        case 'Profile/getNotificationSuccess':

        console.log('=>>>>>>> new', ProfileReducer?.notificationResponse?.result);
        var isNew = false,
          count = 0,
          obj = {};
        for (
          let i = 0;
          i < ProfileReducer?.notificationResponse?.result?.length;
          i++
        ) {
          if (
            ProfileReducer?.notificationResponse?.result[i]?.isRead == false
          ) {
            isNew = true;
            count = count + 1;
          }
          obj = {
            isNew: isNew,
            count: count,
          };
        }
        console.log('notification chnage', obj);
        dispatch(getNotificationIsNewRequest(obj));
        break;
    }
  }

  const notificationListener = async () => {
    await notifee.requestPermission();
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Quiet and Background State -> Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      })
      .catch(error => console.log('failed', error));

    // Foreground State
    messaging().onMessage(async remoteMessage => {
      console.log('foreground', remoteMessage);
    });
  };

  async function onDisplayNotification(remoteMessage) {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      badge: true,
    });
    // console.log('remoteMessage',remoteMessage)
    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage?.CampaignTitle,
      body: remoteMessage['Message'],
      android: {
        channelId,
        // pressAction is needed if you want the notification to open the app when pressed
        smallIcon: '@mipmap/ic_launcher_round',
        largeIcon: '@mipmap/ic_launcher',
        channelId,
        // timestamp: Date.now() - 300000,
        showTimestamp: true,
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
      data: {
        screen: 'Details', // Screen to navigate to
      },
    });
    
  }

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };
  
  return <StackNavigatior />;
}

export default App;
