import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactHtmlParser from "react-html-parser";
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

import RichTextEditor from "../forms/rich-text-editor";

class TrickForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      desc:"",
      user_id: this.props.currentUser.users_id,
      published_on: "",
      publish_status: "draft",
      apiUrl: "http://localhost:5000/tricks",
      apiAction: "post"
    }

    this.handleChange = this.handleChange.bind(this);
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);
    this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSuccessfulFormSubmission(data) {
    axios.get(`http://localhost:5000/userTricks?user=${this.props.currentUser.users_id}&option="all"`)
      .then(response => {
        this.props.history.push("/tricks");
      }).catch(error => {
          console.log("handleSuccessfulFormSubmission error", error)
      })
  }

  componentDidMount() {
    if (this.props.editMode) {
      this.setState({
        id: this.props.post.id,
        title: this.props.post.title,
        desc: this.props.post.desc,
        user_id: this.props.post.user_id,
        published_on: this.props.post.published_on,
        publish_status: this.props.post.publish_status,
        apiUrl: `http://localhost:5000/tricks/${
          this.props.post.id
        }`,
        apiAction: "patch"
      });
    }
  }

  handleRichTextEditorChange(desc) {
    this.setState({ desc });
  }

  handleSubmit(event) {
    if(this.state.publish_status === "published") {
        this.state.published_on = moment().format('YYYY-MM-DD HH:mm:ss');
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
          published_on: "",
          publish_status: "draft",
          apiUrl: "http://localhost:5000/tricks",
          apiAction: "post"
        });

//        if (this.props.editMode) {
//          this.props.handleUpdateFormSubmission(response.data.post);
//        } else {
        this.handleSuccessfulFormSubmission();
//        }
      })
      .catch(error => {
        console.log("handleSubmit for write trick error", error);
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
            <div className='rich-text-editor'>
              <RichTextEditor
                handleRichTextEditorChange={this.handleRichTextEditorChange}
                editMode={this.props.editMode}
                contentToEdit={
                  this.props.editMode && this.props.blog.content
                    ? this.props.blog.content
                    : null
                }
              />
            </div>
            <div className='publish-option'>
              <div className='publish'>
                <input
                  type="radio"
                  checked={this.state.publish_status == 'draft'}
                  name="publish"
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