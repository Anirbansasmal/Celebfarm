import React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';

import normalize from '../utils/helpers/dimen';
import PropTypes from 'prop-types';
import {Colors, Fonts} from '../themes/Themes';
import Icons from '../themes/icons';
import LinearGradient from 'react-native-linear-gradient';

export default function RequestedComponent(props) {
  function onPress() {
    if (props.onPress) {
      props.onPress();
    }
  }

  return (
    <TouchableOpacity
      style={{
        borderWidth: normalize(1),
        borderColor: Colors.borderColor,
        marginStart: index % 2 != 0 ? normalize(18) : 0,
        width: '47%',
        alignItems: 'center',
        borderRadius: normalize(3),
        padding: normalize(7),
        marginTop: normalize(9),
      }}
      onPress={()=>props.onPress()}
    >
      <ImageBackground
        source={props.image}
        style={{
          height: props?.req ? normalize(118) : normalize(70),
          width: normalize(127),
          justifyContent: 'flex-end',
          padding: normalize(6),
        }}
        imageStyle={{
          borderRadius: normalize(3),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={props.profileimage}
            style={props.profileCollabr}
            resizeMode="contain"
          />
          <Text
            style={{
              color: Colors.white,
              fontSize: normalize(10),
              marginStart: normalize(3),
              fontFamily: Fonts.Inter_Medium,
            }}>
            Brand Name
          </Text>
        </View>
      </ImageBackground>
      {props?.req == false ? (
        <View
          style={{
            backgroundColor: Colors.white,
            height: normalize(16),
            alignSelf: 'flex-start',
            marginTop: normalize(6),
            borderRadius: normalize(3),
            paddingHorizontal: normalize(3),
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: Colors.black,
              fontSize: normalize(10),
              marginStart: normalize(3),
            }}>
            {props.off}% Off
          </Text>
        </View>
      ) : null}
      {props?.heading ? (
        <Text
          style={{
            color: Colors.white,
            fontSize: normalize(10),
            // marginStart: normalize(3),
            alignSelf: 'flex-start',
            marginTop: normalize(4),
            fontFamily: Fonts.Inter_SemiBold,
          }}>
          {props?.heading}
        </Text>
      ) : null}
      <Text
        style={{
          color: Colors.white,
          fontSize: normalize(10),
          // marginStart: normalize(3),
          alignSelf: 'flex-start',
          marginTop: normalize(2),
          fontFamily: Fonts.Inter_Light,
        }}>
        {props?.content}
      </Text>
      {item?.req == false ? (
        <Text
          style={{
            color: Colors.white,
            fontSize: normalize(10),
            marginTop: normalize(12),
            alignSelf: 'flex-start',
            fontFamily: Fonts.Inter_SemiBold,
          }}>
          From Jan 15 to Feb 14
        </Text>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: normalize(5),
          justifyContent: 'space-between',
          alignContent: 'center',
          width: normalize(136),
          // height: normalize(42),
          paddingHorizontal: normalize(6),
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              color: Colors.white,
              fontSize: normalize(12),
              fontFamily: Fonts.Inter_SemiBold,
            }}>
            2 w ago
          </Text>
        </View>
        {item?.req ? (
          <TouchableOpacity
            style={{
              height: normalize(27),
              borderRadius: normalize(19),
              backgroundColor: '#06B8631A',
              justifyContent: 'center',
              paddingHorizontal: normalize(9),
              alignItems: 'center',
            }}
            // onPress={() => props.navigation.navigate('Requested')}
          >
            <Text style={{color: '#06B863', fontSize: normalize(12)}}>
              Approved
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              height: normalize(27),
              borderRadius: normalize(19),
              backgroundColor: '#06B8631A',
              justifyContent: 'center',
              paddingHorizontal: normalize(9),
              alignItems: 'center',
            }}
            // onPress={() => props.navigation.navigate('Requested')}
          >
            <Text style={{color: '#FFD04E', fontSize: normalize(12)}}>
              Pending
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

ButtonLinear.propTypes = {
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

ButtonLinear.defaultProps = {
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
