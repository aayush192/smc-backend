const authorize=(...allowedRoles)=>{

    return (req,res,next)=>{
        try{
    if(!allowedRoles.includes(req.user.role)){
       return res.status(400).json({success:false,message:'user not allowed'}); 
    }
    next();
        }catch(err){
            return res.status(500).json({success:false,message:err.message});  
        }
    }
}
export default authorize;