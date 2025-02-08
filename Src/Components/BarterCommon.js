import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import normalize from '../utils/helpers/dimen';
import PropTypes from 'prop-types';
import {Colors, Fonts, Icons, Images} from '../themes/Themes';
import ImageProfile from './ImageProfile';
import moment from 'moment';

export default function BaterCommon(props) {
  function onPressBarter() {
    if (props.onPress) {
      props.onPress();
    }
  }

  return (
    <>
      <TouchableOpacity
        style={props.barter}
        onPress={() => {
          onPressBarter();
        }}
        activeOpacity={0.9}>
        <ImageBackground
          source={
            props?.productImageUrl == ''
              ? Images.dyning
              : {uri: props?.productImageUrl}
          }
          style={props?.imageBackStyle}
          imageStyle={{
            borderRadius: normalize(4),
          }}
          resizeMode="cover"/>
        <View style={props?.imageViewStyle}>
          <ImageProfile
            alignItems={'center'}
            height={normalize(18)}
            width={normalize(18)}
            borderRadius={normalize(4)}
            backgroundColor={Colors.white}
            brandImageUrl={props?.brandImageUrl}
            imgheight={normalize(16)}
            imgwidth={normalize(16)}
            justifyContent={'center'}
          />
          <Text style={props?.brandStyle}>{props?.brandName?.substring(0,14)}</Text>
        </View>
        <Text style={props.barterTextStyle}>
          {props?.barterProductTitle?.substring(0, 18)}
        </Text>

        {props?.discount != null ? (
          <View style={props?.discountStyle}>
            <Text style={props?.discountTextStyle}>{props?.offer}% Off</Text>
          </View>
        ) : null}
        {props?.toDate != null ? (
          <Text style={props?.todateStyle}>{props?.toDate == '' ? '' : props?.fromDate}</Text>
        ) : (
          <View></View>
        )}
        {props?.status == "" ? (
        <View style={props.subContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={Icons.document_upload}
              style={props.profileCollabration}
              resizeMode="contain"
            />
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(10),
                fontFamily: Fonts.Inter_Medium,
              }}>
              {props?.totalDeliverables}
            </Text>
          </View>

          <Image
            source={
              props.platformType == 'Instagram' ? Icons.insta : Icons.youtube
            }
            style={{height: normalize(12), width: normalize(12)}}
            resizeMode="contain"
          />
        </View>):(
          <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: normalize(6),
            justifyContent: 'space-between',
            alignContent: 'center',
            width: normalize(136),
            // height: normalize(42),
            paddingHorizontal: normalize(6),
            position: 'absolute',
            bottom: normalize(6),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(9),
                fontFamily: Fonts.Inter_SemiBold,
              }}>
              {moment(props?.campaignDate).subtract(2, 'weeks').fromNow()}
            </Text>
          </View>
          {props?.status == 'Approved' ? (
            <View
              style={{
                height: normalize(22),
                borderRadius: normalize(22 / 2),
                backgroundColor: '#06B8631A',
                justifyContent: 'center',
                paddingHorizontal: normalize(9),
                alignItems: 'center',
                bottom: normalize(0),
              }}>
              <Text style={{color: '#06B863', fontSize: normalize(10)}}>
                Approved
              </Text>
            </View>
          ) : (
            <View
              style={{
                height: normalize(22),
                borderRadius: normalize(22 / 2),
                backgroundColor: '#06B8631A',
                justifyContent: 'center',
                paddingHorizontal: normalize(9),
                alignItems: 'center',
              }}>
              <Text style={{color: '#FFD04E', fontSize: normalize(10)}}>
                Pending
              </Text>
            </View>
          )}
        </View>
        )}
      </TouchableOpacity>
    </>
  );
}

BaterCommon.propTypes = {
  onPress: PropTypes.func,
  productImageUrl: PropTypes.string,
  imageBackStyle: PropTypes.any,
  brandImageUrl: PropTypes.string,
  brandName: PropTypes.string,
  barterProductTitle: PropTypes.string,
  totalDeliverables: PropTypes.string,
  toDate: PropTypes.string,
  fromDate: PropTypes.string,
  campaignDate:PropTypes.string,
  platformType: PropTypes.string,
  active: PropTypes.bool,
  discount: PropTypes.bool,
  offer: PropTypes.bool,
  active: PropTypes.bool,
  marstart: PropTypes.any,
  backColor: PropTypes.any,
  borderWidth: PropTypes.any,
  barter: PropTypes.any,
  status:PropTypes.bool,
  barterTextStyle: PropTypes.any,
  barterDiscount: PropTypes.any,
  imageViewStyle: PropTypes.any,
  subContainer: PropTypes.any,
  offerStyle: PropTypes.any,
  brandStyle: PropTypes.any,
  offerTextStyle: PropTypes.any,
  discountStyle: PropTypes.any,
  todateStyle: PropTypes.any,
  formdateStyle: PropTypes.any,
  discountTextStyle: PropTypes.any,
  profileCollabration: PropTypes.any,
};

BaterCommon.defaultProps = {
  onPress: () => {},
  productImageUrl: '',
  brandImageUrl: '',
  brandImageUrl: '',
  brandName: '',
  barterProductTitle: '',
  totalDeliverables: '',
  discount: false,
  offer: false,
  active: false,
  marstart: normalize(12),
  backgroundColor: Colors.white,
  borderWidth: normalize(1),
  barter: null,
  imageBackStyle: null,
  toDate: '',
  fromDate: '',
  campaignDate:'',
  platformType: '',
  barterTextStyle: null,
  status:false,
  barterDiscount: null,
  imageViewStyle: null,
  subContainer: null,
  offerStyle: null,
  offerTextStyle: null,
  brandStyle: null,
  discountStyle: null,
  todateStyle: null,
  formdateStyle: null,
  discountTextStyle: null,
  profileCollabration: null,
};
