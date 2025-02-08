import {postApi, getApi, postApiAad} from '../../utils/helpers/ApiRequest';
import {put, call, takeLatest, select} from 'redux-saga/effects';
import {
  addCommercialRequest,
  addCommercialSuccess,
  addCommercialFailure,
  getCommercialRequest,
  getCommercialSuccess,
  getCommercialFailure,
  updateCommercialRequest,
  updateCommercialSuccess,
  updateCommercialFailure,
  addAddressSuccess,
  addAddressFailure,
  getAddressSuccess,
  getAddressFailure,
  updateAddressSuccess,
  updateAddressFailure,
  getInitSessionSuccess,
  getInitSessionFailure,
  getAadhaarCaptchaSuccess,
  getAadhaarCaptchaFailure,
  getAadhaarOtpSuccess,
  getAadhaarVerifyOtpFailure,
  getAadhaarVerifyOtpSuccess,
  getAadhaarOtpFailure,
  getSaveAadhaarSuccess,
  getSaveAadhaarFailure,
  getPanVerifySuccess,
  getPanVerifyFailure,
  getPanSuccess,
  getPanFailure,
  getBankVerifySuccess,
  saveBankSuccess,
  saveBankFailure,
  getMasterContactusSuccess,
  getMasterContactusFaliure,
  getContactusSuccess,
  getContactusFaliure,
  getYoutubeDetailSuccess,
  getYoutubeDetailFaliure,
  getYoutubeUserDetailSuccess,
  getYoutubeUserDetailFaliure,
  getNotificationSuccess,
  getNotificationFaliure,
  getNotificationUpdateSuccess,
  getNotificationUpdateFaliure,
  getNotificationDetailsSuccess,
  getNotificationDetailsFaliure,
  getAadhaarSuccess,
  getAadhaarFailure,
  getYoutubeRemoveSuccess,
  getYoutubeRemoveFaliure,
  getAccountVerificationSuccess,
  getAccountVerificationFaliure,
  getInstaDetailSuccess,
  getInstagramUserDetailSuccess,
  getInstagramUserDetailFaliure,
  getInstagramDetailSuccess,
  getInstagramDetailFaliure,
  getInstagramRemoveSuccess,
  getInstagramRemoveFaliure,
  getGstVerifySuccess,
  getGstVerifyFailure,
  getGstSuccess,
  getGstFailure,
  getBankSuccess,
  getBankFailure,
  getBankVerifyFailure,
  getNotificationReadSuccess,
  getNotificationReadFaliure,
} from '../reducers/ProfileReducer';
import {getContentLabAllFailure} from '../reducers/ContentLabReducer';
import constant from '../../utils/helpers/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
const getItems = state => state.AuthReducer;

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
      'AddEditAddress',
      action.payload,
      Header,
    );
    console.log(response.data);
    if (response.data.success == 1) {
      yield put(addAddressSuccess(response.data.message));
    } else {
      yield put(addAddressSuccess(response.data));
    }
  } catch (error) {
    yield put(addAddressFailure(error));
  }
}

export function* getAddressSaga(action) {
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
      'GetCreatorAddress?' + action?.payload,
      Header,
    );
    console.log(response.data.result);
    if (response.data.success == 1) {
      yield put(getAddressSuccess(response.data.result));
    } else {
      yield put(getAddressSuccess(response.data));
    }
  } catch (error) {
    yield put(getAddressFailure(error));
  }
}

export function* updateAddressSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});
  console.log({'the token is': action.payload});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(
      postApi,
      'UpdatedAddress',
      action.payload,
      Header,
    );
    if (response.data.success == 1) {
      yield put(updateAddressSuccess(response.data));
    } else {
      yield put(updateAddressSuccess(response.data));
    }
  } catch (error) {
    yield put(updateAddressFailure(error));
  }
}

export function* addCommercialSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(postApi, 'AddCommercial', action.payload, Header);
    console.log(response.data);
    if (response.data.success == 1) {
      yield put(addCommercialSuccess(response.data.result));
    } else {
      yield put(addCommercialSuccess(response.data));
    }
  } catch (error) {
    yield put(addCommercialFailure(error));
  }
}

export function* getCommercialSaga(action) {
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
      'GetCommercialDetails?' + action?.payload,
      Header,
    );
    console.log(response.data.result);
    if (response.data.success == 1) {
      yield put(getCommercialSuccess(response.data.result));
    } else {
      yield put(getCommercialSuccess(response.data));
    }
  } catch (error) {
    yield put(getCommercialFailure(error));
  }
}

