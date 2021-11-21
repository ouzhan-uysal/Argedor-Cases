import { combineReducers } from 'redux';
import nftReducer from './nftReducer';
import connectionReducer from './connectionReducer';

const rootReducer = combineReducers({
  connection: connectionReducer,
  nft: nftReducer,
});

export default rootReducer;