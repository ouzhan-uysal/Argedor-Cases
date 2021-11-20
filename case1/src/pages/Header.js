import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  background-color: green;
  justify-content: center;
`;
const Header = () => {
  const [isConnected, setIsConnected] = useState(false);
  const isPhantomInstalled = window.solana.isPhantom && window.solana.isConnected

  useEffect(() => {
    if (isPhantomInstalled) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [isPhantomInstalled])

  const connectWallet = async () => {
    try {
      const resp = await window.solana.connect();
      console.log("Responsive: ", resp)
      resp.publicKey.toString()

      setIsConnected(true);
      // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo
      // My Key: 29QPT5gnSUWtxnH54L5vfZMNmpqBVdDFcWWE5ndwHYgjuKwDViFhBDSYuxUZmMUj8gZaG6gcDDs73fPMpdTjCYia
    } catch (err) {
      console.log(err)
      // { code: 4001, message: 'User rejected the request.' }
    }
  }
  const disconnectWallet = () => {
    window.solana.disconnect();
    window.solana.on('disconnect', () => console.log("disconnected!"))
    setIsConnected(false);
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