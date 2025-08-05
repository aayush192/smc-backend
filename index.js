import express from 'express';
import  cors from 'cors';
import helmet from 'helmet';
import Router from './src/routes/route.js';
import registerRouter from './src/routes/registerRoute.js';
import {studentModel,courseModel,attendanceModel,marksModel,teacherModel,departmentModel,userModel,deptAdminModel,adminsModel} from './src/models/index.js';
import sequelize from './src/connection/sequelize.js';
const app=express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/',Router);
app.use('/register',registerRouter);
app.listen(8000,async()=>{
   await sequelize.authenticate();
   await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.sync({ force: true }); // Drops and recreates all tables
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
console.log("server has started");
})