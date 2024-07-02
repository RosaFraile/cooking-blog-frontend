import React from 'react';
import striptags from "striptags";
import Truncate from "react-truncate";
import { Link } from 'react-router-dom';

const RecipeItem = (props) => {
  return (
    <div className='recipe' key={props.recipeItem.recipes_id}>
        <div className='img'>
        <img src={props.recipeItem.recipes_img} alt="" />
        </div>
        <div className='content'>
          <div><h6>how to make...</h6></div>
          <Link className="link" to={`/recipe/${props.recipeItem.recipes_id}`}>
            <h1>{props.recipeItem.recipes_title}</h1>
          </Link>
        </div>
    </div>
  );
}

export default RecipeItem;