import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const DetailsWrapper = styled.div`
  display: grid;
  background-color: blue;
`;

const Details = () => {
  return (
    <>
      <Header />
      <DetailsWrapper>
        Details Page
      </DetailsWrapper>
    </>
  )
}

export default Details;