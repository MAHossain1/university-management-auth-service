import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_DEPARTMENT_CREATED,
  EVENT_ACADEMIC_DEPARTMENT_DELETED,
  EVENT_ACADEMIC_DEPARTMENT_UPDATED,
} from './academicDepartment.constant';
import {
  AcademicDepartmentCreatedEvent,
  AcademicDepartmentUpdatedEvent,
} from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.service';

const initAcademicDepartmentEvents = () => {
  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_CREATED,
    async (e: string) => {
      const data: AcademicDepartmentCreatedEvent = JSON.parse(e);
      //   console.log(data);

      await AcademicDepartmentService.insertIntoDBFromEvent(data);
    }
  );

  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_UPDATED,
    async (e: string) => {
      const data: AcademicDepartmentUpdatedEvent = JSON.parse(e);
      //   console.log(data, 'from event');

      await AcademicDepartmentService.updateIntoDBFromEvent(data);
    }
  );

  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_DELETED,
    async (e: string) => {
      const data: AcademicDepartmentUpdatedEvent = JSON.parse(e);
      //   console.log(data, 'from event');

      await AcademicDepartmentService.deleteOneFromDBFromEvent(data.id);
    }
  );
};

export default initAcademicDepartmentEvents;
