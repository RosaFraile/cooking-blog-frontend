import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TrickSidebarList = (props) => {
    const trickList = props.data.map(trickItem => {
        return(
            <div key={trickItem.id} className='trick-item-thumb'>
                <div  className='trick-thumb-img'>
                    <img src={trickItem.thumb_image_url} />
                </div>

                <div className='text-content'>
                    <div className='title'>{trickItem.name}</div>
                    <div className='actions'>
                        <a className="action-icon" onClick={() => props.handleEditClick(portfolioItem)}>
                            <FontAwesomeIcon icon="edit" />
                        </a>
                        <a className="action-icon" onClick={() => props.handleDeleteClick(portfolioItem)}>
                            <FontAwesomeIcon icon="trash" />
                        </a>
                    </div>
                </div>
            </div>
        )
    })
    return <div className='trick-sidebar-list-wrapper'>{trickList}</div>
}

export default TrickSidebarList;