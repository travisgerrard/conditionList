import { SET_DISEASES, UPDATE_DISEASE, ADD_DISEASE } from './types';
import { LOCAL_HOST } from './types';
import { setHeaders, handleResponse } from '../utils/setHeaders';



export function diseaseUpdate(disease) {
  return {
    type: UPDATE_DISEASE,
    disease
  }
}

export function setDiseases(diseases) {
  return {
    type: SET_DISEASES,
    diseases
  }
}

export function addDisease(disease) {
  return {
    type: ADD_DISEASE,
    disease
  }
}

export function updateDisease(data) {
  console.log(data);
  return dispatch => {
    fetch(`${LOCAL_HOST}/api/diseases/${data._id}`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: setHeaders({
        "Content-type": "application/json"
      })
    }).then(handleResponse)
      .then(data => dispatch(diseaseUpdate(data)))
  }
}

export function tempDisease() {
  console.log("tempDisease pressed");
    fetch(`${LOCAL_HOST}/api/diseases/tempPopulate`, {
      method: 'get',
      headers: setHeaders({
        "Content-type": "application/json"
      })
    })

}

export function fetchDiseases() {
  return dispatch => {
    fetch(`${LOCAL_HOST}/api/diseases`, {
      method: 'get',
      headers: setHeaders({
        "Content-type": "application/json"
      })
    }).then(handleResponse)
      .then(data => {
        //console.log(`The data is ${data}`);
        dispatch(setDiseases(data));
      });
  }
}

export function fetchDiseasesWithCondition(specialty) {
  return dispatch => {
    fetch(`${LOCAL_HOST}/api/diseases/?specialty=${specialty}`, {
      method: 'get',
      headers: setHeaders({
        "Content-type": "application/json"
      })
    }).then(handleResponse)
      .then(data => {
        //console.log(`The data is ${data}`);
        dispatch(setDiseases(data));
      });
  }
}

export function saveDisease(data) {
  return dispatch => {
    fetch(`${LOCAL_HOST}/api/diseases`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: setHeaders({
        "Content-type": "application/json"
      })
    }).then(handleResponse)
      .then(data => dispatch(addDisease(data)));
  }
}
