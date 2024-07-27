import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import ReactHtmlParser from "react-html-parser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions';

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
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleImageDelete = this.handleImageDelete.bind(this);
    this.handleUpdateFormSubmission = this.handleUpdateFormSubmission.bind(this);
  }

  handleDeleteClick() {
    axios.delete(`http://localhost:5000/recipes/${this.state.currentId}`)
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
    console.log("Current ID", this.state.currentId)
    axios
      .get(`http://localhost:5000/recipes/${this.state.currentId}`)
      .then(response => {
        console.log(response)
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
    console.log("Paso por aqui componentDidMount")
    this.getRecipeItem();
  }

  render() {
    const {
      title,
      desc,
      prep_time,
      servings,
      img_url,
      published_on,
      users_username
    } = this.state.recipeItem;

    console.log(this.state.recipeItem)
    
    const ingredients = this.state.ingredients;
    const steps = this.state.steps;
    console.log(ingredients)
    console.log(steps)

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
                <p>By <span>{users_username}</span></p>
              </div>
              <div className='date'>
                <p>Published on {moment(published_on).format("MMMM DD, YYYY")}</p>
              </div>
              {
                this.props.currentUser.users_username === users_username ?
                (<div className="edit-delete">
                  <div onClick={this.handleEditClick} className='edit'>
                    <FontAwesomeIcon icon="edit" />
                  </div>
                  <div  onClick={this.handleDeleteClick} className='delete'>
                    <FontAwesomeIcon icon="trash" />
                  </div>
                </div>
                ):(
                  null
                )
              }
            </div>
            <div className='image'>
            
              <img src={`http://localhost:5000/images/${img_url}`} alt="Featured image" />
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
                    <li key={idx}>{ingredient.ingredients_desc}</li>
                ))}
              </ul>
            </div>
            <div className='steps'>
              <h2>Steps</h2>
              {steps.map((step,idx) => (
                <div  key={idx}>
                  <h4>Step {idx+1}</h4>
                  <p>{step.steps_desc}</p>
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

//export default withRouter(RecipeDetail);

function mapStateToProps(state) {
  console.log("PostForm", state)
  return {
      currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps, actions)(RecipeDetail);