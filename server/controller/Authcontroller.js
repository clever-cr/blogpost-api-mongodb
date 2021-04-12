//import  static  from 'express';
import bcrypt from 'bcrypt'
import { generateAuthToken } from '../Helpers/token';
import UserData from '../model/Usermodel';
import EmailHelper from "../Helpers/emailTemplate";
import Response from "../Helpers/response";

class UserController {
    static changePassword = async (req, res) => {
        
    let {
            oldPassword,
            newPassword,
            confirmPassword
        } = req.body;
        const userid = req.body.userid;
        const userDetails = await UserData.findById(userid);
        if (bcrypt.compareSync(oldPassword,userDetails.password)) {

            if (newPassword === confirmPassword) {

                const password = bcrypt.hashSync(newPassword, 10);

                const passwordChangedTime = Date.now();

                const userUpdated = await UserData.findByIdAndUpdate(userid, {

                    password: password,

                    passwordChangedTime: passwordChangedTime
                });

                return Response.successMessage(res, "success",userUpdated, 200)
            }
            return Response.errorMessage(res,"new password and confirm password not match",404);
             }
return Response.errorMessage(res,"please provide the correct old password",417);
    }
    
    static signup = async (req, res) => {

        let {
            firstname,
            lastname,
            email,
            password,
            gender,
            role,
            department,
            adress
        } = req.body;
        password = bcrypt.hashSync(password, 10)// default 32
        const isEmailExist = await UserData.findOne({ email: email })

        req.body.password = password;//why
        if (isEmailExist) {
            return Response.errorMessage(res, "email is deplicated", 409)
        }
        const data = await UserData.create(req.body);

        if (!data) {
            return Response.errorMessage(res, "sign up failed", 417)

        }
        else {
            let { password, ...dataWithOutPassword } = data._doc;
            await EmailHelper.userWelcomeEmail(dataWithOutPassword);
            return Response.successMessage(res, "Account created successfully", dataWithOutPassword, 201)

        }
    }



    static signin = async (req, res) => {

        let {
            email,
            password } = req.body;

        const isUserExist = await UserData.findOne({ email: email })
        if (isUserExist && bcrypt.compareSync(password, isUserExist.password)) {
            const data = isUserExist
            const token = generateAuthToken({
                id: data.id,
                email: data.email,
                role: data.role,
                passwordChangedTime: data.passwordChangedTime
            });



            let { password, ...dataWithOutPassword } = data._doc;
            return Response.successMessage(res, "login successfully", { token }, 201)
        }

        return Response.errorMessage(res, "login failed", 407)


    }


}


export default { UserController };
