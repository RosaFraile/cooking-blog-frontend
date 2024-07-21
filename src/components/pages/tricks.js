import React, { Component } from 'react';
import axios from 'axios';

import Navbar from '../navigation/navbar';
import Footer from '../footer/footer';
import TrickItem from '../tricks/trickItem';

export default class Tricks extends Component {
  constructor() {
    super();

    this.state = {
      tricks: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:5000/tricks")
      .then(response => {
        console.log(response.data);

        this.setState({
          tricks: response.data
        })
      }).catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className='tricks-container'>
        <Navbar />
        <div className='tricks-wrapper'>
          <div className='tricks'>
            {this.state.tricks.map(trick => (
              <TrickItem trickItem={trick} key={trick.id} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}