import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  isLoading: true,
  error: {},
  addCommercialResponse: {},
  commercialResponse: {},
  updateCommercialResponse: {},
  addAddressResponse: {},
  addressResponse: {},
  updateAddressResponse: {},
  initSessionResponse: {},
  aadhaarCaptchaResponse: {},
  aadhaarOtpResponse: {},
  panVerifyResponse: {},
  savePanResponse: {},
  gstVerifyResponse: {},
  gstResponse: {},
  savedbankResponse: {},
  bankVerifyResponse: {},
  aadhaarResponse: {},
  contactResponse: {},
  mastercontactResponse: {},
  notificationIsNewResponse:{},
};

const ProfileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    //Address add

    addCommercialRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    addCommercialSuccess(state, action) {
      console.log('ok', action.payload);
      state.isLoading = false;
      state.addCommercialResponse = action.payload;
      state.status = action.type;
    },
    addCommercialFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    getCommercialRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getCommercialSuccess(state, action) {
      console.log('ok', action.payload);
      state.isLoading = false;
      state.commercialResponse = action.payload;
      state.status = action.type;
    },
    getCommercialFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    updateCommercialRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    updateCommercialSuccess(state, action) {
      state.isLoading = false;
      state.updateCommercialResponse = action.payload;
      state.status = action.type;
    },
    updateCommercialFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Address add

    addAddressRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    addAddressSuccess(state, action) {
      console.log('ok', action.payload);
      state.isLoading = false;
      state.addAddressResponse = action.payload;
      state.status = action.type;
    },
    addAddressFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    getAddressRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getAddressSuccess(state, action) {
      console.log('ok', action.payload);
      state.isLoading = false;
      state.addressResponse = action.payload;
      state.status = action.type;
    },
    getAddressFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    updateAddressRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    updateAddressSuccess(state, action) {
      state.isLoading = false;
      state.updateAddressResponse = action.payload;
      state.status = action.type;
    },
    updateAddressFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Aadhaar
    getInitSessionRequest(state, action) {
      state.status = action.type;
    },
    getInitSessionSuccess(state, action) {
      state.initSessionResponse = action.payload;
      state.status = action.type;
    },
    getInitSessionFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    getAadhaarCaptchaRequest(state, action) {
      state.status = action.type;
    },
    getAadhaarCaptchaSuccess(state, action) {
      state.aadhaarCaptchaResponse = action.payload;
      state.status = action.type;
    },
    getAadhaarCaptchaFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    getAadhaarOtpRequest(state, action) {
      state.status = action.type;
    },
    getAadhaarOtpSuccess(state, action) {
      state.aadhaarOtpResponse = action.payload;
      state.status = action.type;
      state.token = null;
    },
    getAadhaarOtpFailure(state, action) {
      state.error = action.payload;
      state.status = action.type;
    },

    getAadhaarVerifyOtpRequest(state, action) {
      state.status = action.type;
    },
    getAadhaarVerifyOtpSuccess(state, action) {
      state.verifyotpResponse = action.payload;
      state.status = action.type;
    },
    getAadhaarVerifyOtpFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    getSaveAadhaarRequest(state, action) {
      state.status = action.type;
    },
    getSaveAadhaarSuccess(state, action) {
      state.saveAadhaarResponse = action.payload;
      state.status = action.type;
    },
    getSaveAadhaarFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    getAadhaarRequest(state, action) {
      state.status = action.type;
    },
    getAadhaarSuccess(state, action) {
      state.aadhaarResponse = action.payload;
      state.status = action.type;
    },
    getAadhaarFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Pan verify
    getPanVerifyRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    getPanVerifySuccess(state, action) {
      state.status = action.type;
      state.panVerifyResponse = action.payload;
      state.isLoading = false;
    },
    getPanVerifyFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
    },

    getPanRequest(state, action) {
      state.status = action.type;
    },
    getPanSuccess(state, action) {
      state.getPanResponse = action.payload;
      state.status = action.type;
    },
    getPanFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Bank verify
    getBankRequest(state, action) {
      state.status = action.type;
    },
    getBankSuccess(state, action) {
      state.status = action.type;
      state.savedbankResponse = action.payload;
    },
    getBankFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    getBankVerifyRequest(state, action) {
      state.status = action.type;
      state.isLoading = false;
    },
    getBankVerifySuccess(state, action) {
      state.status = action.type;
      state.bankVerifyResponse = action.payload;
    },
    getBankVerifyFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    getGstVerifyRequest(state, action) {
      state.status = action.type;
      state.isLoading = false;
    },
    getGstVerifySuccess(state, action) {
      state.error = action.error;
      state.status = action.type;
      state.gstVerifyResponse = action.payload;
      state.isLoading = false;
    },
    getGstVerifyFailure(state, action) {
      state.error = action.error;
      state.gstVerifyResponse = action.payload;
      state.status = action.type;
    },

    getGstRequest(state, action) {
      state.status = action.type;
      state.isLoading = false;
    },
    getGstSuccess(state, action) {
      state.error = action.error;
      state.gstResponse = action.payload;
      state.isLoading = false;
    },
    getGstFailure(state, action) {
      state.error = action.error;
      state.gstResponse = action.payload;
      state.status = action.type;
    },

    getNicheSuccess(state, action) {
      state.status = action.type;
      state.nicheResponse = action.payload;
    },
    getNicheFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    signuplocalgetRequest(state, action) {
      state.status = action.type;
    },
    signuplocalgetSuccess(state, action) {
      state.signupLocalgetResponse = action.payload;
      state.status = action.type;
    },
    signuplocalgetFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //resendOtp
    resendOtpRequest(state, action) {
      state.status = action.type;
    },
    resendOtpSuccess(state, action) {
      state.resendotpSendResponse = action.payload;
      state.status = action.type;
    },
    resendOtpFaliure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //changePassword

    changePasswordRequest(state, action) {
      state.status = action.type;
    },
    changePasswordSuccess(state, action) {
      state.changePasswordResponse = action.payload;
      state.status = action.type;
    },
    changePasswordFaliure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //privacyPolicy
    privacyRequest(state, action) {
      state.status = action.type;
    },
    privacySuccess(state, action) {
      state.privacyResponse = action.payload;
      state.status = action.type;
    },
    privacyFaliure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //contactus
    getContactusRequest(state, action) {
      state.status = action.type;
    },
    getContactusSuccess(state, action) {
      state.contactResponse = action.payload;
      state.status = action.type;
    },
    getContactusFaliure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Master contact
    getMasterContactusRequest(state, action) {
      state.status = action.type;
    },
    getMasterContactusSuccess(state, action) {
      state.mastercontactResponse = action.payload;
      state.status = action.type;
    },
    getMasterContactusFaliure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Add Youtube Detail
    getYoutubeDetailRequest(state, action) {
      state.status = action.type;
    },
    getYoutubeDetailSuccess(state, action) {
      state.youtubeaddResponse = action.payload;
      state.status = action.type;
    },
    getYoutubeDetailFaliure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Add Youtube Detail
    getInstagramDetailRequest(state, action) {
      state.status = action.type;
    },
    getInstagramDetailSuccess(state, action) {
      state.instagramaddResponse = action.payload;
      state.status = action.type;
    },
    getInstagramDetailFaliure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Remove Youtube
    getYoutubeRemoveRequest(state, action) {
      state.status = action.type;
    },
    getYoutubeRemoveSuccess(state, action) {
      state.youtuberemoveResponse = action.payload;
      state.status = action.type;
    },
    getYoutubeRemoveFaliure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Remove Youtube
    getInstagramRemoveRequest(state, action) {
      state.status = action.type;
    },
    getInstagramRemoveSuccess(state, action) {
      state.instagramremoveResponse = action.payload;
      state.status = action.type;
    },
    getInstagramRemoveFaliure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //user Youtube Detail
    getInstagramUserDetailRequest(state, action) {
      state.status = action.type;
    },
    getInstagramUserDetailSuccess(state, action) {
      state.instagramuserResponse = action.payload;
      state.status = action.type;
    },
    getInstagramUserDetailFaliure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //user Youtube Detail
    getYoutubeUserDetailRequest(state, action) {
      state.status = action.type;
    },
    getYoutubeUserDetailSuccess(state, action) {
      state.youtubeuserResponse = action.payload;
      state.status = action.type;
    },
    getYoutubeUserDetailFaliure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //user notification Detail
    getNotificationRequest(state, action) {
      state.status = action.type;
    },
    getNotificationSuccess(state, action) {
      state.notificationResponse = action.payload;
      state.status = action.type;
    },
    getNotificationFaliure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //user notification Detail
    getNotificationUpdateRequest(state, action) {
      state.status = action.type;
    },
    getNotificationUpdateSuccess(state, action) {
      state.notificationUpdateResponse = action.payload;
      state.status = action.type;
    },
    getNotificationUpdateFaliure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //user notification Detail
    getNotificationReadRequest(state, action) {
      state.status = action.type;
    },
    getNotificationReadSuccess(state, action) {
      state.notificationReadResponse = action.payload;
      state.status = action.type;
    },
    getNotificationReadFaliure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    getNotificationDetailsRequest(state, action) {
      state.status = action.type;
    },
    getNotificationDetailsSuccess(state, action) {
      state.notificationDetailsResponse = action.payload;
      state.status = action.type;
    },
    getNotificationDetailsFaliure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    getNotificationIsNewRequest(state, action) {
      state.status = action.type;
      state.notificationIsNewResponse = action.payload;
    },
    getNotificationIsNewSuccess(state, action) {
      state.status = action.type;
      // state.notificationIsNewResponse = action.payload;
    },

    getAccountVerificationRequest(state, action) {
      state.status = action.type;
    },
    getAccountVerificationSuccess(state, action) {
      state.status = action.type;
      state.getVerificationResponse = action.payload;
    },
    getAccountVerificationFaliure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //logout
    deleteAccRequest(state, action) {
      state.status = action.type;
    },
    deleteAccSuccess(state, action) {
      state.deleteAccResponse = action.payload;
      state.status = action.type;
      state.token = null;
    },
    deleteAccFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //subcription data

    subcrIAPRequest(state, action) {
      state.status = action.type;
    },
    subcrIAPSuccess(state, action) {
      state.subcrIAPResp = action.payload;
      state.status = action.type;
    },
    subcrIAPFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //subcription Date

    subcrIAPDateRequest(state, action) {
      state.status = action.type;
    },
    subcrIAPDateSuccess(state, action) {
      state.subcrIAPDateResp = action.payload;
      state.status = action.type;
    },
    subcrIAPDateFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
  },
});
export const {
  addAddressRequest,
  addAddressSuccess,
  addAddressFailure,

  getAddressRequest,
  getAddressSuccess,
  getAddressFailure,

  updateAddressRequest,
  updateAddressSuccess,
  updateAddressFailure,

  addCommercialRequest,
  addCommercialSuccess,
  addCommercialFailure,

  getCommercialRequest,
  getCommercialSuccess,
  getCommercialFailure,

  updateCommercialRequest,
  updateCommercialSuccess,
  updateCommercialFailure,

  getInitSessionRequest,
  getInitSessionSuccess,
  getInitSessionFailure,

  getAadhaarCaptchaRequest,
  getAadhaarCaptchaSuccess,
  getAadhaarCaptchaFailure,

  getAadhaarOtpRequest,
  getAadhaarOtpSuccess,
  getAadhaarOtpFailure,

  getAadhaarVerifyOtpRequest,
  getAadhaarVerifyOtpSuccess,
  getAadhaarVerifyOtpFailure,

  getSaveAadhaarRequest,
  getSaveAadhaarSuccess,
  getSaveAadhaarFailure,

  getAadhaarRequest,
  getAadhaarSuccess,
  getAadhaarFailure,

  getPanVerifyRequest,
  getPanVerifySuccess,
  getPanVerifyFailure,

  getPanRequest,
  getPanSuccess,
  getPanFailure,

  getBankVerifyRequest,
  getBankVerifySuccess,
  getBankVerifyFailure,

  getGstVerifyRequest,
  getGstVerifySuccess,
  getGstVerifyFailure,

  getGstRequest,
  getGstSuccess,
  getGstFailure,

  getBankRequest,
  getBankSuccess,
  getBankFailure,

  getContactusRequest,
  getContactusSuccess,
  getContactusFaliure,

  getMasterContactusRequest,
  getMasterContactusSuccess,
  getMasterContactusFaliure,

  getYoutubeDetailRequest,
  getYoutubeDetailSuccess,
  getYoutubeDetailFaliure,

  getInstagramDetailRequest,
  getInstagramDetailSuccess,
  getInstagramDetailFaliure,

  getInstagramUserDetailRequest,
  getInstagramUserDetailSuccess,
  getInstagramUserDetailFaliure,

  getYoutubeRemoveRequest,
  getYoutubeRemoveSuccess,
  getYoutubeRemoveFaliure,

  getInstagramRemoveRequest,
  getInstagramRemoveSuccess,
  getInstagramRemoveFaliure,

  getAccountVerificationRequest,
  getAccountVerificationSuccess,
  getAccountVerificationFaliure,

  getYoutubeUserDetailRequest,
  getYoutubeUserDetailSuccess,
  getYoutubeUserDetailFaliure,

  getNotificationRequest,
  getNotificationSuccess,
  getNotificationFaliure,

  getNotificationReadRequest,
  getNotificationReadSuccess,
  getNotificationReadFaliure,

  getNotificationUpdateRequest,
  getNotificationUpdateSuccess,
  getNotificationUpdateFaliure,

  getNotificationDetailsRequest,
  getNotificationDetailsSuccess,
  getNotificationDetailsFaliure,
  
  getNotificationIsNewRequest,
  getNotificationIsNewSuccess,

  // getNicheSuccess,
  // getNicheFailure,
  // locationRequest,
  // locationSuccess,
  // locationFailure,
  // stateRequest,
  // stateSuccess,
  // stateFailure,
  // forgotpasswordRequest,
  // forgotpasswordSuccess,
  // forgotpasswordFailure,
  // logoutRequest,
  // logoutSuccess,
  // logoutFailure,
  // otpSendRequest,
  // otpSendSuccess,
  // otpSendFailure,
  // otpVerifyRequest,
  // otpVerifySuccess,
  // otpVerifyFailure,
  // privacyRequest,
  // privacySuccess,
  // privacyFaliure,
  // resendOtpRequest,
  // resendOtpSuccess,
  // resendOtpFaliures,
  // profileRequest,
  // profileSuccess,
  // profileFailure,
  // changePasswordRequest,
  // changePasswordSuccess,
  // changePasswordFaliure,
  // deleteAccRequest,
  // deleteAccSuccess,
  // deleteAccFailure,
  // subcrIAPRequest,
  // subcrIAPSuccess,
  // subcrIAPFailure,
  // subcrIAPDateRequest,
  // subcrIAPDateSuccess,
  // subcrIAPDateFailure,
} = ProfileSlice.actions;

export default ProfileSlice.reducer;
