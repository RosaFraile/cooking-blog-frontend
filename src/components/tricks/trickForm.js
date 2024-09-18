import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

class TrickForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      desc:"",
      user_id: this.props.currentUser.users_id,
      published_on: moment("1970-01-01").format('YYYY-MM-DD HH:mm:ss'),
      publish_status: "draft",
      editMode: false,
      apiUrl: "http://localhost:5000/tricks",
      apiAction: "post"
    }

    this.handleChange = this.handleChange.bind(this);
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {
    // Edit mode from Tricks page
    if (this.props.editMode) {
      this.setState({
        id: this.props.trickToEdit.tricks_id,
        title: this.props.trickToEdit.tricks_title,
        desc: this.props.trickToEdit.tricks_desc,
        user_id: this.props.trickToEdit.tricks_users_id,
        published_on: this.props.trickToEdit.tricks_published_on,
        publish_status: this.props.trickToEdit.tricks_publish_status,
        apiUrl: `http://localhost:5000/tricks/${this.props.trickToEdit.tricks_id}`,
        apiAction: "patch"
      });
    }
  }

  componentDidUpdate() {
    // Edit mode from TrickSidebarList
    if(Object.keys(this.props.trickToEdit).length > 0 && this.props.editMode === undefined) {
      const {
        tricks_id,
        tricks_publish_status,
        tricks_published_on,
        tricks_title,
        tricks_desc,
        tricks_users_id
      } = this.props.trickToEdit;

      this.props.clearTrickToEdit();

      this.setState({
        id: tricks_id,
        title: tricks_title,
        desc: tricks_desc,
        published_on: tricks_published_on,
        publish_status: tricks_publish_status,
        user_id: tricks_users_id,
        editMode: true,
        apiUrl: `http://localhost:5000/tricks/${tricks_id}`,
        apiAction: "patch"
      });
    }
  }

  handleSubmit(event) {
    if(this.state.publish_status === "published") {
      this.state.published_on = moment().format('YYYY-MM-DD HH:mm:ss');
    } else {
      this.state.published_on = moment("1970-01-01").format('YYYY-MM-DD HH:mm:ss');
    }
    
    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: this.state,
      withCredentials: true
    }).then(response => {
        this.setState({
          title: "",
          desc: "",
          published_on: moment("1970-01-01").format('YYYY-MM-DD HH:mm:ss'),
          publish_status: "draft",
          apiUrl: "http://localhost:5000/tricks",
          apiAction: "post"
        });

        if (this.props.editMode) {
          this.props.handleUpdateFormSubmission();
        }
        else if (this.state.editMode) {
          this.props.handleEditFormSubmission()
        } else {
          this.props.handleSuccessfulFormSubmission(response.data[0]);
        }
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
            case 403:
              this.handleError("Authentication error. Is recommended to logout and login again.");
              break;
            default:
              his.handleError("An error occurred while accessing the DataBase");
          }
        } else {
            this.handleError("An error occurred while accessing the DataBase");
        }
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className='write-trick-wrapper'>
        <div className='write-trick-container'>
          <form onSubmit={this.handleSubmit}>
            <input required
              type="text"
              name= "title"
              value={this.state.title}
              placeholder='Title'
              onChange={this.handleChange}
            />
            <textarea required
              type="text"
              name="desc"
              rows={15}
              value={this.state.desc}
              placeholder='Description'
              onChange={this.handleChange}
            />
            <div className='publish-option'>
              <div className='publish'>
                <input
                  type="radio"
                  checked={this.state.publish_status == 'draft'}
                  name="publish_status"
                  value="draft"
                  id="draft"
                  onChange={this.handleChange}
                />
                <label htmlFor='draft'>Save as draft</label>
              </div>
              <div className='publish'>
                <input
                  type="radio"
                  checked={this.state.publish_status == 'published'}
                  name="publish_status"
                  value="published"
                  id="published"
                  onChange={this.handleChange}
                />
                <label htmlFor='published'>Publish</label>
              </div>
            </div>
            <div className='submit-button'>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps, actions)(TrickForm);