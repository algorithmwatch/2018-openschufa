import initialState from './initialState';
import { SWITCH_LANGUAGE } from '../actions/actionTypes';

export default function reducer(state = initialState.intl, action) {
  switch (action.type) {
    case SWITCH_LANGUAGE:
      return {
        ...state,
        language: action.language,
        messages: action.messages,
      };
    default:
      return state;
  }
}
