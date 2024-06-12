import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { AppError } from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/User/user.model';
import { USER_ROLE } from '../modules/User/user.constant';

export const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;

    if (!accessToken || !accessToken.startsWith('Bearer')) {
      return next(
        new AppError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized to access this route',
        ),
      );
    }

    const token = accessToken.split(' ')[1];
    try {
      const verifiedToken = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { role, email } = verifiedToken;
      const user = await User.findOne({ email });
      if (!user) {
        return next(new AppError(httpStatus.NOT_FOUND, 'User not found'));
      }

      if (!requiredRoles.includes(role as keyof typeof USER_ROLE)) {
        return next(
          new AppError(httpStatus.FORBIDDEN, 'Access forbidden: Admins only'),
        );
      }

      next();
    } catch (err) {
      return next(new AppError(httpStatus.UNAUTHORIZED, 'Invalid token'));
    }
  });
};
