import express from 'express';
import { userModel,courseModel,departmentModel,teacherModel,studentModel} from '../models/index.js';
 export default class getIdByName{
getIdByDepartmentName=async(departmentName)=>{
    try{
const department=await departmentModel.findOne({
    where:{
    name:departmentName
    }
})
if(!department) throw new Error('department of this name is not available');

return department.id;
}catch(err){
   throw err;
}
}


getIdByStudentName=async(symbolno)=>{
    try{
const student=await studentModel.findOne({
    where:{
   symbolno
    },
    include:[
        {model:userModel}
    ]
})
if(!student) throw new Error('student of this name is not available');
else if(student.role!='student') throw new Error('the selected account is not a student account');
return student.id;
}catch(err){
    throw err;
}
}


getIdByTeacherName=async(teacherName)=>{
    try{
const teacher=await teacherModel.findOne({
    where:{
    name:teacherName
    }
})
if(!teacher) throw new Error('teacher of this name is not available');
return teacher.id;
}catch(err){
   throw err;
}
}
getIdByCourseName=async(courseName)=>{
try{
const course=await courseModel.findOne({
    where:{
    courseTitle:courseName
    }
})
if(!course) throw new Error('course of this name is not available');
return course.id;
}catch(err){
   throw err;
}
}
}