import { SET_CURRENT_USER } from './types';
import { LOCAL_HOST } from './types';
import { handleResponse } from '../utils/setHeaders';
var jwtDecode = require('jwt-decode')

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch(setCurrentUser({}));
  }
};

export function login(data) {
  return dispatch => {
    console.log(data);
    return fetch(`${LOCAL_HOST}/api/auth`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => {
      console.log(data);
      const token = data.token;
      localStorage.setItem('jwtToken', token);
      dispatch(setCurrentUser(jwtDecode(token)))
    })
  }
}
