import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  creatorID: null,
  isLoading: true,
  error: {},
  barterRequestedResponse: {},
  barterExploreResponse: {},
  barterDetailsResponse: {},
  barterExploreAcceptResponse: {},
};

const BaterSlice = createSlice({
  name: 'barter',
  initialState,
  reducers: {
    //Barter requested

    getBarterRequestedRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getBarterRequestedSuccess(state, action) {
      console.log('ok', action.payload);
      state.isLoading = false;
      state.barterRequestedResponse = action.payload.data;
      state.status = action.type;
    },
    getBarterRequestedFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    //Barter Explore Details
    getBarterExploreRequest(state, action) {
      state.status = action.type;
    },
    getBarterExploreSuccess(state, action) {
      state.isLoading = false;
      state.barterDetailsResponse = action.payload;
      state.status = action.type;
    },
    getBarterExploreFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //invite request
    getbarterInviteExploreRequest(state, action) {
      state.status = action.type;
    },
    getbarterInviteExploreSuccess(state, action) {
      state.isLoading = false;
      state.barterExploreAcceptResponse = action.payload;
      state.status = action.type;
    },
    getbarterInviteExploreFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    
    //Creator Eigibility request
    getCreatorEigibilityRequest(state, action) {
      state.status = action.type;
    },
    getCreatorEigibilitySuccess(state, action) {
      state.isLoading = false;
      state.barterCreatorEigibilityResponse = action.payload;
      state.status = action.type;
    },
    getCreatorEigibilityFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
  },
});

export const {
  getBarterRequestedRequest,
  getBarterRequestedSuccess,
  getBarterRequestedFailure,
  getBarterExploreRequest,
  getBarterExploreSuccess,
  getBarterExploreFailure,
  getbarterInviteExploreRequest,
  getbarterInviteExploreSuccess,
  getbarterInviteExploreFailure,
  getCreatorEigibilityRequest,
  getCreatorEigibilitySuccess,
  getCreatorEigibilityFailure,
} = BaterSlice.actions;

export default BaterSlice.reducer;
