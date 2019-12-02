import React, { useState, useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import Alert from "../ui/Alert";
import { clearMessage } from "../../redux/message/actions";
import { logoutAccount, getUserAvatar } from "../../redux/user/actions";
import { Avatar } from "@material-ui/core";
import AccountIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    avatar: { marginRight: 10 }
  })
);

export default function Navbar({ user, dispatch, message }) {
  const classes = useStyles();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (user) {
      getUserAvatarPhoto(user);
    }
  }, [user]);

  const getUserAvatarPhoto = async user => {
    if (user && user.avatar) {
      const data = await getUserAvatar(user.avatar._id);

      if (data) {
        setPhoto(data);
      }
    }
  };

  const handleCloseAlert = () => {
    clearMessage(dispatch);
  };

  const handleLogout = () => {
    logoutAccount(dispatch);
  };

  return (
    <>
      {message && message.text && (
        <Alert open={true} message={message} onClose={handleCloseAlert} />
      )}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" className={classes.title}>
            App
          </Typography>
          {!user ? (
            <>
              <Button component={Link} to="/signIn" color="inherit">
                Sign In
              </Button>
              <Button component={Link} to="/register" color="inherit">
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/profile" color="inherit">
                <Avatar
                  alt="User Image"
                  src={photo ? `data:image/jpeg;base64,${photo}` : null}
                  className={classes.avatar}
                >
                  <AccountIcon className={classes.photo} />
                </Avatar>
                {user.firstName} {user.lastName}
              </Button>
              <Button
                component={Link}
                color="inherit"
                to="/"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
