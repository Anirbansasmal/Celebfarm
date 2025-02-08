import React from 'react';

import normalize from '../utils/helpers/dimen';
import PropTypes from 'prop-types';
import {Colors, Fonts} from '../themes/Themes';
import { ImageBackground, View } from 'react-native';
import Images from '../themes/Images';

export default function ImageProfile(props) {
  function onPress() {
    if (props.onPress) {
      props.onPress();
    }
  }

  return (
    <View style={{
      height:props.height,
      width:props.width,
      backgroundColor: props.backgroundColor,
      justifyContent: props.justifyContent,
      alignItems: props.alignItems,
      borderRadius: props.borderRadius,
    }}>
      <ImageBackground
        source={
          props?.brandImageUrl === ''
            ? Images.profile
            : {uri: props?.brandImageUrl}
        }
        style={{
          height:props.imgheight,
          width:props.imgwidth
        }}
        imageStyle={{borderRadius: props.borderRadius}}
        resizeMode="cover"
      />
    </View>
  );
}

ImageProfile.propTypes = {
  brandImageUrl: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.number,
  alignItems: PropTypes.string,
  imgheight: PropTypes.number,
  imgwidth: PropTypes.number,
  justifyContent:PropTypes.string,
};

ImageProfile.defaultProps = {
  brandImageUrl: null,
  height: normalize(40),
  backgroundColor: Colors.white,
  borderRadius: normalize(5),
  width: '100%',
  alignItems:'center',
  imgheight:normalize(0),
  imgwidth:normalize(0),
  justifyContent:'center',
};
