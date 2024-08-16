import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TrickItem from './trickItem';

//<div className='title'>{trickItem.tricks_title}</div>
const TrickSidebarList = (props) => {
    const trickList = props.data.map(trickItem => {
        return(
            <div key={trickItem.tricks_id} className='trick-sidebar-item'>
                <div className='trick-content'>
                    <div className='title'>{trickItem.tricks_title}</div>
                    {trickItem.tricks_publish_status === 'draft' ? (
                            <div className='publish-status'>Draft</div>
                        ):(
                            <div className='publish-status'>Published on {moment(trickItem.tricks_published_on).format('YYYY-MM-DD')}</div>
                    )}
                </div>
                <div className='actions'>
                    <div className="action-icon edit" onClick={() => props.handleEditClick(trickItem)}>
                        <FontAwesomeIcon icon="edit" />
                    </div>
                    <div className="action-icon delete" onClick={() => props.handleDeleteClick(trickItem)}>
                        <FontAwesomeIcon icon="trash-can" />
                    </div>
                </div>
            </div>
        )
    })
    return <div className='trick-sidebar-list-wrapper'>{trickList}</div>
}

export default TrickSidebarList;