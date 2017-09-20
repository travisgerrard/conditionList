import { LOCAL_HOST } from './types';
import { handleResponse } from '../utils/setHeaders';


export function userSignupRequest(userData) {
  return dispatch => {
    return fetch(`${LOCAL_HOST}/api/users`, {
      method: 'post',
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => {
      console.log(data);
    })
  }
}

export function isUserExists(identifier) {
  return dispatch => {
    return fetch(`${LOCAL_HOST}/api/users/${identifier}`);
  }
}