export function* updateCommercialSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});
  console.log({'the token is': action.payload});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(
      postApi,
      'UpdatedCommercial',
      action.payload,
      Header,
    );
    if (response.data.success == 1) {
      yield put(updateCommercialSuccess(response.data));
    } else {
      yield put(updateCommercialSuccess(response.data));
    }
  } catch (error) {
    yield put(updateCommercialFailure(error));
  }
}

export function* getAadhaarinitSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(
      getApi,
      'CreateAadhaarSession?'+
      action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getInitSessionSuccess(response.data));
    } else {
      yield put(getInitSessionSuccess(response.data));
    }
  } catch (error) {
    yield put(getInitSessionFailure(error));
  }
}

export function* getAadCapVfySaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(
      getApi,
      'ReloadCaptcha?'+
      action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getAadhaarCaptchaSuccess(response.data));
    } else {
      yield put(getAadhaarCaptchaSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
    yield put(getAadhaarCaptchaFailure(error));
  }
}

export function* getAadharOtpSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    client_id: constant.ClientID,
    client_secret: constant.ClientSecret,
    module_secret: constant.ModuleSecret,
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      postApiAad,
      'v2/kyc/aadhaar_connect/otp',
      action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getAadhaarOtpSuccess(response.data));
    } else {
      yield put(getAadhaarOtpSuccess(response.data));
    }
  } catch (error) {
    yield put(getAadhaarOtpFailure(error));
  }
}

export function* getAadharOtpVerifySaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    client_id: constant.ClientID,
    client_secret: constant.ClientSecret,
    module_secret: constant.ModuleSecret,
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      postApiAad,
      'v2/kyc/aadhaar_connect/otp/validate',
      action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getAadhaarVerifyOtpSuccess(response.data));
    } else {
      yield put(getAadhaarVerifyOtpSuccess(response.data));
    }
  } catch (error) {
    yield put(getAadhaarVerifyOtpFailure(error));
  }
}

export function* saveContentAadhaarSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(postApi, 'AddAadhaar', action?.payload, Header);
    console.log(response);
    if (response.data.success == 1) {
      yield put(getSaveAadhaarSuccess(response.data.result));
    } else {
      yield put(getSaveAadhaarSuccess(response.data.result));
    }
  } catch (error) {
    yield put(getSaveAadhaarFailure(error));
  }
}

export function* getAadhaarDetailSaga(action) {
  const items = yield select(getItems);
  const header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items?.token,
  };
  try {
    const response = yield call(
      getApi,
      'GetAadhaar?' + action?.payload,
      header,
    );
    console.log(response);
    if (response?.data?.success == 1) {
      yield put(getAadhaarSuccess(response?.data?.result));
    } else {
      yield put(getAadhaarFailure(response?.data?.result));
    }
  } catch (error) {
    yield put(getAadhaarFailure(error));
  }
}
export function* getPanVerifySaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    contenttype: 'application/json',
    authorization: items?.token,
  };
  try {
    let response = yield call(getApi, 'VerifyPAN?' + action?.payload, Header);
    console.log('gmndbmdfs', response);
    if (response.data.status == 'SUCCESS') {
      yield put(getPanVerifySuccess(response.data));
    } else {
      yield put(getPanVerifyFailure(response.data));
    }
  } catch (error) {
    yield put(getPanVerifyFailure(error));
  }
}

export function* getPanSaga(action) {
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
      'GetPANKYCDetails?' + action?.payload,
      Header,
    );
    console.log(response.data);
    if (response.data.status == 'SUCCESS') {
      yield put(getPanSuccess(response.data));
    } else {
      yield put(getPanSuccess(response.data));
    }
  } catch (error) {
    yield put(getPanFailure(error));
  }
}

export function* getGstVerifySaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    contenttype: 'application/json',
    authorization: action?.token,
  };
  try {
    let response = yield call(getApi, 'VerifyGSTIN?' + action?.payload, Header);
    console.log('gmndbmdfs', response?.data);
    if (response.data.responseKey !== "") {
      yield put(getGstVerifySuccess(response.data));
    } else {
      yield put(getGstVerifyFailure(response.data));
    }
  } catch (error) {
    yield put(getGstVerifyFailure(error));
  }
}

export function* getGstSaga(action) {
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
      'GetGSTINKYCDetails?' + action?.payload,
      Header,
    );
    console.log('res=>>>>>>',response?.data);
    if (response.status == 200) {
      yield put(getGstSuccess(response.data));
    } else {
      yield put(getGstFailure(response.data));
    }
  } catch (error) {
    yield put(getGstFailure(error));
  }
}

