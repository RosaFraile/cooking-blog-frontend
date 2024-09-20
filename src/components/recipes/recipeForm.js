import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DropzoneComponent from "react-dropzone-component";
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

import MessageModal from '../modals/messageModal';

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
      img_to_delete: "",
      difficulty: "easy",
      published_on: moment("1970-01-01").format('YYYY-MM-DD HH:mm:ss'),
      publish_status: "draft",
      cat_name: "",
      user_id: this.props.currentUser.users_id,
      ingredientsList: [],
      ingredient: "",
      directionsList: [],
      direction: "",
      editMode: false,
      apiUrl: "http://localhost:5000/recipes",
      apiAction: "post",
      categories: [],
      msgModalIsOpen: false,
      message: "",
      servingsError: "",
      ingredientsError: "",
      directionsError: "",
      imgError: ""
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
    this.handleDeleteImageUrl = this.handleDeleteImageUrl.bind(this);
    this.handleDeleteImage = this.handleDeleteImage.bind(this);

    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleError = this.handleError.bind(this);
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

  mapCategoriesToState(categories) {
    this.setState({
      cat_name: categories[0].categories_name,
      categories
    })
  }

  getCategories() {
    axios.get("http://localhost:5000/categories")
      .then(response => {
        this.mapCategoriesToState(response.data);
      }).catch(error => {
        this.handleError(`Error getting the categories from the Database - ${error}`);
      })
  }

  handleDeleteImageUrl() {
    const img_to_delete = this.state.img_url;
    this.setState({
      img_url: "",
      img_to_delete
    })
  }

  handleDeleteImage() {
    axios
      .delete(`http://localhost:5000/recipes/delete-recipe-image/${this.state.img_to_delete}`,
      { withCredentials: true }
    ).then(response => {
      this.setState({
        img_to_delete: ""
      })
    }). catch(error => {
      this.handleError(`Error deleting the image - ${error}`);
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleIngredientAddition() {
    if (this.state.ingredient) {
      this.setState({
        ingredientsList: this.state.ingredientsList.concat(this.state.ingredient),
        ingredient: ""
      })
    }
  }

  handleDeleteIngredient(indice) {
    this.setState({
      ingredientsList: this.state.ingredientsList.filter((ingredient) => {
        return ingredient != this.state.ingredientsList[indice]
      })
    })
  }

  handleDirectionAddition() {
    if (this.state.direction) {
      this.setState({
        directionsList: this.state.directionsList.concat(this.state.direction),
        direction: ""
      })
    }
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
    this.getCategories();
    if (this.props.editMode) {
      this.setState({
        id: this.props.recipeToEdit.recipes_id,
        title: this.props.recipeToEdit.recipes_title,
        ingredients: this.props.recipeToEdit.recipes_ingredients,
        directions: this.props.recipeToEdit.recipes_directions,
        prep_time: this.props.recipeToEdit.recipes_prep_time,
        servings: this.props.recipeToEdit.recipes_servings,
        img_url: this.props.recipeToEdit.recipes_img_url,
        difficulty: this.props.recipeToEdit.recipes_difficulty,
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
        apiAction: "patch",
        servingsError: "",
        ingredientsError: "",
        directionsError: "",
        imgError: ""
      });
    }
  }

  componentDidUpdate() {
    // Edit mode from RecipeSidebarList
    if(Object.keys(this.props.recipeToEdit).length > 0 && this.props.editMode === undefined) {
      const {
        recipes_directions,
        recipes_id,
        recipes_img_url,
        recipes_difficulty,
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
        prep_time: recipes_prep_time,
        servings: recipes_servings,
        img_url: recipes_img_url,
        difficulty: recipes_difficulty,
        published_on: recipes_published_on,
        publish_status: recipes_publish_status,
        cat_name: categories_name,
        user_id: recipes_users_id,
        ingredientsList: this.props.ingredients,
        directionsList: this.props.directions,
        editMode: true,
        apiUrl: `http://localhost:5000/recipes/${recipes_id}`,
        apiAction: "patch",
        servingsError: "",
        ingredientsError: "",
        directionsError: "",
        imgError: ""
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
    } else if (this.state.publish_status === "draft") {
      this.state.published_on = moment("1970-01-01").format('YYYY-MM-DD HH:mm:ss');
    }

    if(this.state.id) {
      formData.append("id", this.state.id);
    }

    formData.append("title", this.state.title);
    formData.append("prep_time", this.state.prep_time);
    formData.append("servings", this.state.servings);
    formData.append("difficulty", this.state.difficulty);
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
    if(isNaN(this.state.servings) || this.state.ingredientsList.length === 0 || this.state.directionsList.length === 0 || (!this.state.img && !this.state.img_url)) {
      if (isNaN(this.state.servings)) {
        this.setState({
          servingsError: "Servings must be a number"
        })
      } else {
        this.setState({
          servingsError: ""
        })
      }

      if (this.state.ingredientsList.length === 0) {
        this.setState({
          ingredientsError: "At least one ingredient is needed"
        })
      } else if (this.state.ingredientsList.length > 1000) {
        this.setState({
          ingredientsError: "Too long!!! (up to 1000 caracters)"
        })
      } else {
        this.setState({
          ingredientsError: ""
        })
      }

      if (this.state.directionsList.length === 0) {
        this.setState({
          directionsError: "At least one direction is needed"
        })
      } else if (this.state.directionsList.length > 1000) {
        this.setState({
          directionsError: "Too long!!! (up to 5000 caracters)"
        })
      } else {
        this.setState({
          directionsError: ""
        })
      }

      if (!this.state.img && !this.state.img_url) {
        this.setState({
          imgError: "An image is needed"
        })
      } else {
        this.setState({
          imgError: ""
        })
      }
    } else {
      axios({
        method: this.state.apiAction,
        url: this.state.apiUrl,
        data: this.buildForm(),
        headers: {
          'content-type': 'multipart/form-data'
        },
        withCredentials: true
      }).then(response => {
        if (this.state.apiAction === "patch" && this.state.img_to_delete) {
          this.handleDeleteImage();
        }
        
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
          img_to_delete: "",
          difficulty: "easy",
          published_on: moment("1970-01-01").format('YYYY-MM-DD HH:mm:ss'),
          publish_status: "draft",
          cat_name: this.state.categories[0],
          user_id: this.props.currentUser.users_id,
          ingredientsList: [],
          ingredient: "",
          directionsList: [],
          direction: "",
          apiUrl: "http://localhost:5000/recipes",
          apiAction: "post",
          servingsError: "",
          ingredientsError: "",
          directionsError: "",
          imgError: ""
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
        console.log("Error de respuesta en submit", error)
        if (error.response) {
          switch (error.response.status) {
            case 401:
            case 403:
              this.handleError("Authentication error. Is recommended to logout and login again.");
              break;
            case 400:
            case 404:
              this.handleError(error.response.data.error);
              break;
            default:
              his.handleError("An error occurred while accessing the DataBase");
          }
        } else {
            this.handleError("An error occurred while accessing the DataBase");
        }
      }) 
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className='write-post-wrapper'>
        <MessageModal
          modalIsOpen={this.state.msgModalIsOpen}
          message={this.state.message} 
          handleModalClose={this.handleModalClose}
        />
        <div className='write-post-container'>
          <form onSubmit={this.handleSubmit}>
            <input required
              type="text"
              name= "title"
              value={this.state.title}
              placeholder='Title'
              onChange={this.handleChange}
            />

            <input required
              type="text"
              name="prep_time"
              value={this.state.prep_time}
              placeholder='Preparation time'
              onChange={this.handleChange}
            />
        
            <div className='servings-section'>
              <div className='error-message'>
                  {this.state.servingsError && <p><FontAwesomeIcon icon="circle-exclamation" /> {this.state.servingsError}</p>}
              </div>
              <input required
                type="text"
                name="servings"
                value={this.state.servings}
                placeholder='Servings'
                onChange={this.handleChange}
              />
            </div>

            <div className='category-section'>
              <h3>Category</h3>
              <select
                onChange={this.handleChange}
                name='cat_name'
                value={this.state.cat_name}
                className='select-element'
              >
              {
                this.state.categories.map(category => (
                  <option
                    key={category.categories_id}
                    className="select-option"
                    value={category.categories_name}
                  >
                    {category.categories_name}
                  </option>
                ))
              }
              </select>
            </div>

            <div className='difficulty-section'>
              <h3>Difficulty</h3>
              <select
                onChange={this.handleChange}
                name='difficulty'
                value={this.state.difficulty}
                className='select-element'
              >
                <option
                  className="select-option"
                  value="easy"
                >
                  EASY
                </option>
                <option
                  className="select-option"
                  value="medium"
                >
                  MEDIUM
                </option>
                <option
                  className="select-option"
                  value="hard"
                >
                  HARD
                </option>
              </select>
            </div>

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
              <div className='ingredient-section'>
                <div className='error-message'>
                  {this.state.ingredientsError && <p><FontAwesomeIcon icon="circle-exclamation" /> {this.state.ingredientsError}</p>}
                </div>
                <div className='ingredient'>
                  <input
                    type="text"
                    name="ingredient"
                    value={this.state.ingredient}
                    placeholder='Add Ingredient'
                    onChange={this.handleChange}
                  />
                  <span>
                    <FontAwesomeIcon onClick={this.handleIngredientAddition} icon="circle-plus" />
                  </span>
                </div> 
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
                          this.handleDeleteDirection(idx)}}>
                          <FontAwesomeIcon icon="circle-minus" />
                        </span>
                      </li>
                    </div>   
                  ))}
                </ol>
              </div>
              <div className='directions-section'>
                <div className='error-message'>
                  {this.state.directionsError && <p><FontAwesomeIcon icon="circle-exclamation" /> {this.state.directionsError}</p>}
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
                  <div className='add-direction'>
                    <FontAwesomeIcon onClick={this.handleDirectionAddition} icon="circle-plus" />
                  </div>
                </div>
              </div>
            </div>
 
            <div className='image-section'>
              <div className='error-message'>
                    {this.state.imgError && <p><FontAwesomeIcon icon="circle-exclamation" /> {this.state.imgError}</p>}
              </div>
              <div className="image-uploaders">
                {this.state.img_url && this.state.editMode ? (
                  <div className='recipe-manager-image-wrapper'>
                    <img src={`http://localhost:5000/images/${this.state.img_url}`} />

                    <div className='image-removal-link'>
                      <a onClick={() => this.handleDeleteImageUrl()}>
                        <FontAwesomeIcon icon="trash-can" />
                      </a>
                    </div>
                  </div>
                ):(
                  <DropzoneComponent
                    ref={this.imageRef}
                    config={this.componentConfig()}
                    djsConfig={this.djsConfig()}
                    eventHandlers={this.handleImageDrop()}
                  >
                    <div className='dz-message'>Featured image</div>
                  </DropzoneComponent>
                )}
              </div>
            </div>
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

export default connect(mapStateToProps, actions)(RecipeForm);