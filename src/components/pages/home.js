import React, { Component } from 'react';
import axios from 'axios';

import Navbar from '../navigation/navbar';
import Footer from '../footer/footer';
import RecipeItem from '../recipes/recipeItem';
import MessageModal from '../modals/messageModal';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      recipes: [],
      category: "all",
      msgModalIsOpen: false,
      message: ""
    }

    this.handleCatFilter = this.handleCatFilter.bind(this);
    this.handleError = this.handleError.bind(this);
    this.getAllRecipes = this.getAllRecipes.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
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
  
  handleCatFilter(category) {
    this.setState({
      category
    })
    
  }

  getAllRecipes() {
    axios.get("http://localhost:5000/recipes")
      .then(response => {
        this.setState({
          recipes: response.data
        })
      }).catch(error => {
        this.handleError(`Error getting the recipes from the Database - ${error}`);
      })
  }

  componentDidMount() {
    axios.get("http://localhost:5000/categories")
      .then(response => {
        this.setState({
          categories: response.data
        })
      }).catch(error => {
        this.handleError(`Error getting the categories from the Database - ${error}`);
      })

    this.getAllRecipes();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.category !== this.state.category) {
      if (this.state.category === "all") {
        this.getAllRecipes();
      } else {
        axios.get(`http://localhost:5000/recipes?cat=${this.state.category}`)
          .then(response => {
            this.setState({
              recipes: response.data
            })
          }).catch(error => {
            this.handleError(`Error getting recipes by category from the Database - ${error}`);
          })
      }
    }
  }
  
  render() {
    return (
      <div className='home-container'>
        <MessageModal
          modalIsOpen={this.state.msgModalIsOpen}
          message={this.state.message} 
          handleModalClose={this.handleModalClose}
        />
        <Navbar />
        <div className='home-wrapper'>
          <div className='home'>
            <div className='categories'>
              <button
                onClick={()=> {
                  this.handleCatFilter("all")
                }}
              >
                <h6>all</h6>
              </button> 
              {this.state.categories.map((category) => (
                  <button
                    key={category.categories_id}
                    onClick={()=> {
                      this.handleCatFilter(`${category.categories_name}`)
                    }}
                  >
                    <h6>{category.categories_name}</h6>
                  </button> 
              ))}
            </div>
            <div className='categories-title'>
              <h1>{this.state.category}</h1>
            </div>
            <div className='recipes'>
              {this.state.recipes.map(recipe => (
                <RecipeItem recipeItem={recipe} key={recipe.recipes_id} />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>  
    );
  }
}