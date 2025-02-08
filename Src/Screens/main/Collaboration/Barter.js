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
import {Colors} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import Icons from '../../../themes/icons';
import Images from '../../../themes/Images';

function Barter(props) {
  return (
    <>
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
          <Text style={style.text}>BarterInvite</Text>
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
      <View style={style.container}>
        <ScrollView>
          <>
            <View
              style={{
                marginTop: normalize(12),
              }}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={style.btn}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginStart: normalize(7),
                      marginEnd: normalize(7),
                    }}>
                    <Text style={style.text4}>Explore</Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    width: normalize(12),
                  }}></View>
                <TouchableOpacity style={style.btn}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginStart: normalize(7),
                      marginEnd: normalize(7),
                    }}>
                    <Text style={style.text4}>Requested</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View
                style={{
                  borderWidth: normalize(1),
                  borderColor: Colors.grey,
                  paddingHorizontal: normalize(9),
                  paddingTop: normalize(9),
                  width: normalize(160),
                  alignItems: 'center',
                  borderRadius: normalize(7),
                  marginTop: normalize(9),
                }}>
                <ImageBackground
                  source={Images.dyning}
                  style={{
                    height: normalize(135),
                    width: normalize(142),
                    justifyContent: 'flex-end',
                    padding: normalize(6),
                  }}
                  imageStyle={{
                    borderRadius: normalize(6),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={Images.profile}
                      style={style.profileCollabr}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                        marginStart: normalize(3),
                      }}>
                      Brand Name
                    </Text>
                  </View>
                </ImageBackground>
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
                    10% Off
                  </Text>
                </View>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(12),
                    // marginStart: normalize(3),
                    alignSelf: 'flex-start',
                    marginTop: normalize(7),
                  }}>
                  Electronics Product ssss wswswsw
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(10),
                    marginTop: normalize(12),
                    alignSelf: 'flex-start',
                  }}>
                  From Jan 15 to Feb 14
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginTop: normalize(8),
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    width: normalize(136),
                    height: normalize(42),
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={Icons.document_upload}
                      style={style.profileCollabration}
                      resizeMode="contain"
                    />
                    <Text
                      style={{color: Colors.white, fontSize: normalize(12)}}>
                      16
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      height: normalize(27),
                      borderRadius: normalize(19),
                      backgroundColor: '#C4FD65',
                      justifyContent: 'center',
                      paddingHorizontal: normalize(9),
                      alignItems: 'center',
                    }}
                    onPress={() => props.navigation.navigate('BarterInvite')}>
                    <Text
                      style={{color: Colors.black, fontSize: normalize(12)}}>
                      Request
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        </ScrollView>
      </View>
    </>
  );
}

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
export default Barter;
