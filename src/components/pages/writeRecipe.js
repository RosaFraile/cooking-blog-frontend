import React, { Component } from 'react';
import Navbar from '../navigation/navbar';

export default class WriteRecipe extends Component {
  render() {
    return (
      <div className='write-recipe-wrapper'>
        <Navbar />
        <div className='write-recipe-container'>
          <div className='write-recipe-top'>
            <div className='write-recipe-top-left-column'>
              Left column
            </div>
            <div className='write-recipe-top-right-column'>
              Right column
            </div>
          </div>
          <div className='write-recipe-bottom'>
            Bottom
          </div>
        </div>
      </div>
    );
  }
}