import React, { Component } from 'react';
import Navbar from '../navigation/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DropzoneComponent from "react-dropzone-component";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class WriteRecipe extends Component {
  constructor() {
    super();

    this.state = {
      recipes_title: "",
      recipes_desc:"",
      recipes_prep_time: "",
      recipes_servings: "",
      recipes_img: "",
      categories_name: "starters",
      ingredients: [],
      steps: [],
      ingredient: "",
      step: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleIngredientAddition = this.handleIngredientAddition.bind(this);
    this.handleStepAddition = this.handleStepAddition.bind(this);
    this.handleDeleteIngredient = this.handleDeleteIngredient.bind(this);
    this.handleDeleteStep = this.handleDeleteStep.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this. djsConfig.bind(this);
    this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleIngredientAddition() {
    const ingredient = this.state.ingredient;
    this.setState({
      ingredients: this.state.ingredients.concat(ingredient),
      ingredient: ""
    })
  }

  handleDeleteIngredient(indice) {
    this.setState({
      ingredients: this.state.ingredients.filter((ingredient) => {
        return ingredient != this.state.ingredients[indice]
      })
    })
  }

  handleStepAddition() {
    const step = this.state.step;
    this.setState({
      steps: this.state.steps.concat(step),
      step: ""
    })
  }

  handleDeleteStep(indice) {
    this.setState({
      steps: this.state.steps.filter((step) => {
        return step != this.state.steps[indice]
      })
    })
  }

  componentDidMount() {
    this.setState({
    });
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1
    };
  }

  handleFeaturedImageDrop() {
    return {
      addedfile: file => this.setState({ recipes_img: file })
    }
  }


  render() {
    return (
      <div className='write-recipe-wrapper'>
        <Navbar />
        <h2>How to write a recipe</h2>
        Add the ingredients and the directions of the recipe one by one. You will see the result on the right column.
        You can erase them if you need to. The description of the recipe is optional. The rest of the fields are compulsory.
        <div className='write-recipe-container'>
          <div className='write-recipe-left-column'>
            <form>
              <input
                type="text"
                name="recipes_title"
                value={this.state.recipes_title}
                placeholder='Title'
                onChange={this.handleChange}
              />
              <textarea
                rows="10"
                type="text"
                name="recipes_desc"
                value={this.state.recipes_desc}
                placeholder='Description'
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="recipes_prep_time"
                value={this.state.recipes_prep_time}
                placeholder='Preparation time'
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="recipes_servings"
                value={this.state.recipes_servings}
                placeholder='Servings'
                onChange={this.handleChange}
              />
              <select
                name='categories_name'
                value={this.state.categories_name}
                onChange={this.handleChange}
                className='select-element'
              >
                <option value="starters">Starters</option>
                <option value="main">Main Courses</option>
                <option value="second">Second Courses</option>
                <option value="desserts">Desserts</option>
              </select>
              <input
                type="text"
                name="ingredient"
                value={this.state.ingredient}
                placeholder='Add Ingredient'
                onChange={this.handleChange}
              />
              <FontAwesomeIcon onClick={this.handleIngredientAddition} icon="circle-plus" />
              <textarea
                rows="10"
                type="text"
                name="step"
                value={this.state.step}
                placeholder='Add Step'
                onChange={this.handleChange}
              />
              <div onClick={this.handleStepAddition}><FontAwesomeIcon icon="circle-plus" /></div>
              
              <div className="image-uploaders">
                <DropzoneComponent
                  ref={this.featuredImageRef}
                  config={this.componentConfig()}
                  djsConfig={this.djsConfig()}
                  eventHandlers={this.handleFeaturedImageDrop()}
                >
                  <div className="dz-message">Featured Image</div>
                </DropzoneComponent>
              </div>
              
              <button type="submit">Save</button>
            </form>
          </div>
          <div className='write-recipe-right-column'>
            <h2>Preview</h2>
            <div className='preview-title'>
              <h6 className='cursive'>how to make...</h6>
              <h5>{this.state.recipes_title}</h5>
            </div>
            <div className='featured-image'>
              {this.state.recipes_img ? 
                <img className="img-preview" src={URL.createObjectURL(this.state.recipes_img)}/>
                : null}
            </div>
            <div className='preview-prep-time-servings'>
              <div className='preview-prep-time'>
                <div className='preview-prep-time-heading'>
                  <FontAwesomeIcon icon="clock" />
                </div>
                <div className='preview-prep-time-content'>
                  {this.state.recipes_prep_time}
                </div>
              </div>
              <div className='preview-servings'>
                <div className='preview-servings-heading'>
                  <h6>Servings</h6>
                </div>
                <div className='preview-servings-content'>
                  {this.state.recipes_servings}
                </div>
              </div>
            </div>
            <div className='preview-desc'>{this.state.recipes_desc}</div>
            <div className='preview-ingredients'>
              <h5>Ingredients</h5>
              <ul>
                {this.state.ingredients.map((ingredient, idx) => (
                  <div key={idx}>
                    <li>{ingredient}
                      <span onClick={(event) => {
                        this.handleDeleteIngredient(idx)}}><FontAwesomeIcon icon="circle-minus" /></span>
                    </li>
                  </div>   
                ))}
              </ul>
            </div>
            <div className='preview-directions'>
              <h5>Directions</h5>
                {this.state.steps.map((step, idx) => (
                  <div key={idx}>
                    <h4>Step {idx+1}
                    <span onClick={(event) => {
                        this.handleDeleteStep(idx)}}><FontAwesomeIcon icon="circle-minus" /></span>
                    </h4>
                    <p>{step}</p>      
                  </div>
                ))}
            </div>
          </div>
          </div>
      </div>
    );
  }
}