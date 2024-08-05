import React, { Component } from 'react';
import axios from 'axios';

import Navbar from '../navigation/navbar';
import Footer from '../footer/footer';
import TrickSidebarList from '../tricks/trickSidebarList'
import TrickForm from './trickForm';

export default class TrickManager extends Component {
  constructor() {
    super();

    this.state = {
      trickItems: [],
      trickToEdit: {}
    };

    this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
    this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.clearTrickToEdit = this.clearTrickToEdit.bind(this);
  }

  clearTrickToEdit() {
    this.setState({
      trickToEdit: {}
    })
  }

  handleDeleteClick(portfolioItem) {
    axios
      .delete(`http://localhost/tricks/${trickItem.id}`,
        { withCredentials: true }
      ).then(response => {
        this.setState({
          trickItems: this.state.trickItems.filter(item => {
            return item.id !== trickItem.id;
          })
        })

        return response.data;
      }).catch(error => {
        console.log("handleDeleteClick error", error);
      })
  }

  handleEditClick(trickItem) {
    this.setState({
      trickToEdit: trickItem
    })
  }

  handleEditFormSubmission() {
    this.getTrickItems();
  }

  handleNewFormSubmission(trickItem) {
    this.setState({
      trickItems: [trickItem].concat(this.state.trickItems)
    })
  }

  handleFormSubmissionError(error) {
    console.log("Error in handleFormSubmissionError", error)
  }

  getTrickItems() {
    axios.get('http://localhost:5000/tricks?order_by=created_at&direction=desc', { withCredentials: true})
      .then(response => {
        // handle success
        console.log(response.data);
    //    this.setState({
    //      trickItems: response.data.recipe_items
    //    })
      })
      .catch(error => {
        // handle error
        console.log("Error in getTrickItems", error);
      });
  }

  componentDidMount() {
    this.getTrickItems();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className='trick-manager-wrapper'>
          <div className='left-column'>
              <TrickForm
                handleNewFormSubmission={this.handleNewFormSubmission}
                handleEditFormSubmission={this.handleEditFormSubmission}
                handleFormSubmissionError={this.handleFormSubmissionError}
                clearTrickToEdit={this.clearTrickToEdit}
                trickToEdit={this.state.trickToEdit}
              />
          </div>
          <div className='right-column'>
            <TrickSidebarList
              data={this.state.trickItems}
              handleDeleteClick={this.handleDeleteClick}
              handleEditClick={this.handleEditClick}
            />
          </div>    
        </div>
        <Footer />
      </div>
    );
  }
}