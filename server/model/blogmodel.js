
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
    },
    commentsId:[{
type: mongoose. Schema.ObjectId,
ref:"comment"
    }
    ]
});
blogSchema.pre(/^find/,function(next){//why
    this.populate({
        path:"userid",
        select:"firstname email"
    }).populate({
        path:"commentsId",
        select:"content user timestamp"
    })
    next();
});
const blogInfo=mongoose.model("blog",blogSchema);//role of this
export default blogInfo;