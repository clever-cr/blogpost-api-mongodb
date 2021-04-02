//import  static  from 'express';
import bcrypt from 'bcrypt'
import { generateAuthToken } from '../Helpers/token';
import UserData from '../model/Usermodel';

class UserController {
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
        password = bcrypt.hashSync(password, 10)//why have we put here this 10?
        const isEmailExist = await UserData.findOne({ email: email })

        req.body.password=password;
        if (isEmailExist) {
            return res.status(409).json({
                status: 409,
                error: "email is deplicated"
            });
        }
        const data = await UserData.create(req.body);

        if (!data) {
            return res.status(417).json({
                status: 417,
                message: "Account was not created",

            })
        }
        else {
            let { password, ...dataWithOutPassword } = data._doc;
            return res.status(201).json({
                status: 201,
                message: "Account created successfully",
                data,
                data: dataWithOutPassword

            })
        }
    }



    static signin = async (req, res) => {

        let {
            email,
            password } = req.body;
        
        const isUserExist =await UserData.findOne ({email:email})
        if (isUserExist && bcrypt.compareSync(password, isUserExist.password)) {
            const data=isUserExist
            const token = generateAuthToken({
                id: data.id,
                email: data.email,
                role: data.role,

            })


 
            let { password, ...dataWithOutPassword } = data._doc;
            return res.status(200).json({

                status: 200,
                message: "ok success",
                token: token,

                data: dataWithOutPassword
            })
        }

        return res.status(401).json({
            status: 401,
            message: "log in failed"
        })

    }


}


export default  {UserController};
