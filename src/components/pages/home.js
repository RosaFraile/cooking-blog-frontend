import React, { Component } from 'react';
import axios from 'axios';

import Navbar from '../navigation/navbar';
import Footer from '../footer/footer'
import RecipeItem from '../recipes/recipeItem';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      recipes: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:5000/recipes")
      .then(response => {
        console.log("Paso por aqui:", response.data)
        this.setState({
          recipes: response.data
        })
      }).catch(error => {
        console.log("Get all recipes error", error);
      })
  }

  render() {
    return (
      <div className='home-container'>
        <Navbar />
        <div className='home-wrapper'>
          <div className='home'>
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