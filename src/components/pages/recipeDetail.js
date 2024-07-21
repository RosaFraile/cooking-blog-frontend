import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import ReactHtmlParser from "react-html-parser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';

import Navbar from '../navigation/navbar';
import Footer from '../footer/footer';
import PostForm from '../posts/postForm';

class RecipeDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: this.props.match.params.id,
      recipeItem: {},
      ingredients: [],
      steps : [],
      editMode: false
    }
    
    this.getRecipeItem = this.getRecipeItem.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleImageDelete = this.handleImageDelete.bind(this);
    this.handleUpdateFormSubmission = this.handleUpdateFormSubmission.bind(this);
  }

  handleDelete() {
    axios.delete(`http://localhost:5000/recipe/${this.state.currentId}`)
    .then(response => {
      this.props.history.push("/");
    }).catch(error => {
      console.log("handleDelete error", error)
    })
  }

  handleUpdateFormSubmission(post) {
    this.setState({
      recipeItem: post,
      editMode: false
    });
  }

  handleImageDelete() {
    this.setState({
      recipeItem: {
        img: ""
      }
    });
  }

  handleEditClick() {
//    if (this.props.loggedInStatus === "LOGGED_IN") {
      this.setState({ editMode: true });
//    }
  }

  getRecipeItem() {
    axios
      .get(`http://localhost:5000/recipe/${this.state.currentId}`)
      .then(response => {
        this.setState({
          recipeItem: response.data,
          ingredients: response.data.ingredients,
          steps: response.data.steps
        })
      }).catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.getRecipeItem();
  }

  render() {
    const {
      title,
      desc,
      username,
      published_on,
      img_url,
      prep_time,
      servings,
      publish_status
    } = this.state.recipeItem;

    console.log(this.state.recipeItem)

    const ingredients = this.state.ingredients;
    const steps = this.state.steps;

    const contentManager = () => {
      if (this.state.editMode) {
        return (
          <PostForm
            handleImageDelete={this.handleImageDelete}
            handleUpdateFormSubmission={this.handleUpdateFormSubmission}
            editMode={this.state.editMode}
            post={this.state.recipeItem}
          />
        );
      } else {
        return (
          <div className='recipe-detail-wrapper'>
            <div className='title'>
              <h2>how to make...</h2>
              <h1>{title}</h1>
            </div>
            <div className='description'>
              {ReactHtmlParser(desc)}
            </div>
            <div className='author-date'>
              <div className='author'>
                <p>By <span>{username}</span></p>
              </div>
              <div className='date'>
                <p>Published on {moment(published_on).format("MMMM DD, YYYY")}</p>
              </div>
              <div className="edit-delete">
                <div onClick={this.handleEditClick} className='edit'>
                  <FontAwesomeIcon icon="edit" />
                </div>
                <div  onClick={this.handleDelete} className='delete'>
                  <FontAwesomeIcon icon="trash" />
                </div>
              </div>
            </div>
            <div className='image'>
              <img src={img_url} alt="Featured image" />
            </div>
            <div className='time-servings'>
              <div className='prep-time'>
                <div>
                  <FontAwesomeIcon icon="clock" />
                </div>
                <div>{prep_time}</div>
              </div>
              <div className='servings'>
                <div>Servings</div>
                <div>{servings}</div>
              </div>
              
            </div>
            <div className='ingredients'>
              <h2>Ingredients</h2>
              <ul className='inside'>
                {ingredients.map((ingredient,idx) => (
                    <li key={idx}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className='steps'>
              <h2>Steps</h2>
              {steps.map((step,idx) => (
                <div  key={idx}>
                  <h4>Step {idx+1}</h4>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        );
      }
    };

    return (
      <div className='recipe-detail-page'>
        <Navbar />
        {contentManager()}
        <Footer />
      </div>
    );
  }
}

export default withRouter(RecipeDetail);