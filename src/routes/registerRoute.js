import express from 'express';
import registerStudent from '../controller/registerStudent.js';
import registerDeptAdmin from '../controller/registerDeptAdmin.js';
import registerAdmin from '../controller/registerAdmins.js';
import authorize from '../middleware/authorize.js';
import validateToken from '../middleware/validateToken.js';
import registerSuperAdmin from '../controller/registerSuperAdmin.js';
const router=express.Router();

router.post('/',validateToken,authorize('superadmin','deptadmin'),async(req,res)=>{
try{
await registerStudent(req,res);
}catch(err){
    res.status(500).json({success:false,message:err.message});
}
})
router.post('/admin',validateToken,authorize('superadmin','deptadmin'),async(req,res)=>{
try{
await registerAdmin(req,res);
}catch(err){
    res.status(500).json({success:false,message:err.message});
}
})
router.post('/deptadmin',validateToken,authorize('superadmin'),async(req,res)=>{
try{
await registerDeptAdmin(req,res);
}catch(err){
    res.status(500).json({success:false,message:err.message});
}
})
router.post('/superadmin',async(req,res)=>{
try{
await registerSuperAdmin(req,res);
}catch(err){
    res.status(500).json({success:false,message:err.message});
}
})




export default router;