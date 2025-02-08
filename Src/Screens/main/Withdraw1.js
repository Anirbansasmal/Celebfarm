import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../themes/Themes';
import normalize from '../../utils/helpers/dimen';
import Button from '../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../themes/icons';
import Images from '../../themes/Images';
import {ScrollView} from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

function Withdraw1(props) {
  const dispatch = useDispatch();
  const ContentLabReducer = useSelector(state => state.ContentLabReducer);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
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
          <Text style={style.text}>Withdraw</Text>
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
                  borderWidth: normalize(1),
                  borderColor: '#2A2C27',
                  padding: normalize(6),
                  marginTop: normalize(18),
                  justifyContent: 'space-between',
                  borderRadius: normalize(6),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(16),
                  }}>
                  Social Platform
                </Text>
                <View
                  style={{
                    borderWidth: normalize(1),
                    borderColor: '#2A2C27',
                    padding: normalize(6),
                    marginTop: normalize(18),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems:'center',
                  }}>
                  <ImageBackground
                    source={Images.lab}
                    style={{height: normalize(33), width: normalize(33)}}
                    imageStyle={{borderRadius: normalize(29), }}
                    resizeMode="contain"
                  />
                  <View>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(12),
                        marginLeft: normalize(3),
                      }}>
                      anik_deb_sagor
                    </Text>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(12),
                        marginLeft: normalize(3),
                      }}>
                      instagram.com/anik_d...
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      borderRadius: normalize(17),
                      backgroundColor: '#252525',
                      paddingHorizontal: normalize(12),
                      paddingVertical: normalize(7),
                      justifyContent:'center'
                    }}>
                    <Text
                      style={{
                        color: '#FFFF',
                        fontSize: normalize(10),
                      }}>
                      Disconnect
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    borderWidth: normalize(1),
                    borderColor: '#2A2C27',
                    padding: normalize(10),
                    marginTop: normalize(18),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems:'center'
                  }}>
                    <View style={{flexDirection:'row'}}>
                  <Image
                    source={Icons.youtube}
                    style={{height: normalize(19), width: normalize(19)}}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(12),
                      marginLeft: normalize(13),
                    }}>
                    Youtube
                  </Text></View>
                  <TouchableOpacity
                    style={{
                      borderRadius: normalize(17),
                      backgroundColor: Colors.white,
                      paddingHorizontal: normalize(12),
                      paddingVertical: normalize(7),
                    }}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: normalize(10),
                      }}>
                      Connect
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
          </>
        </ScrollView>
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

export default Withdraw1;
