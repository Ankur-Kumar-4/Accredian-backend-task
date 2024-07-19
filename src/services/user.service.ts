import { User } from '../models/user';
import userRepository from '../repositories/user.repository';
import { hashPassword, comparePassword } from '../utils/passwordUtils';

const createUser = async (userData: Omit<User, 'id'>)=> {
  const hashedPassword = await hashPassword(userData.password);
  const newUser =await userRepository.createUser({ ...userData, password: hashedPassword });
  const { password, ...userWithoutPassword } = newUser;
return userWithoutPassword
};

const authenticateUser = async (email: string, password: string) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) return null;
  const isValid = await comparePassword(password, user.password);
  if (!isValid) return null;
  
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;

};

export default {
  createUser,
  authenticateUser,
};