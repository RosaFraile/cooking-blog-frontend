import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* {`http://localhost:5000/${props.recipeItem.img_url}`} */

const RecipeItem = (props) => {
  return (
    <div className='recipe' key={props.recipeItem.id}>
      <div className='img'>
        <img src={props.recipeItem.img_url} alt="Imagen receta" />
      </div>
      <div className="content">
        <div className='how-to-make'>
          <h6>how to make...</h6>
        </div>
        <div className='title'>
          <Link className="link" to={`/recipe/${props.recipeItem.id}`}>
            <h1>{props.recipeItem.title}</h1>
          </Link>
        </div>
        <div className="time-servings">
          <div><FontAwesomeIcon icon="clock" /> {props.recipeItem.prep_time}</div>
          <div>Servings: {props.recipeItem.servings}</div>
        </div>
        <div>By {props.recipeItem.username}</div>
      </div>
    </div>
  );
}

export default RecipeItem;