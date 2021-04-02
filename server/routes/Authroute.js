import express from'express';
import Validator from'../middleWare/validator';
import UserController from'../controller/Authcontroller';
const router=express. Router();
router.post('/auth/signup',Validator.newAccountRule(),Validator.validateInput,UserController.UserController.signup);
router.post('/auth/signin',Validator.newRules(),Validator.validateInput,UserController.UserController.signin);
export default router;