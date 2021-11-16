import { ADD_PRODUCT, DELETE_PRODUCT } from '../actions/actionTypes';

const INITIAL_STATE = {
  productID: "",
}

const offerReducer = (state = INITIAL_STATE, action) => {
  // console.log("action: ", action)
  switch (action.type) {
    case ADD_PRODUCT:
      return { ...state }
    case DELETE_PRODUCT:
      return { ...state }
    default:
      return { ...state }
  }
}

export default offerReducer;
