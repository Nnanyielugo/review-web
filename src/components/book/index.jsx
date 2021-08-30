import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: 'auto',
    marginRight: 20,
    padding: '20px 10px 20px 10px',
    [theme.breakpoints.down('sm')]: {
      // height: 435,
      display: 'block',
      marginRight: 15,
    },
  },
  wrapper: {
    textAlign: 'center',
    height: 'auto',
    display: 'flex',
    flexWrap: 'nowrap',
    overflowY: 'scroll',
    [theme.breakpoints.down('sm')]: {
      height: 400,
      display: 'block',
      // display: '-webkit-box',
      // '-webkit-line-clamp': 4,
      // '-webkit-box-orient': 'vertical',
      // overflow: 'hidden',
      paddingTop: 8,
      paddingBottom: 8,
    },
  },
  imageContainer: {
    [theme.breakpoints.down('sm')]: {
      height: 170,
      padding: 5,
    },
  },
  image: {
    height: 260,
    padding: '20px 10px',
    [theme.breakpoints.down('sm')]: {
      height: 160,
      padding: '10px 5px',
    },
  },
  textContainer: {
    marginLeft: 10,
    overflowY: 'scroll',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 10,
      // scrollPaddingBottom: 10,
      // height: 150,
      marginTop: 3,
      marginLeft: 0,
    },
  },
  text: {
    display: 'inline-block',
    textAlign: 'justify',
    padding: '10px 15px',
    [theme.breakpoints.up('md')]: {
      height: 180,
    },
  },
  bookHeader: {
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  bookAuthor: {
    margin: '0 0 5px 0',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  bookHeaderMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      margin: 0,
    },
  },
  bookAuthorMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      margin: '0 0 5px 0',
    },
  },
}));

export default function Book({ book }) {
  const classes = useStyles();
  if (!book) return null;
  return (
    <Paper className={classes.root}>
      <div className={classes.wrapper}>
        <h4 className={classes.bookAuthorMobile}>
          {book.author.first_name}
          &nbsp;
          {book.author.family_name}
        </h4>
        <Link to={`/books/${book._id}`}>
          <h5 className={classes.bookHeaderMobile}>{book.title}</h5>
        </Link>

        <div className={classes.imageContainer}>
          <img
            src="/public/images/placeholder.png"
            alt="Book Cover"
            className={classes.image}
          />
        </div>
        <div>
          <div className={classes.textContainer}>
            <h4 className={classes.bookAuthor}>
              {book.author.first_name}
              &nbsp;
              {book.author.family_name}
            </h4>
            <Link to={`/books/${book._id}`}>
              <h5 className={classes.bookHeader}>{book.title}</h5>
            </Link>
            <span className={classes.text}>{book.summary}</span>
          </div>
        </div>
      </div>
    </Paper>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
};
