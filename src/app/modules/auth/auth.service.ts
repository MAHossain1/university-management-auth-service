import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '../user/user.model';
import bcrypt from 'bcrypt';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // instance of User
  //   const user = new User();

  // Check user exist or not
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');

  // Match password
  if (
    isUserExist.password &&
    !User.isPasswordMatched(password, isUserExist?.password)
  )
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password do not match.');

  // Create access token
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.generateToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token.');
  }

  const { userId } = verifiedToken;

  //   const user = new User();

  const isUserExist = await User.isUserExist(userId);

  if (!isUserExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');

  // create new accessToken
  const newAccessToken = jwtHelpers.generateToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  const isUserExist = await User.isUserExist(user?.userId);
  if (!isUserExist) throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');

  // Match password
  if (
    isUserExist.password &&
    !User.isPasswordMatched(oldPassword, isUserExist?.password)
  )
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect.');

  // hash password
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_round)
  );

  const updateData = {
    password: newHashedPassword,
    needsPasswordChange: false,
    passwordChangeAt: new Date(),
  };

  // update password
  await User.findOneAndUpdate({ id: user?.userId }, updateData);
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};

/**
 * login --> default_password --> passwordChange --> true/false --> setFalse
 */
