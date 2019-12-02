import userTypes from "./types";

export default (state, action) => {
  switch (action.type) {
    case userTypes.SET_CURRENT_USER:
      return { ...state, ...action.user };
    case userTypes.CLEAR_CURRENT_USER:
      return;
    default:
      return state;
  }
};
