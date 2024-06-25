import {
  IAcademicSemesterCodes,
  IAcademicSemesterTitles,
  IMonths,
} from './academicSemester.interface';

export const academicSemesterTitles: IAcademicSemesterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const academicSemesterMonths: IMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterCodes: IAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemesterSearchableFields = ['title', 'code', 'year'];

export const academicSemesterFilterableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
  'syncId',
];

export const EVENT_ACADEMIC_SEMESTER_CREATED = 'academicSemesterData';
export const EVENT_ACADEMIC_SEMESTER_UPDATED = 'academicSemester.updated';
export const EVENT_ACADEMIC_SEMESTER_DELETE = 'academicSemester.delete';
