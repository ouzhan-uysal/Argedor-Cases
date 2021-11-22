import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { connect, disconnect } from '../actions/connectionAction';

const HeaderWrapper = styled.div`
  background-color: #808080;
  display: grid;
  justify-items: center;
  padding: 1rem 1rem;
  h1 {
    text-align: center;
  }
`;

const Header = () => {
  const { isConnected } = useSelector(state => state.connection);
  const dispatch = useDispatch();

  const connectWallet = async () => {
    try {
      const resp = await window.solana.connect();
      resp.publicKey.toString()
      // console.log("Responsive: ", resp)
      dispatch(connect());
    } catch (err) {
      console.log(err)
      // { code: 4001, message: 'User rejected the request.' }
    }
  }
  const disconnectWallet = () => {
    window.solana.disconnect();
    dispatch(disconnect());
    window.solana.on('disconnect', () => console.log("disconnected!"))
  }

  return (
    <HeaderWrapper>
      <h1>Argedor Phantom Wallet Case</h1>
      <h3>-By Oğuzhan Uysal</h3>
      {
        isConnected
          ?
          <button onClick={() => disconnectWallet()}>DISCONNECT</button>
          :
          <button onClick={() => connectWallet()}>CONNECT</button>
      }
    </HeaderWrapper>
  )
}

export default Header;