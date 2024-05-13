import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // instance of User
  const user = new User();

  // Check user exist or not
  const isUserExist = await user.isUserExist(id);
  if (!isUserExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');

  // Match password
  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist?.password)
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

const refreshToken = async (token: string): Promise<ILoginUserResponse> => {
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.expires_in as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token.');
  }

  const { userId } = verifiedToken;

  const user = new User();

  const isUserExist = await user.isUserExist(userId);

  if (!isUserExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');

  // create new accessToken
  const newAccessToken = jwtHelpers.generateToken(
    { id: isUserExist?.id, role: isUserExist?.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};

/**
 * login --> default_password --> passwordChange --> true/false --> setFalse
 */
