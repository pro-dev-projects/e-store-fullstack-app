import jwt from "jsonwebtoken"
import UserCollection from "../models/userSchema.js";

export const auth = async(req,res,next)=>{
    try{
         const token = req.headers.token;
        
        //verify this token
        const payload = jwt.verify(token, process.env.SIGNATURE) //returns payload
       /*  payload = { _id: user._id, email: user.email } */

           const user = await UserCollection.findById(payload._id)
        //attaching user in request object
           req.user = user;
            next()
       

    }
    catch(err){
        res.json({success:false,message:err.message})
    }
   

}
