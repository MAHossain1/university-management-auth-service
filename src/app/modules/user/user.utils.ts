import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const lastStudent = await findLastStudentId();

  const currentId = lastStudent || (0).toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementedId}`;
  // console.log(incrementedId);

  return incrementedId;
};

// const findLastFacultyId = async (): Promise<string | undefined> => {
//   const lastFacultyId = await User.findOne(
//     { role: 'faculty' },
//     { id: 1, _id: 0 }
//   )
//     .sort({ createAt: -1 })
//     .lean();

//   return lastFacultyId?.id ? lastFacultyId.id.substring(2) : undefined;
// };

// export const generateFacultyId = async (): Promise<string> => {
//   const lastFacultyId = await findLastFacultyId();
//   const currentFacultyId = lastFacultyId || (0).toString().padStart(5, '0');
//   let incrementedId = (parseInt(currentFacultyId) + 1)
//     .toString()
//     .padStart(5, '0');

//   incrementedId = `F-${incrementedId}`;

//   return incrementedId;
// };
export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `F-${incrementedId}`;
  return incrementedId;
};
