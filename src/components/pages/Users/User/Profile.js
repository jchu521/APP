import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, Grid, Avatar, Button } from "@material-ui/core";
import AccountIcon from "@material-ui/icons/AccountCircle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStoreValue } from "../../../../redux/store";
import MenuItem from "@material-ui/core/MenuItem";
import {
  updateUserDetails,
  updateUserAvatar,
  getUserAvatar
} from "../../../../redux/user/actions";

const useStyles = makeStyles({
  root: {
    marginTop: 40,
    padding: 30
  },

  avatarGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },

  avatar: {
    margin: 10,
    width: 150,
    height: 150
  },

  avatarButton: {
    marginTop: 20,
    width: "60%"
  },

  photo: {
    fontSize: 150
  },

  cancelButton: {
    marginRight: 10
  }
});

const Profile = () => {
  const classes = useStyles();
  const [{ user }, dispatch] = useStoreValue();
  const [isLoading, setIsLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [form, setForm] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [uploadPhoto, setUploadPhoto] = useState(false);

  useEffect(() => {
    if (user) {
      setForm(user);
      getUserAvatarPhoto(user);
    }
  }, [user]);

  const getUserAvatarPhoto = async user => {
    if (user && user.avatar) {
      const data = await getUserAvatar(user.avatar._id);
      // let image = new Blob([data], { type: "image/png" });
      // let imageUrl = URL.createObjectURL(image);
      // console.log(imageUrl);
      if (data) {
        setPhoto(data);
      }
    }
    setIsLoading(false);
  };

  const handleChangeUserPhoto = async event => {
    setUploadPhoto(true);
    const imageFile = event.target.files[0];
    // console.log(imageFile);
    if (imageFile) {
      // setPhoto(URL.createObjectURL(imageFile));
      const result = await updateUserAvatar(imageFile, dispatch);
      if (result.status === 200) {
        setUploadPhoto(false);
      }
    }
  };

  const handleChangeState = evt => {
    const { name, value } = evt.target;

    if (name !== "role") {
      setForm({
        ...form,
        [name]: value
      });
      setShowButton(true);
    } else {
      setForm({
        ...form,
        [name]: {
          position: value
        }
      });
      setShowButton(true);
    }
  };

  const handleSave = e => {
    e.preventDefault();

    updateUserDetails(form, dispatch);
    setShowButton(false);
  };

  const handleUnSaveButton = () => {
    setShowButton(false);
    setForm(user);
  };

  return (
    <Paper className={classes.root}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5" component="h3">
              Profile
            </Typography>
          </Grid>
          <form onSubmit={handleSave}>
            <Grid container>
              <Grid item xs={3} className={classes.avatarGrid}>
                <Avatar
                  alt="User Image"
                  src={photo ? `data:image/jpeg;base64,${photo}` : null}
                  className={classes.avatar}
                >
                  <AccountIcon className={classes.photo} />
                </Avatar>
                <Button
                  variant="contained"
                  component="label"
                  className={classes.avatarButton}
                  color="primary"
                >
                  {!uploadPhoto ? "Upload File" : "Uploading..."}
                  <input
                    type="file"
                    name="photo"
                    style={{ display: "none" }}
                    onChange={handleChangeUserPhoto}
                    accept="image/*"
                  />
                </Button>
              </Grid>
              <Grid item xs={9}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      className={classes.textField}
                      margin="normal"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChangeState}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      className={classes.textField}
                      margin="normal"
                      value={form.lastName}
                      name="lastName"
                      onChange={handleChangeState}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Role"
                      className={classes.textField}
                      select
                      margin="normal"
                      fullWidth
                      value={form.role.position}
                      name="role"
                      onChange={handleChangeState}
                    >
                      {["Admin", "SuperManager", "Manager", "Client"].map(
                        item => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        )
                      )}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      className={classes.textField}
                      margin="normal"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChangeState}
                    />
                  </Grid>
                  {/* <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Phone"
                      className={classes.textField}
                      value={form.phone}
                      type="number"
                      name="phone"
                      onChange={handleChangeState}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Address"
                      className={classes.textField}
                      value={form.address}
                      name="address"
                      onChange={handleChangeState}
                      margin="normal"
                    />
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ paddingTop: 20 }}>
              {showButton ? (
                <Grid container justify="flex-end">
                  <Button
                    variant="contained"
                    className={classes.cancelButton}
                    color="secondary"
                    onClick={handleUnSaveButton}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.saveButton}
                    color="primary"
                    type="submit"
                  >
                    Save
                  </Button>
                </Grid>
              ) : null}
            </Grid>
          </form>
        </Grid>
      )}
    </Paper>
  );
};

export default Profile;
