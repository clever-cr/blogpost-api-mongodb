import express from'express';
import Validator from'../middleWare/validator';
import UserController from'../controller/Authcontroller';
import {verifyAuth} from '../middleware/authVerification';
const router=express.Router();
router.post('/auth/signup',Validator.newAccountRule(),Validator.validateInput,UserController.UserController.signup);
router.post('/auth/signin',Validator.newRules(),Validator.validateInput,UserController.UserController.signin);
router.patch('/auth/changePassword',verifyAuth,UserController.UserController.changePassword);
export default router;