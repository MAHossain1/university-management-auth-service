import httpStatus from 'http-status';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import ApiError from '../../../errors/ApiError';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Invalid code:${payload.code} for ${payload.title}`
    );
  }

  const result = await AcademicSemester.create(payload);

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create semester.');
  }

  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
