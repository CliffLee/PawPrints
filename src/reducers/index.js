import { combineReducers } from 'redux';

import {
  SET_FORM_STATE,
  SET_INITIAL_REGION,
  SET_MAP_STATE,
  SET_USER_STATE,
  SET_CAPTURE_STATE,
  GET_LOST_LISTING
} from '../actions'

const defaultListingState = {
  animals: []
};

const defaultFormState = {
  lastSeen: null,
  generalLocation: null,
  petDescription: '',
  generalLocationMapModalVisible: false
};

const defaultMapState = {
  lostPets: []
};

const defaultUserState = {
  location: {
    latitude: 0,
    longitude: 0
  }
};

const defaultCaptureState = {
  imagePath: ''
};

const rootReducer = combineReducers({
  form: formReducer,
  map: mapReducer,
  capture: captureReducer,
  initialRegion: initialRegionReducer,
});

function listingReducer(state = defaultListingState, action){

  console.log('within reducer, payload: ')
  console.log(action.payload)

  switch (action.type){

   /* case GET_LOST_LISTING:
      return{
        ...state,
        ...action.payload
      }
    default:
      return state;*/

  }

}


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

function mapReducer(state = defaultMapState, action) {
  switch (action.type) {
    case SET_MAP_STATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

function captureReducer(state = defaultCaptureState, action) {
  switch (action.type) {
    case SET_CAPTURE_STATE:
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
