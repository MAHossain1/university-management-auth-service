import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // const academicSemester = {
  //   code: '01',
  //   year: '2034',
  // };

  const id = await generateFacultyId();

  user.id = id;

  // Set default password
  if (!user.password) {
    user.password = config.default_user_password as string;
  }

  const createdUser = await User.create(user);

  if (!createUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user.');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
