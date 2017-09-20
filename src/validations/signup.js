//import Validator from 'validator';
//import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};

  if (data.username === '') errors.username = "Can't be empty";
  // if (data.email === '') errors.email = "Can't be empty";
  // if (data.password === '') errors.password = "Can't be empty";
  // if (data.passwordConfirmation === '') errors.passwordConfirmation = "Can't be empty";
  // if (data.password !== data.passwordConfirmation) errors.passwordConfirmation = "Passwords must match";

  // if (!Validator.isEmail(data.email)) {
  //   errors.email = "Email is invalid";
  // }
  const isValid = Object.keys(errors).length === 0;

  return { errors, isValid }
}
