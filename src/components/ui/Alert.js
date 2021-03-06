import React, { Component } from "react";
import classNames from "classnames";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { withStyles } from "@material-ui/core/styles";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const styles = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9
    // marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  root: {
    top: 70,
    backgroundColor: "transparent"
  }
});

class Alert extends Component {
  render() {
    const { classes, message, onClose, open } = this.props;

    const Icon = message !== {} ? variantIcon[message.variant] : "";

    return (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={open}
        autoHideDuration={3500}
        onClose={onClose}
        className={classes.root}
        ContentProps={{
          classes: {
            root: classes.root
          }
        }}>
        {message && message.variant && (
          <SnackbarContent
            className={classNames(classes[message.variant])}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <>
                  <Icon
                    className={classNames(classes.icon, classes.iconVariant)}
                  />
                  <ul>
                    {message.text.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </>
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={onClose}>
                <CloseIcon className={classes.icon} />
              </IconButton>
            ]}
          />
        )}
      </Snackbar>
    );
  }
}

export default withStyles(styles)(Alert);
