import initAcademicDepartmentEvents from '../modules/academicDepartment/academicDepartment.events';
import initAcademicSemesterEvents from '../modules/academicSemester/academicSemester.event';

const subscribeToEvents = () => {
  initAcademicSemesterEvents();
  initAcademicDepartmentEvents();
};

export default subscribeToEvents;
