import React from 'react';
import styled from 'styled-components';

const HomeWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;

const Home = () => {
  return (
    <HomeWrapper>
      Home Page
    </HomeWrapper>
  )
}

export default Home;