import React, {useEffect} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import TextInputItem from '../../../Components/TextInputItem';
import ButtonLinear from '../../../Components/Button Linear';
import Picker from '../../../Components/Picker';
import Loader from '../../../utils/helpers/Loader';
import HeaderCommon from '../../../Components/HeaderCommon';
import Icons from '../../../themes/icons';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../../utils/helpers/NetInfo';
import {
  getBankRequest,
  getGstRequest,
  getPanRequest,
} from '../../../redux/reducers/ProfileReducer';
var status = '';
function Payment(props) {
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);

  useEffect(() => {
    getPan();
    getBank();
    getGst();
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

  async function getBank() {
    try {
      connectionrequest()
        .then(() => {
          var obj = 'creatorID=' + AuthReducer?.creatorID;
          dispatch(getBankRequest(obj));
        })
        .catch(e => {
          console.log(e);
        });
    } catch (error) {}
  }

  async function getGst() {
    try {
      connectionrequest()
        .then(() => {
          var obj = 'creatorID=' + AuthReducer?.creatorID;
          dispatch(getGstRequest(obj));
        })
        .catch(e => {
          console.log(e);
        });
    } catch (error) {}
  }

  return (
    <>
      <Loader visible={'Profile/getPanVerifyRequest' == status} />
      <SafeAreaView style={style.container}>
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
          <View style={style.containerBody}>
            <ScrollView style={{flex: 1}}>
              <>
                <View
                  style={{
                    marginTop: normalize(12),
                    borderRadius: normalize(7),
                  }}>
                  <View
                    style={{
                      marginTop: normalize(6),
                    }}>
                    {ProfileReducer?.getPanResponse?.isVerified == null? (
                      <>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: normalize(16),
                            marginStart: normalize(3),
                            fontFamily: Fonts.Inter_Bold,
                            marginTop: normalize(6),
                          }}>
                          PAN Details
                        </Text>
                        <TouchableOpacity
                          style={style.btn}
                          onPress={() =>
                            props?.navigation.navigate('PaymentAddPan')
                          }>
                          <Text
                            style={{
                              color: Colors.white,
                              fontSize: normalize(10),
                              marginStart: normalize(3),
                              fontFamily: Fonts.Inter_Medium,
                            }}>
                            + Add PAN Details
                          </Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
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
                            marginTop: normalize(12),
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
                          color={Colors.white}
                          borderRadius={7}
                          borderColor={'#434540'}
                          borderWidth={1}
                          backgroundColor={Colors.black}
                          inputHeight={normalize(52)}
                        />
                      </>
                    )}
                    {!ProfileReducer?.savedbankResponse?.isVerify ? (
                      <>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: normalize(16),
                            marginStart: normalize(3),
                            fontFamily: Fonts.Inter_Bold,
                            marginTop: normalize(18),
                          }}>
                          Bank Details
                        </Text>
                        <TouchableOpacity
                          style={style.btn}
                          onPress={() =>
                            props?.navigation?.navigate('PaymentBankDetails')
                          }>
                          <Text
                            style={{
                              color: Colors.white,
                              fontSize: normalize(10),
                              marginStart: normalize(3),
                              fontFamily: Fonts.Inter_Medium,
                            }}>
                            + Add Bank Details
                          </Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
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
                            {ProfileReducer?.getPanResponse?.isVerified ==
                            true ? (
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
                              onPress={() =>
                                props?.navigation?.navigate(
                                  'PaymentBankDetails',
                                )
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
                            marginTop: normalize(12),
                          }}>
                          Account number
                        </Text>

                        <TextInputItem
                          heightInput={
                            Platform.OS == 'ios' ? normalize(42) : normalize(40)
                          }
                          widthInput={'100%'}
                          value={
                            ProfileReducer?.savedbankResponse?.accountNumber
                          }
                          marginTop={normalize(10)}
                          placeholderTextColor={'#ABABAB'}
                          color={Colors.white}
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
                          value={ProfileReducer?.savedbankResponse?.ifscCode}
                          marginTop={normalize(10)}
                          placeholderTextColor={'#ABABAB'}
                          editable={false}
                          color={Colors.white}
                          borderRadius={7}
                          borderColor={'#434540'}
                          borderWidth={1}
                          backgroundColor={Colors.black}
                          inputHeight={normalize(52)}
                        />
                      </>
                    )}
                    {ProfileReducer?.gstResponse?.kycidNumber==null||ProfileReducer?.gstResponse?.kycidNumber=="" ? (
                      <>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: normalize(16),
                            marginStart: normalize(3),
                            fontFamily: Fonts.Inter_Bold,
                            marginTop: normalize(18),
                          }}>
                          GST Details
                        </Text>
                        <TouchableOpacity
                          style={style.btn}
                          onPress={() => {
                            props?.navigation?.navigate('GstAdd');
                          }}>
                          <Text
                            style={{
                              color: Colors.white,
                              fontSize: normalize(10),
                              marginStart: normalize(3),
                              fontFamily: Fonts.Inter_Medium,
                            }}>
                            + Add GST Details
                          </Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
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
                              onPress={() =>
                                props?.navigation?.navigate('GstAdd')
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

                        <TextInputItem
                          heightInput={
                            Platform.OS == 'ios' ? normalize(42) : normalize(40)
                          }
                          widthInput={'100%'}
                          value={ProfileReducer?.gstResponse?.kycidNumber}
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
                      </>
                    )}
                  </View>
                </View>
              </>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        {/* <ButtonLinear
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
          onPress={() => {
            props?.navigation?.navigate('PaymentEdit');
          }}
        /> */}
      </SafeAreaView>
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
    flex: 1,
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
    height: normalize(35),
    width: '100%',
    borderWidth: normalize(1),
    borderColor: Colors.bcolor,
    marginTop: normalize(10),
    borderRadius: normalize(3),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  drop: {
    height: normalize(52),
    width: normalize(82),
    padding: normalize(12),
    borderRadius: normalize(6),
    borderWidth: normalize(1),
    borderColor: '#434540',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropDownItem: {
    paddingVertical: normalize(12),
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: normalize(1),
    color: Colors.white,
  },
  dropDownItemText: {
    fontSize: normalize(14),
    lineHeight: normalize(14),
    fontFamily: Fonts.montserrat_reg,
  },
  text4: {
    color: Colors.white,
    fontSize: normalize(10),
    fontFamily: Fonts.Inter_Medium,
  },
  drop: {
    height: normalize(52),
    width: normalize(82),
    padding: normalize(12),
    borderRadius: normalize(6),
    borderWidth: normalize(1),
    borderColor: Colors.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Payment;
