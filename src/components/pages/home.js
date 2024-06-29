import React, { Component } from 'react';

import RecipeItem from '../recipes/recipeItem';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      recipes: []
    }
  }

  componentDidMount() {
    // TODO
    // Call the API to get the recipes

    const recipes = [
      {
        recipes_id: 1,
        recipes_title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        recipes_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        recipes_img: "https://cdn.pixabay.com/photo/2017/12/13/13/16/fruit-3016761_640.jpg"
      },
      {
        recipes_id: 2,
        recipes_title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        recipes_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        recipes_img: "https://cdn.pixabay.com/photo/2017/03/27/12/51/botanical-2178513_640.jpg"
      },
      {
        recipes_id: 3,
        recipes_title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        recipes_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        recipes_img: "https://cdn.pixabay.com/photo/2020/03/23/12/08/plant-4960675_640.jpg"
      },
      {
        recipes_id: 4,
        recipes_title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        recipes_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        recipes_img: "https://cdn.pixabay.com/photo/2020/05/19/13/15/moon-5190738_640.jpg"
        
      }
    ];

    this.setState({
      recipes: recipes
    })
  }

  render() {
    return (
      <div className='home'>
        <div className='recipes'>
          {this.state.recipes.map(recipe => (
            <RecipeItem recipeItem={recipe} key={recipe.recipes_id} />
          ))}
        </div>
      </div>
    );
  }
}