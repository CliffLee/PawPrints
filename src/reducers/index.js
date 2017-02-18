import { combineReducers } from 'redux';

import {
  SET_FORM_STATE,
  SET_INITIAL_REGION,
  SET_USER_STATE
} from '../actions'

const defaultFormState = {
  lastSeen: null,
  generalLocation: null,
  petDescription: '',
  generalLocationMapModalVisible: false
};

const deaultUserState = {
  location: {
    latitude: 0,
    longitude: 0
  }
};

const rootReducer = combineReducers({
  form: formReducer,
  initialRegion: initialRegionReducer
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

function initialRegionReducer(state = null, action) {
  switch (action.type) {
    case SET_INITIAL_REGION:
      return action.payload;
    default:
      return state;
  }
}

export default rootReducer;
