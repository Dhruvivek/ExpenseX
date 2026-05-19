import jwt from 'jsonwebtoken';

export const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if (!authHeader){
        return res.status(401).json({message: "No token provided"});
    }

    const token = authHeader.spilt("")[1];
    try{
        const decode = jwt.verify(token,process.env.JWT_secret);
        req.user = decode;
        next();
    
    }
    catch(error){
        console.error(error);
        res.status(401).json({message:"Invalid token"});
    }
}