import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DropzoneComponent from "react-dropzone-component";
import ReactHtmlParser from "react-html-parser";
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

import Navbar from '../navigation/navbar';
import Footer from '../footer/footer';
import RichTextEditor from "../forms/rich-text-editor";

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      desc:"",
      prep_time: "",
      servings: "",
      img: "",
      cat_name: "starters",
      user_id: this.props.currentUser.users_id,
      published_on: "",
      publish_status: "draft",
      ingredients: [],
      steps: [],
      ingredient: "",
      step: "",
      apiUrl: "http://localhost:5000/recipes",
      apiAction: "post"
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleIngredientAddition = this.handleIngredientAddition.bind(this);
    this.handleStepAddition = this.handleStepAddition.bind(this);
    this.handleDeleteIngredient = this.handleDeleteIngredient.bind(this);
    this.handleDeleteStep = this.handleDeleteStep.bind(this);
    
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this. djsConfig.bind(this);
    this.handleImageDrop = this.handleImageDrop.bind(this);
    this.imageRef = React.createRef();
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleIngredientAddition() {
    const ingredient = this.state.ingredient;
    this.setState({
      ingredients: this.state.ingredients.concat(ingredient),
      ingredient: ""
    })
  }

  handleDeleteIngredient(indice) {
    this.setState({
      ingredients: this.state.ingredients.filter((ingredient) => {
        return ingredient != this.state.ingredients[indice]
      })
    })
  }

  handleStepAddition() {
    const step = this.state.step;
    this.setState({
      steps: this.state.steps.concat(step),
      step: ""
    })
  }

  handleDeleteStep(indice) {
    this.setState({
      steps: this.state.steps.filter((step) => {
        return step != this.state.steps[indice]
      })
    })
  }

  componentDidMount() {
    console.log("Current User", this.props.currentUser)
    if (this.props.editMode) {
      this.setState({
        id: this.props.post.id,
        title: this.props.post.title,
        desc: this.props.post.desc,
        img: this.props.post.img,
        prep_time: this.props.post.prep_time,
        servings: this.props.post.servings,
        cat_name: this.props.post.cat_name,
        user_id: this.props.post.user_id,
        published_on: this.props.post.published_on,
        publish_status: this.props.post.publish_status,
        apiUrl: `http://localhost:5000/recipes/${
          this.props.post.id
        }`,
        apiAction: "patch"
      });
    }
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1
    };
  }

  handleImageDrop() {
    return {
      addedfile: file => this.setState({ img: file })
    }
  }

  handleRichTextEditorChange(desc) {
    this.setState({ desc });
  }

  buildForm() {
    let formData = new FormData();

    if(this.state.publish_status === "published") {
      const published_on = moment().format('YYYY-MM-DD HH:mm:ss');
      console.log("Published_on", published_on)
      /*this.setState({
        published_on: published_on
      }, console.log("Published_on", this.state.published_on))*/
      this.state.published_on = moment().format('YYYY-MM-DD HH:mm:ss');
      console.log("Published_on", this.state.published_on)
    }

    console.log(this.state.ingredients)
    console.log(this.state.steps)

    formData.append("title", this.state.title);
    formData.append("desc", this.state.desc);
    formData.append("prep_time", this.state.prep_time);
    formData.append("servings", this.state.servings);
    formData.append("cat_name", this.state.cat_name);
    formData.append("user_id", this.state.user_id);
    formData.append("published_on", this.state.published_on);
    formData.append("publish_status", this.state.publish_status);

    for (let i=0; i<this.state.ingredients.length; i++) {
      formData.append("ingredients["+i+"]", this.state.ingredients[i]);
    }
    for (let i=0; i<this.state.steps.length; i++) {
      formData.append("steps["+i+"]", this.state.steps[i]);
    }
    if (this.state.img) {
      formData.append("file", this.state.img);
    }

    return formData;
  }

  handleSubmit(event) {
    console.log("Paso por handleSubmit")

    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: this.buildForm(),
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).then(response => {
        console.log("response: ", response)
        if (this.state.img) {
          this.imageRef.current.dropzone.removeAllFiles();
        }

        this.setState({
          title: "",
          desc: "",
          prep_time: "",
          servings: "",
          img: "",
          cat_name: "starters",
          published_on: "",
          publish_status: "draft",
          ingredients: [],
          steps: [],
          ingredient: "",
          step: "",
          apiUrl: "http://localhost:5000/recipes",
          apiAction: "post"
        });

/*        if (this.props.editMode) {
          this.props.handleUpdateFormSubmission(response.data.post);
        } else {
          this.props.handleSuccessfulFormSubmission(response.data.post);
        }*/
      })
      .catch(error => {
        console.log("handleSubmit for post error", error);
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className='write-recipe-wrapper'>
        <Navbar />
        <div className='write-recipe-container'>
          <div className='write-recipe-top'>
            <div className='introduction'>
              <h2>How to write a recipe</h2>
            </div>
          </div>
          <div className='write-recipe-bottom'>
            <div className='write-recipe-left-column'>
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
                <input required
                  type="text"
                  name="prep_time"
                  value={this.state.prep_time}
                  placeholder='Preparation time'
                  onChange={this.handleChange}
                />
                <input required
                  type="text"
                  name="servings"
                  value={this.state.servings}
                  placeholder='Servings'
                  onChange={this.handleChange}
                />
                <select
                  onChange={this.handleChange}
                  name='cat_name'
                  value={this.state.cat_name}
                  className='select-element'
                >
                  <option value="starters">Starters</option>
                  <option value="main">Main Courses</option>
                  <option value="second">Second Courses</option>
                  <option value="desserts">Desserts</option>
                </select>
                <div className='ingredient-group'>
                  <input
                    type="text"
                    name="ingredient"
                    value={this.state.ingredient}
                    placeholder='Add Ingredient'
                    onChange={this.handleChange}
                  />
                  <FontAwesomeIcon onClick={this.handleIngredientAddition} icon="circle-plus" />
                </div>
                <div className='step-group'>
                  <textarea
                    rows="10"
                    type="text"
                    name="step"
                    value={this.state.step}
                    placeholder='Add Step'
                    onChange={this.handleChange}
                  />
                  <FontAwesomeIcon onClick={this.handleStepAddition} icon="circle-plus" />
                </div>
                <div className="image-uploaders">
                  <DropzoneComponent
                    ref={this.imageRef}
                    config={this.componentConfig()}
                    djsConfig={this.djsConfig()}
                    eventHandlers={this.handleImageDrop()}
                  >
                    <div className="dz-message">Featured Image</div>
                  </DropzoneComponent>
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
            <div className='write-recipe-right-column'>
              <h2>Preview</h2>
              <div className='preview'>
                <div className='preview-title'>
                  <h6 className='cursive'>how to make...</h6>
                  <h5>{this.state.title}</h5>
                </div>   
                <div className='preview-desc'>
                  {ReactHtmlParser(this.state.desc)}
                </div>
                <div className='featured-image'>
                  {this.state.img ? 
                    <img className="img-preview" src={URL.createObjectURL(this.state.img)}/>
                    : null}
                </div>
                <div className='preview-prep-time-servings'>
                  <div className='preview-prep-time'>
                    <div className='preview-prep-time-heading'>
                      <FontAwesomeIcon icon="clock" />
                    </div>
                    <div className='preview-prep-time-content'>
                      {this.state.prep_time}
                    </div>
                  </div>
                  <div className='preview-servings'>
                    <div className='preview-servings-heading'>
                      <h6>Servings</h6>
                    </div>
                    <div className='preview-servings-content'>
                      {this.state.servings}
                    </div>
                  </div>
                </div>
                <div className='preview-ingredients'>
                  <h5>Ingredients</h5>
                  <ul>
                    {this.state.ingredients.map((ingredient, idx) => (
                      <div key={idx}>
                        <li>{ingredient}
                          <span onClick={(event) => {
                            this.handleDeleteIngredient(idx)}}><FontAwesomeIcon icon="circle-minus" /></span>
                        </li>
                      </div>   
                    ))}
                  </ul>
                </div>
                <div className='preview-directions'>
                  <h5>Directions</h5>
                    {this.state.steps.map((step, idx) => (
                      <div key={idx}>
                        <h4>Step {idx+1}
                        <span onClick={(event) => {
                            this.handleDeleteStep(idx)}}><FontAwesomeIcon icon="circle-minus" /></span>
                        </h4>
                        <p>{step}</p>      
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("PostForm", state)
  return {
      currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps, actions)(PostForm);