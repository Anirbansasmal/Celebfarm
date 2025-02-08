import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  isLoading: true,
  error: {},
  userResponse: {},
  userEditResponse: {},
};

const AuthSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    getUserRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getUserSuccess(state, action) {
      console.log('ok', action.payload);
      state.isLoading = false;
      state.userResponse = action.payload;
      state.status = action.type;
    },
    getUserFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    getEditRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getEditSuccess(state, action) {
      console.log('ok 36', action.payload);
      state.isLoading = false;
      state.userEditResponse=action.payload;
      state.status = action.type;
    },
    getEditFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    otpSendEditEmailRequest(state, action) {
      state.status = action.type;
    },
    otpSendEditEmailSuccess(state, action) {
      state.otpEditEmailResponse = action.payload;
      state.status = action.type;
      state.token = null;
    },
    otpSendEditEmailFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    getEditEmailRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getEditEmailSuccess(state, action) {
      console.log('ok 36', action.payload);
      state.isLoading = false;
      state.userEditEmailResponse=action.payload;
      state.status = action.type;
    },
    getEditEmailFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    getotpVerifyEmailRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getotpVerifyEmailSuccess(state, action) {
      console.log('ok 36', action.payload);
      state.isLoading = false;
      state.userotpVerifyEmailResponse=action.payload;
      state.status = action.type;
    },
    getotpVerifyEmailFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    getEditImageRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getEditImageSuccess(state, action) {
      console.log('ok', action.payload);
      state.isLoading = false;
      state.userEditImageResponse=action.payload;
      state.status = action.type;
    },
    getEditImageFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

  },
});

export const {
  getUserRequest,
  getUserSuccess,
  getUserFailure,
  
  getEditRequest,
  getEditSuccess,
  getEditFailure,

  getEditImageRequest,
  getEditImageSuccess,
  getEditImageFailure,
  
  otpSendEditEmailRequest,
  otpSendEditEmailSuccess,
  otpSendEditEmailFailure,

  getEditEmailRequest,
  getEditEmailSuccess,
  getEditEmailFailure,
  
  getotpVerifyEmailRequest,
  getotpVerifyEmailSuccess,
  getotpVerifyEmailFailure,
  
} = AuthSlice.actions;

export default AuthSlice.reducer;
