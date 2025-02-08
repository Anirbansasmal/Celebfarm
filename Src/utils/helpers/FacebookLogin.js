import React from 'react';
import {Platform} from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
  Settings,
} from 'react-native-fbsdk-next';
import constents from '../../utils/helpers/constant';
export default function onFacebookLogin() {
  return new Promise((resolve, reject) => {
    LoginManager.logOut();
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }
    LoginManager.logInWithPermissions([
      'public_profile',
      'instagram_basic',
      'pages_show_list',
      'instagram_manage_insights',
      'pages_read_engagement',
      'business_management',
      'pages_read_user_content',
    ])
      .then(result => {
        if (result.isCancelled) {
          reject(result);
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            let accessToken = data.accessToken;
            // console.log(accessToken);
            constents.FBTOKEN = data.accessToken;
            const responseInfoCallback = (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            };

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name,picture',
                  },
                },
              },
              responseInfoCallback,
            );

            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}
