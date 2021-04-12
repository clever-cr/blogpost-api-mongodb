
import blogData from '../model/blogmodel';
import Response from '../Helpers/response';
import axios from 'axios';

class blogController {
    static getAllBlogsFromApi = async (req,res) => {
        try{
            const responseFromAPI = await axios.get('http://blogpost-api-shecancode.herokuapp.com/api/v1/blog/dash/all')
            return Response.successMessage(res,"fetched successfully",responseFromAPI.data,200)

        }
        catch(e){
            console.log(e)
            return errorMessage(res,"fetched failed",417)
        }
    }

    static getAllBlog = async (req, res) => {
        const data = await blogData.find();
    return    Response.successMessage(res,"these are blogs",data,200)
        
       
    }
    static createBlog = async (req, res) => {
    let{
    
    title,
    content,
    userid
    }=req.body
        const data = await blogData.create(req.body);
        if (!data) {
            return Response.errorMessage(res,"blog not created",417)
            
        }
        return Response.successMessage(res,"blog created successfully",data,201)
       
    }
    static getOne = async (req, res) => {
    const blogId = req.params.blogId
        const data = await blogData.findById(blogId);
      
        if (!data) {
            return Response.errorMessage(res,"blog doesn't exist",401)
            
        }
        return Response.successMessage(res,"ok successful",data,200)
    
    }
    static delete= async (req,res)=>{
        const blogId=req.params.blogId;
        const data = await blogData.findByIdAndDelete(blogId);
        if (!data){
            return Response.errorMessage(res,"blog failed to be deleted",417)
              
        }
        return Response.successMessage(res," blog  deleted successfully",{data},200)
        
    }
     static updateOne= async (req,res)=>{
        const blogId=req.params.blogId;
 

     let{
        title,
         content
    }=req.body
   
    const data= await blogData.findByIdAndUpdate(blogId,{
        title:title,
        content:content
    });


    if(!data){
        return Response.errorMessage(res,"blog not updated",417)
        }

const dataUpdated = await blogData.findById(blogId)
return Response.successMessage(res,"updated successfully",{dataUpdated},201)
    
        }





    }

export default blogController;

