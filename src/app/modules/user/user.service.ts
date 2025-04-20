// user.service.ts
import { JwtPayload } from 'jsonwebtoken';
import { TUser } from './user.interface';
import { User } from './user.model';
import { StatusCodes } from 'http-status-codes';

const getAllUsersFromDB = async () => {
  const result = await User.find();

  return result;
};

const getAllTutorsFromDB = async () => {
  const result = await User.find({ role: 'Tutor' });

  return result;
};
const getTutorByIdFromDB = async (id: string) => {
  const tutor = await User.findOne({ _id: id, role: 'Tutor' });

  if (!tutor) {
    throw Error('Tutor not found!');
  }

  return tutor;
};
const getUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  if (result == null) {
    throw Error('User is not exist');
  }
  return result;
};
const updateUserFromDB = async (id: string, payload: Partial<TUser>) => {
  const isUsersExists = await User.findById(id);
  if (!isUsersExists) {
    throw Error('This User is not found !');
  }
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const userServices = {
  getAllUsersFromDB,
  updateUserFromDB,
  getAllTutorsFromDB,
  getTutorByIdFromDB,
  getUserFromDB,
};
