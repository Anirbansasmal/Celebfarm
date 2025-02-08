import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import {Icons, Colors, Fonts} from '../themes/Themes';
import normalize from '../utils/helpers/dimen';
import PropTypes from 'prop-types';
import constant from '../utils/helpers/constant';
import {useDispatch, useSelector} from 'react-redux';
import {
  getNotificationIsNewRequest,
  getNotificationIsNewSuccess,
  getNotificationRequest,
} from '../redux/reducers/ProfileReducer';
var status = '';
export default function HeaderData(props) {
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);

  const dispatch = useDispatch();
  function onNotification() {
    if (props.notifiPress) {
      props.notifiPress();
    }
  }
  function onProfile() {
    if (props.profilePress) {
      props.profilePress();
    }
  }
  function onBack() {
    if (props.backScreen) {
      props.backScreen();
    }
  }

  function updateNotification() {
    try {
      setTimeout(() => {
        var obj = 'creatorID=' + AuthReducer?.creatorID;
        console.log('update notification', obj);
        dispatch(getNotificationRequest(obj));
      }, 500);
      clearTimeout();
    } catch (error) {}
  }

  useEffect(() => {
    updateNotification();
    // dispatch(getNotificationIsNewSuccess());
  }, []);

  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/getNotificationRequest':
        status = ProfileReducer.status;
        break;
      case 'Profile/getNotificationSuccess':
        status = ProfileReducer.status;
        console.log(
          '=>>>>>>> new',
          ProfileReducer?.notificationResponse?.result?.length,
        );
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
    }
  }
  return (
    <>
      <View>
        <View style={style.headerContainer}>
          <View style={style.container}>
            <TouchableOpacity
              onPress={() => {
                onBack();
              }}>
              <Image
                source={Icons.squre}
                style={style.imageLeft}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={style.text}>{props.title}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginEnd: normalize(12),
            }}>
            <TouchableOpacity
              onPress={() => {
                onNotification();
              }}>
              <Image
                source={Icons.notification}
                style={style.imageLeft}
                resizeMode="contain"
              />
              {ProfileReducer?.notificationIsNewResponse?.isNew ? (
                <View
                  style={{
                    borderRadius: normalize(14),
                    height: normalize(18),
                    width: normalize(18),
                    position: 'absolute',
                    top: normalize(-6),
                    bottom: normalize(18),
                    left: normalize(10),
                    backgroundColor: Colors.btnColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: Colors.black, fontSize: normalize(10)}}>
                    {ProfileReducer?.notificationIsNewResponse?.count}
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>
            <View
              style={{
                width: normalize(12),
              }}></View>
            <TouchableOpacity onPress={() => onProfile()}>
              <Image
                source={Icons.chat}
                style={style.imageLeft}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

HeaderData.propTypes = {
  title: PropTypes.string,
  notifiPress: PropTypes.func,
  backScreen: PropTypes.func,
  profilePress: PropTypes.func,
};
HeaderData.defaultProps = {
  title: '',
  notifiPress: () => {},
  profilePress: () => {},
  backScreen: () => {},
};

const style = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    padding: normalize(0),
    justifyContent: 'space-between',
    borderBottomColor: '#434540',
    borderBottomWidth: normalize(1),
    paddingVertical: normalize(12),
    backgroundColor: '#000',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: normalize(12),
  },
  imageLeft: {
    height: normalize(18),
    width: normalize(17),
  },
  text: {
    color: Colors.white,
    fontSize: normalize(16),
    marginStart: normalize(12),
    fontFamily: Fonts.Inter_Bold,
  },
});
