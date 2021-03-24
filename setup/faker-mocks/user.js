import faker from 'faker';

const valid_first = faker.name.firstName();
const valid_last = faker.name.lastName();

export const login_details = {
  email: faker.internet.email(valid_first, valid_last),
  password: faker.random.alphaNumeric(9),
};

const generate_user = () => ({
  activeUser: {
    email: login_details.email,
    username: faker.internet.userName(valid_first, valid_last),
    displayname: `${valid_first} ${valid_last} `,
  },
  token: login_details.password,
});

export const response_user = generate_user();
