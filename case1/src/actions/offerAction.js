import { SET_OFFERED_PRODUCT_ID } from "./actionTypes";

export const SetOfferedProductId = (id, price) => {
  return {
    type: SET_OFFERED_PRODUCT_ID,
    payload: {
      offerID: id,
      offerPrice: price
    }
  }
}