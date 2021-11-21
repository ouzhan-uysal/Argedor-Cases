import { CONNECT, DISCONNECT } from "../actions/actionTypes"

const INITIAL_STATE = {
  isConnected: false
}

const connectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONNECT:
      return { state, isConnected: action.payload.isConnected };
    case DISCONNECT:
      return { state, isConnected: action.payload.isConnected };
    default:
      return { ...state };
  }
}

export default connectionReducer;