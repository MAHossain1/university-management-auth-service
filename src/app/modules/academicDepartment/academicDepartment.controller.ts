import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicDepartmentService } from './academicDepartment.service';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicDepartment } from './academicDepartment.interface';
import httpStatus from 'http-status';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicDepartmentService.createDepartment(req.body);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully created Academic Department.',
    data: result,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicDepartmentService.getSingleDepartment(
    req.params.id
  );

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully retrieved the Academic Department.',
    data: result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicDepartmentService.updateDepartment(
    req.params.id,
    req.body
  );

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully updated the Academic Department.',
    data: result,
  });
});

const deleteSingleDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicDepartmentService.deleteSingleDepartment(
      req.params.id
    );

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully deleted the Academic Department.',
      data: result,
    });
  }
);

export const AcademicDepartmentController = {
  createDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteSingleDepartment,
};
