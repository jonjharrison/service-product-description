import React, { Component } from 'react';
import '../style.css';

class ProductDescription extends Component {
  render() {
    return (
      <div className='App'>
        <h1> Product Description </h1>
        <div></div>
        <Keywords />
        <Details />
      </div>
    );
  }
}

export default ProductDescription;