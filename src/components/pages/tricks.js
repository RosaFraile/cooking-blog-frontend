import React, { Component } from 'react';

import TrickItem from '../tricks/trickItem';

export default class Tricks extends Component {
  constructor() {
    super();

    this.state = {
      tricks: []
    }
  }

  componentDidMount() {
    // TODO
    // Call the API to get the cooking tricks

    const tricks = [
      {
        tricks_id: 1,
        tricks_title: "The golden rules of cooking",
        tricks_desc: "Of all the important advice out there about cooking, this by far has to be the number 1 rule of cooking: read your recipe completely before getting started. This may seem like a mundane task (especially when you are excited to dive in!), but you'll be so thankful yoy took the tome to do it!"
      },
      {
        tricks_id: 2,
        tricks_title: "How to prevent food from sticking",
        tricks_desc: "Love the sear of a stainless skillet but prefer to skip the srubbing after the peppers meld to the bottom midway through cooking? A little more oil should help, but don´t just pour it over the top of the food or you'll end up with a greasy, soggy mess."
      },
      {
        tricks_id: 3,
        tricks_title: "Reviving crystallized honey",
        tricks_desc: "Ever go to ypur pantry to find your bear-shaped bottle contains a solid unwieldly mass of crystallized honey? Don't throw it away! Honey never goes bad, bu it does crystalize in humid conditions."
      },
      {
        tricks_id: 4,
        tricks_title: "How to make simple syrup",
        tricks_desc: "Want to sweeten your lemonade or iced tea? Instead of reaching for the sugar bowl, you'll get a better result - no sandy granules at the bottom of the glass - if you mix up a batch of simple syrup. Here's how."
        
      }
    ];

    this.setState({
      tricks: tricks
    })
  }

  render() {
    return (
      <div className='tricks'>
        {this.state.tricks.map(trick => (
          <TrickItem trickItem={trick} key={trick.tricks_id} />
        ))}
      </div>
    );
  }
}