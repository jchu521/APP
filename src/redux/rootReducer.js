import userReducer from "./user/reducer";
import messageReducer from "./message/reducer";

export const rootReducer = ({ user, message }, action) => {
  // middleware goes here, i.e calling analytics service, etc.

  return {
    user: userReducer(user, action),
    message: messageReducer(message, action)
  };
};
