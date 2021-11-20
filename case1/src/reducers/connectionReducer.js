import { CONNECT, DISCONNECT } from "../actions/actionTypes"

const INITIAL_STATE = {
  isConnected: false
}

const checkConnection = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONNECT:
      return { state };
    case DISCONNECT:
      return { state };
    default:
      return { ...state };
  }
}

export default checkConnection;