import {SENT_ID_SUCCESS, SENT_ID_FAILURE, RESET_FINISHED} from "./actionTypes";

export function sendID(email) {
  return (dispatch, getState) => {
    dispatch(
      {type: RESET_FINISHED}
    );
    const {uuid} = getState().form;
    const config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        uuid: uuid,
        email: email
      })
    };
    return fetch('/send_id/', config)
      .then(response => {
        if (response.ok) {
          return;
        }
        return response.text()
          .then(text => {
            dispatch({
              type: SENT_ID_FAILURE,
              payload: text
            });
            Promise.reject(text)
          })
      })
      .then(() => {
        dispatch({
          type: SENT_ID_SUCCESS
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function resetFinished() {
  return {
    type: RESET_FINISHED
  }
}
