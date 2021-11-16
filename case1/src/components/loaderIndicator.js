import React from 'react';
import Loader from "react-loader-spinner";

export default class Loaders extends React.Component {
  render() {
    return (
      <Loader
        type="Bars"
        color="#4B9CE2"
        height={50}
        width={50}
      />
    );
  }
}