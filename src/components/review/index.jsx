import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteIconOutline from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    backgroundColor: theme.palette.grey[100],
    height: 330,
    marginRight: 20,
    display: 'flex',
    flexWrap: 'nowrap',
    padding: '20px 10px 20px 10px',
    overflowY: 'scroll',
    [theme.breakpoints.down('sm')]: {
      height: 400,
      display: 'block',
    },
  },
  imageContainer: {},
  image: {
    height: 260,
    padding: '20px 10px',
    [theme.breakpoints.down('sm')]: {
      height: 170,
      padding: '10px 5px',
    },
  },
  textContainer: {
    marginLeft: 10,
    overflowY: 'scroll',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 10,
      // scrollPaddingBottom: 10,
      height: 150,
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
  statsContainer: {
    // borderTop: '1px solid #d1d1d1',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    paddingTop: 10,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 10,
      marginRight: 10,
      paddingTop: 5,
    },
  },
  likes: {
    marginLeft: 5,
  },
  favorited: {
    marginTop: -5,
    fill: theme.palette.secondary.dark,
  },
  likesContainer: {
    marginLeft: 10,
    display: 'flex',
  },
  comments: {
    marginRight: 10,
    display: 'inline-block',
  },
  reviewHeader: {
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  reviewHeaderMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      margin: 0,
    },
  },
  respondContainer: {
    borderTop: '1px solid #d1d1d1',
    borderBottom: '1px solid #d1d1d1',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 50,
    paddingRight: 50,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 10,
      marginRight: 10,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
    },
  },
  favorite: {
    fill: theme.palette.secondary.dark,
  },
  favoriteContainer: {
    display: 'flex',
  },
  like: {
    marginTop: 5,
    marginLeft: 5,
  },
  comment: {
    fill: theme.palette.secondary.dark,
  },
  share: {
    fill: theme.palette.secondary.dark,
  },
}));

export default function Review({ item }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <h4 className={classes.reviewHeaderMobile}>Review for Book &quot;Title&quot;</h4>
      <div className={classes.imageContainer}>
        <img
          src="public/images/placeholder.png"
          alt="Book Cover"
          className={classes.image}
        />
      </div>
      <div>
        <div className={classes.textContainer}>
          <h4 className={classes.reviewHeader}>Review for Book &quot;Title&quot;</h4>
          <span className={classes.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </span>
        </div>
        <div>
          <div className={classes.statsContainer}>
            <div className={classes.likesContainer}>
              <FavoriteIcon className={classes.favorited} />
              <span className={classes.likes}>4 Likes</span>
            </div>
            <span className={classes.comments}>5 comments</span>
          </div>

          <div className={classes.respondContainer}>
            <div className={classes.favoriteContainer}>
              <FavoriteIconOutline className={classes.favorite} />
              <span className={classes.like}>Like</span>
            </div>
            <div className={classes.favoriteContainer}>
              <CommentIcon className={classes.comment} />
              <span className={classes.like}>comment</span>
            </div>
            <div className={classes.favoriteContainer}>
              <ShareIcon className={classes.share} />
              <span className={classes.like}>Share</span>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
}
