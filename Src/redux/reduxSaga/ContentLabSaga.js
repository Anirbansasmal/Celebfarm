import {
  postApi,
  getApi,
} from '../../utils/helpers/ApiRequest';
import {put, call, takeLatest, select} from 'redux-saga/effects';
import {
  getContentLabEditRequest,
  getContentLabEditSuccess,
  getContentLabEditFailure,
  getContentLabFailure,
  getContentLabRequest,
  getContentLabSuccess,
  getContentLabAllRequest,
  getContentLabAllFailure,
  getContentLabAllSuccess,
  getSendContentLabOfferSuccess,
  getSendContentLabOfferFailure,
  getPaymentSuccess,
  getPayementFailure,
} from '../reducers/ContentLabReducer';
const getItems = state => state.AuthReducer;

export function* getContentLabSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(getApi, 'GetContentLabUser?'+action.payload, Header);
    console.log(response.data);
    if (response.data.success == 1) {
      yield put(getContentLabSuccess(response.data.result));
    } else {
      yield put(getContentLabFailure(response.data));
    }
  } catch (error) {
    yield put(getContentLabFailure(error));
  }
}

export function* getContentAllLabSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };

  try {
    let response = yield call(getApi, 'GetAllContentLabUser', Header);
    console.log(response.data.result);
    if (response.data.status == 1) {
      yield put(getContentLabAllSuccess(response.data.result));
    } else {
      yield put(getContentLabAllSuccess(response.data));
    }
  } catch (error) {
    yield put(getContentLabAllFailure(error));
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

export function* getSendCounterOfferSaga(action) {
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
      'SaveUGCCounterOffer',
      action.payload,
      Header,
    );
    if (response.data.success == 1) {
      yield put(getSendContentLabOfferSuccess(response.data.message));
    } else {
      yield put(getSendContentLabOfferFailure(response.data));
    }
  } catch (error) {
    yield put(getSendContentLabOfferFailure(error));
  }
}

export function* getAcceptContentOfferSaga(action) {
  const items = yield select(getItems);
  console.log({ 'the token is': items.token });

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(
      getApi,
      'AcceptBarterTerm?' + action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getAcceptOfferSuccess(response.data.result));
    } else {
      yield put(getAcceptOfferSuccess(response.data.result));
    }
  } catch (error) {
    yield put(getAcceptOfferFailure(error));
  }
}

export function* getRejectOfferSaga(action) {
  const items = yield select(getItems);
  console.log({ 'the token is': items.token });

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(
      getApi,
      'AcceptBarterTerm?' + action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getAcceptOfferSuccess(response.data.result));
    } else {
      yield put(getAcceptOfferSuccess(response.data.result));
    }
  } catch (error) {
    yield put(getAcceptOfferFailure(error));
  }
}

export function* getPaymentSaga(action) {
  const items = yield select(getItems);
  console.log({ 'the token is': items.token });

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(
      getApi,
      'AcceptBarterTerm?' + action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getPaymentSuccess(response.data.result));
    } else {
      yield put(getPaymentSuccess(response.data.result));
    }
  } catch (error) {
    yield put(getPayementFailure(error));
  }
}

const watchFunction = [
    (function* () {
      yield takeLatest('contentLab/getContentLabRequest', getContentLabSaga);
    })(),
    (function* () {
      yield takeLatest('contentLab/getContentLabEditRequest', getEditContentLabSaga);
    })(),
    (function* () {
      yield takeLatest('contentLab/getAcceptOfferRequest', getAcceptContentOfferSaga);
    })(),
    (function* () {
      yield takeLatest('contentLab/getRejectOfferRequest', getRejectOfferSaga);
    })(),
    (function* () {
      yield takeLatest('contentLab/getContentLabAllRequest', getContentAllLabSaga);
    })(),
    (function* () {
      yield takeLatest('contentLab/getSendContentLabOfferRequest', getSendCounterOfferSaga);
    })(),
    (function* () {
      yield takeLatest('contentLab/getPaymentRequest', getPaymentSaga);
    })(),
  ];

export default watchFunction;