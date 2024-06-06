import { Model } from 'mongoose';

export type IMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemesterTitles = 'Autumn' | 'Summer' | 'Fall';

export type IAcademicSemesterCodes = '01' | '02' | '03';

export type IAcademicSemester = {
  title: IAcademicSemesterTitles;
  year: number;
  code: IAcademicSemesterCodes;
  startMonth: IMonths;
  endMonth: IMonths;
  syncId: string;
};

export type IAcademicSemesterCreatedEvent = {
  year: number;
  title: string;
  code: string;
  startMonth: string;
  endMonth: string;
  id: string;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;

export type IAcademicSemesterFilters = {
  searchTerm?: string;
};

export type IStudentFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
