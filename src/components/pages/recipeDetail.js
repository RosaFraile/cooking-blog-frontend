import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import Navbar from '../navigation/navbar';
import Footer from '../footer/footer';
import RecipeForm from '../recipes/recipeForm';

class RecipeDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: this.props.match.params.id,
      recipeItem: {},
      ingredients: [],
      directions: [],
      editMode: false
    }
    
    this.getRecipeItem = this.getRecipeItem.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleImageDelete = this.handleImageDelete.bind(this);
    this.handleUpdateFormSubmission = this.handleUpdateFormSubmission.bind(this);
  }

  handleDeleteClick() {
    axios.delete(`http://localhost:5000/recipes/${this.state.currentId}`, { withCredentials:true })
    .then(response => {
      console.log(response)
      this.props.history.push("/");
    }).catch(error => {
      console.log("handleDelete error", error)
    })
  }

  handleUpdateFormSubmission(recipe) {
    this.setState({
      recipeItem: recipe,
      editMode: false
    });
  }

  handleImageDelete() {
    this.setState({
      recipeItem: {
        img: ""
      }
    });
  }

  handleEditClick() {
    if (this.props.currentUser) {
      this.setState({ editMode: true });
    }
  }

  getRecipeItem() {
    axios
      .get(`http://localhost:5000/recipes/${this.state.currentId}`)
      .then(response => {
        console.log("Response API", response.data[0])
        const ingredients = response.data[0].recipes_ingredients.split("|")
        const directions = response.data[0].recipes_directions.split("|")
        this.setState({
          recipeItem: response.data[0],
          ingredients,
          directions
        })
        console.log("Recipe item", this.state.recipeItem)
      }).catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.getRecipeItem();
  }

  render() {
    const contentManager = () => {
      if (this.state.editMode) {
        return (
          <RecipeForm
            handleImageDelete={this.handleImageDelete}
            handleUpdateFormSubmission={this.handleUpdateFormSubmission}
            editMode={this.state.editMode}
            recipeToEdit={this.state.recipeItem}
            ingredients={this.state.ingredients}
            directions={this.state.directions}
          />
        );
      } else {
        return (
          <div className='recipe-detail-wrapper'>
            <div className='title'>
              <h2>how to make...</h2>
              <h1>{this.state.recipeItem.recipes_title}</h1>
            </div>
            <div className='author-date'>
              <div className='author'>
                <p>By <span>{this.state.recipeItem.users_username}</span></p>
              </div>
              <div className='date'>
                {
                  this.state.recipeItem.recipes_publish_status === "published" ?
                  (
                    <p>Published on {moment(this.state.recipeItem.recipes_published_on).format("MMMM DD, YYYY")}</p>
                  ):(
                    <p>Draft</p>
                  )
                }
              </div>
              {
                (this.props.currentUser && this.props.currentUser.users_username === this.state.recipeItem.users_username) ?
                (<div className="edit-delete">
                  <div onClick={this.handleEditClick} className='edit'>
                    <FontAwesomeIcon icon="edit" />
                  </div>
                  <div  onClick={this.handleDeleteClick} className='delete'>
                    <FontAwesomeIcon icon="trash-can" />
                  </div>
                </div>
                ):(
                  null
                )
              }
            </div>
            <div className='image'>
              <img src={`http://localhost:5000/images/${this.state.recipeItem.recipes_img_url}`} alt="Featured image" />
            </div>
            <div className='time-servings'>
              <div className='prep-time'>
                <div>
                  <FontAwesomeIcon icon="clock" />
                </div>
                <div>{this.state.recipeItem.recipes_prep_time}</div>
              </div>
              <div className='servings'>
                <div>Servings</div>
                <div>{this.state.recipeItem.recipes_servings}</div>
              </div>
              
            </div>
            <div className='ingredients'>
              <h2>Ingredients</h2>
              <div>
                <ul>
                {this.state.ingredients.map((ingredient, idx) => (
                  <li key={idx}>{ingredient}</li>
                ))}
                </ul>
              </div>
            </div>
            <div className='directions'>
              <h2>Directions</h2>
              <div className='directions-text'>
                <ol>
                  {this.state.directions.map((direction, idx) => (
                    <li key={idx}>{direction}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        );
      }
    };

    return (
      <div className='recipe-detail-page'>
        <Navbar />
        {contentManager()}
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

export default connect(mapStateToProps, actions)(RecipeDetail);