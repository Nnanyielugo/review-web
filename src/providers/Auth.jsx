import React, { useReducer, useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import FetchHelper, { setAuthStore } from '_utils/fetch-utils';

const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';
const LOGOUT = 'LOGOUT';

const initialState = {
  activeUser: {},
  token: '',
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        activeUser: payload.activeUser,
        token: payload.token,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

export const Context = createContext(null);

export default function Provider({ children }) {
  const persistKey = 'auth';
  const [auth, dispatch] = useReducer(reducer, initialState);
  setAuthStore(auth);

  const login = async (payload) => {
    try {
      const response = await FetchHelper('/api/users/login', {
        method: 'POST',
        body: payload,
      });

      await localStorage.setItem(persistKey, JSON.stringify(response.user));

      dispatch({
        type: LOGIN,
        payload: response.user,
      });
    } catch (err) {
      console.warn(err);
      throw err;
    }
  };

  const autoAuth = async () => {
    try {
      const savedAuth = JSON.parse(localStorage.getItem(persistKey));
      if (savedAuth && savedAuth.activeUser && savedAuth.token) {
        dispatch({
          type: LOGIN,
          payload: savedAuth,
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const register = async (payload) => {
    try {
      const response = await FetchHelper('/api/users/', {
        method: 'POST',
        body: payload,
      });

      await localStorage.setItem(persistKey, JSON.stringify(response.user));

      dispatch({
        type: REGISTER,
        payload: response.user,
      });
    } catch (err) {
      console.warn(err);
      throw err;
    }
  };

  const logout = async () => {
    localStorage.removeItem(persistKey);
    dispatch({
      type: LOGOUT,
    });
  };

  const state = {
    auth,
    login,
    register,
    logout,
    autoAuth,
  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(Context);
}
