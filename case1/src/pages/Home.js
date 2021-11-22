import React, { useEffect, useState } from 'react';
import { HomeWrapper } from '../assets/Home_SC';
import Header from './Header';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";

// Create connection
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { getParsedNftAccountsByOwner, createConnectionConfig, } from "@nfteyez/sol-rayz";
import axios from 'axios';

const Home = () => {
  const { isConnected } = useSelector(state => state.connection);
  const [nftData, setNftData] = useState([]);
  let navigate = useNavigate();
  const { nftDetails } = useParams();

  new Connection(clusterApiUrl("devnet"));

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
      if (provider) {
        let ownerToken = provider.publicKey;
        // const result = isValidSolanaAddress(ownerToken);
        // console.log("result", result);
        const nfts = await getParsedNftAccountsByOwner({
          publicAddress: ownerToken,
          connection: connect,
          serialization: true,
        });
        return nfts;
      }
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
        setNftData(arr);
      } catch (error) {
        console.log(error);
      }
    }
    data();
    console.log("NFT Data: ", nftData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return (
    <>
      <Header />
      <HomeWrapper>
        {
          isConnected &&
          nftData &&
          nftData.length > 0 &&
          nftData.map((val, ind) => {
            return (
              <div className="card-container" key={ind}>
                <div className="card-item" onClick={() => navigate(`/${val.data.name}`)}>
                  <img src={val.data.image} alt="loading..." />
                  <div className="">{val.data.name}</div>
                  <div className="">{val.data.description}</div>
                  <div className="">{val.data.seller_fee_basis_points}</div>
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
