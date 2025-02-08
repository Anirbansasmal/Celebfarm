import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {logger} from 'redux-logger';

import AuthReducer from './reducers/AuthReducer';
import RootSaga from './reduxSaga/RootSaga';
import ContentLabReducer from './reducers/ContentLabReducer';
import UserReducer from './reducers/UserReducer';
import HomeUserReducer from './reducers/HomeUserReducer';
import CollaborationReducer from './reducers/CollaborationReducer';
import BarterUserReducer from './reducers/BarterUserReducer';
import ProfileReducer from './reducers/ProfileReducer';

let SagaMiddleware = createSagaMiddleware();
const middleware = [SagaMiddleware, logger];
const createRootReducer = () => (state, action) => {
  if (action.type === 'Auth/logoutSuccess') {
    state = undefined; // Reset state
  }
  console.log('state', state?.HomeUserReducer);
  return {
    AuthReducer: AuthReducer(state?.AuthReducer, action),
    ContentLabReducer: ContentLabReducer(state?.ContentLabReducer, action),
    UserReducer: UserReducer(state?.UserReducer, action),
    HomeUserReducer: HomeUserReducer(state?.HomeUserReducer),
    CollaborationReducer: CollaborationReducer(
      state?.CollaborationReducer,
      action,
    ),
    BarterUserReducer: BarterUserReducer(state?.BarterUserReducer, action),
    ProfileReducer: ProfileReducer(state?.ProfileReducer, action),
  };
};

const rootReducer = createRootReducer();
console.log('state reducer', AuthReducer);
export default configureStore({
  reducer: {
    AuthReducer: AuthReducer,
    ContentLabReducer: ContentLabReducer,
    UserReducer: UserReducer,
    HomeReducer: HomeUserReducer,
    CollaborationReducer: CollaborationReducer,
    BarterReducer: BarterUserReducer,
    ProfileReducer: ProfileReducer,
  },
  middleware,
});
SagaMiddleware.run(RootSaga);

// AuthReducer:AuthReducer,
// ContentLabReducer:ContentLabReducer,
// UserReducer:UserReducer,
// HomeReducer:HomeUserReducer,
// CollaborationReducer:CollaborationReducer,
// BarterReducer:BarterUserReducer,
// ProfileReducer:ProfileReducer,
