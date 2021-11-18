import { SET_NFT_INFO } from "./actionTypes";

export const SetOfferedProductId = (id, price) => {
  return {
    type: SET_NFT_INFO,
    payload: {
      nftID: id,
      nftPrice: price
    }
  }
}