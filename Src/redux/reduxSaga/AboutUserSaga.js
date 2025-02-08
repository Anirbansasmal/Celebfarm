import { postApi, getApi, getApiWithParamNew } from '../utils/helpers/ApiRequest';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../utils/helpers/constants';

import {
  /* APPOINTMANT */
  GET_FAQ_REQUEST,
  GET_FAQ_SUCCESS,
  GET_FAQ_FAILURE,

  /* APPOINTMANT GET*/
  GET_CMS_REQUEST,
  GET_CMS_SUCCESS,
  GET_CMS_FAILURE,

} from '../redux/action/ActionTypes';

const getItems = state => state.TokenReducer;

export function* getFaq(action) {
  const items = yield select(getItems);
  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.token,
  };
  console.log('hiii', Header);
  try {
    let response = yield call(getApi, 'api/faq', Header);
    console.log('Register : ', response?.data?.message);

    if (response.data.status == true) {
      yield put({
        type: GET_FAQ_SUCCESS, data: response.data,
        message: response.data.message
      });
    } else {
      console.log('errrr');
      yield put({ type: GET_FAQ_FAILURE, error: response.data });
    }
  } catch (error) {
    console.log('errrr2');
    yield put({ type: GET_FAQ_FAILURE, error: error });
  }
}

export function* getCms(action) {
  const items = yield select(getItems);
  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.token,
  };
  console.log('hiii', Header);
  try {
    let response = yield call(getApiWithParamNew, 'api/cms/',action.payload, Header);
    console.log('Register : ', response?.data?.message);

    if (response.data.status == true) {
      yield put({
        type: GET_CMS_SUCCESS, data: response.data,
        message: response.data.message
      });
    } else {
      console.log('errrr');
      yield put({ type: GET_CMS_FAILURE, error: response.data });
    }
  } catch (error) {
    console.log('errrr2');
    yield put({ type: GET_CMS_FAILURE, error: error });
  }
}
export default {
  source: [
    (function* () {
      yield takeLatest(GET_FAQ_REQUEST, getFaq);
    })(),
    (function* () {
      yield takeLatest(GET_CMS_REQUEST, getCms);
    })(),
  ],
};
