import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Form, Field } from 'react-final-form';
import validate from 'validate.js';
import { useModal } from 'providers/Modal';
import { useAuth } from 'providers/Auth';
import TextField from 'components/reusables/TextField';

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
  loginTextContainer: {},
  loginText: {
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(-2),
  },
  registerButton: {
    border: 'none',
    background: 'none',
    color: theme.palette.primary.main,
  },
  registerContainer: {
    float: 'right',
  },
  forgotPwd: {
    border: 'none',
    background: 'none',
    color: theme.palette.primary.main,
    fontSize: 13,
  },
}));

export default function Login() {
  const classes = useStyles();
  const { updateModal } = useModal();
  const constraints = {
    email: {
      email: true,
      presence: true,
    },
    password: {
      presence: true,
    },
  };

  const submit = (values) => {};

  const ComposedTextField = ({
    label,
    inputType,
    fullWidth,
  }) => {
    return (
      <TextField
        label={label}
        type={inputType}
        fullWidth={fullWidth}
      />
    )
  }

  return (
    <Form
      onSubmit={submit}
      validate={(values) => validate(values, constraints)}
      render={({
        handleSubmit, submitting, errors,
        touched, submitError, submitFailed,
      }) => (
        <form className={classes.root}>
          <div className={classes.loginTextContainer}>
            <h3 className={classes.loginText}>Login</h3>
          </div>
          <div>
            <Field
              component={ComposedTextField}
              label="Email"
              fullWidth
              name="email"
              inputType="hhsk"
            />
            <Field
              component={ComposedTextField}
              label="Password"
              fullWidth
              name="password"
              inputType="password"
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
            <button
              className={classes.forgotPwd}
              type="button"
              onClick={() => updateModal('forgotpwd')}
            >
              Forgot Password
            </button>
            <div className={classes.registerContainer}>
              <span
                className={classes.registerText}
              >
                Not a member?
              </span>
              <button
                className={classes.registerButton}
                type="button"
                onClick={() => updateModal('register')}
              >
                Register
              </button>
            </div>
          </div>
        </form>
      )}
    />
  );
}
