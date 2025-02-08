import AsyncStorage from '@react-native-async-storage/async-storage';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import Constant from '../../utils/helpers/constant';
import {
  signUpFailure,
  signUpSuccess,
  getTokenSuccess,
  getTokenFailure,
  SignInFailure,
  forgotpasswordSuccess,
  forgotpasswordFailure,
  logoutSuccess,
  logoutFailure,
  otpSendSuccess,
  otpSendFailure,
  privacySuccess,
  privacyFaliure,
  resendOtpSuccess,
  changePasswordFaliure,
  resendOtpFaliures,
  changePasswordSuccess,
  deleteAccSuccess,
  deleteAccFailure,
  subcrIAPSuccess,
  subcrIAPFailure,
  subcrIAPDateSuccess,
  subcrIAPDateFailure,
  otpVerifySuccess,
  getLaunageSuccess,
  getLaunageFailure,
  getNicheSuccess,
  getNicheFailure,
  profileSuccess,
  profileFailure,
  setTokenSuccess,
  locationSuccess,
  locationFailure,
  stateSuccess,
  stateFailure,
  deviceTokenSuccess,
  deviceTokenFaliure,
  otpSendEmailSuccess,
  otpSendEmailFailure,
  otpVerifyEmailSuccess,
  otpVerifyEmailFailure,
  citiesSuccess,
  citiesFailure,
} from '../../redux/reducers/AuthReducer';
import {deleteApi, getApi, postApi} from '../../utils/helpers/ApiRequest';
import Toast from '../../utils/helpers/Toast';
import constant from '../../utils/helpers/constant';

let getItem = state => state.AuthReducer;
export function* get_tokensaga() {
  try {
    const response = yield call(AsyncStorage.getItem, Constant.TOKENCRED);
    console.log(response);
    if (response != null) {
      yield put(getTokenSuccess(JSON.parse(response)));
    } else {
      yield put(getTokenSuccess(null));
    }
  } catch (error) {
    yield put(getTokenFailure(error));
  }
}
export function* signUpSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(postApi, 'SignUp', action.payload, header);
    console.log('Register', response.data);

    if (response.data.success == 1) {
      yield call(
        AsyncStorage.setItem,
        constant.TOKENCRED,
        JSON.stringify({
          accessToken: response.data.result?.accessToken,
          signup: response.data.result?.isSignedUp,
          profile: response.data.result?.isProfileSetup,
          social: response.data.result?.isSocialAccountSetup,
          creatorID: response.data.result?.userID,
        }),
      );
      yield put(signUpSuccess(response.data));
      yield put(
        setTokenSuccess({
          accessToken: response.data.result?.accessToken,
          signup: response.data.result?.isSignedUp,
          profile: response.data.result?.isProfileSetup,
          social: response.data.result?.isSocialAccountSetup,
          creatorID: response.data.result?.userID,
        }),
      );
      Toast(response?.data?.message);
    } else {
      yield put(signUpFailure(response.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    Toast('Something went wrong');
    //console.log(error?.response?.data?.[0]);
    yield put(signUpFailure(error.response));
  }
}

export function* otpVerifySaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(getApi, 'VerifyOTP?' + action.payload, header);
    console.log('LogIn', response);
    if (response.data.success == 1) {
      if (response.data.result.accessToken == null) {
        yield call(
          AsyncStorage.setItem,
          constant.TOKENCRED,
          JSON.stringify({
            accessToken: response.data.result.accessToken,
            signup: response.data.result.isSignedUp == true ? true : false,
            profile: response.data.result.isProfileSetup == true ? true : false,
            social:
              response.data.result.isSocialAccountSetup == true ? true : false,
            creatorID: response.data.result.userID,
          }),
        );

        yield put(otpVerifySuccess(response.data));
        yield put(
          setTokenSuccess({
            accessToken: response.data.result.accessToken,
            signup: response.data.result.isSignedUp == true ? true : false,
            profile: response.data.result.isProfileSetup == true ? true : false,
            social:
              response.data.result.isSocialAccountSetup == true ? true : false,
            creatorID: response.data.result.userID,
          }),
        );
      } else {
        yield call(
          AsyncStorage.setItem,
          constant.TOKENCRED,
          JSON.stringify({
            accessToken: response.data.result.accessToken,
            signup: response.data.result.isSignedUp == true ? true : false,
            profile: response.data.result.isProfileSetup == true ? true : false,
            social:
              response.data.result.isSocialAccountSetup == true ? true : false,
            creatorID: response.data.result.userID,
          }),
        );
        yield put(otpVerifySuccess(response.data));
        yield put(
          setTokenSuccess({
            accessToken: response.data.result.accessToken,
            signup: response.data.result.isSignedUp == true ? true : false,
            profile: response.data.result.isProfileSetup == true ? true : false,
            social:
              response.data.result.isSocialAccountSetup == true ? true : false,
            creatorID: response.data.result.userID,
          }),
        );
      }
      Toast(response?.data?.message);
    } else {
      yield put(otpSendFailure(response.data));
      Toast(response?.data?.message);
      console.log('error 100', response);
    }
  } catch (error) {
    if (error?.message === 'Network Error') {
      Toast('Network Error');
      console.log('105======>');
    } else {
      Toast(error?.response?.message);
      console.log('107======>');
    }

    console.log('error 105', typeof error, JSON.stringify(error));
    yield put(SignInFailure(error));
  }
}

