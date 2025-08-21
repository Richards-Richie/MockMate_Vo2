const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");


dotenv.config();

const authMiddleware = (req,res,next)=>{
    console.log("cookies : ", req.cookies);
    const token = req.cookies.accessToken;
    console.log("Token received:", token);
    console.log("Authorization middleware triggered");
    if(token){
        try{
            const decoded =jwt.verify(token,process.env.JWTSECRET);
            req.user = decoded;
            next();
        }catch(error){
            console.error("Error verifying token:", error);
            return res.status(401).json({message: "Unauthorized"});
        }
    }else{
        console.error("No access token provided");
        return res.status(401).json({message: "Unauthorized"});
    }
};

module.exports = authMiddleware;