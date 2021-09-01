import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import { useAuth } from '_providers/Auth';

import Reviews from '_pages/Reviews';
import Review from '_pages/Review';
import Books from '_pages/Books';
import Book from '_pages/Book';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 10,
    marginRight: 10,
    [theme.breakpoints.up('md')]: {
      marginLeft: (props) => (props.loggedIn ? 324 : 75),
      marginRight: (props) => (props.loggedIn ? 75 : 80),
      marginTop: theme.spacing(2),
    },
    [theme.breakpoints.up('lg')]: {
      display: 'block',
      marginLeft: (props) => (props.loggedIn ? 524 : 225),
      marginRight: (props) => (props.loggedIn ? 225 : 230),
      marginTop: theme.spacing(3),
    },
    backgroundColor: '#FFF',
    height: '100vh',
    marginTop: theme.spacing(1),
    overflow: 'auto',
    paddingTop: 85,
    paddingLeft: 20,
    flex: 1,
  },
}));

export default function App() {
  const { auth } = useAuth();
  const isLoggedInUser = !!Object.keys(auth.activeUser).length;
  const classes = useStyles({ loggedIn: isLoggedInUser });
  return (
    <div className={classes.root}>
      <Switch>
        <Route exact path="/" component={Reviews} />
        <Route path="/reviews/:id" component={Review} />
        <Route exact path="/books" component={Books} />
        <Route path="/books/:id" component={Book} />
        <Route path="*">
          <div>No match found</div>
        </Route>
      </Switch>
    </div>
  );
}
