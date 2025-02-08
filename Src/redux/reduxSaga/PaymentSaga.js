import {postApi, getApi} from '../../utils/helpers/ApiRequest';
import {put, call, takeLatest, select} from 'redux-saga/effects';
import {
  addAddressRequest,
  addAddressSuccess,
  addAddressFailure,
  
  getAddressRequest,
  getAddressSuccess,
  getAddressFailure,

  updateAddressRequest,
  updateAddressSuccess,
  updateAddressFailure,
} from '../reducers/PaymentReducer';
import {getContentLabAllFailure} from '../reducers/ContentLabReducer';
const getItems = state => state.AuthReducer;

export function* getActiveDetailsSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(
      getApi,
      'GetActiveCollabDetails?' + action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getActiveDetailsSuccess(response.data.result));
    } else {
      yield put(getActiveDetailsSuccess(response.data.result));
    }
  } catch (error) {
    yield put(getActiveDetailsFailure(error));
  }
}

export function* getUploaImageSaga(action) {
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
      'UploadToCloud',
      action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getUploadImageSuccess(response.data.result));
    } else {
      yield put(getUploadImageSuccess(response.data.result));
    }
  } catch (error) {
    yield put(getUploadImageFailure(error));
  }
}

export function* getSignImageSaga(action) {
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
      'GetActiveCollabDetails',
      action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getActiveDetailsSuccess(response.data.result));
    } else {
      yield put(getActiveDetailsSuccess(response.data.result));
    }
  } catch (error) {
    yield put(getActiveDetailsFailure(error));
  }
}

export function* getDeleteImageSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(getApi, 'DeleteImage?' + action?.payload, Header);
    console.log(response);
    if (response.data.success == 1) {
      yield put(getDeleteImageSuccess(response.data.result));
    } else {
      yield put(getDeleteImageSuccess(response.data.result));
    }
  } catch (error) {
    yield put(getDeleteImageFailure(error));
  }
}

export function* saveContentHubSaga(action) {
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
      'SaveContentHub',
      action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(uploadContentSuccess(response.data.result));
    } else {
      yield put(uploadContentSuccess(response.data.result));
    }
  } catch (error) {
    yield put(uploadContentFailure(error));
  }
}

export function* getUpdateContentSaga(action) {
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
      'UpdateContentHub',
      action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(updateContentSuccess(response.data));
    } else {
      yield put(updateContentSuccess(response.data));
    }
  } catch (error) {
    yield put(updateContentFailure(error));
  }
}

export function* getContentHubSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(
      getApi,
      'GetContentHub?' + action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getUploadContentHubSuccess(response.data.result));
    } else {
      yield put(getUploadContentHubSuccess(response.data.result));
    }
  } catch (error) {
    yield put(getUploadContentHubFailure(error));
  }
}

const watchFunction = [
  // (function* () {
  //   yield takeLatest(
  //     'Payment/addAddressRequest',
  //     addAddressSaga,
  //   );
  // })(),
  // (function* () {
  //   yield takeLatest('Payment/updateAddressRequest', updateAddressSaga);
  // })(),
  // (function* () {
  //   yield takeLatest(
  //     'Payment/getAddressRequest',
  //     getAddressSaga,
  //   );
  // })(),
  // (function* () {
  //   yield takeLatest(
  //     'collaboration/getActiveDetailsRequest',
  //     getActiveDetailsSaga,
  //   );
  // })(),
  // (function* () {
  //   yield takeLatest('collaboration/getUploadImageRequest', getUploaImageSaga);
  // })(),
  // (function* () {
  //   yield takeLatest('collaboration/getDeleteImageRequest', getDeleteImageSaga);
  // })(),
  // (function* () {
  //   yield takeLatest('collaboration/uploadContentRequest', saveContentHubSaga);
  // })(),
  // (function* () {
  //   yield takeLatest(
  //     'collaboration/updateContentRequest',
  //     getUpdateContentSaga,
  //   );
  // })(),
  // (function* () {
  //   yield takeLatest(
  //     'collaboration/getUploadContentHubRequest',
  //     getContentHubSaga,
  //   );
  // })(),
];

export default watchFunction;
