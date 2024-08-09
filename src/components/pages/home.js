import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../navigation/navbar';
import Footer from '../footer/footer'
import RecipeItem from '../recipes/recipeItem';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      recipes: [],
      category: "all"
    }

    this.handleCatFilter = this.handleCatFilter.bind(this);
  }
  
  handleCatFilter(category) {
    this.setState({
      category
    })
    
  }

  componentDidMount() {
    axios.get("http://localhost:5000/categories")
      .then(response => {
        this.setState({
          categories: response.data
        })
      }).catch(error => {
        console.log("Get all categories error", error);
      })

    axios.get("http://localhost:5000/recipes")
      .then(response => {
        this.setState({
          recipes: response.data
        })
      }).catch(error => {
        console.log("Get all recipes error", error);
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.category !== this.state.category) {
      if (this.state.category === "all") {
        axios.get("http://localhost:5000/recipes")
          .then(response => {
            console.log("Response data all", response)
            this.setState({
              recipes: response.data
            })
          }).catch(error => {
            console.log("Get all recipes error", error);
          })
      } else {
        axios.get(`http://localhost:5000/recipes?cat=${this.state.category}`)
          .then(response => {
            console.log("Response data category", response)
            this.setState({
              recipes: response.data
            })
          }).catch(error => {
            console.log("Get recipes by category error", error);
          })
      }
    }
  }
  
  render() {
    return (
      <div className='home-container'>
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