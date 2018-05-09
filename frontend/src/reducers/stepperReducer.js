import initialState from './initialState';
import {
  SET_ACTIVE_STEP
} from "../actions/actionTypes";


export default function reducer(state = initialState.stepper, action) {

  switch (action.type) {
    case SET_ACTIVE_STEP:
      return {
        ...state,
        activeStep: action.payload
      };
    default:
      return state;
  }

}
