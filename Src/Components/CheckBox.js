import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

import normalize from '../utils/helpers/dimen';
import PropTypes from 'prop-types';
import {Colors, Icons} from '../themes/Themes';

export default function CheckBox(props) {
  return (
    <TouchableOpacity
      onPress={() => props.onChange(!props.active)}
      activeOpacity={0.6}
      style={{
        backgroundColor:props.backgroundColor,
        borderColor: '#DDDDDD',
        borderWidth: props.borderWidth,
        borderRadius: normalize(3),
        width: normalize(14),
        height: normalize(14),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: props.marstart,
      }}>
      {props.active ? (
        <Image
          source={props.CheckBox}
          style={{
            height: normalize(14),
            width: normalize(14),
            // marginTop: -normalize(2),
          }}
          resizeMode="contain"></Image>
      ) : null}
    </TouchableOpacity>
  );
}

CheckBox.propTypes = {
  onChange: PropTypes.func,
  active: PropTypes.bool,
  marstart: PropTypes.any,
  backColor:PropTypes.any,
  borderWidth:PropTypes.any,
  CheckBox:PropTypes.any,

};

CheckBox.defaultProps = {
  onChange: () => {},
  active: false,
  marstart: normalize(12),
  backgroundColor:Colors.white,
  borderWidth:normalize(1),
  CheckBox:null,
};
