import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Platform,
  ImageBackground,
} from 'react-native';
import {Icons, Images, Colors, Fonts} from '../themes/Themes';
import normalize from '../utils/helpers/dimen';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';

export default function Header(props) {
  function onBack() {
    if (props.addPress) {
      props.addPress();
    }
  }
  return (
    <>
      <View
        style={{
          backgroundColor: props.backgroundColor,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: props.headerHeight,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          // borderWidth:1,
          elevation: 3,
          // marginTop: Platform.OS == 'ios' ? normalize(18) : normalize(35),
        }}>
        {props.back ? (
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              // start: normalize(10),
              marginTop: props.marginTop,
              paddingHorizontal: normalize(19),
            }}>
            {props.back ? (
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
              {props.logo == false ? (
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
            width: '100%',
          }}>
          {props.picTitle == true ? (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginTop: props.marginTop,
                width: '100%',
                alignItems: 'center',
              }}
              onPress={() => props.navigation.toggleDrawer()}>
              <ImageBackground
                style={{
                  height: normalize(42),
                  width: normalize(42),
                  // position:'absolute',
                  start: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                source={Icons.Ellipse}
                resizeMode="cover">
                <Image
                  style={{
                    height: normalize(32),
                    width: normalize(32),
                    borderRadius: normalize(22 / 2),
                    marginTop: normalize(0),
                  }}
                  source={Icons.menu}
                  resizeMode="cover"
                />
              </ImageBackground>
              {props.logoHome ? (
                <Image
                  style={{
                    height: normalize(12),
                    // width: normalize(32),
                    // borderRadius: normalize(22 / 2),
                    marginTop: normalize(0),
                    position: 'absolute',
                  }}
                  source={props.logoHome}
                  resizeMode="contain"
                />
              ) : null}
              <Text
                style={{
                  fontFamily: props.fontFamily,
                  fontSize: props.textfontSize,
                  // lineHeight: normalize(32),
                  color: props.textColor,
                  marginLeft: normalize(20),
                  fontWeight: '500',
                  // textTransform: 'uppercase',
                }}>
                {props.name}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  query: PropTypes.bool,
  back: PropTypes.bool,
  logo: PropTypes.bool,
  add: PropTypes.bool,
  close: PropTypes.bool,
  queryPress: PropTypes.func,
  backPress: PropTypes.func,
  addPress: PropTypes.func,
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
};
Header.defaultProps = {
  title: '',
  query: false,
  back: false,
  logo: false,
  add: false,
  plus: false,
  close: false,
  queryPress: () => {},
  backPress: () => {},
  addPress: () => {},
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
  headerHeight: normalize(81),
  marginTop: normalize(0),
  logoHome: false,
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
