import initialState from './initialState';
import {ADD_PHOTO, RESET_FORM, UPLOAD_REQUEST,
  UPLOAD_FAILURE, UPLOAD_SUCCESS, SET_PROP} from "../actions/actionTypes";


export default function reducer(state = initialState.form, action) {

  switch (action.type) {

    case ADD_PHOTO:
      const { dataURL } = action.payload;
      return {
        ...state,
        imageData: [...state.imageData, dataURL]
      };

    case RESET_FORM:
      return initialState.form;

    case UPLOAD_REQUEST:
      return {
        ...state,
        formUploadErrorMessage: "",
        isUploading: true
      };

    case UPLOAD_SUCCESS:
      const { uuid } = action.payload;
      return {
        ...state,
        uuid: uuid,
        isUploading: false
      };

    case UPLOAD_FAILURE:
      return {
        ...state,
        formUploadErrorMessage: action.payload,
        isUploading: false
      };

    case SET_PROP:
      const { name, value } = action.payload;
      return {
        ...state,
        surveyData: {
          ...state.surveyData,
          [name]: value
        }
      };

    default:
      return state;
  }
}
