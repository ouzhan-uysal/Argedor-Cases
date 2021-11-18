import { SET_NFT_INFO } from '../actions/actionTypes';

const INITIAL_STATE = {
  nftID: "",
  nftPrice: 0
}

const nftReducer = (state = INITIAL_STATE, action) => {
  // console.log("action: ", action)
  switch (action.type) {
    case SET_NFT_INFO:
      return { ...state }
    default:
      return { ...state }
  }
}

export default nftReducer;
