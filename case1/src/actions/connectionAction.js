import { CONNECT, DISCONNECT } from "./actionTypes"

export const connect = () => {
  return {
    type: CONNECT,
    payload: {
      isConnected: true
    }
  }
}

export const disconnect = () => {
  return {
    type: DISCONNECT,
    payload: {
      isConnected: false
    }
  }
}