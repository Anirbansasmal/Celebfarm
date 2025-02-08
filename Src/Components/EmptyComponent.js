import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import normalize from '../utils/helpers/dimen';
import PropTypes from 'prop-types';
import {Colors, Fonts, Icons, Images} from '../themes/Themes';
import ImageProfile from './ImageProfile';

export default function EmptyComponent(props) {
  return (
    <View style={{...styles.statusSub, height: props.height}}>
      <View style={{...styles.emptyImage, height: props.imgHeight,width:props.imgWidth}} />
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            color: Colors.whitegrey,
            fontFamily: Fonts.Inter_Medium,
            fontSize: normalize(14),
          }}>
          {props?.val}
        </Text>
      </View>
    </View>
  );
}

EmptyComponent.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  val: PropTypes.string,
  imgHeight: PropTypes.number,
  imgWidth: PropTypes.number,

};

EmptyComponent.defaultProps = {
  width: normalize(10),
  val: '',
  height: normalize(170),
  imgWidth: normalize(90),
};

const styles = StyleSheet.create({
  emptyImage: {
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(16),
    borderRadius:normalize(5),
    backgroundColor: Colors.whitegrey,
    height: normalize(52),
    width: normalize(52),
    marginBottom: normalize(10),
  },
  statusSub: {
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(9),
    alignItems: 'center',
    backgroundColor: Colors.bcolor,
    borderRadius: normalize(10),
    marginTop: normalize(12),
    justifyContent:'center',
  },
});
