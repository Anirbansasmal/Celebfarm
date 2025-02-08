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
import {Colors, Fonts} from '../../../../themes/Themes';
import normalize from '../../../../utils/helpers/dimen';
import Button from '../../../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../../themes/icons';
import Images from '../../../../themes/Images';
import {ScrollView} from 'react-native-gesture-handler';
import ButtonLinear from '../../../../Components/Button Linear';
import TextInputItem from '../../../../Components/TextInputItem';
import ImageProfile from '../../../../Components/ImageProfile';
import {useDispatch, useSelector} from 'react-redux';
var status = '';

function Counteroffer(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const CollaborationReducer = useSelector(state => state.CollaborationReducer);
  const [inviteContent, setInviteContent] = useState([
    props?.route?.params?.counterOffer,
  ]);

  if (status == '' || CollaborationReducer.status != status) {
    switch (CollaborationReducer.status) {
      case 'collaboration/getInviteDetailsRequest':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/getInviteDetailsSuccess':
        status = CollaborationReducer.status;
        console.log('hgfgcvcb', CollaborationReducer?.inviteDetailsResponse);
        setInviteContent([CollaborationReducer?.inviteDetailsResponse]);
        break;
      case 'collaboration/getInviteDetailsFailure':
        status = CollaborationReducer.status;
        break;
    }
  }

  async function updateOffer() {
    try {
    } catch (error) {}
  }
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
            <Text style={style.text}>Counter Offer</Text>
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
        <ScrollView>
          <View style={style.containerBody}>
            <>
              <View
                style={{
                  marginTop: normalize(12),
                  borderRadius: normalize(7),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: normalize(6),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <ImageProfile
                      alignItems={'center'}
                      height={normalize(18)}
                      width={normalize(18)}
                      borderRadius={normalize(3)}
                      backgroundColor={Colors.white}
                      // brandImageUrl={inprogress?.brandImageUrl}
                      imgheight={normalize(16)}
                      imgwidth={normalize(16)}
                      justifyContent={'center'}
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

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        borderRadius: normalize(19),
                        backgroundColor: '#214C40',
                        paddingHorizontal: normalize(7),
                        justifyContent: 'center',
                        height: normalize(18),
                        marginRight: normalize(9),
                      }}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(10),
                          fontFamily: Fonts.Inter_Medium,
                        }}>
                        Paid
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: Colors.white,
                        height: normalize(3),
                        width: normalize(3),
                        borderRadius: normalize(3 / 2),
                        marginRight: normalize(9),
                      }}
                    />
                    <Image
                      source={Icons.insta}
                      style={style.profileCollabration}
                      resizeMode="contain"
                    />
                    <View
                      style={{
                        backgroundColor: Colors.white,
                        height: normalize(3),
                        width: normalize(3),
                        borderRadius: normalize(3 / 2),
                        marginRight: normalize(7),
                      }}
                    />
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                        fontFamily: Fonts.Inter_Medium,
                      }}>
                      5 Mar
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: normalize(Dimensions.get('screen').width),
                  marginTop: normalize(12),
                  borderWidth: normalize(1),
                  borderColor: '#434540',
                }}
              />
              <View
                style={{
                  marginTop: normalize(12),
                  borderRadius: normalize(4),
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
                  marginTop: normalize(53),
                  marginBottom: normalize(12),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(14),
                    fontFamily: Fonts.Inter_Bold,
                  }}>
                  Counteroffer
                </Text>
                <View
                  style={{
                    marginTop: normalize(20),
                    borderRadius: normalize(6),
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={style.item}>Items</Text>
                    <Text style={style.item}>Rate</Text>
                    <Text style={style.item}>Total</Text>
                  </View>
                  <View
                    style={{
                      height: normalize(1),
                      width: normalize(Dimensions.get('window').width - 90),
                      backgroundColor: '#363833',
                      alignSelf: 'center',
                      marginTop: normalize(12),
                    }}></View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: normalize(12),
                      alignItems: 'center',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={Icons.images}
                        style={{height: normalize(17), width: normalize(17)}}
                      />
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(12),
                          marginRight: normalize(9),
                          marginLeft: normalize(7),
                          fontFamily: Fonts.Inter_Medium,
                        }}>
                        Images
                      </Text>
                      <View
                        style={{
                          borderRadius: normalize(18),
                          height: normalize(19),
                          paddingHorizontal: normalize(5),
                          backgroundColor: Colors.white,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: Colors.black,
                            fontSize: normalize(10),
                          }}>
                          04
                        </Text>
                      </View>
                    </View>

                    {/* <View
                    style={{
                      flexDirection: 'row',
                      borderWidth: normalize(2),
                      padding: normalize(4),
                      borderColor: '#2A2C27',
                      justifyContent: 'space-between',
                      borderRadius: normalize(4),
                      marginStart: normalize(-22),
                    }}>
                    <TouchableOpacity
                      onPress={() => {}}
                      style={{
                        justifyContent: 'center',
                        marginRight: normalize(9),
                      }}>
                      <Image
                        source={Icons.minus}
                        style={{
                          // width: normalize(12),
                          height: normalize(3),
                          backgroundColor: Colors.white,
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>

                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(12),
                      }}>
                      $21
                    </Text>
                    <TouchableOpacity
                      onPress={() => {}}
                      style={{
                        justifyContent: 'center',
                        marginLeft: normalize(9),
                      }}>
                      <Image
                        source={Icons.plus}
                        style={{
                          width: normalize(12),
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View> */}

                    <TextInputItem
                      heightInput={
                        Platform.OS == 'ios' ? normalize(33) : normalize(27)
                      }
                      widthInput={'29%'}
                      // value={short}
                      placeholder=""
                      // onChangeText={text => setShort(text)}
                      marginTop={normalize(0)}
                      placeholderTextColor={'#ABABAB'}
                      fontFamily={Fonts.Inter_Medium}
                      color={'#fff'}
                      maxLength={10}
                      borderRadius={7}
                      keyboardType={'number-pad'}
                      borderColor={Colors.borderColor}
                      borderWidth={normalize(1)}
                      backgroundColor={Colors.black}
                      inputHeight={normalize(52)}
                    />
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(14),
                        fontFamily: Fonts.Inter_Bold,
                      }}>
                      $21
                    </Text>
                  </View>

                  <View
                    style={{
                      height: normalize(1),
                      width: normalize(Dimensions.get('window').width - 90),
                      backgroundColor: '#363833',
                      alignSelf: 'center',
                      marginTop: normalize(12),
                    }}></View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: normalize(9),
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(12),
                      }}>
                      Total Price
                    </Text>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(12),
                        fontFamily: Fonts.Inter_Bold,
                      }}>
                      $154
                    </Text>
                  </View>
                </View>
              </View>
            </>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View
        style={{
          flexDirection: 'row',
          // width:normalize(Dimensions.get('window').width-140),
          justifyContent: 'space-between',
        }}>
        <Button
          width={normalize(100)}
          height={normalize(40)}
          backgroundColor={'#000000'}
          title={'Cancel'}
          textColor={Colors.white}
          titlesingle={true}
          borderRadius={normalize(25)}
          marginHorizontal={normalize(5)}
          btnBottom={0}
          onPress={() => {
            // props.navigation.navigate('Otp');
          }}
        />
        <ButtonLinear
          width={normalize(140)}
          height={normalize(40)}
          backgroundColor={Colors.btnColor}
          title={'Send'}
          alignSelf={'flex-end'}
          textColor={Colors.black}
          titlesingle={true}
          borderRadius={normalize(25)}
          marginHorizontal={normalize(5)}
          btnBottom={0}
          onPress={() => {
            // props.navigation.navigate('Otp');
          }}
        />
      </View>
      {/* </View> */}
      {/* </SafeAreaView> */}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
    paddingHorizontal: normalize(10),
    // height:Dimensions.get('screen').height,
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
    fontFamily: Fonts.Inter_Regular,
  },
  imageLeft: {
    height: normalize(18),
    width: normalize(17),
  },
  item: {
    color: Colors.white,
    fontSize: normalize(12),
    fontFamily: Fonts.Inter_Medium,
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

export default Counteroffer;
