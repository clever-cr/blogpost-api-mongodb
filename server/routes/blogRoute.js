import express from'express';
import {verifyAuth }from'../middleWare/authVerification';
import Validator from'../middleware/validator';
import blogController from '../controller/blogController';

const blogrouter=express. Router();
blogrouter.post('/blog/create',Validator.blogRules(),Validator.validateInput,verifyAuth,blogController.createBlog);

blogrouter.get('/get',verifyAuth,blogController.getAllBlog);
 blogrouter.get('/blog/get/:blogId',verifyAuth,Validator.verifyAccess,blogController.getOne);
 blogrouter.delete('/blog/get/:blogId',verifyAuth,Validator.verifyAccess,blogController.delete);
 blogrouter.patch('/blog/get/:blogId',verifyAuth,Validator.verifyAccess,blogController.updateOne);
 export default blogrouter;                                                                                                                                                                                                                                                                                      