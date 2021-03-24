import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Context as ReviewContext } from '_providers/Review';
import { Context as AuthContext } from '_providers/Auth';
import { Context as ModalContext } from '_providers/Modal';

import Container from '../src/Container';
import App from '../src/App';

describe('Home page tests', () => {
  test('home page renders', async () => {
    const history = createMemoryHistory();

    const testAuthState = {
      autoAuth: jest.fn(),
      auth: {
        activeUser: {},
        token: '',
      },
    };
    const testReviewState = {
      reviews: [],
      fetchReviews: jest.fn(),
    };

    const testModalState = {
      modal: {
        open: false,
        type: null,
        params: null,
      },
    };

    render(
      <Router history={history}>
        <AuthContext.Provider value={testAuthState}>
          <ModalContext.Provider value={testModalState}>
            <ReviewContext.Provider value={testReviewState}>
              <Container Component={App} />
            </ReviewContext.Provider>
          </ModalContext.Provider>
        </AuthContext.Provider>
      </Router>,
    );

    expect(await screen.getByText(/review/i)).toBeInTheDocument();
  });
});
