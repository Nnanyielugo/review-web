import React, { useReducer, useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import FetchHelper from '_utils/fetch-utils';

const FETCH_USER = 'FETCH_USER';

const initialState = {
  user: {},
  error: null,
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_USER:
      return {
        ...state,
        user: payload.user,
        error: null,
      };
    default:
      return state;
  }
}

export const Context = createContext(null);

export default function Provider({ children }) {
  const [user, dispatch] = useReducer(reducer, initialState);

  const fetchUser = async (id) => {
    if (!id) return;
    const response = await FetchHelper(`/api/users/${id}`);
    dispatch({
      type: FETCH_USER,
      payload: response,
    });
  };

  const state = {
    user,
    fetchUser,
  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useUser() {
  return useContext(Context);
}
