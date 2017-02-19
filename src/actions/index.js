import axios from 'axios';

const SET_FORM_STATE = 'SET_FORM_STATE';
const SET_INITIAL_REGION = 'SET_INITIAL_REGION';
const SET_USER_STATE = 'SET_USER_STATE';
const SET_MAP_STATE = 'SET_MAP_STATE';
const SET_CAPTURE_STATE = 'SET_CAPTURE_STATE';

const GET_LOST_LISTING = 'GET_LOST_LISTING';
const POST_LOST_ANIMAL = 'POST_LOST_ANIMAL';

function getLostListing(){
  const url = 'https://pawprints-159112.appspot-preview.com/api/lost/nearby';
  var request = axios.get(url);

  console.log('getting lost listing')
  console.log(request);

  return {
    type: GET_LOST_LISTING,
    payload: request
  }

}

function postLostAnimal(){
  const url = 'https://pawprints-159112.appspot.com/api/lost/add';
  var request = axios.get(url);

  return {
    type: POST_LOST_ANIMAL,
    payload: request
  }

}

function setFormState(state) {
  return {
    type: SET_FORM_STATE,
    payload: state
  };
}

function setMapState(state) {
  return {
    type: SET_MAP_STATE,
    payload: state
  };
}

function setInitialRegion(region) {
  return {
    type: SET_INITIAL_REGION,
    payload: region
  };
}

function setUserState(state) {
  return {
    type: SET_USER_STATE,
    payload: state
  };
}

function setCaptureState(state) {
  return {
    type: SET_CAPTURE_STATE,
    payload: state
  };
}

export {
  setFormState,
  SET_FORM_STATE,
  setInitialRegion,
  SET_INITIAL_REGION,
  setUserState,
  SET_USER_STATE,
  setMapState,
  SET_MAP_STATE,
  setCaptureState,
  SET_CAPTURE_STATE,
  getLostListing,
  GET_LOST_LISTING,
  postLostAnimal,
  POST_LOST_ANIMAL
};
