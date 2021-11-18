import { combineReducers } from 'redux';
import nftReducer from './nftReducer';

const rootReducer = combineReducers({
  offer: nftReducer,
});

export default rootReducer;