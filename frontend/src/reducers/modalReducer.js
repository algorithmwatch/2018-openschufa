import initialState from './initialState';
import {OPEN_MODAL, CLOSE_MODAL} from '../actions/actionTypes';


export default function reducer(state = initialState.modal, action) {

  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        open: true,
        id: action.id
      };
    case CLOSE_MODAL:
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
}
