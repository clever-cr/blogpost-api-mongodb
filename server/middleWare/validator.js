import { check, validationResult } from "express-validator"
import blogData from"../model/blogmodel";
class Validator {
    static verifyAccess= async(req,res,next)=>{
        const useridFromToken = req.body.userid;
        const blogId= req.params.blogId;
        const blog = await blogData.findById(blogId);
      
     
if(!blog){

    return res.status(404).json({
        status:404,
        message:" blog not found"                            
    })
}
else if(useridFromToken == blog.userid._id){
    
    return next();
}
return res.status(401).json({
    status:401,
    message:"you're not authorised"
})
    }
    static newAccountRule() {
        return [check("email", "invalid email").isEmail(),
        check("firstname", "first name must be valid").isAlpha(),
        //check("password", "password must be strong").isStrongPassword(),
        check("gender", "gender must be female or male").isIn(["male","female"]),
        check("role", "role must be admin or user").isIn(["admin","user"]),
        check("department", "department must not contain special characters").isAlpha(),
        check("address", "address must not contain special characters").isAlpha()


    ]

    };
    static newRules(){
        return [check("email","invalid email").isEmail(),
        //check("password", "password must be strong").isStrongPassword(),
    
    ]
    
    }
    static blogRules(){
        return [check("title","maximum of words of title must be 50 ").isLength({max:50}),
          check ("content","maximum of words of content must be 200").isLength({max:200})]

    }
    /**
     * validate  inputs
     * @body data inputs
     * @param {*} res 
     * @param {*} next  
     * @return {object} error description or next middleware
     */
    static validateInput = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            const errorMessage = errors.errors.map(e => e.msg);
            return res.status(400).json({
                status: 400,
                error: errorMessage
            })
        }
        return next();
    }
}
export default Validator;
