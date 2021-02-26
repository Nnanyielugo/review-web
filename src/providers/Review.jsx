import React, {
  useReducer, useContext, createContext,
} from 'react';
import PropTypes from 'prop-types';
import FetchHelper from '../utils/fetch-utils';

const FETCH_REVIEWS = 'FETCH_REVIEWS';

const initialState = {
  reviews: [],
  reviewsCount: 0,
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
    default:
      return state;
  }
}

const Context = createContext(null);

export default function Provider({ children }) {
  const [reviews, dispatch] = useReducer(reducer, initialState);

  const fetchReviews = async () => {
    const response = await FetchHelper('/api/reviews/');
    dispatch({
      type: FETCH_REVIEWS,
      payload: response,
    });
  };

  const state = {
    reviews,
    fetchReviews,
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

export function useReview() {
  return useContext(Context);
}
