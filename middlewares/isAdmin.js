export const isAdmin=(req,res,next)=>{
    if(req.user.role==="admin" || req.params?.id === req.user._id.toString()){
        next()
    }else{
        res.json({success:false,message:"authorized access"})
    }
} 