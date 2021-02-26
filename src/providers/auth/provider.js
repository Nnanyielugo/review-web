import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Context from './context';

const SET_AUTH = 'SET_AUTH';
const UPDATE_AUTH = 'UPDATE_AUTH';

function reducer(state, action) {
  const { type, _auth } = action;
  switch (type) {
    case SET_AUTH:
    case UPDATE_AUTH:
      return { ...state, _auth };
    default:
      return state;
  }
}

export default function Provider({ children }) {
  const persistKey = 'auth';
  const persistAuth = JSON.parse(localStorage.getItem(persistKey));
  const [auth, dispatch] = useReducer(reducer, persistAuth || {});

  useEffect(async () => {
    try {
      await localStorage.setItem(persistKey, JSON.stringify(auth));
    } catch (err) {
      console.warn(err);
    }
  }, [auth, persistKey]);

  const setAuth = (_auth) => {
    dispatch({
      type: SET_AUTH,
      _auth,
    });
  };

  const updateAuth = (_auth) => {
    dispatch({
      type: UPDATE_AUTH,
      _auth,
    });
  };

  const state = {
    auth,
    setAuth,
    updateAuth,
  };

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
};
