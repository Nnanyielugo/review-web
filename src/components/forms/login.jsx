import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Form, Field } from 'react-final-form';
import validate from 'validate.js';
import { FORM_ERROR } from 'final-form';
import { useModal } from '_providers/Modal';
import { useAuth } from '_providers/Auth';
import TextField from '_components/reusables/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
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
  errorContainer: {
    marginTop: 3,
    marginbottom: 3,
  },
  errorText: {
    textAlign: 'center',
    color: theme.palette.secondary.dark,
  },
  submitErrorContainer: {
    marginTop: 12,
    marginbottom: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function Login() {
  const classes = useStyles();
  const { updateModal, closeModal } = useModal();
  const { login } = useAuth();
  const constraints = {
    email: {
      email: true,
      presence: true,
    },
    password: {
      presence: true,
    },
  };

  const submit = async (values) => {
    try {
      await login({
        user: {
          ...values,
        },
      });
      closeModal();
    } catch (err) {
      return {
        [FORM_ERROR]: err.message,
      };
    }
  };

  return (
    <Form
      onSubmit={submit}
      validate={(values) => validate(values, constraints)}
      render={({
        handleSubmit, submitting, errors,
        touched, submitError, submitFailed,
      }) => (
        <form className={classes.root} onSubmit={handleSubmit}>
          <div className={classes.loginTextContainer}>
            <h3 className={classes.loginText}>Login</h3>
          </div>
          <div>
            <Field
              component={TextField}
              label="Email"
              fullWidth
              name="email"
              error={(errors.email && touched.email)}
            />
            {(errors.email && touched.email) && (
              <div className={classes.errorContainer}>
                <span className={classes.errorText}>{errors.email}</span>
              </div>
            )}
            <Field
              component={TextField}
              label="Password"
              fullWidth
              name="password"
              inputtype="password"
              error={(errors.password && touched.password)}
            />
            {(errors.password && touched.password) && (
              <div className={classes.errorContainer}>
                <span className={classes.errorText}>{errors.password}</span>
              </div>
            )}
          </div>
          <div className={classes.submitContainer}>
            <Button
              variant="contained"
              className={classes.submitButton}
              type="submit"
            >
              {submitting ? 'Submitting' : 'Submit'}
            </Button>
          </div>
          {(submitFailed && submitError) && (
            <div className={classes.submitErrorContainer}>
              <span className={classes.errorText}>{submitError}</span>
            </div>
          )}
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