export function* getBankVerifySaga(action) {
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
      'SaveBankDetails',
      action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getBankVerifySuccess(response.data));
    } else {
      yield put(getBankVerifySuccess(response.data));
    }
  } catch (error) {
    yield put(getBankVerifyFailure(error));
  }
}

export function* getSaveBankSaga(action) {
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
      'SaveKYCResult',
      action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(saveBankSuccess(response.data));
    } else {
      yield put(saveBankSuccess(response.data));
    }
  } catch (error) {
    yield put(saveBankFailure(error));
  }
}

export function* getBankSaga(action) {
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
      'GetBankDetails?' + action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getBankSuccess(response.data.result));
    } else {
      yield put(getBankSuccess(response.data.result));
    }
  } catch (error) {
    yield put(getBankFailure(error));
  }
}

export function* getMasterContactSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(getApi, 'GetAllMasterContacts', Header);
    console.log(response);
    if (response.data.success == 1) {
      yield put(getMasterContactusSuccess(response.data.result));
    } else {
      yield put(getMasterContactusSuccess(response.data.result));
    }
  } catch (error) {
    yield put(getMasterContactusFaliure(error));
  }
}

export function* addContactusSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(postApi, 'AddContactUs', action?.payload, Header);
    console.log(response);
    if (response.data.success == 1) {
      yield put(getContactusSuccess(response.data));
    } else {
      yield put(getContactusSuccess(response.data));
    }
  } catch (error) {
    yield put(getContactusFaliure(error));
  }
}

export function* youtubeDetailsSaga(action) {
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
      'AddEditYoutubeDetails',
      action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield call(
        AsyncStorage.setItem,
        constant.TOKENCRED,
        JSON.stringify({
          accessToken: items?.token,
          signup: items?.signup,
          profile: items?.profile,
          social: true,
          creatorID: items?.creatorID,
        }),
      );
      yield put(getYoutubeDetailSuccess(response.data));
      yield put(
        JSON.stringify({
          accessToken: items?.token,
          signup: items?.signup,
          profile: items?.profile,
          social: true,
          creatorID: items?.creatorID,
        }),
      );
    } else {
      yield put(getYoutubeDetailSuccess(response.data));
    }
  } catch (error) {
    yield put(getYoutubeDetailFaliure(error));
  }
}

export function* youtubeUserDetailsSaga(action) {
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
      'GetYoutubeDetails?' + action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getYoutubeUserDetailSuccess(response.data));
    } else {
      yield put(getYoutubeUserDetailSuccess(response.data));
    }
  } catch (error) {
    yield put(getYoutubeUserDetailFaliure(error));
  }
}

export function* addinstagramUserDetailsSaga(action) {
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
      'AddEditInstaConnect',
      action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getInstagramDetailSuccess(response.data));
    } else {
      yield put(getInstagramDetailSuccess(response.data));
    }
  } catch (error) {
    yield put(getInstagramDetailFaliure(error));
  }
}
export function* instagramUserDetailsSaga(action) {
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
      'GetInstaConnect?' + action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getInstagramUserDetailSuccess(response.data));
    } else {
      yield put(getInstagramUserDetailSuccess(response.data));
    }
  } catch (error) {
    yield put(getInstagramUserDetailFaliure(error));
  }
}

export function* youtubeUserRemoveSaga(action) {
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
      'RemoveYoutube?' + action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getYoutubeRemoveSuccess(response.data));
    } else {
      yield put(getYoutubeRemoveSuccess(response.data));
    }
  } catch (error) {
    yield put(getYoutubeRemoveFaliure(error));
  }
}

export function* instagramUserRemoveSaga(action) {
  const items = yield select(getItems);
  console.log({'the token is': items.token});

  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    authorization: items.token,
  };
  try {
    let response = yield call(getApi, 'RemoveInsta?' + action?.payload, Header);
    console.log(response);
    if (response.data.success == 1) {
      yield put(getInstagramRemoveSuccess(response.data));
    } else {
      yield put(getInstagramRemoveSuccess(response.data));
    }
  } catch (error) {
    yield put(getInstagramRemoveFaliure(error));
  }
}

export function* getAccountVerificationUserSaga(action) {
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
      'GetAccountVerification?' + action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getAccountVerificationSuccess(response.data));
    } else {
      yield put(getAccountVerificationFaliure(response.data));
    }
  } catch (error) {
    yield put(getAccountVerificationFaliure(error));
  }
}

export function* notificationSaga(action) {
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
      'CreatorNotification?' + action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getNotificationSuccess(response.data));
    } else {
      yield put(getNotificationSuccess(response.data));
    }
  } catch (error) {
    yield put(getNotificationFaliure(error));
  }
}

