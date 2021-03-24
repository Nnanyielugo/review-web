import { rest } from 'msw';
import config from 'config';
// import { login_details, response_user } from './faker-mocks/user';
import {
  generate_reviews, login_details, response_user,
  response_reviews, response_review
} from './faker-mocks';

const urlString = `${config.apiEndpoint}/api`;
export const handlers = [
  rest.post(`${urlString}/users/login`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: response_user,
      }),
    );
  }),

  rest.post(`${urlString}/users/`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: response_user,
      }),
    );
  }),

  rest.get(`${urlString}/reviews/`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        reviews: response_reviews,
        reviewsCount: 10,
      }),
    );
  }),
];
