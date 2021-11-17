import React from 'react';
import styled from 'styled-components'

const HeaderWrapper = styled.div`
  display: grid;
  background-color: red;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <h1>Header</h1>
    </HeaderWrapper>
  )
}

export default Header;