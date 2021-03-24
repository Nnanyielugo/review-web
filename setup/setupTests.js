import '@testing-library/jest-dom/extend-expect'; // eslint-disable-line import/no-extraneous-dependencies
import { setupServer } from 'msw/node'; // eslint-disable-line import/no-extraneous-dependencies
import { handlers } from './handlers';
import 'isomorphic-fetch'; // eslint-disable-line import/no-extraneous-dependencies

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});
