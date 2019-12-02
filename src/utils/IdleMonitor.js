//https://stackoverflow.com/questions/667555/how-to-detect-idle-time-in-javascript-elegantly
//https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
import { logoutAccount } from "../redux/user/actions";

export const inactivityTime = dispatch => {
  var time;

  const logout = () => {
    clearTimeout(time);
    logoutAccount(dispatch);
  };

  const resetTimer = () => {
    clearTimeout(time);
    time = setTimeout(logout, 1000 * 60 * 15);
  };

  const events = [
    "load",
    "mousedown",
    "mousemove",
    "touchstart",
    "click",
    "scroll",
    "keypress"
    // "visibilitychange",
    // "msvisibilitychange",
    // "webkitvisibilitychange"
  ];

  events.forEach(name => {
    window.addEventListener(name, resetTimer, true);
  });
};
