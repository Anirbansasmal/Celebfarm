import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import {Icons, Colors} from '../themes/Themes';
import normalize from '../utils/helpers/dimen';
import PropTypes from 'prop-types';
import { getNotificationIsNewRequest, getNotificationRequest } from '../redux/reducers/ProfileReducer';
import { useDispatch, useSelector } from 'react-redux';
var status='';
export default function HeaderCommon(props) {
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
      clearTimeout()
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
          console.log('=>>>>>>> new',ProfileReducer?.notificationResponse?.result?.length);
          var isNew = false,
            count = 0,
            obj = {};
          for (
            let i = 0;
            i<ProfileReducer?.notificationResponse?.result?.length;
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
        <View
          style={{
            backgroundColor: props.backgroundColor,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: props.headerHeight,
            borderBottomColor: '#434540',
            shadowColor: '#000',
            width: '100%',
            borderColor:Colors.grey,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 3,
          }}>
          {props.back ? (
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                // start: normalize(10),
                marginTop: props.marginTop,
              }}>
              <TouchableOpacity onPress={() => onBack()}>
                <Image
                  style={{height: normalize(22)}}
                  source={Icons.arrowleft}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              {props.back ? (
                <Text
                  style={{
                    fontFamily: props.fontFamily,
                    fontSize: props.textfontSize,
                    lineHeight: normalize(32),
                    color: '#fff',
                  }}>
                  {props.title}
                </Text>
              ) : null}
            </View>
          ) : null}

          {props.home ? (
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                // start: normalize(10),
                marginTop: props.marginTop,
                paddingHorizontal: normalize(14),
              }}>
              <View style={{marginTop: normalize(0)}}>
                {props.home == true && props.back == false ? (
                  <Text
                    style={{
                      fontFamily: props.fontFamily,
                      fontSize: props.textfontSize,
                      color: '#fff',
                    }}>
                    {props.title}
                  </Text>
                ) : null}
              </View>
            </View>
          ) : null}

          {props.isHome ? (
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                // start: normalize(10),
                marginTop: props.marginTop,
                paddingHorizontal: normalize(19),
              }}>
              {props.isHome ? (
                <TouchableOpacity
                  style={{marginStart: props.marginStart}}
                  onPress={() => props.navigation.goBack()}>
                  <Image
                    style={{height: normalize(22)}}
                    source={Icons.arrowleft}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ) : null}
              <View style={{marginTop: normalize(0)}}>
                <Text
                  style={{
                    fontFamily: props.fontFamily,
                    fontSize: props.textfontSize,
                    lineHeight: normalize(32),
                    color: '#fff',
                  }}>
                  {props.title}
                </Text>
              </View>
            </View>
          ) : null}

          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            {props.picTitle == true ? (
              <>
              {props?.notifi?
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    marginTop: props.marginTop,
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    onNotification();
                  }}>
                  <Image
                    style={{
                      height: normalize(18),
                      width: normalize(18),
                      marginTop: normalize(0),
                    }}
                    source={Icons.notification}
                    resizeMode="cover"
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
                :null}
                {props?.chatmessage?
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    marginTop: props.marginTop,
                    alignItems: 'center',
                    marginStart: normalize(12),
                    marginEnd: normalize(12),
                  }}
                  onPress={() => {
                    onProfile();
                  }}>
                  <Image
                    style={{
                      height: normalize(18),
                      width: normalize(18),
                      marginTop: normalize(0),
                    }}
                    source={Icons.chat}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                :null}
              </>
            ) : (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginEnd: normalize(18),
                  borderBottomColor: '#F1D271',
                  borderBottomWidth: normalize(1),
                }}
                onPress={() => {
                }}
                activeOpacity={0.7}>
                <Text style={[{...style.text2, color: Colors.green}]}>
                  Skip
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View
          style={{
            height: normalize(1),
            backgroundColor: '#434540',
            // opacity: 0.8,
          }}></View>
      </View>
    </>
  );
}

HeaderCommon.propTypes = {
  title: PropTypes.string,
  query: PropTypes.bool,
  back: PropTypes.bool,
  logo: PropTypes.bool,
  add: PropTypes.bool,
  close: PropTypes.bool,
  notifiPress: PropTypes.func,
  backScreen: PropTypes.func,
  profilePress: PropTypes.func,
  plus: PropTypes.bool,
  isback: PropTypes.bool,
  drawer: PropTypes.string,
  homeImg: PropTypes.bool,
  isTitle: PropTypes.bool,
  fontFamily: PropTypes.string,
  icons: PropTypes.any,
  textfontSize: PropTypes.any,
  profilepic: PropTypes.any,
  marginStart: PropTypes.any,
  backgroundColor: PropTypes.any,
  picTitle: PropTypes.any,
  heardetext: PropTypes.any,
  isHome: PropTypes.any,
  textColor: PropTypes.string,
  headerHeight: PropTypes.any,
  marginTop: PropTypes.any,
  logoHome: PropTypes.any,
  notifi:PropTypes.any,
  chatmessage:PropTypes.any,
};
HeaderCommon.defaultProps = {
  title: '',
  query: false,
  back: false,
  logo: false,
  home: false,
  add: false,
  plus: false,
  close: false,
  notifiPress: () => {},
  profilePress: () => {},
  backScreen: () => {},
  isback: false,
  drawer: null,
  homeImg: false,
  isTitle: false,
  fontFamily: '',
  icons: Icons.notification,
  textfontSize: normalize(20),
  profilepic: null,
  marginStart: normalize(12),
  backgroundColor: '#0000',
  picTitle: true,
  heardetext: null,
  isHome: false,
  textColor: Colors.black,
  headerHeight: normalize(71),
  marginTop: normalize(0),
  logoHome: false,
  notifi:true,
  chatmessage:true,
};

const style = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(10),
    height: normalize(90),
    paddingTop: normalize(10),
    // backgroundColor: PropTypes.drawer==true ? '#FF1544' : Colors.white,
    // borderBottomWidth: normalize(1),
    // borderBottomColor: '#DADADA',
  },
});
