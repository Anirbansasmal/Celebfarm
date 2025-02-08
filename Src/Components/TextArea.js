import React from 'react';
import {View, Image, TextInput} from 'react-native';
import normalise from '../utils/helpers/dimen';
import PropTypes from 'prop-types';

import {Colors, Fonts} from '../themes/Themes';

export default function TextArea(props) {
  function onChangeText(text) {
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  }

  function onFocus() {
    if (props.onFocus) {
      props.onFocus();
    }
  }

  function onBlur() {
    if (props.onBlur) {
      props.onBlur();
    }
  }

  return (
    <View
      style={{
        height: props.heightInput,
        width: '100%',
        borderColor: props.borderColor,
        borderWidth: normalise(1),
        borderRadius: props.borderRadius,
        marginTop: props.marginTop,
        position: 'relative',
        backgroundColor: props.background,
      }}>
      <TextInput
        style={[
          {
            paddingLeft: normalise(3),
            paddingRight: normalise(14),
            marginLeft: normalise(10),
            // flex: 1,
            textAlign: props.textAlign,
            letterSpacing: normalise(props.letterSpacing),
            color: props.color,
            fontFamily: Fonts.Montserrat_SemiBold,
            fontSize: normalise(props.fontSize),
            paddingTop:normalise(10),
            multiline:true,
            flexShrink: 1
          },
          props.icon ? {paddingRight: normalise(40)} : null,
        ]}
        caretHidden={props.caretHidden}
        // maxLength={props.maxLength}
        secureTextEntry={props.isSecure}
        multiline={props.multiline}
        autoCapitalize={props.autoCapitalize}
        placeholder={props.placeholder}
        editable={props.editable}
        placeholderTextColor={props.placeholderTextColor}
        keyboardType={props.keyboardType}
        value={props.value}
        // placeholderTextColor="#5A5A5A"
        onChangeText={text => {
          onChangeText(text);
        }}
      />
      {props.icon ? (
        <Image
          source={props.icon}
          style={{
            height: normalise(22),
            width: normalise(22),
            position: 'absolute',
            right: normalise(12),
            top: normalise(8),
          }}
          resizeMode="contain"
        />
      ) : null}
    </View>
  );
}

TextArea.propTypes = {
  marginTop: PropTypes.number,
  maxLength: PropTypes.number,
  isSecure: PropTypes.bool,
  multiline: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  keyboardType: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  color: PropTypes.string,
  letterSpacing: PropTypes.number,
  fontSize: PropTypes.number,
  editable: PropTypes.bool,
  borderColor: PropTypes.string,
  fontWeight: PropTypes.string,
  textAlign: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  caretHidden: PropTypes.bool,
  borderRadius: PropTypes.any,
  icon: PropTypes.any,
  background: PropTypes.any,
  heightInput: PropTypes.any,
};

TextArea.defaultProps = {
  marginTop: 0,
  maxLength: 400,
  isSecure: false,
  multiline: false,
  autoCapitalize: 'none',
  placeholder: '',
  placeholderTextColor: Colors.black,
  keyboardType: 'default',
  value: '',
  onChangeText: null,
  color: Colors.black,
  editable: true,
  borderColor: '#DDDDDD',
  onFocus: null,
  onBlur: null,
  letterSpacing: 0,
  fontSize: 12,
  textAlign: 'left',
  caretHidden: false,
  borderRadius: normalise(10),
  icon: null,
  background: '#F6F6F6',
  heightInput: normalise(120),
};
