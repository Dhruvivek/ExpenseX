import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

export const login= async(req,res) =>{
    try{
        const {email,password} = req.body;

        //check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid username and password"});
        }
        //compare the password
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid Password"});
        }

        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn: '1d'});
        res.status(201).json({token});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Internet server error"});
    }
}