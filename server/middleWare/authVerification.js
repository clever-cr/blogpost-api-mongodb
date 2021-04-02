 import UserController from"../controller/Authcontroller";
 import userData  from"../model/Usermodel";
 import {dataFromToken} from "../Helpers/token";
export const verifyAuth=(req,res,next)=>{
     const token=req.header("x-auth-token");
     if(!token ){
         return res.status(404).json({
status:404,
message:"no token provided"
         })
     }
try{


   // console.log("<><><><>",token.trim())
    const user=dataFromToken(token).payload;

   // console.log(">>>>>>>>>>>>>>>>>>>",user)
  
    const data=userData.findOne({email:user.email});
    
    if(!data){
        return res.status(404).json({
            status:404,
            message:"you're  not a user"
        })

    }
    console.log(user);
    req.body.userid=user.id;//userid from blogmodel and id from user model
    return next();
    
}catch(e){
console.log(e);
    return res.status(404).json({
        status:404,
        message:"invalid token"
    })
}
 }