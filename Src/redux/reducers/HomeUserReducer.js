import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  token: null,
  creatorID: null,
  isLoading: true,
  error: {},
  homeResponse: {},
  collaborationResponse: {},
  productResponse: {},
  learnResponse:{},
  filterResponse:{},
  barterfilterResponse:{},
  collabSelectResponse:undefined,
};

const HomeSlice = createSlice({
  name: 'homeCollab',
  initialState,
  reducers: {
    getHomeRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getHomeSuccess(state, action) {
      console.log('ok', action.payload);
      state.isLoading = false;
      state.homeResponse = action.payload;
      state.status = action.type;
    },
    getHomeFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    getHomeCollaborationRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getHomeCollaborationSuccess(state, action) {
      console.log('ok', action.payload);
      state.isLoading = false;
      state.collaborationResponse=action.payload;
      state.status = action.type;
    },
    getHomeCollaborationFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    getBarterRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getBarterSuccess(state, action) {
      console.log('ok', action.payload);
      state.isLoading = false;
      state.productResponse=action.payload;
      state.status = action.type;
    },
    getBarterFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
    
    getSelectRequest(state, action) {
      console.log('ok', action.payload);
      state.collabSelectResponse=action.payload;
    },
    getSelectSuccess(state, action) {
      console.log('ok', action.payload);
      state.collabSelectResponse=action.payload;
    },

    //Filter

    getFilterRequest(state, action) {
      state.status = action.type;
    },
    getFilterSuccess(state, action) {
      state.filterResponse = action.payload;
      state.status = action.type;
    },
    getFilterFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Barter filter

    getBarterFilterRequest(state, action) {
      state.status = action.type;
    },
    getBarterFilterSuccess(state, action) {
      state.barterfilterResponse = action.payload;
      state.status = action.type;
    },
    getBarterFilterFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //logout
    logoutRequest(state, action) {
      state.status = action.type;
    },
    logoutSuccess(state, action) {
      state.logoutResponse = action.payload;
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
  getHomeRequest,
  getHomeSuccess,
  getHomeFailure,
  getHomeCollaborationRequest,
  getHomeCollaborationSuccess,
  getHomeCollaborationFailure,
  getBarterRequest,
  getBarterSuccess,
  getBarterFailure,
  getSelectRequest,
  getSelectSuccess,
  getFilterRequest,
  getFilterSuccess,
  getFilterFailure,
  getBarterFilterRequest,
  getBarterFilterSuccess,
  getBarterFilterFailure,
  
} = HomeSlice.actions;

export default HomeSlice.reducer;
