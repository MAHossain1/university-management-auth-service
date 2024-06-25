import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IStudentFilters } from '../academicSemester/academicSemester.interface';
import { User } from '../user/user.model';
import { studentSearchableFields } from './student.constant';
import { IStudent } from './student.interface';
import { Student } from './student.model';
import { EVENT_STUDENT_UPDATED } from '../user/user.constant';
import { RedisClient } from '../../../shared/redis';

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id);
  return result;
};

const getAllStudent = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) sortConditions[sortBy] = sortOrder;

  const result = await Student.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateStudent = async (id: string, payload: Partial<IStudent>) => {
  const isExist = await Student.findOne({ id });
  if (!isExist) throw new ApiError(httpStatus.NOT_FOUND, 'Student Not Found.');

  const { name, guardian, localGuardian, ...studentData } = payload;
  const updatedStudentData = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IStudent>;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}` as keyof Partial<IStudent>;
      (updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }

  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey =
        `localGuardian.${key}` as keyof Partial<IStudent>;
      (updatedStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  });

  if (result) {
    await RedisClient.publish(EVENT_STUDENT_UPDATED, JSON.stringify(result));
  }

  return result;
};

const deleteStudentWithUser = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const deletedStudent = await Student.findOne({ id }).session(session);
    // Delete the student
    await Student.findOneAndDelete({ id }).session(session);

    // Delete the User
    await User.findOneAndDelete({ id }).session(session);

    await session.commitTransaction();
    session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const StudentService = {
  getSingleStudent,
  getAllStudent,
  updateStudent,
  deleteStudentWithUser,
};
