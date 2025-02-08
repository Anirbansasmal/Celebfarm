import React from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import normalize from '../utils/helpers/dimen';
import PropTypes from 'prop-types';
import {Colors, Fonts} from '../themes/Themes';
import Icons from '../themes/icons';

export default function Button(props) {
  function onPress() {
    if (props.onPress) {
      props.onPress();
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        height: props.height,
        width: props.width,
        borderRadius: props.borderRadius,
        backgroundColor: props.backgroundColor,
        justifyContent: props.justifyContent,
        alignItems: 'center',
        alignSelf: props.alignSelf,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        marginLeft: props.btnmarginLeft,
        marginRight: props.btnmarginRight,
        marginHorizontal: props.marginHorizontal,
        borderWidth: props.borderWidth,
        borderColor: props.borderColor,
        opacity: props.opacity,
        flexDirection: 'row',
        position: props.btnposition,
        bottom: props.btnBottom,
        end: props.btnend,
        paddingHorizontal: props.paddingHorizontal,
      }}
      onPress={() => {
        onPress();
      }}>
      {props.sideImage ? (
        <Image
          source={props.sideImagesource}
          style={{
            height: props.imgheight,
            width: props.imgwidth,
            marginLeft: props.imagmarginLeft,
          }}
          resizeMode="contain"
        />
      ) : null}
      {props.issideImagelogin ? (
        <Image
          source={props.source}
          style={{
            // height: normalize(15),
            // width: normalize(7),
            height: props.onlyimgheight,
            width: props.onlyimgwidth,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ) : null}
      {props.titlesingle ? (
        <Text
          numberOfLines={props.numberOfLines}
          style={{
            fontFamily: props.fontFamily,
            color: props.textColor,
            fontSize: props.fontSize,
            marginTop: 0,
            alignSelf: props.textAlign,
            textAlign: 'center',
          }}>
          {props.title}
        </Text>
      ) : null}
      {props.isightsideImage ? (
        <Image
          source={Icons.forward}
          style={{
            height: normalize(17),
            width: normalize(20),
            marginRight: normalize(5),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ) : null}
    </TouchableOpacity>
  );
}

Button.propTypes = {
  numberOfLines: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.any,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.number,
  textColor: PropTypes.string,
  fontSize: PropTypes.number,
  title: PropTypes.string,
  onPress: PropTypes.func,
  alignSelf: PropTypes.string,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginHorizontal: PropTypes.number,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.any,
  fontFamily: PropTypes.any,
  opacity: PropTypes.number,
  issideImage: PropTypes.bool,
  issideImagelogin: PropTypes.bool,
  textAlign: PropTypes.string,
  imgheight: PropTypes.any,
  imgwidth: PropTypes.any,
  isightsideImage: PropTypes.any,
  marginLeft: PropTypes.any,
  fontWeight: PropTypes.any,
  justifyContent: PropTypes.any,
  btnposition: PropTypes.any,
  btnBottom: PropTypes.any,
  sideImage: PropTypes.any,
  imagmarginLeft: PropTypes.any,
  btnend: PropTypes.any,
  paddingHorizontal: PropTypes.any,
  titlesingle: PropTypes.any,
  source: PropTypes.any,
  sideImagesource: PropTypes.any,
  onlyimgheight: PropTypes.any,
  onlyimgwidth: PropTypes.any,
  btnmarginLeft: PropTypes.any,
  btnmarginRight: PropTypes.any,
};

Button.defaultProps = {
  onlyimgheight: normalize(10),
  onlyimgwidth: normalize(10),
  sideImagesource: Icons?.forward,
  source: Icons?.forward,
  numberOfLines: 0,
  height: normalize(40),
  backgroundColor: Colors.pink,
  borderRadius: normalize(5),
  textColor: Colors.white,
  fontSize: normalize(14),
  title: '',
  onPress: null,
  alignSelf: null,
  marginTop: 0,
  marginBottom: 0,
  marginHorizontal: 0,
  width: '100%',
  borderColor: '',
  borderWidth: 0,
  fontFamily: Fonts.Inter_Medium,
  opacity: 1,
  issideImage: false,
  issideImagelogin: false,
  textAlign: 'center',
  imgheight: normalize(19),
  imgwidth: normalize(19),
  isightsideImage: null,
  // marginLeft: normalize(35),
  fontWeight: '400',
  justifyContent: 'space-around',
  btnposition: 'relative',
  btnBottom: null,
  sideImage: false,
  imagmarginLeft: normalize(15),
  btnend: null,
  paddingHorizontal: normalize(0),
  titlesingle: false,
};
