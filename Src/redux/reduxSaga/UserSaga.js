import {postApi, getApi} from '../../utils/helpers/ApiRequest';
import {put, call, takeLatest, select} from 'redux-saga/effects';
import {} from '../reducers/ContentLabReducer';
import {
  getEditEmailSuccess,
  getEditFailure,
  getEditImageFailure,
  getEditImageSuccess,
  getEditSuccess,
  getotpVerifyEmailFailure,
  getotpVerifyEmailSuccess,
  getUserFailure,
  getUserSuccess,
  otpSendEditEmailFailure,
  otpSendEditEmailSuccess,
} from '../reducers/UserReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constant from '../../utils/helpers/constant';
import {setTokenSuccess} from '../reducers/AuthReducer';
const getItems = state => state.AuthReducer;

export function* getUserSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(getApi, 'GetProfile?' + action.payload, Header); //GetCreatorProfile
    console.log(response.data);
    if (response.data.success == 1) {
      yield put(getUserSuccess(response.data.result));
    } else {
      yield put(getUserFailure(response.data));
    }
  } catch (error) {
    yield put(getUserFailure(error));
  }
}

export function* getEditUserSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };

  try {
    let response = yield call(
      postApi,
      'EditCreatorProfile',
      action?.payload,
      Header,
    );
    console.log(response.data);
    if (response.data.success == 1) {
      yield call(
        AsyncStorage.setItem,
        constant.TOKENCRED,
        JSON.stringify({
          accessToken: items.token,
          signup: items.signup,
          profile: true,
          social: items.social,
          creatorID: items.creatorID,
        }),
      );
      yield put(
        setTokenSuccess({
          accessToken: items.token,
          signup: items.signup,
          profile: true,
          social: items.social,
          creatorID: items.creatorID,
        }),
      );
      yield put(getEditSuccess(response.data.result));
    } else {
      yield put(getEditSuccess(response.data));
    }
  } catch (error) {
    yield put(getEditFailure(error));
  }
}

export function* getEditContentLabSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(
      postApi,
      'SetupContentLab',
      action.payload,
      Header,
    );
    if (response.data.success == 1) {
      yield put(getContentLabEditSuccess(response.data.message));
    } else {
      yield put(getContentLabEditFailure(response.data));
    }
  } catch (error) {
    yield put(getContentLabEditFailure(error));
  }
}

export function* getcaseHistory(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.token,
  };
  try {
    let response = yield call(getApi, 'api/case-history', Header);
    console.log(response);
    if (response.data.code == 200) {
      yield put({
        type: GET_HISTORY_SUCCESS,
        data: response.data.data,
        message: response.data.message,
      });
    } else {
      yield put({type: GET_HISTORY_FAILURE, error: 'Wrong data here'});
    }
  } catch (error) {
    yield put({type: GET_HISTORY_FAILURE, error: error});
  }
}

export function* getEditImageSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});
  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(
      postApi,
      'UpdateProfileImage',
      action.payload,
      Header,
    );
    if (response.data.success == 1) {
      yield put(getEditImageSuccess(response.data.message));
    } else {
      yield put(getEditImageFailure(response.data));
    }
  } catch (error) {
    yield put(getEditImageFailure(error));
  }
}
export function* addAddressSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(
      postApi,
      'SetupContentLab',
      action.payload,
      Header,
    );
    if (response.data.success == 1) {
      yield put(getContentLabEditSuccess(response.data.message));
    } else {
      yield put(getContentLabEditFailure(response.data));
    }
  } catch (error) {
    yield put(getContentLabEditFailure(error));
  }
}

export function* getSendEditEmailsaga(action) {
  const item = yield select(getItems);
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
      yield put(otpSendEditEmailSuccess(response.data));
    } else {
      yield put(otpSendEditEmailFailure(response.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(otpSendEditEmailFailure(error));
  }
}

export function* getEditEmailUserSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };

  try {
    let response = yield call(postApi, 'UpdateEmail', action?.payload, Header);
    console.log(response.data);
    if (response.data.success == 1) {
      yield put(getEditEmailSuccess(response.data.result));
    } else {
      yield put(getEditEmailSuccess(response.data));
    }
  } catch (error) {
    yield put(getEditEmailFailure(error));
  }
}

export function* getVerifyEmailsaga(action) {
  const item = yield select(getItems);
  console.log('token', item.token);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(getApi, 'VerifyEmailOTP?'+action.payload, header);
    console.log('response privacy', response);
    if (response.data.success == 1) {
      yield put(getotpVerifyEmailSuccess(response.data));
    } else {
      yield put(getotpVerifyEmailSuccess(response.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(getotpVerifyEmailFailure(error));
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('userProfile/getUserRequest', getUserSaga);
  })(),
  (function* () {
    yield takeLatest('userProfile/getEditRequest', getEditUserSaga);
  })(),
  (function* () {
    yield takeLatest('userProfile/getEditImageRequest', getEditImageSaga);
  })(),
  (function* () {
    yield takeLatest('userProfile/otpSendEditEmailRequest', getSendEditEmailsaga);
  })(),
  (function* () {
    yield takeLatest('userProfile/getEditEmailRequest', getEditEmailUserSaga);
  })(),
  (function* () {
    yield takeLatest('userProfile/getotpVerifyEmailRequest', getVerifyEmailsaga);
  })(),

];

export default watchFunction;
