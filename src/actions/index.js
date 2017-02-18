const SET_FORM_STATE = 'SET_FORM_STATE';

function setFormState(state) {
  return {
    type: SET_FORM_STATE,
    payload: state
  };
}

export {
  SET_FORM_STATE,
  setFormState
};
