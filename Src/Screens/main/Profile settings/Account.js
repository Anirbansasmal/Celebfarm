import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import Button from '../../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../themes/icons';
import {ScrollView} from 'react-native-gesture-handler';
import connectionrequest from '../../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAccRequest} from '../../../redux/reducers/AuthReducer';
import HeaderCommon from '../../../Components/HeaderCommon';
import {
  getUserRequest,
  otpSendEditEmailRequest,
} from '../../../redux/reducers/UserReducer';
import Modal from 'react-native-modal';
import TextInputItem from '../../../Components/TextInputItem';
import ButtonLinear from '../../../Components/Button Linear';
import moment from 'moment';
import { addEventListener } from '@react-native-community/netinfo';

function Account(props) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);
  const [selectedEdit, setSelectedEdit] = useState(false);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const Usereducer = useSelector(state => state.UserReducer);
  const [email, setEmail] = useState('');
  let status = '';
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  async function deleteAccount() {
    try {
      var obj = `CreatorID=${AuthReducer?.creatorID}`;
      connectionrequest()
        .then(() => {
          dispatch(deleteAccRequest(obj));
        })
        .then(() => {});
    } catch (e) {}
  }

  useEffect(() => {
    const subscribe= props.navigation.addListener('focus', payload => {
    account();
    });
    return()=>{
       subscribe();
    }
  }, []);

  async function account() {
    try {
      var obj = `CreatorID=${AuthReducer?.creatorID}`;
      connectionrequest()
        .then(() => {
          dispatch(getUserRequest(obj));
        })
        .then(() => {});
    } catch (e) {}
  }
  function sendOtp() {
    try {
      if (email == '') {
        Toast('Please enter your email');
      } else {
        let obj = {
          Email: email,
          creatorID: AuthReducer?.creatorID,
        };
        connectionrequest()
          .then(() => {
            console.log('signup', obj);
            dispatch(otpSendEditEmailRequest(obj));
          })
          .catch(err => {
            console.log(err);
            Toast('Please connect to internet');
          });
      }
    } catch (e) {
      console.log(e);
    }
  }

  if (status == '' || Usereducer.status != status) {
    switch (Usereducer.status) {
      case 'userProfile/otpSendEditEmailRequest':
        status = Usereducer.status;
        break;

      case 'userProfile/otpSendEditEmailSuccess':
        status = Usereducer.status;
        console.log('hgfgcvcb');
        props.navigation.navigate('OtpEmailVerifyEdit', {email: email}); //Location
        break;
      case 'userProfile/otpSendEditEmailFailure':
        status = Usereducer.status;
        break;
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
      <HeaderCommon
        picTitle={true}
        home={true}
        back={true}
        isback={true}
        backgroundColor={'#000'}
        title={'Account'}
        heardetext={Colors.white}
        headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(51)}
        textfontSize={normalize(16)}
        fontFamily={Fonts.Inter_Bold}
        // marginStart={normalize(33)}
        backScreen={() => props.navigation.goBack()}
        notifiPress={() => props.navigation.navigate('Notifications')}
        profilePress={() => props.navigation.navigate('Profile')}
        textColor={'#ffff'}
        {...props}
      />

      {/* <SafeAreaView style={style.container}> */}
      <View style={style.container}>
        <ScrollView>
          <>
            <View
              style={{
                marginTop: normalize(0),
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
                  }}></View>
              </View>
            </View>

            <View
              style={{
                padding: normalize(6),
                marginTop: normalize(0),
                justifyContent: 'space-between',
                borderRadius: normalize(6),
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(12),
                  fontFamily: Fonts.Inter_Bold,
                }}>
                Login method
              </Text>
              <View
                style={{
                  borderWidth: normalize(1),
                  borderColor: '#2A2C27',
                  padding: normalize(9),
                  marginTop: normalize(14),
                  borderRadius: normalize(6),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={Icons.call}
                  style={style.profileCollabr}
                  resizeMode="contain"
                />
                <View style={{marginStart: normalize(4)}}>
                  <Text
                    style={{
                      color: Colors.whitegrey,
                      fontSize: normalize(12),
                      marginLeft: normalize(3),
                      fontFamily: Fonts.Inter_Light,
                    }}>
                    Phone number
                  </Text>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(12),
                      marginLeft: normalize(3),
                      fontFamily: Fonts.Inter_Medium,
                    }}>
                    *** *** ***{' '}
                    {Usereducer?.userResponse?.phoneNumber?.split('')[7]}
                    {Usereducer?.userResponse?.phoneNumber?.split('')[8]}
                    {Usereducer?.userResponse?.phoneNumber?.split('')[9]}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                padding: normalize(6),
                marginTop: normalize(0),
                justifyContent: 'space-between',
                borderRadius: normalize(6),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(10),
                    marginStart: normalize(3),
                    fontFamily: Fonts.Inter_SemiBold,
                  }}>
                  Registered email
                </Text>
                <View
                  style={{
                    padding: normalize(5),
                    paddingHorizontal: normalize(12),
                    backgroundColor: '#06B8631A',
                    marginTop: normalize(10),
                    borderRadius: normalize(19),
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: normalize(5),
                  }}>
                  <Text
                    style={{
                      color: Colors.greenDark,
                    }}>
                    {'Verified'}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderWidth: normalize(1),
                  borderColor: '#2A2C27',
                  padding: normalize(6),
                  marginTop: normalize(12),
                  borderRadius: normalize(6),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={Icons.call}
                    style={style.profileCollabr}
                    resizeMode="contain"
                  />
                  <View>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(12),
                        marginLeft: normalize(3),
                        fontFamily: Fonts.Inter_Light,
                      }}>
                      Email Address
                    </Text>

                    {Usereducer?.userResponse?.email ? (
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(12),
                          marginLeft: normalize(3),
                          fontFamily: Fonts.Inter_Medium,
                        }}>
                        {Usereducer?.userResponse?.email}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(12),
                          marginLeft: normalize(3),
                          fontFamily: Fonts.Inter_Medium,
                        }}>
                        No Email added in your profile.
                      </Text>
                    )}
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedEdit(true);
                  }}>
                  <Image
                    source={Icons.edit}
                    style={{...style.profileCollabr, height: normalize(12), width: normalize(12)}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        </ScrollView>
        <View
          style={{
            padding: normalize(6),
            justifyContent: 'space-between',
            // position:'absolute',
            // bottom:0
          }}>
          <Text
            style={{
              color: Colors.white,
              fontSize: normalize(12),
              marginStart: normalize(3),
              fontFamily: Fonts.Inter_SemiBold,
            }}>
            Danger Zone
          </Text>
          <View
            style={{
              borderWidth: normalize(1),
              borderColor: '#2A2C27',
              padding: normalize(9),
              marginTop: normalize(10),
              borderRadius: normalize(6),
            }}>
            <Text
              style={{
                color: Colors.whitegrey,
                fontSize: normalize(9),
                marginLeft: normalize(3),
                fontFamily: Fonts.Inter_Regular,
              }}>
              All your type-forms and responses will be deleted forever. To keep
              type-forms and responses,
              {
                <Text
                  style={{
                    color: Colors.btnColor,
                    fontSize: normalize(9),
                    fontFamily: Fonts.Inter_Regular,
                  }}>
                  {' '}
                  cancel your subscription
                </Text>
              }{' '}
              instead of deleting your account.
            </Text>

            <Button
              width={normalize(Dimensions.get('screen').width - 290)}
              height={normalize(25)}
              alignSelf={'flex-end'}
              fontSize={normalize(12)}
              backgroundColor={'#B20301'}
              title={'Delete account'}
              textColor={Colors.white}
              fontFamily={Fonts.Inter_SemiBold}
              titlesingle={true}
              borderRadius={normalize(25)}
              marginTop={normalize(10)}
              onPress={() => {
                setSelected(true);
              }}
            />
            <Text
              style={{
                color: Colors.whitegrey,
                fontSize: normalize(10),
                marginLeft: normalize(3),
                marginTop: normalize(9),
                alignSelf: 'flex-end',
                fontFamily: Fonts.Inter_Regular,
              }}>
              Account created on{' '}
              {moment(Usereducer?.userResponse?.createdDate).format(
                'DD/MM/YYYY',
              )}
            </Text>
          </View>
        </View>
      </View>
      {/* </SafeAreaView> */}

      <Modal
        isVisible={selected}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        style={{width: '100%', height: '100%', alignSelf: 'center', margin: 0}}
        animationInTiming={800}
        animationOutTiming={1000}
        backdropColor={'#000000'}
        onBackdropPress={() => setSelected(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.bcolor,
            borderRadius: normalize(7),
            // borderTopRightRadius: normalize(17),
            margin: normalize(12),
            maxHeight: normalize(120),
            paddingLeft: normalize(10),
            paddingBottom: normalize(10),
            paddingTop: normalize(19),
            height: normalize(100),
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts.Inter_Bold,
              fontSize: normalize(14),
              color: Colors.white,
              textAlign: 'center',
            }}>
            Are you sure to delete your account?
          </Text>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: normalize(12),
              alignSelf: 'center',
              width: '90%',
            }}>
            <Button
              width={normalize(Dimensions.get('screen').width - 310)}
              height={normalize(42)}
              alignSelf={'flex-end'}
              fontSize={normalize(12)}
              backgroundColor={'#B20301'}
              title={'Yes'}
              textColor={Colors.white}
              fontFamily={Fonts.Inter_SemiBold}
              titlesingle={true}
              borderRadius={normalize(10)}
              marginTop={normalize(10)}
              onPress={() => {
                // setSelected();
                deleteAccount();
              }}
            />
            <Button
              width={normalize(Dimensions.get('screen').width - 320)}
              height={normalize(42)}
              alignSelf={'flex-end'}
              fontSize={normalize(12)}
              backgroundColor={Colors.green}
              title={'No'}
              textColor={Colors.white}
              fontFamily={Fonts.Inter_SemiBold}
              titlesingle={true}
              borderRadius={normalize(10)}
              marginTop={normalize(10)}
              onPress={() => {
                setSelected(false);
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={selectedEdit}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        style={{width: '100%', alignSelf: 'center', margin: 0}}
        animationInTiming={800}
        animationOutTiming={1000}
        backdropColor={'#000000'}
        onBackdropPress={() => setSelectedEdit(false)}>
        <>
          <View style={style.containerMonth}>
            <View
              style={{
                alignItems: 'flex-start',
                marginTop: normalize(7),
                width: '100%',
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: Fonts.Inter_Bold,
                    fontSize: normalize(16),
                  }}>
                  Edit Email
                </Text>
                <TouchableOpacity onPress={() => setSelectedEdit(false)}>
                  <Image
                    source={Icons.closefilter}
                    style={{
                      height: normalize(19),
                      width: normalize(19),
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: normalize(1),
                  marginTop: normalize(12),
                  width: '100%',
                  backgroundColor: Colors.grey,
                }}></View>
            </View>
            <Text
              style={{
                fontFamily: Fonts.Inter_Regular,
                fontSize: normalize(14),
                color: Colors.white,
                marginTop: normalize(10),
              }}>
              Email Address
            </Text>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: normalize(7),
                alignSelf: 'center',
                width: '90%',
              }}></View>

            <TextInputItem
              heightInput={Platform.OS == 'ios' ? normalize(42) : normalize(40)}
              widthInput={'95%'}
              value={email}
              placeholder=""
              onChangeText={text => setEmail(text)}
              marginTop={normalize(10)}
              placeholderTextColor={'#ABABAB'}
              fontFamily={Fonts.Inter_Medium}
              color={'#fff'}
              borderRadius={normalize(6)}
              borderColor={'#434540'}
              borderWidth={normalize(1)}
              backgroundColor={Colors.bcolor}
              imgrightheight={normalize(21)}
              imgrightwidth={normalize(21)}
              inputHeight={normalize(52)}
            />

            <ButtonLinear
              width={'100%'}
              height={normalize(25)}
              alignSelf={'center'}
              backgroundColor={Colors.btnColor}
              title={'Save changes'}
              textColor={Colors.black}
              titlesingle={true}
              marginTop={normalize(25)}
              borderRadius={normalize(25)}
              marginHorizontal={normalize(5)}
              btnBottom={0}
              onPress={() => {
                setSelectedEdit(false);
                sendOtp();
              }}
            />
          </View>
        </>
      </Modal>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
    paddingHorizontal: normalize(6),
    height: Dimensions.get('screen').height,
  },
  containerMonth: {
    flex: 1,
    backgroundColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: normalize(250),
    backgroundColor: '#181818',
    borderTopLeftRadius: normalize(17),
    borderTopRightRadius: normalize(17),
    paddingLeft: normalize(14),
    paddingRight: normalize(14),
    paddingBottom: normalize(15),
    paddingTop: normalize(19),
    height: normalize(250),
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
    fontFamily: Fonts.Inter_SemiBold,
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
    height: normalize(24),
    width: normalize(24),
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

export default Account;
