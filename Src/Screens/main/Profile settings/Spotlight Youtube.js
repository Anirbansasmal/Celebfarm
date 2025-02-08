import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../themes/icons';
import Images from '../../../themes/Images';
import {ScrollView} from 'react-native-gesture-handler';
import CheckBox from '../../../Components/CheckBox';
import {useDispatch, useSelector} from 'react-redux';
import HeaderCommon from '../../../Components/HeaderCommon';

function SpotlightYoutube(props) {
  const [gender, setGender] = useState('');
  const [saveGst, setSaveGst] = useState(false);
  const dispatch = useDispatch();
  const ContentLabReducer = useSelector(state => state.ContentLabReducer);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
      <HeaderCommon
            picTitle={true}
            home={true}
            back={true}
            backgroundColor={'#000'}
            title={'Spotlight'}
            heardetext={Colors.white}
            headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(51)}
            textfontSize={normalize(16)}
            fontFamily={Fonts.Inter_Bold}
            // marginStart={normalize(33)}
            notifiPress={() => props.navigation.navigate('Notifications')}
            profilePress={() => props.navigation.navigate('Chat')}
            backScreen={() => props.navigation.goBack()}
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
                  padding: normalize(6),
                  flexDirection: 'row',
                  // justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <ImageBackground
                  source={Images.lab}
                  style={{height: normalize(43), width: normalize(43)}}
                  imageStyle={{borderRadius: normalize(29)}}
                  resizeMode="contain"
                />
                <View style={{marginStart: normalize(12)}}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(12),
                      fontFamily: Fonts.Inter_Bold,
                    }}>
                    @anik_deb_sagor
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={Icons.insta}
                      style={{height: 12, width: 12}}
                    />
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                        marginLeft: normalize(3),
                      }}>
                      instagram
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SpotlightInsta')}>
              <ImageBackground
                source={Images.dyning}
                style={{
                  height: normalize(130),
                  width: normalize(Dimensions.get('window').width / 3.2),
                  marginEnd: normalize(6),
                }}
                imageStyle={{borderRadius: normalize(3)}}>
                <View
                  style={{
                    position: 'absolute',
                    end: normalize(12),
                    top: normalize(7),
                  }}>
                  <CheckBox
                    active={saveGst}
                    backgroundColor={'#0000'}
                    CheckBox={Icons.radiocheck}
                    borderWidth={1}
                    onChange={v => {
                      setSaveGst(!saveGst);
                    }}
                  />
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </>
        </ScrollView>
      </View>
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

export default SpotlightYoutube;
