import axios from 'axios';
// Create connection
import { clusterApiUrl } from "@solana/web3.js";
import { getParsedNftAccountsByOwner, isValidSolanaAddress, createConnectionConfig, } from "@nfteyez/sol-rayz";
import { useEffect } from 'react';

const GetNFTData = () => {
  // check solana on window. This is useful to fetch address of your wallet.
  const getProvider = () => {
    if ("solana" in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        return provider;
      }
    }
  };

  // Function to get all NFT information.
  const getAllNftData = async () => {
    try {
      const connect = createConnectionConfig(clusterApiUrl("devnet"));
      const provider = getProvider();
      let ownerToken = provider.publicKey;
      const result = isValidSolanaAddress(ownerToken);
      console.log("result", result);
      const nfts = await getParsedNftAccountsByOwner({
        publicAddress: ownerToken,
        connection: connect,
        serialization: true,
      });
      return nfts;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function data() {
      try {
        let nftData = await getAllNftData();
        var data = Object.keys(nftData).map((key) => nftData[key]);
        let arr = [];
        let n = data.length;
        for (let i = 0; i < n; i++) {
          // console.log(data[i].data.uri);
          let val = await axios.get(data[i].data.uri);
          arr.push(val);
        }
        console.log(arr)
        // setNftData(arr);
      } catch (error) {
        console.log(error);
      }
    }
    data();
    // console.log("NFT Data: ", nftData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default GetNFTData;
