import messageTypes from "./types";

export const setMessage = (message, variant) => dispatch => {
  dispatch({
    type: messageTypes.SET_MESSAGE,
    message,
    variant
  });
};

export const clearMessage = dispatch => {
  dispatch({
    type: messageTypes.CLEAR_MESSAGE
  });
};
