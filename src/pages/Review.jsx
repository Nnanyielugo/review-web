import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useReview } from '_providers/Review';
import { useParams } from 'react-router-dom';

import ReviewItem from '_components/review/review';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Review() {
  const classes = useStyles();
  const { fetchReview, reviews } = useReview();
  const [review, setReview] = useState({});
  const { id } = useParams();
  console.log('id from params', id);

  useEffect(async () => {
    const response = await fetchReview(id);
    if (response) {
      setReview(response.review);
    }
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ReviewItem review={reviews.review} />
        </Grid>
      </Grid>
    </div>
  );
}
