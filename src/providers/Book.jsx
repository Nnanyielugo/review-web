import React, { useReducer, useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import FetchHelper from '_utils/fetch-utils';

const FETCH_REVIEWS = 'FETCH_REVIEWS';
const FETCH_REVIEWS_FAILED = 'FETCH_REVIEWS_FAILED';

const initialState = {
  books: [],
  error: null,
  review: null,
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_REVIEWS:
      return {
        ...state,
        books: payload.books,
      };
    case FETCH_REVIEWS_FAILED:
      return {
        ...state,
        error: `There was an error executing your request: ${payload.error}`,
      };
    default:
      return state;
  }
}

export const Context = createContext(null);

export default function Provider({ children }) {
  const [books, dispatch] = useReducer(reducer, initialState);

  const fetchBooks = async () => {
    try {
      const response = await FetchHelper('/api/books/');
      dispatch({
        type: FETCH_REVIEWS,
        payload: response,
      });
      return response;
    } catch (err) {
      dispatch({
        type: FETCH_REVIEWS_FAILED,
        payload: err.message,
      });
      throw err;
    }
  };

  const fetchBook = async (id) => {
    const uri = `/api/books/${id}`;
    const response = await FetchHelper(uri);
    return response;
  };

  const state = {
    books,
    fetchBooks,
    fetchBook,
  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useBook() {
  return useContext(Context);
}
