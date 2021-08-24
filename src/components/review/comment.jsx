import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  comment: {
    marginTop: 10,
    backgroundColor: '#FAFAFA',
    padding: 10,
    borderRadius: 5,

    [theme.breakpoints.down('sm')]: {
      marginBottom: 10,
      marginTop: 3,
      marginLeft: 0,
    },
  },
  text: {
    textAlign: 'justify',
  },
  author: {
    fontWeight: '700',
  },
}));

export default function Comment({ comment }) {
  const classes = useStyles();
  return (
    <div className={classes.comment}>
      <div className={classes.text}>
        <span className={classes.author}>
          {`${comment.comment_author.displayname.trim()}:`}
          &nbsp;
        </span>
        <span>{comment.content}</span>
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};
