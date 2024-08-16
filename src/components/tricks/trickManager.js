import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import Navbar from '../navigation/navbar';
import Footer from '../footer/footer';
import TrickSidebarList from '../tricks/trickSidebarList'
import TrickForm from './trickForm';

class TrickManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trickItems: [],
      trickToEdit: {}
    };

    this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
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

  handleDeleteClick(trickItem) {
    axios
      .delete(`http://localhost/tricks/${trickItem.tricks_id}`,
        { withCredentials: true }
      ).then(response => {
        this.setState({
          trickItems: this.state.trickItems.filter(item => {
            return item.tricks_id !== trickItem.tricks_id;
          })
        })
        return response.data;
      }).catch(error => {
        console.log("handleDeleteClick error", error);
      })
  }

  handleEditClick(trickItem) {
    if (this.props.currentUser) {
      this.setState({
        trickToEdit: trickItem
      })
    }
  }

  handleEditFormSubmission() {
    this.getTrickItems();
  }

  handleSuccessfulFormSubmission(trickItem) {
    this.setState({
      trickItems: [trickItem].concat(this.state.trickItems)
    })
  }

  handleFormSubmissionError(error) {
    console.log("Error in handleFormSubmissionError", error)
  }

  getTrickItems() {
    axios.get(`http://localhost:5000/tricks?user=${this.props.currentUser.users_id}`,
      { withCredentials: true})
      .then(response => {
        this.setState({
          trickItems: response.data
        })
      })
      .catch(error => {
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
                handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
                handleFormSubmissionError={this.handleFormSubmissionError}
                handleEditFormSubmission={this.handleEditFormSubmission}
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

function mapStateToProps(state) {
  return {
      currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps, actions)(TrickManager);