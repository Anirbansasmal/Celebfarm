import React, {useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  Animated,
  Easing,
  Platform,
  StyleSheet,
} from 'react-native';
import normalize from '../utils/helpers/dimen';
import PropTypes from 'prop-types';

export default function RNSwitch(props) {
  const anim = useRef(new Animated.Value(0)).current;

  function handleOnPress() {
    if (props.handleOnPress) {
      props.handleOnPress();
    }
  }

  let on = props?.value == 0 ? false : true;

  useEffect(() => {
    Animated.timing(anim, {
      toValue:
        props?.value == 0
          ? false
          : true
          ? Platform.OS == 'android'
            ? normalize(13)
            : normalize(15)
          : 0,
      duration: 100,
      easing: Easing.ease,
      delay: 0,
      useNativeDriver: true,
    }).start();
  }, [props?.value]);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        handleOnPress();
      }}
      style={{
        justifyContent: 'center',
        // backgroundColor:'#0000'
      }}>
      <View
        style={{
          width: normalize(39),
          height: normalize(22),
          borderRadius: normalize(32),
          // paddingHorizontal: 6,
          paddingVertical: normalize(10),
          backgroundColor: on ? props?.activeTrackColor : props?.inActiveTrackColor,
          // borderColor: '#e1e1e1',
          // borderWidth: normalize(1),
          justifyContent: 'center',
        }}></View>

      <Animated.View
        style={{
          width: normalize(18),
          height: normalize(18),
          borderRadius: normalize(30),
          margin:on ? normalize(4):normalize(4),
          backgroundColor: on ? props?.activethumbColor : props?.thumbColor,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
          position: 'absolute',
          transform: [
            {
              translateX: anim,
            },
          ],
        }}
      />
    </TouchableOpacity>
  );
}

RNSwitch.propTypes = {
  handleOnPress: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  activeTrackColor: PropTypes.string,
  inActiveTrackColor: PropTypes.string,
  thumbColor: PropTypes.string,
  activethumbColor: PropTypes.string,
};

RNSwitch.defaultProps = {
  activeTrackColor: '#82583F',
  inActiveTrackColor: '#F7F1EE',
  thumbColor: '#FFF',
  activethumbColor: 'blue',
};

const styles = StyleSheet.create({
  circleStyle: {
    position: 'absolute',
    bottom: -3,
    width: 25,
    height: 25,
    borderRadius: 24,
  },
  containerStyle: {
    width: 40,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 36.5,
    height: 18,
  },
  shadowValue: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
