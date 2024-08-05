import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../navigation/navbar';
import Footer from '../footer/footer'
import RecipeItem from '../recipes/recipeItem';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      recipes: []
    }
    this.handleCatFilter = this.handleCatFilter.bind(this);
  }
  
  handleCatFilter(cat) {

  }

  componentDidMount() {
    axios.get("http://localhost:5000/recipes")
      .then(response => {
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
          <Link onClick={this.handleCatFilter("starters")} className="navbar-link link" to="?cat=starters">
                            <h6>STARTERS</h6>
                        </Link>
                        
                        <Link onClick={this.handleCatFilter("main")} className="navbar-link link" to="?cat=main">
                            <h6>MAIN COURSES</h6>
                        </Link>
                        <Link onClick={this.handleCatFilter("second")} className="navbar-link link" to="?cat=second">
                            <h6>SECOND COURSES</h6>
                        </Link>
                        <Link onClick={this.handleCatFilter("desserts")} className="navbar-link link" to="?cat=desserts">
                            <h6>DESSERTS</h6>
                        </Link>
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