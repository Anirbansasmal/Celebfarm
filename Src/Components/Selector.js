import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import normalise from '../utils/helpers/dimen';
import PropTypes from 'prop-types';

import {Colors, Fonts, Icons} from '../themes/Themes';

export default function Selector(props) {
  return (
    <TouchableOpacity
      style={{
        height: props.height,
        width: props.width,
        borderColor: props.borderColor,
        borderWidth: props.borderWidth,
        borderRadius: props.borderRadius,
        marginTop: props.marginTop,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: props.backcolor,
        marginStart: props.marginLeft,
        marginEnd:props.margright,
        justifyContent: 'space-between',
        paddingHorizontal: normalise(12),
      }}
      activeOpacity={0.6}
      onPress={props.onPress}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {props.iconleft ? (
          <Image
            source={props.iconleft}
            style={{
              height: props.imageheight,
              width: props.imagewidth,
              // position: 'absolute',
              // right: props.margright,
              // top: normalise(13),
              // marginStart: props.marginLeft,
            }}
            resizeMode="contain"
          />
        ) : null}
        <Text
          numberOfLines={1}
          style={{
            paddingLeft: normalise(3),
            paddingRight: normalise(10),
            marginLeft: props.margright,
            color: props.fontcolor,
            fontFamily: props.fontFamily,
            fontSize: normalise(12),
            // textTransform: 'lowercase',
          }}>
          {props.text && props.text != '' ? props.text : props.placeholder}
        </Text>
      </View>
      <Image
        source={props.icon}
        style={{
          height: props.imageheight,
          width: props.imagewidth,
          // position: 'absolute',
          // right: props.margright,
          // top: normalise(13),
          // marginStart: props.marginLeft,
        }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

Selector.propTypes = {
  onPress: PropTypes.func,
  marginTop: PropTypes.number,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.any,
  width: PropTypes.any,
  height: PropTypes.number,
  borderRadius: PropTypes.number,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.any,
  backcolor: PropTypes.string,
  fontFamily: PropTypes.any,
  imageheight: PropTypes.any,
  imagewidth: PropTypes.any,
  margright: PropTypes.any,
  fontcolor: PropTypes.any,
  marginLeft: PropTypes.any,
  iconleft: PropTypes.any,
};

Selector.defaultProps = {
  onPress: () => {},
  marginTop: 0,
  text: '',
  placeholder: '',
  icon: null,
  width: '40%',
  height: normalise(0),
  borderRadius: normalise(0),
  borderWidth: normalise(0),
  backcolor: '#FFF1F1',
  fontFamily: Fonts.montserrat_bold,
  imageheight: normalise(10),
  imagewidth: normalise(10),
  margright: normalise(10),
  fontcolor: Colors.black,
  marginLeft: normalise(10),
  iconleft: null,
  borderWidth: '',
};
