const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verify = require("./verify");
const secretKey = "secretKey";

//CHECK TOKEN VALID
router.get('/token-valid/:token',verify,(req,res)=>{
    console.log("hit")
    res.status(200).json({valid: true});
})

//SIGNUP
router.post('/signup',async (req,res)=>{
    try{
        const existingUser = await User.findOne({email : req.body.email});        
        if(existingUser){
            res.status(200).json({msg: "user already exists"});
            return;
        }
        const newUser = new User(req.body); //incoming email and password in req.body
        await newUser.save();
        res.status(200).json({signup: true});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "error"});
    }
})

//LOGIN
router.post("/login",async (req,res)=>{
    try{
        const existingUser = await User.findOne({email: req.body.email});        
        if(!existingUser){
            return res.status(200).json({msg:"no user with given email",loggedIn: false});            
        }
        if(existingUser.password!=req.body.password){
            return res.status(200).json({msg:"wrong credentials",loggedIn: false});            
        }      
        const token = jwt.sign({id: existingUser._id},secretKey,{expiresIn: "1d"});
        res.status(200).json({msg: "user logged in",token: token,loggedIn: true});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "error"});
    }
})

//PROFILE
router.get("/profile/:token",verify, async(req,res)=>{
    try{                
        res.status(200).json({user: req.user});
    }
    catch(err){
        res.status(500).json({error: "error"});
    }
})

module.exports = router;