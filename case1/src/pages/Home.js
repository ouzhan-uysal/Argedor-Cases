import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import axios from 'axios';

// Create connection
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { getParsedNftAccountsByOwner, isValidSolanaAddress, createConnectionConfig, } from "@nfteyez/sol-rayz";

const HomeWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
  background-color: #fff;
  margin: 1rem 0;
  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25em, 1fr));
    .card-item {
      display: grid;
      margin: 1.5rem;
      padding: .7rem;
      border: 1px solid #fff;
      border-radius: 5px;
      text-align: center;
      box-shadow: 2px 2px 2px 2px #000;
    }
  }
`;

const Home = () => {
  const [isConnected, setisConnected] = useState(false);
  const [nftData, setNftData] = useState([]);

  // create a connection of devnet
  const createConnection = () => {
    return new Connection(clusterApiUrl("devnet"));
  };
  createConnection();

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
  // get NFT
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

  // Function to get all nft data
  const getNftTokenData = async () => {
    try {
      let nftData = await getAllNftData();
      var data = Object.keys(nftData).map((key) => nftData[key]);
      let arr = [];
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
    }
    console.log("NFT Data: ", nftData)
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
                <div className="card-item">
                <img src={val.data.image} alt="loading..." />
                <div className="">{val.data.name}</div>
                <div className="">{val.data.sellerFeeBasisPoints}</div>
                <div className="">{val.mint}</div>
                </div>
              </div>
            );
          })
        }
      </HomeWrapper>
    </>
  )
}

export default Home;
