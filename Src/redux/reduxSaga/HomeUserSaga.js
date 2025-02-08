import {
  postApi,
  getApi,
} from '../../utils/helpers/ApiRequest';
import {put, call, takeLatest, select} from 'redux-saga/effects';
import { getBarterFailure, getBarterFilterFailure, getBarterFilterSuccess, getBarterSuccess, getHomeCollaborationFailure, getHomeCollaborationSuccess, getHomeFailure, getHomeSuccess } from '../reducers/HomeUserReducer';
const getItems = state => state.AuthReducer;

export function* getHomeSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(getApi, 'GetDashboardCollabs?'+action.payload, Header);
    console.log(response.data);
    if (response.data.success == 1) {
      yield put(getHomeSuccess(response.data.result));
    } else {
      yield put(getHomeSuccess(response.data.result));
    }
  } catch (error) {
    yield put(getHomeFailure(error));
  }
}

export function* getCollaborationSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };

  try {
    let response = yield call(getApi, 'GetDashboardCollabs?'+action?.payload, Header);
    console.log('response data result',response.data);
    if (response.data.success == 1) {
      yield put(getHomeCollaborationSuccess(response.data.result));
    } else {
      yield put(getHomeCollaborationSuccess(response.data?.result));
    }
  } catch (error) {
    yield put(getHomeCollaborationFailure(error));
  }
}

export function* getBarterSaga(action) {
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
      'GetBarterProducts?'+action.payload,
      Header,
    );
    if (response.data.success == 1) {
      yield put(getBarterSuccess(response.data));
    } else {
      yield put(getBarterSuccess(response.data.result??[]));
    }
  } catch (error) {
    yield put(getBarterFailure(error));
  }
}

export function* getFilterSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.token,
  };
  try {
    let response = yield call(getApi, 'GetMasterIndustries', Header);
    console.log(response);
    if (response.status == 200) {
      yield put(getBarterFilterSuccess(response.data));
    } else {
      yield put(getBarterFilterFailure(response.data));
    }
  } catch (error) {
    yield put(getBarterFilterFailure(response.data));
  }
}

export function* getFilterBrandSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.token,
  };
  try {
    let response = yield call(getApi, 'GetMasterIndustries', Header);
    console.log(response);
    if (response.status == 200) {
      yield put(getBarterFilterSuccess(response.data));
    } else {
      yield put(getBarterFilterFailure(response.data));
    }
  } catch (error) {
    yield put(getBarterFilterFailure(response.data));
  }
}

const watchFunction = [
    (function* () {
      yield takeLatest('homeCollab/getHomeRequest', getHomeSaga);
    })(),
    (function* () {
      yield takeLatest('homeCollab/getHomeCollaborationRequest', getCollaborationSaga);
    })(),
    (function* () {
      yield takeLatest('homeCollab/getBarterRequest', getBarterSaga);//getBarterRequestedRequest
    })(),
    (function* () {
      yield takeLatest('homeCollab/getBarterFilterRequest', getFilterSaga);//getBarterRequestedRequest
    })(),
  ];

export default watchFunction;