export function* getLaunageSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: '',
  };
  // log('header',header)
  try {
    let response = yield call(getApi, 'GetLanguages', header);
    console.log('LogIn', response.data);
    if (response.data.success == 1) {
      yield put(getLaunageSuccess(response.data));
      Toast(response?.data?.message);
    } else {
      yield put(getLaunageFailure(response.data));
      Toast(response?.data?.message);
      console.log('error 100', response);
    }
  } catch (error) {
    if (error?.message === 'Network Error') {
      Toast('Network Error');
      console.log('105======>');
    } else {
      Toast(error?.response?.message);
      console.log('107======>');
    }

    console.log('error 105', typeof error, JSON.stringify(error));
    yield put(getLaunageFailure(error));
  }
}

export function* getNicheSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(getApi, 'GetMasterNiches', header);
    console.log('LogIn', response);
    if (response.data.success == 1) {
      yield put(getNicheSuccess(response.data));
      Toast(response?.data?.message);
    } else {
      yield put(getNicheFailure(response.data));
      Toast(response?.data?.message);
      console.log('error 100', response);
    }
  } catch (error) {
    if (error?.message === 'Network Error') {
      Toast('Network Error');
      console.log('105======>');
    } else {
      Toast(error?.response?.message);
      console.log('107======>');
    }

    console.log('error 105', typeof error, JSON.stringify(error));
    yield put(getNicheFailure(error));
  }
}

export function* getLocationSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: '',
  };
  try {
    let response = yield call(getApi, 'GetCountries', header);
    console.log('LogIn', response.data.result);
    if (response.data.success == 1) {
      yield put(locationSuccess(response.data.result));
      Toast(response?.data?.message);
    } else {
      yield put(locationFailure(response.data));
      Toast(response?.data?.message);
      console.log('error 100', response);
    }
  } catch (error) {
    if (error?.message === 'Network Error') {
      Toast('Network Error');
      console.log('105======>');
    } else {
      Toast(error?.response?.message);
      console.log('107======>');
    }

    console.log('error 105', typeof error, JSON.stringify(error));
    yield put(locationFailure(error));
  }
}

export function* getStateSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(getApi, 'GetStates?' + action.payload, header);
    console.log('LogIn', response);
    if (response.data.success == 1) {
      yield put(stateSuccess(response.data));
      Toast(response?.data?.message);
    } else {
      yield put(stateFailure(response.data));
      Toast(response?.data?.message);
      console.log('error 100', response);
    }
  } catch (error) {
    if (error?.message === 'Network Error') {
      Toast('Network Error');
      console.log('105======>');
    } else {
      Toast(error?.response?.message);
      console.log('107======>');
    }

    console.log('error 105', typeof error, JSON.stringify(error));
    yield put(stateFailure(error));
  }
}

