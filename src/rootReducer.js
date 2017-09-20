import { combineReducers } from 'redux';

import auth from './reducers/auth'
import diseases from './reducers/diseases'

export default combineReducers({
  auth,
  diseases
});
