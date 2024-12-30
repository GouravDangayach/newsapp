import React, { Component } from 'react';
import loading from './loader.gif';    // import the loading gif

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
            <img src={loading} alt="Loading" />
      </div>
    );
  }
}
