import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../../../themes/Themes';
import normalize from '../../../../utils/helpers/dimen';
import Button from '../../../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../../themes/icons';
import Images from '../../../../themes/Images';
import {ScrollView} from 'react-native-gesture-handler';
import ButtonLinear from '../../../../Components/Button Linear';
import HeaderCommon from '../../../../Components/HeaderCommon';

function BarterInvite(props) {
  useEffect(() => {}, []);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
        <HeaderCommon
          picTitle={true}
          home={true}
          back={true}
          backgroundColor={'#000'}
          title={'Invite'}
          heardetext={Colors.white}
          headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(51)}
          textfontSize={normalize(16)}
        backScreen={()=>{props.navigation.goBack()}}

          fontFamily={Fonts.Inter_Bold}
          // marginStart={normalize(33)}
          textColor={'#ffff'}
          {...props}
        />
        <View style={style.container}>
          <ScrollView>
            <>
              <View
                style={{
                  marginTop: normalize(12),
                  borderRadius: normalize(7),
                }}>
                <ImageBackground
                  source={Images.dyning}
                  style={{
                    width: normalize(Dimensions.get('screen').width - 97),
                    height: normalize(280),
                  }}
                  imageStyle={{borderRadius: normalize(3)}}
                  // resizeMode="contain"
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: normalize(52),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
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

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity style={style.cardTypeDel}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(10),
                        }}>
                        Barter
                      </Text>
                    </TouchableOpacity>
                    <View style={style.circle} />
                    <Image
                      source={Icons.insta}
                      style={style.profileCollabration}
                      resizeMode="contain"
                    />
                    <View style={style.circle} />
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                        fontFamily: Fonts.Inter_Light,
                      }}>
                      5 Mar
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: normalize(1),
                  width: normalize(Dimensions.get('screen').width),
                  marginTop: normalize(12),
                  backgroundColor: '#434540',
                }}
              />
              <View
                style={{
                  marginTop: normalize(12),
                  // backgroundColor:Colors.red,
                  borderRadius: normalize(4),
                  // marginStart: normalize(7),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(16),
                    fontFamily: Fonts.Inter_Bold,
                  }}>
                  Electronics Product ssss wswswsw
                </Text>
                <View
                  style={{
                    marginTop: normalize(12),
                    borderRadius: normalize(6),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={style.textVoice}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. sdsd dsdsdsd dsdsdsd.
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: normalize(33),
                  marginBottom: normalize(12),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(14),
                    fontFamily: Fonts.Inter_Bold,
                  }}>
                  Deliverables
                </Text>
                <View
                  style={{
                    marginTop: normalize(12),
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      height: normalize(1),
                      width: normalize(Dimensions.get('window').width - 82),
                      backgroundColor: '#363833',
                      alignSelf: 'center',
                    }}></View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: normalize(12),
                      alignItems: 'center',
                    }}>
                    <View style={style.cardDel}>
                      <Image
                        source={Icons.images}
                        style={{
                          width: normalize(22),
                          height: normalize(22),
                        }}
                        resizeMode="contain"
                      />

                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(12),
                          marginStart: normalize(7),
                        }}>
                        Image
                      </Text>
                      <View style={style.circleNumber}>
                        <Text
                          style={{
                            color: Colors.black,
                            fontSize: normalize(10),
                          }}>
                          04
                        </Text>
                      </View>
                    </View>

                    <View style={style.cardDel}>
                      <Image
                        source={Icons.images}
                        style={{
                          width: normalize(22),
                          height: normalize(22),
                        }}
                        resizeMode="contain"
                      />

                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(12),
                          marginStart: normalize(7),
                        }}>
                        Image
                      </Text>
                      <View style={style.circleNumber}>
                        <Text
                          style={{
                            color: Colors.black,
                            fontSize: normalize(10),
                          }}>
                          04
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      ...style.cardDel,
                      marginTop: normalize(10),
                      width: normalize(142),
                    }}>
                    <Image
                      source={Icons.images}
                      style={{
                        width: normalize(22),
                        height: normalize(22),
                      }}
                      resizeMode="contain"
                    />

                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(12),
                        marginStart: normalize(7),
                      }}>
                      Image
                    </Text>
                    <View style={style.circleNumber}>
                      <Text
                        style={{
                          color: Colors.black,
                          fontSize: normalize(10),
                        }}>
                        04
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </>
          </ScrollView>
          <View
            style={{
              marginTop: normalize(12),
              justifyContent: 'center',
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Button
                width={'40%'}
                height={normalize(40)}
                alignSelf={'center'}
                backgroundColor={'#000000'}
                title={'Ignore'}
                textColor={Colors.white}
                titlesingle={true}
                borderRadius={normalize(22)}
                marginHorizontal={normalize(5)}
                btnBottom={0}
                onPress={() => {}}
              />
              <ButtonLinear
                width={'50%'}
                height={normalize(40)}
                alignSelf={'center'}
                backgroundColor={Colors.btnColor}
                title={'Accept'}
                textColor={Colors.black}
                titlesingle={true}
                borderRadius={normalize(25)}
                marginHorizontal={normalize(5)}
                btnBottom={0}
                onPress={() => {}}
              />
            </View>
            {/* </View> */}
          </View>
        </View>
      </SafeAreaView>
    </>
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
  cardTypeDel: {
    borderRadius: normalize(19),
    backgroundColor: '#463080',
    paddingHorizontal: normalize(12),
    justifyContent: 'center',
    height: normalize(16),
    marginRight: normalize(9),
  },
  circle: {
    backgroundColor: Colors.white,
    height: normalize(3),
    width: normalize(3),
    borderRadius: normalize(3 / 2),
    marginRight: normalize(9),
  },
  cardDel: {
    flexDirection: 'row',
    borderWidth: normalize(1),
    paddingHorizontal: normalize(22),
    paddingVertical: normalize(9),
    borderColor: '#2A2C27',
    justifyContent: 'space-between',
    borderRadius: normalize(4),
    alignItems: 'center',
  },
  circleNumber: {
    borderRadius: normalize(18),
    height: normalize(22),
    paddingHorizontal: normalize(6),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: normalize(7),
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
    fontFamily: Fonts.Inter_Light,
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
    height: normalize(14),
    width: normalize(14),
    marginRight: normalize(7),
  },
  profileCollabr: {
    height: normalize(21),
    width: normalize(21),
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
export default BarterInvite;
