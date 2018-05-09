import initialState from './initialState';
import {SENT_ID_SUCCESS, SENT_ID_FAILURE, RESET_FINISHED} from "../actions/actionTypes";


export default function reducer(state = initialState.finished, action) {

  switch (action.type) {

    case SENT_ID_SUCCESS:
      return {...state, sentEmail: true};

    case SENT_ID_FAILURE:
      return {
        ...state,
        sentEmail: true,
        emailErrorMessage: action.payload
      };

    case RESET_FINISHED:
      return initialState.finished;

    default:
      return state;
  }

}
