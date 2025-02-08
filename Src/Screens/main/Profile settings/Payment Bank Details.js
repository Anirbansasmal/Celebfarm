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
import connectionrequest from '../../../utils/helpers/NetInfo';
import {
  getBankRequest,
  getBankVerifyRequest,
} from '../../../redux/reducers/ProfileReducer';
import Loader from '../../../utils/helpers/Loader';
import HeaderCommon from '../../../Components/HeaderCommon';
import showErrorAlert from '../../../utils/helpers/Toast';
var status = '';
function PaymentBankDetails(props) {
  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  const [reaccount, setReaccount] = useState('');
  const [ifsc, setIfsc] = useState('');

  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);

  useEffect(() => {
    getBank();
  }, []);
  async function bankVerify() {
    try {
      if (name == '' || name == undefined) {
        showErrorAlert('Please Enter Name');
      } else if (account == '' || account == undefined) {
        showErrorAlert('Please Enter Account Number');
      } else if (reaccount == '' || reaccount == undefined) {
        showErrorAlert('Please Enter Re-enter Account Number');
      } else if (ifsc == '' || ifsc == undefined) {
        showErrorAlert('Please Enter IFSC Code');
      } else if (account !== reaccount) {
        showErrorAlert(
          'Account Number and Re-enter Account Number Should be Same',
        );
      } else {
        connectionrequest()
          .then(() => {
            var obj = {
              BeneficiaryName: name,
              AccountNumber: account,
              IFSCCode: ifsc,
            };
            dispatch(getBankVerifyRequest(obj));
          })
          .catch(e => {});
      }
    } catch (e) {}
  }

  async function getBank() {
    try {
      connectionrequest()
        .then(() => {
          var obj = '?creatorID=' + AuthReducer?.creatorID;
          dispatch(getBankRequest(obj));
        })
        .catch(e => {
          console.log(e);
        });
    } catch (error) {}
  }

  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/getBankVerifyRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>> ');
        break;

      case 'Profile/getBankVerifySuccess':
        status = ProfileReducer.status;
        console.log('bank verification successful');
        props?.navigation?.goBack();
        break;
      case 'Profile/getBankVerifyFailure':
        status = ProfileReducer.status;
        break;

      case 'Profile/getBankRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>> ');
        break;

      case 'Profile/getBankSuccess':
        status = ProfileReducer.status;
        console.log(
          'bank verification successful',
          ProfileReducer?.savedBankResponse?.beneficiaryName,
        );
        setName(ProfileReducer?.savedbankResponse?.beneficiaryName);
        setAccount(ProfileReducer?.savedbankResponse?.accountNumber);
        setReaccount(ProfileReducer?.savedbankResponse?.accountNumber);
        setIfsc(ProfileReducer?.savedbankResponse?.ifscCode);

        break;
      case 'Profile/getBankFailure':
        status = ProfileReducer.status;
        break;
    }
  }

  function rendomId(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <>
      {/* <Loader visible={'Profile/getBankVerifyRequest' == status} /> */}
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

          {/* <SafeAreaView style={style.container}> */}
          {/* <View style={style.container}> */}
          <ScrollView style={style.container}>
            <>
              <View
                style={{
                  marginTop: normalize(12),
                  borderRadius: normalize(7),
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(16),
                      marginStart: normalize(3),
                    }}>
                    Bank Details
                  </Text>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(10),
                      marginStart: normalize(3),
                      marginTop: normalize(9),
                    }}>
                    Enter your bank account information.
                  </Text>
                </View>

                <Text
                  style={{
                    color: '#CECECE',
                    fontSize: normalize(12),
                    marginLeft: normalize(3),
                    marginTop: normalize(22),
                  }}>
                  Full name of the account holder
                </Text>

                <TextInputItem
                  heightInput={
                    Platform.OS == 'ios' ? normalize(42) : normalize(40)
                  }
                  widthInput={'100%'}
                  value={name}
                  placeholder="Enter your name"
                  onChangeText={text => setName(text)}
                  marginTop={normalize(10)}
                  placeholderTextColor={'#ABABAB'}
                  fontFamily={Fonts.Inter_Medium}
                  color={'#ffff'}
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
                  Account number
                </Text>

                <TextInputItem
                  heightInput={
                    Platform.OS == 'ios' ? normalize(42) : normalize(40)
                  }
                  widthInput={'100%'}
                  value={account}
                  placeholder="Enter account number"
                  onChangeText={text => setAccount(text)}
                  marginTop={normalize(10)}
                  placeholderTextColor={'#ABABAB'}
                  fontFamily={Fonts.Inter_Regular}
                  color={'#ffff'}
                  borderRadius={7}
                  borderColor={'#434540'}
                  keyboardType={'number-pad'}
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
                  re-Account number
                </Text>

                <TextInputItem
                  heightInput={
                    Platform.OS == 'ios' ? normalize(42) : normalize(40)
                  }
                  widthInput={'100%'}
                  value={reaccount}
                  placeholder="Re enter account number"
                  onChangeText={text => setReaccount(text)}
                  marginTop={normalize(10)}
                  placeholderTextColor={'#ABABAB'}
                  keyboardType={'number-pad'}
                  fontFamily={Fonts.Inter_Regular}
                  color={'#fff'}
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
                  value={ifsc}
                  placeholder="Enter IFSC code"
                  marginTop={normalize(10)}
                  placeholderTextColor={'#ABABAB'}
                  fontFamily={Fonts.Inter_Regular}
                  onChangeText={value => setIfsc(value)}
                  color={'#ffff'}
                  borderRadius={7}
                  borderColor={'#434540'}
                  borderWidth={1}
                  textTransform={'uppercase'}
                  backgroundColor={Colors.black}
                  inputHeight={normalize(52)}
                />
                {/* <View
                  style={{
                    flexDirection: 'row',
                    marginTop: normalize(22),
                    alignItems: 'center',
                  }}>
                  <CheckBox
                    active={saveGst}
                    backgroundColor={'#0000'}
                    CheckBox={Icons.radio_uncheck}
                    borderWidth={1}
                    onChange={v => {
                      setSaveGst(!saveGst);
                      setSavePayment(false);
                    }}
                  />
                  <Text
                    style={{
                      color: '#CECECE',
                      fontSize: normalize(12),
                      marginLeft: normalize(9),
                    }}>
                    I have a GST number
                  </Text>
                </View>
                {saveGst ? (
                  <TextInputItem
                    heightInput={
                      Platform.OS == 'ios' ? normalize(42) : normalize(40)
                    }
                    widthInput={'100%'}
                    value={gst}
                    placeholder="GST0000"
                    onChangeText={text => {
                      setGst(text);
                    }}
                    marginTop={normalize(10)}
                    placeholderTextColor={'#ABABAB'}
                    fontFamily={Fonts.Inter_Regular}
                    onChange={value => setGst(value)}
                    color={'#ffff'}
                    borderRadius={7}
                    borderColor={'#434540'}
                    textTransform={'uppercase'}
                    borderWidth={1}
                    backgroundColor={Colors.black}
                    inputHeight={normalize(52)}
                  />
                ) : null}
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: normalize(22),
                    alignItems: 'center',
                  }}>
                  <CheckBox
                    active={savePayment}
                    backgroundColor={'#0000'}
                    CheckBox={Icons.radio_uncheck}
                    onChange={v => {
                      setSavePayment(!savePayment);
                      setSaveGst(false);
                      setGst('');
                    }}
                  />
                  <Text
                    style={{
                      color: '#CECECE',
                      fontSize: normalize(12),
                      marginLeft: normalize(9),
                    }}>
                    I don’t have a GST number
                  </Text>
                </View> */}
              </View>
            </>
          </ScrollView>
          {/* </View> */}
          {/* </SafeAreaView> */}
        </KeyboardAvoidingView>
        <ButtonLinear
          width={'90%'}
          height={normalize(40)}
          alignSelf={'center'}
          backgroundColor={Colors.btnColor}
          title={'Activate'}
          textColor={Colors.black}
          titlesingle={true}
          borderRadius={normalize(25)}
          marginHorizontal={normalize(5)}
          btnBottom={10}
          onPress={() => {
            bankVerify();
          }}
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
    // height: Dimensions.get('screen').height,
    marginBottom: normalize(12),
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

export default PaymentBankDetails;
