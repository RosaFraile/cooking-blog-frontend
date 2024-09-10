import {
    LOGIN,
    LOGOUT,
    FETCH_FAILURE,
    CLEAR_FAILURE
} from './types';

import axios from 'axios';

export function login(user, callback) {
    return function(dispatch) {
        axios.post('http://localhost:5000/auth/login', user, { withCredentials: true })
            .then(response => {
                localStorage.setItem("user", JSON.stringify(response.data))
                dispatch({
                    type: LOGIN,
                    payload: JSON.parse(localStorage.getItem("user"))
                })

                if (callback) {
                    callback();
                }
            })
            .catch(error => {
                if (error.response) {
                    // error.response.status: 400 or 404
                    dispatch({
                        type: FETCH_FAILURE,
                        payload: error.response.data.error
                    });
                }
        })
    }
}

export function logout() {
    return function(dispatch) {
        axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true })
            .then(response => {
                const currentUser = null
                localStorage.setItem("user", JSON.stringify(currentUser))
                dispatch({
                    type: LOGOUT,
                    payload: JSON.parse(localStorage.getItem("user"))
                })
            })
            .catch(error => {
                if (error.response) {
                    // error.response.status: 400 or 404
                    dispatch({
                        type: FETCH_FAILURE,
                        payload: error.response.data.error
                    });
                }
            })
    }
}

export function clearErrorText() {
    return function(dispatch) {
        dispatch({
            type: CLEAR_FAILURE,
            payload: ""
        })
    }
}