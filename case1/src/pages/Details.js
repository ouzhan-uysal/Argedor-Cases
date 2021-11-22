import React, { useEffect } from 'react';
import { DetailsWrapper } from '../assets/Details_SC';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Details = () => {
  let navigate = useNavigate();
  const { isConnected } = useSelector(state => state.connection);
  const { nftDetails, nftAttributes } = useSelector(state => state.nft);

  const goBack = () => {
    navigate(`/`);
  }

  useEffect(() => {
    if (!isConnected) {
      navigate(`/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected])

  return (
    <>
      <Header />
      <DetailsWrapper>
        <button onClick={() => goBack()}>Go Back</button>
        <div className="nft-details">
          <h2>{nftDetails.nftName}</h2>
          <img src={nftDetails.nftImage} alt="nftImage" />
          <div>{nftDetails.nftDescription}</div>
          <div>
            <h3>NFT Attributes:</h3>
            {
              nftAttributes.map(el =>
                <p>{el.trait_type} - {el.value}</p>
              )
            }
          </div>
        </div>
      </DetailsWrapper>
    </>
  )
}

export default Details;