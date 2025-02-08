import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import Button from '../../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../themes/icons';
import Images from '../../../themes/Images';
import {ScrollView} from 'react-native-gesture-handler';
import TextInputItem from '../../../Components/TextInputItem';
import { useDispatch, useSelector } from 'react-redux';

function IdVerification3(props) {
  const [gender, setGender] = useState('');
  const dispatch = useDispatch();
  const ContentLabReducer = useSelector(state => state.ContentLabReducer);
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View
        style={{
          flexDirection: 'row',
          padding: normalize(0),
          justifyContent: 'space-between',
          borderBottomColor: '#434540',
          borderBottomWidth: normalize(1),
          paddingVertical: normalize(12),
          backgroundColor: Colors.black,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: normalize(12),
            }}
            onPress={() => props.navigation.goBack()}>
            <Image
              source={Icons.arrowleft}
              style={{
                height: normalize(12),
                width: normalize(18),
              }}
            />
          </TouchableOpacity>
          <Text style={style.text}>Profile</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginEnd: normalize(12),
          }}>
          <Image
            source={Icons.notification}
            style={style.imageLeft}
            resizeMode="contain"
          />
          <View
            style={{
              width: normalize(12),
            }}></View>
          <Image
            source={Icons.user}
            style={style.imageLeft}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* <SafeAreaView style={style.container}> */}
      <View style={style.container}>
        <ScrollView>
          <>
            <View
              style={{
                marginTop: normalize(12),
                borderRadius: normalize(7),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: '#CECECE',
                  fontSize: normalize(17),
                  marginLeft: normalize(3),
                }}>
                Id Verification
              </Text>
              <View
                style={{
                  height: normalize(20),
                  paddingHorizontal: normalize(10),
                  backgroundColor: '#22342B',
                  borderRadius:normalize(12),
                  justifyContent:'center'
                }}>
                <Text
                  style={{
                    color: '#08AF60',
                    fontSize: normalize(12),
                  }}>
                  Verified
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: normalize(12),
                borderRadius: normalize(7),
              }}>
              <Text
                style={{
                  color: '#CECECE',
                  fontSize: normalize(12),
                  marginLeft: normalize(3),
                }}>
                Id Verification
              </Text>

              <TextInputItem
                heightInput={
                  Platform.OS == 'ios' ? normalize(42) : normalize(40)
                }
                widthInput={'100%'}
                // value={mobile}
                placeholder="1234567890"
                // onChangeText={text => setMobile(text)}
                marginTop={normalize(10)}
                placeholderTextColor={'#ABABAB'}
                // fontFamily={Fonts.futura_medium_bt}
                color={'#000'}
                borderRadius={7}
                borderColor={'#434540'}
                borderWidth={1}
                backgroundColor={Colors.black}
                inputHeight={normalize(52)}
              />
            </View>
          </>
        </ScrollView>
      </View>
      {/* </SafeAreaView> */}
      </KeyboardAvoidingView>
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

export default IdVerification3;
