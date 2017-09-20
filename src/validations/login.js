//import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};

  if (data.identifier === '') errors.identifier = "Can't be empty";
  //if (data.password === '') errors.password = "Can't be empty";


  return {
    errors,
    isValid: isEmpty(errors)
  }
}
