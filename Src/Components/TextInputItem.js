import React from 'react';
import {View, Image, TextInput, TouchableOpacity, Text} from 'react-native';
import normalise from '../utils/helpers/dimen';
import PropTypes from 'prop-types';

import {Colors, Fonts} from '../themes/Themes';

export default function TextInputItem(props) {
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
  function onPress() {
    if (props.onPress) {
      props.onPress();
    }
  }
  function onPressssequre() {
    if (props.onPressssequre) {
      props.onPressssequre();
    }
  }
  return (
    <View
      style={{
        height: props.heightInput,
        width: props.widthInput,
        borderColor: props.borderColor,
        borderWidth: props.borderWidth,
        borderRadius: props.borderRadius,
        // borderBottomLeftRadius: props.borderRadius,
        // borderTopRightRadius: props.borderRadiusRightRadius,
        // borderBottomRightRadius: props.borderBottomRadiusRightRadius,
        marginTop: props.marginTop,
        position: 'relative',
        backgroundColor: props.backgroundColor,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginStart: props.marginStart,
        marginBottom: props.marginBottom,

      }}>
      {props.iconleft ? (
        <Image
          source={props.iconleft}
          style={{
            height: props.imgheight,
            width: props.imgwidth,
            position: 'absolute',
            // right: normalise(12),
            // top: normalise(12),
            alignItems: 'center',
            alignSelf: 'center',
            marginStart: 10,
          }}
          resizeMode="contain"
        />
      ) : null}
      <TextInput
        style={[
          {
            paddingLeft: normalise(3),
            paddingRight: normalise(14),
            marginLeft: props.iconleft == null ? normalise(10) : normalise(40),
            flex: 1,
            textAlign: props.textAlign,
            letterSpacing: normalise(props.letterSpacing),
            color: props.color,
            fontFamily: props.fontFamily,
            fontSize: normalise(props.fontSize),
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            height: props.inputHeight,
            // backgroundColor:Colors.red,
            textTransform:props.textTransform
          },
          props.icon ? {paddingRight: normalise(40)} : null,
        ]}
        caretHidden={props.caretHidden}
        maxLength={props.maxLength}
        secureTextEntry={props.isSecure}
        multiline={props.multiline}
        autoCapitalize={props.autoCapitalize}
        placeholder={props.placeholder}
        editable={props.editable}
        placeholderTextColor={props.placeholderTextColor}
        keyboardType={props.keyboardType}
        value={props.value}
        fontWeight={props.fontWeight}
        onChangeText={text => {
          onChangeText(text);
        }}
      />
      {props.cuppon ? (
        <TouchableOpacity
          style={{
            height: normalise(43),
            width: props.btnWidth,
            marginTop: normalise(-2),
            // marginStart: normalise(-7),
            backgroundColor: Colors.red,
            alignItems: 'center',
            borderTopRightRadius: normalise(10),
            borderBottomRightRadius: normalise(10),
            justifyContent: 'center',
          }}
          onPress={() => onPress()}>
          <Text
            style={{
              color: Colors.white,
              fontWeight: '400',
              textAlign: 'center',
              fontSize: normalise(16),
            }}>
            Apply
          </Text>
        </TouchableOpacity>
      ) : null}

      {props.iconright ? (
        <TouchableOpacity
          style={{
            height: normalise(43),
            width: props.btnWidth,
            marginTop: normalise(-2),
            // marginStart: normalise(-7),
            // backgroundColor: Colors.red,
            alignItems: 'center',
            borderTopRightRadius: normalise(10),
            borderBottomRightRadius: normalise(10),
            justifyContent: 'center',
          }}
          onPress={() => onPressssequre()}>
          <Image
            source={props.iconright}
            style={{
              height: props.imgrightheight,
              width: props.imgrightwidth,
              right: normalise(12),
              alignSelf: 'center',
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

TextInputItem.propTypes = {
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
  fontWeight: PropTypes.any,
  textAlign: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onPress: PropTypes.func,
  onPressssequre: PropTypes.func,
  textTransform:PropTypes.string,
  caretHidden: PropTypes.bool,
  search: PropTypes.bool,
  borderRadius: PropTypes.any,
  borderRadiusLeftRadius: PropTypes.any,
  borderBottomRadiusRightRadius: PropTypes.any,
  icon: PropTypes.any,
  iconleft: PropTypes.any,
  iconright: PropTypes.any,
  fontFamily: PropTypes.any,
  backgroundColor: PropTypes.any,
  widthInput: PropTypes.any,
  heightInput: PropTypes.any,
  marginStart: PropTypes.any,
  marginBottom: PropTypes.any,
  cuppon: PropTypes.any,
  btnWidth: PropTypes.any,
  inputHeight: PropTypes.number,
  inputWidth: PropTypes?.number,
  imgheight: PropTypes.any,
  imgwidth: PropTypes.any,
  imgrightheight: PropTypes.any,
  imgrightwidth: PropTypes.any,
  borderWidth: PropTypes.borderWidth,
};

TextInputItem.defaultProps = {
  marginTop: 0,
  maxLength: 40,
  isSecure: false,
  multiline: false,
  autoCapitalize: 'none',
  placeholder: '',
  placeholderTextColor: Colors.black,
  keyboardType: 'default',
  value: '',
  onChangeText: null,
  color: Colors.black,
  textTransform:'none',
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
  iconleft: null,
  fontFamily: Fonts.montserrat_bold,
  fontWeight: '400',
  backgroundColor: '',
  search: false,
  widthInput: '100%',
  borderRadiusRightRadius: normalise(10),
  borderBottomRadiusRightRadius: normalise(10),
  cuppon: null,
  btnWidth: null,
  marginStart: 0,
  marginBottom: 0,
  iconright: null,
  inputHeight: normalise(52),
  imgheight: normalise(20),
  imgwidth: normalise(20),
  imgrightheight: normalise(20),
  imgrightwidth: normalise(20),
  heightInput: normalise(42),
  borderWidth: normalise(1),
  onPressssequre: null,
};
