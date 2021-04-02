
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "email is required"]
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        required: [true, "role is required"],
        default: "user"
    },
    department: String,
    adress: {
        type: String,
        default: "Rwanda"
    }
});
const userInfo=mongoose.model("user",userSchema);
export default userInfo;