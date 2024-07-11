import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import Navbar from '../navigation/navbar';
import Footer from '../footer/footer';

export default class RecipeDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: this.props.match.params.id,
      recipeItem: {},
      ingredients: [],
      steps : [],
      date: "",
      editMode: false
    }
    
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/recipe/${this.state.currentId}`)
      .then(response => {
        console.log(response.data);

        const date = moment(response.data.created_at).format("MMMM DD, YYYY");
        const category_id = response.data.cat_id

        console.log(category_id)

        this.setState({
          recipeItem: response.data,
          ingredients: response.data.ingredients,
          steps: response.data.steps,
          date,
          category_id
        })

        this.state.ingredients.map(ingredient => {
          console.log(ingredient)
        })
        this.state.steps.map(step => {
          console.log(step)
        })
        console.log("category in parent",this.state.recipeItem.cat_id)
      }).catch(error => {
        console.log(error);
      })
  }
  render() {
    return (
      <div className='recipe-detail-page'>
        <Navbar />
        <div className='recipe-detail-wrapper'>
          <div className='title'>
            <h2>how to make...</h2>
            <h1>{this.state.recipeItem.title}</h1>
          </div>
          <div className='description'>
            <p>{this.state.recipeItem.desc}</p>
          </div>
          <div className='author-date'>
            <div className='author'>
              <p>By <span>{this.state.recipeItem.username}</span></p>
            </div>
            <div className='date'>
              <p>Published on {this.state.date}</p>
            </div>
          </div>
          <div className='image'>
            <img src={this.state.recipeItem.img} alt="Featured image" />
          </div>
          <div className='ingredients'>
            <h2>Ingredients</h2>
            <ul className='inside'>
              {this.state.ingredients.map((ingredient,idx) => (
                  <li key={idx}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className='steps'>
            <h2>Steps</h2>
            {this.state.steps.map((step,idx) => (
              <div  key={idx}>
                <h4>Step {idx+1}</h4>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}