import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField, Grid, Typography, Button } from "@material-ui/core";
import { loginAccount } from "../../../redux/user/actions";
import { useStoreValue } from "../../../redux/store";

const useStyles = makeStyles({
  registerPaper: {
    margin: "5% auto",
    padding: 25,
    width: "60%"
  },
  submitButton: {
    float: "right"
  }
});

const initialForm = {
  email: "",
  password: ""
};

const Register = () => {
  const classes = useStyles();
  const [, dispatch] = useStoreValue();
  const [form, setForm] = useState(initialForm);

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await loginAccount(form, dispatch);

    if (result) {
      this.props.history.push("/");
    }
  };

  const handleChange = e => {
    const { value, name } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  return (
    <Paper className={classes.registerPaper}>
      <form onSubmit={handleSubmit}>
        <Grid container justify="center" alignItems="center" spacing={4}>
          <Grid xs={12} item>
            <Typography variant="h6">Sign In</Typography>
          </Grid>
          <Grid xs={12} item>
            <TextField
              variant="outlined"
              label="Email"
              name="email"
              type="email"
              value={form.email || ""}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              variant="outlined"
              type="password"
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid xs={12} item>
            <Button
              color="primary"
              variant="contained"
              className={classes.submitButton}
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Register;
