import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* {`http://localhost:5000/${props.recipeItem.img_url}`} */

const RecipeItem = (props) => {
  return (
    <div className='recipe' key={props.recipeItem.recipes_id}>
      <div className='img'>
        <img src={`http://localhost:5000/images/${props.recipeItem.recipes_img_url}`} alt="Recipe image" />
      </div>
      <div className="content">
        <div className='how-to-make'>
          <h6>how to make...</h6>
        </div>
        <div className='title'>
          <Link className="link" to={`/recipe/${props.recipeItem.recipes_id}`}>
            <h1>{props.recipeItem.recipes_title}</h1>
          </Link>
        </div>
        <div className="time-servings">
          <div><FontAwesomeIcon icon="clock" /> {props.recipeItem.recipes_prep_time}</div>
          <div>Servings: {props.recipeItem.recipes_servings}</div>
        </div>
        <div>By {props.recipeItem.users_username}</div>
      </div>
    </div>
  );
}

export default RecipeItem;