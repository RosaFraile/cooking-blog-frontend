import React from 'react';
import striptags from "striptags";
import Truncate from "react-truncate";
import { Link } from 'react-router-dom';

const TrickItem = (props) => {
  return (
    <div className='trick' key={props.trickItem.tricks_id}>
        <Link className="link" to={`/trick/${props.trickItem.tricks_id}`}>
            <h1>{props.trickItem.tricks_title}</h1>
        </Link>
        <p>
            <Truncate lines={5} ellipsis={
                <span>
                    <Link to={`/trick/${props.trickItem.tricks_id}`}>
                    <button className='read-more'>Read more</button>
                    </Link>
                </span>
                }>{striptags(props.trickItem.tricks_desc)}
            </Truncate>
        </p>
    </div>
  );
}

export default TrickItem;