// src/models/index.js
import studentModel from './student.js';
import attendanceModel from './attendence.js';
import marksModel from './marks.js';
import teacherModel from './teacher.js';
import departmentModel from './department.js';
import courseModel from './course.js';
import userModel from './user.js';
import deptAdminModel from './deptAdminModel.js';
import adminsModel from './adminsModel.js';

// ✅ Setup associations here
userModel.hasOne(studentModel, { foreignKey: "userId", onDelete: "CASCADE" });
studentModel.belongsTo(userModel, { foreignKey: "userId" });

departmentModel.hasOne(deptAdminModel, { foreignKey: "departmentId", onDelete: "CASCADE" });
deptAdminModel.belongsTo(departmentModel, { foreignKey: "departmentId" });

userModel.hasOne(adminsModel, { foreignKey: "userId", onDelete: "CASCADE" });
adminsModel.belongsTo(userModel, { foreignKey: "userId" });

departmentModel.hasOne(adminsModel, { foreignKey: "departmentId", onDelete: "CASCADE" });
adminsModel.belongsTo(departmentModel, { foreignKey: "departmentId" });

userModel.hasOne(deptAdminModel, { foreignKey: "userId", onDelete: "CASCADE" });
deptAdminModel.belongsTo(userModel, { foreignKey: "userId" });

departmentModel.belongsToMany(courseModel, { through:'deptCourses' });
courseModel.belongsToMany(departmentModel, { through:'deptCourses' });

departmentModel.hasMany(courseModel, { foreignKey: 'departmentId' });
courseModel.belongsTo(departmentModel, { foreignKey: 'departmentId' });

departmentModel.hasMany(attendanceModel,{foreignKey:'departmentid'});
attendanceModel.belongsTo(departmentModel,{foreignKey:'departmentid'});

departmentModel.hasMany(studentModel, { foreignKey: 'departmentId' });
studentModel.belongsTo(departmentModel, { foreignKey: 'departmentId' });

studentModel.belongsToMany(courseModel, { through: 'enrollments' });
courseModel.belongsToMany(studentModel, { through: 'enrollments' });

studentModel.hasMany(attendanceModel,{foreignKey:'studentid',onDelete:'CASCADE'});
attendanceModel.belongsTo(studentModel,{foreignKey:'studentid'});

courseModel.hasMany(attendanceModel,{foreignKey:'courseId',onDelete:'CASCADE'});
attendanceModel.belongsTo(courseModel,{foreignKey:'courseId'})

studentModel.hasMany(marksModel,{foreignKey:'studentId',onDelete:'CASCADE'});
marksModel.belongsTo(studentModel,{foreignKey:'studentId'});

courseModel.hasMany(marksModel,{foreignKey:'courseId',onDelete:'CASCADE'});
marksModel.belongsTo(courseModel,{foreignKey:'courseId'});

teacherModel.belongsToMany(courseModel, { through: 'teacherCourses' });
courseModel.belongsToMany(teacherModel, { through: 'teacherCourses' });

export {
  studentModel,
  attendanceModel,
  marksModel,
  teacherModel,
  departmentModel,
  courseModel,
  userModel,
  deptAdminModel,
  adminsModel
};
