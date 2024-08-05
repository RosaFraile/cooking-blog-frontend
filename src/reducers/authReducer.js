import { 
    LOGIN,
    LOGOUT
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
        default:
            return state;
    }
}