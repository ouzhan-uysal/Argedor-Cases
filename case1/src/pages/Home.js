import React, { useEffect, useState } from 'react';
import { HomeWrapper } from '../assets/Home_SC';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

// Create connection
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { getParsedNftAccountsByOwner, createConnectionConfig, } from "@nfteyez/sol-rayz";
import axios from 'axios';
import { setNFTDetails } from '../actions/nftAction';

const Home = () => {
  const { isConnected } = useSelector(state => state.connection);
  const [nftData, setNftData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();

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
        if (nftData) {
          var data = Object.keys(nftData).map((key) => nftData[key]);
          let arr = [];
          let n = data.length;
          for (let i = 0; i < n; i++) {
            // console.log(data[i].data.uri);
            let val = await axios.get(data[i].data.uri);
            arr.push(val);
          }
          setNftData(arr);
          setIsLoading(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    data();
    // console.log("NFT Data: ", nftData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  const routeNftDetails = (data) => {
    dispatch(setNFTDetails(data));
    navigate(`/${data.name}`)
  }

  return (
    <>
      <Header />
      <HomeWrapper>
        {
          isConnected ?
            isLoading ?
              nftData &&
              nftData.length > 0 &&
              nftData.map((val, ind) => {
                return (
                  <div className="card-container" key={ind}>
                    <div className="card-item" onClick={() => routeNftDetails(val.data)}>
                      <img src={val.data.image} alt="loading..." />
                      <div className="">{val.data.name}</div>
                      <div className="">{val.data.description}</div>
                      <div className="">{val.data.seller_fee_basis_points}</div>
                    </div>
                  </div>
                );
              })
              :
              <div style={{ backgroundColor: "green", padding: "1rem", textAlign: "center", fontSize: "x-large" }}>Loading...</div>
            :
            <div style={{ backgroundColor: "red", padding: "1rem", textAlign: "center", fontSize: "x-large" }}>Not Connected.</div>
        }
      </HomeWrapper>
    </>
  )
}

export default Home;
