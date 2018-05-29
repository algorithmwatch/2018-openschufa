import { RESET_PHOTO, SET_ACTIVE_STEP } from './actionTypes';
import { STEP_CAPTURE } from '../constants';

export function setActiveStep(step) {
  return dispatch => {
    if (step === STEP_CAPTURE) dispatch({ type: RESET_PHOTO });
    dispatch({
      type: SET_ACTIVE_STEP,
      payload: step,
    });
  };
}
