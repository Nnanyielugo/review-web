import React, {
  useEffect, useReducer, useContext, createContext,
} from 'react';
import PropTypes from 'prop-types';
import { setAuthStore } from '../utils/fetch-utils';

const SET_AUTH = 'SET_AUTH';
const UPDATE_AUTH = 'UPDATE_AUTH';
const LOGOUT = 'LOGOUT';

function reducer(state, action) {
  const { type, auth } = action;
  switch (type) {
    case SET_AUTH:
    case UPDATE_AUTH:
      return { ...state, auth };
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

const Context = createContext(null);

export default function Provider({ children }) {
  const persistKey = 'auth';
  const persistAuth = JSON.parse(localStorage.getItem(persistKey));
  const [auth, dispatch] = useReducer(reducer, persistAuth || {});
  setAuthStore(auth);

  useEffect(async () => {
    try {
      await localStorage.setItem(persistKey, JSON.stringify(auth));
    } catch (err) {
      console.warn(err);
    }
  }, [auth]);

  const setAuth = (_auth) => {
    dispatch({
      type: SET_AUTH,
      auth: _auth,
    });
  };

  const updateAuth = (_auth) => {
    dispatch({
      type: UPDATE_AUTH,
      _auth,
    });
  };

  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  const state = {
    auth,
    setAuth,
    updateAuth,
    logout,
  };

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(Context);
}
