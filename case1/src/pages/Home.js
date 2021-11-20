import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from './Header';

// Create connection
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getParsedNftAccountsByOwner, isValidSolanaAddress, createConnectionConfig, } from "@nfteyez/sol-rayz";
import axios from 'axios';


const HomeWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
  background-color: gray;
  margin: 1rem 0;
  .card-container {
    display: grid;
    grid-template-rows: auto auto auto auto;
    justify-items: center;
  }
`;

const Home = () => {
  const [isConnected, setisConnected] = useState(false);
  const [nftData, setNftData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //create a connection of devnet
  const createConnection = () => {
    return new Connection(clusterApiUrl("devnet"));
  };
  createConnection();

  //check solana on window. This is useful to fetch address of your wallet.
  const getProvider = () => {
    if ("solana" in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        return provider;
      }
    }
  };

  //Function to get all NFT information.
  //get NFT
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

  //Function to get all nft data
  const getNftTokenData = async () => {
    try {
      let nftData = await getAllNftData();
      var data = Object.keys(nftData).map((key) => nftData[key]); let arr = [];
      let n = data.length;
      for (let i = 0; i < n; i++) {
        console.log(data[i].data.uri);
        let val = await axios.get(data[i].data.uri);
        arr.push(val);
      }
      return arr;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function data() {
      let res = await getAllNftData();
      setNftData(res);
      setIsLoading(true);
    }
    console.log(nftData)
    data();
  }, [isConnected]);


  return (
    <>
      <Header />
      <HomeWrapper>
        {
          nftData &&
          nftData.length > 0 &&
          nftData.map((val, ind) => {
            return (
              <div className="card-container" onClick={null} key={ind}>
                <img src={val.data.image} alt="loading..." />
                <div className="">{val.data.name}</div>
                <div className="">{val.data.sellerFeeBasisPoints}</div>
                <div className="">{val.mint}</div>
              </div>
            );
          })
        }
      </HomeWrapper>
    </>
  )
}

export default Home;
