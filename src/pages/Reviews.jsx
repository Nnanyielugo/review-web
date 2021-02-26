import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../providers/auth';

import Review from '../components/review';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Reviews() {
  const classes = useStyles();
  const auth = useAuth();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).map((_arr, index) => (
          <Grid item xs={12} key={index}>
            <Review item={index} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
