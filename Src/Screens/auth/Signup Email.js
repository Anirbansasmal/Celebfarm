import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../themes/Themes';
import normalize from '../../utils/helpers/dimen';
import Toast from '../../utils/helpers/Toast';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextInputItem from '../../Components/TextInputItem';
import Header from '../../Components/Header';
import ButtonLinear from '../../Components/Button Linear';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../utils/helpers/NetInfo';
import {
  otpSendEmailRequest,
  signUpRequest,
} from '../../redux/reducers/AuthReducer';
import Loader from '../../utils/helpers/Loader';

function SignupEmail(props) {
  const [email, setEmail] = useState('');
  let status = '';
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  async function sendOtp() {
    console.log('creatorID', AuthReducer?.otpVerifyResponse?.result?.userID);
    try {
      if (email == '') {
        Toast('Please enter your email');
      } else {
        let obj = {
          Email: email,
          creatorID: AuthReducer?.otpVerifyResponse?.result?.userID,
        };
        connectionrequest()
          .then(() => {
            console.log('signup', obj);
            dispatch(otpSendEmailRequest(obj));
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

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/otpSendEmailRequest':
        status = AuthReducer.status;
        break;

      case 'Auth/otpSendEmailSuccess':
        status = AuthReducer.status;
        console.log('hgfgcvcb');
        props.navigation.navigate('OtpEmailVerify', {email: email}); //Location
        break;
      case 'Auth/otpSendEmailFailure':
        status = AuthReducer.status;
        break;
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <Loader visible={AuthReducer?.status == 'Auth/otpSendEmailRequest'} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        // keyboardVerticalOffset={0.9}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Header
          picTitle={false}
          logo={false}
          back={true}
          backgroundColor={'#000'}
          title={'Sign up'}
          heardetext={Colors.white}
          headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(51)}
          textfontSize={normalize(16)}
          fontFamily={Fonts.Inter_Bold}
          marginStart={normalize(22)}
          textColor={'#ffff'}
          {...props}
        />
        <View
          style={{
            height: normalize(1),
            backgroundColor: '#434540',
          }}
        />
        <ScrollView style={{flex: 1}}>
          <View style={style.containerBody}>
            <Text style={style.text}>What's your email?</Text>
            <Text style={style.text2}>
              We’ll send you a code - it helps us keep your account secure.
            </Text>
            <Text style={style.text3}>Enter your email address.</Text>
            <TextInputItem
              heightInput={Platform.OS == 'ios' ? normalize(42) : normalize(40)}
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
              backgroundColor={Colors.black}
              imgrightheight={normalize(21)}
              imgrightwidth={normalize(21)}
              inputHeight={normalize(52)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <ButtonLinear
        width={'91%'}
        height={normalize(40)}
        alignSelf={'center'}
        backgroundColor={Colors.btnColor}
        title={'Verify'}
        textColor={Colors.black}
        fontFamily={Fonts.Inter_Bold}
        titlesingle={true}
        borderRadius={normalize(25)}
        marginHorizontal={normalize(5)}
        btnBottom={0}
        onPress={() => {
          //GetStarted
          sendOtp();
        }}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  containerBody: {
    paddingHorizontal: normalize(12),
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: normalize(21),
    marginTop: normalize(12),
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Bold,
  },
  text2: {
    color: Colors.white,
    fontSize: normalize(11),
    marginTop: normalize(7),
    opacity: 0.7,
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Medium,
  },
  text3: {
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: normalize(27),
    opacity: 0.7,
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Medium,
  },
});

export default SignupEmail;
