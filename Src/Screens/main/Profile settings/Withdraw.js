import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../themes/icons';
import {ScrollView} from 'react-native-gesture-handler';
import ButtonLinear from '../../../Components/Button Linear';
import { useDispatch, useSelector } from 'react-redux';
import HeaderCommon from '../../../Components/HeaderCommon';

function Withdraw(props) {
  const dispatch = useDispatch();
  const ContentLabReducer = useSelector(state => state.ContentLabReducer);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
      <HeaderCommon
        picTitle={true}
        home={true}
        back={true}
        backgroundColor={'#000'}
        title={'Withdraw'}
        heardetext={Colors.white}
        headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(61)}
        textfontSize={normalize(16)}
        fontFamily={Fonts.Inter_Bold}
        backScreen={() => {
          props.navigation.goBack();
        }}
        textColor={'#ffff'}
        {...props}
      />
      {/* <SafeAreaView style={style.container}> */}
      <View style={style.container}>
        <ScrollView>
          <>
            <View
              style={{
                marginTop: normalize(12),
                borderRadius: normalize(7),
              }}>
              <View
                style={{
                  height: normalize(2),
                  // width: normalize(Dimensions.get('screen').width - 91),
                }}
              />
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <View
                  style={{
                    width: normalize(Dimensions.get('screen').width - 99),
                    height: normalize(120),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#2A2C27',
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(33),
                      marginTop: normalize(12),
                    }}>
                    ₹0
                  </Text>
                  <Text
                    style={{
                      color: '#C4FD65',
                      fontSize: normalize(14),
                      marginTop: normalize(18),
                    }}>
                    ₹0 Available Balance
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: normalize(18),
                marginBottom: normalize(12),
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(12),
                  textAlign: 'center',
                }}>
                Amount will be credited to *********7878 account within 24hr
              </Text>
            </View>
          </>
        </ScrollView>
        <View style={{bottom: 0, alignSelf: 'center'}}>
          <ButtonLinear
            width={'81%'}
            height={normalize(40)}
            backgroundColor={Colors.btnColor}
            title={'Withdraw'}
            alignSelf={'center'}
            textColor={Colors.black}
            titlesingle={true}
            borderRadius={normalize(25)}
            marginHorizontal={normalize(5)}
            btnBottom={0}
            onPress={() => {
            }}
          />
        </View>
      </View>
      {/* </SafeAreaView> */}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
    paddingHorizontal: normalize(10),
  },
  containerBody: {
    paddingHorizontal: normalize(10),
    marginTop: normalize(12),
    flex: 1,
    marginBottom: normalize(43),
    backgroundColor: Colors.black,
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
  textVoice: {
    color: Colors.white,
    fontSize: normalize(12),
    width: normalize(190),
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
    borderRadius: normalize(22),
    alignItems: 'center',
    paddingHorizontal: normalize(7),
    height: normalize(29),
  },
});

export default Withdraw;
