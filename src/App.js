import React, { useEffect } from "react";
import { Route } from "react-router-dom";

import NavBar from "./components/Navbar/Navbar";
import Home from "./components/pages/Home/Home";
import Register from "./components/pages/Users/Register";
import SignIn from "./components/pages/Users/SignIn";
import Profile from "./components/pages/Users/User/Profile";
import VerifyEmail from "./components/pages/Users/User/VerifyEmail";

import {
  checkSessionExist,
  isAuthenticated,
  isUserEmailVerify
} from "./redux/user/actions";
import { useStoreValue } from "./redux/store";
import { inactivityTime } from "./utils/IdleMonitor";

const App = ({ history }) => {
  const [{ user, message }, dispatch] = useStoreValue();

  useEffect(() => {
    if (!user) {
      checkSessionExist(dispatch);
      console.log(user);
    } else {
      inactivityTime(dispatch);
      console.log(user);
    }
  }, [user, dispatch]);

  return (
    <>
      <NavBar
        user={isAuthenticated() ? user : null}
        dispatch={dispatch}
        message={message}
      />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/register" component={Register} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/verifyEmail/:userId" component={VerifyEmail} />
      <Route
        path="/profile"
        render={() => (isAuthenticated() ? <Profile /> : history.push("/"))}
      />
    </>
  );
};

export default App;
