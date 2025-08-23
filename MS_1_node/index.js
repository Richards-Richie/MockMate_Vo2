const express = require('express');
const cors = require("cors");
const crypt = require('bcryptjs');
const dotenv = require('dotenv');
const client = require('./database/db.js'); 
const {generateToken,verifyToken} = require('./authorization/jwt.js'); 
const cookieParser = require('cookie-parser');
// const interviewRoutes = require('./routes/interview_routes.js');
const authMiddleware = require('./authorization/authMiddleware.js');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // your frontend URL
    credentials: true,               // allow cookies to be sent
}));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Hello, World!');  
});



app.post('/login', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    try{
        const queryResult = await client.query('select * from mockmate_users where email=$1',[email]);
        const queryPassword = queryResult.rows[0].password;                 
        const queryRowCount = queryResult.rowCount;

        if(queryRowCount === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }else{
            const isMatch = await crypt.compare(password, queryPassword);
            if(isMatch){
                const {accessToken,refreshToken}=generateToken(email);
                
                res.cookie('accessToken',accessToken,{
                    httpOnly:true,
                    secure:true,
                    sameSite:'none',
                    maxAge:10*60*1000
                });
                res.cookie('refreshToken',refreshToken,{
                    httpOnly:true,
                    secure:true,
                    sameSite:'none',
                    maxAge:24*60*60*1000
                });


                return res.status(200).json({
                    message: "Login successful",
                    user:{"email": email},
                });
            }else{
                return res.status(401).json({
                    message:"Invalid email or password"
                });
            }
        }
    }catch(err){
        console.error("Error querying database:", err);
        return res.status(500).json({
            message: "Error querying database",
            error: err.message
        });
    };

});

app.post('/signup',async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const hash=await crypt.hash(password,10)
    .then((hash)=>{
        return hash;
    })
    .catch((err)=>{
        console.error("Error hashing password:", err);
    });


    client.query('insert into mockmate_users(email,password) values($1,$2)',[email,hash])
    .then(()=>{

        const {accessToken,refreshToken}=generateToken(email);
        res.cookie('accessToken',accessToken,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge:10*60*1000
        });
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge:24*60*60*1000
        });
        return res.status(200).json({
            message:"sigunup sucessful",
            user:{"email":email,}
        });
    })
    .catch((err)=>{
        console.error("error inserting user : ",err);
        return res.status(500).json({
            message: "Error inserting user",
            error: err.message
        }); 
    });
});


// app.use('/interview', interviewRoutes);

app.post('/verify',authMiddleware,async(req,res)=>{
    return res.status(200).json({
        message: "Token is valid",
    });
});

app.post('/logout',async(req,res)=>{
    res.clearCookie('accessToken',{
        httpOnly:true,
        secure:true,
        sameSite:'none',
    });

    res.clearCookie('refreshToken',{
        httpOnly:true,
        secure:true,
        sameSite:'none',
    });
    return res.status(200).json({
        message: "Logout successful"});

});


app.listen(5555, () => {
    console.log('Server is running on port 5555');
});