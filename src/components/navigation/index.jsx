import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useModal } from 'providers/Modal';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'linear-gradient(#9cdff7, #f79cae)',
    margin: 0,
    padding: 0,
  },
  title: {
    marginLeft: theme.spacing(1),
    fontFamily: "'Dancing Script', cursive",
    fontSize: 24,
    marginTop: 0,
    marginBottom: 0,
    display: 'none',
    color: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    margin: 0,
    padding: 0,
  },
  logo: {
    width: 50,
    height: 50,
  },
  appBar: {
    background: 'linear-gradient(to right,#9cdff7, #f79cae)',
  },
  button: {
    color: theme.palette.secondary.light,
    fontSize: 15,
  },
  toolbar: {
    [theme.breakpoints.up('md')]: {
      marginLeft: 100,
      marginRight: 100,
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: 200,
      marginRight: 200,
    },
  },
}));

export default function Navigation() {
  const classes = useStyles();
  const { openModal } = useModal();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar className={classes.toolbar}>
          <Link
            to="/"
            className={classes.logoContainer}
          >
            <img
              className={classes.logo}
              src="public/images/logo.svg"
              alt=""
            />
            <h3 className={classes.title}>Review</h3>
          </Link>
          <Button
            className={classes.button}
            onClick={() => openModal('login')}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
