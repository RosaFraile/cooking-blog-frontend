import { 
    LOGIN,
    LOGOUT,
    FETCH_FAILURE,
    CLEAR_FAILURE
} from '../actions/types';

const INIT_STATE = {
    currentUser: JSON.parse(localStorage.getItem("user")) || null
}

export default function(state=INIT_STATE, action) {
    switch (action.type) {
        case LOGIN:
            const currentUser = action.payload
            console.log("User", currentUser)
            return {
                ...state,
                currentUser
            };
        case LOGOUT:
            return {
                ...state,
                currentUser: null
            };
        case FETCH_FAILURE:
            console.log("Error from authReducer", action.payload)
            return {
                ...state,
                errorText: action.payload
            }
        case CLEAR_FAILURE:
            console.log("Clear failure", action.payload)
            return {
                ...state,
                errorText: action.payload
            }
        default:
            return state;
    }
}