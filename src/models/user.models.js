import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:8
    }
})

const User = mongoose.model('user',userSchema);

export default User;