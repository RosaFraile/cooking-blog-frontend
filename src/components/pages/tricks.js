import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import Navbar from '../navigation/navbar';
import Footer from '../footer/footer';
import TrickItem from '../tricks/trickItem';
import TrickModal from '../modals/trickModal';

class Tricks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tricks: [],
      trickToEdit: {},
      editMode: false,
      trickModalIsOpen: false
    }

    this.getTricks = this.getTricks.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleUpdateFormSubmission = this.handleUpdateFormSubmission.bind(this);
  }
  
  handleDeleteClick(trick) {
    axios
      .delete(`http://localhost:5000/tricks/${trick.tricks_id}`,
        { withCredentials: true}
      ).then(response => {
        this.setState({
          tricks: this.state.tricks.filter(trickItem => trick.tricks_id !== trickItem.tricks_id)
        })
        return response.data;
      }).catch(error => {
        console.log("handleDeleteClick trick error", error);
      })
  }

  handleEditClick(trick) {
    this.setState({
      trickToEdit: trick,
      editMode: true,
      trickModalIsOpen: true
    })
  }
  handleModalClose() {
    this.setState({
      trickModalIsOpen: false
    })
  }

  getTricks() {
    axios.get("http://localhost:5000/tricks")
      .then(response => {
        this.setState({
          tricks: response.data
        })
      }).catch(error => {
        console.log(error);
      })
  }

  handleUpdateFormSubmission() {
    this.setState({
      trickModalIsOpen: false
    })
    this.getTricks();
  }

  componentDidMount() {
    this.getTricks();
  }

  render() {
    return (
      <div className='tricks-container'>
        <TrickModal
          modalIsOpen={this.state.trickModalIsOpen} 
          handleModalClose={this.handleModalClose}
          handleUpdateFormSubmission={this.handleUpdateFormSubmission}
          trickToEdit={this.state.trickToEdit}
          editMode={this.state.editMode}
        />
        <Navbar />
        <div className='tricks-wrapper'>
          <div className='tricks'>
            {this.state.tricks.map(trick => (
              <div className="trickItem" key={trick.tricks_id}>
                
                {(this.props.currentUser && this.props.currentUser.users_username === trick.users_username) ?
                  (<div className="edit-delete">
                  <div
                    onClick={() => {this.handleEditClick(trick)}}
                    className='edit'
                  >
                      <FontAwesomeIcon icon="edit" />
                  </div>
                  <div 
                    onClick={() => {this.handleDeleteClick(trick)}}
                    className='delete'
                  >
                    <FontAwesomeIcon icon="trash-can" />
                  </div>
                  </div>
                  ):(
                  null
                  )  
                }
                <TrickItem trickItem={trick} />
              </div>
            ))}
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

export default connect(mapStateToProps, actions)(Tricks);