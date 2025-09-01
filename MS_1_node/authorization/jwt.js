const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');



dotenv.config();

function generateToken(email){
    const accessToken = jwt.sign({
            email: email,
        },
        process.env.JWTSECRET, 
        {expiresIn: '1d'}
    );
    const refreshToken = jwt.sign({
            email:email,
        },
        process.env.JWTSECRET,
        {expiresIn: '7d'}
    );
    return { accessToken, refreshToken };
}


function verifyToken(accessToken){
    try{
        const decoded =jwt.verify(accessToken,process.env.JWTSECRET);
        return decoded;
    }catch(err){
        console.error("Error verifying access token:", err);
        return null;
    }
}



module.exports = {
    generateToken,
    verifyToken
};