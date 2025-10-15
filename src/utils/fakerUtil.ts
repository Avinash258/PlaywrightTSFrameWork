import { faker } from '@faker-js/faker';

export function generateUser() {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12 })
  };
}

export function generateUsers(count: number) {
  return Array.from({ length: count }, generateUser);
}
