import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useModal } from 'providers/Modal';
import { useAuth } from 'providers/Auth';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
    position: 'relative',
  },
  submitContainer: {
    marginTop: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    position: 'relative',
  },
  registerTextContainer: {},
  registerText: {
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(-2),
  },
  loginButton: {
    border: 'none',
    background: 'none',
    color: theme.palette.primary.main,
  },
  forgotPwd: {
    border: 'none',
    background: 'none',
    color: theme.palette.primary.main,
    fontSize: 13,
  },
}));

export default function Register() {
  const classes = useStyles();
  const { updateModal } = useModal();
  return (
    <form className={classes.root}>
      <div className={classes.registerTextContainer}>
        <h3 className={classes.registerText}>Register</h3>
      </div>
      <div>
        <TextField
          label="Email"
          fullWidth
        />
        <TextField
          label="Username"
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
        />
      </div>
      <div className={classes.submitContainer}>
        <Button
          variant="contained"
          className={classes.submitButton}
        >
          Submit
        </Button>
      </div>
      <div className={classes.bottomContainer}>
        <span>Already a member?</span>
        <button
          className={classes.loginButton}
          type="button"
          onClick={() => updateModal('login')}
        >
          Login
        </button>
      </div>
    </form>
  );
}
