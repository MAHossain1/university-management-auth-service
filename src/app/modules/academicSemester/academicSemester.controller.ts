import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...AcademicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      AcademicSemesterData
    );
    next();
    res.status(200).json({
      success: true,
      message: 'Successfully created academic semester.',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createSemester,
};
