import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  token: null,
  creatorID: null,
  isLoading: true,
  error: {},
  inviteResponse: {},
  inviteDetailsResponse: {},
  offerResponse: {},
  activeDetailsResponse:{},
  completedResponse: {},
  inviteAcceptResponse: {},
  uploadImageResponse:{},
  signImageResponse:{},
  deleteImageResponse:{},
};

const CollaborationSlice = createSlice({
  name: 'collaboration',
  initialState,
  reducers: {
    //Token

    getInviteDetailsRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getInviteDetailsSuccess(state, action) {
      console.log('ok', action.payload);
      state.isLoading = false;
      state.inviteDetailsResponse = action.payload;
      state.status = action.type;
    },
    getInviteDetailsFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    getInviteRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getInviteSuccess(state, action) {
      console.log('ok', action.payload);
      state.isLoading = false;
      state.inviteResponse = action.payload;
      state.status = action.type;
    },
    getInviteFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    //Collaboration active 
    getActiveDetailsRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getActiveDetailsSuccess(state, action) {
      console.log('ok', action.payload);
      state.isLoading = false;
      state.activeDetailsResponse = action.payload;
      state.status = action.type;
    },
    getActiveDetailsFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    getInviteCollaboRequest(state, action) {
      state.status = action.type;
    },
    getInviteCollaboSuccess(state, action) {
      state.inviteAcceptResponse = action.payload;
      state.status = action.type;
    },
    getInviteCollaboFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    getUploadImageRequest(state, action) {
      state.status = action.type;
    },
    getUploadImageSuccess(state, action) {
      state.uploadImageResponse = action.payload;
      state.status = action.type;
    },
    getUploadImageFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    getSignImageRequest(state, action) {
      state.status = action.type;
    },
    getSignImageSuccess(state, action) {
      state.signImageResponse = action.payload;
      state.status = action.type;
    },
    getSignImageFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    getDeleteImageRequest(state, action) {
      state.status = action.type;
    },
    getDeleteImageSuccess(state, action) {
      state.deleteImageResponse = action.payload;
      state.status = action.type;
    },
    getDeleteImageFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Collaboration active inprogress
    uploadContentRequest(state, action) {
      state.status = action.type;
    },
    uploadContentSuccess(state, action) {
      state.uploadContentResponse = action.payload;
      state.status = action.type;
    },
    uploadContentFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    updateContentRequest(state, action) {
      state.status = action.type;
    },
    updateContentSuccess(state, action) {
      state.updateContentHubResponse = action.payload;
      state.status = action.type;
    },
    updateContentFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    getUploadContentHubRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    getUploadContentHubSuccess(state, action) {
      state.contentHubResponse = action.payload;
      state.status = action.type;
      state.isLoading = false;
    },
    getUploadContentHubFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
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
      state.isLoading = false;
    },
    getLaunageFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
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
    
    getAcceptOfferRequest(state, action) {
      state.status = action.type;
    },
    getAcceptOfferSuccess(state, action) {
      state.status = action.type;
      state.acceptResponse = action.payload;
    },
    getAcceptOfferFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    
    getRejectOfferRequest(state, action) {
      state.status = action.type;
    },
    getRejectOfferSuccess(state, action) {
      state.status = action.type;
      state.rejectResponse = action.payload;
    },
    getRejectOfferFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    getContentLabSendRequest(state, action) {
      state.status = action.type;
    },
    getContentLabSendSuccess(state, action) {
      state.blogsgetResponse = action.payload;
      state.status = action.type;
    },
    getContentLabSendFailure(state, action) {
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
  getInviteDetailsRequest,
  getInviteDetailsSuccess,
  getInviteDetailsFailure,

  getInviteRequest,
  getInviteSuccess,
  getInviteFailure,

  getActiveDetailsRequest,
  getActiveDetailsSuccess,
  getActiveDetailsFailure,

  getInviteCollaboRequest,
  getInviteCollaboSuccess,
  getInviteCollaboFailure,

  getUploadImageRequest,
  getUploadImageSuccess,
  getUploadImageFailure,

  getDeleteImageRequest,
  getDeleteImageSuccess,
  getDeleteImageFailure,

  getSignImageRequest,
  getSignImageSuccess,
  getSignImageFailure,

  uploadContentRequest,
  uploadContentSuccess,
  uploadContentFailure,
  
  updateContentRequest,
  updateContentSuccess,
  updateContentFailure,
  
  getUploadContentHubRequest,
  getUploadContentHubSuccess,
  getUploadContentHubFailure,

  getAcceptOfferRequest,
  getAcceptOfferSuccess,
  getAcceptOfferFailure,
  
  getRejectOfferRequest,
  getRejectOfferSuccess,
  getRejectOfferFailure,
  
  getBlogsRequest,
  getBlogsSuccess,
  getBlogsFailure,
  
} = CollaborationSlice.actions;

export default CollaborationSlice.reducer;
