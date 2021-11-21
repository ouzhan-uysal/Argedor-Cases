import React, { useEffect, useState } from 'react';
import { HomeWrapper } from './Home_SC';
import Header from './Header';
import { useSelector } from 'react-redux';

// Create connection
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { getParsedNftAccountsByOwner, isValidSolanaAddress, createConnectionConfig, } from "@nfteyez/sol-rayz";

const Home = () => {
  const { isConnected } = useSelector(state => state.connection);
  // const [isConnected, setisConnected] = useState(false);
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
      let res = await getAllNftData();
      setNftData(res);
    }
    console.log("NFT Data: ", nftData)
    data();
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
