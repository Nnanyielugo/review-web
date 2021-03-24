import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useReview } from '_providers/Review';

import Review from '_components/review';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Reviews() {
  const classes = useStyles();
  const { reviews } = useReview();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {reviews.reviews && reviews.reviews.map((review) => (
          <Grid item xs={12} key={review._id}>
            <Review review={review} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
