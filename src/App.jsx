import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 10,
    marginRight: 10,
    [theme.breakpoints.up('md')]: {
      marginLeft: 324,
      marginRight: 130,
      marginTop: theme.spacing(2),
    },
    [theme.breakpoints.up('lg')]: {
      display: 'block',
      marginLeft: 524,
      marginRight: 230,
      marginTop: theme.spacing(3),
    },
    backgroundColor: '#FFF',
    height: '100vh',
    marginTop: theme.spacing(1),
    overflow: 'auto',
    paddingTop: 85,
    paddingLeft: 20,
    flex: 1,
    // position: 'relative',
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>Hello World</div>
    </div>
  );
}
