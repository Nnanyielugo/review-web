import faker from 'faker';
import { valid_author } from './author';

export const response_book = {
  title: faker.lorem.sentence(6, 16),
  summary: faker.lorem.paragraphs(7, '\n'),
  isbn: '978-3-16-148410-0',
  author: valid_author,
};
