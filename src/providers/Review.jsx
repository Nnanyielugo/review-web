import React, { useReducer, useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import FetchHelper from '_utils/fetch-utils';

const FETCH_REVIEWS = 'FETCH_REVIEWS';
const FETCH_REVIEWS_FAILED = 'FETCH_REVIEWS_FAILED';

const initialState = {
  reviews: [],
  reviewsCount: 0,
  error: null,
  review: null,
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_REVIEWS:
      return {
        ...state,
        reviews: payload.reviews,
        reviewsCount: payload.reviewsCount,
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
  const [reviews, dispatch] = useReducer(reducer, initialState);

  const fetchReviews = async () => {
    try {
      const response = await FetchHelper('/api/reviews/');
      dispatch({
        type: FETCH_REVIEWS,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: FETCH_REVIEWS_FAILED,
        payload: err.message,
      });
      throw err;
    }
  };

  const fetchReview = async (id) => {
    const response = await FetchHelper(`/api/reviews/${id}`);
    return response;
  };

  const state = {
    reviews,
    fetchReviews,
    fetchReview,
  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useReview() {
  return useContext(Context);
}
