import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Provider, { useBook } from '_providers/Book';

import Book from '_components/book';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export function Page() {
  const classes = useStyles();
  const { books, fetchBooks } = useBook();

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {books.books.map((book) => (
          <Grid item xs={12} key={book._id}>
            <Book book={book} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default function Books() {
  return (
    <Provider>
      <Page />
    </Provider>
  );
}