export function* getCitiesSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(getApi, 'GetCities?' + action.payload, header);
    console.log('LogIn', response);
    if (response.data.success == 1) {
      yield put(citiesSuccess(response.data));
      Toast(response?.data?.message);
    } else {
      yield put(citiesFailure(response.data));
      Toast(response?.data?.message);
      console.log('error 100', response);
    }
  } catch (error) {
    if (error?.message === 'Network Error') {
      Toast('Network Error');
      console.log('105======>');
    } else {
      Toast(error?.response?.message);
      console.log('107======>');
    }

    console.log('error 105', typeof error, JSON.stringify(error));
    yield put(stateFailure(error));
  }
}

export function* forgot_password_Saga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    console.log('abc');
    let response = yield call(
      postApi,
      'api/forgot-password',
      action.payload,
      header,
    );
    console.log('forgotpassword', response);
    if (response.data.status == true) {
      yield put(forgotpasswordSuccess(response.data));
      Toast(response?.data?.message);
    } else {
      console.log('err', response.data);
      yield put(forgotpasswordFailure(response.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log('err2', error);
    yield put(forgotpasswordFailure(error));
  }
}

export function* logout_Saga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    // yield call(AsyncStorage.setItem, Constant.SIGNUPED);
    // yield call(AsyncStorage.setItem, Constant.SOCIAL);
    // yield call(AsyncStorage.setItem, Constant.PROFILE);
    yield call(
      AsyncStorage.setItem,
      Constant.TOKENCRED,
      JSON.stringify({
        accessToken: null,
        signup: null,
        profile: null,
        social: null,
        creatorID: null,
      }),
    );

    yield put(
      setTokenSuccess({
        accessToken: null,
        signup: null,
        profile: null,
        social: null,
        creatorID: null,
        userResponse: null,
      }),
    );
    yield put(logoutSuccess('logout'));
    Toast('Logout successfully');
  } catch (error) {
    console.log(error);
    yield put(logoutFailure(error));
  }
}

