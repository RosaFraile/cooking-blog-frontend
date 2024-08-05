import {
    LOGIN,
    LOGOUT
} from './types';

import axios from 'axios';

export function login(user, callback) {
    return function(dispatch) {
        axios.post('http://localhost:5000/auth/login', user, { withCredentials: true })
            .then(response => {
                if(response.data === '404' || response.data === '400') {
                    console.log("Wrong username or password");
                } else {
                    localStorage.setItem("user", JSON.stringify(response.data))
                    dispatch({
                        type: LOGIN,
                        payload: JSON.parse(localStorage.getItem("user"))
                    })

                    if (callback) {
                        callback();
                    }
                }
            })
            .catch(error => {
                console.log("login error", error);
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
                console.log("logout error", error)
            })
    }
}