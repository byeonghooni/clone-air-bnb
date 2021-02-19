import { readFileSync, writeFileSync } from 'fs';
import { StoredUserType } from '../../types/user';

const getList = () => {
  const userBuffer = readFileSync('data/users.json');
  const userString = userBuffer.toString();
  if (!userString) {
    return [];
  }

  const users: StoredUserType[] = JSON.parse(userString);
  return users;
};

const exist = ({ email }: { email: string }) => {
  const users = getList();
  return users.some((user) => user.email === email);
};

const write = (users: StoredUserType[]) => {
  writeFileSync('data/users.json', JSON.stringify(users));
};

const find = ({ email, id }: { email?: string; id?: number }) => {
  const users = getList();
  return users.find((user) => user.email === email || user.id === id);
};

export default {
  getList,
  exist,
  write,
  find,
};
