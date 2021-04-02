
import mongoose from "mongoose";
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title required"]
    },
content:{
    type:String,
    required:[true,"content required"]
},
    userid:{
        type: mongoose.Schema.ObjectId,
        ref:"user",
        required:[true,"user is required"]
    },
    timestamp:{type:String,default:new Date(Date.now()  )
    }

});
blogSchema.pre(/^find/,function(next){
    this.populate({
        path:"userid",
        select:"firstname email"
    })
    next();
});
const blogInfo=mongoose.model("blog",blogSchema);
export default blogInfo;