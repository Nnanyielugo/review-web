import React, {
  useEffect, useReducer, useContext, createContext,
} from 'react';
import PropTypes from 'prop-types';
import { setAuthStore } from 'utils/fetch-utils';

const SET_AUTH = 'SET_AUTH';
const UPDATE_AUTH = 'UPDATE_AUTH';
const LOGOUT = 'LOGOUT';

const initialState = {
  activeUser: {},
  token: '',
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_AUTH:
    case UPDATE_AUTH:
      return {
        ...state,
        activeUser: payload.activeUser,
        token: payload.token,
      };
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
  const [auth, dispatch] = useReducer(reducer, initialState);
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

  const autoAuth = async () => {
    try {
      const savedAuth = JSON.parse(localStorage.getItem(persistKey));
      if (savedAuth && (savedAuth.activeUser && savedAuth.token)) {
        dispatch({
          type: SET_AUTH,
          payload: savedAuth,
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const updateAuth = (_auth) => {
    dispatch({
      type: UPDATE_AUTH,
      _auth,
    });
  };

  const logout = async () => {
    await localStorage.removeItem(persistKey);
    dispatch({
      type: LOGOUT,
    });
  };

  const state = {
    auth,
    setAuth,
    updateAuth,
    logout,
    autoAuth,
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
