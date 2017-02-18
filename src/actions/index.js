const SET_FORM_STATE = 'SET_FORM_STATE';
const SET_INITIAL_REGION = 'SET_INITIAL_REGION';
const SET_USER_STATE = 'SET_USER_STATE';
const SET_MAP_STATE = 'SET_MAP_STATE';

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

export {
  setFormState,
  SET_FORM_STATE,
  setInitialRegion,
  SET_INITIAL_REGION,
  setUserState,
  SET_USER_STATE,
  setMapState,
  SET_MAP_STATE
};
