import { SET_NFT_INFO } from "./actionTypes";

export const setNFTDetails = (data) => {
  return {
    type: SET_NFT_INFO,
    payload: {
      nftDetails: {
        nftName: data.name,
        nftDescription: data.description,
        nftImage: data.image,
        nftSellerFeeBasisPoint: data.seller_fee_basis_points
      },
      nftAttributes: data.attributes
    }
  }
}