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
  const { updateModal, closeModal } = useModal();
  const { register } = useAuth();

  const submit = async (values) => {
    try {
      await register({
        user: {
          email: values.email,
          username: values.username,
          displayname: values.displayname,
          password: values.password,
        },
      });
      closeModal();
    } catch (err) {
      return {
        [FORM_ERROR]: err.message,
      };
    }
  };

  const constraints = {
    email: {
      email: true,
      presence: true,
    },
    password: {
      presence: true,
    },
    confirmPassword: {
      presence: true,
      equality: {
        attribute: 'password',
        message: 'Confirm Password must be equal to Password',
      },
    },
    username: {
      presence: true,
    },
    displayname: {
      presence: true,
    },
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
          <div className={classes.registerTextContainer}>
            <h3 className={classes.registerText}>Register</h3>
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
              label="Username"
              fullWidth
              name="username"
              error={(errors.username && touched.username)}
            />
            {(errors.username && touched.username) && (
              <div className={classes.errorContainer}>
                <span className={classes.errorText}>{errors.username}</span>
              </div>
            )}
            <Field
              component={TextField}
              label="Display Name"
              fullWidth
              name="displayname"
              error={(errors.displayname && touched.displayname)}
            />
            {(errors.displayname && touched.displayname) && (
              <div className={classes.errorContainer}>
                <span className={classes.errorText}>{errors.displayname}</span>
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
            <Field
              component={TextField}
              label="Confirm Password"
              fullWidth
              name="confirmPassword"
              inputtype="password"
              error={(errors.confirmPassword && touched.confirmPassword)}
            />
            {(errors.confirmPassword && touched.confirmPassword) && (
              <div className={classes.errorContainer}>
                <span className={classes.errorText}>{errors.confirmPassword}</span>
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
            <div className={classes.errorContainer}>
              <span className={classes.errorText}>{submitError}</span>
            </div>
          )}
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
      )}
    />
  );
}