export function* otpSendSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(getApi, 'SendOTP?' + action.payload, header);
    console.log('response', response.data);
    if (response.data.success == 1) {
      yield put(otpSendSuccess(response.data));
      Toast(response?.data?.message);
    } else {
      yield put(otpSendFailure(response.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(otpSendFailure(error));
  }
}

export function* profileSaveSaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: item?.token,
  };
  try {
    let response = yield call(postApi, 'SaveProfile', action.payload, header);
    console.log('response', response.data);
    if (response.data.success == 1) {
      yield put(profileSuccess(response.data));
      console.log('response 373', item);

      yield call(
        AsyncStorage.setItem,
        constant.TOKENCRED,
        JSON.stringify({
          accessToken: item.token,
          signup: true,
          profile: false,
          social: false,
          creatorID: item.creatorID,
        }),
      );
      yield put(
        setTokenSuccess({
          accessToken: item.token,
          signup: true,
          profile: false,
          social: false,
          creatorID: item.creatorID,
        }),
      );
      Toast(response?.data?.message);
    } else {
      yield put(profileFailure(response.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(profileFailure(error));
  }
}

export function* devicetokenSaveSaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: item?.token,
  };
  try {
    let response = yield call(
      postApi,
      'UpdateFCMToken',
      action.payload,
      header,
    );
    console.log('response', response.data);
    if (response.data.success == 1) {
      yield put(deviceTokenSuccess(response.data));
      console.log('response 373', item);
      yield put(deviceTokenSuccess(response?.data));
      Toast(response?.data?.message);
    } else {
      yield put(deviceTokenFaliure(response.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(deviceTokenFaliure(error));
  }
}

export function* resendOtpSendSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      postApi,
      'api/varify-otp',
      action.payload,
      header,
    );
    console.log('response', response);
    if (response.data.status == true) {
      yield put(resendOtpSuccess(response.data));
      Toast(response?.data?.message);
    } else {
      yield put(resendOtpFaliures(response.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(resendOtpFaliures(error));
  }
}

export function* changePasswordSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      postApi,
      'api/new-password-set',
      action.payload,
      header,
    );
    console.log('response', response);
    if (response.data.status == true) {
      yield put(changePasswordSuccess(response.data));
      Toast(response?.data?.message);
    } else {
      yield put(changePasswordFaliure(response.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(changePasswordFaliure(error));
  }
}

export function* getPrivacysaga(action) {
  const item = yield select(getItem);
  console.log('token', item.token);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(getApi, 'api/privacy-policy', header);
    console.log('response privacy', response);
    if (response.data.status == true) {
      yield put(privacySuccess(response.data));
    } else {
      yield put(privacyFaliure(response.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(privacyFaliure(error));
  }
}

export function* getSendEmailsaga(action) {
  const item = yield select(getItem);
  console.log('token', item.token);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'SendVerifyEmailOTP',
      action.payload,
      header,
    );
    console.log('response privacy', response);
    if (response.data.success == 1) {
      yield put(otpSendEmailSuccess(response.data));
    } else {
      yield put(otpSendEmailFailure(response.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(otpSendEmailFailure(error));
  }
}

export function* getVerifyEmailsaga(action) {
  const item = yield select(getItem);
  console.log('token', item.token);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      getApi,
      'VerifyEmailOTP?' + action.payload,
      header,
    );
    console.log('response privacy', response);
    if (response.data.success == 1) {
      yield put(otpVerifyEmailSuccess(response.data));
    } else {
      yield put(otpVerifyEmailSuccess(response.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(otpVerifyEmailFailure(error));
  }
}

export function* deleteUserAccSaga(action) {
  try {
    const item = yield select(getItem);
    let Header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      accesstoken: item.token,
    };

    const response = yield call(
      deleteApi,
      'DeleteUser=' + action?.payload,
      Header,
    );
    console.log('deleteUserAcc Response', response);
    if (response.data.success == 1) {
      console.log('deleteUserAcc Response 11', response.data);
      yield call(AsyncStorage.removeItem, Constant.TOKENCRED);

      yield put(getTokenSuccess(null));
      Toast(response?.data?.message);
      yield put(deleteAccSuccess(response.data));

      console.log('response success', response?.data?.message);
    } else {
      console.log('deleteUserAcc Response 22', response.data);
      yield put(deleteAccFailure(response.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(deleteAccFailure(error));
    Toast(error?.response?.data?.message);
    if (error?.response?.data?.message == 'Unauthenticated.') {
      yield call(AsyncStorage.removeItem, Constant.TOKENCRED);
      yield put(getTokenSuccess(null));
    }
    console.log('err', error);
  }
}

export function* subcrIAPSaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(postApi, 'api/payment', action.payload, header);
    console.log('response', response);
    if (response.data.status == true) {
      yield put(subcrIAPSuccess(response.data));
      Toast(response?.data?.message);
    } else {
      yield put(subcrIAPFailure(response.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(subcrIAPFailure(error));
  }
}

// subcrIAPDateSaga
export function* subcrIAPDateSaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'api/payment-date',
      action.payload,
      header,
    );
    console.log('response', response);
    if (response.data.status == true) {
      yield put(subcrIAPDateSuccess(response.data));
      // Toast(response?.data?.message);
    } else {
      yield put(subcrIAPDateFailure(response.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(subcrIAPDateFailure(error));
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('Auth/signUpRequest', signUpSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/otpVerifyRequest', otpVerifySaga);
  })(),
  (function* () {
    yield takeLatest('Auth/getTokenRequest', get_tokensaga);
  })(),
  (function* () {
    yield takeLatest('Auth/forgotpasswordRequest', forgot_password_Saga);
  })(),
  (function* () {
    yield takeLatest('Auth/otpSendRequest', otpSendSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/profileRequest', profileSaveSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/locationRequest', getLocationSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/stateRequest', getStateSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/citiesRequest', getCitiesSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/getLaunageRequest', getLaunageSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/getNicheRequest', getNicheSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/logoutRequest', logout_Saga);
  })(),
  (function* () {
    yield takeLatest('Auth/privacyRequest', getPrivacysaga);
  })(),
  (function* () {
    yield takeLatest('Auth/otpSendEmailRequest', getSendEmailsaga);
  })(),
  (function* () {
    yield takeLatest('Auth/otpVerifyEmailRequest', getVerifyEmailsaga);
  })(),
  (function* () {
    yield takeLatest('Auth/changePasswordRequest', changePasswordSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/resendOtpRequest', resendOtpSendSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/deviceTokenRequest', devicetokenSaveSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/deleteAccRequest', deleteUserAccSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/subcrIAPRequest', subcrIAPSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/subcrIAPDateRequest', subcrIAPDateSaga);
  })(),
];
export default watchFunction;
