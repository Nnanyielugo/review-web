import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../providers/Auth';
import { useReview } from '../providers/Review';

import Review from '../components/review';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Reviews() {
  const classes = useStyles();
  const auth = useAuth();
  const { fetchReviews, reviews } = useReview();
  // console.log('auth rev', auth, review)

  useEffect(async () => {
    await fetchReviews();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {reviews.reviews.map((review) => (
          <Grid item xs={12} key={review._id}>
            <Review review={review} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
