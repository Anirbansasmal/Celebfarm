import {all} from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import ContentLabSaga from './ContentLabSaga';
import UserSaga from './UserSaga';
import HomeUserSaga from './HomeUserSaga';
import CollaborationSaga from './CollaborationSaga';
import ProfileSaga from './ProfileSaga';
import BarterSaga from './BarterSaga';

const combinedSaga = [
  ...AuthSaga,
  ...ContentLabSaga,
  ...UserSaga,
  ...HomeUserSaga,
  ...CollaborationSaga,
  ...BarterSaga,
  ...ProfileSaga,
];

export default function* RootSaga() {
  yield all(combinedSaga);
}
