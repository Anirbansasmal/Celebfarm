import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  token: null,
  creatorID: null,
  isLoading: true,
  error: {},
  contentLabResponse: {},
  contentLabEditResponse: {},
  contentLabAllResponse: {},
  contentLabAcceptResponse: {},
  contentLabRejectResponse: {},
  contentLabSendResponse: {},
};

const AuthSlice = createSlice({
  name: 'contentLab',
  initialState,
  reducers: {
    //Token

    getContentLabRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getContentLabSuccess(state, action) {
      console.log('ok', action.payload);
      state.isLoading = false;
      state.contentLabResponse = action.payload;
      state.status = action.type;
    },
    getContentLabFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    getContentLabEditRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getContentLabEditSuccess(state, action) {
      console.log('ok', action.payload);
      state.isLoading = false;
      state.contentLabEditResponse=action.payload;
      state.status = action.type;
    },
    getContentLabEditFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    //login
    getContentLabAllRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getContentLabAllSuccess(state, action) {
      console.log('ok', action.payload);
      state.isLoading = false;
      state.contentLabAllResponse=action.payload;
      state.status = action.type;
    },
    getContentLabAllFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    getAcceptContentLabOfferRequest(state, action) {
      state.status = action.type;
    },
    getAcceptContentLabOfferSuccess(state, action) {
      state.status = action.type;
      state.contentLabAcceptResponse = action.payload;
    },
    getAcceptContentLabOfferFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    
    getRejectContentLabOfferRequest(state, action) {
      state.status = action.type;
    },
    getRejectContentLabOfferSuccess(state, action) {
      state.status = action.type;
      state.contentLabRejectResponse = action.payload;
    },
    getRejectContentLabOfferFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    
    getSendContentLabOfferRequest(state, action) {
      state.status = action.type;
    },
    getSendContentLabOfferSuccess(state, action) {
      state.status = action.type;
      state.contentLabSendResponse = action.payload;
    },
    getSendContentLabOfferFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    getPaymentRequest(state, action) {
      state.status = action.type;
    },
    getPaymentSuccess(state, action) {
      state.status = action.type;
      state.paymentResponse = action.payload;
    },
    getPayementFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    
  },
});

export const {
  getContentLabRequest,
  getContentLabSuccess,
  getContentLabFailure,
  
  getContentLabEditRequest,
  getContentLabEditSuccess,
  getContentLabEditFailure,
  
  getContentLabAllRequest,
  getContentLabAllSuccess,
  getContentLabAllFailure,
  
  getAcceptContentLabOfferRequest,
  getAcceptContentLabOfferSuccess,
  getAcceptContentLabOfferFailure,

  getRejectContentLabOfferRequest,
  getRejectContentLabOfferSuccess,
  getRejectContentLabOfferFailure,

  getSendContentLabOfferRequest,
  getSendContentLabOfferSuccess,
  getSendContentLabOfferFailure,

  getPaymentRequest,
  getPaymentSuccess,
  getPayementFailure,

} = AuthSlice.actions;

export default AuthSlice.reducer;
