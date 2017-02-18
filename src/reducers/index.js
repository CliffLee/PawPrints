import { combineReducers } from 'redux';

import {
  SET_FORM_STATE
} from '../actions'

const defaultFormState = {
  lastSeen: null,
  generalLocation: null,
  petDescription: ''
};

const rootReducer = combineReducers({
  form: formReducer
});

function formReducer(state = defaultFormState, action) {
  switch (action.type) {
    case SET_FORM_STATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export default rootReducer;
