import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  token: null,
  signup: null,
  profile: null,
  social: null,
  creatorID: null,
  isLoading: true,
  error: {},
  SignInResponse: {},
  signUpResponse: {},
  tokenResponse: {},
  forgotpasswordResponse: {},
  otpSendResponse: {},
  otpVerifyResponse: {},
  privacyResponse: {},
  resendotpSendResponse: {},
  changePasswordResponse: {},
  logoutResponse: {},
  profileResponse: {},
  locationResponse: {},
  stateResponse: {},
  deleteAccResponse: {},
  subcrIAPResp: {},
  subcrIAPDateResp: {},
  signupLocalResponse: {},
  profileLocalResponse: {},
  signupLocalgetResponse: {},
  launageResponse: {},
  nicheResponse: {},
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    //Token

    getTokenRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getTokenSuccess(state, action) {
      console.log('ok', action.payload);
      state.isLoading = false;
      state.token = action.payload?.accessToken??null;
      state.signup = action.payload?.signup??null;
      state.profile = action.payload?.profile??null;
      state.social = action.payload?.social??null;
      state.creatorID = action?.payload?.creatorID??null;
      state.status = action.type;
    },
    getTokenFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    setTokenRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    setTokenSuccess(state, action) {
      console.log('ok 66', action.payload);
      state.isLoading = false;
      state.token = action.payload.accessToken??null;
      state.signup = action.payload.signup??null;
      state.profile = action.payload.profile??null;
      state.social = action.payload.social??null;
      state.creatorID = action.payload.creatorID??null;
      state.status = action.type;
    },
    setTokenFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    setUpdaterRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
      state.social = action.payload.social?? null;
    },
    
    //login
    SignInRequest(state, action) {
      state.status = action.type;
    },
    SignInSuccess(state, action) {
      state.SignInResponse = action.payload;
      state.status = action.type;
    },
    SignInFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Register

    signUpRequest(state, action) {
      state.status = action.type;
    },
    signUpSuccess(state, action) {
      state.signUpResponse = action.payload;
      state.status = action.type;
    },
    signUpFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //forgot Password

    forgotpasswordRequest(state, action) {
      state.status = action.type;
    },
    forgotpasswordSuccess(state, action) {
      state.forgotpasswordResponse = action.payload;
      state.status = action.type;
    },
    forgotpasswordFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //logout
    logoutRequest(state, action) {
      state.status = action.type;
    },
    logoutSuccess(state, action) {
      state.logoutResponse = action.payload;
      state.userResponse = action.payload;
      state.status = action.type;
      state.token = null;
    },
    logoutFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //otpsend
    otpSendRequest(state, action) {
      state.status = action.type;
    },
    otpSendSuccess(state, action) {
      state.otpSendResponse = action.payload;
      state.status = action.type;
    },
    otpSendFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //otpsend
    otpVerifyRequest(state, action) {
      state.status = action.type;
    },
    otpVerifySuccess(state, action) {
      state.otpVerifyResponse = action.payload;
      state.status = action.type;
    },
    otpVerifyFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    profileRequest(state, action) {
      state.status = action.type;
    },
    profileSuccess(state, action) {
      state.profileResponse = action.payload;
      state.status = action.type;
    },
    profileFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    locationRequest(state, action) {
      state.status = action.type;
      state.isLoading=true;
    },
    locationSuccess(state, action) {
      state.locationResponse = action.payload;
      state.status = action.type;
      state.isLoading=false;
    },
    locationFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
      state.isLoading=false;
    },
    
    stateRequest(state, action) {
      state.status = action.type;
    },
    stateSuccess(state, action) {
      state.stateResponse = action.payload;
      state.status = action.type;
    },
    stateFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    citiesRequest(state, action) {
      state.status = action.type;
    },
    citiesSuccess(state, action) {
      state.citesResponse = action.payload;
      state.status = action.type;
    },
    citiesFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    signuplocalRequest(state, action) {
      state.status = action.type;
      state.signupLocalResponse = action.payload;
    },

    profilelocalRequest(state, action) {
      state.status = action.type;
      state.profileLocalResponse = action.payload;
    },

    getLaunageRequest(state, action) {
      state.status = action.type;
    },
    getLaunageSuccess(state, action) {
      state.status = action.type;
      state.launageResponse = action.payload;
      state.isLoading=false;
    },
    getLaunageFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
      state.isLoading=false;
    },
    

    getNicheRequest(state, action) {
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

    //device token
    deviceTokenRequest(state, action) {
      state.status = action.type;
    },
    deviceTokenSuccess(state, action) {
      state.tokenResponse = action.payload;
      state.status = action.type;
    },
    deviceTokenFaliure(state, action) {
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

    //delete account
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

    otpSendEmailRequest(state, action) {
      state.status = action.type;
    },
    otpSendEmailSuccess(state, action) {
      state.otpEmailResponse = action.payload;
      state.status = action.type;
      state.token = null;
    },
    otpSendEmailFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    otpVerifyEmailRequest(state, action) {
      state.status = action.type;
    },
    otpVerifyEmailSuccess(state, action) {
      state.otpVerifyEmailResponse = action.payload;
      state.status = action.type;
      state.token = null;
    },
    otpVerifyEmailFailure(state, action) {
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
  getTokenRequest,
  getTokenSuccess,
  getTokenFailure,
  setTokenRequest,
  setTokenSuccess,
  setTokenFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  signuplocalRequest,
  profilelocalRequest,
  SignInRequest,
  SignInSuccess,
  SignInFailure,
  getLaunageRequest,
  getLaunageSuccess,
  getLaunageFailure,
  getNicheRequest,
  getNicheSuccess,
  getNicheFailure,

  locationRequest,
  locationSuccess,
  locationFailure,

  stateRequest,
  stateSuccess,
  stateFailure,
  
  citiesRequest,
  citiesSuccess,
  citiesFailure,
  
  forgotpasswordRequest,
  forgotpasswordSuccess,
  forgotpasswordFailure,

  logoutRequest,
  logoutSuccess,
  logoutFailure,

  otpSendRequest,
  otpSendSuccess,
  otpSendFailure,
  otpVerifyRequest,
  otpVerifySuccess,
  otpVerifyFailure,

  otpSendEmailRequest,
  otpSendEmailSuccess,
  otpSendEmailFailure,

  otpVerifyEmailRequest,
  otpVerifyEmailSuccess,
  otpVerifyEmailFailure,

  setUpdaterRequest,

  privacyRequest,
  privacySuccess,
  privacyFaliure,
  resendOtpRequest,
  resendOtpSuccess,
  resendOtpFaliures,
  profileRequest,
  profileSuccess,
  profileFailure,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFaliure,
  deleteAccRequest,
  deleteAccSuccess,
  deleteAccFailure,
  deviceTokenRequest,
  deviceTokenSuccess,
  deviceTokenFaliure,
  subcrIAPRequest,
  subcrIAPSuccess,
  subcrIAPFailure,
  subcrIAPDateRequest,
  subcrIAPDateSuccess,
  subcrIAPDateFailure,
} = AuthSlice.actions;

export default AuthSlice.reducer;
