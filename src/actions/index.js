const SET_FORM_STATE = 'SET_FORM_STATE';
const SET_INITIAL_REGION = 'SET_INITIAL_REGION';
const SET_USER_STATE = 'SET_USER_STATE';

function setFormState(state) {
  return {
    type: SET_FORM_STATE,
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
  SET_FORM_STATE,
  setFormState,
  SET_INITIAL_REGION,
  setInitialRegion,
  SET_USER_STATE,
  setUserState
};
