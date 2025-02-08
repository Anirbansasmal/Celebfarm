import React, {useEffect, useState} from 'react';
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
import {Colors, Fonts} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../themes/icons';
import {ScrollView} from 'react-native-gesture-handler';
import TextInputItem from '../../../Components/TextInputItem';
import CheckBox from '../../../Components/CheckBox';
import ButtonLinear from '../../../Components/Button Linear';
import {useDispatch, useSelector} from 'react-redux';
import {getPanRequest} from '../../../redux/reducers/ProfileReducer';
import connectionrequest from '../../../utils/helpers/NetInfo';
import HeaderCommon from '../../../Components/HeaderCommon';

function PaymentEdit(props) {
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);

  useEffect(() => {
    getPan();
  }, []);

  async function getPan() {
    try {
      connectionrequest()
        .then(() => {
          var obj = 'creatorID=' + AuthReducer?.creatorID;
          dispatch(getPanRequest(obj));
        })
        .catch(e => {
          console.log(e);
        });
    } catch (error) {}
  }

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <HeaderCommon
            picTitle={true}
            home={true}
            back={true}
            backgroundColor={'#000'}
            title={'Payments'}
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
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(16),
                        marginStart: normalize(3),
                      }}>
                      PAN Details
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      {ProfileReducer?.getPanResponse?.isVerified ? (
                        <View
                          style={{
                            alignItems: 'center',
                            paddingHorizontal: normalize(9),
                            paddingVertical: normalize(4),
                            backgroundColor: '#2D353B',
                            borderRadius: normalize(19),
                          }}>
                          <Text
                            style={[
                              {
                                ...style.text4,
                                color: '#06B863',
                                fontSize: normalize(14),
                                opacity: 1,
                                marginStart: normalize(0),
                              },
                            ]}>
                            Verified
                          </Text>
                        </View>
                      ) : null}

                      <TouchableOpacity
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginStart: normalize(12),
                        }}
                        onPress={() =>
                          props?.navigation?.navigate('PaymentAddPan')
                        }>
                        <Image
                          source={Icons.edit}
                          style={[
                            {
                              height: normalize(12),
                              width: normalize(12),
                            },
                          ]}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text
                    style={{
                      color: '#CECECE',
                      fontSize: normalize(12),
                      marginLeft: normalize(3),
                      marginTop: normalize(22),
                    }}>
                    PAN number
                  </Text>

                  <TextInputItem
                    heightInput={
                      Platform.OS == 'ios' ? normalize(42) : normalize(40)
                    }
                    widthInput={'100%'}
                    value={ProfileReducer?.getPanResponse?.kycidNumber}
                    marginTop={normalize(10)}
                    placeholderTextColor={'#ABABAB'}
                    editable={false}
                    color={'#000'}
                    borderRadius={7}
                    borderColor={'#434540'}
                    borderWidth={1}
                    backgroundColor={Colors.black}
                    inputHeight={normalize(52)}
                  />

                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: normalize(12),
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(16),
                        marginStart: normalize(3),
                      }}>
                      Bank Details
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      {ProfileReducer?.getPanResponse?.isVerified == true ? (
                        <View
                          style={{
                            alignItems: 'center',
                            paddingHorizontal: normalize(9),
                            paddingVertical: normalize(4),
                            backgroundColor: '#2D353B',
                            borderRadius: normalize(19),
                          }}>
                          <Text
                            style={[
                              {
                                ...style.text4,
                                color: '#06B863',
                                fontSize: normalize(14),
                                opacity: 1,
                                marginStart: normalize(0),
                              },
                            ]}>
                            Active
                          </Text>
                        </View>
                      ) : null}

                      <TouchableOpacity
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginStart: normalize(12),
                        }}
                        onPress={()=>props?.navigation?.navigate('PaymentBankDetails')}>
                        <Image
                          source={Icons.edit}
                          style={[
                            {
                              height: normalize(12),
                              width: normalize(12),
                            },
                          ]}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text
                    style={{
                      color: '#CECECE',
                      fontSize: normalize(12),
                      marginLeft: normalize(3),
                      marginTop: normalize(12),
                    }}>
                    Account number
                  </Text>

                  <TextInputItem
                    heightInput={
                      Platform.OS == 'ios' ? normalize(42) : normalize(40)
                    }
                    widthInput={'100%'}
                    // value={ProfileReducer?.getPanResponse?.kycidNumber}
                    onChangeText={text => setMobile(text)}
                    marginTop={normalize(10)}
                    placeholderTextColor={'#ABABAB'}
                    color={'#000'}
                    editable={false}
                    borderRadius={7}
                    borderColor={'#434540'}
                    borderWidth={1}
                    backgroundColor={Colors.black}
                    inputHeight={normalize(52)}
                  />

                  <Text
                    style={{
                      color: '#CECECE',
                      fontSize: normalize(12),
                      marginLeft: normalize(3),
                      marginTop: normalize(22),
                    }}>
                    IFSC code
                  </Text>

                  <TextInputItem
                    heightInput={
                      Platform.OS == 'ios' ? normalize(42) : normalize(40)
                    }
                    widthInput={'100%'}
                    // value={mobile}
                    marginTop={normalize(10)}
                    placeholderTextColor={'#ABABAB'}
                    editable={false}
                    color={'#000'}
                    borderRadius={7}
                    borderColor={'#434540'}
                    borderWidth={1}
                    backgroundColor={Colors.black}
                    inputHeight={normalize(52)}
                  />

                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: normalize(12),
                    }}>
                    <Text
                      style={{
                        color: '#CECECE',
                        fontSize: normalize(16),
                        marginLeft: normalize(3),
                      }}>
                      GST Details
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginStart: normalize(12),
                        }}
                        onPress={()=>props?.navigation?.navigate('GstAdd')}>
                        <Image
                          source={Icons.edit}
                          style={[
                            {
                              height: normalize(12),
                              width: normalize(12),
                            },
                          ]}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TextInputItem
                    heightInput={
                      Platform.OS == 'ios' ? normalize(42) : normalize(40)
                    }
                    widthInput={'100%'}
                    // value={mobile}
                    marginTop={normalize(10)}
                    placeholderTextColor={'#ABABAB'}
                    color={'#000'}
                    editable={false}
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
        </KeyboardAvoidingView>
        <ButtonLinear
          width={'90%'}
          height={normalize(40)}
          alignSelf={'center'}
          backgroundColor={Colors.btnColor}
          title={'Save Changes'}
          textColor={Colors.black}
          titlesingle={true}
          borderRadius={normalize(25)}
          marginHorizontal={normalize(5)}
          btnBottom={10}
          onPress={() => {}}
        />
      </SafeAreaView>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    // flex: 1,
    paddingHorizontal: normalize(10),
    height: Dimensions.get('screen').height,
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

export default PaymentEdit;
