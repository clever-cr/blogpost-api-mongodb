
import blogData from '../model/blogmodel';

class blogController {

    static getAllBlog = async (req, res) => {
        const data = await blogData.find();
        
        return res.status(200).json({
            status: 200,
            message: "these are  blogs",
            data:data
        })
    }
    static createBlog = async (req, res) => {
    let{
    
    title,
    content,
    userid
    }=req.body
        const data = await blogData.create(req.body);
        if (!data) {
            return res.status(417).json({
                status: 417,
                message: "blog not created"
            })
        }
        return res.status(201).json({
            status: 201,
            message: "blog created successfully",
            data: data._doc
        })
    }
    static getOne = async (req, res) => {
    const blogId = req.params.blogId
        const data = await blogData.findById(blogId);
      
        if (!data) {
            return res.status(401).json({
                status: 401,
                message: "doesn't exist"
            })
        }
        console.log("cdgch",data)
        return res.status(200).json({
            status: 200,
            message: "ok successfully",
            data
        })


    }
    static delete= async (req,res)=> {
        const blogId = req.params.blogId;
        const data = await blogData.findByIdAndDelete(blogId);
        if (!data){
            return res.status(404).json({
                status:417,
                messsage:"blog failed to be deleted"
            });
        

            
        }
        return res.status(200).json({
            status:200,
            message:"deleted successfully",
            data
        })
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
        return res.status(417).json({
            status:417,
            message:"not updated"
        })
    }

const dataUpdated = await blogData.findById(blogId)
       return res.status(201).json({
           status:201,
           message:"updated successfully",
          data:dataUpdated

       })
        }
}






export default blogController;

