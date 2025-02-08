import {takeLatest, call, put} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../utils/helpers/constants';

import {
  SET_TOKEN_REQUEST,
  SET_TOKEN_SUCCESS,
  SET_TOKEN_FAILURE,
  GET_TOKEN_REQUEST,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILURE,
} from '../redux/action/ActionTypes';

export function* setTokenAction(action) {
  try {
    yield call(
      AsyncStorage.setItem,
      constants.HHGHEALTHCREDS,
      JSON.stringify({token: action.payload.token,
        user_type: action.payload.user_type,
        user_id: action.payload.user_id,
      }),
    );
    // yield call(
    //   AsyncStorage.setItem,
    //   constants.USER_TYPE,
    //   JSON.stringify({user_type: action.payload.user_type}),
    // );
    yield put({type: SET_TOKEN_SUCCESS, token: action.payload.token,
      user_type: response.data.data.role_name,
      user_id: action.payload.user_id,
    });
    // yield put({type: SET_TOKEN_SUCCESS, user_type: action.payload.user_type});
  } catch (error) {
    yield put({type: SET_TOKEN_FAILURE, error: error});
  }
}

export function* getTokenAction() {
  try {
    const creds = yield call(AsyncStorage.getItem, constants.HHGHEALTHCREDS);

    if (creds === null) {
      yield put({type: GET_TOKEN_SUCCESS, token: null});
    } else {
      yield put({
        type: GET_TOKEN_SUCCESS,
        token: JSON.parse(creds).token,
        user_type: JSON.parse(creds).user_type,
        user_id: JSON.parse(creds).user_id,
      });
    }
  } catch (error) {
    yield put({type: GET_TOKEN_FAILURE, error: error});
  }
}

export default {
  source: [
    (function* () {
      yield takeLatest(SET_TOKEN_REQUEST, setTokenAction);
    })(),
    (function* () {
      yield takeLatest(GET_TOKEN_REQUEST, getTokenAction);
    })(),
  ],
};
