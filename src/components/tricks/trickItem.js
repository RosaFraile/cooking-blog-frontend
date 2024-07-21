import React, { Component } from 'react';
import striptags from "striptags";
import Truncate from "react-truncate";
import moment from 'moment';

export default class TrickItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            readMore: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();

        if(this.state.readMore) {
            this.setState({
                readMore: false
            })
        } else {
            this.setState({
                readMore: true
            })
        }
    }

    render() {
        return (
            <div className='trick' key={this.props.trickItem.id}>
                <div className='trick-heading'>
                    <h1>{this.props.trickItem.title}</h1>
                    <div className='auth-date'>
                        <div className='auth'>
                            <p>By <span>{this.props.trickItem.username}</span></p>
                        </div>
                        <div className='date'>
                            <p>Published on {moment(this.props.trickItem.created_at).format("MMMM DD, YYYY")}</p>
                        </div>
                    </div>
                </div>
                <div className='trick-desc'>
                        {this.state.readMore ? (
                            <p>
                                {striptags(this.props.trickItem.desc)}
                                <span>
                                    <button className='read-more' onClick={this.handleClick}>Read less</button>
                                </span>
                            </p>
                        ) : (
                            <p>
                                <Truncate lines={5} ellipsis={
                                <span>
                                        <button className='read-more' onClick={this.handleClick}>Read more</button>
                                </span>
                                }>{striptags(this.props.trickItem.desc)}
                                </Truncate>
                            </p>
                        )}
                </div>
            </div>
          );
    }
}