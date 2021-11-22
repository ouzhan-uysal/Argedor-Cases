import { SET_NFT_INFO } from '../actions/actionTypes';

const INITIAL_STATE = {
  nftDetails: {
    nftName: "",
    nftDescription: "",
    nftImage: "",
    nftSellerFeeBasisPoint: 0
  },
  nftAttributes: {

  }
}

const nftReducer = (state = INITIAL_STATE, action) => {
  // console.log("action: ", action.type)
  switch (action.type) {
    case SET_NFT_INFO:
      return { ...state, nftDetails: action.payload.nftDetails, nftAttributes: action.payload.nftAttributes }
    default:
      return { ...state }
  }
}

export default nftReducer;
