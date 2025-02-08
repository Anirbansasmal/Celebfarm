import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../themes/Themes';
import normalize from '../../utils/helpers/dimen';
import Toast from '../../utils/helpers/Toast';
import Button from '../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextInputItem from '../../Components/TextInputItem';
import Header from '../../Components/Header';
import ButtonLinear from '../../Components/Button Linear';
import {useDispatch, useSelector} from 'react-redux';
import {
  signuplocalRequest,
  signUpRequest,
} from '../../redux/reducers/AuthReducer';

function SignupName(props) {
  const [name, setName] = useState('');
  let status = '';
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  function nextStep() {
    if (name == '') {
      Toast('Please enter your name');
    } else {
      var obj = {
        name: name,
        email: '',
        Age: '',
      };
      dispatch(signuplocalRequest(obj));
      props.navigation.navigate('SignupAge');
    }
  }
  
  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/signupLocalRequest':
        status = AuthReducer.status;
        break;

      case 'Auth/signupLocalSuccess':
        status = AuthReducer.status;
        console.log('44', AuthReducer?.signupLocalResponse?.name);
        // setName(AuthReducer?.signupLocalResponse?.name);
        break;
      case 'Auth/signupLocalFailure':
        status = AuthReducer.status;
        break;
    }
  }

  return (
    <SafeAreaView style={style.container}>
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
            <Text style={style.text}>What’s your name?</Text>
            <Text style={style.text2}>Enter your full legal name</Text>
            <Text style={style.text3}>Full Name</Text>
            <TextInputItem
              heightInput={Platform.OS == 'ios' ? normalize(42) : normalize(40)}
              value={name}
              placeholder=""
              onChangeText={text => setName(text)}
              marginTop={normalize(10)}
              placeholderTextColor={'#ABABAB'}
              fontFamily={Fonts.Inter_Medium}
              color={'#fff'}
              borderRadius={7}
              autoCapitalize={'words'}
              borderColor={'#434540'}
              borderWidth={normalize(1)}
              inputHeight={normalize(52)}
              backgroundColor={Colors.black}
            />
            <View
              style={{
                position: 'absolute',
                bottom: normalize(10),
              }}></View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <ButtonLinear
        width={'91%'}
        height={normalize(40)}
        alignSelf={'center'}
        backgroundColor={Colors.btnColor}
        title={'Next'}
        textColor={Colors.black}
        titlesingle={true}
        borderRadius={normalize(25)}
        marginHorizontal={normalize(5)}
        fontFamily={Fonts.Inter_SemiBold}
        btnBottom={0}
        onPress={() => {
          nextStep();
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
    paddingHorizontal: normalize(14),
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
    fontSize: normalize(12),
    marginTop: normalize(7),
    opacity: 0.7,
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Medium,
  },
  text3: {
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: normalize(22),
    opacity: 0.7,
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Medium,
  },
});
export default SignupName;
