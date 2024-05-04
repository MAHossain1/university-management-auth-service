import { NextFunction, Request, Response } from 'express';
import usersService from './users.service';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.body;
  try {
    const result = await usersService.createUser(user);
    res.status(200).json({
      success: true,
      message: 'Successfully created the user.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createUser,
};
