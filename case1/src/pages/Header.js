import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { connect, disconnect } from '../actions/connectionAction';

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  background-color: green;
  justify-content: center;
`;

const Header = () => {
  const { isConnected } = useSelector(state => state.connection);
  const dispatch = useDispatch();

  const connectWallet = async () => {
    try {
      const resp = await window.solana.connect();
      resp.publicKey.toString()
      console.log("Responsive: ", resp)
      dispatch(connect());
      // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo
      // My Key: 29QPT5gnSUWtxnH54L5vfZMNmpqBVdDFcWWE5ndwHYgjuKwDViFhBDSYuxUZmMUj8gZaG6gcDDs73fPMpdTjCYia
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
      <h1>Oğuzhan Uysal</h1>
      {
        isConnected
          ?
          <button onClick={() => disconnectWallet()}>Bağlantıyı Kes</button>
          :
          <button onClick={() => connectWallet()}>Bağla</button>
      }
    </HeaderWrapper>
  )
}

export default Header;