import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const HomeWrapper = styled.div`
  display: grid;
  background-color: green;
`;

const Home = () => {
  return (
    <>
      <Header />
      <HomeWrapper>
        Home Page
      </HomeWrapper>
    </>
  )
}

export default Home;