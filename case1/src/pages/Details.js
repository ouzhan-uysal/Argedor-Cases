import React, { useEffect } from 'react';
import { DetailsWrapper } from '../assets/Details_SC';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Details = () => {
  let navigate = useNavigate();
  const { isConnected } = useSelector(state => state.connection);

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
        <div className="data-info">
          NFT INFO
        </div>
      </DetailsWrapper>
    </>
  )
}

export default Details;