import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import Navbar from '../navigation/navbar';
import Footer from '../footer/footer';
import RecipeSidebarList from '../recipes/recipeSidebarList'
import RecipeForm from './recipeForm';

class RecipeManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeItems: [],
      recipeToEdit: {},
      ingredients: [],
      directions: []
    };

    this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
    this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.clearRecipeToEdit = this.clearRecipeToEdit.bind(this);
  }

  clearRecipeToEdit() {
    this.setState({
      recipeToEdit: {},
      ingredients: [],
      directions: []
    })
  }

  handleDeleteClick(recipeItem) {
    console.log(recipeItem);
    axios
      .delete(`http://localhost:5000/recipes/${recipeItem.recipes_id}`,
        { withCredentials: true }
      ).then(response => {
        this.setState({
          recipeItems: this.state.recipeItems.filter(item => {
            return item.recipes_id !== recipeItem.recipes_id;
          })
        })
        return response.data;
      }).catch(error => {
        console.log("handleDeleteClick error", error);
      })
  }

  handleEditClick(recipeItem) {
    if (this.props.currentUser) {
      const ingredients = recipeItem.recipes_ingredients.split("|");
      const directions = recipeItem.recipes_directions.split("|");
      this.setState({ 
        recipeToEdit: recipeItem,
        ingredients,
        directions
      });
    }
  }

  handleEditFormSubmission() {
    this.getRecipeItems();
  }

  handleSuccessfulFormSubmission(recipeItem) {
    this.setState({
      recipeItems: [recipeItem].concat(this.state.recipeItems)
    })
  }

  handleFormSubmissionError(error) {
    console.log("Error in handleFormSubmissionError", error)
  }

  getRecipeItems() {
    axios.get(`http://localhost:5000/recipes?user=${this.props.currentUser.users_id}`, { withCredentials: true})
      .then(response => {
        console.log(response.data)
        this.setState({ 
          recipeItems: response.data
        })
      })
      .catch(error => {
        console.log("Error in getRecipeItems", error);
      });
  }

  componentDidMount() {
    this.getRecipeItems();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className='recipe-manager-wrapper'>
          <div className='left-column'>
          <RecipeForm
            handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
            handleFormSubmissionError={this.handleFormSubmissionError}
            handleEditFormSubmission={this.handleEditFormSubmission}
            clearRecipeToEdit={this.clearRecipeToEdit}
            recipeToEdit={this.state.recipeToEdit}
            ingredients={this.state.ingredients}
            directions={this.state.directions}
          />
          </div>
          <div className='right-column'>
            <RecipeSidebarList
              data={this.state.recipeItems}
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

export default connect(mapStateToProps, actions)(RecipeManager);