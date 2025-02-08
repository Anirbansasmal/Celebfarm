import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import TokenReducer from './TokenReducer';
import UserReducer from './UserReducer';
import HomeUserReducer from './HomeUserReducer';
import AppointmantUserReducer from './AppointmantUserReducer';
import PaymentReducer from './PaymentReducer';
import AboutReducer from './AboutUserReducer';
import HistoryReducer from './HistoryReducer';
import MessageReducer from './MessageReducer';

const allReducers = combineReducers({
  AuthReducer: AuthReducer,
  TokenReducer: TokenReducer,
  UserReducer: UserReducer,
  HomeUserReducer:HomeUserReducer,
  AppointmantUserReducer:AppointmantUserReducer,
  PaymentReducer:PaymentReducer,
  AboutReducer:AboutReducer,
  HistoryReducer:HistoryReducer,
  MessageReducer:MessageReducer
});

const RootReducer = (state, action) => {
  return allReducers(state, action);
};

export default RootReducer;
