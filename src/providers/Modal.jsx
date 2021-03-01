import React, {
  useReducer, createContext, useContext,
} from 'react';
import PropTypes from 'prop-types';

const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';
const UPDATE_MODAL = 'UPDATE_MODAL';

const initialState = {
  open: false,
  type: null,
  params: null,
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case OPEN_MODAL:
    case UPDATE_MODAL:
      return {
        ...state,
        open: true,
        type: payload.type,
        params: payload.params,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

const Context = createContext(null);

export default function Provider({ children }) {
  const [modal, dispatch] = useReducer(reducer, initialState);

  const openModal = (type, params) => {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        type,
        params,
      },
    });
  };

  const updateModal = (type, params) => {
    dispatch({
      type: UPDATE_MODAL,
      payload: {
        type,
        params,
      },
    });
  };

  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
  };

  const state = {
    modal,
    openModal,
    updateModal,
    closeModal,
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

export function useModal() {
  return useContext(Context);
}
