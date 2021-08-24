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
  const { fetchReviewAndComments } = useReview();
  const [review, setReview] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchReviewAndComments(id)
      .then((response) => {
        setReview(response);
      })
      .catch((err) => {
        // handle error or show message
        console.log(err);
      });
    return () => {
      setReview({});
    };
  }, []);

  if (!Object.keys(review).length) return null;

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ReviewItem review={review} />
        </Grid>
      </Grid>
    </div>
  );
}
