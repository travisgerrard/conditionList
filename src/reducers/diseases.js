import { SET_DISEASES, UPDATE_DISEASE, ADD_DISEASE } from '../actions/types';


export default function (state = [], action = {}) {
  switch(action.type) {

    case SET_DISEASES:
      return action.diseases;

    case UPDATE_DISEASE:
      return state.map(item => {
        if (item._id === action.disease._id) return action.disease;
        return item;
      });

      case ADD_DISEASE:
      return [
        ...state,
        action.disease
      ];

    default: return state;
  }
}
