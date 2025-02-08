import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {
  appleAuth,
  AppleButton,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import PropTypes from 'prop-types';
import {v4 as uuid} from 'uuid';
import {Platform} from 'react-native';

export default function AppleLogin(props) {
  const onDone = appleData => {
    if (props.OnDone) {
      var appleSignUpObject = {};

      props.OnDone(appleData, 'apple');
    }
  };

  async function onAppleButtonPress() {
    console.warn('Beginning Apple Authentication');

    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      console.log('appleAuthRequestResponse', appleAuthRequestResponse);

      const {user, email, nonce, identityToken, realUserStatus /* etc */} =
        appleAuthRequestResponse;

      if (identityToken) {
        console.log(nonce, identityToken);
        onDone(appleAuthRequestResponse);
      } else {
        console.log('no token - failed sign-in?');
      }

      if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
        console.log("I'm a real person!");
      }

      console.warn(`Apple Authentication Completed, ${user}, ${email}`);
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.warn('User canceled Apple Sign in.');
      } else {
        console.error(error);
      }
    }
  }

  async function androidAppleLogin() {
    try {
      const rawNonce = uuid();
      const state = uuid();

      
      appleAuthAndroid.configure({
        
        clientId: 'com.webskitters.I4thePlanetAndroidAppleLogin',

       
        redirectUri: 'https://gentleways.dedicateddevelopers.us/',

        
        scope: appleAuthAndroid.Scope.ALL,

        
        responseType: appleAuthAndroid.ResponseType.ALL,

       
        nonce: rawNonce,

  
        state,
      });

      const response = await appleAuthAndroid.signIn();
      if (response) {
        console.log(response, 'android');
        props.OnDone(response, 'appleAndroid');
      }
    } catch (error) {
      if (error && error.message) {
        switch (error.message) {
          case appleAuthAndroid.Error.NOT_CONFIGURED:
            console.log('appleAuthAndroid not configured yet.');
            break;
          case appleAuthAndroid.Error.SIGNIN_FAILED:
            console.log('Apple signin failed.');
            break;
          case appleAuthAndroid.Error.SIGNIN_CANCELLED:
            console.log('User cancelled Apple signin.');
            break;
          default:
            break;
        }
      }
    }
  }

  return Platform.OS === 'ios' ? (
    <AppleButton
      style={{
        height: props.height,
        width: props.width,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        alignSelf: 'center',
      }}
      cornerRadius={props.borderRadius}
      buttonStyle={AppleButton.Style.BLACK}
      buttonType={AppleButton.Type.SIGN_IN}
      onPress={() => {
        onAppleButtonPress();
      }}
    />
  ) : null;
  
}

AppleLogin.propTypes = {
  marginBottom: PropTypes.number,
  marginTop: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.any,
  OnDone: PropTypes.func,
  borderRadius: PropTypes.number,
};

AppleLogin.defaultProps = {
  marginBottom: 0,
  marginTop: 0,
  height: 0,
  width: '80%',
  OnDone: null,
  borderRadius: 0,
};
