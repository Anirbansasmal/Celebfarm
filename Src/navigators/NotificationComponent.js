import React, {useEffect} from 'react';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {useNavigation} from '@react-navigation/native';
const NotificationHandler = () => {
  const navigation = useNavigation(); // Get navigation object

  const handleNotificationPress = (route, navigation) => {
    // Navigate to the desired route when notification is pressed
    if (route) {
      navigation.navigate(route);
    }
  };

  useEffect(() => {
    // Listen for notification events
    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      if (type === EventType.PRESS) {
        console.log('Notification pressed: ', detail);
        handleNotificationPress(detail.notification.data.route, navigation); // Navigate based on route in the notification data
      }
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    // Listen to foreground notification events
    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      if (type === EventType.PRESS) {
        console.log('User pressed notification', detail.notification.data);
        // Navigate to the Details screen, passing in any data from the notification
        // navigation.navigate('Details', {id: detail.notification.data.id});
      }
    });

    // Listen for background notification presses
    notifee.onBackgroundEvent(async ({type, detail}) => {
      if (type === EventType.PRESS) {
        console.log(
          'User pressed notification in background',
          detail.notification,
        );
        // Navigate to the Details screen
        // navigation.navigate('Details', {id: detail.notification.data.id});
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigation]);

  return null; // This component doesn't render anything visible
};

export default NotificationHandler;