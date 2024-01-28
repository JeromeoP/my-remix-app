// utils/hashPassword.ts
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, saltRounds);
};
