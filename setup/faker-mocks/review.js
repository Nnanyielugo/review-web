import faker from 'faker';
import { response_user } from './user';
import { response_book } from './book';

const generate_review = () => ({
  content: faker.lorem.paragraphs(8),
  review_author: response_user,
  book: response_book,
  _id: faker.random.uuid(),
});

export const response_review = generate_review();

export const generate_reviews = (n = 10) => [...Array(n).keys()].map(() => generate_review());

export const response_reviews = generate_reviews();
