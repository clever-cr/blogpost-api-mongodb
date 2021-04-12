import commentInfos from "../model/commentModel";
import blogInfo from "../model/blogmodel";
import Response from "../Helpers/response";
class commentController{
    static createComment= async (req,res) => {
        let {content}= req.body;
      let blogIdFromParams  = req.params.blogId;
    //   console.log(req.body)
      const newComment = await commentInfos.create(req.body);
     // console.log(newComment)
     const blog = await blogInfo.findByIdAndUpdate(
         blogIdFromParams,
         {
             $push: {
                 commentsId: newComment._id
             }
         }
     )
     if (!blog){
         return Response.errorMessage(res,"failed to create comment",404)
        
     }
     return Response.successMessage(res,"comment created successfully",blog,201)
      
    }
    static deleteComment = async (req,res)=>{
        const commentId= req.params.id;
        
  
      const commentData= await commentInfos.findByIdAndDelete(commentId);
    
        if (!commentData){
return Response.errorMessage(res,"delete failed",417)

        }
        return Response.successMessage(res,"deleted successfully",{commentData},200)
        
    }
      static updateComment = async (req,res)=>{
         const commentId=req.params.id;
         let
         {
             content
         }=req.body
        
          const data= await commentInfos.findByIdAndUpdate(commentId,{
              content:content
          });
            
         if (!data){
             return Response.errorMessage(res,"not updated",417)
              } 
      const commentUpdated = await commentInfos.findById(commentId);
      return Response.successMessage(res,"updated successfully",{data},200)
      
  }
static getAllComments = async (req,res)=>{
    const comments= await  commentInfos.find();
    return Response.successMessage(res,"these are comments",{comments},200);
    
}
// static getOneComments = async (req,res)=>{
//     const id= req.params.id;
//     const data = await commentInfos.findById(id);
//     if (!data){
//         return res.status(401).json({
//             status:200,
//             message:"doesn't exist"
//         })
//     }
//     return res.status(200).jsn({
//         status:200,
//         message:"ok successfully",
//         data
//     })

// }
}
export default commentController;