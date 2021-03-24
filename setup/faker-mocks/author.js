import faker from 'faker';

const generate_author = () => ({
  first_name: faker.name.firstName(),
  family_name: faker.name.lastName(),
  date_of_birth: faker.date.past(80),
  date_of_death: faker.date.past(10),
  bio: faker.lorem.paragraph(4),
});

export const valid_author = generate_author();
