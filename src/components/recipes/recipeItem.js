import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RecipeItem = (props) => {
  return (
    <div className='recipe' key={props.recipeItem.id}>
        <div className='img'>
        <img src={props.recipeItem.img} alt="" />
        </div>
        <div className='content'>
          <div><h6>how to make...</h6></div>
          <Link className="link" to={`/recipe/${props.recipeItem.id}`}>
            <h1>{props.recipeItem.title}</h1>
          </Link>
          <div><FontAwesomeIcon icon="clock" /> {props.recipeItem.prep_time}</div>
          <div>By {props.recipeItem.username}</div>
        </div>
    </div>
  );
}

export default RecipeItem;