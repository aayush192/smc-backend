import sequelize, { col } from 'sequelize';
import { Fn } from 'sequelize/lib/utils';
import {studentModel,attendanceModel,marksModel,teacherModel,departmentModel,courseModel, userModel, adminsModel, deptAdminModel} from '../models/index.js';
import { response } from 'express';
import getIdByName from './getIdByName.js';
const getId=new getIdByName;
export default class GetRequest{
    //get request
async getProfile(req,res){
    try{
    const {id,role}=req.user;
    let includeModel;
    switch (role) {
      case 'student':
        includeModel = { model: studentModel };
        break;
      case 'admin':
        includeModel = { model: adminsModel };
        break;
      case 'deptAdmin':
        includeModel = { model: deptAdminModel };
        break;
      default:
        includeModel = null; // No extra model for unknown roles
    }
    const response=await userModel.findOne({
        where:{
            id,
        },
      include:includeModel?[includeModel]:[]
    })
    res.status(200).json({success:true,result:response,message:'student retrieval is successful'});
}catch(err){
    res.status(500).json({success:false,message:err.message});
}
}

async getStudentByDepartmentAndSemester(req,res){
    const {departmentName,semester}=req.body;
    if( !departmentName||!semester) return res.status(400).json({success:false,message:'provide all required data'});
    try{

    const departmentId=getId.getIdByDepartmentName(departmentName);
    const response=await studentModel.findAll({
        limit,
        where:{
            departmentId,
            semester
        },
      include:[
        {model:userModel}
      ]
    })
    res.status(200).json({success:true,result:response,message:'student retrieval is successful'});
}catch(err){
    res.status(500).json({success:false,message:err.message});
}
}
async getCourse(req,res){
    try{
        const limit = parseInt(req.query.limit) || 10;
    const response=await courseModel.findAll({
        limit,
    })
    res.status(200).json({success:true,result:response,message:'course retrieval is successful'});
}catch(err){
    res.status(500).json({success:false,message:err.message});
}
}

async getDepartment(req,res){
    try{
    const response=await departmentModel.findAll()
    res.status(200).json({success:true,result:response,message:'department retrieval is successful'});
}catch(err){
    res.status(500).json({success:false,message:err.message});
}
}

async getTeacher(req,res){
    try{
        const limit = parseInt(req.query.limit) || 10;
    const response=await teacherModel.findAll({
        limit,
    })
    res.status(200).json({success:true,result:response,message:'getTeacher retrieval is successful'});
}catch(err){
    res.status(500).json({success:false,message:err.message});
}
}


//get request by id
async getDepartmentById(req,res){
    try{
        const id=req.params;
const departmentResponse= await departmentModel.findByPk(id,
{
    include:[{model:courseModel}]
}
);

const studentResponse=await studentModel.findAll({
where:{
    departmentId:id,
},
attributes:['semester',[fn('COUNT',col('semester')),'count']],

group:['semester']
})
const formatted = {};

studentResponse.forEach(row => {
const semester = row.getDataValue('semester');
const count = parseInt(row.getDataValue('count'));
formatted[semester] = count;
});

res.status(200).json({success:true,result:{departmentResponse,semesterWiseStudentCount:formatted},message:"department's data retrieved successfully"})
}catch(err){
res.status(500).json({success:false,message:err.message});
}
}

async getStudentById(req,res){
    try{
const id=req.params;
const studentResponse=await userModel.findByPk(id,{
    include:[{model:studentModel}]
}
);
if(!studentResponse){
    res.status(400).json({success:false,message:'student not found'});
    return;
}

const attendanceResponse=await attendanceModel.findAll({
    where:{
        studentid:id,
    },
    attributes:['status','courseId',[fn('COUNT',col('status')),'count']],
    group:['status','courseId'],
    include:[{model:courseModel,
        attributes:'courseTitle',
    }]
})
const attendanceSummary = {};

attendanceResponse.forEach((state) => {
  const course = state.course?.courseTitle || 'Unknown Course';
  const status = state.getDataValue('status');
  const count = parseInt(state.getDataValue('count'), 10);

  if (!attendanceSummary[course]) {
    attendanceSummary[course] = {};
  }

  attendanceSummary[course][status] = count;
});

const marksResponse=await marksModel.findAll({
    where:{
        studentid:id,
    },
    attributes:['score','grade','semester'],
    include:[
        {model:courseModel,
            attributes:['courseTitle']
        }
    ]
});
res.status(200).json({success:true,result:{studentResponse,attendenceSummary,marksResponse},message:'student data retrieved successfully'})

}catch(err){
    res.status(500).json({status:false,message:err.messagex})
}
}

async getTeacherById(req, res) {
    try {
      const id = req.params.id;
      const teacher = await teacherModel.findByPk(id,
        {
            include:[{model:courseModel,
                through:{attributes:[]}
            }]
        }
      );  // find by primary key
      
      if (!teacher) {
        return res.status(404).json({ success: false, message: 'Teacher not found' });
      }
  
      res.status(200).json({ success: true, result: teacher, message: 'Teacher retrieval is successful' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

async getResultByID(req,res){
const id=req.params;
const {semester}=req.body;
if(!id || !semester) return res.status(400).json({success:false,message:'provide all required data'});
try{
const checkIfExist=await userModel.findByPk(id);
if(!checkIfExist) return res.status(400).json({success:false,message:'user doesnot exist'});
else if(checkIfExist.role!='student')return res.status(400).json({success:false,message:'user is not student'});

const response=await marksModel.findAll({where:{
    studentId:id,
    semester
}
})
if(!response) return res.status(400).json({success:false,message:"result doesn't exist"});
res.status(200).json({success:true,result:response,message:"result fetched successfully"});
}catch(err){
    res.status(500).json({success:false,message:err.message});
}
}
  
}