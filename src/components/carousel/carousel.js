import React from "react";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Carousel = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 === props.recipes.length ? 0 : prevIndex + 1
      );
    };

    const handlePrevious = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex - 1 < 0 ? props.recipes.length - 1 : prevIndex - 1
      );
    };

    const handleDotClick = (index) => {
      setCurrentIndex(index);
    };

    return (
      <div className="carousel">
        <img
          key={currentIndex}
          src={`http://localhost:5000/images/${props.recipes[currentIndex].recipes_img_url}`}
        />
        <div className="title">
          <Link className="link" to={`/recipe/${props.recipes[currentIndex].recipes_id}`}>
            <h1>{props.recipes[currentIndex].recipes_title}</h1>
          </Link>
        </div>
        <div className="time-servings">
          <div><FontAwesomeIcon icon="clock" /> {props.recipes[currentIndex].recipes_prep_time}</div>
          <div>Servings: {props.recipes[currentIndex].recipes_servings}</div>
        </div>

        <div className="slide_direction">
          <div className="left" onClick={handlePrevious}>
            <FontAwesomeIcon icon="chevron-left" />  
          </div>

          <div className="right" onClick={handleNext}>
            <FontAwesomeIcon icon="chevron-right" />
          </div>
        </div>
  
        <div className="indicator">
          {props.recipes.map((_, index) => (
            <div
              key={index}
              className={`dot ${currentIndex === index ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>
      </div>
    );
}

export default Carousel;