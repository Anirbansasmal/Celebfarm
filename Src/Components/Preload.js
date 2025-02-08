import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import normalize from '../utils/helpers/dimen';
import PropTypes from 'prop-types';
import {Colors, Fonts, Icons} from '../themes/Themes';
import Skeleton from "react-native-skeleton-loading";
import {ImageBackground} from 'react-native';
import ImageProfile from './ImageProfile';
export default function Preload(props) {
  return (
    // <View
    //   >
      <Skeleton 
        backgroundColor={ Colors.bgcolor}
      >
        <TouchableOpacity onPress={() => {}} activeOpacity={0.9}>
          <ImageBackground
            source={null}
            style={style?.imageBackStyle}
            imageStyle={{
              borderRadius: normalize(4),
            }}
            resizeMode="contain"></ImageBackground>
          <View style={style?.barterImageViewStyle}>
            <ImageProfile
              alignItems={'center'}
              height={normalize(18)}
              width={normalize(18)}
              borderRadius={normalize(4)}
              backgroundColor={Colors.white}
              brandImageUrl={null}
              imgheight={normalize(16)}
              imgwidth={normalize(16)}
              justifyContent={'center'}
            />
            <Text style={style?.brandStyle}></Text>
          </View>
          <Text style={style.barterTextStyle}></Text>

          <View style={style.subContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={Icons.document_upload}
                style={style.profileCollabration}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(10),
                  fontFamily: Fonts.Inter_Medium,
                }}></Text>
            </View>

            <Image
              source={null}
              style={{height: normalize(12), width: normalize(12)}}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </Skeleton>
    // </View>
  );
}

Preload.propTypes = {
  onChange: PropTypes.func,
  active: PropTypes.bool,
  body: PropTypes.any,
  marstart: PropTypes.any,
  backColor: PropTypes.any,
  borderWidth: PropTypes.any,
  CheckBox: PropTypes.any,
};

Preload.defaultProps = {
  onChange: () => {},
  active: false,
  body: null,
  marstart: normalize(12),
  backgroundColor: Colors.white,
  borderWidth: normalize(1),
  CheckBox: null,
};

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  containerBody: {
    paddingHorizontal: normalize(10),
    marginTop: normalize(12),
    flex: 1,
    marginBottom: normalize(43),
  },
  text: {
    color: Colors.white,
    fontSize: normalize(16),
    marginStart: normalize(12),
  },
  text2: {
    color: Colors.white,
    fontSize: normalize(14),
  },
  text6: {
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: normalize(7),
  },
  text3: {
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: normalize(22),
    opacity: 0.7,
  },
  text7: {
    color: Colors.white,
    fontSize: normalize(12),
  },
  imageLeft: {
    height: normalize(18),
    width: normalize(17),
  },
  upimage: {
    height: normalize(18),
    width: normalize(18),
  },
  profile: {
    height: normalize(49),
    width: normalize(49),
  },
  profileCollabration: {
    height: normalize(19),
    width: normalize(19),
    marginRight: normalize(7),
  },
  profileCollabr: {
    height: normalize(12),
    width: normalize(12),
  },
  filterBtn: {
    borderWidth: normalize(1),
    width: normalize(80),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(9),
    borderRadius: normalize(6),
    paddingVertical: normalize(3),
  },
  filterText: {
    fontSize: normalize(12),
    fontFamily: Fonts.Inter_Medium,
    color: Colors.white,
  },
  text4: {
    color: Colors.white,
    fontSize: normalize(14),
    opacity: 0.7,
    marginStart: normalize(6),
    alignSelf: 'flex-start',
  },
  btn: {
    flexDirection: 'row',
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: normalize(4),
    alignItems: 'center',
    paddingHorizontal: normalize(7),
    height: normalize(29),
  },
  imagem: {
    height: normalize(16),
    width: normalize(16),
    tintColor: Colors.black,
    marginEnd: normalize(9),
  },
  modelView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(9),
    paddingVertical: normalize(7),
    paddingHorizontal: normalize(7),
    marginEnd: normalize(18),
  },
  barterDiscount: {
    height: normalize(130),
    width: normalize(151),
    justifyContent: 'flex-end',
    padding: normalize(6),
  },
  barterTextStyle: {
    color: Colors.white,
    fontSize: normalize(10),
    // marginStart: normalize(3),
    alignSelf: 'flex-start',
    marginTop: normalize(6),
    fontFamily: Fonts.Inter_Medium,
  },
  brandStyle: {
    color: Colors.white,
    fontSize: normalize(12),
    marginStart: normalize(3),
    fontFamily: Fonts.Inter_Medium,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(6),
    justifyContent: 'space-between',
    alignContent: 'center',
    width: '99%',
    position: 'absolute',
    bottom: normalize(10),
    // width: normalize(136),
    // height: normalize(36),
  },
  barterImageViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: normalize(9),
  },
  offerStyle: {
    backgroundColor: Colors.white,
    height: normalize(16),
    alignSelf: 'flex-start',
    marginTop: normalize(9),
    borderRadius: normalize(3),
    paddingHorizontal: normalize(3),
    justifyContent: 'center',
  },
  offerTextStyle: {
    color: Colors.black,
    fontSize: normalize(10),
    marginStart: normalize(3),
    fontFamily: Fonts.Inter_SemiBold,
  },
  todateStyle: {
    color: Colors.white,
    fontSize: normalize(10),
    marginTop: normalize(12),
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Light,
  },
  discountStyle: {
    backgroundColor: Colors.white,
    height: normalize(16),
    alignSelf: 'flex-start',
    marginTop: normalize(9),
    borderRadius: normalize(3),
    paddingHorizontal: normalize(3),
    justifyContent: 'center',
  },
  discountTextStyle: {
    color: Colors.black,
    fontSize: normalize(10),
    marginStart: normalize(3),
    fontFamily: Fonts.Inter_SemiBold,
  },
  imageBackStyle: {
    height: normalize(140),
    width: normalize(136),
    justifyContent: 'flex-end',
    padding: normalize(6),
  },
  barter: {
    borderWidth: normalize(1),
    borderColor: '#2A2C27',
    backgroundColor: '#181818',
    padding: normalize(5),
    height: normalize(234),
    width: Dimensions.get('window').width / 2.2,
    alignItems: 'center',
    borderRadius: normalize(4),
    marginEnd: normalize(5),
    marginTop: normalize(9),
  },
  barter1: {
    borderWidth: normalize(1),
    borderColor: '#2A2C27',
    backgroundColor: '#181818',
    padding: normalize(5),
    height: normalize(234),
    width: Dimensions.get('window').width / 2.2,
    alignItems: 'center',
    borderRadius: normalize(4),
    marginTop: normalize(9),
  },
});
