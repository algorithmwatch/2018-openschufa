import {BASE64_MARKER, STEP_FINISHED} from "../constants";
import {
  RESET_FORM, UPLOAD_SUCCESS, UPLOAD_FAILURE,
  UPLOAD_REQUEST, SET_PROP, SET_ACTIVE_STEP, UPLOAD_PROGRESS
} from "./actionTypes";

export function sendData() {
  return (dispatch, getState) => {
    dispatch({
      type: UPLOAD_REQUEST
    });
    dispatch({
      type: SET_ACTIVE_STEP,
      payload: STEP_FINISHED
    });
    const {imageData, surveyData} = getState().form;
    const formData = new FormData();
    Object.keys(surveyData).forEach(key => formData.append(key, surveyData[key]));
    imageData.forEach(dataURI => {
      const arr = convertDataURIToBinary(dataURI);
      const blob = new Blob([arr], { type: 'image/png' });
      formData.append('blob', blob, 'image.png');
    });
    const config = {
      method: 'POST',
      body: formData
    };
    return futch('/upload/', config, dispatch)
      .then(response => {
        if (response.statusText === "OK") {
          return JSON.parse(response.body);
        }
        else {
          return Promise.reject(response.body)
        }
      })
      .then(json => {
        dispatch({
          type: UPLOAD_SUCCESS,
          payload: json
        })
      })
      .catch(error => {
        dispatch({
          type: UPLOAD_FAILURE,
          payload: error
        });
      })
  }
}

function convertDataURIToBinary(dataURI) {
  const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  const base64 = dataURI.substring(base64Index);
  const raw = window.atob(base64);
  const rawLength = raw.length;
  const array = new Uint8Array(rawLength);

  for(let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

export function resetForm() {
  return {
    type: RESET_FORM
  };
}

export function setProp(name, value) {
  return {
    type: SET_PROP,
    payload: { name, value }
  }
}

function futch(url, opts={}, dispatch) {
  return new Promise((response, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => response({
      body: xhr.response,
      statusText: xhr.statusText,
      type: xhr.responseType
    });
    xhr.onerror = reject;
    if (xhr.upload)
      xhr.upload.onprogress = e => {
        if (e.lengthComputable)
          dispatch({
            type: UPLOAD_PROGRESS,
            payload: e.loaded / e.total * 100
          })
      };
    xhr.open(opts.method || 'get', url);
    xhr.send(opts.body);
  });
}

