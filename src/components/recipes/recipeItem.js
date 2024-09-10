import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

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
          <div>Difficulty: <span className='difficulty'>{props.recipeItem.recipes_difficulty}</span></div>
        </div>
        <div className='author-date'>
          <div className='author'>By {props.recipeItem.users_username}</div>
          <div className='date'>
            {props.recipeItem.recipes_publish_status === "published" ?
              (
                <p>Published on {moment(props.recipeItem.recipes_published_on).format("MMMM DD, YYYY")}</p>
              ):(
                <p>Draft</p>
              )    
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeItem;