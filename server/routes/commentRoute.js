import express from "express";
import commentController from "../controller/commentController";
import {verifyAuth} from "../middleWare/authVerification";
const commentRoute = express.Router();
commentRoute.post('/create/:blogId',verifyAuth,commentController.createComment);
commentRoute.delete('/delete/:id',verifyAuth,commentController.deleteComment);
commentRoute.patch('/update/:id',verifyAuth,commentController.updateComment);
commentRoute.get('/get',verifyAuth,commentController.getAllComments);
export default commentRoute;