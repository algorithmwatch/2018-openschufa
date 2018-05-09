import {} from '../actions/photo'; // IDE

import initialState from './initialState';
import {
  SET_PROCESSING,
  SET_IMAGEDATA,
  SET_SIZE,
  ROTATE_PHOTO,
  RESET_PHOTO,
  SET_EDIT_MODE,
  ADD_POLYLINE,
  UNDO_POLYLINE,
  SET_ACTIVE_STEP
} from '../actions/actionTypes';
import { STEP_ROTATE } from '../constants';

export default function stuff(state = initialState.photo, action) {

  switch (action.type) {

    case SET_PROCESSING:
      return {
        ...state,
        processing: action.payload
      };

    case SET_IMAGEDATA:
      const { imageData } = action.payload;
      return {
        ...state,
        imageData
      };

    case SET_SIZE:
      const { width, height } = action.payload;
      const landscape = (width > height);
      const rotation = landscape ? 90 : 0;
      return {
        ...state,
        size: { width, height },
        rotation,
        processing: false
      };

    case ROTATE_PHOTO:
      const { degrees } = action.payload;
      return {
        ...state,
        rotation: degrees
      };

    case RESET_PHOTO:
      return initialState.photo;

    case SET_EDIT_MODE:
      const { mode } = action.payload;
      return {
        ...state,
        editMode: mode
      };

    case ADD_POLYLINE:
      const { polyline } = action.payload;
      return {
        ...state,
        polylines: [...state.polylines, polyline]
      };

    case UNDO_POLYLINE:
      return {
        ...state,
        polylines: state.polylines.slice(0, -1)
      };

    case SET_ACTIVE_STEP:
      const activeStep = action.payload;
      if (activeStep === STEP_ROTATE) {
        return {
          ...state,
          polylines: []
        };
      } else {
        return state;
      }

    default:
      return state;
  }
}
