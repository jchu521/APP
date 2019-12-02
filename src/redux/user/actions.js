import axios from "axios";
import userTypes from "./types";
import messageTypes from "../message/types";
import history from "../../utils/history";
import moment from "moment";
import setAuthorizationToken from "../../utils/auth/setAuthorizationToken";
import jwt from "jsonwebtoken";

//**  Register Account
export const registerAccount = async (data, dispatch) => {
  const URL = "http://localhost:3001/api/v1/user/register";
  const result = await axios
    .post(URL, data)
    .then(res => {
      if (res.status === 201) {
        setSession(dispatch, res.data);
        history.push("/");
      }
    })
    .catch(err => {
      if (err.response) {
        if (err.response.status === 400) {
          dispatch({
            type: messageTypes.SET_MESSAGE,
            text: err.response.data.message,
            variant: "error"
          });
        }
      }
    });

  return result;
};

//**  login account
export const loginAccount = (loginInfo, dispatch) => {
  axios
    .post("http://localhost:3001/api/v1/user/signIn", loginInfo)
    .then(res => {
      setSession(dispatch, res.data);
      history.push("/");
    })
    .catch(err => {
      if (err.response.status === 404) {
        dispatch({
          type: messageTypes.SET_MESSAGE,
          text: err.response.data.message,
          variant: "error"
        });
      }
    });
};

//**  Logout account
export const logoutAccount = dispatch => {
  localStorage.removeItem("id_token");
  localStorage.removeItem("expires_at");
  localStorage.removeItem("access_token");

  history.push("/");

  return dispatch({ type: userTypes.CLEAR_CURRENT_USER });
};

//** Update user details */
export const updateUserDetails = (data, dispatch) => {
  axios
    .post("http://localhost:3001/api/v1/user/updateUserDetails", data)
    .then(res => {
      localStorage.setItem("id_token", res.data.idToken);
      dispatch({
        type: userTypes.SET_CURRENT_USER,
        user: jwt.decode(res.data.idToken)
      });

      dispatch({
        type: messageTypes.SET_MESSAGE,
        text: res.data.message,
        variant: "success"
      });
      // history.push("/profile");
    })
    .catch(err => {
      dispatch({
        type: messageTypes.SET_MESSAGE,
        text: err.response.data.message,
        variant: "error"
      });
    });
};

//** Update user avatar*/
//https://github.com/bradtraversy/react_file_uploader/blob/master/client/src/components/FileUpload.js
export const updateUserAvatar = (data, dispatch) => {
  const formData = new FormData();

  formData.append("imageFile", data);

  return axios
    .post("http://localhost:3001/api/v1/user/uploadingPhoto", formData)
    .then(res => {
      localStorage.setItem("id_token", res.data.idToken);
      console.log(jwt.decode(res.data.idToken));
      dispatch({
        type: userTypes.SET_CURRENT_USER,
        user: jwt.decode(res.data.idToken)
      });

      dispatch({
        type: messageTypes.SET_MESSAGE,
        text: res.data.message,
        variant: "success"
      });

      return res;
    })
    .catch(err => {
      dispatch({
        type: messageTypes.SET_MESSAGE,
        text: err.response.data.message,
        variant: "error"
      });
    });
};

//** Get user avatar image */
//https://stackoverflow.com/questions/41846669/download-an-image-using-axios-and-convert-it-to-base64
export const getUserAvatar = (fileId, dispatch) => {
  return axios
    .get(`http://localhost:3001/api/v1/user/avatar/${fileId}`, {
      responseType: "arraybuffer"
    })
    .then(res => {
      return Buffer.from(res.data, "binary").toString("base64");
    })
    .catch(err => {
      // dispatch({
      //   type: messageTypes.SET_MESSAGE,
      //   text: err.response.data.message,
      //   variant: "error"
      // });
    });
};

//** Update user email verify state */
export const updateUserEmailState = (user, dispatch) => {
  console.log(1);
  return axios
    .get(
      `http://localhost:3001/api/v1/user/verifyEmail/${user.userId}/${user.hash}`
    )
    .then(res => {
      dispatch({
        type: userTypes.SET_CURRENT_USER,
        user: jwt.decode(res.data.idToken)
      });
      return res;
    })
    .catch(err => {
      console.log(123);
      // dispatch({
      //   type: messageTypes.SET_MESSAGE,
      //   text: err.response.data.message,
      //   variant: "error"
      // });
    });
};

//** Set local storage */
const setSession = (dispatch, authResult) => {
  const expiresAt = moment().add(authResult.expiresIn, "m");
  localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  localStorage.setItem("id_token", authResult.idToken);
  localStorage.setItem("access_token", authResult.accessToken);

  const accessToken = localStorage.getItem("access_token") || "";
  setAuthorizationToken(accessToken);
  // console.log(authResult);
  // console.log(`id token ${JSON.stringify(jwt.decode(authResult.idToken))}`);
  // console.log(
  //   `access Token: ${JSON.stringify(jwt.decode(authResult.accessToken))}`
  // );

  dispatch({
    type: userTypes.SET_CURRENT_USER,
    user: jwt.decode(authResult.idToken)
  });

  dispatch({
    type: messageTypes.SET_MESSAGE,
    text: authResult.message,
    variant: "success"
  });
};

//** check is token expires */
export const isAuthenticated = () => {
  const expiresAt = JSON.parse(localStorage.getItem("expires_at"));

  return new Date().getTime() < expiresAt;
};

//** Check user email is verify */
export const isUserEmailVerify = () => {
  const user = jwt.decode(localStorage.id_token);
  console.log(user);

  if (user && !user.isEmailVerify) {
    history.push(`/unVerifyEmail/${user._id}`);
  }

  return user && user.isEmailVerify;
};

//** check session exist */
export const checkSessionExist = dispatch => {
  if (localStorage.id_token && localStorage.access_token && isAuthenticated()) {
    setAuthorizationToken(localStorage.access_token);

    dispatch({
      type: userTypes.SET_CURRENT_USER,
      user: jwt.decode(localStorage.id_token)
    });
  }
};
