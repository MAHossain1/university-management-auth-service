import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  user.id = id!;

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