export function* pushnotificationupdateSaga(action) {
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
      'AddEditNotificationSettings',
      action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getNotificationUpdateSuccess(response.data));
    } else {
      yield put(getNotificationUpdateSuccess(response.data));
    }
  } catch (error) {
    yield put(getNotificationUpdateFaliure(error));
  }
}

export function* pushnotificationdetailsSaga(action) {
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
      'GetNotificationSettings?' + action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getNotificationDetailsSuccess(response.data));
    } else {
      yield put(getNotificationDetailsSuccess(response.data));
    }
  } catch (error) {
    yield put(getNotificationDetailsFaliure(error));
  }
}

export function* pushnotificationreadSaga(action) {
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
      'Read?' + action?.payload,
      Header,
    );
    console.log(response);
    if (response.data.success == 1) {
      yield put(getNotificationReadSuccess(response.data));
    } else {
      yield put(getNotificationReadSuccess(response.data));
    }
  } catch (error) {
    yield put(getNotificationReadFaliure(error));
  }
}

// export function* saveBankSaga(action) {
//   const items = yield select(getItems);
//   console.log({'the token is': items.token});

//   const Header = {
//     Accept: 'application/json',
//     contenttype: 'application/json',
//     authorization: items.token,
//   };
//   try {
//     let response = yield call(
//       postApi,
//       'SaveKYCResult', action?.payload,
//       Header,
//     );
//     console.log(response);
//     if (response.data.success == 1) {
//       yield put(getPanSuccess(response.data.result));
//     } else {
//       yield put(getPanSuccess(response.data.result));
//     }
//   } catch (error) {
//     yield put(getPanFailure(error));
//   }
// }

const watchFunction = [
  (function* () {
    yield takeLatest('Profile/addAddressRequest', addAddressSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/updateAddressRequest', updateAddressSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/getAddressRequest', getAddressSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/addCommercialRequest', addCommercialSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/updateCommercialRequest', updateCommercialSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/getCommercialRequest', getCommercialSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/getInitSessionRequest', getAadhaarinitSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/getAadhaarCaptchaRequest', getAadCapVfySaga);
  })(),
  (function* () {
    yield takeLatest('Profile/getAadhaarOtpRequest', getAadharOtpSaga);
  })(),
  (function* () {
    yield takeLatest(
      'Profile/getAadhaarVerifyOtpRequest',
      getAadharOtpVerifySaga,
    );
  })(),
  (function* () {
    yield takeLatest('Profile/getSaveAadhaarRequest', saveContentAadhaarSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/getAadhaarRequest', getAadhaarDetailSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/getPanVerifyRequest', getPanVerifySaga);
  })(),
  (function* () {
    yield takeLatest('Profile/getPanRequest', getPanSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/getGstVerifyRequest', getGstVerifySaga);
  })(),
  (function* () {
    yield takeLatest('Profile/getGstRequest', getGstSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/getBankVerifyRequest', getBankVerifySaga);
  })(),
  (function* () {
    yield takeLatest('Profile/getBankRequest', getBankSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/getMasterContactusRequest', getMasterContactSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/getContactusRequest', addContactusSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/getYoutubeDetailRequest', youtubeDetailsSaga);
  })(),
  (function* () {
    yield takeLatest(
      'Profile/getYoutubeUserDetailRequest',
      youtubeUserDetailsSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'Profile/getInstagramUserDetailRequest',
      instagramUserDetailsSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'Profile/getInstagramDetailRequest',
      addinstagramUserDetailsSaga,
    );
  })(),
  (function* () {
    yield takeLatest('Profile/getYoutubeRemoveRequest', youtubeUserRemoveSaga);
  })(),
  (function* () {
    yield takeLatest(
      'Profile/getInstagramRemoveRequest',
      instagramUserRemoveSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'Profile/getAccountVerificationRequest',
      getAccountVerificationUserSaga,
    );
  })(),
  (function* () {
    yield takeLatest('Profile/getNotificationRequest', notificationSaga);
  })(),
  (function* () {
    yield takeLatest(
      'Profile/getNotificationUpdateRequest',
      pushnotificationupdateSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'Profile/getNotificationReadRequest',
      pushnotificationreadSaga,
    );
  })(),
  (function* () {
  (function* () {
    yield takeLatest(
      'Profile/getNotificationUpdateRequest',
      pushnotificationupdateSaga,
    );
  })(),
    yield takeLatest(
      'Profile/getNotificationDetailsRequest',
      pushnotificationdetailsSaga,
    );
  })(),
];

export default watchFunction;
