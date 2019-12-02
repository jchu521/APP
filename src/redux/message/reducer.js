import messageTypes from "./types";

export default (state, action) => {
  const { text, variant } = action;

  switch (action.type) {
    case messageTypes.SET_MESSAGE:
      return {
        ...state,
        text,
        variant
      };
    case messageTypes.CLEAR_MESSAGE:
      return [];

    default:
      return state;
  }
};
