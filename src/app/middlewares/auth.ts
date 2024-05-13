import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token)
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized to access.'
        );

      // Verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser;

      // Guard using role
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role))
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden.');

      return next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
