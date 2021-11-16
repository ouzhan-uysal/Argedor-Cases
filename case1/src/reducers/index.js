import { combineReducers } from 'redux';
import offerReducer from './offerReducer';

const rootReducer = combineReducers({
  offer: offerReducer,
});

export default rootReducer;