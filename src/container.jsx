import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Navigation from '_components/navigation';
import { useAuth } from '_providers/Auth';
import { useReview } from '_providers/Review';
import ModalManager from './ModalManager';
import ThemeProvider from './ThemeProvider';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'whitesmoke',
    height: '100%',
  },
}));

export default function Index({ Component }) {
  const classes = useStyles();
  const { autoAuth } = useAuth();
  const { fetchReviews } = useReview();

  useEffect(async () => {
    autoAuth();
    await Promise.allSettled([
      fetchReviews(),
    ]);
  }, []);

  return (
    <ThemeProvider>
      <main className={classes.root}>
        <Navigation />
        <ModalManager />
        <Component />
      </main>
    </ThemeProvider>
  );
}

Index.propTypes = {
  Component: PropTypes.func.isRequired,
};
