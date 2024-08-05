import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment';

const RecipeSidebarList = (props) => {
    const recipeList = props.data.map(recipeItem => {
        return(
            <div key={recipeItem.recipes_id} className='recipe-item'>
                <div  className='recipe-img'>
                    <img src={`http://localhost:5000/images/${recipeItem.recipes_img_url}`} />
                </div>

                <div className='text-content'>
                    <div className='recipe-data'>
                        <div className='title'>{recipeItem.recipes_title}</div>
                        {recipeItem.recipes_publish_status === 'draft' ? (
                            <div className='publish-status'>Draft</div>
                        ):(
                            <div className='publish-status'>Published on {moment(recipeItem.recipes_published_on).format('YYYY-MM-DD')}</div>
                        )}
                    </div>
                    <div className='actions'>
                        <a className="action-icon edit" onClick={() => props.handleEditClick(recipeItem)}>
                            <FontAwesomeIcon icon="edit" />
                        </a>
                        <a className="action-icon trash" onClick={() => props.handleDeleteClick(recipeItem)}>
                            <FontAwesomeIcon icon="trash" />
                        </a>
                    </div>
                </div>
            </div>
        )
    })
    return <div className='recipe-sidebar-list-wrapper'>{recipeList}</div>
}

export default RecipeSidebarList;