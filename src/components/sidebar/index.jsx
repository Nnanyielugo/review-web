import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useUser } from '_providers/User';
import { useAuth } from '_providers/Auth';
import { displayCount } from '_utils/display_utils';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.grey[50],
    position: 'fixed',
    overflow: 'auto',
    display: 'none',
    boxShadow: '5px 0px 10px -10px grey',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      marginLeft: 74,
      width: 250,
      paddingLeft: 5,
      paddingRight: 5,
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: 224,
      width: 300,
      paddingLeft: 10,
      paddingRight: 10,
    },
    borderRight: '1px whitesmoke solid',
    paddingTop: 85,
    zIndex: 999,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    border: '3px solid #d1d1d1',
    [theme.breakpoints.up('lg')]: {
      width: 200,
      height: 200,
      borderRadius: 100,
    },
  },
  bio: {
    marginTop: 20,
    textAlign: 'justify',
  },
  info: {
    marginLeft: 5,
    marginRight: 5,
  },
  displayname: {
    textAlign: 'center',
  },
  follower_count: {
    textAlign: 'center',
    display: 'block',
    marginTop: -12,
    marginBottom: -7,
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  const { auth } = useAuth();
  const { user, fetchUser } = useUser();

  useEffect(() => {
    fetchUser(auth.activeUser._id);
  }, [auth.activeUser]);

  if (!Object.keys(user.user).length) return null;
  return (
    <div className={classes.root}>
      <img
        className={classes.image}
        alt=""
        src="/public/images/profile-placeholder.png"
      />
      <div className={classes.info}>
        <h4 className={classes.displayname}>{user.user.displayname}</h4>
        <span className={classes.follower_count}>
          {displayCount(user.user.follower_count, 'follower')}
        </span>
      </div>
      {!!user.user.bio && <div className={classes.bio}>{user.user.bio}</div>}
    </div>
  );
}
