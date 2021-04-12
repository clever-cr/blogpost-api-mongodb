import UserController from "../controller/Authcontroller";
import userData from "../model/Usermodel";
import { dataFromToken } from "../Helpers/token";
import Response from"../Helpers/response";
export const verifyAuth = async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(404).json({
            status: 404,
            message: "no token provided"
        })
    }
    try {

        const user = dataFromToken(token).payload;
       const data = await userData.findById(user.id);

        if (!data) {
            return Response.errorMessage(res,"please provide true credentials",404)
            
        }
        if (user.passwordChangedTime != data.passwordChangedTime){
            return Response.errorMessage(res,"please re-login,password has been changed",404)
        }

        // console.log(user);
        req.body.userid = user.id;//userid from blogmodel and id from user model
        return next();

    } catch (e) {
        console.log(e);
        return res.status(404).json({
            status: 404,
            message: "invalid token"
        })
    }
}