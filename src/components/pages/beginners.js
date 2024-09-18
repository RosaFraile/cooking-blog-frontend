import React, { Component } from 'react';
import axios from 'axios';

import Navbar from '../navigation/navbar';
import Footer from '../footer/footer';
import Carousel from '../carousel/carousel';
import MessageModal from '../modals/messageModal';

/*
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
*/

export default class Beginners extends Component {
  constructor() {
    super();
  
    this.state = {
        recipes: [],
        msgModalIsOpen: false,
        message: ""
    }

    this.handleError = this.handleError.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose() {
    this.setState({
      msgModalIsOpen: false
    })
  }

  handleError(errorMessage) {
    this.setState({
      msgModalIsOpen: true,
      message: errorMessage
    })
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/recipes?beginners=true`)
      .then(response => {
        this.setState({
          recipes: response.data
        })
      }).catch(error => {
        this.handleError(`Error loading recipes for beginners from the Database ${error}`);
      })
  }

  render() {  
    return (
      <div>
        <MessageModal
          modalIsOpen={this.state.msgModalIsOpen}
          message={this.state.message} 
          handleModalClose={this.handleModalClose}
        />
        <Navbar />
        <div className='carousel-container'>
            {
              this.state.recipes.length > 0 ?
              <Carousel recipes={this.state.recipes} /> : null
            }   
        </div>
        <Footer />
      </div>
    );
  }
}