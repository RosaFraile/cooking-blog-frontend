import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DropzoneComponent from "react-dropzone-component";
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

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
      img_url: "",
      published_on: "",
      publish_status: "draft",
      cat_name: "starters",
      user_id: this.props.currentUser.users_id,
      ingredientsList: [],
      ingredient: "",
      directionsList: [],
      direction: "",
      editMode: false,
      apiUrl: "http://localhost:5000/recipes",
      apiAction: "post"
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleIngredientAddition = this.handleIngredientAddition.bind(this);
    this.handleDeleteIngredient = this.handleDeleteIngredient.bind(this);
    this.handleDirectionAddition = this.handleDirectionAddition.bind(this);
    this.handleDeleteDirection = this.handleDeleteDirection.bind(this);
    
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this. djsConfig.bind(this);
    this.handleImageDrop = this.handleImageDrop.bind(this);
    this.imageRef = React.createRef();
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  deleteImage() {
    axios
      .delete(`http://localhost:5000/recipes/delete-recipe-image/${this.state.img_url}`,
      { withCredentials: true }
    ).then(response => {
      this.setState({
        img_url: ""
      })
    }). catch(error => {
      console.log("deleteImage error", error);
    });
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

  handleDirectionAddition() {
    const direction = this.state.direction;
    this.setState({
      directionsList: this.state.directionsList.concat(direction),
      direction: ""
    })
  }

  handleDeleteDirection(indice) {
    this.setState({
      directionsList: this.state.directionsList.filter((direction) => {
        return direction != this.state.directionsList[indice]
      })
    })
  }

  componentDidMount() {
    // Edit mode from RecipeDetail
    if (this.props.editMode) {
      console.log("Recipe to edit",this.props.recipeToEdit);
      this.setState({
        id: this.props.recipeToEdit.recipes_id,
        title: this.props.recipeToEdit.recipes_title,
        ingredients: this.props.recipeToEdit.recipes_ingredients,
        directions: this.props.recipeToEdit.recipes_directions,
        img_url: this.props.recipeToEdit.recipes_img_url,
        prep_time: this.props.recipeToEdit.recipes_prep_time,
        servings: this.props.recipeToEdit.recipes_servings,
        published_on: this.props.recipeToEdit.recipes_published_on,
        publish_status: this.props.recipeToEdit.recipes_publish_status,
        cat_name: this.props.recipeToEdit.categories_name,
        user_id: this.props.recipeToEdit.recipes_user_id,
        ingredientsList: this.props.ingredients,
        directionsList: this.props.directions,
        editMode: true,
        apiUrl: `http://localhost:5000/recipes/${
          this.props.recipeToEdit.recipes_id
        }`,
        apiAction: "patch"
      });
      console.log("Ingredients to edit", this.state.ingredients)
      console.log("Directions to edit", this.state.directions)
    }
  }

  componentDidUpdate() {
    // Edit mode from RecipeSidebarList
    if(Object.keys(this.props.recipeToEdit).length > 0 && this.props.editMode === undefined) {
      console.log("recipeToEdit", this.props.recipeToEdit)
      
      const {
        recipes_directions,
        recipes_id,
        recipes_img_url,
        recipes_ingredients,
        recipes_prep_time,
        recipes_publish_status,
        recipes_published_on,
        recipes_servings,
        recipes_title,
        recipes_users_id,
        categories_name
      } = this.props.recipeToEdit;

      this.props.clearRecipeToEdit();

      this.setState({
        id: recipes_id,
        title: recipes_title,
        ingredients: recipes_ingredients,
        directions: recipes_directions,
        img_url: recipes_img_url,
        prep_time: recipes_prep_time,
        servings: recipes_servings,
        published_on: recipes_published_on,
        publish_status: recipes_publish_status,
        cat_name: categories_name,
        user_id: recipes_users_id,
        ingredientsList: this.props.ingredients,
        directionsList: this.props.directions,
        editMode: true,
        apiUrl: `http://localhost:5000/recipes/${recipes_id}`,
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

  buildForm() {
    let formData = new FormData();

    if(this.state.publish_status === "published") {
      this.state.published_on = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    if(this.state.id) {
      formData.append("id", this.state.id);
    }

    formData.append("title", this.state.title);
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

    let directions = this.state.directionsList[0]
    for (let i=1; i<this.state.directionsList.length; i++) {
      directions = directions.concat("|"+this.state.directionsList[i])
    }
    formData.append("directions", directions);

    if (this.state.img) {
      formData.append("file", this.state.img);
    } else if (this.state.img_url) {
      formData.append("img_url", this.state.img_url);
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
        console.log("Respuesta API",response)
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
          img_url: "",
          published_on: "",
          publish_status: "draft",
          cat_name: "starters",
          user_id: this.props.currentUser.users_id,
          ingredientsList: [],
          ingredient: "",
          directionsList: [],
          direction: "",
          apiUrl: "http://localhost:5000/recipes",
          apiAction: "post"
        });

  
        if (this.props.editMode) {
          this.props.handleUpdateFormSubmission(response.data[0]);
        } else if (this.state.editMode) {
          this.props.handleEditFormSubmission()
        } else {
          this.props.handleSuccessfulFormSubmission(response.data[0]);
        }
  
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
            <div className='ingredients-group'>
              <div className='ingredients-list'>
                <h3>Ingredients</h3>
                <ul>
                  {this.state.ingredientsList.map((ingredient, idx) => (
                    <div key={idx}>
                      <li>{ingredient}
                        <span className="delete-option" onClick={(event) => {
                          this.handleDeleteIngredient(idx)}}><FontAwesomeIcon icon="circle-minus" /></span>
                      </li>
                    </div>   
                  ))}
                </ul>
              </div>
              <div className='ingredient'>
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
            <div className='directions-group'>
              <div className='directions-list'>
                <h3>Directions</h3>
                <ol>
                  {this.state.directionsList.map((direction, idx) => (
                    <div key={idx}>
                      <li>{direction}
                        <span className="delete-option" onClick={(event) => {
                          this.handleDeleteDirection(idx)}}><FontAwesomeIcon icon="circle-minus" /></span>
                      </li>
                    </div>   
                  ))}
                </ol>
              </div>
              <div className='directions-textarea'>
                <textarea
                  type="text"
                  name="direction"
                  rows={15}
                  value={this.state.direction}
                  placeholder='Add Direction'
                  onChange={this.handleChange}
                />
                <FontAwesomeIcon onClick={this.handleDirectionAddition} icon="circle-plus" />
              </div>
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
              <option value="main courses">Main Courses</option>
              <option value="second courses">Second Courses</option>
              <option value="desserts">Desserts</option>
            </select>
            
            <div className="image-uploaders">
              {this.state.img_url && this.state.editMode ? (
                <div className='recipe-manager-image-wrapper'>
                  <img src={`http://localhost:5000/images/${this.state.img_url}`} />

                  <div className='image-removal-link'>
                    <a onClick={() => this.deleteImage()}>
                      <FontAwesomeIcon icon="trash-can" />
                    </a>
                  </div>
                </div>
              ):(
                <DropzoneComponent
                  ref={this.thumbRef}
                  config={this.componentConfig()}
                  djsConfig={this.djsConfig()}
                  eventHandlers={this.handleImageDrop()}
                >
                  <div className='dz-message'>Featured image</div>
                </DropzoneComponent>
              )}
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