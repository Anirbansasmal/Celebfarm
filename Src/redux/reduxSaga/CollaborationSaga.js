import { postApi, getApi } from '../../utils/helpers/ApiRequest';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import {
  getActiveDetailsFailure,
  getActiveDetailsSuccess,
  getDeleteImageFailure,
  getDeleteImageSuccess,
  getInviteCollaboFailure,
  getInviteCollaboSuccess,
  getInviteDetailsFailure,
  getInviteDetailsSuccess,
  getInviteFailure,
  getInviteSuccess,
  getUploadContentHubFailure,
  getUploadContentHubSuccess,
  getUploadImageFailure,
  getUploadImageSuccess,
  updateContentFailure,
  updateContentSuccess,
  uploadContentFailure,
  uploadContentSuccess,
  setSelectRequest,
  getSelectSuccess,
  getAcceptOfferSuccess,
  getAcceptOfferFailure,
  getRejectOfferSuccess,
  getRejectOfferFailure,
} from '../reducers/CollaborationReducer';
import { getContentLabAllFailure } from '../reducers/ContentLabReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const getItems = state => state.AuthReducer;

export function* getCollaboInviteSaga(action) {
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
      'GetDashboardCollabs?' + action.payload,
      Header,
    );
    console.log(response.data);
    if (response.data.success == 1) {
      yield put(getInviteSuccess(response.data.result));
    } else {
      yield put(getInviteFailure(response.data));
    }
  } catch (error) {
    yield put(getInviteFailure(error));
  }
}

export function* getCollabInviteDetailsSaga(action) {
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
      'GetInvitedCampaignByID?' + action?.payload,
      Header,
    );
    console.log(response.data.result);
    if (response.data.success == 1) {
      yield put(getInviteDetailsSuccess(response.data.result));
    } else {
      yield put(getInviteDetailsFailure(response.data));
    }
  } catch (error) {
    yield put(getInviteDetailsFailure(error));
  }
}

export function* getInviteAcceptSaga(action) {
  const items = yield select(getItems);
  console.log({ 'the token is': items.token });
  console.log({ 'the token is': action.payload });

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(postApi, 'inviteRequest', action.payload, Header);
    if (response.data.success == 1) {
      yield put(getInviteCollaboSuccess(response.data.result));
    } else {
      yield put(getInviteCollaboFailure(response.data));
    }
  } catch (error) {
    yield put(getContentLabAllFailure(error));
  }
}

export function* getOfferAcceptSaga(action) {
  const items = yield select(getItems);
  console.log({ 'the token is': items.token });
  console.log({ 'the token is': action.payload });

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(postApi, 'inviteRequest', action.payload, Header);
    if (response.data.success == 1) {
      yield put(getInviteCollaboSuccess(response.data.result));
    } else {
      yield put(getInviteCollaboFailure(response.data));
    }
  } catch (error) {
    yield put(getContentLabAllFailure(error));
  }
}

export function* getActiveDetailsSaga(action) {
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
      'GetCampaignDetails?' + action?.payload,//GetActiveCollabDetails
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
  console.log({ 'the token is': items.token });

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(
      postApi,
      'UploadToCloud', action?.payload,
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
  console.log({ 'the token is': items.token });

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(
      postApi,
      'GetActiveCollabDetails', action?.payload,
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
  console.log({ 'the token is': items.token });

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(
      getApi,
      'DeleteImage?' + action?.payload,
      Header,
    );
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
  console.log({ 'the token is': items.token });

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(
      postApi,
      'SaveContentHub', action?.payload,
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
  console.log({ 'the token is': items.token });

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(
      postApi,
      'UpdateContentHub', action?.payload,
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
  console.log({ 'the token is': items.token });

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(
      getApi,
      'GetContentHubDetails?' + action?.payload,
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

export function* getAcceptOfferSaga(action) {
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

export function* getRecjectOfferSaga(action) {
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
      'DeclineBarterTerm?' + action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getRejectOfferSuccess(response.data.result));
    } else {
      yield put(getRejectOfferSuccess(response.data.result));
    }
  } catch (error) {
    yield put(getRejectOfferFailure(error));
  }
}

export function* setTypeSaga(action) {
  try {
    console.log('Register', action?.payload);

      yield call(
        AsyncStorage.setItem,
        constant.TYPECOLLAB,
        JSON.stringify({
          typeCol: action?.payload,
        }),
      );
  } catch (error) {
  }
}

export function* getTypeUpSaga(action) {
  try {
    const response = yield call(AsyncStorage.getItem, Constant.TYPECOLLAB);

      yield put(getSelectSuccess(response));
  } catch (error) {
  }
}


const watchFunction = [
  (function* () {
    yield takeLatest(
      'collaboration/getInviteDetailsRequest',
      getCollabInviteDetailsSaga,
    );
  })(),
  (function* () {
    yield takeLatest('collaboration/getInviteRequest', getCollaboInviteSaga);
  })(),
  (function* () {
    yield takeLatest(
      'collaboration/getInviteCollaboRequest',
      getInviteAcceptSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'collaboration/getOfferCollaboRequest',
      getInviteAcceptSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'collaboration/getActiveDetailsRequest',
      getActiveDetailsSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'collaboration/getUploadImageRequest',
      getUploaImageSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'collaboration/getDeleteImageRequest',
      getDeleteImageSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'collaboration/uploadContentRequest',
      saveContentHubSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'collaboration/updateContentRequest',
      getUpdateContentSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'collaboration/getUploadContentHubRequest',
      getContentHubSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'collaboration/getAcceptOfferRequest',
      getAcceptOfferSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'collaboration/getRejectOfferRequest',
      getRecjectOfferSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'collaboration/setSelectRequest',
      setTypeSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'collaboration/getSelectSuccess',
      getTypeUpSaga,
    );
  })(),
];

export default watchFunction;
