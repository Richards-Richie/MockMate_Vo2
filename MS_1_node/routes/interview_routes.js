const express = require('express');
const authMiddleware = require('../authorization/authMiddleware');
const router = express.Router();

router.use(authMiddleware);


router.post('/python',(req,res)=>{
    console.log("Python interview questions requested");
    res.status(200).json({
        message: "Python interview questions",
        questions: [
            "What is Python?",
            "Explain the difference between lists and tuples in Python.",
            "How do you handle exceptions in Python?"
        ]
    });
});


router.post('/java',(req,res)=>{
    res.status(200).json({
        message: "Java interview questions",
        questions: [
            "What is Java?",
            "Explain the concept of inheritance in Java.",
            "What is the difference between JDK, JRE, and JVM?"
        ]
    });
});


module.exports = router;