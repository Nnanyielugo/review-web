import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#FFF',
    position: 'fixed',
    overflow: 'auto',
    display: 'none',
    boxShadow: '5px 0px 10px -10px grey',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      marginLeft: 124,
      width: 200,
      paddingLeft: 5,
      paddingRight: 5,
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: 224,
      width: 300,
      paddingLeft: 10,
      paddingRight: 10,
    },
    borderRight: '1px whitesmoke solid',
    paddingTop: 85,
    zIndex: 999,
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  return (
    <div className={classes.root} />
  );
}
