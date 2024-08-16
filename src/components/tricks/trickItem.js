import React, { Component } from 'react';
import Truncate from "react-truncate";
import moment from 'moment';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class TrickItem extends Component {
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
            <div className='trick' key={this.props.trickItem.tricks_id}>
                <div className='trick-heading'>
                    <h1>{this.props.trickItem.tricks_title}</h1>
                    <div className='auth-date'>
                        <div className='auth'>
                            <p>By <span>{this.props.trickItem.users_username}</span></p>
                        </div>
                        <div className='date'>
                            {this.props.trickItem.tricks_publish_status === "published" ?
                                (
                                    <p>Published on {moment(this.props.trickItem.tricks_published_on).format("MMMM DD, YYYY")}</p>
                                ):(
                                    <p>Draft</p>
                                )
                                
                            }
                        </div>
                    </div>
                </div>
                <div className='trick-desc'>
                        {this.state.readMore ? (
                            <p>
                                {this.props.trickItem.tricks_desc}
                                <span>
                                    <button className='read-more' onClick={this.handleClick}>Read less</button>
                                </span>
                            </p>
                            
                        ) : (
                            <Truncate lines={5} ellipsis={
                                <span>
                                        <button className='read-more' onClick={this.handleClick}>Read more</button>
                                </span>
                            }>{this.props.trickItem.tricks_desc}
                            </Truncate>
                        )}
                </div>
            </div>
          );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.user.currentUser
    }
  }
  
  export default connect(mapStateToProps, actions)(TrickItem);