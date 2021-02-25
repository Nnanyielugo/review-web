import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Navigation from './components/navigation';
import ThemeProvider from './ThemeProvider';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'whitesmoke',
    height: '100%',
  },
}));

export default function Index({ Component }) {
  const classes = useStyles();
  return (
    <ThemeProvider>
      <main className={classes.root}>
        <Navigation />
        <Component />
      </main>
    </ThemeProvider>
  );
}

Index.propTypes = {
  Component: PropTypes.func.isRequired,
};
