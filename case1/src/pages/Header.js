import React from 'react';
import styled from 'styled-components'

const HeaderWrapper = styled.div`
  display: grid;
  background-color: green;
  justify-content: center;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <h1>Oğuzhan Uysal</h1>
    </HeaderWrapper>
  )
}

export default Header;