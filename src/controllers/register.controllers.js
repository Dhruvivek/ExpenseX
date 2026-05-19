import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req,res)=>{
    try{
        const {name,email,password} = req.body;

        //Check if user already existes
        const existingUser = await User.findOne({email});
        if(existingUser){
            // return res.send("User already exists"):
            return res.status(400).json({message: "User already exists"});
        }
        //Hash the password
        const hashedPassword = await bcrypt.hash(password,10);
        //Create a new user
        const newUser = new User({
            name,
            email,
            password:hashedPassword
        });
        await newUser.save();

        //Generate JWT tokens
        const token = jwt.sign({userId: newUser._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.status(201).json({token});

    }catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}