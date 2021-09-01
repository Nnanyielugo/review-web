import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const StyledText = styled.span`
  text-align: justify;
  height: 4.4em;
  overflow: hidden;
  display: block;
  white-space: no-wrap;
  position: relative;
  &::after {
    content: '';
    text-align: right;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 40%;
    height: 1.2em;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1)
    );
  }
  @media (max-width: 600px) {
    height: 6.8em;
  }
`;

const useStyles = makeStyles((theme) => ({
  review: {
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
    height: '3.4em',
    overflow: 'hidden',
    display: 'block',
    whiteSpace: 'no-wrap',
    textOverflow: 'ellipsis',
  },
  author: {
    fontWeight: '700',
  },
}));

export default function Review({ review }) {
  const classes = useStyles();
  return (
    <div className={classes.review}>
      <div>
        {/* <span className={classes.author}>
          {`${comment.comment_author.displayname.trim()}:`}
          &nbsp;
        </span> */}
        <StyledText>{review.content}</StyledText>
        {/* <span className={classes.text}>{review.content}</span> */}
      </div>
    </div>
  );
}

Review.propTypes = {
  review: PropTypes.object.isRequired,
};
