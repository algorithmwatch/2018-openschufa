import {} from '../reducers/photoReducer'; // IDE

import {
  SET_PROCESSING,
  SET_IMAGEDATA,
  SET_SIZE,
  ROTATE_PHOTO,
  SET_EDIT_MODE,
  ADD_POLYLINE,
  UNDO_POLYLINE,
  SET_ACTIVE_STEP,
  ADD_PHOTO, ADD_PDF
} from "./actionTypes";
import { STEP_ROTATE, STEP_SAVED } from "../constants";


export function displayCapturedPhoto(file) {
  return (dispatch) => {
    if (file.type.startsWith('image/')) {
      selectImageFile(dispatch, file);
    } else {
      selectPdfFile(dispatch, file);
    }
  }
}

function selectImageFile(dispatch, file) {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = () => {

    // image data was read from file
    dispatch({
      type: SET_IMAGEDATA,
      payload: {imageData: fileReader.result}
    });

    const img = new Image();
    img.src = fileReader.result;
    img.onload = () => {

      // image data was loaded and it's size can be retrieved
      const {width, height} = img;
      dispatch({
        type: SET_SIZE,
        payload: {width, height}
      });
      dispatch({
        type: SET_ACTIVE_STEP,
        payload: STEP_ROTATE
      })
    };
  };
}

function selectPdfFile(dispatch, file) {
  dispatch({
    type: ADD_PDF,
    payload: {file}
  });
  dispatch({
    type: SET_ACTIVE_STEP,
    payload: STEP_SAVED
  })
}

export function rotatePhoto(degrees) {
  return {
    type: ROTATE_PHOTO,
    payload: {
      degrees
    }
  };
}

export function setEditMode(mode) {
  return {
    type: SET_EDIT_MODE,
    payload: {
      mode
    }
  };
}

export function addPolyline(polyline) {
  return {
    type: ADD_POLYLINE,
    payload: {
      polyline
    }
  };
}

export function undoPolyline() {
  return {
    type: UNDO_POLYLINE
  };
}

function rad(a) {
  return a * Math.PI / 180;
}

export function savePhoto() {
  return (dispatch, getState) => {

    dispatch({
      type: SET_PROCESSING,
      payload: true
    });

    const { imageData, rotation, polylines } = getState().photo;

    const image = new Image();
    image.src = imageData;
    image.onload = () => {
      const { width, height } = image;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (rotation === 0 || rotation === 180) {
        canvas.width = width;
        canvas.height = height;
      } else {
        canvas.width = height;
        canvas.height = width;
      }

      let translation = {
        0:   { x: 0, y: 0 },
        90:  { x: height, y: 0 },
        180: { x: width, y: height},
        270: { x: 0, y: width}
      }[
        rotation
      ];

      ctx.save();
      ctx.translate(translation.x, translation.y);
      ctx.rotate(rad(rotation));
      ctx.drawImage(image, 0, 0);
      ctx.restore();

      ctx.lineCap = ctx.lineJoin = 'round';
      polylines.forEach(polyline => {
        ctx.lineWidth = polyline.lineWidth;
        ctx.beginPath();
        ctx.moveTo(polyline.points[0].x, polyline.points[0].y);
        polyline.points.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.stroke();
      });

      dispatch({
        type: ADD_PHOTO,
        payload: {
          dataURL: canvas.toDataURL('image/jpeg', 0.6)
        }
      });
      dispatch({
        type: SET_PROCESSING,
        payload: false
      });
    };

  }
}
