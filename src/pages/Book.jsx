import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Provider, { useBook } from '_providers/Book';
import { useParams } from 'react-router-dom';

import BookItem from '_components/book/book';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export function Page() {
  const classes = useStyles();
  const { fetchBook } = useBook();
  const [book, setBook] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchBook(id)
      .then((response) => {
        setBook(response.book);
      })
      .catch((err) => {
        // handle error or show message
        console.log(err);
      });
    return () => {
      setBook({});
    };
  }, []);

  if (!book) return null;

  if (!Object.keys(book).length) return null;
  console.log('bbook in comp', book);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BookItem book={book} />
        </Grid>
      </Grid>
    </div>
  );
}

export default function Book() {
  return (
    <Provider>
      <Page />
    </Provider>
  );
}
