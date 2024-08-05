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

import RichTextEditor from "../forms/rich-text-editor";

class RecipeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      ingredients: "",
      directions:"",
      prep_time: "",
      servings: "",
      img: "",
      published_on: "",
      publish_status: "draft",
      cat_name: "starters",
      user_id: this.props.currentUser.users_id,
      ingredientsList: [],
      ingredient: "",
      apiUrl: "http://localhost:5000/recipes",
      apiAction: "post"
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleIngredientAddition = this.handleIngredientAddition.bind(this);
    this.handleDeleteIngredient = this.handleDeleteIngredient.bind(this);
    
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
      ingredientsList: this.state.ingredientsList.concat(ingredient),
      ingredient: ""
    })
  }

  handleDeleteIngredient(indice) {
    this.setState({
      ingredientsList: this.state.ingredientsList.filter((ingredient) => {
        return ingredient != this.state.ingredientsList[indice]
      })
    })
  }

  componentDidMount() {
    console.log("Recipe in recipeForm",this.props.recipe)
    if (this.props.editMode) {
      this.setState({
        id: this.props.recipe.recipes_id,
        title: this.props.recipe.recipes_title,
        ingredients: this.props.recipe.recipes_ingredients,
        directions: this.props.recipe.recipes_directions,
        img: this.props.recipe.recipes_img_url,
        prep_time: this.props.recipe.recipes_prep_time,
        servings: this.props.recipe.recipes_servings,
        published_on: this.props.recipe.recipes_published_on,
        publish_status: this.props.recipe.recipes_publish_status,
        cat_name: this.props.recipe.cat_name,
        user_id: this.props.recipe.user_id,
        apiUrl: `http://localhost:5000/recipes/${
          this.props.recipe.recipes_id
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

  handleRichTextEditorChange(directions) {
    this.setState({ directions });
  }

  buildForm() {
    let formData = new FormData();

    if(this.state.publish_status === "published") {
      this.state.published_on = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    formData.append("title", this.state.title);
    formData.append("directions", this.state.directions);
    formData.append("prep_time", this.state.prep_time);
    formData.append("servings", this.state.servings);
    formData.append("cat_name", this.state.cat_name);
    formData.append("user_id", this.state.user_id);
    formData.append("published_on", this.state.published_on);
    formData.append("publish_status", this.state.publish_status);

    let ingredients = this.state.ingredientsList[0]

    for (let i=1; i<this.state.ingredientsList.length; i++) {
      ingredients = ingredients.concat("|"+this.state.ingredientsList[i])
    }

    formData.append("ingredients", ingredients);

    if (this.state.img) {
      formData.append("file", this.state.img);
    }

    return formData;
  }

  handleSubmit(event) {
    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: this.buildForm(),
      headers: {
        'content-type': 'multipart/form-data'
      },
      withCredentials: true
    }).then(response => {
        console.log("response: ", response)
        if (this.state.img) {
          this.imageRef.current.dropzone.removeAllFiles();
        }

        this.setState({
          title: "",
          ingredients:"",
          directions:"",
          prep_time: "",
          servings: "",
          img: "",
          published_on: "",
          publish_status: "draft",
          cat_name: "starters",
          user_id: this.props.currentUser.users_id,
          ingredientsList: [],
          ingredient: "",
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
        console.log("handleSubmit for write recipe error", error);
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className='write-post-wrapper'>
        <div className='write-post-container'>
          <form onSubmit={this.handleSubmit}>
            <input required
              type="text"
              name= "title"
              value={this.state.title}
              placeholder='Title'
              onChange={this.handleChange}
            />
            <div className='ingredient-group'>
              <div className='ingredients-list'>
                <h3>Ingredients List</h3>
                <ul>
                  {this.state.ingredientsList.map((ingredient, idx) => (
                    <div key={idx}>
                      <li>{ingredient}
                        <span onClick={(event) => {
                          this.handleDeleteIngredient(idx)}}><FontAwesomeIcon icon="circle-minus" /></span>
                      </li>
                    </div>   
                  ))}
                </ul>
              </div>
              <div>
                <input
                  type="text"
                  name="ingredient"
                  value={this.state.ingredient}
                  placeholder='Add Ingredient'
                  onChange={this.handleChange}
                />
                <FontAwesomeIcon onClick={this.handleIngredientAddition} icon="circle-plus" />
              </div>
            </div>
            <div className='rich-text-editor'>
            <h3>Directions</h3>
              <RichTextEditor
                handleRichTextEditorChange={this.handleRichTextEditorChange}
                editMode={this.props.editMode}
                contentToEdit={
                  this.props.editMode && this.props.recipe.directions
                    ? this.props.recipe.directions
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps, actions)(RecipeForm);