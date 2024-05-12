export const gender = ['male', 'female'];
export const bloodGroup = ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'];

export const studentFilterableFields = [
  'searchTerm',
  'id',
  'bloodGroup',
  'email',
  'contactNo',
  'emergencyContactNo',
];
export const studentSearchableFields = [
  'id',
  'bloodGroup',
  'email',
  'contactNo',
  'emergencyContactNo',
];

/* 
if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
        const guardianKey = `guardian.${key} as key of Partial<IStudent>
        (updatedStudentData)[guardianKey] = guardian[key as keyof typeof guardian];
    })
}

updatedStudentData --> object create --> guardian : {motherName: 'Arzena'  }

*/
